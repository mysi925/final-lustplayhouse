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

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % previewVideos.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? previewVideos.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex justify-center mb-10">
      <div
        className="
          relative
          w-[340px] md:w-[460px]
          h-[600px] md:h-[720px]
          rounded-[28px]
          overflow-hidden
          bg-black
          shadow-[0_0_60px_rgba(220,38,38,0.15)]
        "
      >
        {/* VIDEO (FORCED CLEAN LAYER) */}
        <iframe
          key={activeIndex}
          src={previewVideos[activeIndex]}
          className="
            absolute inset-0
            w-[110%] h-[110%]
            -translate-x-[5%] -translate-y-[5%]
            pointer-events-none
            object-cover
          "
          allow="autoplay"
          loading="lazy"
        />

        {/* LEFT SWIPE */}
        <button
          onClick={goPrev}
          className="
            absolute left-0 top-0 h-full w-1/2
            z-10
          "
        />

        {/* RIGHT SWIPE */}
        <button
          onClick={goNext}
          className="
            absolute right-0 top-0 h-full w-1/2
            z-10
          "
        />

        {/* ARROWS */}
        <button
          onClick={goPrev}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            z-20
            text-white/70 hover:text-white
            text-2xl
          "
        >
          ‹
        </button>

        <button
          onClick={goNext}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            z-20
            text-white/70 hover:text-white
            text-2xl
          "
        >
          ›
        </button>

        {/* FADE OVERLAY (HIDES ANY EMBED UI GLITCHES) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>
    </div>
  );
};
