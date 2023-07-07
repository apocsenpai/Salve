/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)'],
        alt: ['var(--font-nunito)'],
      },
      screens: {
        '2xl': { max: '1535px' },
        xl: { max: '1279px' },
        lg: { max: '900px' },
        md: { max: '767px' },
        sm: { max: '639px' },
      },
      colors: {
        watermelon: {
          main: '#DB6161',
          alternative: '#F9F6F4',
          emphasis: '#0F502E',
          'dark-main': '#AD3838',
        },
        blueberry: {
          main: '#8E98A8',
          alternative: '#efecf5',
          emphasis: '#043065',
          'dark-main': '#432c69',
        },
        banana: {
          main: '#ffc205',
          alternative: '#fbf8e8',
          emphasis: '#151100',
          'dark-main': '#C99104',
        },
        main: 'var(--main)',
        alternative: 'var(--alternative)',
        emphasis: 'var(--emphasis)',
        'dark-main': 'var(--dark-main)',
      },
      boxShadow: {
        'left-curve': '-20px 20px 0px var(--alternative)',
        'right-curve': '20px 20px 0px var(--alternative)',
      },
    },
  },
  plugins: [],
}
