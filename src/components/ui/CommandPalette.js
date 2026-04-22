import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { commandPaletteActions, getSectionLabel } from "../../data/commandPaletteActions";
import { useEcoMode } from "../../hooks/useEcoMode";
const IconMap = {
    home: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), _jsx("polyline", { points: "9 22 9 12 15 12 15 22" })] })),
    users: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] })),
    book: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), _jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })] })),
    folder: (_jsx("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" }) })),
    zap: (_jsx("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) })),
    help: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }), _jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })] })),
    settings: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "3" }), _jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })] })),
    search: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] })),
    sun: (_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "5" }), _jsx("line", { x1: "12", y1: "1", x2: "12", y2: "3" }), _jsx("line", { x1: "12", y1: "21", x2: "12", y2: "23" }), _jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }), _jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }), _jsx("line", { x1: "1", y1: "12", x2: "3", y2: "12" }), _jsx("line", { x1: "21", y1: "12", x2: "23", y2: "12" }), _jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }), _jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })] })),
};
const CommandPalette = ({ open, onClose }) => {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();
    const { ecoModeEnabled } = useEcoMode();
    const { filtered, sections } = useMemo(() => {
        const lower = query.toLowerCase().trim();
        const results = lower.length === 0
            ? commandPaletteActions
            : commandPaletteActions.filter((action) => action.title.toLowerCase().includes(lower) ||
                action.description?.toLowerCase().includes(lower) ||
                action.keywords?.some((keyword) => keyword.toLowerCase().includes(lower)));
        const grouped = results.reduce((acc, action) => {
            const section = action.section || "other";
            if (!acc[section])
                acc[section] = [];
            acc[section].push(action);
            return acc;
        }, {});
        const sectionOrder = ["navigation", "actions", "account", "learn"];
        const orderedSections = sectionOrder.filter((section) => grouped[section]?.length > 0);
        return {
            filtered: results,
            sections: orderedSections.map((section) => ({
                key: section,
                label: getSectionLabel(section),
                items: grouped[section],
            })),
        };
    }, [query]);
    useEffect(() => {
        if (open) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);
    useEffect(() => {
        const selectedEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
        selectedEl?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);
    const executeAction = (action) => {
        onClose();
        if (action.action) {
            action.action();
        }
        else if (action.to) {
            navigate(action.to);
        }
    };
    const handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((index) => Math.min(index + 1, filtered.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((index) => Math.max(index - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (filtered[selectedIndex])
                    executeAction(filtered[selectedIndex]);
                break;
            case "Escape":
                e.preventDefault();
                onClose();
                break;
        }
    };
    const getFlatIndex = (sectionIdx, itemIdx) => {
        let idx = 0;
        for (let i = 0; i < sectionIdx; i += 1) {
            idx += sections[i].items.length;
        }
        return idx + itemIdx;
    };
    const backdropAnimation = ecoModeEnabled
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.15 },
        };
    const panelAnimation = ecoModeEnabled
        ? {}
        : {
            initial: { opacity: 0, scale: 0.95, y: -10 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: -10 },
            transition: { duration: 0.15 },
        };
    return (_jsx(AnimatePresence, { children: open && (_jsx(motion.div, { ...backdropAnimation, className: "fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm sm:pt-[18vh]", onClick: onClose, children: _jsxs(motion.div, { ...panelAnimation, className: "solara-command-palette w-full max-w-xl overflow-hidden rounded-xl border shadow-2xl", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "solara-command-palette__search flex items-center gap-3 border-b px-4 py-3", children: [_jsx("span", { className: "solara-command-palette__icon", children: IconMap.search }), _jsx("input", { ref: inputRef, type: "text", value: query, onChange: (e) => setQuery(e.target.value), onKeyDown: handleKeyDown, placeholder: "Search pages, actions...", className: "flex-1 bg-transparent text-sm outline-none" }), _jsx("kbd", { className: "solara-command-palette__kbd hidden rounded-md border px-2 py-1 text-xs sm:inline", children: "ESC" })] }), _jsx("div", { ref: listRef, className: "max-h-80 overflow-y-auto p-2", children: filtered.length === 0 ? (_jsxs("div", { className: "py-12 text-center", children: [_jsx("div", { className: "solara-command-palette__icon", children: IconMap.search }), _jsxs("p", { className: "mt-2 text-sm", children: ["No results found for \"", query, "\""] }), _jsx("p", { className: "mt-1 text-xs", children: "Try a different search term" })] })) : (sections.map((section, sectionIdx) => (_jsxs("div", { className: "mb-2", children: [_jsx("div", { className: "solara-command-palette__section px-3 py-2 text-xs font-semibold uppercase tracking-wider", children: section.label }), section.items.map((action, itemIdx) => {
                                    const flatIdx = getFlatIndex(sectionIdx, itemIdx);
                                    const isSelected = flatIdx === selectedIndex;
                                    return (_jsxs("button", { "data-index": flatIdx, onClick: () => executeAction(action), className: `solara-command-palette__item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${isSelected ? "is-selected" : ""}`, children: [_jsx("span", { className: "solara-command-palette__icon", children: IconMap[action.icon] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "truncate text-sm font-medium", children: action.title }), action.description ? (_jsx("div", { className: "solara-command-palette__description truncate text-xs", children: action.description })) : null] }), action.shortcut ? (_jsx("kbd", { className: "solara-command-palette__kbd rounded-md border px-2 py-1 text-xs", children: action.shortcut })) : null] }, action.id));
                                })] }, section.key)))) }), _jsxs("div", { className: "solara-command-palette__footer flex items-center justify-between border-t px-4 py-2 text-xs", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("kbd", { className: "solara-command-palette__kbd rounded border px-1.5 py-0.5", children: "Up/Down" }), "Navigate"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx("kbd", { className: "solara-command-palette__kbd rounded border px-1.5 py-0.5", children: "Enter" }), "Select"] })] }), _jsxs("span", { className: "hidden sm:inline", children: ["Press ", _jsx("kbd", { className: "solara-command-palette__kbd rounded border px-1.5 py-0.5", children: "Cmd+K" }), " anywhere"] })] })] }) })) }));
};
export default CommandPalette;
