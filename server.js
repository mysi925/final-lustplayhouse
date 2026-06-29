import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Prevent ETag caching issues
app.disable("etag");

// Optional middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// ✅ APPLE PAY DOMAIN VERIFICATION (FIXED - NO sendFile)
// =====================================================
app.get(
  "/.well-known/apple-developer-merchantid-domain-association",
  (req, res) => {
    const filePath = path.join(
      __dirname,
      "public",
      ".well-known",
      "apple-developer-merchantid-domain-association"
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Missing verification file");
    }

    const file = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Length", file.length);
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Connection", "close");

    return res.end(file);
  }
);

// =====================================================
// ✅ YOUR ROUTES
// =====================================================

// Root redirect
app.get("/", (req, res) => {
  res.redirect("/tease");
});

// Product/payment pages
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
// ✅ STATIC FILES
// =====================================================
app.use(express.static(path.join(__dirname, "public")));

// =====================================================
// ✅ 404 FALLBACK
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
