/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#080A0F',
          secondary: '#10141D',
          card: '#151B26',
        },
        border: {
          subtle: '#252E3D',
          hover: '#3A465B',
        },
        brand: {
          neon: '#B6FF5C',
          blue: '#43B5FF',
          orange: '#FFAA55',
          danger: '#FF626C',
        },
        text: {
          main: '#F5F7FA',
          secondary: '#929BAA',
          muted: '#626C7D',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 20px -3px rgba(182, 255, 92, 0.25)',
        'neon-glow-strong': '0 0 30px 2px rgba(182, 255, 92, 0.4)',
        'blue-glow': '0 0 20px -3px rgba(67, 181, 255, 0.25)',
        'orange-glow': '0 0 20px -3px rgba(255, 170, 85, 0.25)',
      }
    },
  },
  plugins: [],
}
