import React from "react";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import type { PageFamily } from "@/app/pageFamilyConfig";

type PageFrameProps = {
  family?: PageFamily;
  width?: "narrow" | "default" | "wide" | "full";
  density?: "comfortable" | "compact" | "dense";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const widthClasses = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

const densityClasses = {
  comfortable: "space-y-10 pb-10 pt-0 sm:space-y-12 sm:pb-12 sm:pt-0",
  compact: "space-y-8 pb-8 pt-0 sm:space-y-10 sm:pb-10 sm:pt-0",
  dense: "space-y-6 pb-6 pt-0 sm:space-y-8 sm:pb-8 sm:pt-0",
};

const PageFrame: React.FC<PageFrameProps> = ({
  family,
  width = "wide",
  density = "comfortable",
  className,
  containerClassName,
  children,
}) => (
  <div className={cn("solara-page-frame", family && `solara-page-frame--${family}`, className)}>
    <SectionContainer
      className={cn(
        "solara-page-frame__container",
        widthClasses[width],
        densityClasses[density],
        containerClassName
      )}
    >
      {children}
    </SectionContainer>
  </div>
);

export default PageFrame;
