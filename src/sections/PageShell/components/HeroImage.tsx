import { useMemo, useState } from "react";

type PreviewVideo = {
  src: string;
};

const previewVideos: PreviewVideo[] = [
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374356/video1_zoqpk2.mp4",
  },
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374354/video5_almnn6.mp4",
  },
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video4_aktpzr.mp4",
  },
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video2_zrxhny.mp4",
  },
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video6_nqa0go.mp4",
  },
  {
    src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video3_nbelcm.mp4",
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
    [activeIndex]
  );

  const goToPrev = () => {
    setActiveIndex((prev) =>
      wrapIndex(prev - 1, previewVideos.length)
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      wrapIndex(prev + 1, previewVideos.length)
    );
  };

  const onTouchStart = (event: React.TouchEvent<HTMLSpanElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLSpanElement>) => {
    if (touchStartX === null) return;

    const delta =
      event.changedTouches[0].clientX - touchStartX;

    if (delta > 40) goToPrev();
    if (delta < -40) goToNext();

    setTouchStartX(null);
  };

  return (
    <div className="flex justify-center relative mb-[23px] md:mb-[34px]">
      <span
        className="relative inline-block h-[300px] w-[326px] md:h-[390px] md:w-[424px] overflow-hidden rounded-[24px] bg-[#020604] ring-1 ring-green-400/20 shadow-[0_0_22px_rgba(34,197,94,0.2)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* BACKGROUND EFFECTS */}
        <span className="pointer-events-none absolute inset-0 z-[1] opacity-30 bg-[radial-gradient(circle_at_12%_12%,rgba(34,197,94,0.2),transparent_40%)]" />
        <span className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] bg-[linear-gradient(to_right,rgba(34,197,94,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.12)_1px,transparent_1px)] bg-[length:28px_28px]" />

        <div className="absolute inset-0">
          {/* LEFT PREVIEW */}
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[46%] h-[90%] opacity-50 hover:opacity-70 -translate-x-[62%] rounded-[22px] overflow-hidden"
          >
            <video
              src={previewVideos[indices.prev]?.src}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              className="w-full h-full object-cover blur-[1.2px] brightness-75"
            />
          </button>

          {/* RIGHT PREVIEW */}
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[46%] h-[90%] opacity-50 hover:opacity-70 translate-x-[62%] rounded-[22px] overflow-hidden"
          >
            <video
              src={previewVideos[indices.next]?.src}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              className="w-full h-full object-cover blur-[1.2px] brightness-75"
            />
          </button>

          {/* ACTIVE VIDEO */}
          <button
            type="button"
            className="absolute inset-0 z-20"
          >
            <video
              src={previewVideos[activeIndex]?.src}
              muted
              loop
              autoPlay
              playsInline
              controls
              preload="auto"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* NAV BUTTONS */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 p-2 rounded-full text-green-300"
        >
          ‹
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 p-2 rounded-full text-green-300"
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
                index === activeIndex
                  ? "bg-green-300"
                  : "bg-green-600/50"
              }`}
            />
          ))}
        </div>
      </span>
    </div>
  );
};
