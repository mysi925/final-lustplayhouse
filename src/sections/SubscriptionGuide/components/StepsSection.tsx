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
  {
    id: "1",
    icon: "💳",
    copy: "Pick a tier & pay with card or crypto",
  },
  {
    id: "2",
    icon: "🔗",
    copy: "Your private channel link appears instantly",
  },
  {
    id: "3",
    icon: "🚀",
    copy: "Join your channel — access forever",
  },
];

const tiers: TierOption[] = [
  {
    id: "tease-15",
    name: "Tease",
    price: "$15",
    perk: "Starter lounge access with a clean entry path.",
    features: ["Access 750+ Videos", "Bop Content", "Snapchat Leaks"],
  },
  {
    id: "desire-25",
    name: "Desire",
    price: "$25",
    perk: "Expanded access with higher-quality premium drops.",
    features: [
      "Access 5000+ Videos",
      "Everything in Tease",
      "Higher Quality Drops",
    ],
  },
  {
    id: "obsession-50",
    name: "Obsession",
    price: "$50",
    perk: "Complete Lust Playhouse experience for premium members.",
    features: [
      "Access 10000+ Videos",
      "All Categories",
      "Teen Exclusives (18+)",
      "Priority Updates",
      "Member Requests",
    ],
  },
];

const faq = [
  {
    question: "What is Lust Playhouse?",
    answer:
      "A collection of private channels full of exclusive content updated daily.",
  },
  {
    question: "How long does it take to gain access?",
    answer:
      "After purchase you will be prompted with your links to join immediately.",
  },
  {
    question: "How do I join the playhouse?",
    answer:
      "Follow the guided steps on this page and select your membership tier in the join section.",
  },
  {
    question: "Can I upgrade my access later?",
    answer:
      "Yes. Membership access can be upgraded as new tiers release. One-time payments & no monthly subscriptions. ",
  },
];

const findTierById = (tierId: string) =>
  tiers.find((tier) => tier.id === tierId) ?? tiers[0];

