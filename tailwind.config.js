/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#070406",
        surface: {
          100: "#0e080d",
          200: "#180b13",
          300: "#24101d",
          400: "#321629",
        },
        crimson: {
          DEFAULT: "#ff003c",
          dark: "#b3002a",
          light: "#ff335c",
          bright: "#ff1a4b",
          glow: "rgba(255, 0, 60, 0.5)",
        },
        neon: {
          purple: "#ff003c", // Red override
          "purple-light": "#ff335c",
          "purple-dark": "#b3002a",
          cyan: "#00f0ff",
          gold: "#ffd700",
          fire: "#ff003c",
          green: "#00ff88",
        },
        border: {
          glass: "rgba(255, 0, 60, 0.25)",
          "glass-hover": "rgba(255, 0, 60, 0.6)",
        }
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'Montserrat', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 30px rgba(255, 0, 60, 0.45)',
        'neon-crimson': '0 0 35px rgba(255, 0, 60, 0.55)',
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'neon-gold': '0 0 25px rgba(255, 215, 0, 0.35)',
        'card-glow': '0 8px 32px 0 rgba(255, 0, 60, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'esports-hero': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255, 0, 60, 0.25), rgba(7, 4, 6, 0))',
        'card-gradient': 'linear-gradient(135deg, rgba(24, 11, 19, 0.85) 0%, rgba(14, 8, 13, 0.95) 100%)',
        'metallic-crimson': 'linear-gradient(180deg, rgba(255, 0, 60, 0.25) 0%, rgba(179, 0, 42, 0.05) 100%)',
      }
    },
  },
  plugins: [],
};
