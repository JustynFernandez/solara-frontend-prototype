import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/auth-context";
const AppProviders = ({ children }) => (_jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: children }) }));
export default AppProviders;
