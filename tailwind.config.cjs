module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Page background classes
    "bg-page-home-v2",
    "bg-page-connect-v2",
    "bg-page-services-v2",
    "bg-page-projects-v2",
    "bg-page-learn-v2",
    "bg-page-plan-v2",
    "bg-page-dashboard-v2",
    "bg-page-base",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Sora", "Space Grotesk", "system-ui", "sans-serif"],
        display: ["Montserrat", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        "solara-navy": "#003366",
        "solara-midnight": "#0b1224",
        "solara-blue": "#007BFF",
        "solara-sky": "#00BFFF",
        "solara-gold": "#D4AF37",
        "solara-amber": "#FFBF5F",
        "solara-ember": "#E0952D",
        "solara-ink": "#333333",
        "solara-cloud": "#F5F5F5",
        "solara-night": "#0a0f1f",
        "solara-panel": "#0d1f3a",
        "solara-foam": "#e8f1ff",
        "solara-foam-strong": "#d9e9ff",
        emerald: {
          50: "#eef5ff",
          100: "#dbe9ff",
          200: "#b7d3ff",
          300: "#8bb8ff",
          400: "#5f9cff",
          500: "#2f81ff",
          600: "#1f63d6",
          700: "#15489f",
          800: "#0f3578",
          900: "#0a2657",
        },
        sky: {
          50: "#e7f4ff",
          100: "#cfe9ff",
          200: "#9dd3ff",
          300: "#6bbcff",
          400: "#39a6ff",
          500: "#008fff",
          600: "#0072cc",
          700: "#005699",
          800: "#003b66",
          900: "#002033",
        },
        amber: {
          50: "#fff8e6",
          100: "#ffe9bf",
          200: "#ffd488",
          300: "#ffbf51",
          400: "#ffae2a",
          500: "#d4af37",
          600: "#b2892c",
          700: "#8f6922",
          800: "#6c4c19",
          900: "#493012",
        },
      },
      boxShadow: {
        glow: "0 10px 40px rgba(0, 123, 255, 0.28)",
        "glow-amber": "0 10px 40px rgba(212, 175, 55, 0.3)",
        "inner-frost": "inset 0 1px 0 rgba(255,255,255,0.4)",
        "solara-soft": "0 18px 56px rgba(0, 51, 102, 0.12)",
        "solara-strong": "0 22px 72px rgba(0, 51, 102, 0.18)",
        "solara-night": "0 28px 90px rgba(0, 0, 0, 0.4)",
        "solara-glass": "0 20px 70px rgba(0, 51, 102, 0.16), 0 1px 0 rgba(255, 255, 255, 0.32)",
        "solara-glass-strong": "0 26px 92px rgba(0, 51, 102, 0.22), 0 1px 0 rgba(255, 255, 255, 0.35)",
      },
      backgroundImage: {
        "energy-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0), radial-gradient(circle at 1px 1px, rgba(0,123,255,0.12) 1px, transparent 0)",
        "soft-radial":
          "radial-gradient(circle at 20% 20%, rgba(0,123,255,0.12), transparent 25%), radial-gradient(circle at 80% 12%, rgba(212,175,55,0.1), transparent 28%), radial-gradient(circle at 50% 78%, rgba(255,191,95,0.1), transparent 28%)",
        "nocturne-radial":
          "radial-gradient(circle at 15% 20%, rgba(0,123,255,0.12), transparent 36%), radial-gradient(circle at 84% 18%, rgba(212,175,55,0.12), transparent 30%), radial-gradient(circle at 60% 80%, rgba(255,191,95,0.08), transparent 32%)",
        "solara-grid":
          "linear-gradient(rgba(0, 123, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.07) 1px, transparent 1px)",
        "solara-radial":
          "radial-gradient(circle at 22% 18%, rgba(0,123,255,0.14), transparent 32%), radial-gradient(circle at 78% 12%, rgba(212,175,55,0.12), transparent 36%), radial-gradient(circle at 50% 82%, rgba(255,191,95,0.08), transparent 34%)",
        "solara-aurora":
          "radial-gradient(circle at 18% 15%, rgba(0,123,255,0.14), transparent 32%), radial-gradient(circle at 62% 12%, rgba(212,175,55,0.12), transparent 28%), radial-gradient(circle at 40% 78%, rgba(0, 123, 255, 0.08), transparent 30%)",
        "solara-noise":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0), radial-gradient(circle at 24px 24px, rgba(0,0,0,0.06) 1px, transparent 0)",

        /* Page Background Gradients - Reusable */
        "page-light": "linear-gradient(180deg, #f7f9ff 0%, #eef3ff 40%, #fdf5e9 100%)",
        "page-home": "linear-gradient(180deg, #f6fbf8 0%, #eef5ff 40%, #fef9ec 100%)",
        "page-projects": "linear-gradient(180deg, #ffffff 0%, #eefbf7 50%, #e7f1ff 100%)",
        "page-dark": "linear-gradient(180deg, #050c1a 0%, #050a17 52%, #040811 100%)",

        /* Unified Page Background System - Performant & Beautiful */
        "page-base": "linear-gradient(180deg, #f8faff 0%, #f4f7fc 35%, #faf8f5 70%, #fcfbf9 100%)",
        "page-glow": "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(0,123,255,0.08), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 15%, rgba(212,175,55,0.06), transparent 45%)",
        "page-grid": "linear-gradient(rgba(0, 123, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)",

        /* Enhanced Page-Specific Base Gradients */
        "page-home-v2": "linear-gradient(165deg, #f5f9ff 0%, #eef5ff 25%, #fdf8f0 60%, #fff 100%)",
        "page-connect-v2": "linear-gradient(170deg, #f4faff 0%, #e8f4ff 35%, #f0f8ff 70%, #fff 100%)",
        "page-services-v2": "linear-gradient(175deg, #f6f9fc 0%, #eef2ff 30%, #fef9f3 65%, #fff 100%)",
        "page-projects-v2": "linear-gradient(168deg, #f3f9ff 0%, #e6f2ff 40%, #f5faff 100%)",
        "page-learn-v2": "linear-gradient(172deg, #fffbf5 0%, #fff7eb 25%, #f8faff 60%, #fff 100%)",
        "page-plan-v2": "linear-gradient(165deg, #f5f8ff 0%, #edf3ff 35%, #f4f8fc 100%)",
        "page-dashboard-v2": "linear-gradient(170deg, #f6faff 0%, #eff5ff 30%, #faf8f4 65%, #fff 100%)",

        /* Animated Blob Gradients */
        "blob-blue": "radial-gradient(ellipse 100% 100%, rgba(0,123,255,0.12), transparent 70%)",
        "blob-gold": "radial-gradient(ellipse 100% 100%, rgba(212,175,55,0.10), transparent 65%)",
        "blob-sky": "radial-gradient(ellipse 100% 100%, rgba(0,191,255,0.08), transparent 70%)",
        "blob-navy": "radial-gradient(ellipse 100% 100%, rgba(0,51,102,0.08), transparent 65%)",

        /* Button Gradients */
        "button-primary": "linear-gradient(120deg, #003366, #0b4fbf, #d4af37)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bloom: {
          "0%, 100%": { filter: "brightness(1) blur(0px)", transform: "scale(0.99)" },
          "50%": { filter: "brightness(1.06) blur(1px)", transform: "scale(1.01)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 123, 255, 0.32)" },
          "70%": { boxShadow: "0 0 0 14px rgba(0, 123, 255, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0, 123, 255, 0)" },
        },
        orbital: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "parallax-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "solara-rays": {
          "0%": { opacity: 0.45, transform: "rotate(0deg) scale(1)" },
          "50%": { opacity: 0.7, transform: "rotate(6deg) scale(1.02)" },
          "100%": { opacity: 0.45, transform: "rotate(12deg) scale(1)" },
        },
        "solara-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.35)" },
          "70%": { boxShadow: "0 0 0 14px rgba(212, 175, 55, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0)" },
        },
        "sheen-slide": {
          "0%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(130%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.45, transform: "scale(1)" },
          "50%": { opacity: 0.9, transform: "scale(1.05)" },
        },
        /* Enhanced Background Animations */
        "blob-drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(5%, 12%) scale(1.06)" },
          "50%": { transform: "translate(-8%, 6%) scale(0.94)" },
          "75%": { transform: "translate(4%, -8%) scale(1.02)" },
        },
        "blob-drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-10%, 8%) scale(1.08)" },
          "66%": { transform: "translate(6%, -6%) scale(0.96)" },
        },
        "blob-drift-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "50%": { transform: "translate(8%, 10%) scale(1.04) rotate(3deg)" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.15)" },
        },
        "glow-breathe-slow": {
          "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
          "50%": { opacity: 0.55, transform: "scale(1.1)" },
        },
        "shape-drift": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
        "shape-orbit": {
          "0%": { transform: "rotate(0deg) translateX(15px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(15px) rotate(-360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        aurora: "aurora 12s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        bloom: "bloom 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "orbital-slow": "orbital 18s linear infinite",
        "parallax-pan": "parallax-pan 16s ease-in-out infinite",
        "solara-rays": "solara-rays 10s ease-in-out infinite",
        "solara-glow": "solara-glow 2.6s ease-out infinite",
        "grid-flow": "parallax-pan 24s linear infinite",
        "sheen-slide": "sheen-slide 2.6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        /* Enhanced Background Animations */
        "blob-drift-1": "blob-drift-1 28s ease-in-out infinite",
        "blob-drift-2": "blob-drift-2 32s ease-in-out infinite",
        "blob-drift-3": "blob-drift-3 36s ease-in-out infinite",
        "glow-breathe": "glow-breathe 8s ease-in-out infinite",
        "glow-breathe-slow": "glow-breathe-slow 12s ease-in-out infinite",
        "shape-drift": "shape-drift 20s ease-in-out infinite",
        "shape-orbit": "shape-orbit 45s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
