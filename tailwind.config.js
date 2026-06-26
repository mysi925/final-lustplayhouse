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
         COLORS (CHERRY RED + BLACK THEME)
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
           SURFACES (BLACK STACK)
        ========================= */
        surface: "#000000",
        surface2: "#0a0a0a",
        surface3: "#111111",

        /* =========================
           CHERRY RED ACCENTS
        ========================= */
        glow: "rgba(220, 38, 38, 0.08)",
        glowStrong: "rgba(220, 38, 38, 0.15)",
        redSoft: "rgba(220, 38, 38, 0.2)",
      },

      /* =========================
         SHAPE SYSTEM (CLEAN + SQUARE FRIENDLY)
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
         SHADOW SYSTEM (RED GLOW)
      ========================= */
      boxShadow: {
        glow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 0 35px rgba(0,0,0,0.85)",
        hover:
          "0 0 0 1px rgba(255,255,255,0.08), 0 0 55px rgba(0,0,0,0.95)",
        neon: "0 0 25px rgba(220, 38, 38, 0.12)",
        red: "0 0 25px rgba(220, 38, 38, 0.18)",
      },

      /* =========================
         TYPOGRAPHY (SIMPLIFIED)
      ========================= */
      fontFamily: {
        sans: ["Times New Roman", "Times", "serif"],
        heading: ["Times New Roman", "Times", "serif"],
      },

      /* =========================
         ANIMATIONS
      ========================= */
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },

      animation: {
        fadeUp: "fadeUp 0.5s ease-out",
        glowPulse: "glowPulse 2.5s ease-in-out infinite",
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
