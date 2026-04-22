import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
const MobileBottomNav = () => {
    const { user } = useAuth();
    const location = useLocation();
    const items = [
        {
            to: "/",
            label: "Home",
            icon: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), _jsx("polyline", { points: "9 22 9 12 15 12 15 22" })] })),
        },
        {
            to: "/connect/helpers",
            label: "Helpers",
            icon: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] })),
        },
        {
            to: "/projects",
            label: "Projects",
            icon: (_jsx("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" }) })),
        },
        {
            to: "/learn",
            label: "Learn",
            icon: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), _jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })] })),
        },
        {
            to: user ? "/dashboard" : "/sign-in",
            label: user ? "Me" : "Sign In",
            icon: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "12", cy: "7", r: "4" })] })),
        },
    ];
    return (_jsx("nav", { className: "solara-mobile-nav fixed bottom-0 left-0 right-0 z-40 pb-safe md:hidden", children: _jsx("div", { className: "flex items-center justify-around py-2", children: items.map(({ to, icon, label }) => {
                const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
                return (_jsxs(NavLink, { to: to, className: `solara-mobile-nav__item flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${isActive ? "is-active" : ""}`, children: [_jsx("span", { children: icon }), _jsx("span", { children: label })] }, to));
            }) }) }));
};
export default MobileBottomNav;
