import { useEffect, useState } from "react";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

type TierOption = {
  id: string;
  name: string;
  price: string;
  amountCents: number;
  features: string[];
};

const tiers: TierOption[] = [
  {
    id: "tease-15",
    name: "Tease",
    price: "$15",
    amountCents: 1500,
    features: ["Access 1000+ Videos", "Bop Content", "Snapchat Leaks"],
  },
  {
    id: "desire-25",
    name: "Desire",
    price: "$25",
    amountCents: 2500,
    features: [
      "Access 3000+ Videos",
      "Everything in Tease",
      "Higher Quality Drops",
    ],
  },
  {
    id: "obsession-50",
    name: "Obsession",
    price: "$50",
    amountCents: 5000,
    features: [
      "Access 5000+ Videos",
      "All Categories",
      "18+ Exclusives",
      "Priority Updates",
    ],
  },
];

export const StepsSection = () => {
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (stored) {
      setSelectedTier(tiers.find((t) => t.id === stored) ?? tiers[0]);
    }
  }, []);

  const handleCheckout = async (tier: TierOption) => {
    try {
      setLoading(tier.id);

      const res = await fetch(
        "https://lustplayhouse.cloud/create-payment-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amountCents: tier.amountCents,
          }),
        }
      );

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Payment link failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full mx-auto max-w-[680px] px-4">

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {tiers.map((tier) => {
          const isLoading = loading === tier.id;

          return (
            <div
              key={tier.id}
              className="flex flex-col justify-between rounded-2xl border border-emerald-500/25 bg-[#050a08] p-6 min-h-[420px]"
            >

              <div>
                <h3 className="text-emerald-300 text-2xl font-bold">
                  {tier.name}
                </h3>

                <p className="text-white text-4xl font-black mt-2">
                  {tier.price}
                </p>

                <div className="mt-5 space-y-2 text-gray-200 text-sm">
                  {tier.features.map((f) => (
                    <div key={f}>✓ {f}</div>
                  ))}
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleCheckout(tier)}
                disabled={isLoading}
                className="mt-6 w-full rounded-xl bg-emerald-400 text-black font-bold py-3 hover:bg-emerald-300 transition disabled:opacity-50"
              >
                {isLoading ? "Redirecting..." : `Get ${tier.name}`}
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
};
