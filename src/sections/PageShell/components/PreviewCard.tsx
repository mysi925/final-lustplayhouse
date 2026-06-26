import { HeroImage } from "@/sections/PageShell/components/HeroImage";
import { SeoHeading } from "@/sections/PageShell/components/SeoHeading";
import { SubscriptionGuide } from "@/sections/SubscriptionGuide";

export const PreviewCard = () => {
  return (
    <div
      role="main"
      className="flex items-center justify-center max-w-full relative z-[1]"
    >
      <div className="relative w-[480px] max-w-full p-5 md:w-[624px] md:p-[26px]">

        {/* ================= HEADER ================= */}
        <div className="mb-5 text-center select-none">

          <div className="relative inline-block">

            {/* Glow layer 1 */}
            <h1
              aria-hidden="true"
              className="absolute inset-0 uppercase font-black text-[56px] md:text-[76px] tracking-[0.04em] text-[#A548FF] blur-[18px] opacity-100 scale-105 pointer-events-none"
            >
              LUST
            </h1>

            {/* Glow layer 2 */}
            <h1
              aria-hidden="true"
              className="absolute inset-0 uppercase font-black text-[56px] md:text-[76px] tracking-[0.04em] text-[#D04DFF] blur-[32px] opacity-80 scale-110 pointer-events-none"
            >
              LUST
            </h1>

            {/* Glow layer 3 */}
            <h1
              aria-hidden="true"
              className="absolute inset-0 uppercase font-black text-[56px] md:text-[76px] tracking-[0.04em] text-[#FF5F9C] blur-[52px] opacity-55 scale-[1.18] pointer-events-none"
            >
              LUST
            </h1>

            {/* Main Logo */}
            <h1
              className="
                relative
                uppercase
                font-black
                text-[56px]
                md:text-[76px]
                tracking-[0.04em]
                bg-[linear-gradient(90deg,#8A3DFF_0%,#A548FF_20%,#C24BFF_45%,#E64BA8_75%,#FF5F9C_100%)]
                bg-clip-text
                text-transparent
              "
            >
              LUST
            </h1>

          </div>

          <div className="relative inline-block mt-2">

            {/* Glow */}
            <p
              aria-hidden="true"
              className="absolute inset-0 uppercase font-semibold tracking-[0.52em] text-[13px] md:text-[16px] text-[#C24BFF] blur-[8px] opacity-80 pointer-events-none"
            >
              PLAYHOUSE
            </p>

            {/* Main */}
            <p
              className="
                relative
                uppercase
                font-semibold
                tracking-[0.52em]
                text-[13px]
                md:text-[16px]
                bg-[linear-gradient(90deg,#8A3DFF_0%,#A548FF_35%,#C24BFF_60%,#FF5F9C_100%)]
                bg-clip-text
                text-transparent
              "
            >
              PLAYHOUSE
            </p>

          </div>

        </div>

        {/* ================= CONTENT ================= */}
        <HeroImage />
        <SubscriptionGuide />
        <SeoHeading />

      </div>
    </div>
  );
};
