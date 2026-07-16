/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF6EF",
          dark: "#F3EAE0",
        },
        rose: {
          light: "#E8C4C4",
          DEFAULT: "#C98A93",
          dark: "#B06B76",
        },
        wine: {
          DEFAULT: "#6E2A3A",
          dark: "#4E1D29",
        },
        gold: {
          DEFAULT: "#C9A96A",
          light: "#DDC48F",
        },
        ink: "#3A2E2E",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Mulish'", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out both",
        float: "float 4s ease-in-out infinite",
      },
      boxShadow: {
        polaroid: "0 6px 18px rgba(58, 46, 46, 0.18)",
      },
    },
  },
  plugins: [],
};
