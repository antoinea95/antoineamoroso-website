/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        degular: ["degular", "sans-serif"],
      },
      boxShadow: {
        'custom': '2px 2px 3px rgba(0,0,0,0.15)'
      },
      dropShadow: {
        'custom' : '2px 2px 1px rgba(0,0,0,0.15)'
      },
      colors: {
        'primary' : "#5465FF",
        'secondary' : "#f1f5f9",
        'tertiary' : "#FFF0EB",
        'quaternary': "#ACFCD9"
      }
    },
  },
  plugins: [],
}

