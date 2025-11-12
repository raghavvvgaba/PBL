/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan-custom': '#00ffff',
        'magenta-custom': '#ff006e',
        'purple-custom': '#8338ec',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'mono': ['"Space Mono"', 'monospace'],
      },
      keyframes: {
        floatParticle: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translate(50px, -100px) scale(1.5)', opacity: '0.8' },
          '90%': { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(50px) scale(0.9)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        cornerPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        bracketPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'float': 'floatParticle 10s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideDown': 'slideDown 0.2s ease-out',
        'slideUp': 'slideUp 0.4s ease-out',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'pulse-corner': 'cornerPulse 2s ease-in-out infinite',
        'pulse-bracket': 'bracketPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

