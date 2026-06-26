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
            <body className="accent-auto bg-zinc-950 text-white">
              <PageShell />
            </body>
          }
        />

        {/* CHECKOUT PAGE */}
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </BrowserRouter>
  );
};
