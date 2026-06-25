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

export const FloatingMembershipCta = () => {
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

  const checkoutUrl = useMemo(() => {
    const params = new URLSearchParams({
      tier: selectedTier.id,
      amount: selectedTier.price.replace("$", ""),
    });
    return `https://ko-fi.com/givemewins?${params.toString()}`;
  }, [selectedTier]);

  return (
    <div className="items-center box-border caret-transparent flex text-[13.3333px] justify-start leading-5 outline-[3px] break-words pointer-events-none fixed text-center no-underline z-50 left-[13.3333px] bottom-5 md:text-[17.3333px] md:leading-[26px] md:text-left md:left-[26px] md:bottom-[26px]">
      <button className="items-center bg-transparent bg-[linear-gradient(135deg,rgb(17,17,17)_0%,rgb(0,0,0)_100%)] shadow-[rgba(212,175,55,0.15)_0px_0px_20px_0px,rgba(212,175,55,0.1)_0px_0px_15px_0px_inset] caret-transparent flex text-[13.3333px] h-[46.6667px] justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] break-words pointer-events-auto relative text-center no-underline w-[46.6667px] z-10 border border-amber-400/40 p-0 rounded-full md:text-[17.3333px] md:h-[69.3333px] md:leading-[26px] md:w-[69.3333px]">
        <img
          src="https://c.animaapp.com/mqt2uy69MQEOY8/assets/icon-1.svg"
          alt="Icon"
          className="box-border caret-transparent text-[13.3333px] h-5 leading-5 outline-[3px] relative no-underline w-5 -top-px md:text-[17.3333px] md:h-[34.6667px] md:leading-[26px] md:w-[34.6667px]"
        />
      </button>
      <div className="items-center backdrop-blur-[20px] bg-[linear-gradient(165deg,rgba(20,20,20,0.95)_0%,rgba(5,5,5,0.98)_100%)] shadow-[rgba(0,0,0,0.9)_0px_10px_40px_0px,rgba(212,175,55,0.05)_0px_0px_20px_0px_inset] box-border caret-transparent gap-x-[13.3333px] flex flex-col text-[13.3333px] justify-center leading-5 min-h-[auto] min-w-[auto] opacity-0 outline-[3px] break-words relative gap-y-[13.3333px] text-center no-underline translate-x-[-60px] w-[220px] z-0 border border-amber-400/20 ml-2.5 p-[16.6667px] rounded-[6.66667px] border-solid md:gap-x-[17.3333px] md:text-[17.3333px] md:leading-[26px] md:gap-y-[17.3333px] md:text-left md:w-60 md:ml-[17.3333px] md:p-[21.6667px] md:rounded-[8.66667px]">
        <div className="box-border caret-transparent flex text-[13.3333px] justify-center leading-5 outline-[3px] break-words absolute text-center no-underline w-full mt-[6.66667px] top-0 md:text-[17.3333px] md:leading-[26px] md:text-left md:mt-[8.66667px]">
          <div className="bg-[linear-gradient(to_right,rgba(0,0,0,0),rgb(212,175,55),rgba(0,0,0,0))] box-border caret-transparent text-[13.3333px] h-px leading-5 min-h-[auto] min-w-[auto] opacity-50 outline-[3px] break-words text-center no-underline w-10 md:text-[17.3333px] md:leading-[26px] md:text-left md:w-[52px]"></div>
        </div>
        <p className="box-border caret-transparent text-[13.3333px] italic tracking-[0.333333px] leading-[16.6667px] min-h-[auto] min-w-[auto] outline-[3px] break-words text-center no-underline mt-[3.33333px] font-ui_serif md:text-[19.5px] md:tracking-[0.4875px] md:leading-[30.3333px] md:mt-[4.33333px]">
          {" "}
          Join {selectedTier.name}{" "}
          <br className="box-border caret-transparent text-[13.3333px] tracking-[0.333333px] leading-[16.6667px] outline-[3px] break-words no-underline md:text-[19.5px] md:tracking-[0.4875px] md:leading-[30.3333px]" />
          <span className="bg-clip-text bg-[linear-gradient(135deg,rgb(212,175,55)_0%,rgb(249,228,152)_50%,rgb(184,134,11)_100%)] box-border caret-transparent block text-[10px] not-italic font-bold tracking-[1px] leading-[13.3333px] outline-[3px] break-words no-underline uppercase mt-[3.33333px] md:text-[15.1667px] md:tracking-[1.51667px] md:leading-[21.6667px] md:mt-[4.33333px]">
            {selectedTier.price} selected
          </span>
        </p>
        <a
          href={checkoutUrl}
          className="items-center bg-[linear-gradient(135deg,rgb(212,175,55)_0%,rgb(249,228,152)_50%,rgb(184,134,11)_100%)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(212,175,55,0.2)_0px_0px_15px_0px] box-border caret-transparent text-black gap-x-[6.66667px] flex text-[10px] font-extrabold justify-center tracking-[2px] leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] break-words relative gap-y-[6.66667px] text-center no-underline uppercase w-full overflow-hidden py-[8.33333px] rounded-[3.33333px] md:gap-x-[8.66667px] md:text-[13px] md:tracking-[2.6px] md:leading-[17.3333px] md:gap-y-[8.66667px] md:text-left md:py-[10.8333px] md:rounded-[4.33333px] after:accent-auto after:bg-[linear-gradient(45deg,rgba(0,0,0,0),rgba(255,255,255,0.5),rgba(0,0,0,0))] after:box-border after:caret-transparent after:text-black after:block after:text-[10px] after:not-italic after:normal-nums after:font-extrabold after:h-[200%] after:tracking-[2px] after:leading-[15px] after:list-outside after:list-disc after:outline-[3px] after:break-words after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:uppercase after:rotate-45 after:visible after:w-[200%] after:border-separate after:-left-2/4 after:-top-2/4 after:font-plus_jakarta_sans after:md:text-[13px] after:md:tracking-[2.6px] after:md:leading-[17.3333px] after:md:text-left"
        >
          {" "}
          Membership{" "}
          <img
            src="https://c.animaapp.com/mqt2uy69MQEOY8/assets/icon-2.svg"
            alt="Icon"
            className="box-border caret-transparent text-[10px] h-3 tracking-[2px] leading-[15px] outline-[3px] text-center no-underline w-3 md:text-[13px] md:tracking-[2.6px] md:leading-[17.3333px] md:text-left"
          />
        </a>
      </div>
    </div>
  );
};
