// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/old_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      background: colors.zinc,
      primary: colors.sky,
      secondary: colors.fuchsia,
      tertiary: colors.amber,
    },
    extend: {
      keyframes: {
        "fade-in-from-bottom": {
          "0%": { opacity: "0", transform: "translateY(5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-from-top": {
          "0%": { opacity: "0", transform: "translateY(-5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-from-bottom": "fade-in-from-bottom 0.8s ease-out",
        "fade-in-from-top": "fade-in-from-top 0.8s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
