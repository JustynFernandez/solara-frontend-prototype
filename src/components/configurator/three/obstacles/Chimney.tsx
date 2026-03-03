import React from "react";
import { OBSTACLE_SPECS } from "../../../../data/configuratorDefaults";

interface ChimneyProps {
  position: [number, number, number];
  onClick?: () => void;
  isRemoveMode?: boolean;
}

const Chimney: React.FC<ChimneyProps> = ({ position, onClick, isRemoveMode }) => {
  const spec = OBSTACLE_SPECS.chimney;
  const [hovered, setHovered] = React.useState(false);

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main chimney body */}
      <mesh position={[0, spec.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[spec.width, spec.height, spec.depth]} />
        <meshStandardMaterial
          color={hovered && isRemoveMode ? "#dc2626" : "#8b4513"}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Chimney cap */}
      <mesh position={[0, spec.height + 0.05, 0]} castShadow>
        <boxGeometry args={[spec.width + 0.1, 0.1, spec.depth + 0.1]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Chimney pot */}
      <mesh position={[0, spec.height + 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 8]} />
        <meshStandardMaterial color="#a0522d" roughness={0.8} />
      </mesh>
    </group>
  );
};

export default Chimney;
