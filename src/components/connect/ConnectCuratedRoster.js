import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import HelperAvatar from "./HelperAvatar";
const levelLabel = {
    community: "Community volunteer",
    trained: "Trained volunteer",
    certified: "Certified installer",
};
const getSpecialtyLine = (helper) => helper.skills.slice(0, 2).join(" / ");
const ConnectCuratedRoster = ({ helpers }) => {
    const [lead, ...supporting] = helpers;
    if (!lead)
        return null;
    return (_jsxs("section", { className: "solara-connect-roster", children: [_jsxs("article", { className: "solara-connect-roster__lead", children: [_jsx("p", { className: "solara-connect-roster__cardlabel", children: "Lead availability" }), _jsxs("div", { className: "solara-connect-roster__lead-top", children: [_jsx(HelperAvatar, { name: lead.name, src: lead.avatar, className: "solara-connect-roster__lead-avatar" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("h3", { className: "solara-connect-roster__name", children: lead.name }), lead.verified ? _jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-[var(--solara-accent)]", "aria-label": "Verified helper" }) : null] }), _jsx("p", { className: "solara-connect-roster__level", children: levelLabel[lead.level] })] })] }), _jsxs("div", { className: "solara-connect-roster__details", children: [_jsx("p", { children: lead.coarseLocationLabel }), _jsx("p", { children: lead.responseTimeLabel }), _jsx("p", { children: getSpecialtyLine(lead) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "solara-connect-roster__specialty", children: getSpecialtyLine(lead) }), _jsx(Link, { to: `/connect/helpers?helperId=${lead.id}`, className: "solara-inline-action solara-inline-action--strong", children: "View helper" })] })] }), _jsx("div", { className: "solara-connect-roster__supporting", children: supporting.map((helper) => (_jsxs("article", { className: "solara-connect-roster__supporting-row", children: [_jsxs("div", { className: "solara-connect-roster__supporting-identity", children: [_jsx(HelperAvatar, { name: helper.name, src: helper.avatar, className: "solara-connect-roster__supporting-avatar" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("p", { className: "solara-connect-roster__name", children: helper.name }), helper.verified ? _jsx(ShieldCheck, { className: "h-3 w-3 text-[var(--solara-accent)]", "aria-label": "Verified helper" }) : null] }), _jsx("p", { className: "solara-connect-roster__level", children: levelLabel[helper.level] })] })] }), _jsxs("div", { className: "solara-connect-roster__supporting-proof", children: [_jsx("p", { children: helper.coarseLocationLabel }), _jsx("p", { children: helper.responseTimeLabel }), _jsx("p", { children: helper.skills[0] })] }), _jsx(Link, { to: `/connect/helpers?helperId=${helper.id}`, className: "solara-inline-action solara-inline-action--default", children: "View helper" })] }, helper.id))) })] }));
};
export default ConnectCuratedRoster;
