import { useEffect, useState } from "react";
{/* ================= COMMUNITY BUTTONS ================= */}
<div className="mt-16 grid gap-4 md:grid-cols-3">

  <a
    href="https://t.me/+FZv49DSqQ_lmODcx"
    target="_blank"
    rel="noreferrer"
    className="rounded-2xl border border-emerald-500/20 bg-black/40 p-5 text-center hover:border-emerald-300/60 transition"
  >
    <div className="text-2xl mb-2">📡</div>
    <div className="text-white font-bold">Free Channel</div>
    <div className="text-xs text-gray-400 mt-1">Previews & drops</div>
  </a>

  <a
    href="https://t.me/+KsCdMv3mCSVlY2Vh"
    target="_blank"
    rel="noreferrer"
    className="rounded-2xl border border-emerald-500/20 bg-black/40 p-5 text-center hover:border-emerald-300/60 transition"
  >
    <div className="text-2xl mb-2">💬</div>
    <div className="text-white font-bold">Chatroom</div>
    <div className="text-xs text-gray-400 mt-1">Talk with members</div>
  </a>

  <a
    href="https://t.me/savslayr"
    target="_blank"
    rel="noreferrer"
    className="rounded-2xl border border-emerald-500/20 bg-black/40 p-5 text-center hover:border-emerald-300/60 transition"
  >
    <div className="text-2xl mb-2">🛡️</div>
    <div className="text-white font-bold">Admin Support</div>
    <div className="text-xs text-gray-400 mt-1">Help & orders</div>
  </a>

</div>
import { LandingHero } from "@/sections/LandingHero";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

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
    perk: "Starter lounge access with a clean entry path.",
    features: ["Access 1000+ Videos", "Bop Content", "Snapchat Leaks"],
  },
  {
    id: "desire-25",
    name: "Desire",
    price: "$25",
    amount: 2500,
    perk: "Expanded access with higher-quality premium drops.",
    features: [
      "Access 3000+ Videos",
      "Everything in Tease",
      "Higher Quality Drops",
      "Real Homemade Content",
    ],
  },
  {
    id: "obsession-50",
    name: "Obsession",
    price: "$50",
    amount: 5000,
    perk: "Complete premium experience.",
    features: [
      "Access 5000+ Videos",
      "All Categories",
      "18+ Exclusives",
      "Priority Updates",
      "Member Requests",
    ],
  },
];

const faq = [
  {
    question: "What is this?",
    answer: "A private membership with exclusive content updated daily.",
  },
  {
    question: "When do I get access?",
    answer: "Instantly after checkout.",
  },
  {
    question: "Can I upgrade?",
    answer: "Yes anytime.",
  },
];

export const StepsSection = () => {
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0]);

  useEffect(() => {
    const stored = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (stored) {
      setSelectedTier(tiers.find((t) => t.id === stored) ?? tiers[0]);
    }
  }, []);

  const handleBuy = (tier: TierOption) => {
    // save selection
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);

    // redirect to checkout page
    window.location.href = "/checkout";
  };

  return (
    <div className="w-full mx-auto max-w-[720px] px-4 text-center md:text-left">

      {/* ================= STEPS ================= */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {steps.map((step) => (
          <article
            key={step.id}
            className="
              relative
              aspect-[4/3]
              rounded-2xl
              border border-emerald-500/20
              bg-[linear-gradient(165deg,rgba(8,10,10,0.96)_0%,rgba(6,8,8,0.92)_100%)]
              flex flex-col items-center justify-center
              p-5
              min-h-[140px]
            "
          >
            <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-emerald-300/20 border border-emerald-300/40 text-[12px] flex items-center justify-center">
              {step.id}
            </span>

            <span className="text-2xl mb-2">{step.icon}</span>

            <p className="text-xs md:text-sm text-gray-100 text-center">
              {step.copy}
            </p>
          </article>
        ))}
      </div>

      {/* ================= TIERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="
              flex flex-col justify-between
              rounded-2xl
              border border-emerald-500/20
              p-5
              min-h-[460px]
              bg-[linear-gradient(160deg,rgba(7,10,9,0.96)_0%,rgba(4,7,6,0.92)_100%)]
            "
          >
            <div>
              <p className="text-xs uppercase text-emerald-200 tracking-widest">
                {tier.name}
              </p>

              <div className="mt-2 text-4xl font-black text-emerald-300">
                {tier.price}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {tier.perk}
              </p>

              <div className="mt-5 space-y-2">
                {tier.features.map((f) => (
                  <div key={f} className="text-sm text-gray-200">
                    ✓ {f}
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => handleBuy(tier)}
              className="
                mt-6
                w-full
                rounded-xl
                bg-emerald-400
                text-black
                font-bold
                py-3
                hover:bg-emerald-300
                transition
              "
            >
              Buy {tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* ================= FAQ ================= */}
      <div className="mt-12 space-y-4">
        <h3 className="text-2xl font-bold text-white">FAQ</h3>

        {faq.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-emerald-500/20 bg-black/40 p-4"
          >
            <p className="text-sm font-bold text-emerald-200">
              {item.question}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      <LandingHero />
    </div>
  );
};
