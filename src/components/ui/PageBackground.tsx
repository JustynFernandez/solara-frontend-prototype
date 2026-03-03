import React from "react";
import { useLocation } from "react-router-dom";
import { useEcoMode } from "../../hooks/useEcoMode";

type ThemeMood = "ocean" | "dawn" | "nightfall";
type GlowPlacement = "left" | "right" | "center";
type VeilDepth = "soft" | "medium";

type PageTheme = {
  baseClass: string;
  mood: ThemeMood;
  glow: GlowPlacement;
  depth: VeilDepth;
};

const pageThemes: Record<string, PageTheme> = {
  home: { baseClass: "bg-page-home-v2", mood: "ocean", glow: "left", depth: "soft" },
  connect: { baseClass: "bg-page-connect-v2", mood: "ocean", glow: "right", depth: "medium" },
  services: { baseClass: "bg-page-services-v2", mood: "dawn", glow: "right", depth: "soft" },
  projects: { baseClass: "bg-page-projects-v2", mood: "ocean", glow: "left", depth: "medium" },
  learn: { baseClass: "bg-page-learn-v2", mood: "dawn", glow: "center", depth: "soft" },
  plan: { baseClass: "bg-page-plan-v2", mood: "nightfall", glow: "right", depth: "medium" },
  dashboard: { baseClass: "bg-page-dashboard-v2", mood: "ocean", glow: "left", depth: "soft" },
};

const defaultTheme: PageTheme = {
  baseClass: "bg-page-base",
  mood: "ocean",
  glow: "right",
  depth: "soft",
};

const PageBackground: React.FC = () => {
  const location = useLocation();
  const { ecoModeEnabled } = useEcoMode();
  const pathSegment = location.pathname.split("/")[1] || "home";
  const theme = pageThemes[pathSegment] || defaultTheme;

  return (
    <>
      <div className={`pointer-events-none fixed inset-0 -z-50 ${theme.baseClass}`} aria-hidden="true" />
      {!ecoModeEnabled && (
        <>
          <SkyBands mood={theme.mood} />
          <GlassVeils mood={theme.mood} depth={theme.depth} />
          <GlowOrb mood={theme.mood} placement={theme.glow} />
          <FilmGrain />
        </>
      )}
      <EdgeFades />
    </>
  );
};

const SkyBands: React.FC<{ mood: ThemeMood }> = ({ mood }) => (
  <div className="pointer-events-none fixed inset-0 -z-[46] overflow-hidden" aria-hidden="true">
    <div className={`calm-band calm-band--${mood} absolute -left-[18%] -top-[12%] h-[44vh] w-[74vw] animate-calm-drift`} />
    <div className={`calm-band calm-band--${mood}-alt absolute -right-[16%] top-[8%] h-[38vh] w-[66vw] animate-calm-drift-delayed`} />
  </div>
);

const GlassVeils: React.FC<{ mood: ThemeMood; depth: VeilDepth }> = ({ mood, depth }) => (
  <div className="pointer-events-none fixed inset-0 -z-[44] overflow-hidden" aria-hidden="true">
    <div className={`calm-veil calm-veil--${depth} calm-veil--${mood} absolute -bottom-[18%] left-[-10%] h-[62vh] w-[124vw]`} />
    <div className={`calm-veil calm-veil--${depth} calm-veil--${mood}-alt absolute -bottom-[30%] right-[-8%] h-[58vh] w-[116vw] animate-calm-rise`} />
  </div>
);

const GlowOrb: React.FC<{ mood: ThemeMood; placement: GlowPlacement }> = ({ mood, placement }) => {
  const placementClass =
    placement === "left" ? "left-[8%] top-[12%]" : placement === "center" ? "left-[44%] top-[10%]" : "right-[8%] top-[12%]";

  return (
    <div className="pointer-events-none fixed inset-0 -z-[42] overflow-hidden" aria-hidden="true">
      <div className={`calm-orb calm-orb--${mood} absolute ${placementClass} h-[24vh] w-[24vh] min-h-[180px] min-w-[180px]`} />
    </div>
  );
};

const FilmGrain: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-[40] overflow-hidden" aria-hidden="true">
    <div className="calm-grain absolute inset-0" />
  </div>
);

const EdgeFades: React.FC = () => (
  <>
    <div className="pointer-events-none fixed inset-x-0 top-0 -z-20 h-40" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-white/44 via-white/14 to-transparent dark:from-[#07101f]/48 dark:via-[#07101f]/14 dark:to-transparent" />
    </div>
    <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-20 h-28" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-t from-white/38 to-transparent dark:from-[#07101f]/44 dark:to-transparent" />
    </div>
  </>
);

export default PageBackground;
