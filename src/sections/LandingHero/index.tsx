import { HeroHeader } from "@/sections/LandingHero/components/HeroHeader";
import { FeatureBadges } from "@/sections/LandingHero/components/FeatureBadges";
import { ActionLinks } from "@/sections/LandingHero/components/ActionLinks";
import { OnlineMembers } from "@/sections/LandingHero/components/OnlineMembers";
import { HeroFooter } from "@/sections/LandingHero/components/HeroFooter";

export const LandingHero = () => {
  return (
    <div
      className="
        box-border caret-transparent
        text-[13.3333px] leading-5
        text-center md:text-left
        my-[23.3333px] md:my-[34.6667px]
      "
    >
      {/* ================= BACKGROUND ================= */}
      <div
        className="
          fixed inset-0 -z-10
          bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.18)_0%,rgba(0,0,0,0)_45%),radial-gradient(circle_at_80%_0%,rgba(185,28,28,0.22)_0%,rgba(0,0,0,0)_42%),linear-gradient(180deg,#030000_0%,#0a0000_100%)]
        "
      />

      {/* ================= MAIN CARD ================= */}
      <div
        className="
          backdrop-blur-sm
          bg-black/60
          border border-red-500/25
          box-border caret-transparent
          max-w-[520px] w-[90%]
          mx-auto
          p-6 md:p-8
          rounded-3xl
          shadow-[0_0_42px_rgba(220,38,38,0.14)]
        "
      >
        <HeroHeader />
        <FeatureBadges />
        <ActionLinks />
        <OnlineMembers />
        <HeroFooter />
      </div>
    </div>
  );
};
