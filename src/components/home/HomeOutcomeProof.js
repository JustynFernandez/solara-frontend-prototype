import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { helpers } from "@/data/helpers";
import { projects } from "@/data/projects";
const PROJECT_STATUS_RANK = {
    Recruiting: 0,
    "In Progress": 1,
};
const HomeOutcomeProof = () => {
    const helpersAvailableNow = React.useMemo(() => helpers.filter((helper) => helper.verified && helper.availabilityStatus === "available").length, []);
    const activeProjects = React.useMemo(() => projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress"), []);
    const recruitingProjects = activeProjects.filter((project) => project.status === "Recruiting").length;
    const featuredProject = React.useMemo(() => {
        return [...activeProjects].sort((left, right) => {
            const statusDelta = (PROJECT_STATUS_RANK[left.status] ?? 99) - (PROJECT_STATUS_RANK[right.status] ?? 99);
            if (statusDelta !== 0)
                return statusDelta;
            const volunteerGapDelta = (right.goalVolunteers - right.currentVolunteers) - (left.goalVolunteers - left.currentVolunteers);
            if (volunteerGapDelta !== 0)
                return volunteerGapDelta;
            return (right.impactEstimateKwhPerYear ?? 0) - (left.impactEstimateKwhPerYear ?? 0);
        })[0];
    }, [activeProjects]);
    const currentNeed = featuredProject?.tasks.find((task) => task.status === "todo") ??
        featuredProject?.tasks.find((task) => task.status === "in-progress") ??
        featuredProject?.tasks[0];
    const volunteerGap = featuredProject
        ? Math.max(featuredProject.goalVolunteers - featuredProject.currentVolunteers, 0)
        : 0;
    const proofRows = [
        {
            label: "Helpers available now",
            value: `${helpersAvailableNow} verified`,
            detail: "Ready to respond without opening a request form first.",
        },
        {
            label: "Projects already recruiting or in progress",
            value: `${activeProjects.length} live`,
            detail: `${recruitingProjects} recruiting now.`,
        },
        {
            label: "Open spots on the featured build",
            value: volunteerGap > 0 ? `${volunteerGap} volunteer spots open` : "Volunteer target reached",
            detail: currentNeed?.title ?? "Next install milestone is already scoped.",
        },
    ];
    return (_jsx("section", { className: "home-redesign__outcome", children: _jsxs("div", { className: "home-redesign__outcome-grid", children: [_jsxs("div", { className: "home-redesign__outcome-intro", children: [_jsx("p", { className: "home-redesign__outcome-kicker", children: "Operational proof" }), _jsx("h2", { className: "home-redesign__outcome-title", children: "Local help and real project work are already live." }), _jsx("p", { className: "home-redesign__outcome-copy", children: "Helpers are available now, projects are moving, and the planning flow is ready when you need it." }), _jsx("div", { className: "home-redesign__outcome-links", children: _jsxs(Link, { to: "/connect", className: "home-redesign__outcome-cta-primary", children: ["Open Connect", _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] }) })] }), _jsx("dl", { className: "home-redesign__outcome-list", children: proofRows.map((row) => (_jsxs("div", { className: "home-redesign__outcome-row", children: [_jsx("dt", { className: "home-redesign__outcome-label", children: row.label }), _jsx("dd", { className: "home-redesign__outcome-value", children: row.value }), _jsx("p", { className: "home-redesign__outcome-detail", children: row.detail })] }, row.label))) })] }) }));
};
export default HomeOutcomeProof;
