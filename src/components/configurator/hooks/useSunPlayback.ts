import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useConfiguratorStore } from "./useConfiguratorStore";

export function useSunPlayback() {
  const { sun, sunPlayback, setSun } = useConfiguratorStore();
  const lastTimeRef = useRef(0);

  useFrame((state) => {
    if (!sunPlayback.isPlaying) {
      lastTimeRef.current = state.clock.elapsedTime;
      return;
    }

    const currentTime = state.clock.elapsedTime;
    const delta = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Calculate hour increment based on speed (hours per second)
    const hourIncrement = delta * sunPlayback.speed;
    let newHour = sun.hour + hourIncrement;

    // Loop between 5:00 and 21:00 (daylight hours)
    if (newHour > 21) {
      newHour = 5;
    }

    setSun({ hour: Math.round(newHour * 10) / 10 });
  });

  return {
    isPlaying: sunPlayback.isPlaying,
    speed: sunPlayback.speed,
    currentHour: sun.hour,
  };
}
