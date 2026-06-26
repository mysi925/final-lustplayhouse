import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   PRICE MAP (TIERS)
========================= */

const PRICES = {
  "tease-15": 1500,
  "desire-25": 2500,
  "obsession-50": 5000,
};

/* =========================
   CHECKOUT ROUTE
========================= */

app.get("/checkout", async (req, res) => {
  try {
    const tier = req.query.tier;

    const amount = PRICES[tier];

    if (!amount) {
      return res.status(400).send("Invalid tier");
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
                name: tier,
                quantity: "1",
                base_price_money: {
                  amount,
                  currency: "USD",
                },
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();

    const url = data?.payment_link?.url;

    if (!url) {
      console.error(data);
      return res.status(500).send("Square failed");
    }

    // 🔥 redirect user to Square checkout
    res.redirect(url);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
