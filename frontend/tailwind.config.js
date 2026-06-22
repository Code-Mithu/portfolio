/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // we toggle the `dark` class on <html>
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        muted: "#475569",
        // Core palette – match the reference design
        primary: "#0ea5e9", // teal‑600
        secondary: "#64748b", // slate‑500
        background: "#ffffff", // light background
        foreground: "#0f172a", // dark text
        surface: "#f8fafc", // page surface (gray‑50)
        accent: "#f59e0b", // amber‑500 for highlights
        border: "#e2e8f0", // light border (slate‑200)
      },
      zIndex: {
        40: "40", // desktop navbar
        50: "50", // mobile overlay
      },
    },
  },
  plugins: [],
};
