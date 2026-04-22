import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEcoMode } from "../../hooks/useEcoMode";
const PageBackground = ({ variant = "editorial-stage" }) => {
    const { ecoModeEnabled } = useEcoMode();
    const isImmersiveHome = variant === "home";
    const isDarkTheme = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: `pointer-events-none fixed inset-0 -z-50 ${isImmersiveHome ? "bg-page-home-v2" : `bg-page-family bg-page-family--${variant}`}`, "aria-hidden": "true" }), !ecoModeEnabled && isImmersiveHome ? _jsx(HomeGridSubstrate, {}) : null, !ecoModeEnabled && !isImmersiveHome ? _jsx(FamilySubstrate, { variant: variant }) : null, !ecoModeEnabled && isImmersiveHome ? _jsx(FilmGrain, { variant: "home", dark: isDarkTheme }) : null, !ecoModeEnabled && !isImmersiveHome ? _jsx(FilmGrain, { subtle: true }) : null, _jsx(EdgeFades, { hideTop: isImmersiveHome, variant: isImmersiveHome ? "home" : "family", familyVariant: variant })] }));
};
const HomeGridSubstrate = () => (_jsx("div", { className: "pointer-events-none fixed inset-0 -z-[41] overflow-hidden home-grid-substrate", "aria-hidden": "true" }));
const FamilySubstrate = ({ variant }) => (_jsx("div", { className: `pointer-events-none fixed inset-0 -z-[44] overflow-hidden page-family-substrate page-family-substrate--${variant}`, "aria-hidden": "true" }));
const FilmGrain = ({ subtle = false, variant = "default", dark = false, }) => (_jsx("div", { className: "pointer-events-none fixed inset-0 -z-[40] overflow-hidden", "aria-hidden": "true", children: _jsx("div", { className: "calm-grain absolute inset-0", style: variant === "home"
            ? { opacity: dark ? 0.22 : 0.14 }
            : subtle
                ? { opacity: 0.2 }
                : undefined }) }));
const EdgeFades = ({ hideTop: _hideTop = false, variant = "default", familyVariant = "editorial-stage", }) => (_jsx(_Fragment, { children: _jsx("div", { className: "pointer-events-none fixed inset-x-0 bottom-0 -z-20 h-28", "aria-hidden": "true", children: _jsx("div", { className: variant === "home"
                ? "absolute inset-0 bg-gradient-to-t from-[rgba(242,246,251,0.48)] to-transparent dark:from-[rgba(12,16,21,0.54)] dark:to-transparent"
                : variant === "family"
                    ? `absolute inset-0 bg-gradient-to-t ${familyVariant === "product-graphite" || familyVariant === "immersive-dark"
                        ? "from-[rgba(13,17,22,0.56)] to-transparent dark:from-[rgba(9,12,16,0.7)] dark:to-transparent"
                        : "from-[rgba(240,244,249,0.36)] to-transparent dark:from-[rgba(13,17,22,0.5)] dark:to-transparent"}`
                    : "absolute inset-0 bg-gradient-to-t from-white/38 to-transparent dark:from-[rgba(12,16,21,0.44)] dark:to-transparent" }) }) }));
export default PageBackground;
