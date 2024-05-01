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
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        gradeTitle: "#3497f9",
        backgroundplus: "#8fdc88",
        addBtn: "#8FDC88",
        cancelBtn: "#DC8888",
        blurblue: "#F1F8FFF1",
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
