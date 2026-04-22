import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/ThemeContext";
import { groupNavbarItems } from "@/app/navbarConfig";
import { cn } from "@/lib/utils";
import NavbarSingleBar from "@/components/shared/navbar/NavbarSingleBar";
const Navbar = ({ navItems, onSearchClick }) => {
    const { user } = useAuth();
    const { dark, toggleTheme } = useTheme();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [elevated, setElevated] = useState(false);
    const { scrollY } = useScroll();
    const isHeroImmersiveRoute = location.pathname === "/" && !new URLSearchParams(location.search).has("__waveCapture");
    const { primaryItems, secondaryItems } = groupNavbarItems(navItems);
    const compact = elevated;
    useMotionValueEvent(scrollY, "change", (latest) => setElevated(latest > 18));
    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname, location.search]);
    const navbarProps = {
        navItems,
        primaryItems,
        secondaryItems,
        currentPathname: location.pathname,
        user,
        dark,
        toggleTheme,
        onSearchClick,
        mobileMenuOpen: open,
        onToggleMobileMenu: () => setOpen((value) => !value),
        closeMobileMenu: () => setOpen(false),
        elevated,
        compact,
    };
    return (_jsx("div", { className: cn("solara-navbar inset-x-0 z-40 px-4 sm:px-6 transition-[padding] duration-200 ease-out", isHeroImmersiveRoute ? "fixed top-0" : "sticky top-0", isHeroImmersiveRoute ? (compact ? "pb-0 pt-1" : "pb-0 pt-1.25") : "pb-0 pt-0"), children: _jsx(motion.nav, { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 }, className: cn("relative mx-auto transition-[max-width] duration-200 ease-out", compact ? "max-w-[76rem]" : "max-w-7xl"), children: _jsx(NavbarSingleBar, { ...navbarProps }) }) }));
};
export default Navbar;
