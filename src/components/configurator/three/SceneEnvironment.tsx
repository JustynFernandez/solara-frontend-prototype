import React from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import SunLight from "./SunLight";

interface SceneEnvironmentProps {
  children: React.ReactNode;
  shadowMapSize?: number;
}

const SceneEnvironment: React.FC<SceneEnvironmentProps> = ({
  children,
  shadowMapSize = 2048,
}) => {
  return (
    <>
      <color attach="background" args={["#e8f4fc"]} />

      <ambientLight intensity={0.4} color="#b0d4f1" />

      <SunLight shadowMapSize={shadowMapSize} />

      <hemisphereLight
        args={["#87ceeb", "#98d8aa", 0.3]}
        position={[0, 20, 0]}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#90b89a" roughness={0.9} />
      </mesh>

      <gridHelper
        args={[40, 40, "#cbd5e1", "#e2e8f0"]}
        position={[0, 0.001, 0]}
      />

      <OrbitControls
        makeDefault
        minDistance={5}
        maxDistance={30}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        enablePan={true}
        panSpeed={0.5}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        target={[0, 1, 0]}
      />

      {children}
    </>
  );
};

export default SceneEnvironment;
