import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#08040f",
        cream: "#fff8fc",
        gold: "#ffc857",
        lavender: "#c9b8ff",
        pink: "#ffb8d9",
        honey: "#f5a623",
        blush: "#ffe8f3",
        magic: "#7b5ea7",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Nunito", "system-ui", "sans-serif"],
        display: ["Fredoka", "Nunito", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255, 184, 217, 0.25)",
        "glow-honey": "0 0 20px rgba(255, 200, 87, 0.35)",
      },
      borderRadius: {
        magic: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
