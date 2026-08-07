import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#FD5C0D",
          600: "#F54B06",
          700: "#C23006",
          900: "#7E1D0F",
        },
        gold: {
          300: "#FDE047",
          500: "#F59E0B",
          DEFAULT: "#D4AF37",
        },
        liquid: {
          bg: "#0A0A0F",
          accent: "#FFFFFF20",
        },
        cream: "#FFFCF5",
        parchment: "#F9F3E9",
        "warm-brown": "#4A3A2A",
        "dark-wood": "#2A1A0A",
        "deep-red": "#8B1E1E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        script: ["var(--font-script)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"], // Orbitron: SOLO totales de pago
      },
      boxShadow: {
        "card-hover": "0 20px 40px -12px rgba(139, 30, 30, 0.25)",
        "gold-glow": "0 0 24px rgba(212, 175, 55, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;