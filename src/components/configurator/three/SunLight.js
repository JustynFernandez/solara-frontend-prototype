import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useConfiguratorStore } from "../hooks/useConfiguratorStore";
import { useSunPosition } from "../hooks/useSunPosition";
import { useSunPlayback } from "../hooks/useSunPlayback";
const SunLight = ({ shadowMapSize = 2048 }) => {
    const lightRef = useRef(null);
    const { sun } = useConfiguratorStore();
    // This hook handles the animation loop when playback is active
    useSunPlayback();
    const sunPosition = useSunPosition(sun.hour, sun.month, sun.latitude);
    useFrame(() => {
        if (lightRef.current) {
            lightRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
            lightRef.current.intensity = sunPosition.intensity;
        }
    });
    const shadowCameraSize = 12;
    return (_jsxs(_Fragment, { children: [_jsx("directionalLight", { ref: lightRef, position: [sunPosition.x, sunPosition.y, sunPosition.z], intensity: sunPosition.intensity, color: "#fff5e6", castShadow: true, "shadow-mapSize-width": shadowMapSize, "shadow-mapSize-height": shadowMapSize, "shadow-camera-near": 0.5, "shadow-camera-far": 50, "shadow-camera-left": -shadowCameraSize, "shadow-camera-right": shadowCameraSize, "shadow-camera-top": shadowCameraSize, "shadow-camera-bottom": -shadowCameraSize, "shadow-bias": -0.0001 }), sunPosition.altitude > 0 && (_jsxs("mesh", { position: [sunPosition.x * 0.8, sunPosition.y * 0.8, sunPosition.z * 0.8], children: [_jsx("sphereGeometry", { args: [0.3, 16, 16] }), _jsx("meshBasicMaterial", { color: "#fbbf24" })] }))] }));
};
export default SunLight;
