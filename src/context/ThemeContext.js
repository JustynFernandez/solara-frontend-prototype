import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("solara-theme");
        if (saved)
            return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("solara-theme", "dark");
        }
        else {
            root.classList.remove("dark");
            localStorage.setItem("solara-theme", "light");
        }
    }, [dark]);
    const toggleTheme = () => setDark((value) => !value);
    return _jsx(ThemeContext.Provider, { value: { dark, toggleTheme }, children: children });
};
export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
