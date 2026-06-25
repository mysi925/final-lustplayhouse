import { useEffect, useMemo, useState } from "react";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

type TierContext = {
  id: string;
  name: string;
  price: string;
};

const fallbackTier: TierContext = {
  id: "tease-15",
  name: "Tease Tier",
  price: "$15",
};

const tierLabels: Record<string, TierContext> = {
  "tease-15": {
    id: "tease-15",
    name: "Tease Tier",
    price: "$15",
  },
  "desire-25": {
    id: "desire-25",
    name: "Desire Tier",
    price: "$25",
  },
  "obsession-50": {
    id: "obsession-50",
    name: "Obsession Tier",
    price: "$50",
  },
};

export const EmbeddedContent = () => {
  const [selectedTier, setSelectedTier] = useState<TierContext>(fallbackTier);

  useEffect(() => {
    const storedTierId = window.localStorage.getItem(TIER_STORAGE_KEY);
    if (storedTierId && tierLabels[storedTierId]) {
      setSelectedTier(tierLabels[storedTierId]);
    }

    const onTierSelected = (event: Event) => {
      const customEvent = event as CustomEvent<TierContext>;
      if (customEvent.detail?.id && tierLabels[customEvent.detail.id]) {
        setSelectedTier(tierLabels[customEvent.detail.id]);
      }
    };

    window.addEventListener("lust-tier-selected", onTierSelected);
    return () => {
      window.removeEventListener("lust-tier-selected", onTierSelected);
    };
  }, []);

  const selectedTierPayload = useMemo(
    () =>
      `{
  "tierId": "${selectedTier.id}",
  "tierName": "${selectedTier.name}",
  "amountUsd": ${selectedTier.price.replace("$", "")}
}`,
    [selectedTier],
  );

  return (
    <div className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline my-[23.3333px] md:text-[17.3333px] md:leading-[26px] md:text-left md:my-[34.6667px]">
      <section className="bg-black/50 border border-rose-500/25 rounded-2xl p-4 md:p-6">
        <h3 className="text-rose-200 text-[12px] font-bold uppercase tracking-[1.2px] md:text-[14px]">
          Payment guidance with selected tier context
        </h3>
        <p className="text-gray-300 text-[10px] mt-2 md:text-[13px]">
          Selected tier is now carried into this guidance block and into the
          membership checkout CTA.
        </p>

        <div className="mt-4 bg-rose-500/10 border border-rose-500/25 rounded-xl p-3 md:p-4">
          <p className="text-rose-200 text-[10px] font-bold uppercase tracking-[1px] md:text-[12px]">
            Active tier
          </p>
          <p className="text-fuchsia-200 text-[14px] font-bold mt-1 md:text-[18px]">
            {selectedTier.name} {selectedTier.price}
          </p>
          <p className="text-gray-300 text-[10px] mt-1 md:text-[12px]">
            Use this exact tier payload in your backend checkout request body.
          </p>
        </div>

        <pre className="mt-3 bg-black/60 border border-rose-500/25 rounded-xl p-3 text-left text-rose-100 text-[9px] leading-4 overflow-x-auto md:text-[12px] md:leading-5">
          {selectedTierPayload}
        </pre>

        <h4 className="text-rose-200 text-[11px] font-bold uppercase tracking-[1px] mt-4 md:text-[13px]">
          Square payment backend folder map
        </h4>
        <pre className="mt-2 bg-black/60 border border-rose-500/25 rounded-xl p-3 text-left text-rose-100 text-[9px] leading-4 overflow-x-auto md:text-[12px] md:leading-5">
          {`src/integrations/square/
  client.ts
  config.ts
  types.ts
  README.md
  server/
    createPaymentLink.ts
    README.md`}
        </pre>
      </section>
    </div>
  );
};
