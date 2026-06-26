import { useEffect, useState } from "react";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

const tierMap = {
  "tease-15": { name: "Tease", amountCents: 1500 },
  "desire-25": { name: "Desire", amountCents: 2500 },
  "obsession-50": { name: "Obsession", amountCents: 5000 },
};

export default function Checkout() {
  const [tier, setTier] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(TIER_STORAGE_KEY);
    const selected = tierMap[stored];

    if (!selected) {
      setError("No tier selected. Please go back and choose a plan.");
      return;
    }

    setTier({ id: stored, ...selected });
  }, []);

  const startCheckout = () => {
    // 🔥 THIS is now your ONLY job:
    // send user to backend (Railway)
    window.location.href = `https://lustplayhouse.cloud/checkout?tier=${tier.id}`;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!tier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading checkout...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/20 p-6 bg-[linear-gradient(160deg,rgba(10,10,10,0.95),rgba(5,5,5,0.9))]">

        <h1 className="text-3xl font-bold text-center text-emerald-300">
          Checkout
        </h1>

        <p className="text-center text-gray-400 mt-2">
          You selected:{" "}
          <span className="text-white font-semibold">{tier.name}</span>
        </p>

        <div className="mt-6 text-center">
          <div className="text-5xl font-black text-emerald-300">
            ${(tier.amountCents / 100).toFixed(0)}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            One-time payment · instant access
          </p>
        </div>

        <button
          onClick={startCheckout}
          className="mt-8 w-full py-3 rounded-xl bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition"
        >
          Continue to Payment
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure checkout powered by Square
        </p>
      </div>
    </div>
  );
}
