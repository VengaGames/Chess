/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "media",
  content: ["./src/**/*.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      print: { raw: "print" },
    },
    extend: {
      width: {
        "1/8": "12.5%",
      },
      height: {
        "1/8": "12.5%",
      },
    },
  },
  variants: {
    extend: {},
  },
};
