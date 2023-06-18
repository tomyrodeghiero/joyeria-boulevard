/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          300: "#EFEFEF",
          400: "#D8D8D8",
          700: "#707070",
        },
        yellow: {
          800: "#A18A68",
        },
      },
      screens: {
        sm: "380px",
      },
    },
  },
  plugins: [],
};
