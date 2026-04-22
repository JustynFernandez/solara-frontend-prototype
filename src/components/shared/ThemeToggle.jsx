import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`solara-theme-toggle group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border transition ${className}`}
      aria-label="Toggle theme"
    >
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
