import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

/* =========================
   ENV / SITE CONFIG
========================= */
const PORT = parseInt(process.env.PORT || "4000", 10);
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, "");

// Two-domain setup: main site (.xyz) and the payment site (.cloud). Both are
// served by THIS one app; requests are routed by hostname. The "Get" buttons
// on the main site send the buyer to PAYMENT_SITE_URL to actually pay.
const PAYMENT_HOST     = (process.env.PAYMENT_HOST     || "lustplayhouse.cloud").toLowerCase();
const PAYMENT_SITE_URL = (process.env.PAYMENT_SITE_URL || "https://lustplayhouse.cloud").replace(/\/$/, "");
const MAIN_SITE_URL    = (process.env.MAIN_SITE_URL    || "https://lustplayhouse.xyz").replace(/\/$/, "");
const PREVIEW_BASE_URL = (process.env.PREVIEW_BASE_URL || "").replace(/\/$/, "");

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

// "dotfiles: allow" is required so /.well-known/... (used for Apple Pay domain
// verification) is actually served. Express ignores dotfiles by default.
app.use(express.static(path.join(__dirname, "public"), { dotfiles: "allow" }));

/* =========================
   APPLE PAY DOMAIN VERIFICATION
   Apple fetches this file and expects:
     • HTTP 200
     • Complete file body (no truncation)
     • Content-Type: application/json  ← Square's file IS JSON despite no extension
     • Content-Length set explicitly   ← prevents chunked / partial responses
   This explicit route runs BEFORE express.static so nothing intercepts it.
========================= */
const APPLE_PAY_FILE_PATH = path.join(
  __dirname,
  "public",
  ".well-known",
  "apple-developer-merchantid-domain-association"
);

app.get("/.well-known/apple-developer-merchantid-domain-association", (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(APPLE_PAY_FILE_PATH);

    // Apple / Square require application/json for this file.
    // Some guides say text/plain — application/json is what Square's
    // own dashboard expects and what resolves "partial response" errors.
    res.setHeader("Content-Type", "application/json");

    // Explicit Content-Length stops Express from using chunked transfer
    // encoding, which Apple Pay's verifier can misread as a partial response.
    res.setHeader("Content-Length", fileBuffer.length);

    // No caching — Apple re-fetches on every verification attempt.
    res.setHeader("Cache-Control", "no-store");

    res.status(200).end(fileBuffer);
  } catch (err) {
    console.error("❌ Apple Pay verification file missing:", APPLE_PAY_FILE_PATH, err.message);
    res.status(404).send("Verification file not found");
  }
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* =========================
   TIER CONFIG (single source of truth)
========================= */
const TIERS = {
  "tease-15": {
    name: "Tease",
    amountCents: 1500,
    communityLink: process.env.COMMUNITY_LINK_TEASE || "https://t.me/+REPLACE_TEASE",
  },
  "desire-25": {
    name: "Desire",
    amountCents: 2500,
    communityLink: process.env.COMMUNITY_LINK_DESIRE || "https://t.me/+REPLACE_DESIRE",
  },
  "obsession-50": {
    name: "Obsession",
    amountCents: 5000,
    communityLink: process.env.COMMUNITY_LINK_OBSESSION || "https://t.me/+REPLACE_OBSESSION",
  },
};

/* =========================
   CHECKOUT PAGE ROUTES
   (/tease, /desire, /obsession serve a Square card form)
========================= */
const ROUTE_TO_TIER = {
  tease: "tease-15",
  desire: "desire-25",
  obsession: "obsession-50",
};

const checkoutTemplate = fs.readFileSync(
  path.join(__dirname, "public", "checkout", "_template.html"),
  "utf8"
);

for (const [route, tierId] of Object.entries(ROUTE_TO_TIER)) {
  app.get(`/${route}`, (req, res) => {
    const tier = TIERS[tierId];
    const dollars = (tier.amountCents / 100).toFixed(0);

    const html = checkoutTemplate
      .replaceAll("__TIER_NAME__", tier.name)
      .replaceAll("__TIER_PRICE__", dollars)
      .replaceAll("__TIER_ID__", tierId);

    res.send(html);
  });
}

/* =========================
   SUCCESS PAGE
========================= */
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkout", "_success.html"));
});

