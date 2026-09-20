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
          // Existing aliases so other pages don't regress
          dark: '#25aae1',
          primary: '#0f172a',
          accent: '#0f172a',
          light: '#f1f5f9',

          // Canonical DITA / Daystar brand tokens
          blue: '#25aae1',
          blueDeep: '#0e8fc4',
          blueSoft: '#e8f6fd',
          deep: '#003366',
          navy: '#0f172a',
          navyMid: '#1e293b',
          navyInk: '#032540',
          ink: '#1e293b',
          muted: '#64748b',
          line: '#e2e8f0',
          surface: '#ffffff',
          lightBg: '#f5f7fa',
          gold: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
