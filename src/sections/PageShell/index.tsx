import { PreviewCard } from "@/sections/PageShell/components/PreviewCard";

export const PageShell = () => {
  return (
    <div className="items-center box-border caret-transparent flex flex-col text-[13.3333px] justify-center leading-5 min-h-[1000px] min-w-[auto] outline-[3px] break-words relative no-underline z-[2] overflow-hidden p-[13.3333px] md:text-[17.3333px] md:leading-[26px] md:p-[17.3333px]">
      <PreviewCard />
    </div>
  );
};
