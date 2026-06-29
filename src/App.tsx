import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageShell } from "@/sections/PageShell";
import Checkout from "./pages/Checkout";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN SITE */}
        <Route
          path="/"
          element={
            <div className="relative min-h-screen text-white overflow-x-hidden">

              {/* FIXED BACKGROUND LAYER (FORCE VISIBILITY) */}
              <div className="fixed inset-0 pointer-events-none -z-10">

                {/* base navy */}
                <div className="absolute inset-0 bg-[#0a0618]" />

                {/* purple glow top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-purple-600/25 blur-[160px] rounded-full" />

                {/* pink glow bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-pink-700/20 blur-[180px] rounded-full" />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#160b2e] via-[#0a0618] to-[#050410] opacity-80" />

              </div>

              {/* CONTENT LAYER */}
              <div className="relative z-10">
                <PageShell />
              </div>

            </div>
          }
        />

        {/* CHECKOUT PAGE */}
        <Route path="/checkout" element={<Checkout />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
              Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};
