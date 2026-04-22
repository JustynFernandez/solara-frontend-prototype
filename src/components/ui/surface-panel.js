import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "@/lib/utils";
const SurfacePanel = React.forwardRef(({ as = "div", variant = "editorial", density = "comfortable", layout = "default", className, ...props }, ref) => {
    const Comp = as;
    return (_jsx(Comp, { ref: ref, className: cn("solara-surface-panel", `solara-surface-panel--${variant}`, `solara-surface-panel--${density}`, `solara-surface-panel--layout-${layout}`, className), ...props }));
});
SurfacePanel.displayName = "SurfacePanel";
export default SurfacePanel;
