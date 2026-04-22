import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import PageBackground from "@/components/ui/PageBackground";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useEcoMode } from "@/hooks/useEcoMode";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import CommandPalette from "@/components/ui/CommandPalette";
import AppRoutes from "@/app/AppRoutes";
import EcoModeBadge from "@/app/EcoModeBadge";
import { navItems } from "@/app/navItems";
import { useLocation } from "react-router-dom";
import { getPageShellConfig } from "@/app/pageFamilyConfig";
import { cn } from "@/lib/utils";
const AppShell = () => {
    const { ecoModeEnabled } = useEcoMode();
    const [solarModeActive, setSolarModeActive] = useState(false);
    const { open: commandPaletteOpen, setOpen: setCommandPaletteOpen, openPalette } = useCommandPalette();
    const location = useLocation();
    const isHomeRoute = location.pathname === "/";
    const pageShell = getPageShellConfig(location.pathname);
    const hideFloatingControls = pageShell.hideFloatingControls || false;
    const hideFooter = pageShell.hideFooter || false;
    const hideMobileBottomNav = pageShell.hideMobileBottomNav || false;
    const handleKonamiCode = useCallback(() => {
        setSolarModeActive(true);
        toast.success("Solar Mode Activated!", {
            description: "You found the secret! Enjoy the extra sunshine.",
            duration: 4000,
        });
        setTimeout(() => setSolarModeActive(false), 10000);
    }, []);
    useKonamiCode(handleKonamiCode);
    useEffect(() => {
        const root = document.documentElement;
        if (ecoModeEnabled) {
            root.setAttribute("data-perf", "low");
        }
        else {
            root.removeAttribute("data-perf");
        }
    }, [ecoModeEnabled]);
    return (_jsxs("div", { className: `solara-app-shell solara-page solara-page--${pageShell.family} relative isolate flex min-h-screen flex-col bg-transparent text-slate-900 transition-colors duration-500 dark:text-slate-100 ${solarModeActive ? "solar-mode-active" : ""}`, "data-page-family": pageShell.family, "data-page-path": location.pathname, children: [_jsx(PageBackground, { variant: pageShell.background }), _jsx(Toaster, { position: "top-center", toastOptions: {
                    className: "!bg-white/95 !border-solara-blue/20 !shadow-lg dark:!bg-slate-900/95 dark:!border-white/10",
                } }), solarModeActive && (_jsx("div", { className: "pointer-events-none fixed inset-0 z-50 animate-pulse bg-gradient-to-b from-solara-gold/10 via-transparent to-solara-gold/5", "aria-hidden": "true" })), _jsx(CommandPalette, { open: commandPaletteOpen, onClose: () => setCommandPaletteOpen(false) }), _jsx(Navbar, { navItems: navItems, onSearchClick: openPalette }), _jsx("main", { className: cn("solara-app-main flex-1 pb-16 md:pb-0"), children: _jsx(AppRoutes, {}) }), !isHomeRoute && !hideFloatingControls ? (_jsxs("div", { className: "solara-floating-controls fixed bottom-4 right-4 flex flex-col items-end gap-2", children: [_jsx(EcoModeBadge, {}), _jsx(ThemeToggle, {})] })) : null, !hideFooter ? _jsx(Footer, { navItems: navItems }) : null, !hideMobileBottomNav ? _jsx(MobileBottomNav, {}) : null] }));
};
export default AppShell;
