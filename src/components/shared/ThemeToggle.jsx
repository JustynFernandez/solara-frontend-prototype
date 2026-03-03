import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/85 text-slate-900 shadow-[0_12px_28px_rgba(0,51,102,0.16)] transition hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(0,123,255,0.18)] dark:border-white/10 dark:bg-white/10 dark:text-white ${className}`}
      aria-label="Toggle theme"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(0,123,255,0.18)] via-transparent to-[rgba(212,175,55,0.18)] opacity-0 transition duration-500 group-hover:opacity-100 dark:from-[rgba(0,123,255,0.12)] dark:to-[rgba(212,175,55,0.12)]" />
      {dark ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.7-5.7-1.4 1.4M6.7 17.3l-1.4 1.4m12.8 0-1.4-1.4M6.7 6.7 5.3 5.3" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
