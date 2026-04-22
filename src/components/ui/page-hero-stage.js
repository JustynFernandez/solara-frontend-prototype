import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageIntro from "@/components/ui/page-intro";
import SurfacePanel from "@/components/ui/surface-panel";
import MetricBand from "@/components/ui/metric-band";
import { cn } from "@/lib/utils";
const introVariantMap = {
    editorial: "editorial",
    hub: "hub",
    product: "product",
    guide: "quiet",
    account: "quiet",
};
const panelVariantMap = {
    editorial: "editorial",
    hub: "editorial",
    product: "product",
    guide: "guide",
    account: "account",
};
const PageHeroStage = ({ family = "editorial", eyebrow, title, body, meta, actions, metrics, preview, rail, className, previewClassName, children, }) => (_jsxs(SurfacePanel, { variant: panelVariantMap[family], layout: "hero", density: "comfortable", className: cn("solara-page-hero-stage", `solara-page-hero-stage--${family}`, className), children: [_jsxs("div", { className: cn("solara-page-hero-stage__main", preview && "solara-page-hero-stage__main--with-preview"), children: [_jsxs("div", { className: "solara-page-hero-stage__copy", children: [_jsx(PageIntro, { eyebrow: eyebrow, title: title, body: body, meta: meta, actions: actions, variant: introVariantMap[family], layout: preview ? "split" : "hero", className: "max-w-none border-t-0 pt-0" }), children ? _jsx("div", { className: "solara-page-hero-stage__detail", children: children }) : null] }), preview ? _jsx("div", { className: cn("solara-page-hero-stage__preview", previewClassName), children: preview }) : null] }), metrics?.length ? _jsx(MetricBand, { items: metrics, className: "solara-page-hero-stage__metrics" }) : null, rail ? _jsx("div", { className: "solara-page-hero-stage__rail", children: rail }) : null] }));
export default PageHeroStage;
