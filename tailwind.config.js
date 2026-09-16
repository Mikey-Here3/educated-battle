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
        background: "#060810",
        // Theme-driven dynamic color system
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-secondary)",
          light: "var(--color-accent)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        // Mapped to dynamic theme variables so ALL existing components transform with theme!
        crimson: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-secondary)",
          light: "var(--color-accent)",
          bright: "var(--color-accent)",
          glow: "var(--color-glow)",
        },
        surface: {
          100: "#080c16",
          200: "#0e1424",
          300: "#141d32",
          400: "#1c2840",
        },
        neon: {
          purple: "var(--color-primary)",
          "purple-light": "var(--color-accent)",
          "purple-dark": "var(--color-secondary)",
          cyan: "var(--color-accent)",
          gold: "#ffd700",
          fire: "var(--color-primary)",
          green: "#00ff88",
        },
        border: {
          glass: "rgba(var(--color-primary-rgb), 0.2)",
          "glass-hover": "rgba(var(--color-primary-rgb), 0.55)",
          crimson: "var(--color-primary)",
        }
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'Montserrat', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-primary': '0 0 30px var(--color-glow)',
        'neon-purple': '0 0 30px var(--color-glow)',
        'neon-crimson': '0 0 35px var(--color-glow)',
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'neon-gold': '0 0 25px rgba(255, 215, 0, 0.35)',
        'card-glow': '0 8px 32px 0 rgba(var(--color-primary-rgb), 0.18)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'esports-hero': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(var(--color-primary-rgb), 0.22), rgba(6, 8, 16, 0))',
        'card-gradient': 'linear-gradient(135deg, rgba(8, 12, 22, 0.85) 0%, rgba(6, 8, 16, 0.95) 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.45s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-right': 'slideInRight 0.4s ease both',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
