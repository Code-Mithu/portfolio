/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Deep Indigo
        },
        secondary: {
          DEFAULT: '#64748B', // Slate
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber
        },
      },
    },
  },
  plugins: [],
}
