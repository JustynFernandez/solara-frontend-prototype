import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
const InlineAction = ({ to, href, children, emphasis = "default", className, }) => {
    const classes = cn("solara-inline-action", `solara-inline-action--${emphasis}`, className);
    if (to) {
        return (_jsx(Link, { to: to, className: classes, children: children }));
    }
    if (href) {
        return (_jsx("a", { href: href, className: classes, children: children }));
    }
    return _jsx("span", { className: classes, children: children });
};
export default InlineAction;
