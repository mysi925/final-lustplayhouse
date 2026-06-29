import { useEffect, useState } from "react";

const communityLinks = [
  {
    id: "channel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Join Free Channel",
    sub: "Official link · previews & drops",
    href: "https://t.me/+FZv49DSqQ_lmODcx",
  },
  {
    id: "chat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Official Chatroom",
    sub: "Active now · talk to members",
    href: "https://t.me/+KsCdMv3mCSVlY2Vh",
  },
  {
    id: "admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Contact Admin",
    sub: "Support & manual orders",
    href: "https://t.me/savslayr",
  },
];

const CommunitySection = () => (
  <div className="w-full px-4 mt-14">
    <div
      className="w-full max-w-[480px] mx-auto rounded-3xl p-6"
      style={{
        background: "linear-gradient(160deg, #130f2a 0%, #0f0c22 50%, #0a0814 100%)",
        border: "1px solid rgba(139,92,246,0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Live badge */}
      <div className="flex justify-center mb-6">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[2px] uppercase"
          style={{
            border: "1px solid rgba(168,85,247,0.4)",
            background: "rgba(168,85,247,0.12)",
            color: "rgba(216,180,254,1)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a855f7", boxShadow: "0 0 6px rgba(168,85,247,1)" }}
          />
          LUST PLAYHOUSE: LIVE
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-[28px] font-black text-white text-center leading-tight mb-2">
        Join The Community
      </h2>
      <p className="text-center text-sm mb-7" style={{ color: "rgba(200,190,220,0.55)" }}>
        Free channel, live chatroom & direct admin support
      </p>

      {/* Links */}
      <div className="space-y-3">
        {communityLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 group"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(139,92,246,0.18)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
              (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.18)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(168,85,247,0.25)",
                color: "rgba(216,180,254,0.9)",
              }}
            >
              {link.icon}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-white font-bold text-[15px] leading-snug">{link.title}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(200,190,220,0.45)" }}>{link.sub}</div>
            </div>
            <span
              className="text-base transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ color: "rgba(168,85,247,0.7)" }}
            >
              →
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] uppercase tracking-[2px] mt-8" style={{ color: "rgba(255,255,255,0.15)" }}>
        © 2026 Lust Playhouse • Private Member Lounge • Curated Nightly Access
      </p>
    </div>
  </div>
);

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

type TierOption = {
  id: string;
  name: string;
  price: string;
  features: string[];
  amount: number;
  highlight?: boolean;
};

const steps = [
  { id: "1", icon: "💳", copy: "Pick a tier & pay with card or crypto" },
  { id: "2", icon: "🔗", copy: "Your private channel link appears instantly" },
  { id: "3", icon: "🚀", copy: "Join your channel — access forever" },
];

const tiers: TierOption[] = [
  {
    id: "tease-15",
    name: "TEASE",
    price: "$15",
    amount: 1500,
    features: ["Access 750+ Videos", "Bop Content", "Snapchat Leaks"],
  },
  {
    id: "desire-25",
    name: "DESIRE",
    price: "$25",
    amount: 2500,
    features: ["Access 5000+ Videos", "Everything in Tease", "Higher Quality Drops"],
  },
  {
    id: "obsession-50",
    name: "OBSESSION",
    price: "$50",
    amount: 5000,
    features: [
      "Access 10000+ Videos",
      "All Categories",
      "Teen Exclusives (18+)",
      "Priority Updates",
      "Member Requests",
    ],
    highlight: true,
  },
];

