import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Prevent partial / chunked response issues (important for Apple Pay)
app.disable("etag");

// Optional but safe
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// ✅ APPLE PAY DOMAIN VERIFICATION (MUST BE FIRST)
// =====================================================
app.get("/.well-known/apple-developer-merchantid-domain-association", (req, res) => {
  res.set({
    "Content-Type": "text/plain",
    "Content-Encoding": "identity",
    "Cache-Control": "no-store",
  });

  res.sendFile(
    path.join(
      __dirname,
      "public",
      ".well-known",
      "apple-developer-merchantid-domain-association"
    )
  );
});

// =====================================================
// ✅ YOUR ROUTES
// =====================================================

// Root redirect (this is fine)
app.get("/", (req, res) => {
  res.redirect("/tease");
});

// Your product/payment pages
app.get("/tease", (req, res) => {
  res.send("Tease page");
});

app.get("/desire", (req, res) => {
  res.send("Desire page");
});

app.get("/obsession", (req, res) => {
  res.send("Obsession page");
});

// =====================================================
// ✅ STATIC FILES (if you use frontend build later)
// =====================================================
app.use(express.static(path.join(__dirname, "public")));

// =====================================================
// ✅ FALLBACK (optional)
// =====================================================
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// =====================================================
// ✅ START SERVER
// =====================================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
