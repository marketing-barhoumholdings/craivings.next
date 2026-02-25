/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          50: "#f7e9ea",
          100: "#f0d3d4",
          200: "#e1a8aa",
          300: "#d27c81",
          400: "#c25158",
          500: "rgba(155, 25, 28)",
          600: "rgba(155, 25, 28)",
          700: "rgba(155, 25, 28)",
          800: "#7a0f12",
          900: "#5c0b0d",
        },
        brand: {
          50: "#f7e9ea",
          100: "#f0d3d4",
          200: "#e1a8aa",
          300: "#d27c81",
          400: "#c25158",
          500: "rgba(155, 25, 28)",
          600: "rgba(155, 25, 28)",
          700: "rgba(155, 25, 28)",
          800: "#7a0f12",
          900: "#5c0b0d",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      animation: {
        "pulse-dot": "pulseDot 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
