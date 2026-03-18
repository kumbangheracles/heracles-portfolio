const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      fontFamily: {
        dancing: ["var(--font-dancing)"],
        montserrat: ["var(--font-montserrat)"],
        opensans: ["var(--font-opensans)"],
        geistmono: ["var(--font-geistmono)"],
      },
    },
  },
};

export default config;
