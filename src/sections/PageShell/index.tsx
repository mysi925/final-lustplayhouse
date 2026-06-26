import { PreviewCard } from "@/sections/PageShell/components/PreviewCard";

export const PageShell = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-[13.3333px] md:text-[17.3333px] leading-5 md:leading-[26px] p-[13.3333px] md:p-[17.3333px] break-words caret-transparent">

      {/* CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <PreviewCard />
      </div>

    </div>
  );
};
