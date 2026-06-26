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
            <div className="accent-auto text-white min-h-screen relative overflow-x-hidden bg-black">
              
              {/* GLOBAL BACKGROUND LAYER */}
              <div className="absolute inset-0 pointer-events-none">
                {/* base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

                {/* top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-cyan-500/10 blur-[120px] rounded-full" />

                {/* bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-purple-500/10 blur-[120px] rounded-full" />
              </div>

              {/* CONTENT */}
              <div className="relative">
                <PageShell />
              </div>

            </div>
          }
        />

        {/* CHECKOUT PAGE */}
        <Route path="/checkout" element={<Checkout />} />

        {/* CATCH-ALL */}
        <Route
          path="*"
          element={
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
              Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};
