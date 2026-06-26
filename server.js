import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

/* =========================
   CORE MIDDLEWARE
========================= */

// allow frontend to talk to backend
app.use(cors({
  origin: [
    "https://lustplayhouse.xyz",
    "http://localhost:5173"
  ]
}));

app.use(express.json());

/* =========================
   ES MODULE FIX
========================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.send("OK");
});

/* =========================
   SQUARE PAYMENT LINK
========================= */

app.post("/create-payment-link", async (req, res) => {
  try {
    const { amountCents } = req.body;

    if (!amountCents || amountCents <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const response = await fetch(
      "https://connect.squareupsandbox.com/v2/online-checkout/payment-links",
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

    const link = data?.payment_link?.url;

    if (!link) {
      console.error("Square error:", data);
      return res.status(500).json({ error: "Failed to create payment link" });
    }

    // send checkout URL back to frontend
    res.json({ url: link });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   SERVE FRONTEND (REACT BUILD)
========================= */

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
