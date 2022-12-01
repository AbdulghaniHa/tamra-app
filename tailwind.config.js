/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "background": "#F7F7F7"
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1400px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1920px'
      },
  
    },
  },
  plugins: [],
}
