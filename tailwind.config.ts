import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        outlook: {
          // Outlook web brand palette (current)
          blue: "#0078D4",
          blueDark: "#106EBE",
          blueDarker: "#005A9E",
          purple: "#5B5FC7",
          chrome: "#FAF9F8",
          rail: "#F3F2F1",
          border: "#EDEBE9",
          textDim: "#605E5C",
          today: "#D13438",
        },
        // Meridian Biopharma palette (available for tenant-branded accents)
        meridian: {
          bar: "#0e1c2b",
          accent: "#0aa4a0",
          blue: "#1a63c4",
          blueHover: "#154fa0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
