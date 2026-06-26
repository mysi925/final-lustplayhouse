// Updated HeroImage.jsx
// Changes:
// - Smaller main preview (280x420 desktop, 240x360 mobile)
// - Crops iframe slightly to minimize Bunny letterboxing
// - Smaller side previews
// Replace your current HeroImage.jsx with this version and adjust the
// iframe zoom (118%) if needed.

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
 const [activeIndex,setActiveIndex]=useState(0);
 const [muted,setMuted]=useState(true);
 const goNext=()=>setActiveIndex(p=>(p+1)%previewVideos.length);
 const goPrev=()=>setActiveIndex(p=>p===0?previewVideos.length-1:p-1);
 const prevIndex=activeIndex===0?previewVideos.length-1:activeIndex-1;
 const nextIndex=(activeIndex+1)%previewVideos.length;

 const Side=({src,left})=>(
 <div className={`hidden md:block absolute ${left?"left-2":"right-2"} top-1/2 -translate-y-1/2 w-[95px] h-[145px] rounded-[18px] overflow-hidden opacity-40`}>
 <iframe src={src} className="absolute top-1/2 left-1/2 w-[130%] h-[130%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" allow="autoplay"/>
 <div className="absolute inset-0 bg-[#080a14]/50"/>
 </div>);

 return (
 <div className="flex flex-col items-center mb-10">
  <div className="relative flex items-center justify-center w-full">
   <button onClick={goPrev} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0d0f1a]/80 border border-white/15 items-center justify-center text-white">‹</button>
   <button onClick={goNext} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0d0f1a]/80 border border-white/15 items-center justify-center text-white">›</button>
   <Side src={previewVideos[prevIndex]} left />
   <Side src={previewVideos[nextIndex]} />
   <div className="relative z-10 w-[240px] h-[360px] md:w-[280px] md:h-[420px] rounded-[26px] overflow-hidden border border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,.45)] bg-[#080a14]">
    <button onClick={()=>setMuted(m=>!m)} className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/50 text-white">{muted?"🔇":"🔊"}</button>
    <iframe key={activeIndex} src={previewVideos[activeIndex]} className="absolute top-1/2 left-1/2 w-[118%] h-[118%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" allow="autoplay"/>
    <button onClick={goPrev} className="absolute left-0 top-0 w-1/2 h-full"/>
    <button onClick={goNext} className="absolute right-0 top-0 w-1/2 h-full"/>
   </div>
  </div>
  <div className="mt-4 flex gap-1.5">{previewVideos.map((_,i)=><button key={i} onClick={()=>setActiveIndex(i)} className={i===activeIndex?"h-1.5 w-6 rounded-full bg-purple-400":"h-1.5 w-1.5 rounded-full bg-white/30"} />)}</div>
 </div>);
};
