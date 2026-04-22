import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ConfiguratorShell from "../components/configurator/ConfiguratorShell";
import ConfiguratorCanvas from "../components/configurator/ConfiguratorCanvas";
import ConfiguratorControls from "../components/configurator/ConfiguratorControls";
import ConfiguratorPanel from "../components/configurator/ConfiguratorPanel";
const SolarConfigurator = () => {
    return (_jsxs(ConfiguratorShell, { children: [_jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-4 lg:flex-row", children: [_jsx("aside", { className: "w-full shrink-0 lg:w-72", children: _jsx(ConfiguratorControls, {}) }), _jsx("main", { className: "flex min-h-[420px] flex-1 overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] shadow-[var(--solara-shadow-strong)] lg:min-h-0", children: _jsx(ConfiguratorCanvas, {}) }), _jsx("aside", { className: "w-full shrink-0 lg:w-80", children: _jsx(ConfiguratorPanel, {}) })] }), _jsx("footer", { className: "mt-2 text-center text-xs text-[var(--solara-text-muted)]", children: _jsx("p", { children: "Drag to rotate view / Scroll to zoom / Use controls to configure your solar setup" }) })] }));
};
export default SolarConfigurator;
