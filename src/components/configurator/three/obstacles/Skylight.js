import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { OBSTACLE_SPECS } from "../../../../data/configuratorDefaults";
const Skylight = ({ position, rotation = [0, 0, 0], onClick, isRemoveMode, }) => {
    const spec = OBSTACLE_SPECS.skylight;
    const [hovered, setHovered] = React.useState(false);
    return (_jsxs("group", { position: position, rotation: rotation, onClick: onClick, onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false), children: [_jsxs("mesh", { position: [0, spec.height / 2, 0], castShadow: true, receiveShadow: true, children: [_jsx("boxGeometry", { args: [spec.width, spec.height, spec.depth] }), _jsx("meshStandardMaterial", { color: hovered && isRemoveMode ? "#dc2626" : "#2c3e50", roughness: 0.4, metalness: 0.6 })] }), _jsxs("mesh", { position: [0, spec.height + 0.01, 0], children: [_jsx("boxGeometry", { args: [spec.width - 0.06, 0.02, spec.depth - 0.06] }), _jsx("meshStandardMaterial", { color: "#87ceeb", roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.6 })] })] }));
};
export default Skylight;
