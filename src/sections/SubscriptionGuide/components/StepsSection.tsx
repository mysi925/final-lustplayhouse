import { useEffect, useState } from "react";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

/* ================= TYPES ================= */
type TierOption = {
  id: string;
  name: string;
  price: string;
  perk: string;
  features: string[];
  amount: number;
};

/* ================= DATA ================= */
const steps = [
  { id: "1", icon: "💳", copy: "Pick a tier & pay securely" },
  { id: "2", icon: "🔗", copy: "Redirect to secure checkout instantly" },
  { id: "3", icon: "🚀", copy: "Get instant access after payment" },
];

const tiers: TierOption[] = [
  {
    id: "tease-15",
    name: "Tease",
    price: "$15",
    amount: 1500,
    perk: "Starter access",
    features: ["1000+ Videos", "Bop Content", "Leaks"],
  },
  {
    id: "desire-25",
    name: "Desire",
    price: "$25",
    amount: 2500,
    perk: "Expanded access",
    features: ["3000+ Videos", "Higher Quality", "Everything in Tease"],
  },
  {
    id: "obsession-50",
    name: "Obsession",
    price: "$50",
    amount: 5000,
    perk: "Full access",
    features: ["5000+ Videos", "All Categories", "Priority Updates"],
  },
];

/* ================= COMMUNITY SECTION (RESTORED + CHERRY RED) ================= */
const CommunityButtons = () => {
  return (
    <div className="mt-16 flex justify-center">
      <div className="w-full max-w-[520px] rounded-3xl border border-red-500/25 bg-[linear-gradient(180deg,rgba(10,10,10,0.95),rgba(0,0,0,0.98))] shadow-[0_0_60px_rgba(220,38,38,0.12)] p-6 md:p-8">

        <div className="flex justify-center mb-6">
          <div className="px-4 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs tracking-[2px] uppercase">
            LUST PLAYHOUSE: LIVE
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white text-center">
          Join The Community
        </h2>

        <p className="text-center text-gray-400 text-sm mt-2">
          Free channel, live chatroom & direct admin support
        </p>

        <div className="mt-6 space-y-4">

          <a
            href="https://t.me/+FZv49DSqQ_lmODcx"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-red-500/20 bg-black/60 p-4 hover:border-red-400/60 transition"
          >
            <div className="flex items-center gap-3">
              <span>📡</span>
              <div>
                <div className="text-white font-bold">Join Free Channel</div>
                <div className="text-xs text-gray-400">Previews & drops</div>
              </div>
            </div>
            <span className="text-red-300">→</span>
          </a>

          <a
            href="https://t.me/+KsCdMv3mCSVlY2Vh"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-red-500/20 bg-black/60 p-4 hover:border-red-400/60 transition"
          >
            <div className="flex items-center gap-3">
              <span>💬</span>
              <div>
                <div className="text-white font-bold">Official Chatroom</div>
                <div className="text-xs text-gray-400">Talk with members</div>
              </div>
            </div>
            <span className="text-red-300">→</span>
          </a>

          <a
            href="https://t.me/savslayr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-red-500/20 bg-black/60 p-4 hover:border-red-400/60 transition"
          >
            <div className="flex items-center gap-3">
              <span>🛡️</span>
              <div>
                <div className="text-white font-bold">Contact Admin</div>
                <div className="text-xs text-gray-400">Support & orders</div>
              </div>
            </div>
            <span className="text-red-300">→</span>
          </a>

        </div>

        <div className="mt-8 text-center text-[10px] tracking-[2px] text-gray-500 uppercase">
          © 2026 Lust Playhouse • Private Member Lounge • The Biggest Internet Playhouse
        </div>

      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export const StepsSection = () => {
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0]);

  useEffect(() => {
    const stored = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (stored) {
      const match = tiers.find((t) => t.id === stored);
      if (match) setSelectedTier(match);
    }
  }, []);

  const handleBuy = async (tier: TierOption) => {
    try {
      window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);

      const res = await fetch(
        "https://lustplayhouse.cloud/create-payment-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amountCents: tier.amount,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Payment error: " + JSON.stringify(data));
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="w-full mx-auto max-w-[720px] px-4 text-center">

      {/* STEPS */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-2xl border border-red-500/20 bg-black/60 p-5"
          >
            <div className="text-2xl mb-2">{step.icon}</div>
            <div className="text-sm text-white">{step.copy}</div>
          </div>
        ))}
      </div>

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-2xl border border-red-500/20 bg-black/60 p-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs uppercase text-red-300 tracking-widest">
                {tier.name}
              </p>

              <div className="text-3xl font-black text-red-400 mt-2">
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
              className="mt-6 w-full py-3 rounded-xl bg-red-500 text-black font-bold hover:bg-red-400 transition"
            >
              Buy {tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* COMMUNITY (BIG BOX RESTORED) */}
      <CommunityButtons />

    </div>
  );
};
