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
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   APPLE PAY DOMAIN VERIFICATION
   Registered BEFORE express.static so this handler always wins the route,
   regardless of static-file middleware behavior (dotfiles, etags, range
   requests, compression, etc). Response is fully buffered in memory and
   sent with an explicit Content-Length so there is no possibility of
   chunked transfer-encoding — some strict automated verifiers (Apple's
   included) can misinterpret chunked responses as truncated/partial.
========================= */
const APPLE_PAY_FILE_PATH = path.join(
  __dirname,
  "public",
  ".well-known",
  "apple-developer-merchantid-domain-association"
);
app.get("/.well-known/apple-developer-merchantid-domain-association", (req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    ".well-known",
    "apple-developer-merchantid-domain-association"
  );

  // Square's docs require this file to DOWNLOAD when visiting the URL,
  // not render inline in the browser. application/octet-stream +
  // Content-Disposition: attachment forces that behavior.
  // Strip any trailing whitespace/newline that may have been introduced by
  // editors/zip tools on save — Apple's signature validation is byte-exact,
  // so even one stray trailing byte can break verification.
  const rawBuffer = fs.readFileSync(filePath);
  const fileBuffer = Buffer.from(rawBuffer.toString("utf8").replace(/\s+$/, ""));

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=apple-developer-merchantid-domain-association"
  );
  res.setHeader("Content-Length", fileBuffer.length);

  res.send(fileBuffer);
});

// "dotfiles: allow" is required so other /.well-known/... files (if any)
// are served. Express ignores dotfiles by default.
app.use(express.static(path.join(__dirname, "public"), { dotfiles: "allow" }));

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  const tier = TIERS["tease-15"];
  const dollars = (tier.amountCents / 100).toFixed(0);

  const html = checkoutTemplate
    .replaceAll("__TIER_NAME__", tier.name)
    .replaceAll("__TIER_PRICE__", dollars)
    .replaceAll("__TIER_ID__", "tease-15");

  res.send(html);
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
const successTemplate = fs.readFileSync(
  path.join(__dirname, "public", "checkout", "_success.html"),
  "utf8"
);

app.get("/success", (req, res) => {
  const tier = TIERS[req.query.tier];

  // Fallback if tier query param is missing/invalid — avoid leaking a
  // broken page with unresolved __PLACEHOLDER__ text.
  if (!tier) {
    return res.redirect("/");
  }

  const html = successTemplate
    .replaceAll("__TIER_NAME__", tier.name)
    .replaceAll("__COMMUNITY_LINK__", tier.communityLink);

  res.send(html);
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
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
