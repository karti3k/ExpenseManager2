import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'custom-sky-blue' : '#32B7FF',
        'custom-darkgray' : '#939393',
        'custom-blueshade' : '#3997CB',
        'custom-lightgray' : '#d9d9d9',
      },
      textShadow: {
        'stroke': '8px 8px 0 #32B7FF, -8px -8px 0 #32B7FF, 8px -8px 0 #32B7FF, -8px 8px 0 #32B7FF',
      },
    },
  },
  plugins: [],
};
export default config;
