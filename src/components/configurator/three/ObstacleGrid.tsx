import React, { useCallback } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useConfiguratorStore, type Obstacle } from "../hooks/useConfiguratorStore";
import { OBSTACLE_SPECS } from "../../../data/configuratorDefaults";
import Chimney from "./obstacles/Chimney";
import Skylight from "./obstacles/Skylight";
import Vent from "./obstacles/Vent";

function generateObstacleId(): string {
  return `obstacle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const ObstacleGrid: React.FC = () => {
  const {
    obstacles,
    roof,
    toolMode,
    obstacleType,
    addObstacle,
    removeObstacle,
  } = useConfiguratorStore();

  const isRemoveMode = toolMode === "remove";
  const isObstacleMode = toolMode === "obstacle";

  const handleRoofClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (!isObstacleMode) return;

      e.stopPropagation();
      const point = e.point;

      const spec = OBSTACLE_SPECS[obstacleType];
      const halfWidth = roof.width / 2;
      const halfDepth = roof.depth / 2;

      // Check bounds
      const inBounds =
        Math.abs(point.x) + spec.width / 2 <= halfWidth - 0.2 &&
        Math.abs(point.z) + spec.depth / 2 <= halfDepth - 0.2;

      if (!inBounds) return;

      // Check overlap with existing obstacles
      const hasOverlap = obstacles.some((obs) => {
        const obsSpec = OBSTACLE_SPECS[obs.type];
        const dx = Math.abs(obs.position[0] - point.x);
        const dz = Math.abs(obs.position[2] - point.z);
        return (
          dx < (spec.width + obsSpec.width) / 2 + 0.2 &&
          dz < (spec.depth + obsSpec.depth) / 2 + 0.2
        );
      });

      if (hasOverlap) return;

      const newObstacle: Obstacle = {
        id: generateObstacleId(),
        type: obstacleType,
        position: [point.x, point.y, point.z],
        rotation: [0, 0, 0],
      };

      addObstacle(newObstacle);
    },
    [isObstacleMode, obstacleType, roof, obstacles, addObstacle]
  );

  const handleObstacleClick = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isRemoveMode) {
        removeObstacle(id);
      }
    },
    [isRemoveMode, removeObstacle]
  );

  // Create clickable surface for obstacle placement
  const clickableSurface = (
    <mesh
      position={[0, roof.type === "flat" ? 0.16 : 0.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={handleRoofClick}
      visible={false}
    >
      <planeGeometry args={[roof.width, roof.depth]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );

  const ObstacleComponent = {
    chimney: Chimney,
    skylight: Skylight,
    vent: Vent,
  };

  return (
    <group>
      {isObstacleMode && clickableSurface}

      {obstacles.map((obstacle) => {
        const Component = ObstacleComponent[obstacle.type];
        return (
          <Component
            key={obstacle.id}
            position={obstacle.position}
            rotation={obstacle.rotation}
            onClick={handleObstacleClick(obstacle.id)}
            isRemoveMode={isRemoveMode}
          />
        );
      })}
    </group>
  );
};

export default ObstacleGrid;
