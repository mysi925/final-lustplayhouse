import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "@/lib/backendUrl";

const TIER_STORAGE_KEY = "lust-playhouse-selected-tier";

const tierMeta = {
  "tease-15": { name: "Tease" },
  "desire-25": { name: "Desire" },
  "obsession-50": { name: "Obsession" },
};

export default function Pay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tierId =
    searchParams.get("tier") || window.localStorage.getItem(TIER_STORAGE_KEY);

  const [tierInfo, setTierInfo] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [payError, setPayError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [isApplePaying, setIsApplePaying] = useState(false);

  const cardRef = useRef(null);
  const cardInstanceRef = useRef(null);
  const applePayInstanceRef = useRef(null);

  // Load tier price/name from backend
  useEffect(() => {
    if (!tierId || !tierMeta[tierId]) {
      setLoadError("No tier selected. Please go back and choose a plan.");
      return;
    }

    fetch(`${BACKEND_URL}/api/tiers/${tierId}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setTierInfo(data))
      .catch(() => setLoadError("Could not load this plan. Please go back and try again."));
  }, [tierId]);

  // Load Square Web Payments SDK + attach card + try Apple Pay
  useEffect(() => {
    if (!tierInfo) return;

    let card;

    const init = async () => {
      try {
        const cfgRes = await fetch(`${BACKEND_URL}/api/square-config`);
        const cfg = await cfgRes.json();

        if (!window.Square) {
          await loadSquareScript();
        }

        const payments = window.Square.payments(cfg.applicationId, cfg.locationId);

        // ── Apple Pay ──────────────────────────────────────────
        try {
          const dollars = String((tierInfo.amountCents / 100).toFixed(0));
          const name = tierMeta[tierId]?.name || "Membership";
          const paymentRequest = payments.paymentRequest({
            countryCode: "US",
            currencyCode: "USD",
            total: { amount: dollars, label: `${name} Membership` },
          });
          const applePay = await payments.applePay(paymentRequest);
          applePayInstanceRef.current = applePay;
          setApplePayAvailable(true);
        } catch (e) {
          // Apple Pay not available on this device/browser — silently skip
          console.log("Apple Pay not available:", e.message);
        }

        // ── Card ───────────────────────────────────────────────
        card = await payments.card({
          style: {
            input: {
              fontSize: "16px",
              color: "#f5f3ff",
            },
            "input::placeholder": {
              color: "#9c93b8",
            },
          },
        });
        await card.attach(cardRef.current);
        cardInstanceRef.current = card;
        setSdkReady(true);
      } catch (err) {
        console.error(err);
        setPayError("Could not load secure payment form. Please refresh and try again.");
      }
    };

    init();

    return () => {
      if (card) card.destroy();
    };
  }, [tierInfo]);

  const loadSquareScript = () =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://web.squarecdn.com/v1/square.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

  // Shared: send token to backend
  const processPayment = async (sourceId) => {
    const res = await fetch(`${BACKEND_URL}/api/checkout/${tierId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Payment failed. Please try again.");
    }
    return data;
  };

  const handleApplePay = async () => {
    if (!applePayInstanceRef.current) return;
    setIsApplePaying(true);
    setPayError("");
    try {
      const tokenResult = await applePayInstanceRef.current.tokenize();
      if (tokenResult.status !== "OK") {
        throw new Error(tokenResult.errors?.[0]?.message || "Apple Pay failed.");
      }
      await processPayment(tokenResult.token);
      window.localStorage.setItem(TIER_STORAGE_KEY, tierId);
      navigate(`/success?tier=${tierId}`);
    } catch (err) {
      setPayError(err.message || "Something went wrong. Please try again.");
      setIsApplePaying(false);
    }
  };

  const handlePay = async () => {
    if (!cardInstanceRef.current) return;
    setIsPaying(true);
    setPayError("");

    try {
      const tokenResult = await cardInstanceRef.current.tokenize();
      if (tokenResult.status !== "OK") {
        throw new Error(tokenResult.errors?.[0]?.message || "Card details look invalid.");
      }
      await processPayment(tokenResult.token);
      window.localStorage.setItem(TIER_STORAGE_KEY, tierId);
      navigate(`/success?tier=${tierId}`);
    } catch (err) {
      setPayError(err.message || "Something went wrong. Please try again.");
      setIsPaying(false);
    }
  };

  if (loadError) {
    return (
      <PageFrame>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pink-300 mb-3">Error</h1>
          <p className="text-gray-300">{loadError}</p>
        </div>
      </PageFrame>
    );
  }

  if (!tierInfo) {
    return (
      <PageFrame>
        <p className="text-gray-400 text-center">Loading checkout…</p>
      </PageFrame>
    );
  }

  const name = tierMeta[tierId]?.name || "Membership";
  const dollars = (tierInfo.amountCents / 100).toFixed(0);

  return (
    <PageFrame>
      <div className="w-full max-w-[420px]">
        {/* Tier summary strip */}
        <div className="flex items-center justify-between rounded-2xl border border-purple-500/25 bg-[#120f24]/80 px-5 py-4 mb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[2px] text-purple-300 font-bold">
              {name} Tier
            </p>
            <p className="text-gray-400 text-xs mt-0.5">One-time payment · lifetime access</p>
          </div>
          <p className="text-2xl font-black text-white">${dollars}</p>
        </div>

        {/* Checkout card */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#0d0b1a] p-6 shadow-[0_0_50px_rgba(168,85,247,0.12)]">

          {/* Apple Pay — only renders on eligible Apple devices */}
          {applePayAvailable && (
            <>
              <button
                onClick={handleApplePay}
                disabled={isApplePaying}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-black hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isApplePaying ? (
                  "Processing…"
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Pay
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-purple-500/20" />
                <span className="text-[11px] text-gray-500 tracking-wider uppercase">or pay with card</span>
                <div className="flex-1 h-px bg-purple-500/20" />
              </div>
            </>
          )}

          {/* Card entry */}
          <p className="text-[11px] uppercase tracking-[1.5px] text-gray-400 font-semibold mb-3">
            Card details
          </p>

          <div
            ref={cardRef}
            id="card-container"
            className="rounded-xl bg-[#161329] border border-purple-500/20 px-3 py-3 min-h-[56px]"
          />

          {payError && (
            <p className="text-pink-400 text-sm mt-3 text-center">{payError}</p>
          )}

          <button
            onClick={handlePay}
            disabled={!sdkReady || isPaying}
            className="mt-5 w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPaying ? "Processing…" : `Pay $${dollars}`}
          </button>

          <p className="text-center text-[11px] text-gray-500 mt-4">
            Encrypted checkout · your card details never touch our servers
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

function PageFrame({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#0a0618]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-purple-600/25 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-pink-700/20 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160b2e] via-[#0a0618] to-[#050410] opacity-80" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center px-4 py-12">
        <p className="text-[11px] uppercase tracking-[3px] text-purple-300/80 font-bold mb-6">
          Lust Playhouse
        </p>
        {children}
      </div>
    </div>
  );
}