/* =========================
   PUBLIC SQUARE CONFIG
   (safe to expose — no secrets)
========================= */
app.get("/api/square-config", (req, res) => {
  res.json({
    applicationId: process.env.SQUARE_APPLICATION_ID,
    locationId: process.env.SQUARE_LOCATION_ID,
  });
});

/* =========================
   TIER LOOKUP (price/name only)
========================= */
app.get("/api/tiers/:tierId", (req, res) => {
  const tier = TIERS[req.params.tierId];
  if (!tier) return res.status(404).json({ error: "Unknown tier" });
  res.json({ name: tier.name, amountCents: tier.amountCents });
});

/* =========================
   CHARGE A CARD DIRECTLY
   (custom checkout — Web Payments SDK token -> Square Payments API)
   Works for both card tokens AND Apple Pay tokens — no changes needed here.
========================= */
app.post("/api/checkout/:tierId", async (req, res) => {
  try {
    const { tierId } = req.params;
    const { sourceId } = req.body;

    const tier = TIERS[tierId];
    if (!tier) return res.status(404).json({ error: "Unknown tier" });
    if (!sourceId) return res.status(400).json({ error: "Missing payment token" });

    const response = await fetch("https://connect.squareup.com/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        "Square-Version": "2024-06-04",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        source_id: sourceId,
        location_id: process.env.SQUARE_LOCATION_ID,
        autocomplete: true,
        note: `Lust Playhouse — ${tier.name}`,
        amount_money: {
          amount: tier.amountCents,
          currency: "USD",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Square payment error:", JSON.stringify(data, null, 2));
      return res.status(400).json({
        success: false,
        error: data?.errors?.[0]?.detail || "Payment failed. Please check your card details.",
      });
    }

    return res.json({ success: true, tierId, status: data?.payment?.status });
  } catch (err) {
    console.error("❌ Server crash:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

/* =========================
   COMMUNITY LINK FOR SUCCESS PAGE
========================= */
app.get("/api/community-link/:tierId", (req, res) => {
  const tier = TIERS[req.params.tierId];
  if (!tier) return res.status(404).json({ error: "Unknown tier" });
  res.json({ link: tier.communityLink, name: tier.name });
});

/* =========================
   CREATE SQUARE PAYMENT LINK
   (legacy — hosted Square page, kept for backward compatibility)
========================= */
app.post("/create-payment-link", async (req, res) => {
  try {
    const { amountCents } = req.body;

    if (!amountCents || typeof amountCents !== "number" || amountCents <= 0) {
      return res.status(400).json({
        error: "Invalid amountCents",
      });
    }

    const response = await fetch(
      "https://connect.squareup.com/v2/online-checkout/payment-links",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          "Square-Version": "2024-06-04",
        },
        body: JSON.stringify({
          idempotency_key: crypto.randomUUID(),
          order: {
            location_id: process.env.SQUARE_LOCATION_ID,
            line_items: [
              {
                name: "Membership Access",
                quantity: "1",
                base_price_money: {
                  amount: amountCents,
                  currency: "USD",
                },
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Square API Error:");
      console.error(JSON.stringify(data, null, 2));

      return res.status(500).json({
        error: "Square request failed",
        details: data,
      });
    }

    const url = data?.payment_link?.url;

    if (!url) {
      console.error("❌ Missing payment link in response:");
      console.error(data);

      return res.status(500).json({
        error: "No payment link returned",
        details: data,
      });
    }

    return res.json({ url });

  } catch (err) {
    console.error("❌ Server crash:");
    console.error(err);

    return res.status(500).json({
      error: "Server error",
    });
  }
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Payment host : ${PAYMENT_HOST}`);
  console.log(`Payment site : ${PAYMENT_SITE_URL}`);
  console.log(`Main site    : ${MAIN_SITE_URL}`);
  if (PREVIEW_BASE_URL) console.log(`Preview base : ${PREVIEW_BASE_URL}`);
});
