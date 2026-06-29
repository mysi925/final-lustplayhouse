import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "@/lib/backendUrl";

export default function Success() {
  const [searchParams] = useSearchParams();
  const tierId = searchParams.get("tier");

  const [linkInfo, setLinkInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tierId) {
      setError("No tier specified.");
      return;
    }

    fetch(`${BACKEND_URL}/api/community-link/${tierId}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setLinkInfo(data))
      .catch(() => setError("Could not load your access link. Contact support."));
  }, [tierId]);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#0a0618]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-purple-600/25 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-pink-700/20 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160b2e] via-[#0a0618] to-[#050410] opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center px-4 py-12 text-center">
        <p className="text-[11px] uppercase tracking-[3px] text-purple-300/80 font-bold mb-6">
          Lust Playhouse
        </p>

        <div className="w-14 h-14 rounded-full border border-purple-400/40 bg-purple-500/10 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-black mb-1">Thank you for your purchase!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Tap below to unlock your access - it only works once, so save it.
        </p>

        <div className="w-full rounded-2xl border border-purple-500/25 bg-[#0d0f1a]/90 p-6">
          {error && <p className="text-pink-400 text-sm">{error}</p>}

          {!error && !linkInfo && (
            <p className="text-gray-400 text-sm">Loading your access link...</p>
          )}

          {linkInfo && (
            <>
              <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold mb-4">
                {linkInfo.name} Tier - Access Link
              </p>
              
                href={linkInfo.link}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
              >
                Join Now
              </a>
            </>
          )}
        </div>

        <p className="text-[10px] uppercase tracking-[2px] mt-8 text-white/15">
          (c) 2026 Lust Playhouse
        </p>
      </div>
    </div>
  );
}
