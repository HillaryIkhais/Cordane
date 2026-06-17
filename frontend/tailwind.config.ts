import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'highlight-sequence': 'highlight 8s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        highlight: {
          '0%, 100%': { borderColor: 'rgba(204,139,69,0.1)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
          '10%': { borderColor: 'rgba(204,139,69,0.8)', boxShadow: '0 0 25px rgba(204,139,69,0.2)' },
          '20%': { borderColor: 'rgba(204,139,69,0.1)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
