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
        b0: "#09090B",
        b1: "#111113",
        b3: "#18181B",
        b4: "#27272A",
        brand: {
          amber: "#dea044",
          "amber-hi": "#f0c06a",
          "amber-lo": "#b8802e",
        },
        accent: {
          DEFAULT: "#E8420D",
          hi: "#FF5C2E",
          lo: "#C73A0C",
          10: "rgba(232,66,13,.10)",
          "06": "rgba(232,66,13,.06)",
        },
        cream: {
          DEFAULT: "#F5F5F5",
          80: "rgba(245,245,245,.80)",
          70: "rgba(245,245,245,.70)",
          55: "rgba(245,245,245,.55)",
          35: "rgba(245,245,245,.35)",
          18: "rgba(245,245,245,.18)",
          10: "rgba(245,245,245,.10)",
          "05": "rgba(245,245,245,.05)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Outfit", "sans-serif"],
        body: ["Inter", "Outfit", "sans-serif"],
        display: ["Sora", "sans-serif"],
        brand: ["Montserrat", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "none" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "rise-1": "rise 0.8s ease 0.1s forwards",
        "rise-2": "rise 0.8s ease 0.2s forwards",
        "rise-3": "rise 0.8s ease 0.3s forwards",
        "rise-4": "rise 0.8s ease 0.4s forwards",
        "rise-5": "rise 0.8s ease 0.5s forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
