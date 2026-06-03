import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f19", // Midnight Slate
        foreground: "#f8fafc", // Off-white
        brand: {
          blue: "#3b82f6",     // Movie Blue
          hover: "#2563eb",    // Darker Blue
          dark: "#0b0f19",
          surface: "#111827",  // Gray-900
          border: "#1e293b",   // Slate-800
        },
        neon: {
          blue: "#3b82f6",
          purple: "#3b82f6",
          pink: "#2563eb",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;
