/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors:{
        primary:"#6D6523",
        secondary:"#4f1410",
      }
      
    },
  },
  plugins: [require("daisyui")],
};
