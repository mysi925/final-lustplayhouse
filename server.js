import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* =========================
   CREATE SQUARE PAYMENT LINK
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

    // 🔥 IMPORTANT: show real Square errors
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
