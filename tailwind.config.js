/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-violet": "#635fc7",
      },
      
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar')({ nocompatible: true })],
};
