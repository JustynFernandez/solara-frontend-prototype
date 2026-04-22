import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { helpers } from "@/data/helpers";
import { projects } from "@/data/projects";
import { navigatorQuestions } from "@/components/ui/solar-navigator-wizard";
const laneContent = {
    helpers: {
        id: "helpers",
        label: "Help now",
        badge: "Start here",
        title: "Find verified local help",
        body: "Open verified helpers by response speed, location, and skill.",
        ctaLabel: "Browse helpers",
        ctaTo: "/connect",
    },
    navigator: {
        id: "navigator",
        label: "Plan first",
        title: "Build a plan before you spend",
        body: "See the first planning questions before you open Navigator.",
        ctaLabel: "Run Navigator",
        ctaTo: "/solar-navigator",
    },
    projects: {
        id: "projects",
        label: "Join a build",
        title: "Open work already underway",
        body: "Open recruiting and in-progress projects with current volunteer demand.",
        ctaLabel: "Open projects",
        ctaTo: "/projects",
    },
};
const laneOrder = [laneContent.helpers, laneContent.navigator, laneContent.projects];
const availabilityRank = {
    available: 0,
    limited: 1,
    unavailable: 2,
};
const projectStatusRank = {
    Recruiting: 0,
    "In Progress": 1,
};
const previewMotion = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
};
const getInitials = (name) => name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
const HelperAvatar = ({ src, name }) => {
    const [imageFailed, setImageFailed] = React.useState(!src);
    React.useEffect(() => {
        setImageFailed(!src);
    }, [src]);
    return (_jsx("span", { className: "home-redesign__board-avatar-shell", "aria-hidden": "true", children: imageFailed ? (_jsx("span", { className: "home-redesign__board-avatar-fallback", children: getInitials(name) })) : (_jsx("img", { src: src, alt: "", className: "home-redesign__board-avatar", onError: () => setImageFailed(true) })) }));
};
const HomeOperatingBoard = () => {
    const prefersReducedMotion = useReducedMotion();
    const [activeLane, setActiveLane] = React.useState("helpers");
    const helpersPreview = React.useMemo(() => [...helpers]
        .filter((helper) => helper.verified)
        .sort((left, right) => {
        const availabilityDelta = availabilityRank[left.availabilityStatus] - availabilityRank[right.availabilityStatus];
        if (availabilityDelta !== 0)
            return availabilityDelta;
        return right.rating - left.rating;
    })
        .slice(0, 3)
        .map((helper) => ({
        id: helper.id,
        avatar: helper.avatar,
        name: helper.name,
        level: helper.level,
        location: helper.coarseLocationLabel,
        responseTime: helper.responseTimeLabel,
        skills: helper.skills.slice(0, 2),
    })), []);
    const navigatorPreview = React.useMemo(() => navigatorQuestions.slice(0, 3).map((question, index) => ({
        id: question.id,
        index: index + 1,
        prompt: question.prompt,
    })), []);
    const projectsPreview = React.useMemo(() => [...projects]
        .filter((project) => project.status === "Recruiting" || project.status === "In Progress")
        .sort((left, right) => {
        const statusDelta = (projectStatusRank[left.status] ?? 99) - (projectStatusRank[right.status] ?? 99);
        if (statusDelta !== 0)
            return statusDelta;
        const rightGap = right.goalVolunteers - right.currentVolunteers;
        const leftGap = left.goalVolunteers - left.currentVolunteers;
        return rightGap - leftGap;
    })
        .slice(0, 2)
        .map((project) => {
        const volunteerPercent = Math.min(100, Math.round((project.currentVolunteers / Math.max(project.goalVolunteers, 1)) * 100));
        return {
            id: project.id,
            name: project.name,
            location: project.location,
            status: project.status,
            tag: project.tags[0] ?? "",
            volunteerPercent,
            volunteerLabel: `${project.currentVolunteers}/${project.goalVolunteers} volunteers`,
        };
    }), []);
    const boardMetrics = React.useMemo(() => [
        {
            label: "Helpers online",
            value: String(helpers.filter((helper) => helper.verified && helper.availabilityStatus === "available").length),
        },
        {
            label: "Projects active",
            value: String(projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress").length),
        },
        {
            label: "Navigator flow",
            value: `${navigatorQuestions.length} steps`,
        },
    ], []);
    const active = laneContent[activeLane] ?? laneContent.helpers;
    return (_jsx("div", { className: "home-redesign__board", children: _jsxs("div", { className: "home-redesign__board-grid", children: [_jsx("div", { className: "home-redesign__board-rail", role: "tablist", "aria-label": "Live board lanes", children: laneOrder.map((lane) => (_jsxs("button", { type: "button", role: "tab", "aria-selected": activeLane === lane.id, "aria-controls": `home-live-board-${lane.id}`, className: `home-redesign__board-lane${activeLane === lane.id ? " is-active" : ""}`, onClick: () => setActiveLane(lane.id), children: [_jsxs("span", { className: "home-redesign__board-lane-meta", children: [_jsx("span", { className: "home-redesign__board-lane-label", children: lane.label }), lane.badge ? _jsx("span", { className: "home-redesign__board-lane-badge", children: lane.badge }) : null] }), _jsx("span", { className: "home-redesign__board-lane-title", children: lane.title }), _jsx("span", { className: "home-redesign__board-lane-body", children: lane.body }), _jsxs("span", { className: "home-redesign__board-lane-cta", children: [lane.ctaLabel, _jsx(ArrowRight, { className: "h-3.5 w-3.5" })] })] }, lane.id))) }), _jsx("div", { className: "home-redesign__board-shell", children: _jsxs("div", { className: "home-redesign__board-browser", children: [_jsx("div", { className: "home-redesign__board-browser-meta", children: boardMetrics.map((metric) => (_jsxs("div", { className: "home-redesign__board-metric", children: [_jsx("span", { className: "home-redesign__board-metric-label", children: metric.label }), _jsx("span", { className: "home-redesign__board-metric-value", children: metric.value })] }, metric.label))) }), _jsx("div", { className: "home-redesign__board-preview", id: `home-live-board-${activeLane}`, role: "tabpanel", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { className: "home-redesign__board-preview-pane", ...(prefersReducedMotion ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 }, transition: { duration: 0 } } : previewMotion), children: [activeLane === "helpers" ? (_jsxs("div", { className: "home-redesign__board-pane home-redesign__board-pane--helpers", children: [_jsxs("div", { className: "home-redesign__board-pane-header", children: [_jsxs("div", { children: [_jsx("p", { className: "home-redesign__board-pane-kicker", children: "Helpers lane" }), _jsx("p", { className: "home-redesign__board-pane-title", children: "Verified helpers available now" })] }), _jsxs(Link, { to: active.ctaTo, className: "home-redesign__board-pane-link", children: [active.ctaLabel, _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] })] }), _jsx("div", { className: "home-redesign__board-helper-list", children: helpersPreview.map((helper) => (_jsxs("div", { className: "home-redesign__board-helper-row", children: [_jsxs("div", { className: "home-redesign__board-helper-main", children: [_jsx(HelperAvatar, { src: helper.avatar, name: helper.name }), _jsxs("div", { className: "home-redesign__board-helper-copy", children: [_jsx("p", { className: "home-redesign__board-helper-name", children: helper.name }), _jsxs("p", { className: "home-redesign__board-helper-meta", children: [helper.level, " / ", helper.location] })] })] }), _jsxs("div", { className: "home-redesign__board-helper-side", children: [_jsx("p", { className: "home-redesign__board-helper-response", children: helper.responseTime }), _jsx("p", { className: "home-redesign__board-helper-skills", children: helper.skills.join(" / ") })] })] }, helper.id))) })] })) : null, activeLane === "navigator" ? (_jsxs("div", { className: "home-redesign__board-pane home-redesign__board-pane--navigator", children: [_jsxs("div", { className: "home-redesign__board-pane-header", children: [_jsxs("div", { children: [_jsx("p", { className: "home-redesign__board-pane-kicker", children: "Navigator lane" }), _jsx("p", { className: "home-redesign__board-pane-title", children: "First questions before you commit" })] }), _jsxs(Link, { to: active.ctaTo, className: "home-redesign__board-pane-link", children: [active.ctaLabel, _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] })] }), _jsxs("div", { className: "home-redesign__board-nav-progress", children: [_jsx("div", { className: "home-redesign__board-nav-progress-track", children: _jsx(motion.span, { className: "home-redesign__board-nav-progress-fill", initial: prefersReducedMotion ? false : { scaleX: 0 }, animate: { scaleX: 0.6 }, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }) }), _jsx("span", { className: "home-redesign__board-nav-progress-label", children: "3 / 5 complete" })] }), _jsx("div", { className: "home-redesign__board-nav-list", children: navigatorPreview.map((question) => (_jsxs("div", { className: "home-redesign__board-nav-row", children: [_jsxs("span", { className: "home-redesign__board-nav-index", children: ["0", question.index] }), _jsxs("div", { className: "home-redesign__board-nav-copy", children: [_jsx("p", { className: "home-redesign__board-nav-prompt", children: question.prompt }), _jsx("p", { className: "home-redesign__board-nav-meta", children: "Stored as part of your saved run" })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-[var(--home-accent-strong)]", "aria-hidden": "true" })] }, question.id))) }), _jsx("p", { className: "home-redesign__board-pane-footer", children: "Save and resume" })] })) : null, activeLane === "projects" ? (_jsxs("div", { className: "home-redesign__board-pane home-redesign__board-pane--projects", children: [_jsxs("div", { className: "home-redesign__board-pane-header", children: [_jsxs("div", { children: [_jsx("p", { className: "home-redesign__board-pane-kicker", children: "Projects lane" }), _jsx("p", { className: "home-redesign__board-pane-title", children: "Projects with open volunteer demand" })] }), _jsxs(Link, { to: active.ctaTo, className: "home-redesign__board-pane-link", children: [active.ctaLabel, _jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })] })] }), _jsx("div", { className: "home-redesign__board-project-list", children: projectsPreview.map((project) => (_jsxs("div", { className: "home-redesign__board-project-row", children: [_jsxs("div", { className: "home-redesign__board-project-main", children: [_jsx("p", { className: "home-redesign__board-project-name", children: project.name }), _jsxs("p", { className: "home-redesign__board-project-meta", children: [project.location, " / ", project.status, project.tag ? ` / ${project.tag}` : ""] })] }), _jsxs("div", { className: "home-redesign__board-project-progress", children: [_jsx("p", { className: "home-redesign__board-project-label", children: project.volunteerLabel }), _jsx("div", { className: "home-redesign__board-project-track", children: _jsx(motion.span, { className: "home-redesign__board-project-fill", initial: prefersReducedMotion ? false : { scaleX: 0 }, animate: { scaleX: project.volunteerPercent / 100 }, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }) })] })] }, project.id))) })] })) : null] }, activeLane) }) })] }) })] }) }));
};
export default HomeOperatingBoard;
