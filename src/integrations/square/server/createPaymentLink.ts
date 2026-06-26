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

    console.log("SQUARE RESPONSE:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(500).json({
        error: data?.errors?.[0]?.detail || "Square API failed",
      });
    }

    const url = data?.payment_link?.url;

    if (!url) {
      return res.status(500).json({
        error: "No payment link returned",
        debug: data,
      });
    }

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
