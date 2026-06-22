/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // we toggle the `dark` class on <html>
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        dark: "#0A0A0B",
        surface: "#111827",
        glass: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
        // Aliases for convenience
        background: "var(--color-surface)",
        foreground: "var(--color-surface)",
      },
      zIndex: {
        40: "40", // desktop navbar
        50: "50", // mobile overlay
      },
    },
  },
  plugins: [],
};
