import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Red Team palette
        red: {
          team: "#ef4444",
          dark: "#7f1d1d",
          glow: "#fca5a5",
        },
        // Blue Team palette
        blue: {
          team: "#3b82f6",
          dark: "#1e3a5f",
          glow: "#93c5fd",
        },
        // Purple Team palette
        purple: {
          team: "#a855f7",
          dark: "#4a1d96",
          glow: "#d8b4fe",
        },
        // Terminal colors
        terminal: {
          bg: "#0d1117",
          border: "#30363d",
          green: "#39d353",
          yellow: "#e3b341",
          red: "#f85149",
          cyan: "#79c0ff",
          white: "#c9d1d9",
          comment: "#8b949e",
        },
        surface: {
          DEFAULT: "#0d1117",
          1: "#161b22",
          2: "#21262d",
          3: "#30363d",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scan-line": "scan-line 3s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px currentColor" },
          "50%": { boxShadow: "0 0 20px currentColor, 0 0 40px currentColor" },
        },
        "slide-in": {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
