/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          green: {
            DEFAULT: '#1b4332',
            dark: '#143628',
            deep: '#0f291e',
            medium: '#2d6a4f',
            light: '#40916c',
            muted: '#52b788',
            soft: '#74c69d',
            subtle: '#d8f3dc',
            surface: '#eef8f2',
          },
          earth: {
            DEFAULT: '#8b5e3c',
            dark: '#6f4e37',
            light: '#a68a64',
            subtle: '#f5ebe0',
          },
          neutral: {
            bg: '#fbfbfa',
            surface: '#ffffff',
            card: '#ffffff',
            border: '#e5e7eb',
            borderLight: '#f0f2f0',
            muted: '#6b7280',
            text: '#1f2937',
            heading: '#111827',
          },
          status: {
            amber: '#d97706',
            amberBg: '#fef3c7',
            red: '#dc2626',
            redBg: '#fee2e2',
            green: '#16a34a',
            greenBg: '#dcfce7',
            blue: '#2563eb',
            blueBg: '#dbeafe',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'agri-sm': '0 1px 3px rgba(27, 67, 50, 0.05), 0 1px 2px rgba(27, 67, 50, 0.03)',
        'agri-md': '0 4px 6px -1px rgba(27, 67, 50, 0.07), 0 2px 4px -1px rgba(27, 67, 50, 0.04)',
        'agri-lg': '0 10px 15px -3px rgba(27, 67, 50, 0.08), 0 4px 6px -2px rgba(27, 67, 50, 0.03)',
      }
    },
  },
  plugins: [],
}
