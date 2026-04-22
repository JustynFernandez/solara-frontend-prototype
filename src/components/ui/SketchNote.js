import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SketchNote = ({ text, tone = "blue", arrow = "right", className = "" }) => {
    const arrowClass = `handmade-arrow ${arrow !== "right" ? `handmade-arrow--${arrow}` : ""}`.trim();
    return (_jsxs("span", { className: `solara-note solara-note--${tone} ${className}`.trim(), children: [_jsx("span", { children: text }), _jsx("span", { className: arrowClass, "aria-hidden": true })] }));
};
export default SketchNote;
