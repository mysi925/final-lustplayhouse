module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  darkMode: ["class"],

  theme: {
    extend: {
      /* =========================
         COLORS (DARK NAVY + PURPLE/PINK THEME)
      ========================= */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        /* =========================
           SURFACES (DARK NAVY SYSTEM)
        ========================= */
        surface: "#080a14",
        surface2: "#0d0f1a",
        surface3: "#111525",

        /* =========================
           PURPLE/PINK GLOW ACCENTS
        ========================= */
        purpleGlow: "rgba(168, 85, 247, 0.18)",
        purpleSoft: "rgba(168, 85, 247, 0.08)",
        purpleStrong: "rgba(168, 85, 247, 0.35)",
      },

      /* =========================
         SHAPE SYSTEM
      ========================= */
      borderRadius: {
        lg: "0.9rem",
        md: "0.7rem",
        sm: "0.5rem",
      },

      spacing: {
        card: "1.25rem",
      },

      aspectRatio: {
        square: "1 / 1",
      },

      /* =========================
         SHADOWS (PURPLE FOCUS STYLE)
      ========================= */
      boxShadow: {
        soft:
          "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.8)",
        hover:
          "0 0 0 1px rgba(255,255,255,0.08), 0 25px 80px rgba(0,0,0,0.95)",
        purple: "0 0 25px rgba(168, 85, 247, 0.25)",
      },

      /* =========================
         TYPOGRAPHY (INTER)
      ========================= */
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },

      /* =========================
         ANIMATIONS
      ========================= */
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },

        purplePulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },

      animation: {
        fadeUp: "fadeUp 0.5s ease-out",
        purplePulse: "purplePulse 2.5s ease-in-out infinite",
      },
    },

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },

  plugins: [],
};
