import { useEffect, useState } from "react";
import { LandingHero } from "@/sections/LandingHero";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

type TierOption = {
  id: string;
  name: string;
  price: string;
  perk: string;
  features: string[];
};

const steps = [
  { id: "1", icon: "💳", copy: "Pick a tier & pay with card or crypto" },
  { id: "2", icon: "🔗", copy: "Your private channel link appears instantly" },
  { id: "3", icon: "🚀", copy: "Join your channel — access forever" },
];

const tiers: TierOption[] = [
  {
    id: "tease-15",
    name: "Tease",
    price: "$15",
    perk: "Starter lounge access with a clean entry path.",
    features: ["Access 1000+ Videos", "Bop Content", "Snapchat Leaks"],
  },
  {
    id: "desire-25",
    name: "Desire",
    price: "$25",
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
    perk: "Complete Lust Playhouse experience for premium members.",
    features: [
      "Access 5000+ Videos",
      "All Categories",
      "Teen Exclusives (18+)",
      "Priority Updates",
      "Member Requests",
      "Real Homemade Content",
    ],
  },
];

const faq = [
  {
    question: "What is Lust Playhouse?",
    answer: "A collection of private channels full of exclusive content updated daily.",
  },
  {
    question: "How long does it take to gain access?",
    answer: "After purchase you will be prompted with your links to join immediately.",
  },
  {
    question: "How do I join the playhouse?",
    answer: "Follow the guided steps on this page and select your membership tier in the join section.",
  },
  {
    question: "Can I upgrade my access later?",
    answer:
      "Yes. Membership access can be upgraded as new tiers release. One-time payment & No monthly subscriptions.",
  },
];

export const StepsSection = () => {
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0]);

  useEffect(() => {
    const storedTierId = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (storedTierId) setSelectedTier(tiers.find(t => t.id === storedTierId) ?? tiers[0]);
  }, []);

  const handleTierSelect = (tier: TierOption) => {
    setSelectedTier(tier);
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);
  };

  return (
    <div className="w-full mx-auto max-w-[520px] text-center md:text-left">

      {/* STEPS */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {steps.map((step) => (
          <article
            key={step.id}
            className="
              relative
              aspect-square
              w-full
              rounded-2xl
              border border-emerald-500/20
              bg-[linear-gradient(165deg,rgba(8,10,10,0.95)_0%,rgba(6,8,8,0.92)_52%,rgba(6,16,11,0.88)_100%)]
              flex flex-col items-center justify-center
              p-3
            "
          >
            <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-emerald-300/20 border border-emerald-300/40 text-[11px] flex items-center justify-center">
              {step.id}
            </span>

            <span className="text-lg mb-2">{step.icon}</span>

            <p className="text-[10px] leading-4 text-gray-100 text-center">
              {step.copy}
            </p>
          </article>
        ))}
      </div>

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        {tiers.map((tier) => {
          const isSelected = selectedTier.id === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => handleTierSelect(tier)}
              className={`
                w-full
                h-full
                min-h-[420px]
                flex flex-col justify-between
                rounded-2xl
                border
                bg-[linear-gradient(160deg,rgba(7,10,9,0.96)_0%,rgba(4,7,6,0.9)_42%,rgba(8,20,14,0.92)_100%)]
                p-5
                text-left
                transition
                ${isSelected ? "border-emerald-300/70" : "border-emerald-500/25"}
              `}
            >
              <div>
                <p className="text-xs font-bold uppercase text-green-100">
                  {tier.name}
                </p>

                <div className="mt-2 text-4xl font-black text-emerald-300">
                  {tier.price}
                </div>

                <div className="mt-4 space-y-2">
                  {tier.features.map((f) => (
                    <div key={f} className="text-sm text-gray-100">
                      ✓ {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center text-sm font-bold text-white">
                Select {tier.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-8 grid gap-3">
        {faq.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4"
          >
            <p className="text-xs font-bold uppercase text-emerald-200">
              {item.question}
            </p>
            <p className="text-sm text-gray-300 mt-2">{item.answer}</p>
          </div>
        ))}
      </div>

      <LandingHero />
    </div>
  );
};
