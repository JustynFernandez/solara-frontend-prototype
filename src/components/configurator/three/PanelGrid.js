import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import * as THREE from "three";
import { useConfiguratorStore } from "../hooks/useConfiguratorStore";
import { PANEL_SPECS, OBSTACLE_SPECS } from "../../../data/configuratorDefaults";
import SolarPanel from "./SolarPanel";
const GRID_SIZE = 0.05;
function snapToGrid(value, gridSize) {
    return Math.round(value / gridSize) * gridSize;
}
function generatePanelId() {
    return `panel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
const PanelGrid = () => {
    const { panels, roof, toolMode, obstacles, addPanel } = useConfiguratorStore();
    const roofClickHandler = useCallback((e) => {
        if (toolMode !== "add")
            return;
        e.stopPropagation();
        const point = e.point;
        const normal = e.face?.normal;
        if (!normal)
            return;
        const worldNormal = normal.clone();
        if (e.object.matrixWorld) {
            worldNormal.transformDirection(e.object.matrixWorld);
        }
        let roofFace = "top";
        let rotation = [0, 0, 0];
        if (roof.type === "flat") {
            roofFace = "top";
            rotation = [0, 0, 0];
        }
        else {
            const pitchRad = (roof.pitchAngle * Math.PI) / 180;
            if (point.x < 0) {
                roofFace = "front";
                rotation = [0, 0, pitchRad];
            }
            else {
                roofFace = "back";
                rotation = [0, 0, -pitchRad];
            }
        }
        const snappedX = snapToGrid(point.x, GRID_SIZE);
        const snappedZ = snapToGrid(point.z, GRID_SIZE);
        const halfWidth = roof.width / 2;
        const halfDepth = roof.depth / 2;
        const panelHalfWidth = PANEL_SPECS.width / 2;
        const panelHalfHeight = PANEL_SPECS.height / 2;
        const isWithinBounds = Math.abs(snappedX) + panelHalfWidth <= halfWidth - 0.1 &&
            Math.abs(snappedZ) + panelHalfHeight <= halfDepth - 0.1;
        if (!isWithinBounds)
            return;
        const hasOverlap = panels.some((panel) => {
            const dx = Math.abs(panel.position[0] - snappedX);
            const dz = Math.abs(panel.position[2] - snappedZ);
            return dx < PANEL_SPECS.width && dz < PANEL_SPECS.height;
        });
        if (hasOverlap)
            return;
        // Check obstacle collision with clearance zones
        const hasObstacleOverlap = obstacles.some((obstacle) => {
            const spec = OBSTACLE_SPECS[obstacle.type];
            const dx = Math.abs(obstacle.position[0] - snappedX);
            const dz = Math.abs(obstacle.position[2] - snappedZ);
            const clearanceX = (spec.width + PANEL_SPECS.width) / 2 + spec.clearance;
            const clearanceZ = (spec.depth + PANEL_SPECS.height) / 2 + spec.clearance;
            return dx < clearanceX && dz < clearanceZ;
        });
        if (hasObstacleOverlap)
            return;
        let yPosition = point.y + PANEL_SPECS.thickness / 2 + 0.02;
        if (roof.type === "flat") {
            yPosition = 0.15 + PANEL_SPECS.thickness / 2 + 0.02;
        }
        const newPanel = {
            id: generatePanelId(),
            position: [snappedX, yPosition, snappedZ],
            rotation,
            roofFace,
        };
        addPanel(newPanel);
    }, [toolMode, roof, panels, obstacles, addPanel]);
    const clickableSurfaces = useMemo(() => {
        if (roof.type === "flat") {
            return (_jsxs("mesh", { position: [0, 0.15, 0], rotation: [-Math.PI / 2, 0, 0], onClick: roofClickHandler, visible: false, children: [_jsx("planeGeometry", { args: [roof.width, roof.depth] }), _jsx("meshBasicMaterial", { transparent: true, opacity: 0 })] }));
        }
        const pitchRad = (roof.pitchAngle * Math.PI) / 180;
        const roofHeight = (roof.width / 2) * Math.tan(pitchRad);
        const slopeLength = (roof.width / 2) / Math.cos(pitchRad);
        return (_jsxs(_Fragment, { children: [_jsxs("mesh", { position: [-(roof.width / 4), roofHeight / 2, 0], rotation: [0, 0, pitchRad], onClick: roofClickHandler, visible: false, children: [_jsx("planeGeometry", { args: [slopeLength, roof.depth] }), _jsx("meshBasicMaterial", { transparent: true, opacity: 0, side: THREE.DoubleSide })] }), _jsxs("mesh", { position: [(roof.width / 4), roofHeight / 2, 0], rotation: [0, 0, -pitchRad], onClick: roofClickHandler, visible: false, children: [_jsx("planeGeometry", { args: [slopeLength, roof.depth] }), _jsx("meshBasicMaterial", { transparent: true, opacity: 0, side: THREE.DoubleSide })] })] }));
    }, [roof, roofClickHandler]);
    return (_jsxs("group", { children: [clickableSurfaces, panels.map((panel) => (_jsx(SolarPanel, { panel: panel }, panel.id)))] }));
};
export default PanelGrid;
