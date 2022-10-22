/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,svelte}"],
  darkMode: 'class',
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark"],
    default: "light",
    logs: false
  },
}
