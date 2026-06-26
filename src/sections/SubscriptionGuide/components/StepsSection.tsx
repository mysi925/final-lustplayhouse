import { useEffect, useState } from "react";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

/* ================= COMMUNITY SECTION ================= */
const CommunityButtons = () => {
  return (
    <div className="mt-16 rounded-2xl border border-red-500/20 bg-black/40 p-6 md:p-8">
      
      <h3 className="text-lg font-bold text-red-300 text-center mb-6">
        Join the Community
      </h3>

      <div className="grid gap-4 md:grid-cols-3">

        <a
          href="https://t.me/+FZv49DSqQ_lmODcx"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-red-500/20 bg-black/60 p-5 text-center hover:border-red-400/60 transition"
        >
          <div className="text-2xl mb-2">📡</div>
          <div className="text-white font-bold">Free Channel</div>
          <div className="text-xs text-gray-400 mt-1">
            Previews & drops
          </div>
        </a>

        <a
          href="https://t.me/+KsCdMv3mCSVlY2Vh"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-red-500/20 bg-black/60 p-5 text-center hover:border-red-400/60 transition"
        >
          <div className="text-2xl mb-2">💬</div>
          <div className="text-white font-bold">Chatroom</div>
          <div className="text-xs text-gray-400 mt-1">
            Talk with members
          </div>
        </a>

        <a
          href="https://t.me/savslayr"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-red-500/20 bg-black/60 p-5 text-center hover:border-red-400/60 transition"
        >
          <div className="text-2xl mb-2">🛡️</div>
          <div className="text-white font-bold">Admin Support</div>
          <div className="text-xs text-gray-400 mt-1">
            Help & orders
          </div>
        </a>

      </div>
    </div>
  );
};

/* ================= DATA ================= */
type TierOption = {
  id: string;
  name: string;
  price: string;
  perk: string;
  features: string[];
  amount: number;
};

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
          headers: { "Content-Type": "application/json" },
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
      } else {
        alert("No checkout URL returned from server.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="w-full mx-auto max-w-[720px] px-4 text-center text-white">

      {/* ================= STEPS ================= */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-2xl border border-red-500/20 bg-black/50 p-5"
          >
            <div className="text-2xl mb-2">{step.icon}</div>
            <div className="text-sm">{step.copy}</div>
          </div>
        ))}
      </div>

      {/* ================= TIERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-2xl border border-red-500/20 bg-black/50 p-5 flex flex-col justify-between"
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

      {/* ================= FAQ ================= */}
      <div className="mt-12 space-y-4 text-left">
        <h3 className="text-2xl font-bold text-red-300 text-center">
          FAQ
        </h3>

        <div className="rounded-xl border border-red-500/20 bg-black/50 p-4 text-gray-300 text-sm">
          Instant access after payment
        </div>

        <div className="rounded-xl border border-red-500/20 bg-black/50 p-4 text-gray-300 text-sm">
          Upgrade anytime
        </div>

        <div className="rounded-xl border border-red-500/20 bg-black/50 p-4 text-gray-300 text-sm">
          Secure checkout via backend
        </div>
      </div>

      {/* ================= COMMUNITY ================= */}
      <CommunityButtons />
    </div>
  );
};
