import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { OBSTACLE_SPECS } from "../../../../data/configuratorDefaults";
const Vent = ({ position, onClick, isRemoveMode }) => {
    const spec = OBSTACLE_SPECS.vent;
    const [hovered, setHovered] = React.useState(false);
    return (_jsxs("group", { position: position, onClick: onClick, onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false), children: [_jsxs("mesh", { position: [0, spec.height / 2, 0], castShadow: true, receiveShadow: true, children: [_jsx("cylinderGeometry", { args: [spec.width / 2, spec.width / 2, spec.height, 12] }), _jsx("meshStandardMaterial", { color: hovered && isRemoveMode ? "#dc2626" : "#71717a", roughness: 0.5, metalness: 0.7 })] }), _jsxs("mesh", { position: [0, spec.height + 0.03, 0], castShadow: true, children: [_jsx("cylinderGeometry", { args: [spec.width / 2 + 0.05, spec.width / 2 + 0.05, 0.06, 12] }), _jsx("meshStandardMaterial", { color: "#525252", roughness: 0.4, metalness: 0.8 })] }), _jsxs("mesh", { position: [0, spec.height + 0.1, 0], castShadow: true, children: [_jsx("coneGeometry", { args: [spec.width / 2 + 0.08, 0.1, 12] }), _jsx("meshStandardMaterial", { color: "#525252", roughness: 0.4, metalness: 0.8 })] })] }));
};
export default Vent;
