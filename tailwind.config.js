/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        parkinsans: [ "Parkinsans", "sans-serif"],
        modak: ["Modak", "system-ui"],
      },
      boxShadow: {
        'custom': '2px 2px 3px rgba(0,0,0,0.15)'
      },
      dropShadow: {
        'custom' : '2px 2px 1px rgba(0,0,0,0.15)'
      },
      colors: {
        'primary' : "black",
        // 'primary' : "#5465FF",
        'secondary' : "#f1f5f9",
        // 'secondary' : "#f1f5f9",
        'tertiary' : "white",
        // 'tertiary' : "#FFF0EB",
        'quaternary': "#ACFCD9",
        'quinary' : "#FC4C01"
      }
    },
  },
  plugins: [],
}

