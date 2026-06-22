/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        foreground: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}
