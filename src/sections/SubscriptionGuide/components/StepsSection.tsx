import { useEffect, useState } from "react";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

/* ================= COMMUNITY BUTTONS ================= */
const CommunityButtons = () => {
  return (
    <div className="mt-16 grid gap-4 md:grid-cols-3">

      <a
        href="https://t.me/+FZv49DSqQ_lmODcx"
        className="rounded-2xl border border-red-500/20 bg-black/40 p-5 text-center hover:border-red-400/60 transition"
      >
        <div className="text-2xl mb-2">📡</div>
        <div className="text-white font-bold">Free Channel</div>
        <div className="text-xs text-gray-400 mt-1">Previews & drops</div>
      </a>

      <a
        href="https://t.me/+KsCdMv3mCSVlY2Vh"
        className="rounded-2xl border border-red-500/20 bg-black/40 p-5 text-center hover:border-red-400/60 transition"
      >
        <div className="text-2xl mb-2">💬</div>
        <div className="text-white font-bold">Chatroom</div>
        <div className="text-xs text-gray-400 mt-1">Talk with members</div>
      </a>

      <a
        href="https://t.me/savslayr"
        className="rounded-2xl border border-red-500/20 bg-black/40 p-5 text-center hover:border-red-400/60 transition"
      >
        <div className="text-2xl mb-2">🛡️</div>
        <div className="text-white font-bold">Admin Support</div>
        <div className="text-xs text-gray-400 mt-1">Help & orders</div>
      </a>

    </div>
  );
};

const steps = [
  { id: "1", icon: "💳", copy: "Pick a tier & pay securely" },
  { id: "2", icon: "🔗", copy: "Redirect to secure checkout instantly" },
  { id: "3", icon: "🚀", copy: "Get instant access after payment" },
];

const tiers = [
  {
    id: "tease-15",
    name: "Tease",
    price: "$15",
    amount: 1500,
    features: ["Access 1000+ Videos", "Bop Content", "Snapchat Leaks"],
  },
  {
    id: "desire-25",
    name: "Desire",
    price: "$25",
    amount: 2500,
    features: [
      "Access 3000+ Videos",
      "Everything in Tease",
      "Higher Quality Drops",
    ],
  },
  {
    id: "obsession-50",
    name: "Obsession",
    price: "$50",
    amount: 5000,
    features: ["Access 5000+ Videos", "All Categories", "Priority Updates"],
  },
];

export const StepsSection = () => {
  const [selectedTier] = useState(tiers[0]);

  const handleBuy = (tier) => {
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);

    window.location.href =
      "https://lustplayhouse.cloud/create-payment-link?tier=" + tier.id;
  };

  return (
    <div className="w-full mx-auto max-w-[720px] px-4 text-center">

      {/* STEPS */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-2xl border border-red-500/20 bg-black/40 p-5"
          >
            <div className="text-2xl mb-2">{step.icon}</div>
            <div className="text-white text-sm">{step.copy}</div>
          </div>
        ))}
      </div>

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-2xl border border-red-500/20 bg-black/40 p-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs text-red-300 uppercase">{tier.name}</p>

              <div className="text-3xl font-bold text-red-400 mt-2">
                {tier.price}
              </div>

              <div className="mt-4 space-y-2">
                {tier.features.map((f) => (
                  <div key={f} className="text-sm text-gray-200">
                    ✓ {f}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleBuy(tier)}
              className="mt-6 w-full py-3 rounded-xl bg-red-500 text-black font-bold hover:bg-red-400"
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-12 text-gray-300 text-sm space-y-2">
        <p className="text-white font-bold text-lg">FAQ</p>
        <p>Instant access after payment</p>
        <p>Upgrade anytime</p>
      </div>

      <CommunityButtons />
    </div>
  );
};
