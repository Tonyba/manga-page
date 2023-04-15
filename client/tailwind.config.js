/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manga: "#EF4444",
        manwha: "#ffa500",
        manhua: "#800080",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
