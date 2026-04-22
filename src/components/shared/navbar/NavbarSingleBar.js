import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import NavbarDesktopMoreMenu from "./NavbarDesktopMoreMenu";
import NavbarSharedControls, { NavbarMobilePanel } from "./NavbarSharedControls";

const navLinkClasses = (compact = false) => ({ isActive }) => cn("solara-nav-preview__link solara-nav-bar__link", compact && "is-compact", isActive && "solara-nav-preview__link--active");
const routeMetaByPath = [
    {
        match: (pathname) => pathname === "/",
        label: "Home",
        mode: "Overview",
        note: "Start with the live network, not a brochure.",
    },
    {
        match: (pathname) => pathname === "/connect" || pathname === "/connect/helpers" || pathname === "/request-help" || pathname === "/request",
        label: "Connect",
        mode: "Dispatch",
        note: "Verified local help, screened before requests go out.",
    },
    {
        match: (pathname) => pathname === "/plan" || pathname === "/plan/navigator" || pathname === "/solar-navigator" || pathname === "/configurator",
        label: "Plan",
        mode: "Studio",
        note: "Guided routes and hands-on layout work in one flow.",
    },
    {
        match: (pathname) => pathname === "/projects" || pathname.startsWith("/projects/"),
        label: "Projects",
        mode: "Board",
        note: "Live workspaces with roles, resources, and volunteer demand.",
    },
    {
        match: (pathname) => pathname === "/learn" || pathname.startsWith("/learn/") || pathname === "/safety" || pathname === "/community-guidelines",
        label: "Learn",
        mode: "Library",
        note: "Operational guides, safety notes, and field-ready context.",
    },
    {
        match: (pathname) => pathname === "/services",
        label: "Services",
        mode: "Model",
        note: "How helpers, projects, and guidance fit together.",
    },
];
const getRouteMeta = (pathname) => routeMetaByPath.find((item) => item.match(pathname)) ?? {
    label: "Solara",
    mode: "Network",
    note: "Community solar planning, support, and shared delivery.",
};
const BrandLockup = ({ compact = false, routeMeta }) => (_jsxs(Link, { to: "/", className: cn("solara-nav-preview__brand-link", compact && "solara-nav-preview__brand-link--compact"), children: [_jsxs("span", { className: "solara-nav-preview__brand-mark", children: [_jsx("span", { className: "solara-nav-preview__brand-glow", "aria-hidden": "true" }), _jsx("img", { src: "/solara-logo.png", alt: "Solara logo", className: "solara-nav-preview__brand-image" })] }), _jsxs("span", { className: "solara-nav-preview__brand-copy", children: [_jsx("span", { className: "solara-nav-preview__brand-title", children: "Solara" }), _jsx("span", { className: "solara-nav-preview__brand-subtitle", children: "Community Solar OS" }), routeMeta ? (_jsxs("span", { className: "solara-nav-route-cue", children: [_jsxs("span", { className: "solara-nav-route-cue__mode", children: [routeMeta.mode, " mode"] }), _jsx("span", { className: "solara-nav-route-cue__label", children: routeMeta.label })] })) : null] })] }));
const NavbarSingleBar = ({ navItems, primaryItems, secondaryItems, currentPathname, user, dark, toggleTheme, onSearchClick, mobileMenuOpen, onToggleMobileMenu, closeMobileMenu, elevated, compact, }) => {
    const routeMeta = getRouteMeta(currentPathname);
    return (_jsxs("div", { className: cn("solara-nav-preview solara-nav--bar", compact && "is-compact"), children: [_jsx("div", { className: "solara-nav-preview__desktop solara-nav-bar__desktop", children: _jsxs("div", { className: cn("solara-nav-preview__piece solara-nav-bar__shell", elevated && "is-elevated", compact && "is-compact"), children: [_jsxs("div", { className: "solara-nav-bar__segment solara-nav-bar__segment--brand", children: [_jsx(BrandLockup, { compact: compact, routeMeta: routeMeta }), _jsxs("div", { className: "solara-nav-route-note", children: [_jsx("span", { className: "solara-nav-route-note__eyebrow", children: routeMeta.mode }), _jsx("span", { className: "solara-nav-route-note__body", children: routeMeta.note })] })] }), _jsx("div", { className: "solara-nav-bar__segment solara-nav-bar__segment--nav", children: _jsxs("div", { className: cn("solara-nav-preview__nav-row solara-nav-bar__nav-row", compact && "is-compact"), children: [primaryItems.map((item) => (_jsx(NavLink, { to: item.to, end: item.to === "/", className: navLinkClasses(compact), children: item.label }, item.to))), _jsx(NavbarDesktopMoreMenu, { items: secondaryItems, currentPathname: currentPathname, compact: compact, triggerClassName: cn("solara-nav-preview__menu-trigger solara-nav-preview__link solara-nav-bar__link", compact && "is-compact"), triggerActiveClassName: "solara-nav-preview__link--active", panelClassName: cn("solara-nav-preview__menu-panel solara-nav-bar__menu-panel", compact && "is-compact"), itemClassName: "solara-nav-preview__menu-item", itemActiveClassName: "solara-nav-preview__menu-item--active" })] }) }), _jsx(NavbarSharedControls, { user: user, dark: dark, toggleTheme: toggleTheme, onSearchClick: onSearchClick, mobileMenuOpen: mobileMenuOpen, onToggleMobileMenu: onToggleMobileMenu, compact: compact, groupClassName: "solara-nav-bar__segment solara-nav-bar__segment--utilities", controlClassName: "solara-nav-bar__control", ctaClassName: "solara-nav-bar__cta", showMobileMenu: false })] }) }), _jsxs("div", { className: cn("solara-nav-preview__piece solara-nav-preview__mobile-shell solara-nav-bar__mobile-shell", elevated && "is-elevated", compact && "is-compact"), children: [_jsx(BrandLockup, { compact: true, routeMeta: routeMeta }), _jsx(NavbarSharedControls, { user: user, dark: dark, toggleTheme: toggleTheme, onSearchClick: onSearchClick, mobileMenuOpen: mobileMenuOpen, onToggleMobileMenu: onToggleMobileMenu, compact: compact, groupClassName: "solara-nav-preview__mobile-controls", controlClassName: "solara-nav-bar__control", ctaClassName: "solara-nav-bar__cta", showSearch: false })] }), _jsx(NavbarMobilePanel, { open: mobileMenuOpen, navItems: navItems, user: user, onClose: closeMobileMenu, panelClassName: "solara-nav-bar__mobile-panel", itemClassName: "solara-nav-bar__mobile-link", activeItemClassName: "solara-nav-preview__mobile-link--active" })] }));
};
export default NavbarSingleBar;
