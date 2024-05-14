/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        modal: "1097px",
        addClassModal: "875px",
      },
      height: {
        modal: "550px",
        table: "450px",
      },
      fontFamily: {
        Poppins: ["Poppins"],
        Montserrat: ["Montserrat"],
        Manrope: ["Manrope"],
      },
      colors: {
        PrimaryColor: "#61B4D1",
        white: "#ffffff",
        black: "#000000",
        gradeTitle: "#3497f9",
        backgroundplus: "#8fdc88",
        addBtn: "#8FDC88",
        cancelBtn: "#DC8888",
        blurblue: "#F1F8FFF1",
        paidBg: "var(--Success-Green-50, #ECFDF5)",
        paidFontColor: "var(--Success-Green-900, #064E3B)",
        unpaidBg: "var(--Error-Red-50, #FEF2F2)",
        unpaidFontColor: "var(--Error-Red-800, #991B1B)",
        bgSearch: "var(--Neutral-50, #F7F8F9)",
        bgPay: "var(--Success-Green-700, #047857)",
      },
      shadow: {
        grade: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    screens: {
      xs: "200px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 1024px) { ... }

      lg: "1024px",
      // => @media (min-width: 1280px) { ... }\

      slg: "1280px",
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
