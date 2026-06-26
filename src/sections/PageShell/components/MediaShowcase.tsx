export const MediaShowcase = () => {
  const videos = [
    "https://your-video-url-1.mp4",
    "https://your-video-url-2.mp4",
    "https://your-video-url-3.mp4",
  ];

  return (
    <div className="w-full flex justify-center my-10">
      
      {/* CAROUSEL WRAPPER */}
      <div className="
        flex gap-4 overflow-x-auto scroll-smooth
        snap-x snap-mandatory
        px-4
        max-w-[900px]
      ">

        {videos.map((src, i) => (
          <div
            key={i}
            className="
              snap-center
              shrink-0
              w-[260px] md:w-[340px]
              aspect-[9/16]
              rounded-2xl
              overflow-hidden
              bg-black
            "
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ))}

      </div>
    </div>
  );
};
