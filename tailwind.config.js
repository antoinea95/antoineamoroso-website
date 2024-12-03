/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        parkinsans: ["Parkinsans", "sans-serif"],
        modak: ["Modak", "system-ui"],
      },
      boxShadow: {
        custom: "2px 2px 3px rgba(0,0,0,0.15)",
      },
      filter: {
        'hero': `
          drop-shadow(11px 0 0 var(--tw-color-tertiary)) 
          drop-shadow(0 11px 0 var(--tw-color-tertiary)) 
          drop-shadow(-11px 0 0 var(--tw-color-tertiary)) 
          drop-shadow(0 -11px 0 var(--tw-color-tertiary)) 
          drop-shadow(2px 2px 5px rgba(0,0,0,0.10))
        `,

      },
      dropShadow: {
        custom: "2px 2px 1px rgba(0,0,0,0.15)",
        hero: [
          "11px 0 0 var(--tw-color-tertiary)", // Droite
          "0 11px 0 var(--tw-color-tertiary)", // Bas
          "-11px 0 0 var(--tw-color-tertiary)", // Gauche
          "0 -11px 0 var(--tw-color-tertiary)", // Haut
          "2px 2px 5px rgba(0,0,0,0.10)", // Ombre douce
        ],
        macbook: [
          "6px 0 0 var(--tw-color-tertiary)", // Droite
          "0 6px 0 var(--tw-color-tertiary)", // Bas
          "-6px 0 0 var(--tw-color-tertiary)", // Gauche
          "0 -6px 0 var(--tw-color-tertiary)", // Haut
          "2px 2px 5px rgba(0,0,0,0.10)", // Ombre douce
        ],
      },
      colors: {
        primary: "#251E18",
        secondary: "#D6CBC2",
        tertiary: "#EDE8E4",
      },
    },
  },
  plugins: [],
};
