import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./game/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        board: {
          bg: "#0f1729",
          cell: "#1e3a5f",
          cellHover: "#2a4a7a",
          cellPlayed: "#0d1520",
          accent: "#3b82f6",
          border: "#334155",
        },
      },
    },
  },
  plugins: [],
};

export default config;
