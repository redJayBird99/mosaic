/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        onBg: {
          600: "#4d4d4d",
          800: "#0d0d0d",
        },
      },
    },
  },
  plugins: [],
};
