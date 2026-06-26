export const HeroFooter = () => {
  return (
    <footer className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words text-center no-underline mt-[53.3333px] md:text-[17.3333px] md:leading-[26px] md:mt-[69.3333px]">
      
      <div className="flex flex-col items-center justify-center gap-2">

        {/* TAGLINE */}
        <p className="text-red-400/60 text-[9px] font-bold tracking-[2.7px] uppercase">
          THE BIGGEST INTERNET PLAYHOUSE
        </p>

        {/* COPYRIGHT */}
        <p className="text-red-500/70 text-[10px] font-medium tracking-[1.5px] uppercase">
          © 2026 LUST PLAYHOUSE
        </p>

      </div>

    </footer>
  );
};
