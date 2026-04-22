import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
const PROJECT_STATUS_RANK = {
    Recruiting: 0,
    "In Progress": 1,
};
const FEATURED_BUILD_MEDIA = {
    "brixton-rooftops": "/hero-community-neighborhood.jpg",
    "camden-coop": "/hero-community-team.jpg",
    "greenwich-garden": "/hero-community-solar-bg.jpg",
    default: "/hero-community-solar-install-poster.jpg",
};
const compactWholeNumber = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    maximumFractionDigits: 0,
});
const compactCurrency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    notation: "compact",
    maximumFractionDigits: 1,
});
const HomeFeaturedBuild = () => {
    const featuredProject = React.useMemo(() => {
        return [...projects]
            .filter((project) => project.status === "Recruiting" || project.status === "In Progress")
            .sort((left, right) => {
            const statusDelta = (PROJECT_STATUS_RANK[left.status] ?? 99) - (PROJECT_STATUS_RANK[right.status] ?? 99);
            if (statusDelta !== 0)
                return statusDelta;
            const volunteerGapDelta = (right.goalVolunteers - right.currentVolunteers) - (left.goalVolunteers - left.currentVolunteers);
            if (volunteerGapDelta !== 0)
                return volunteerGapDelta;
            return (right.impactEstimateKwhPerYear ?? 0) - (left.impactEstimateKwhPerYear ?? 0);
        })[0];
    }, []);
    const defaultMediaSrc = featuredProject ? FEATURED_BUILD_MEDIA[featuredProject.id] ?? FEATURED_BUILD_MEDIA.default : FEATURED_BUILD_MEDIA.default;
    const [mediaSrc, setMediaSrc] = React.useState(defaultMediaSrc);
    React.useEffect(() => {
        setMediaSrc(defaultMediaSrc);
    }, [defaultMediaSrc]);
    if (!featuredProject)
        return null;
    const currentNeed = featuredProject.tasks.find((task) => task.status === "todo") ??
        featuredProject.tasks.find((task) => task.status === "in-progress") ??
        featuredProject.tasks[0];
    const verifiedRoles = featuredProject.roles.filter((role) => role.verified).slice(0, 2);
    const taskSummary = featuredProject.tasks.reduce((summary, task) => {
        if (task.status === "done")
            summary.done += 1;
        if (task.status === "in-progress")
            summary.inProgress += 1;
        if (task.status === "todo")
            summary.todo += 1;
        return summary;
    }, { done: 0, inProgress: 0, todo: 0 });
    const volunteerPercent = Math.min(100, Math.round((featuredProject.currentVolunteers / featuredProject.goalVolunteers) * 100));
    const volunteerGap = Math.max(featuredProject.goalVolunteers - featuredProject.currentVolunteers, 0);
    const hasFunding = typeof featuredProject.goalFunding === "number" && typeof featuredProject.currentFunding === "number";
    const metricRows = [
        {
            label: "Volunteers",
            value: `${featuredProject.currentVolunteers}/${featuredProject.goalVolunteers}`,
            note: `${volunteerPercent}% committed`,
        },
        {
            label: "Projected output",
            value: `${compactWholeNumber.format(featuredProject.impactEstimateKwhPerYear ?? 0)} kWh`,
            note: featuredProject.impactEstimateTonsCO2PerYear
                ? `${featuredProject.impactEstimateTonsCO2PerYear}t CO2 avoided / year`
                : "Annual community energy impact",
        },
        hasFunding
            ? {
                label: "Funding",
                value: `${compactCurrency.format(featuredProject.currentFunding)} / ${compactCurrency.format(featuredProject.goalFunding)}`,
                note: "Current backing against target",
            }
            : {
                label: "Task progress",
                value: `${taskSummary.done} done / ${taskSummary.inProgress} active`,
                note: `${taskSummary.todo} tasks queued next`,
            },
    ];
    return (_jsx("section", { className: "home-redesign__build", children: _jsxs("div", { className: "home-redesign__build-grid", children: [_jsx("div", { className: "home-redesign__build-media", children: _jsxs("div", { className: "home-redesign__build-media-stage", children: [_jsx("img", { src: mediaSrc, alt: featuredProject.name, className: "home-redesign__build-image", loading: "eager", decoding: "async", onError: () => {
                                    if (mediaSrc !== FEATURED_BUILD_MEDIA.default) {
                                        setMediaSrc(FEATURED_BUILD_MEDIA.default);
                                    }
                                } }), _jsxs("div", { className: "home-redesign__build-media-rail", children: [_jsx("span", { children: featuredProject.status }), _jsx("span", { children: featuredProject.location }), featuredProject.tags[0] ? _jsx("span", { children: featuredProject.tags[0] }) : null] })] }) }), _jsxs("div", { className: "home-redesign__build-content", children: [_jsxs("div", { className: "home-redesign__build-intro", children: [_jsx("p", { className: "home-redesign__build-kicker", children: "Current build" }), _jsx("h2", { className: "home-redesign__build-title", children: featuredProject.name }), _jsxs("p", { className: "home-redesign__build-support", children: [featuredProject.status, " in ", featuredProject.location, featuredProject.tags[0] ? ` / ${featuredProject.tags[0]}` : ""] }), _jsx("p", { className: "home-redesign__build-project-desc", children: featuredProject.shortDescription })] }), _jsx("dl", { className: "home-redesign__build-metrics", children: metricRows.map((metric) => (_jsxs("div", { className: "home-redesign__build-metric", children: [_jsx("dt", { children: metric.label }), _jsx("dd", { children: metric.value }), _jsx("p", { children: metric.note })] }, metric.label))) }), _jsxs("div", { className: "home-redesign__build-need", children: [_jsx("p", { className: "home-redesign__build-need-label", children: "Current need now" }), _jsx("p", { className: "home-redesign__build-need-title", children: currentNeed?.title ?? "Confirm the next install milestone" }), _jsxs("p", { className: "home-redesign__build-need-copy", children: [volunteerGap > 0
                                            ? `${volunteerGap} more volunteer${volunteerGap === 1 ? "" : "s"} needed. `
                                            : "Volunteer target reached. ", taskSummary.inProgress > 0
                                            ? `${taskSummary.inProgress} task${taskSummary.inProgress === 1 ? "" : "s"} already moving. This is the next clear opening.`
                                            : "This is the next clear opening for local support."] })] }), _jsx("div", { className: "home-redesign__build-role-rail", children: verifiedRoles.map((role) => (_jsxs("div", { className: "home-redesign__build-role", children: [_jsx("p", { children: role.userName }), _jsx("span", { children: role.name })] }, role.id))) }), _jsxs("div", { className: "home-redesign__build-cta", children: [_jsxs(Link, { to: "/projects", className: "home-redesign__build-cta-primary", children: ["Open Projects", _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] }), _jsxs(Link, { to: "/connect", className: "home-redesign__build-cta-secondary", children: ["Find matching helpers", _jsx(ArrowRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" })] })] })] })] }) }));
};
export default HomeFeaturedBuild;
