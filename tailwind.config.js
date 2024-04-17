import withMT from "@material-tailwind/html/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    'tablet': '640px',
    // => @media (min-width: 640px) { ... }

    'laptop': '1024px',
    // => @media (min-width: 1024px) { ... }

    'desktop': '1280px',
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),],
});

