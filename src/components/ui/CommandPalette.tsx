import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { commandPaletteActions, getSectionLabel, CommandAction } from "../../data/commandPaletteActions";
import { useEcoMode } from "../../hooks/useEcoMode";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

const IconMap: Record<CommandAction["icon"], React.ReactNode> = {
  home: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  users: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  book: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  folder: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  zap: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  help: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  settings: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  search: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  sun: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { ecoModeEnabled } = useEcoMode();

  // Group and filter actions
  const { filtered, sections } = useMemo(() => {
    const lower = query.toLowerCase().trim();
    let results: CommandAction[];

    if (!lower) {
      results = commandPaletteActions;
    } else {
      results = commandPaletteActions.filter(
        (action) =>
          action.title.toLowerCase().includes(lower) ||
          action.description?.toLowerCase().includes(lower) ||
          action.keywords?.some((k) => k.toLowerCase().includes(lower))
      );
    }

    // Group by section
    const grouped = results.reduce(
      (acc, action) => {
        const section = action.section || "other";
        if (!acc[section]) acc[section] = [];
        acc[section].push(action);
        return acc;
      },
      {} as Record<string, CommandAction[]>
    );

    // Order sections
    const sectionOrder = ["navigation", "actions", "account", "learn"];
    const orderedSections = sectionOrder.filter((s) => grouped[s]?.length > 0);

    return {
      filtered: results,
      sections: orderedSections.map((s) => ({
        key: s,
        label: getSectionLabel(s as CommandAction["section"]),
        items: grouped[s],
      })),
    };
  }, [query]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    selectedEl?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const executeAction = (action: CommandAction) => {
    onClose();
    if (action.action) {
      action.action();
    } else if (action.to) {
      navigate(action.to);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[selectedIndex]) executeAction(filtered[selectedIndex]);
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Calculate flat index for an action
  const getFlatIndex = (sectionIdx: number, itemIdx: number): number => {
    let idx = 0;
    for (let i = 0; i < sectionIdx; i++) {
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...backdropAnimation}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm sm:pt-[18vh]"
          onClick={onClose}
        >
          <motion.div
            {...panelAnimation}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl dark:border-slate-700/50 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <span className="text-slate-400">{IconMap.search}</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, actions..."
                className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              />
              <kbd className="hidden rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800 sm:inline">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="text-slate-400">{IconMap.search}</div>
                  <p className="mt-2 text-sm text-slate-500">No results found for "{query}"</p>
                  <p className="mt-1 text-xs text-slate-400">Try a different search term</p>
                </div>
              ) : (
                sections.map((section, sectionIdx) => (
                  <div key={section.key} className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {section.label}
                    </div>
                    {section.items.map((action, itemIdx) => {
                      const flatIdx = getFlatIndex(sectionIdx, itemIdx);
                      const isSelected = flatIdx === selectedIndex;

                      return (
                        <button
                          key={action.id}
                          data-index={flatIdx}
                          onClick={() => executeAction(action)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isSelected
                              ? "bg-solara-blue/10 text-solara-blue dark:bg-solara-blue/20"
                              : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span
                            className={
                              isSelected ? "text-solara-blue" : "text-slate-400 dark:text-slate-500"
                            }
                          >
                            {IconMap[action.icon]}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="truncate text-sm font-medium">{action.title}</div>
                            {action.description && (
                              <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                                {action.description}
                              </div>
                            )}
                          </div>
                          {action.shortcut && (
                            <kbd className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:border-slate-600 dark:bg-slate-800">
                              {action.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2 text-xs text-slate-500 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 dark:border-slate-600 dark:bg-slate-800">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 dark:border-slate-600 dark:bg-slate-800">
                    ↵
                  </kbd>
                  Select
                </span>
              </div>
              <span className="hidden sm:inline">
                Press{" "}
                <kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 dark:border-slate-600 dark:bg-slate-800">
                  ⌘K
                </kbd>{" "}
                anywhere
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
