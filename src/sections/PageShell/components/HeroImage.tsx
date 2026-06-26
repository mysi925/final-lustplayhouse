import { useState } from "react";

const previewVideos = [
  "https://player.mediadelivery.net/embed/690906/d7a9dc7b-3709-4422-b7d2-cf4f771686c2?autoplay=true&muted=true&preload=true&responsive=true&controls=false",
  "https://player.mediadelivery.net/embed/690906/a485386e-cbe4-4ea0-bad8-27794aecb7fb?autoplay=true&muted=true&preload=true&responsive=true&controls=false",
  "https://player.mediadelivery.net/embed/690906/6dd8baf1-b13d-4ba4-b874-2a567e92068c?autoplay=true&muted=true&preload=true&responsive=true&controls=false",
  "https://player.mediadelivery.net/embed/690906/80d22f4c-65d5-47ba-ba6e-8b4603829d12?autoplay=true&muted=true&preload=true&responsive=true&controls=false",
  "https://player.mediadelivery.net/embed/690906/4bfa810a-87ba-444f-a1de-362fcc376d60?autoplay=true&muted=true&preload=true&responsive=true&controls=false",
  "https://player.mediadelivery.net/embed/690906/36fbc681-637c-4cd1-9dea-fa36e867df3e?autoplay=true&muted=true&preload=true&responsive=true&controls=false",
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
      
      {/* CAROUSEL CONTAINER */}
      <div
        className="
          relative
          w-[340px] md:w-[460px]
          h-[600px] md:h-[720px]
          rounded-[28px]
          overflow-hidden
          bg-black
          shadow-[0_0_40px_rgba(0,0,0,0.9)]
        "
        onClick={goNext}
        onContextMenu={(e) => {
          e.preventDefault();
          goPrev();
        }}
      >
        {/* ACTIVE VIDEO */}
        <iframe
          src={previewVideos[activeIndex]}
          className="
            w-full
            h-full
            scale-[1.02]
            object-cover
          "
          allow="autoplay; fullscreen"
          loading="lazy"
        />
      </div>
    </div>
  );
};
