import React, { useRef } from "react";
import { Mesh } from "three";
import { useConfiguratorStore } from "../../hooks/useConfiguratorStore";

const FlatRoof: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const { roof } = useConfiguratorStore();

  const { width, depth } = roof;
  const height = 0.15;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, height + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width - 0.1, depth - 0.1]} />
        <meshStandardMaterial
          color="#64748b"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default FlatRoof;
