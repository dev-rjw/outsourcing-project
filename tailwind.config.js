/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#000000",
        primary: "#8E43E7", // 보라색
        soft: "#F8F4FF", //연보라
        accent: "#FFFF33", // 노란색
      },
    },
  },
  plugins: [],
};
