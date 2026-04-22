import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import * as THREE from "three";
import { useConfiguratorStore } from "../../hooks/useConfiguratorStore";
const GabledRoof = () => {
    const { roof } = useConfiguratorStore();
    const { width, depth, pitchAngle } = roof;
    const geometry = useMemo(() => {
        const pitchRad = (pitchAngle * Math.PI) / 180;
        const roofHeight = (width / 2) * Math.tan(pitchRad);
        const halfWidth = width / 2;
        const halfDepth = depth / 2;
        const vertices = new Float32Array([
            -halfWidth, 0, -halfDepth,
            halfWidth, 0, -halfDepth,
            0, roofHeight, -halfDepth,
            -halfWidth, 0, halfDepth,
            0, roofHeight, halfDepth,
            halfWidth, 0, halfDepth,
            -halfWidth, 0, -halfDepth,
            0, roofHeight, -halfDepth,
            -halfWidth, 0, halfDepth,
            -halfWidth, 0, halfDepth,
            0, roofHeight, -halfDepth,
            0, roofHeight, halfDepth,
            0, roofHeight, -halfDepth,
            halfWidth, 0, -halfDepth,
            0, roofHeight, halfDepth,
            0, roofHeight, halfDepth,
            halfWidth, 0, -halfDepth,
            halfWidth, 0, halfDepth,
        ]);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geo.computeVertexNormals();
        return geo;
    }, [width, depth, pitchAngle]);
    const slopeGeometry = useMemo(() => {
        const pitchRad = (pitchAngle * Math.PI) / 180;
        const slopeLength = (width / 2) / Math.cos(pitchRad);
        const geo = new THREE.PlaneGeometry(slopeLength - 0.1, depth - 0.1);
        return geo;
    }, [width, depth, pitchAngle]);
    const pitchRad = (pitchAngle * Math.PI) / 180;
    const roofHeight = (width / 2) * Math.tan(pitchRad);
    const slopeLength = (width / 2) / Math.cos(pitchRad);
    return (_jsxs("group", { children: [_jsx("mesh", { geometry: geometry, receiveShadow: true, castShadow: true, children: _jsx("meshStandardMaterial", { color: "#4a5568", roughness: 0.8, metalness: 0.1, side: THREE.DoubleSide }) }), _jsxs("mesh", { position: [-(width / 4) * Math.cos(pitchRad), roofHeight / 2 + 0.002, 0], rotation: [0, 0, pitchRad], children: [_jsx("planeGeometry", { args: [slopeLength - 0.15, depth - 0.15] }), _jsx("meshStandardMaterial", { color: "#64748b", roughness: 0.9, transparent: true, opacity: 0.2, side: THREE.DoubleSide })] }), _jsxs("mesh", { position: [(width / 4) * Math.cos(pitchRad), roofHeight / 2 + 0.002, 0], rotation: [0, 0, -pitchRad], children: [_jsx("planeGeometry", { args: [slopeLength - 0.15, depth - 0.15] }), _jsx("meshStandardMaterial", { color: "#64748b", roughness: 0.9, transparent: true, opacity: 0.2, side: THREE.DoubleSide })] })] }));
};
export default GabledRoof;
