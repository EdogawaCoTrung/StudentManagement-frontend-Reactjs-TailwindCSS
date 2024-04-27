/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
    colors: {
      gradeTitle: "#3497f9",
      backgroundplus: "#8fdc88",
    },
    shadow: {
      grade: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
