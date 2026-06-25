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
    answer: "Instantly after checkout via private link.",
  },
  {
    question: "Can I upgrade?",
    answer: "Yes, you can upgrade anytime.",
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

  const handleTierSelect = (tier: TierOption) => {
    setSelectedTier(tier);
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);
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
              w-full
              rounded-2xl
              border border-emerald-500/20
              bg-[linear-gradient(165deg,rgba(8,10,10,0.96)_0%,rgba(6,8,8,0.92)_60%,rgba(6,16,11,0.88)_100%)]
              flex flex-col items-center justify-center
              p-5
              min-h-[140px]
            "
          >
            <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-emerald-300/20 border border-emerald-300/40 text-[12px] flex items-center justify-center">
              {step.id}
            </span>

            <span className="text-2xl mb-2">{step.icon}</span>

            <p className="text-xs md:text-sm text-gray-100 text-center leading-5">
              {step.copy}
            </p>
          </article>
        ))}
      </div>

      {/* ================= TIER TITLE ================= */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-4xl font-black text-white">
          Choose Your Tier
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          One-time payment · instant access
        </p>
      </div>

      {/* ================= TIERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">

        {tiers.map((tier) => {
          const isSelected = selectedTier.id === tier.id;

          return (
            <div
              key={tier.id}
              className={`
                flex flex-col justify-between
                rounded-2xl
                border
                p-5
                min-h-[460px]
                bg-[linear-gradient(160deg,rgba(7,10,9,0.96)_0%,rgba(4,7,6,0.92)_50%,rgba(8,20,14,0.92)_100%)]
                transition
                ${isSelected ? "border-emerald-300/70 shadow-[0_0_35px_rgba(34,197,94,0.25)]" : "border-emerald-500/20"}
              `}
            >

              {/* TOP */}
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-200">
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
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => handleTierSelect(tier)}
                  className="
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

                <p className="text-xs text-gray-400 text-center">
                  Instant delivery after payment
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FAQ ================= */}
      <div className="mt-12 space-y-4">
        <h3 className="text-2xl font-bold text-white">
          FAQ
        </h3>

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
