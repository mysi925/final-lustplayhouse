import { HeroImage } from "@/sections/PageShell/components/HeroImage";
import { SeoHeading } from "@/sections/PageShell/components/SeoHeading";
import { SubscriptionGuide } from "@/sections/SubscriptionGuide";

export const PreviewCard = () => {
  return (
    <div
      role="main"
      className="items-center box-border caret-transparent flex shrink-0 text-[13.3333px] justify-center leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] break-words relative text-center no-underline z-[1] rounded-[20px] md:text-[17.3333px] md:leading-[26px] md:text-left md:rounded-[26px]"
    >
      <div className="box-border caret-transparent text-[13.3333px] leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] break-words relative text-center no-underline w-[480px] z-[1] p-5 rounded-[20px] md:text-[17.3333px] md:leading-[26px] md:text-left md:w-[624px] md:p-[26px] md:rounded-[26px]">
        <div className="mb-4 select-none text-center md:mb-5">
          <div className="leading-none">
            <h1 className="bg-gradient-to-r from-white via-emerald-200 to-green-400 bg-clip-text text-[54px] font-black uppercase tracking-[0.08em] text-transparent drop-shadow-[0_0_16px_rgba(34,197,94,0.3)] md:text-[74px]">
              Lust
            </h1>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.52em] text-green-100/90 md:text-[16px]">
              Playhouse
            </p>
          </div>
        </div>
        <HeroImage />
        <SubscriptionGuide />
        <SeoHeading />
      </div>
    </div>
  );
};
