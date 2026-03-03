import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine, type ISourceOptions } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEcoMode } from "../../hooks/useEcoMode";
import { usePerfFlag } from "../../hooks/usePerfFlag";

type SolarParticlesProps = {
  className?: string;
};

const SolarParticles: React.FC<SolarParticlesProps> = ({ className = "" }) => {
  const { ecoModeEnabled } = useEcoMode();
  const isLowPerf = usePerfFlag();
  const motionEnabled = !(ecoModeEnabled || isLowPerf);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!motionEnabled) return undefined;
    let cancelled = false;

    // Light-weight tsParticles field for mouse-reactive, solar-charged dust.
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [motionEnabled]);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: ["attract", "grab"] },
          onClick: { enable: true, mode: ["repulse", "push"] },
          resize: true,
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.28 } },
          attract: { distance: 160, duration: 0.35, factor: 0.9, speed: 1 },
          repulse: { distance: 220, duration: 0.4 },
          push: { quantity: 2 },
        },
      },
      particles: {
        color: { value: ["#003366", "#007bff", "#d4af37"] },
        links: { enable: true, distance: 140, color: "#007bff", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1.2, direction: "none", outModes: { default: "out" }, random: true },
        number: { density: { enable: true, area: 1100 }, value: 40 },
        opacity: { value: { min: 0.15, max: 0.45 } },
        size: { value: { min: 1, max: 3.2 } },
        wobble: { enable: true, distance: 4, speed: 10 },
        shadow: { enable: true, blur: 4, color: "#d4af37", offset: { x: 0, y: 0 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!motionEnabled || !ready) return null;

  return (
    <div className={className} aria-hidden>
      <Particles id="solara-solar-particles" options={options} className="h-full w-full" />
    </div>
  );
};

export default SolarParticles;
