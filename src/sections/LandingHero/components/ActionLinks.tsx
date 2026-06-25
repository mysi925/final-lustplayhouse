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
    perk: "Complete experience for premium members.",
    features: [
      "Access 5000+ Videos",
      "All Categories",
      "18+ Exclusives",
      "Priority Updates",
      "Member Requests",
      "Real Homemade Content",
    ],
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
    <div className="w-full mx-auto max-w-[680px] px-4">

      {/* ================= STEPS ================= */}
      <div className="grid grid-cols-3 gap-4 mb-12">

        {steps.map((step) => (
          <article
            key={step.id}
            className="
              relative
              aspect-[4/3]
              rounded-2xl
              border border-emerald-500/20
              bg-[linear-gradient(165deg,rgba(8,10,10,0.95)_0%,rgba(6,8,8,0.92)_100%)]

              flex flex-col items-center justify-center
              p-5
              min-h-[150px]
            "
          >
            {/* FIXED BAD POSITIONING */}
            <span className="absolute top-3 right-3 h-7 w-7 rounded-full bg-emerald-300/20 border border-emerald-300/40 text-[12px] flex items-center justify-center">
              {step.id}
            </span>

            <span className="text-2xl mb-2">{step.icon}</span>

            <p className="text-sm text-center text-gray-100 leading-5">
              {step.copy}
            </p>
          </article>
        ))}

      </div>

      {/* ================= TIERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

        {tiers.map((tier) => {
          const isSelected = selectedTier.id === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => handleTierSelect(tier)}
              className={`
                flex flex-col justify-between
                w-full
                min-h-[480px]

                rounded-2xl
                border
                p-6
                text-left

                bg-[linear-gradient(160deg,rgba(7,10,9,0.96)_0%,rgba(4,7,6,0.92)_100%)]

                transition
                ${isSelected
                  ? "border-emerald-300/70 shadow-[0_0_40px_rgba(34,197,94,0.25)]"
                  : "border-emerald-500/25"}
              `}
            >

              <div>
                <p className="text-xs uppercase font-bold text-emerald-200 tracking-widest">
                  {tier.name}
                </p>

                <div className="mt-2 text-5xl font-black text-emerald-300">
                  {tier.price}
                </div>

                <div className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <div key={f} className="text-sm text-gray-100">
                      ✓ {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 space-y-2">
                <div className="w-full text-center rounded-xl bg-gradient-to-r from-emerald-200 to-emerald-400 py-3 font-bold text-black">
                  Get {tier.name}
                </div>

                <p className="text-xs text-center text-gray-400">
                  One-time payment · instant access
                </p>
              </div>

            </button>
          );
        })}

      </div>

      {/* ================= COMMUNITY HEADER FIX ================= */}
      <section className="mt-14 text-center md:text-left">
        <h3 className="text-[40px] md:text-[46px] font-extrabold text-white leading-tight">
          Join The Community
        </h3>

        <p className="mt-4 text-base md:text-lg text-gray-300">
          Free channel, live chatroom & direct support
        </p>
      </section>

      <LandingHero />
    </div>
  );
};
