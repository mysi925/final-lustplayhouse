import { useMemo, useState } from "react";

type PreviewVideo = {
  src: string;
};

const previewVideos: PreviewVideo[] = [
  {
    src: "https://player.mediadelivery.net/embed/690906/d7a9dc7b-3709-4422-b7d2-cf4f771686c2?autoplay=true&muted=true&preload=true&responsive=true",
  },
  {
    src: "https://player.mediadelivery.net/embed/690906/a485386e-cbe4-4ea0-bad8-27794aecb7fb?autoplay=true&muted=true&preload=true&responsive=true",
  },
  {
    src: "https://player.mediadelivery.net/embed/690906/6dd8baf1-b13d-4ba4-b874-2a567e92068c?autoplay=true&muted=true&preload=true&responsive=true",
  },
  {
    src: "https://player.mediadelivery.net/embed/690906/80d22f4c-65d5-47ba-ba6e-8b4603829d12?autoplay=true&muted=true&preload=true&responsive=true",
  },
  {
    src: "https://player.mediadelivery.net/embed/690906/4bfa810a-87ba-444f-a1de-362fcc376d60?autoplay=true&muted=true&preload=true&responsive=true",
  },
  {
    src: "https://player.mediadelivery.net/embed/690906/36fbc681-637c-4cd1-9dea-fa36e867df3e?autoplay=true&muted=true&preload=true&responsive=true",
  },
];

const wrapIndex = (index: number, length: number) => {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
};

export const HeroImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const length = previewVideos.length;

  const indices = useMemo(() => {
    return {
      prev: wrapIndex(activeIndex - 1, length),
      next: wrapIndex(activeIndex + 1, length),
      active: wrapIndex(activeIndex, length),
    };
  }, [activeIndex, length]);

  const goToPrev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, length));
  };

  const goToNext = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, length));
  };

  const onTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLSpanElement>) => {
    if (touchStartX === null) return;

    const delta = e.changedTouches[0].clientX - touchStartX;

    if (delta > 40) goToPrev();
    if (delta < -40) goToNext();

    setTouchStartX(null);
  };

  return (
    <div className="flex justify-center mb-10">
      <span
        className="relative inline-block h-[300px] w-[326px] md:h-[390px] md:w-[424px] overflow-hidden rounded-[24px] bg-black"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* LEFT PREVIEW */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[46%] h-[90%] -translate-x-[62%] opacity-60 overflow-hidden"
        >
          <iframe
            src={previewVideos[indices.prev]?.src}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            loading="lazy"
          />
        </button>

        {/* RIGHT PREVIEW */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[46%] h-[90%] translate-x-[62%] opacity-60 overflow-hidden"
        >
          <iframe
            src={previewVideos[indices.next]?.src}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            loading="lazy"
          />
        </button>

        {/* ACTIVE */}
        <div className="absolute inset-0 z-20">
          <iframe
            src={previewVideos[indices.active]?.src}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* NAV BUTTONS */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
        >
          ‹
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {previewVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === activeIndex ? "bg-green-300" : "bg-green-600/50"
              }`}
            />
          ))}
        </div>
      </span>
    </div>
  );
};
