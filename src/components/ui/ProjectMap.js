import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin as PinIcon } from "lucide-react";
import { statusPinClass } from "./MapPin";
import { useTheme } from "../../context/ThemeContext";
import { useEcoMode } from "../../hooks/useEcoMode";
import { usePerfFlag } from "../../hooks/usePerfFlag";
const ProjectMap = ({ projects, onSelect }) => {
    const { dark } = useTheme();
    const { ecoModeEnabled } = useEcoMode();
    const isLowPerf = usePerfFlag();
    const motionEnabled = !(ecoModeEnabled || isLowPerf);
    const defaultCenter = [51.5074, -0.1278]; // London focus
    const center = useMemo(() => projects.find((p) => p.location.toLowerCase().includes("london"))?.coordinates || projects[0]?.coordinates || defaultCenter, [projects]);
    const [viewState, setViewState] = useState({
        latitude: center[0],
        longitude: center[1],
        zoom: 10.8,
    });
    const [hoveredId, setHoveredId] = useState(null);
    const hoveredProject = useMemo(() => projects.find((project) => project.id === hoveredId), [hoveredId, projects]);
    const mapStyle = dark
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
    useEffect(() => {
        setViewState((prev) => ({
            ...prev,
            latitude: center[0],
            longitude: center[1],
        }));
    }, [center]);
    return (_jsxs("div", { className: "relative overflow-hidden rounded-[28px] card-surface p-3", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(14,207,138,0.08),transparent_36%),radial-gradient(circle_at_80%_12%,rgba(28,181,224,0.08),transparent_32%)]" }), _jsx("div", { className: "h-[420px] w-full overflow-hidden rounded-3xl border border-white/20 shadow-lg dark:border-white/10", children: _jsxs(Map, { ...viewState, mapLib: maplibregl, onMove: (evt) => setViewState(evt.viewState), mapStyle: mapStyle, scrollZoom: true, dragRotate: false, pitchWithRotate: false, className: "h-full w-full", style: { backgroundColor: dark ? "#0b1224" : "#f4f7fb" }, children: [_jsx(NavigationControl, { position: "bottom-right", showCompass: false }), projects.map((project) => {
                            const pinTone = statusPinClass[project.status];
                            const pulseClass = motionEnabled ? "motion-heavy animate-pulse-soft" : "";
                            return (_jsx(Marker, { longitude: project.coordinates[1], latitude: project.coordinates[0], anchor: "bottom", children: _jsxs("button", { type: "button", "aria-label": `Open ${project.name}`, onClick: () => onSelect(project.id), onMouseEnter: () => setHoveredId(project.id), onMouseLeave: () => setHoveredId((prev) => (prev === project.id ? null : prev)), onFocus: () => setHoveredId(project.id), onBlur: () => setHoveredId((prev) => (prev === project.id ? null : prev)), className: "group relative flex h-10 w-10 items-center justify-center focus:outline-none", children: [_jsx("span", { className: `absolute inset-0 rounded-full opacity-60 blur-md ${pinTone} ${pulseClass}` }), _jsx("span", { className: `relative flex h-9 w-9 items-center justify-center rounded-full ${pinTone} shadow-[0_10px_22px_rgba(0,0,0,0.25)] ring-1 ring-white/50 transition group-hover:scale-105 dark:ring-white/30`, children: _jsx(PinIcon, { className: "h-5 w-5 text-white" }) })] }) }, project.id));
                        }), hoveredProject && (_jsx(Popup, { longitude: hoveredProject.coordinates[1], latitude: hoveredProject.coordinates[0], anchor: "top", offset: 12, closeButton: false, closeOnClick: false, className: "solara-map-popup", children: _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-semibold", children: hoveredProject.name }), _jsx("p", { className: "text-xs opacity-80", children: hoveredProject.location }), _jsx("p", { className: "text-[11px] uppercase tracking-[0.16em] opacity-70", children: hoveredProject.status })] }) }))] }) })] }));
};
export default ProjectMap;
