import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Trail } from "@react-three/drei";
import { useEcoMode } from "../../hooks/useEcoMode";
import { usePerfFlag } from "../../hooks/usePerfFlag";
const EnergyOrb = ({ className = "" }) => {
    const { ecoModeEnabled } = useEcoMode();
    const isLowPerf = usePerfFlag();
    const accent = useMemo(() => ["#007bff", "#003366", "#d4af3780"][Math.floor(Math.random() * 3)], []);
    if (ecoModeEnabled || isLowPerf)
        return null;
    return (_jsx("div", { className: `pointer-events-none absolute inset-0 ${className}`, "aria-hidden": true, children: _jsxs(Canvas, { gl: { antialias: true, alpha: true }, dpr: [1, 1.6], camera: { position: [0, 0, 4], fov: 42 }, children: [_jsx("color", { attach: "background", args: ["transparent"] }), _jsx("ambientLight", { intensity: 1 }), _jsx("pointLight", { position: [2, 3, 2], intensity: 1.2, color: "#e0fff2" }), _jsx("pointLight", { position: [-3, -2, -2], intensity: 0.6, color: "#9de6ff" }), _jsxs(Suspense, { fallback: null, children: [_jsx(Float, { speed: 2, rotationIntensity: 0.8, floatIntensity: 1.3, children: _jsx(Sphere, { args: [1.15, 48, 48], children: _jsx(MeshDistortMaterial, { color: accent, emissive: accent, emissiveIntensity: 0.5, roughness: 0.1, metalness: 0.08, distort: 0.25, speed: 2.6 }) }) }), _jsx(Float, { speed: 1.2, rotationIntensity: 0.4, floatIntensity: 0.8, children: _jsx(Trail, { width: 0.32, color: accent, length: 5.5, attenuation: (value) => value * 0.25, children: _jsx(Sphere, { args: [0.08, 32, 32], position: [1.4, -0.6, 0], children: _jsx("meshStandardMaterial", { color: "#ffffff", emissive: accent, emissiveIntensity: 1.1 }) }) }) })] })] }) }));
};
export default EnergyOrb;
