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
            <div className="min-h-screen text-white relative overflow-x-hidden bg-black">

              {/* BACKGROUND LAYERS */}
              <div className="absolute inset-0 -z-10">

                {/* base black → red-tinted gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

                {/* top red glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] h-[60vh] bg-red-600/20 blur-[140px] rounded-full" />

                {/* bottom red glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] h-[60vh] bg-red-900/20 blur-[140px] rounded-full" />

                {/* center ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-red-500/10 blur-[160px] rounded-full" />

              </div>

              {/* PAGE CONTENT */}
              <div className="relative z-10">
                <PageShell />
              </div>

            </div>
          }
        />

        {/* CHECKOUT PAGE */}
        <Route path="/checkout" element={<Checkout />} />

        {/* 404 PAGE */}
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
