/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        paper: "#fafafa",
        accent: "#f59e0b",
        electric: "#2563EB",
        success: "#16a34a",
        warm: "#F5F0EB",
        muted: "#9CA3AF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-tajawal)", "system-ui", "sans-serif"],
        arabic: ["var(--font-tajawal)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulse: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { transform: "translateY(24px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards",
      },
    },
  },
  plugins: [],
};
