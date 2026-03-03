import React, { useMemo } from "react";
import * as THREE from "three";
import { useConfiguratorStore } from "../../hooks/useConfiguratorStore";

const HipRoof: React.FC = () => {
  const { roof } = useConfiguratorStore();
  const { width, depth, pitchAngle } = roof;

  const geometry = useMemo(() => {
    const pitchRad = (pitchAngle * Math.PI) / 180;
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    // Calculate ridge length - shorter than depth for hip roof
    const ridgeInset = halfWidth * Math.tan(pitchRad) > halfDepth
      ? halfDepth / Math.tan(pitchRad)
      : halfWidth;

    const roofHeight = ridgeInset * Math.tan(pitchRad);
    const ridgeHalfLength = Math.max(0, halfDepth - ridgeInset);

    // Vertices for hip roof
    // Base corners (clockwise from top-left when viewed from above)
    const bl = [-halfWidth, 0, -halfDepth]; // back-left
    const br = [halfWidth, 0, -halfDepth];  // back-right
    const fr = [halfWidth, 0, halfDepth];   // front-right
    const fl = [-halfWidth, 0, halfDepth];  // front-left

    // Ridge points
    const ridgeBack = [0, roofHeight, -ridgeHalfLength];
    const ridgeFront = [0, roofHeight, ridgeHalfLength];

    // Create triangles for each face
    const vertices: number[] = [];

    // Back face (triangle or trapezoid)
    if (ridgeHalfLength > 0) {
      // Trapezoid - two triangles
      vertices.push(...bl, ...br, ...ridgeBack);
      vertices.push(...ridgeBack, ...br, ...ridgeBack);
    } else {
      // Triangle
      vertices.push(...bl, ...br, ...ridgeBack);
    }

    // Front face
    if (ridgeHalfLength > 0) {
      vertices.push(...fr, ...fl, ...ridgeFront);
    } else {
      vertices.push(...fr, ...fl, ...ridgeFront);
    }

    // Left face (always triangle for hip roof peak, or trapezoid)
    vertices.push(...fl, ...bl, ...ridgeBack);
    vertices.push(...fl, ...ridgeBack, ...ridgeFront);

    // Right face
    vertices.push(...br, ...fr, ...ridgeFront);
    vertices.push(...br, ...ridgeFront, ...ridgeBack);

    // Top ridge (if exists)
    if (ridgeHalfLength > 0) {
      vertices.push(...ridgeBack, ...ridgeFront, ...ridgeFront);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geo.computeVertexNormals();

    return geo;
  }, [width, depth, pitchAngle]);

  // Calculate slope geometry for visual guides
  const slopeData = useMemo(() => {
    const pitchRad = (pitchAngle * Math.PI) / 180;
    const halfWidth = width / 2;
    const halfDepth = depth / 2;
    const ridgeInset = Math.min(halfWidth, halfDepth / Math.tan(pitchRad) || halfWidth);
    const roofHeight = ridgeInset * Math.tan(pitchRad);
    const slopeLength = Math.sqrt(ridgeInset * ridgeInset + roofHeight * roofHeight);

    return {
      roofHeight,
      slopeLength,
      pitchRad,
    };
  }, [width, depth, pitchAngle]);

  return (
    <group>
      {/* Main roof geometry */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle highlight planes for each face */}
      <mesh
        position={[-(width / 4), slopeData.roofHeight / 2 + 0.003, 0]}
        rotation={[0, 0, slopeData.pitchRad]}
      >
        <planeGeometry args={[slopeData.slopeLength - 0.2, depth - 0.3]} />
        <meshStandardMaterial
          color="#64748b"
          roughness={0.9}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        position={[(width / 4), slopeData.roofHeight / 2 + 0.003, 0]}
        rotation={[0, 0, -slopeData.pitchRad]}
      >
        <planeGeometry args={[slopeData.slopeLength - 0.2, depth - 0.3]} />
        <meshStandardMaterial
          color="#64748b"
          roughness={0.9}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default HipRoof;
