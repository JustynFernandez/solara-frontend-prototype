import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useConfiguratorStore } from "../../hooks/useConfiguratorStore";
const FlatRoof = () => {
    const meshRef = useRef(null);
    const { roof } = useConfiguratorStore();
    const { width, depth } = roof;
    const height = 0.15;
    return (_jsxs("group", { children: [_jsxs("mesh", { ref: meshRef, position: [0, height / 2, 0], receiveShadow: true, castShadow: true, children: [_jsx("boxGeometry", { args: [width, height, depth] }), _jsx("meshStandardMaterial", { color: "#4a5568", roughness: 0.8, metalness: 0.1 })] }), _jsxs("mesh", { position: [0, height + 0.001, 0], rotation: [-Math.PI / 2, 0, 0], children: [_jsx("planeGeometry", { args: [width - 0.1, depth - 0.1] }), _jsx("meshStandardMaterial", { color: "#64748b", roughness: 0.9, metalness: 0, transparent: true, opacity: 0.3 })] })] }));
};
export default FlatRoof;
