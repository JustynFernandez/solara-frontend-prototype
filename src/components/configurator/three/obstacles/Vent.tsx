import React from "react";
import { OBSTACLE_SPECS } from "../../../../data/configuratorDefaults";

interface VentProps {
  position: [number, number, number];
  onClick?: () => void;
  isRemoveMode?: boolean;
}

const Vent: React.FC<VentProps> = ({ position, onClick, isRemoveMode }) => {
  const spec = OBSTACLE_SPECS.vent;
  const [hovered, setHovered] = React.useState(false);

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Vent pipe */}
      <mesh position={[0, spec.height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[spec.width / 2, spec.width / 2, spec.height, 12]} />
        <meshStandardMaterial
          color={hovered && isRemoveMode ? "#dc2626" : "#71717a"}
          roughness={0.5}
          metalness={0.7}
        />
      </mesh>

      {/* Vent cap */}
      <mesh position={[0, spec.height + 0.03, 0]} castShadow>
        <cylinderGeometry args={[spec.width / 2 + 0.05, spec.width / 2 + 0.05, 0.06, 12]} />
        <meshStandardMaterial color="#525252" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Cap top */}
      <mesh position={[0, spec.height + 0.1, 0]} castShadow>
        <coneGeometry args={[spec.width / 2 + 0.08, 0.1, 12]} />
        <meshStandardMaterial color="#525252" roughness={0.4} metalness={0.8} />
      </mesh>
    </group>
  );
};

export default Vent;
