import type { Config } from "tailwindcss";

/**
 * Centralised design tokens for Lucky Riot Games.
 *
 * Palette derived from the brand logo. Dark-first, bold, energetic, premium.
 * Balance target: ~65% black/charcoal, ~20% off-white/neutral, ~8% gold,
 * ~4% pink/magenta, ~3% cyan/blue/purple.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Foundation
        riot: {
          black: "#050609",
          charcoal: "#0C1118",
          surface: "#141B24",
          "surface-raised": "#1B2530",
          border: "#293543",
          // Riot pink family
          pink: "#FA0597",
          magenta: "#E805B7",
          "deep-pink": "#B80B83",
          // Electric blue family
          cyan: "#18C8F2",
          blue: "#2175D7",
          "deep-blue": "#1655A6",
          // Supporting purple
          purple: "#7A238F",
          violet: "#612277",
          // Typography
          white: "#FFFDF5",
          text: "#F5F2E9",
          "text-muted": "#AEB7C2",
          "text-dark": "#080A0D",
        },
        // Lucky gold family
        lucky: {
          yellow: "#FFE126",
          gold: "#FFC20A",
          orange: "#F9950B",
          "deep-orange": "#F16F28",
        },
        // Accessible feedback states (distinct from brand pink)
        state: {
          error: "#FF5A4D",
          warning: "#F9950B",
          success: "#34D399",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Anton is condensed; use comfortable line-heights and slight positive
        // tracking so multi-line display headings don't look squished.
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.08", letterSpacing: "0.01em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "0.01em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.14", letterSpacing: "0.01em" }],
      },
      maxWidth: {
        container: "80rem",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "lucky-gradient": "linear-gradient(135deg, #FFE126 0%, #FFC20A 50%, #F16F28 100%)",
        "riot-gradient":
          "linear-gradient(110deg, #FA0597 0%, #E805B7 35%, #7A238F 62%, #18C8F2 100%)",
        "electric-gradient": "linear-gradient(135deg, #18C8F2 0%, #2175D7 100%)",
        "dark-surface-gradient": "linear-gradient(145deg, #141B24 0%, #080A0D 100%)",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 10px 40px -12px rgba(0,0,0,0.7)",
        "card-hover":
          "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 60px -12px rgba(0,0,0,0.8)",
        "glow-gold": "0 0 36px -8px rgba(255,194,10,0.5)",
        "glow-pink": "0 0 32px -8px rgba(250,5,151,0.45)",
        "glow-cyan": "0 0 32px -8px rgba(24,200,242,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ambient-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-2%,0) scale(1.04)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "ambient-drift": "ambient-drift 18s ease-in-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        sweep: "sweep 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
