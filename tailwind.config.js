/** @type {import('tailwindcss').Config} */

import { colors } from "./src/designTokens";
import { fontSizes } from "./src/designTokens";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    fontSizes,
    extend: {},
  },
  plugins: [],
};
