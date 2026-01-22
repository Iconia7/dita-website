/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#25aae1', // Deep Slate/Navy (Hero Background)
          primary: '#0f172a', // Darker Navy (Footer)
          accent: '#0f172a', // Teal/Mint (Buttons - similar to the image)
          light: '#f1f5f9', // Very light gray/blue for section backgrounds
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean modern font like the image
      }
    },
  },
  plugins: [],
}