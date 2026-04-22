import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { OrbitControls } from "@react-three/drei";
import SunLight from "./SunLight";
const SceneEnvironment = ({ children, shadowMapSize = 2048, }) => {
    return (_jsxs(_Fragment, { children: [_jsx("color", { attach: "background", args: ["#e8f4fc"] }), _jsx("ambientLight", { intensity: 0.4, color: "#b0d4f1" }), _jsx(SunLight, { shadowMapSize: shadowMapSize }), _jsx("hemisphereLight", { args: ["#87ceeb", "#98d8aa", 0.3], position: [0, 20, 0] }), _jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -0.01, 0], receiveShadow: true, children: [_jsx("planeGeometry", { args: [40, 40] }), _jsx("shadowMaterial", { opacity: 0.25 })] }), _jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -0.02, 0], children: [_jsx("planeGeometry", { args: [40, 40] }), _jsx("meshStandardMaterial", { color: "#90b89a", roughness: 0.9 })] }), _jsx("gridHelper", { args: [40, 40, "#cbd5e1", "#e2e8f0"], position: [0, 0.001, 0] }), _jsx(OrbitControls, { makeDefault: true, minDistance: 5, maxDistance: 30, minPolarAngle: 0.2, maxPolarAngle: Math.PI / 2.1, enablePan: true, panSpeed: 0.5, rotateSpeed: 0.5, zoomSpeed: 0.8, target: [0, 1, 0] }), children] }));
};
export default SceneEnvironment;
