import React from "react";
import { OBSTACLE_SPECS } from "../../../../data/configuratorDefaults";

interface SkylightProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
  isRemoveMode?: boolean;
}

const Skylight: React.FC<SkylightProps> = ({
  position,
  rotation = [0, 0, 0],
  onClick,
  isRemoveMode,
}) => {
  const spec = OBSTACLE_SPECS.skylight;
  const [hovered, setHovered] = React.useState(false);

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Frame */}
      <mesh position={[0, spec.height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[spec.width, spec.height, spec.depth]} />
        <meshStandardMaterial
          color={hovered && isRemoveMode ? "#dc2626" : "#2c3e50"}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Glass surface */}
      <mesh position={[0, spec.height + 0.01, 0]}>
        <boxGeometry args={[spec.width - 0.06, 0.02, spec.depth - 0.06]} />
        <meshStandardMaterial
          color="#87ceeb"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

export default Skylight;
