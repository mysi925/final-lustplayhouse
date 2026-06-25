import { useMemo, useState } from "react";

type PreviewVideo = {
  src: string;
};

const previewVideos: PreviewVideo[] = [
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374356/video1_zoqpk2.mp4",
  },
  {
    src: "/video2.mp4",
  },
  {
    src: "/video3.mp4",
  },
  {
    src: "/video4.mp4",
  },
  {
    src: "/video5.mp4",
  },
  {
    src: "/video6.mp4",
  },
  {
  
  },
];

const wrapIndex = (index: number, length: number) => {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
};

export const HeroImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const indices = useMemo(
    () => ({
      prev: wrapIndex(activeIndex - 1, previewVideos.length),
      next: wrapIndex(activeIndex + 1, previewVideos.length),
    }),
    [activeIndex],
  );

  const goToPrev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, previewVideos.length));
  };

  const goToNext = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, previewVideos.length));
  };

  const onTouchStart = (event: React.TouchEvent<HTMLSpanElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLSpanElement>) => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (delta > 40) goToPrev();
    if (delta < -40) goToNext();
    setTouchStartX(null);
  };

  return (
    <div className="box-border caret-transparent text-[13.3333px] leading-[0px] max-w-full outline-[3px] break-words relative text-center no-underline mb-[23.3333px] flex justify-center md:text-[17.3333px] md:mb-[34.6667px]">
      <span
        className="relative box-border caret-transparent inline-block h-[300px] w-[326.667px] max-w-full overflow-hidden rounded-[24px] bg-[#020604] ring-1 ring-green-400/20 shadow-[0_0_22px_rgba(34,197,94,0.2)] md:h-[390px] md:w-[424.667px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <span
          className="pointer-events-none absolute inset-0 z-[1] opacity-35"
          style={{
            background:
              "radial-gradient(circle at 12% 12%, rgba(34,197,94,0.2), transparent 42%), radial-gradient(circle at 84% 90%, rgba(16,185,129,0.16), transparent 45%)",
          }}
        />
        <span
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.09]"
          style={{
            background:
              "linear-gradient(to right, rgba(34,197,94,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute inset-0">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Open previous preview"
            className="group absolute left-0 top-1/2 z-10 h-[90%] w-[46%] -translate-x-[62%] -translate-y-1/2 overflow-hidden rounded-[22px] opacity-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-65"
          >
            <video
              src={previewVideos[indices.prev].src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="h-full w-full scale-[0.95] object-cover brightness-65 contrast-105 saturate-70 blur-[1.2px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.98] group-hover:blur-[0.8px]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Open next preview"
            className="group absolute right-0 top-1/2 z-10 h-[90%] w-[46%] translate-x-[62%] -translate-y-1/2 overflow-hidden rounded-[22px] opacity-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-65"
          >
            <video
              src={previewVideos[indices.next].src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="h-full w-full scale-[0.95] object-cover brightness-65 contrast-105 saturate-70 blur-[1.2px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.98] group-hover:blur-[0.8px]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/55 via-black/35 to-transparent" />
          </button>

          <button
            type="button"
            aria-label={`Active preview ${activeIndex + 1}`}
            className="absolute inset-0 z-20 overflow-hidden"
          >
            <video
              src={previewVideos[activeIndex].src}
              muted
              loop
              autoPlay
              playsInline
              controls
              preload="metadata"
              className="h-full w-full object-cover brightness-105 contrast-110"
            />
          </button>
        </div>

        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous preview"
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-green-400/40 bg-black/65 p-2 text-green-200 shadow-[0_0_14px_rgba(34,197,94,0.25)] transition hover:scale-105 hover:border-green-300 hover:text-green-100 md:left-3"
        >
          <span className="block text-sm leading-none md:text-base">‹</span>
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next preview"
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-green-400/40 bg-black/65 p-2 text-green-200 shadow-[0_0_14px_rgba(34,197,94,0.25)] transition hover:scale-105 hover:border-green-300 hover:text-green-100 md:right-3"
        >
          <span className="block text-sm leading-none md:text-base">›</span>
        </button>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-green-400/25 bg-black/45 px-2.5 py-1 backdrop-blur-sm">
            {previewVideos.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to preview ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? "scale-110 bg-green-300 shadow-[0_0_10px_rgba(34,197,94,0.85)]" : "bg-green-600/55 hover:bg-green-400/80"}`}
                />
              );
            })}
          </div>
        </div>
      </span>
    </div>
  );
};
