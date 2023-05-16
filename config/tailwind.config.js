const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*.{erb,haml,html,slim}",
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  theme: {
    hljs: {
      theme: "An-Old-Hope",
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
      },
      colors: {
        project: {
          blue: {
            pale: "#f8f9fc",
            base: "#f3f4fe",
            light: "#d1defc",
            main: "#6380f2",
            dark: "#2c3085",
          },
          gray: {
            light: "#aab1cc",
            dark: "#6a6e81",
          },
          black: "#1f1f1f",
          white: "#f9f9ff",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwind-highlightjs"),
  ],
};
