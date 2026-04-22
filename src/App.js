import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "@/app/AppProviders";
import AppShell from "@/app/AppShell";
const App = () => (_jsx(Router, { children: _jsx(AppProviders, { children: _jsx(AppShell, {}) }) }));
export default App;
