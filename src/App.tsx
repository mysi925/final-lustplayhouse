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
            <div className="min-h-screen text-white bg-black overflow-x-hidden">
              <PageShell />
            </div>
          }
        />

        {/* CHECKOUT */}
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
