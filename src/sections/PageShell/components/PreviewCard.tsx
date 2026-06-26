import { HeroImage } from "@/sections/PageShell/components/HeroImage";
import { SeoHeading } from "@/sections/PageShell/components/SeoHeading";
import { SubscriptionGuide } from "@/sections/SubscriptionGuide";

export const PreviewCard = () => {
  return (
    <div
      role="main"
      className="
        flex items-center justify-center
        max-w-full relative z-[1]
        rounded-[20px]
        md:rounded-[26px]
      "
    >
      <div
        className="
          relative w-[480px] max-w-full
          rounded-[20px] p-5
          md:w-[624px] md:p-[26px] md:rounded-[26px]
        "
      >
        {/* ================= HEADER ================= */}
        <div className="mb-5 select-none text-center">
          <div className="leading-none">
            <h1
              className="
                uppercase
                font-black
                text-[56px]
                md:text-[76px]
                tracking-[0.04em]

                bg-[linear-gradient(90deg,#8A3DFF_0%,#A548FF_20%,#C24BFF_45%,#E64BA8_75%,#FF5F9C_100%)]
                bg-clip-text
                text-transparent

                [text-shadow:
                  0_0_6px_rgba(138,61,255,.95),
                  0_0_14px_rgba(165,72,255,.85),
                  0_0_28px_rgba(194,75,255,.65),
                  0_0_44px_rgba(255,95,156,.45)]
              "
            >
              LUST
            </h1>

            <p
              className="
                mt-2
                uppercase
                font-semibold
                tracking-[0.52em]
                text-[13px]
                md:text-[16px]

                bg-[linear-gradient(90deg,#8A3DFF_0%,#A548FF_35%,#C24BFF_60%,#FF5F9C_100%)]
                bg-clip-text
                text-transparent

                [text-shadow:
                  0_0_5px_rgba(138,61,255,.8),
                  0_0_12px_rgba(194,75,255,.55)]
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
