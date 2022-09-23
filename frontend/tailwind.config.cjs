/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,svelte}"],
  darkMode: 'class',
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    styled: true,
    themes: false,
    themes: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
  },
}
