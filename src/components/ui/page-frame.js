import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
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
const PageFrame = ({ family, width = "wide", density = "comfortable", className, containerClassName, children, }) => (_jsx("div", { className: cn("solara-page-frame", family && `solara-page-frame--${family}`, className), children: _jsx(SectionContainer, { className: cn("solara-page-frame__container", widthClasses[width], densityClasses[density], containerClassName), children: children }) }));
export default PageFrame;
