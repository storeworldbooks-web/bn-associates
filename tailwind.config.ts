import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7f6",
          100: "#d7ece9",
          200: "#aed9d4",
          300: "#7cc0b9",
          400: "#4ba39a",
          500: "#2d877f",
          600: "#216c66",
          700: "#1d5752",
          800: "#1a4643",
          900: "#173b39",
        },
        gold: {
          50: "#fdf8ed",
          100: "#f8eecf",
          200: "#f0dba3",
          300: "#e6c36a",
          400: "#dda93f",
          500: "#cf9027",
          600: "#b1701e",
          700: "#8d541c",
          800: "#74451e",
          900: "#633b1c",
        },
        ink: {
          50: "#f7f8f8",
          100: "#eef0f0",
          200: "#d8dddd",
          300: "#b3bdbd",
          400: "#869595",
          500: "#667575",
          600: "#515e5e",
          700: "#424c4c",
          800: "#3a4242",
          900: "#161c1c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,24,0.04), 0 8px 24px -12px rgba(16,24,24,0.18)",
        lift: "0 2px 4px rgba(16,24,24,0.05), 0 18px 40px -18px rgba(16,24,24,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
