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
         COLORS (BLACK + MINIMAL GREEN)
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

        /* DARK SURFACES */
        surface: "#050505",
        surface2: "#0a0a0a",
        surface3: "#111111",

        /* VERY SUBTLE GREEN (barely visible) */
        glow: "rgba(34, 197, 94, 0.04)",
        glowStrong: "rgba(34, 197, 94, 0.08)",
      },

      /* =========================
         SHAPE SYSTEM (MORE SQUARE CARDS)
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
         GLOW / SHADOW SYSTEM
      ========================= */
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 0 35px rgba(0,0,0,0.85)",
        hover:
          "0 0 0 1px rgba(255,255,255,0.08), 0 0 55px rgba(0,0,0,0.95)",
        neon: "0 0 20px rgba(34, 197, 94, 0.06)",
      },

      /* =========================
         TYPOGRAPHY
      ========================= */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "Inter", "sans-serif"],
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
