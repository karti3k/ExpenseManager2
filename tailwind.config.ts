import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        allison: ['Allison', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgba(42, 161, 226, 0.43) 40.1%, rgba(42, 161, 226, 0.75) 99.99%, rgba(42, 161, 226, 0.00) 100%)',
      },
      colors:{
        'custom-sky-blue' : '#32B7FF',
        'custom-darkgray' : '#939393',
        'custom-blueshade' : '#3997CB',
        'custom-lightgray' : '#d9d9d9',
        'custom-red': '#E43540',
        'custom-green': '#008000',
        'custom-light-green': '#B7FFB7',
      },
      textShadow: {
        'stroke': '8px 8px 0 #32B7FF, -8px -8px 0 #32B7FF, 8px -8px 0 #32B7FF, -8px 8px 0 #32B7FF',
      },
    },
  },
  plugins: [],
};
export default config;
