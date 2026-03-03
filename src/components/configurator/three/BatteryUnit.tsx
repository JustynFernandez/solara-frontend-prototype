import React from "react";
import { Text } from "@react-three/drei";
import { BATTERY_SPECS } from "../../../data/configuratorDefaults";
import { useConfiguratorStore } from "../hooks/useConfiguratorStore";

const BatteryUnit: React.FC = () => {
  const { battery, roof } = useConfiguratorStore();

  if (battery.count === 0) return null;

  const batteries = Array.from({ length: battery.count }, (_, i) => i);
  const startX = roof.width / 2 + 1.5;
  const spacing = BATTERY_SPECS.width + 0.3;

  return (
    <group>
      {batteries.map((index) => (
        <group key={index} position={[startX, 0, -1 + index * spacing]}>
          {/* Battery enclosure */}
          <mesh
            position={[0, BATTERY_SPECS.height / 2, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry
              args={[BATTERY_SPECS.depth, BATTERY_SPECS.height, BATTERY_SPECS.width]}
            />
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>

          {/* Front panel */}
          <mesh position={[-BATTERY_SPECS.depth / 2 - 0.001, BATTERY_SPECS.height / 2, 0]}>
            <planeGeometry args={[BATTERY_SPECS.height * 0.8, BATTERY_SPECS.width * 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.5} />
          </mesh>

          {/* LED indicator */}
          <mesh position={[-BATTERY_SPECS.depth / 2 - 0.01, BATTERY_SPECS.height * 0.8, 0]}>
            <circleGeometry args={[0.03, 16]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>

          {/* Capacity label */}
          <Text
            position={[-BATTERY_SPECS.depth / 2 - 0.01, BATTERY_SPECS.height * 0.3, 0]}
            fontSize={0.08}
            color="#64748b"
            anchorX="center"
            anchorY="middle"
          >
            {BATTERY_SPECS.capacityKwh} kWh
          </Text>

          {/* Wall mount bracket */}
          <mesh position={[BATTERY_SPECS.depth / 2 + 0.02, BATTERY_SPECS.height / 2, 0]}>
            <boxGeometry args={[0.04, BATTERY_SPECS.height * 0.6, BATTERY_SPECS.width * 0.3]} />
            <meshStandardMaterial color="#71717a" roughness={0.5} metalness={0.6} />
          </mesh>

          {/* Ground stand */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[BATTERY_SPECS.depth + 0.1, 0.1, BATTERY_SPECS.width + 0.1]} />
            <meshStandardMaterial color="#374151" roughness={0.6} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Total capacity sign */}
      {battery.count > 0 && (
        <group position={[startX + 0.5, BATTERY_SPECS.height + 0.3, (battery.count - 1) * spacing / 2 - 1]}>
          <Text
            fontSize={0.12}
            color="#1e293b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#ffffff"
          >
            {battery.count * BATTERY_SPECS.capacityKwh} kWh Storage
          </Text>
        </group>
      )}
    </group>
  );
};

export default BatteryUnit;
