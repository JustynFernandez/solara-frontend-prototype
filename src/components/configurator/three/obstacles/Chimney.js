import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { OBSTACLE_SPECS } from "../../../../data/configuratorDefaults";
const Chimney = ({ position, onClick, isRemoveMode }) => {
    const spec = OBSTACLE_SPECS.chimney;
    const [hovered, setHovered] = React.useState(false);
    return (_jsxs("group", { position: position, onClick: onClick, onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false), children: [_jsxs("mesh", { position: [0, spec.height / 2, 0], castShadow: true, receiveShadow: true, children: [_jsx("boxGeometry", { args: [spec.width, spec.height, spec.depth] }), _jsx("meshStandardMaterial", { color: hovered && isRemoveMode ? "#dc2626" : "#8b4513", roughness: 0.9, metalness: 0 })] }), _jsxs("mesh", { position: [0, spec.height + 0.05, 0], castShadow: true, children: [_jsx("boxGeometry", { args: [spec.width + 0.1, 0.1, spec.depth + 0.1] }), _jsx("meshStandardMaterial", { color: "#4a4a4a", roughness: 0.7, metalness: 0.2 })] }), _jsxs("mesh", { position: [0, spec.height + 0.15, 0], castShadow: true, children: [_jsx("cylinderGeometry", { args: [0.12, 0.15, 0.2, 8] }), _jsx("meshStandardMaterial", { color: "#a0522d", roughness: 0.8 })] })] }));
};
export default Chimney;
