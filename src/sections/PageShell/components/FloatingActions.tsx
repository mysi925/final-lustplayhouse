import { FloatingMembershipCta } from "@/sections/PageShell/components/FloatingMembershipCta";
import { FloatingAdminCta } from "@/sections/PageShell/components/FloatingAdminCta";

export const FloatingActions = () => {
  return (
    <div className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline my-[23.3333px] md:text-[17.3333px] md:leading-[26px] md:text-left md:my-[34.6667px]">
      <title className="box-border caret-transparent hidden text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline md:text-[17.3333px] md:leading-[26px] md:text-left">
        Dual Prosperity Widgets Preview
      </title>
      <FloatingMembershipCta />
      <FloatingAdminCta />
    </div>
  );
};
