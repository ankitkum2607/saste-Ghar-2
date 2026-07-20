import type { Config } from "tailwindcss";

/**
 * SasteGhar palette mapped onto the SAME semantic token names the ported
 * Giraaj property components use (primary / secondary / accent / canvas / ink).
 * Changing the values here recolors every ported component to the SasteGhar
 * brand with zero class edits:
 *   - secondary  → warm terracotta (all CTAs, links, active states, icons)
 *   - primary    → near-black (dark text + dark surfaces)
 *   - accent     → warm gold-brown highlight
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a1a1a",
          50: "#f6f5f3",
          100: "#eceae5",
          600: "#3d3d3d",
          700: "#2b2b2b",
          800: "#222222",
          900: "#1a1a1a",
          950: "#111111",
        },
        secondary: {
          DEFAULT: "#8b6f47",
          50: "#f6f2ea",
          100: "#e9ddc9",
          500: "#8b6f47",
          600: "#7a6038",
          700: "#6d5638",
        },
        accent: {
          DEFAULT: "#c99a4e",
          400: "#dcb877",
          500: "#c99a4e",
          600: "#a87d34",
        },
        success: {
          DEFAULT: "#10B981",
          500: "#10b981",
          600: "#059669",
        },
        // Warm surface tokens (brief design system)
        canvas: "#ffffff",
        cream: "#f7f5f2",
        "cream-deep": "#f0ede8",
        ink: "#1a1a1a",
        line: "#e5e0d8",
        "line-strong": "#d4cec2",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      spacing: {
        "13": "3.25rem",
        "18": "4.5rem",
      },
      height: {
        "13": "3.25rem",
        "18": "4.5rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(26, 26, 26, 0.08), 0 4px 16px -4px rgba(26, 26, 26, 0.06)",
        card: "0 1px 2px rgba(26, 26, 26, 0.05), 0 4px 12px -2px rgba(26, 26, 26, 0.08), 0 12px 28px -10px rgba(26, 26, 26, 0.10)",
        lift: "0 2px 4px rgba(26, 26, 26, 0.06), 0 12px 24px -6px rgba(26, 26, 26, 0.12), 0 24px 48px -12px rgba(26, 26, 26, 0.18)",
      },
      letterSpacing: {
        eyebrow: "0.08em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.08) translate3d(-1%, -1%, 0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "slide-up": "slide-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 1.5s infinite",
        breathe: "breathe 3s ease-in-out infinite",
        kenburns: "kenburns 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
