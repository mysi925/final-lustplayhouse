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
            <div className="accent-auto bg-zinc-950 text-white min-h-screen">
              <PageShell />
            </div>
          }
        />

        {/* CHECKOUT PAGE */}
        <Route path="/checkout" element={<Checkout />} />

        {/* CATCH-ALL (IMPORTANT FOR DEPLOYMENT) */}
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
