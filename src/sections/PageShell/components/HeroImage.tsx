import { useState, useEffect, useRef, useCallback } from "react";

const previewVideos = [
  { id: "d7a9dc7b-3709-4422-b7d2-cf4f771686c2", lib: "690906" },
  { id: "a485386e-cbe4-4ea0-bad8-27794aecb7fb", lib: "690906" },
  { id: "6dd8baf1-b13d-4ba4-b874-2a567e92068c", lib: "690906" },
  { id: "80d22f4c-65d5-47ba-ba6e-8b4603829d12", lib: "690906" },
  { id: "4bfa810a-87ba-444f-a1de-362fcc376d60", lib: "690906" },
  { id: "36fbc681-637c-4cd1-9dea-fa36e867df3e", lib: "690906" },
];

const buildSrc = (v: { id: string; lib: string }, muted: boolean) =>
  `https://player.mediadelivery.net/embed/${v.lib}/${v.id}` +
  `?autoplay=true&muted=${muted}&loop=true&preload=true&responsive=true&controls=0`;

export const HeroImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const len = previewVideos.length;
  const prevIdx = (activeIndex - 1 + len) % len;
  const nextIdx = (activeIndex + 1) % len;

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex((p) => (p + dir + len) % len);
        setTransitioning(false);
      }, 200);
    },
    [transitioning, len]
  );

  // Auto-advance every 12 s
  useEffect(() => {
    autoTimer.current = setTimeout(() => navigate(1), 12000);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [activeIndex, navigate]);

  return (
    <div className="w-full flex flex-col items-center mb-10 select-none">

      {/* ── CAROUSEL TRACK ─────────────────────────────── */}
      <div className="relative w-full flex items-center justify-center"
           style={{ height: "clamp(300px, 55vw, 420px)" }}>

        {/* ── BLURRED SIDE PREVIEWS (visible on all sizes) ── */}
        {/* LEFT PEEK */}
        <div
          onClick={() => navigate(-1)}
          className="
            absolute left-0 top-1/2 -translate-y-1/2
            cursor-pointer z-10
            overflow-hidden rounded-2xl
            opacity-50 hover:opacity-70
            transition-opacity duration-300
          "
          style={{
            width: "clamp(52px, 13vw, 100px)",
            height: "clamp(200px, 42vw, 340px)",
          }}
        >
          <iframe
            key={`prev-${prevIdx}`}
            src={buildSrc(previewVideos[prevIdx], true)}
            className="absolute pointer-events-none"
            style={{
              width: "350%",
              height: "120%",
              left: "-125%",
              top: "-10%",
            }}
            allow="autoplay"
          />
          {/* blur + fade overlay */}
          <div className="absolute inset-0 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a14] via-transparent to-transparent" />
        </div>

        {/* RIGHT PEEK */}
        <div
          onClick={() => navigate(1)}
          className="
            absolute right-0 top-1/2 -translate-y-1/2
            cursor-pointer z-10
            overflow-hidden rounded-2xl
            opacity-50 hover:opacity-70
            transition-opacity duration-300
          "
          style={{
            width: "clamp(52px, 13vw, 100px)",
            height: "clamp(200px, 42vw, 340px)",
          }}
        >
          <iframe
            key={`next-${nextIdx}`}
            src={buildSrc(previewVideos[nextIdx], true)}
            className="absolute pointer-events-none"
            style={{
              width: "350%",
              height: "120%",
              right: "-125%",
              top: "-10%",
            }}
            allow="autoplay"
          />
          <div className="absolute inset-0 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#080a14] via-transparent to-transparent" />
        </div>

        {/* ── MAIN CARD ──────────────────────────────────── */}
        <div
          className="relative z-20 flex-shrink-0"
          style={{
            width: "clamp(240px, 54vw, 360px)",
            height: "clamp(240px, 54vw, 360px)",
          }}
        >
          {/* Neon border glow — layered for pink+purple fusion */}
          <div
            className="absolute -inset-[2px] rounded-[22px] z-0"
            style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899, #7c3aed, #f472b6)",
              filter: "blur(0px)",
            }}
          />
          {/* Inner glow diffuse */}
          <div
            className="absolute -inset-[6px] rounded-[26px] z-[-1] opacity-60"
            style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899, #7c3aed)",
              filter: "blur(10px)",
            }}
          />

          {/* Video container */}
          <div
            className={`
              relative overflow-hidden rounded-[20px] w-full h-full bg-[#080a14] z-10
              transition-opacity duration-200
              ${transitioning ? "opacity-0" : "opacity-100"}
            `}
          >
            <iframe
              key={`main-${activeIndex}-${muted}`}
              src={buildSrc(previewVideos[activeIndex], muted)}
              className="absolute pointer-events-none"
              style={{
                width: "140%",
                height: "140%",
                top: "-20%",
                left: "-20%",
              }}
              allow="autoplay; fullscreen"
            />

            {/* Subtle vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 55%, rgba(8,10,20,0.5) 100%)"
              }}
            />

            {/* Left / Right tap zones */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-0 h-full w-1/2 z-20"
            />
            <button
              onClick={() => navigate(1)}
              className="absolute right-0 top-0 h-full w-1/2 z-20"
            />

            {/* Mute toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
              className="
                absolute top-2.5 right-2.5 z-30
                w-8 h-8 rounded-full
                bg-black/50 border border-white/20
                backdrop-blur-sm
                flex items-center justify-center text-white text-xs
                hover:bg-black/70 transition
              "
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>

        {/* ── NAV ARROWS (desktop only) ──────────────────── */}
        <button
          onClick={() => navigate(-1)}
          className="
            hidden md:flex
            absolute left-[14%] top-1/2 -translate-y-1/2 z-30
            w-9 h-9 rounded-full
            bg-[#0d0f1a]/80 border border-white/15
            items-center justify-center text-white/80
            hover:text-white hover:bg-[#0d0f1a] transition text-lg
          "
        >
          ‹
        </button>
        <button
          onClick={() => navigate(1)}
          className="
            hidden md:flex
            absolute right-[14%] top-1/2 -translate-y-1/2 z-30
            w-9 h-9 rounded-full
            bg-[#0d0f1a]/80 border border-white/15
            items-center justify-center text-white/80
            hover:text-white hover:bg-[#0d0f1a] transition text-lg
          "
        >
          ›
        </button>
      </div>

      {/* ── DOT PAGINATION ─────────────────────────────── */}
      <div className="mt-4 flex justify-center gap-1.5">
        {previewVideos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setTransitioning(true); setTimeout(() => { setActiveIndex(i); setTransitioning(false); }, 200); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-gradient-to-r from-purple-400 to-pink-400"
                : "w-1.5 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
