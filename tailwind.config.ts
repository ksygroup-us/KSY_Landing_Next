import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: '#6a1b9a',   // Deep Purple
        secondary: '#d81b60', // Vibrant Red/Pink
        accent: '#9c27b0',    // Lighter Purple/Pink
        neutral: '#333333',   // Dark Gray
        'base-100': '#ffffff',// White
        info: '#2094f3',      // Soft Blue/Cyan
        success: '#4caf50',   // Green
        warning: '#ff9800',   // Warm Yellow/Orange
        error: '#f44336',     // Rich Red
      },
      keyframes: {
        drive: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(240px)' }
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        drive: 'drive 4s ease-in-out 3s forwards',
        spin: 'spin 1s linear infinite'
      }
    },
  },
  plugins: [require('daisyui'),require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#6a1b9a',   // Deep Purple
          secondary: '#d81b60', // Vibrant Red/Pink
          accent: '#9c27b0',    // Lighter Purple/Pink
          neutral: '#333333',   // Dark Gray
          'base-100': '#ffffff',// White
          info: '#2094f3',      // Soft Blue/Cyan
          success: '#4caf50',   // Green
          warning: '#ff9800',   // Warm Yellow/Orange
          error: '#f44336',     // Rich Red
        },
      },
    ],
  },
  // plugins: [],
} satisfies Config

export default config
