/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.jsx",
    ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#475569',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            //backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
        },
      });
    },
  ],
}

