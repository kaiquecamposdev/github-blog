/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'main-content': '864px',
      },
      backgroundImage: {
        logo: 'url("/logo.png")',
      },
      textColor: {
        'base-blue': '#3294F8',
        'base-title': '#E7EDF4',
        'base-subtitle': '#C4D4E3',
        'base-text': '#AFC2D4',
        'base-span': '#7B96B2',
        'base-label': '#3A536B',
        'base-border': '#1C2F41',
        'base-post': ' #112131',
      },
      backgroundColor: {
        base: '#071422',
        'base-profile': '#0B1B2B',
      },
    },
  },
  plugins: [],
}