export const StepsSection = () => {
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0]);

  useEffect(() => {
    const storedTierId = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (storedTierId) {
      setSelectedTier(findTierById(storedTierId));
      return;
    }
    window.localStorage.setItem(TIER_STORAGE_KEY, tiers[0].id);
  }, []);

  const handleTierSelect = (tier: TierOption) => {
    setSelectedTier(tier);
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);
    window.dispatchEvent(
      new CustomEvent("lust-tier-selected", {
        detail: tier,
      }),
    );
  };

  return (
    <div className="box-border caret-transparent text-[13.3333px] leading-5 max-w-[520px] outline-[3px] break-words text-center no-underline w-full mx-auto md:text-[17.3333px] md:leading-[26px] md:text-left">
      <section className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline md:text-[17.3333px] md:leading-[26px] md:text-left">
        <div className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline md:text-[17.3333px] md:leading-[26px] md:text-left">
          <h2 className="box-border caret-transparent text-xl font-extrabold tracking-[-0.5px] leading-[30px] outline-[3px] break-words text-center no-underline mb-[6.66667px] md:text-[26px] md:tracking-[-0.65px] md:leading-[39px] md:mb-[8.66667px]">
            How It Works
          </h2>
          <p className="box-border caret-transparent text-gray-300 text-[11.6667px] leading-[17.5px] outline-[3px] break-words text-center no-underline mb-[26.6667px] md:text-[15.1667px] md:leading-[22.75px] md:mb-[34.6667px]">
            From payment to access in seconds
          </p>
        </div>

        <div className="box-border caret-transparent grid text-[13.3333px] grid-cols-[repeat(3,minmax(0,1fr))] gap-1.5 leading-5 outline-[3px] break-words text-center no-underline mb-3 md:gap-x-2.5 md:text-[17.3333px] md:leading-[26px] md:gap-y-2.5 md:text-left md:mb-[14px]">
          {steps.map((step) => (
            <article
              key={step.id}
              className="relative flex aspect-square min-h-[112px] items-center justify-center rounded-[18px] border border-emerald-500/20 bg-[linear-gradient(165deg,rgba(8,10,10,0.95)_0%,rgba(6,8,8,0.92)_52%,rgba(6,16,11,0.88)_100%)] px-2 py-3 text-center shadow-[0_0_22px_-14px_rgba(16,185,129,0.45)] md:min-h-[118px] md:px-5"
            >
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300/55 bg-emerald-300/20 text-[11px] font-black text-emerald-100 md:-right-2.5 md:-top-2.5 md:h-7 md:w-7 md:text-[12px]">
                {step.id}
              </span>

              <div className="flex flex-col items-center gap-2 md:gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-300/35 bg-emerald-500/10 text-[16px] shadow-[0_0_18px_-10px_rgba(74,222,128,0.7)] md:h-10 md:w-10 md:text-[18px]">
                  {step.icon}
                </span>
                <p className="text-[9px] font-semibold leading-[13px] text-gray-100 md:text-[15px] md:leading-[21px]">
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mb-5 md:mb-[26px]">
          <div className="mb-4 text-center md:mb-5">
            <h3 className="text-[24px] font-black tracking-[-0.4px] text-white leading-[28px] md:text-[32px] md:leading-[38px]">
              Choose Your Tier
            </h3>
            <p className="mt-1 text-[11px] text-gray-300 md:text-[13px]">
              One-time payment · lifetime access · instant delivery
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {tiers.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              const isTopTier = tier.id === "obsession-50";

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierSelect(tier)}
                  className={`relative flex w-full flex-col rounded-[26px] border bg-[linear-gradient(160deg,rgba(7,10,9,0.96)_0%,rgba(4,7,6,0.9)_42%,rgba(8,20,14,0.92)_100%)] p-4 text-left transition-all duration-200 md:p-5 ${
                    isSelected
                      ? "border-emerald-300/70 shadow-[0_0_34px_-8px_rgba(52,211,153,0.45)]"
                      : "border-emerald-500/25 shadow-[0_0_24px_-12px_rgba(34,197,94,0.35)]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.13),transparent_55%)]" />
                  <div className="relative z-[1]">
                    {isTopTier ? (
                      <span className="mb-3 inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-300/15 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.8px] text-emerald-100 md:text-[10px]">
                        ★ Highest tier
                      </span>
                    ) : null}

                    <p className="text-[10px] font-black uppercase tracking-[0.9px] text-green-100 md:text-[12px]">
                      {tier.name}
                    </p>

                    <div className="mt-1.5 flex items-end gap-2">
                      <p className="text-[42px] font-black leading-[38px] text-emerald-300 md:text-[48px] md:leading-[44px]">
                        {tier.price}
                      </p>
                      <span className="pb-1 text-[11px] font-semibold text-gray-300 md:text-[12px]">
                        one-time
                      </span>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {tier.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2.5 text-left"
                        >
                          <span className="mt-[1px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-300/20 text-[11px] font-black leading-none text-emerald-100">
                            ✓
                          </span>
                          <span className="text-[12px] leading-[17px] text-gray-100 md:text-[13px] md:leading-[19px]">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <span className="mt-6 block w-full rounded-2xl bg-[linear-gradient(90deg,rgba(209,250,229,0.93)_0%,rgba(74,222,128,0.92)_100%)] px-4 py-3 text-center text-[13px] font-black text-emerald-950 shadow-[0_14px_30px_-14px_rgba(74,222,128,0.8)] md:text-[14px]">
                      {`Get ${tier.name} — ${tier.price}`}
                    </span>
                    <p className="mt-3 text-center text-[11px] font-semibold text-gray-300">
                      or pay with crypto
                    </p>

                    <p className="mt-2 text-center text-[10px] uppercase tracking-[0.8px] text-green-200/80">
                      {isSelected ? "Selected tier" : "Tap to select"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-[11px] font-semibold text-gray-400">
              Accepted:
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-100">
              💳 Card
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-100">
              ₿ Crypto
            </span>
          </div>
        </div>

        <div className="mb-[46.6667px] flex items-center justify-center rounded-xl border border-dashed border-green-500/25 bg-green-500/10 p-[13.3333px] text-center md:mb-[60.6667px] md:p-[17.3333px]">
          <div className="flex flex-col items-center gap-y-[6.66667px] text-xs font-bold leading-[18px] md:gap-y-[8.66667px] md:text-[15.6px] md:leading-[23.4px]">
            <span>
              Selected tier: {selectedTier.name} {selectedTier.price}
            </span>
            <span className="text-[10px] text-gray-300 md:text-[13px]">
              This tier now carries into the payment guidance and membership
              CTA.
            </span>
          </div>
        </div>
      </section>

      <LandingHero />

      <section className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline md:text-[17.3333px] md:leading-[26px] md:text-left">
        <h2 className="box-border caret-transparent text-xl font-extrabold tracking-[-0.5px] leading-[26.6667px] outline-[3px] break-words text-center no-underline mb-5 md:text-[26px] md:tracking-[-0.65px] md:leading-[34.6667px] md:mb-[26px]">
          Lust Playhouse FAQ
        </h2>
        <div className="grid gap-3 md:gap-4">
          {faq.map((item) => (
            <article
              key={item.question}
              className="bg-green-500/10 border border-green-500/25 box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-left no-underline overflow-hidden rounded-xl p-4 md:text-[17.3333px] md:leading-[26px] md:p-5"
            >
              <p className="box-border caret-transparent text-green-200 block text-[10px] font-bold tracking-[0.5px] leading-[13.3333px] min-h-[auto] min-w-[auto] outline-[3px] break-words text-left no-underline uppercase md:text-[13px] md:tracking-[0.65px] md:leading-[17.3333px]">
                {item.question}
              </p>
              <p className="box-border caret-transparent text-gray-300 text-[11px] font-light leading-[17.875px] outline-[3px] break-words no-underline mt-2">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
