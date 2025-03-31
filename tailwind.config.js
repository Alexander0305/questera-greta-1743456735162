/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f6ff',
        'deep-space': '#0a0b1e',
        'cosmic-purple': '#2d0054',
        'stellar-blue': '#007fff',
        'tech-gray': '#1a1b2e'
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 246, 255, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(0, 246, 255, 0.2)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}