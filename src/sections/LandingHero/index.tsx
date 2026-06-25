import { HeroHeader } from "@/sections/LandingHero/components/HeroHeader";
import { FeatureBadges } from "@/sections/LandingHero/components/FeatureBadges";
import { ActionLinks } from "@/sections/LandingHero/components/ActionLinks";
import { OnlineMembers } from "@/sections/LandingHero/components/OnlineMembers";
import { HeroFooter } from "@/sections/LandingHero/components/HeroFooter";

export const LandingHero = () => {
  return (
    <div className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline my-[23.3333px] md:text-[17.3333px] md:leading-[26px] md:text-left md:my-[34.6667px]">
      <div className="bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.2)_0%,rgba(0,0,0,0)_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.22)_0%,rgba(0,0,0,0)_42%),linear-gradient(180deg,#030806_0%,#03110c_100%)] box-border caret-transparent fixed inset-0 -z-10"></div>
      <div className="backdrop-blur-sm bg-black/50 border border-green-500/25 box-border caret-transparent text-[13.3333px] leading-5 max-w-[520px] outline-[3px] break-words text-center no-underline w-[90%] z-10 mx-auto p-6 rounded-3xl shadow-[0_0_42px_rgba(34,197,94,0.14)] md:text-[17.3333px] md:leading-[26px] md:text-left md:p-8">
        <HeroHeader />
        <FeatureBadges />
        <ActionLinks />
        <OnlineMembers />
        <HeroFooter />
      </div>
    </div>
  );
};
