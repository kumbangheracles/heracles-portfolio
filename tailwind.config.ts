import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        opensans: ["var(--font-opensans)"],
        dancing: ["var(--font-dancing)", "cursive"],
        geistmono: ["var(--font-geist-mono)", "monospace"],
      },
    },
    animation: {
      marquee: "marquee 20s linear infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    },
  },
  plugins: [],
};

export default config;
