/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3A5BA9",
          50: "#DCE1F4",
          100: "#C2CCEC",
          200: "#92A0D9",
          300: "#6274C6",
          400: "#3A5BA9",
          500: "#324E93",
          600: "#2A417D",
          700: "#223567",
          800: "#1A2951",
          900: "#121D3B",
        },
        accent: {
          DEFAULT: "#FF511F",
          50: "#FFE7E0",
          100: "#FFD0C2",
          200: "#FFA389",
          300: "#FF7651",
          400: "#FF511F",
          500: "#E6471B",
          600: "#CC3D17",
          700: "#B33313",
          800: "#99290F",
          900: "#7F1F0B",
        },
      },
    },
  },
  plugins: [],
};
