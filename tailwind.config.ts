import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1410", 900: "#0B1410", 800: "#121F19", 700: "#1A2C23", 600: "#24392E" },
        moss: { 50: "#F1F7EC", 100: "#DFEED3", 200: "#C2E0A8", 300: "#9CCB72", 400: "#7AB648", 500: "#5E9A2F", 600: "#487A23", 700: "#375D1D" },
        lime: { DEFAULT: "#C8F169", 400: "#D6F58C", 500: "#C8F169", 600: "#A9D545" },
        sand: { 50: "#FAF8F3", 100: "#F3EFE4", 200: "#E7E0CC", 300: "#D4C9A8" },
        clay: { 400: "#E0895A", 500: "#D06A36" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.032em" },
      boxShadow: {
        card: "0 1px 2px rgba(11,20,16,.06), 0 8px 24px -8px rgba(11,20,16,.12)",
        glow: "0 0 0 1px rgba(200,241,105,.25), 0 20px 60px -20px rgba(200,241,105,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
