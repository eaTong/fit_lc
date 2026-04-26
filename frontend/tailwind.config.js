/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          secondary: '#1A1A1A',
          tertiary: '#252525',
        },
        accent: {
          orange: '#FF4500',
          red: '#DC143C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#888888',
          muted: '#555555',
        },
        border: {
          DEFAULT: '#333333',
          accent: '#FF4500',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
