import { useMemo } from "react";
import { getDayOfYear } from "../../../data/configuratorDefaults";

export interface SunPosition {
  altitude: number;
  azimuth: number;
  x: number;
  y: number;
  z: number;
  intensity: number;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function calculateSunPosition(
  hour: number,
  dayOfYear: number,
  latitude: number
): SunPosition {
  const latRad = toRadians(latitude);

  const declination =
    23.45 * Math.sin(toRadians((360 / 365) * (dayOfYear - 81)));
  const decRad = toRadians(declination);

  const solarNoon = 12;
  const hourAngle = (hour - solarNoon) * 15;
  const hourRad = toRadians(hourAngle);

  const sinAlt =
    Math.sin(latRad) * Math.sin(decRad) +
    Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourRad);
  const altitude = toDegrees(Math.asin(Math.max(-1, Math.min(1, sinAlt))));

  let azimuth = 180;
  if (altitude > -0.5) {
    const cosAz =
      (Math.sin(decRad) - Math.sin(latRad) * sinAlt) /
      (Math.cos(latRad) * Math.cos(toRadians(altitude)));
    const az = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosAz))));
    azimuth = hour < 12 ? az : 360 - az;
  }

  const distance = 15;
  const altRad = toRadians(Math.max(0, altitude));
  const azRad = toRadians(azimuth);

  const x = distance * Math.cos(altRad) * Math.sin(azRad);
  const y = distance * Math.sin(altRad);
  const z = distance * Math.cos(altRad) * Math.cos(azRad);

  const intensity = altitude > 0 ? Math.min(1, altitude / 45) * 1.2 + 0.3 : 0.1;

  return {
    altitude,
    azimuth,
    x,
    y,
    z,
    intensity,
  };
}

export function useSunPosition(
  hour: number,
  month: number,
  latitude: number = 51.5
): SunPosition {
  return useMemo(() => {
    const dayOfYear = getDayOfYear(month);
    return calculateSunPosition(hour, dayOfYear, latitude);
  }, [hour, month, latitude]);
}
