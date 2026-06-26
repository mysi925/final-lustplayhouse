// NOTE: This file is based on the version you provided,
// with the portrait (2:3 / 720x1080-style) sizing updates applied.

import { useState } from "react";

const previewVideos = [
  "https://player.mediadelivery.net/embed/690906/d7a9dc7b-3709-4422-b7d2-cf4f771686c2?autoplay=true&muted=true&preload=true&responsive=true&controls=0",
  "https://player.mediadelivery.net/embed/690906/a485386e-cbe4-4ea0-bad8-27794aecb7fb?autoplay=true&muted=true&preload=true&responsive=true&controls=0",
  "https://player.mediadelivery.net/embed/690906/6dd8baf1-b13d-4ba4-b874-2a567e92068c?autoplay=true&muted=true&preload=true&responsive=true&controls=0",
  "https://player.mediadelivery.net/embed/690906/80d22f4c-65d5-47ba-ba6e-8b4603829d12?autoplay=true&muted=true&preload=true&responsive=true&controls=0",
  "https://player.mediadelivery.net/embed/690906/4bfa810a-87ba-444f-a1de-362fcc376d60?autoplay=true&muted=true&preload=true&responsive=true&controls=0",
  "https://player.mediadelivery.net/embed/690906/36fbc681-637c-4cd1-9dea-fa36e867df3e?autoplay=true&muted=true&preload=true&responsive=true&controls=0",
];

export const HeroImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const goNext = () => setActiveIndex((p)=>(p+1)%previewVideos.length);
  const goPrev = () => setActiveIndex((p)=>p===0?previewVideos.length-1:p-1);

  const prevIndex = activeIndex===0?previewVideos.length-1:activeIndex-1;
  const nextIndex = (activeIndex+1)%previewVideos.length;

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="relative flex items-center justify-center w-full">

        <button onClick={goPrev} className="hidden md:flex absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0d0f1a]/80 border border-white/15 items-center justify-center text-white/80 hover:text-white hover:bg-[#0d0f1a] text-xl">‹</button>
        <button onClick={goNext} className="hidden md:flex absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0d0f1a]/80 border border-white/15 items-center justify-center text-white/80 hover:text-white hover:bg-[#0d0f1a] text-xl">›</button>

        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[120px] h-[180px] rounded-[20px] overflow-hidden opacity-40 blur-[1px] scale-95">
          <iframe key={`prev-${prevIndex}`} src={previewVideos[prevIndex]} className="absolute inset-0 w-full h-full pointer-events-none" allow="autoplay" loading="lazy"/>
          <div className="absolute inset-0 bg-[#080a14]/50"/>
        </div>

        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[120px] h-[180px] rounded-[20px] overflow-hidden opacity-40 blur-[1px] scale-95">
          <iframe key={`next-${nextIndex}`} src={previewVideos[nextIndex]} className="absolute inset-0 w-full h-full pointer-events-none" allow="autoplay" loading="lazy"/>
          <div className="absolute inset-0 bg-[#080a14]/50"/>
        </div>

        <div className="relative z-10 w-[340px] h-[510px] md:w-[420px] md:h-[630px] rounded-[28px] overflow-hidden bg-[#080a14] border border-purple-500/60 shadow-[0_0_45px_rgba(168,85,247,0.45)]">
          <button onClick={()=>setMuted(m=>!m)} className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#0d0f1a]/60 border border-white/20 flex items-center justify-center text-white text-sm hover:bg-[#0d0f1a]/80">
            {muted ? "🔇":"🔊"}
          </button>

          <iframe
            key={activeIndex}
            src={previewVideos[activeIndex]}
            className="absolute inset-0 w-full h-full pointer-events-none"
            allow="autoplay"
            loading="lazy"
          />

          <button onClick={goPrev} className="absolute left-0 top-0 h-full w-1/2 z-10"/>
          <button onClick={goNext} className="absolute right-0 top-0 h-full w-1/2 z-10"/>

          <div className="absolute inset-0 bg-gradient-to-t from-[#080a14]/40 via-transparent to-[#0d0f1a]/20 pointer-events-none"/>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {previewVideos.map((_,i)=>(
          <button key={i} onClick={()=>setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i===activeIndex?"w-6 bg-purple-400":"w-1.5 bg-white/30 hover:bg-white/50"}`}/>
        ))}
      </div>
    </div>
  );
};
