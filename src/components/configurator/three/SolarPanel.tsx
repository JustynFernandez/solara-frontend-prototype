import React, { useState, useRef } from "react";
import { Mesh } from "three";
import { PANEL_SPECS } from "../../../data/configuratorDefaults";
import { useConfiguratorStore, type Panel } from "../hooks/useConfiguratorStore";

interface SolarPanelProps {
  panel: Panel;
}

const SolarPanel: React.FC<SolarPanelProps> = ({ panel }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { toolMode, removePanel, selectedPanelId, setSelectedPanel } =
    useConfiguratorStore();

  const isSelected = selectedPanelId === panel.id;
  const isRemoveMode = toolMode === "remove";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isRemoveMode) {
      removePanel(panel.id);
    } else {
      setSelectedPanel(isSelected ? null : panel.id);
    }
  };

  const handlePointerOver = (e: React.PointerEvent) => {
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

  return (
    <group
      position={panel.position}
      rotation={panel.rotation}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            PANEL_SPECS.width,
            PANEL_SPECS.thickness,
            PANEL_SPECS.height,
          ]}
        />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      <mesh position={[0, PANEL_SPECS.thickness / 2 + 0.002, 0]}>
        <boxGeometry
          args={[
            PANEL_SPECS.width - 0.08,
            0.002,
            PANEL_SPECS.height - 0.08,
          ]}
        />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0, PANEL_SPECS.thickness / 2 + 0.003, 0]}>
        <boxGeometry
          args={[PANEL_SPECS.width - 0.04, 0.001, 0.01]}
        />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
      </mesh>

      {isSelected && (
        <mesh position={[0, PANEL_SPECS.thickness / 2 + 0.01, 0]}>
          <boxGeometry
            args={[
              PANEL_SPECS.width + 0.04,
              0.005,
              PANEL_SPECS.height + 0.04,
            ]}
          />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};

export default SolarPanel;
