import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const createPayment = async (amountCents) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://lustplayhouse.cloud/create-payment-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amountCents }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Square
      } else {
        alert("Payment failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black p-6">
      <h1 className="text-3xl font-bold mb-6">Choose Your Tier</h1>

      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => createPayment(1500)}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold"
        >
          Tease — $15
        </button>

        <button
          onClick={() => createPayment(2500)}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold"
        >
          Desire — $25
        </button>

        <button
          onClick={() => createPayment(5000)}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold"
        >
          Obsession — $50
        </button>
      </div>

      {loading && (
        <p className="mt-6 text-gray-400">Redirecting to checkout...</p>
      )}
    </div>
  );
}
