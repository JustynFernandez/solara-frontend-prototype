import React from "react";
import { useEcoMode } from "../../hooks/useEcoMode";
import type { PageBackgroundVariant } from "@/app/pageFamilyConfig";

type PageBackgroundProps = {
  variant?: PageBackgroundVariant;
};

const PageBackground: React.FC<PageBackgroundProps> = ({ variant = "editorial-stage" }) => {
  const { ecoModeEnabled } = useEcoMode();
  const isImmersiveHome = variant === "home";
  const isDarkTheme = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 -z-50 ${isImmersiveHome ? "bg-page-home-v2" : `bg-page-family bg-page-family--${variant}`}`}
        aria-hidden="true"
      />
      {!ecoModeEnabled && isImmersiveHome ? <HomeGridSubstrate /> : null}
      {!ecoModeEnabled && !isImmersiveHome ? <FamilySubstrate variant={variant} /> : null}
      {!ecoModeEnabled && isImmersiveHome ? <FilmGrain variant="home" dark={isDarkTheme} /> : null}
      {!ecoModeEnabled && !isImmersiveHome ? <FilmGrain subtle /> : null}
      <EdgeFades
        hideTop={isImmersiveHome}
        variant={isImmersiveHome ? "home" : "family"}
        familyVariant={variant}
      />
    </>
  );
};

const HomeGridSubstrate: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-[41] overflow-hidden home-grid-substrate" aria-hidden="true" />
);

const FamilySubstrate: React.FC<{ variant: Exclude<PageBackgroundVariant, "home"> }> = ({ variant }) => (
  <div
    className={`pointer-events-none fixed inset-0 -z-[44] overflow-hidden page-family-substrate page-family-substrate--${variant}`}
    aria-hidden="true"
  />
);

const FilmGrain: React.FC<{ subtle?: boolean; variant?: "default" | "home"; dark?: boolean }> = ({
  subtle = false,
  variant = "default",
  dark = false,
}) => (
  <div className="pointer-events-none fixed inset-0 -z-[40] overflow-hidden" aria-hidden="true">
    <div
      className="calm-grain absolute inset-0"
      style={
        variant === "home"
          ? { opacity: dark ? 0.22 : 0.14 }
          : subtle
            ? { opacity: 0.2 }
            : undefined
      }
    />
  </div>
);

const EdgeFades: React.FC<{
  hideTop?: boolean;
  variant?: "default" | "home" | "family";
  familyVariant?: PageBackgroundVariant;
}> = ({
  hideTop: _hideTop = false,
  variant = "default",
  familyVariant = "editorial-stage",
}) => (
  <>
    <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-20 h-28" aria-hidden="true">
      <div
        className={
          variant === "home"
            ? "absolute inset-0 bg-gradient-to-t from-[rgba(242,246,251,0.48)] to-transparent dark:from-[rgba(12,16,21,0.54)] dark:to-transparent"
            : variant === "family"
              ? `absolute inset-0 bg-gradient-to-t ${familyVariant === "product-graphite" || familyVariant === "immersive-dark"
                  ? "from-[rgba(13,17,22,0.56)] to-transparent dark:from-[rgba(9,12,16,0.7)] dark:to-transparent"
                  : "from-[rgba(240,244,249,0.36)] to-transparent dark:from-[rgba(13,17,22,0.5)] dark:to-transparent"}`
            : "absolute inset-0 bg-gradient-to-t from-white/38 to-transparent dark:from-[rgba(12,16,21,0.44)] dark:to-transparent"
        }
      />
    </div>
  </>
);

export default PageBackground;