/* ─── HOW IT WORKS ─────────────────────────── */
const HowItWorksSection = () => (
  <div className="w-full px-4 mb-10">
    <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-5">
      From payment to access in seconds
    </p>
    <div className="grid grid-cols-3 gap-2 max-w-[480px] mx-auto">
      {steps.map((step) => (
        <div
          key={step.id}
          className="relative flex flex-col items-center justify-start rounded-2xl border border-purple-500/20 bg-[#0d0f1a]/80 p-3 aspect-square"
        >
          <div className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_8px_rgba(168,85,247,0.6)]">
            {step.id}
          </div>
          <div className="w-9 h-9 rounded-full mt-2 mb-2 border border-purple-400/30 bg-purple-500/10 flex items-center justify-center text-base shadow-[0_0_12px_rgba(168,85,247,0.15)]">
            {step.icon}
          </div>
          <p className="text-white text-[10px] leading-[1.3] text-center font-medium">
            {step.copy}
          </p>
        </div>
      ))}
    </div>
  </div>
);

/* ─── PRICING CARDS ─────────────────────────── */
const PricingCards = ({ onBuy }: { onBuy: (tier: TierOption) => void }) => (
  <div className="w-full px-4 max-w-[480px] mx-auto space-y-3">
    {tiers.map((tier) => (
      <div
        key={tier.id}
        className={`relative rounded-2xl p-5 border ${
          tier.highlight
            ? "border-purple-500/70 bg-[#0d0f1a] shadow-[0_0_40px_rgba(168,85,247,0.25)]"
            : "border-white/10 bg-[#0d0f1a]/80"
        }`}
      >
        {tier.highlight && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 border border-purple-400/40 text-purple-200 text-[10px] font-bold uppercase tracking-widest">
              ★ Highest Tier
            </span>
          </div>
        )}
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">
          {tier.name}
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-black text-white">{tier.price}</span>
          <span className="text-xs text-gray-500">one-time</span>
        </div>
        <div className="space-y-2 mb-5">
          {tier.features.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <span className="flex-shrink-0 w-4 h-4 rounded-full border border-purple-400/60 bg-purple-500/20 flex items-center justify-center text-[9px] text-purple-300 font-bold">
                ✓
              </span>
              <span className="text-white text-sm">{f}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => onBuy(tier)}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
        >
          Get {tier.name.charAt(0) + tier.name.slice(1).toLowerCase()} — {tier.price}
        </button>
        <p className="text-center text-[11px] text-gray-500 mt-2">or pay with crypto</p>
      </div>
    ))}
  </div>
);

/* ─── MAIN EXPORT ───────────────────────────── */
export const StepsSection = () => {
  const [, setSelectedTier] = useState<TierOption>(tiers[0]);

  useEffect(() => {
    const stored = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (stored) {
      const match = tiers.find((t) => t.id === stored);
      if (match) setSelectedTier(match);
    }
  }, []);

  const handleBuy = (tier: TierOption) => {
    window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);

    const routeByTierId: Record<string, string> = {
      "tease-15": "tease",
      "desire-25": "desire",
      "obsession-50": "obsession",
    };

    const route = routeByTierId[tier.id];
    window.location.href = `https://lustplayhouse.cloud/${route}`;
  };

  return (
    <div className="w-full flex flex-col items-center text-center pb-16">

      <div className="px-4 mb-8 w-full max-w-[480px]">
        <h2 className="text-3xl font-black text-white">How It Works</h2>
        <p className="text-gray-400 text-sm mt-1">Simple. Instant. Lifetime access.</p>
      </div>

      <HowItWorksSection />

      <div className="w-full px-4 mb-8 max-w-[480px] mx-auto">
        <h2 className="text-2xl font-black text-white mb-1">Choose Your Tier</h2>
        <p className="text-gray-400 text-sm">One-time payment · lifetime access · instant delivery</p>
      </div>

      <PricingCards onBuy={handleBuy} />

      <div className="flex items-center gap-3 mt-5 text-sm text-gray-400">
        <span>Accepted:</span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0f1a] border border-white/10 text-white text-xs font-medium">
          💳 Card
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0f1a] border border-white/10 text-white text-xs font-medium">
          ₵ Crypto
        </span>
      </div>

      <CommunitySection />

    </div>
  );
};
