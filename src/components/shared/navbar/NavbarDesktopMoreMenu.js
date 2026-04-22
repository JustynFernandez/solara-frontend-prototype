import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/app/navbarConfig";
const NavbarDesktopMoreMenu = ({ items, currentPathname, compact = false, triggerClassName, triggerActiveClassName, panelClassName, itemClassName, itemActiveClassName, }) => {
    const [open, setOpen] = React.useState(false);
    const menuRef = React.useRef(null);
    const menuId = React.useId();
    const prefersReducedMotion = useReducedMotion();
    if (!items?.length)
        return null;
    const hasActiveChild = items.some((item) => isNavItemActive(currentPathname, item.to));
    React.useEffect(() => {
        const onPointerDown = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);
    React.useEffect(() => {
        setOpen(false);
    }, [currentPathname]);
    return (_jsxs("div", { ref: menuRef, className: "relative", children: [_jsxs("button", { type: "button", "aria-expanded": open, "aria-haspopup": "menu", "aria-controls": menuId, className: cn(triggerClassName, hasActiveChild && triggerActiveClassName, open && "is-open"), onClick: () => setOpen((value) => !value), children: [_jsx("span", { children: "More" }), _jsx("svg", { className: cn("h-4 w-4 transition-transform duration-200", open && "rotate-180"), viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", children: _jsx("path", { d: "m6 9 6 6 6-6" }) })] }), _jsx(AnimatePresence, { children: open ? (_jsx(motion.div, { id: menuId, role: "menu", initial: prefersReducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }, animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }, exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, className: cn("absolute right-0 z-50 min-w-[12rem]", compact ? "top-[calc(100%+0.55rem)]" : "top-[calc(100%+0.7rem)]", panelClassName), children: items.map((item) => (_jsxs(NavLink, { to: item.to, role: "menuitem", onClick: () => setOpen(false), className: cn(itemClassName, isNavItemActive(currentPathname, item.to) && itemActiveClassName), children: [_jsx("span", { children: item.label }), _jsx("svg", { className: "h-4 w-4 opacity-70", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", children: _jsx("path", { d: "m9 18 6-6-6-6" }) })] }, item.to))) })) : null })] }));
};
export default NavbarDesktopMoreMenu;
