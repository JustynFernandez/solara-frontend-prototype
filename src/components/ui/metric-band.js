import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const MetricBand = ({ items, className, compact = false }) => (_jsx("div", { className: cn("solara-metric-band", compact && "solara-metric-band--compact", className), children: items.map((item) => (_jsxs("article", { className: "solara-metric-band__item", children: [_jsx("p", { className: "solara-metric-band__label", children: item.label }), _jsx("p", { className: "solara-metric-band__value", children: item.value }), item.meta ? _jsx("p", { className: "solara-metric-band__meta", children: item.meta }) : null] }, `${item.label}-${item.value}`))) }));
export default MetricBand;
