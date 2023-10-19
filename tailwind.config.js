/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
      },
    },
  },
  plugins: [],
};
