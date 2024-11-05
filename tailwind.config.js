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
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'like': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        }
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'like': 'like 0.3s ease-in-out',
      },
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