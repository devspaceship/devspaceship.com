const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
  },
  plugins: [require("@tailwindcss/typography")],
};
