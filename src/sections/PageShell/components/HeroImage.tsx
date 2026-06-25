import { useMemo, useState } from "react";

type PreviewVideo = {
  src: string;
};

const previewVideos: PreviewVideo[] = [
  { src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374356/video1_zoqpk2.mp4" },
  { src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374354/video5_almnn6.mp4" },
  { src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video4_aktpzr.mp4" },
  { src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video2_zrxhny.mp4" },
  { src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video6_nqa0go.mp4" },
  { src: "https://res.cloudinary.com/dvaidypgy/video/upload/v1782374353/video3_nbelcm.mp4" },
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
      prev: length > 0 ? wrapIndex(activeIndex - 1, length) : 0,
      next: length > 0 ? wrapIndex(activeIndex + 1, length) : 0,
      active: length > 0 ? wrapIndex(activeIndex, length) : 0,
    };
  }, [activeIndex, length]);

  const goToPrev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, length));
  };

  const goToNext = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, length));
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

  // 🚨 SAFETY GUARD (prevents grey screen crashes)
  if (length === 0) {
    return <div>No videos found</div>;
  }

  return (
    <div className="flex justify-center relative">
      <span
        className="relative inline-block h-[300px] w-[326px] md:h-[390px] md:w-[424px] overflow-hidden rounded-[24px] bg-black"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0">
          
          {/* LEFT PREVIEW */}
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[46%] h-[90%] -translate-x-[62%] opacity-50 overflow-hidden"
          >
            <video
              src={previewVideos[indices.prev]?.src || ""}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-cover blur-[1.2px]"
            />
          </button>

          {/* RIGHT PREVIEW */}
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[46%] h-[90%] translate-x-[62%] opacity-50 overflow-hidden"
          >
            <video
              src={previewVideos[indices.next]?.src || ""}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-cover blur-[1.2px]"
            />
          </button>

          {/* ACTIVE VIDEO */}
          <button
            type="button"
            className="absolute inset-0 z-20"
          >
            <video
              src={previewVideos[indices.active]?.src || ""}
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

        {/* NAV */}
        <button onClick={goToPrev} className="absolute left-2 top-1/2 z-30 text-white">
          ‹
        </button>

        <button onClick={goToNext} className="absolute right-2 top-1/2 z-30 text-white">
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {previewVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === indices.active ? "bg-green-300" : "bg-green-600/50"
              }`}
            />
          ))}
        </div>
      </span>
    </div>
  );
};
