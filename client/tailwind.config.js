/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {        
       'primary': '#178582',
        'cream': '#FFF8E8', 
      },
      backgroundColor: {
        'cream': '#FFF8E8', 
      },
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}