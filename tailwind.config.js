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
      width: {
        37: '148px',
      },
      height: {
        37: '148px',
      },
      maxWidth: {
        37: '148px',
        'main-content': '864px',
      },
      maxHeight: {
        37: '148px',
      },
      backgroundImage: {
        logo: 'url("/logo.png")',
      },
      borderColor: {
        'base-border': 'var(--base-border)',
      },
      textColor: {
        'base-blue': 'var(--base-blue)',
        'base-title': 'var(--base-title)',
        'base-subtitle': 'var(--base-subtitle)',
        'base-text': 'var(--base-text)',
        'base-span': 'var(--base-span)',
        'base-label': 'var(--base-label)',
      },
      backgroundColor: {
        base: 'var(--base)',
        'base-profile': 'var(--base-profile)',
        'base-input': 'var(--base-input)',
        'base-post': 'var(--base-post)',
      },
    },
  },
  plugins: [],
}
