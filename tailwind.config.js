/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        onBg: {
          600: "#262626",
          800: "#0d0d0d",
        },
      },
    },
  },
  plugins: [],
};
