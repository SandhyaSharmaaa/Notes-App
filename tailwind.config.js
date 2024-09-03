/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "walkway-black": ["Walkway Black", "sans-serif"],
        "creatodisplay-bold": ["CreatoDisplay Bold", "sans-serif"],
        "sourcesanspro-regular": ["SourceSansPro Regular", "sans-serif"],
      },
      colors: {
        warn: "#FFE352",
        danger: "#BC2F2F",
        success: "#1BD159",
        primary: {
          DEFAULT: "#25432C",
          light: "#5E8858",
          muted: "#BAD4B6",
        },
        secondary: {
          DEFAULT: "#ffffff",
        },
        gray: {
          DEFAULT: "#959595",
          muted: "#959595",
          dark: "#000000",
        },
      },
      fontSize: {
        h1: "3rem",
        h2: "2.5rem",
        h3: "2.06rem",
        h4: "1.75rem",
        h5: "1.44rem",
        button1: "1rem",
        button2: "0.88rem",
        body: "0.81rem",
        caption: "0.69rem",
        h1Bold: "3rem",
        h2Bold: "2.5rem",
        h3Bold: "2.06rem",
        h4Bold: "1.75rem",
        h5Bold: "1.44rem",
        button1Bold: "1rem",
        button2Bold: "0.88rem",
        bodyBold: "0.81rem",
        captionBold: "0.69rem",
      },
      screens: {
        xs: "576",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        xxxl: "1730px",
        xxxxl: "1980px",
      },
    },
  },
  plugins: [],
};
