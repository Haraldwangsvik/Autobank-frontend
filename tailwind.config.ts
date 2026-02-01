/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Online's official color profile
        'online-blue': {
          DEFAULT: '#0D5474',
          50: '#E6F0F4',
          100: '#CCE1E9',
          200: '#99C3D3',
          300: '#66A5BD',
          400: '#3387A7',
          500: '#0D5474',
          600: '#0A435D',
          700: '#083246',
          800: '#05222F',
          900: '#031118',
        },
        'online-orange': {
          DEFAULT: '#F9B759',
          50: '#FEF7EC',
          100: '#FDEFD9',
          200: '#FCDFB3',
          300: '#FACF8D',
          400: '#F9C373',
          500: '#F9B759',
          600: '#F7A527',
          700: '#D88B0A',
          800: '#A66B08',
          900: '#744B05',
        },
      },
    },
  },
  plugins: [],
};
