import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': 'rgba(93, 62, 62, 0)',
      },
      animation: {
        slideInTop: 'slideInTop 0.5s ease-out',
      },
      keyframes: {
        slideInTop: {
          '0%': {
            transform: 'translateY(100%)',
            display: "hidden",
          },
          '100%': {
            transform: 'translateY(0)',
            display: "block",
          },
        },
      },
    },
    plugins: [
      daisyui,
    ],
  }
}
