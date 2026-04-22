import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { PANEL_SPECS } from "../../../data/configuratorDefaults";
import { useConfiguratorStore } from "../hooks/useConfiguratorStore";
const SolarPanel = ({ panel }) => {
    const meshRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const { toolMode, removePanel, selectedPanelId, setSelectedPanel } = useConfiguratorStore();
    const isSelected = selectedPanelId === panel.id;
    const isRemoveMode = toolMode === "remove";
    const handleClick = (e) => {
        e.stopPropagation();
        if (isRemoveMode) {
            removePanel(panel.id);
        }
        else {
            setSelectedPanel(isSelected ? null : panel.id);
        }
    };
    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = isRemoveMode ? "pointer" : "default";
    };
    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = "default";
    };
    const baseColor = "#1a365d";
    const hoverColor = isRemoveMode ? "#dc2626" : "#2563eb";
    const selectedColor = "#3b82f6";
    const color = hovered ? hoverColor : isSelected ? selectedColor : baseColor;
    return (_jsxs("group", { position: panel.position, rotation: panel.rotation, children: [_jsxs("mesh", { ref: meshRef, onClick: handleClick, onPointerOver: handlePointerOver, onPointerOut: handlePointerOut, castShadow: true, receiveShadow: true, children: [_jsx("boxGeometry", { args: [
                            PANEL_SPECS.width,
                            PANEL_SPECS.thickness,
                            PANEL_SPECS.height,
                        ] }), _jsx("meshStandardMaterial", { color: color, roughness: 0.3, metalness: 0.6 })] }), _jsxs("mesh", { position: [0, PANEL_SPECS.thickness / 2 + 0.002, 0], children: [_jsx("boxGeometry", { args: [
                            PANEL_SPECS.width - 0.08,
                            0.002,
                            PANEL_SPECS.height - 0.08,
                        ] }), _jsx("meshStandardMaterial", { color: "#0f172a", roughness: 0.1, metalness: 0.8 })] }), _jsxs("mesh", { position: [0, PANEL_SPECS.thickness / 2 + 0.003, 0], children: [_jsx("boxGeometry", { args: [PANEL_SPECS.width - 0.04, 0.001, 0.01] }), _jsx("meshStandardMaterial", { color: "#475569", metalness: 0.9, roughness: 0.2 })] }), isSelected && (_jsxs("mesh", { position: [0, PANEL_SPECS.thickness / 2 + 0.01, 0], children: [_jsx("boxGeometry", { args: [
                            PANEL_SPECS.width + 0.04,
                            0.005,
                            PANEL_SPECS.height + 0.04,
                        ] }), _jsx("meshBasicMaterial", { color: "#60a5fa", transparent: true, opacity: 0.3 })] }))] }));
};
export default SolarPanel;
