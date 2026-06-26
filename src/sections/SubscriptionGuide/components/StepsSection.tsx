import { useEffect, useState } from "react";
import { LandingHero } from "@/sections/LandingHero";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

/* ================= COMMUNITY BUTTONS ================= */
const CommunityButtons = () => {
  return (
    <div className="mt-16 grid gap-4 md:grid-cols-3">

      <a
        href="https://t.me/+FZv49DSqQ_lmODcx"
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-red-500/20 bg-black/40 p-5 text-center hover:border-red-400/60 transition"
      >
        <div className="text-2xl mb-2">📡</div>
        <div className="text-white font-bold">Free Channel</div>
        <div className="text-xs text-gray-400 mt-1">Previews & drops</div>
      </a>

      <a
        href="https://t.me/+KsCdMv3mCSVlY2Vh"
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-red-500/20 bg-black/40 p-5 text-center hover:border-red-400/60 transition"
      >
        <div className="text-2xl mb-2">💬</div>
        <div className="text-white font-bold">Chatroom</div>
        <div className="text-xs text-gray-400 mt-1">Talk with members</div>
      </a>

      <a
        href="https://t.me/savslayr"
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-red-500/20 bg-black/40 p-5 text-center hover:border-red-400/60 transition"
      >
        <div className="text-2xl mb-2">🛡️</div>
        <div className="text-white font-bold">Admin Support</div>
        <div className="text-xs text-gray-400 mt-1">Help & orders</div>
      </a>

    </div>
  );
};

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

  const handleBuy = async (tier: TierOption) => {
    try {
      window.localStorage.setItem(TIER_STORAGE_KEY, tier.id);

      const res = await fetch(
        "https://lustplayhouse.cloud/create-payment-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amountCents: tier.amount }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(JSON.stringify(data));
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div
