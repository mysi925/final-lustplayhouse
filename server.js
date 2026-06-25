import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client, Environment } from "@square/square";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { checkoutApi } = client;

/**
 * CREATE PAYMENT LINK
 */
app.post("/create-payment-link", async (req, res) => {
  try {
    const { amountCents } = req.body;

    if (!amountCents || amountCents <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const response = await checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: [
          {
            name: "Membership Access",
            quantity: "1",
            basePriceMoney: {
              amount: amountCents,
              currency: "USD",
            },
          },
        ],
      },
    });

    res.json({
      paymentLinkUrl: response.result.paymentLink.url,
      orderId: response.result.paymentLink.orderId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Square payment failed" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
