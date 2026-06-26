import { PreviewCard } from "@/sections/PageShell/components/PreviewCard";

export const PageShell = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">

      {/* FORCE TRANSPARENCY BACKGROUND TEST */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />

      <div className="relative z-10 w-full">
        <PreviewCard />
      </div>

    </div>
  );
};
