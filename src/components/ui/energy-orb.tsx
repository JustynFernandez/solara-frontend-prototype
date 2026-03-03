import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Trail } from "@react-three/drei";
import { useEcoMode } from "../../hooks/useEcoMode";
import { usePerfFlag } from "../../hooks/usePerfFlag";

type EnergyOrbProps = {
  className?: string;
};

const EnergyOrb: React.FC<EnergyOrbProps> = ({ className = "" }) => {
  const { ecoModeEnabled } = useEcoMode();
  const isLowPerf = usePerfFlag();
  const accent = useMemo(() => ["#007bff", "#003366", "#d4af3780"][Math.floor(Math.random() * 3)], []);

  if (ecoModeEnabled || isLowPerf) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {/* Bio-luminescent 3D orb that adds depth without blocking input; removed automatically in eco mode. */}
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.6]} camera={{ position: [0, 0, 4], fov: 42 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={1} />
        <pointLight position={[2, 3, 2]} intensity={1.2} color="#e0fff2" />
        <pointLight position={[-3, -2, -2]} intensity={0.6} color="#9de6ff" />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.8} floatIntensity={1.3}>
            <Sphere args={[1.15, 48, 48]}>
              <MeshDistortMaterial
                color={accent}
                emissive={accent}
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={0.08}
                distort={0.25}
                speed={2.6}
              />
            </Sphere>
          </Float>

          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
            <Trail
              width={0.32}
              color={accent}
              length={5.5}
              attenuation={(value) => value * 0.25}
            >
              <Sphere args={[0.08, 32, 32]} position={[1.4, -0.6, 0]}>
                <meshStandardMaterial color="#ffffff" emissive={accent} emissiveIntensity={1.1} />
              </Sphere>
            </Trail>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EnergyOrb;
