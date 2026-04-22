import { useCallback, useEffect, useState } from "react";
const DRAFT_KEY = "solara.navigatorDraft.v1";
const PLAN_KEY = "solara.solarPlan.v1";
const PROJECTS_KEY = "solara.projects.v1";
const REQUEST_HELP_KEY = "solara.requestHelpDraft.v1";
export const useNavigatorStorage = () => {
    const [draft, setDraft] = useState(null);
    useEffect(() => {
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (raw)
                setDraft(JSON.parse(raw));
        }
        catch {
            setDraft(null);
        }
    }, []);
    const saveDraft = useCallback((data) => {
        setDraft(data);
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    }, []);
    const clearDraft = useCallback(() => {
        setDraft(null);
        localStorage.removeItem(DRAFT_KEY);
    }, []);
    const savePlan = useCallback((plan) => {
        localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    }, []);
    const loadPlan = useCallback(() => {
        const raw = localStorage.getItem(PLAN_KEY);
        if (!raw)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }, []);
    const seedProject = useCallback((plan) => {
        const raw = localStorage.getItem(PROJECTS_KEY);
        const list = raw ? JSON.parse(raw) : [];
        const project = {
            id: `proj-${Date.now()}`,
            title: "Solar Navigator Plan",
            status: "planning",
            tasks: plan.seedTasks,
            createdAt: Date.now(),
        };
        const next = [project, ...list];
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(next));
        return project.id;
    }, []);
    const seedRequestHelp = useCallback(() => {
        localStorage.setItem(REQUEST_HELP_KEY, JSON.stringify({ source: "navigator-results", createdAt: Date.now() }));
    }, []);
    return { draft, saveDraft, clearDraft, savePlan, loadPlan, seedProject, seedRequestHelp };
};
