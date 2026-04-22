import React from "react";
import { cn } from "@/lib/utils";

type SurfacePanelProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article";
  variant?: "editorial" | "product" | "account" | "guide";
  density?: "comfortable" | "compact" | "dense";
  layout?: "default" | "hero" | "split" | "preview" | "rail" | "closeout";
};

const SurfacePanel = React.forwardRef<HTMLElement, SurfacePanelProps>(
  (
    {
      as = "div",
      variant = "editorial",
      density = "comfortable",
      layout = "default",
      className,
      ...props
    },
    ref
  ) => {
    const Comp = as as keyof JSX.IntrinsicElements;
    return (
      <Comp
        ref={ref as any}
        className={cn(
          "solara-surface-panel",
          `solara-surface-panel--${variant}`,
          `solara-surface-panel--${density}`,
          `solara-surface-panel--layout-${layout}`,
          className
        )}
        {...props}
      />
    );
  }
);

SurfacePanel.displayName = "SurfacePanel";

export default SurfacePanel;
