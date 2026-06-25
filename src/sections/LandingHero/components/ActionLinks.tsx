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
      "Teen Exclusives (18+)",
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
      setSelectedTier(tiers.find(t => t.id === stored) ?? tiers[0]);
    }
  }, []);

  const handleTierSelect = (tier: TierOption) => {
    setSelectedTier(tier);
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);
  };

  return (
    <div className="w-full mx-auto max-w-[620px]">

      {/* =========================
          STEPS (FIXED SIZE BALANCE)
      ========================= */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {steps.map((step) => (
          <article
            key={step.id}
            className="
              aspect-square
              rounded-2xl
              border border-emerald-500/20
              bg-[linear-gradient(165deg,rgba(8,10,10,0.95)_0%,rgba(6,8,8,0.92)_100%)]
              flex flex-col items-center justify-center
              p-4
            "
          >
            <span className="absolute -mt-20 ml-20 h-6 w-6 rounded-full bg-emerald-300/20 border border-emerald-300/40 text-[11px] flex items-center justify-center">
              {step.id}
            </span>

            <span className="text-xl mb-2">{step.icon}</span>

            <p className="text-xs text-center text-gray-100 leading-4">
              {step.copy}
            </p>
          </article>
        ))}
      </div>

      {/* =========================
          TIERS (FIXED SIZE + CTA RETURNED)
      ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">

        {tiers.map((tier) => {
          const isSelected = selectedTier.id === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => handleTierSelect(tier)}
              className={`
                flex flex-col justify-between
                w-full
                min-h-[460px]
                rounded-2xl
                border
                p-5
                text-left
                transition
                bg-[linear-gradient(160deg,rgba(7,10,9,0.96)_0%,rgba(4,7,6,0.9)_100%)]
                ${isSelected
                  ? "border-emerald-300/70 shadow-[0_0_35px_rgba(34,197,94,0.25)]"
                  : "border-emerald-500/25"}
              `}
            >

              {/* TOP */}
              <div>
                <p className="text-xs uppercase font-bold text-green-100">
                  {tier.name}
                </p>

                <div className="mt-2 text-5xl font-black text-emerald-300">
                  {tier.price}
                </div>

                <div className="mt-5 space-y-2">
                  {tier.features.map((f) => (
                    <div key={f} className="text-sm text-gray-100">
                      ✓ {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA BUTTON (RESTORED) */}
              <div className="mt-6 space-y-2">
                <div className="w-full text-center rounded-xl bg-gradient-to-r from-emerald-200 to-emerald-400 py-3 font-bold text-black">
                  Get {tier.name} — {tier.price}
                </div>

                <p className="text-xs text-center text-gray-400">
                  One-time payment · instant access
                </p>
              </div>

            </button>
          );
        })}
      </div>

      {/* =========================
          COMMUNITY HEADER FIXED
      ========================= */}
      <section className="mt-12">
        <div className="text-center md:text-left px-1">
          <h3 className="text-[36px] md:text-[44px] font-extrabold text-white leading-tight">
            Join The Community
          </h3>

          <p className="mt-3 text-base md:text-lg text-green-200/85">
            Free channel, live chatroom & direct admin support
          </p>
        </div>
      </section>

      <LandingHero />
    </div>
  );
};
