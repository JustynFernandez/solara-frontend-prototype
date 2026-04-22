import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useSavedHelpersStore } from "../store/useSavedHelpersStore";
import { useLearnStore } from "../store/useLearnStore";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import DashboardHero from "../components/dashboard/DashboardHero";
import QuickActions from "../components/dashboard/QuickActions";
import SavedHelpersPreview from "../components/dashboard/SavedHelpersPreview";
import LearningProgress from "../components/dashboard/LearningProgress";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import Breadcrumbs from "../components/ui/Breadcrumbs";
const Dashboard = () => {
    const { user } = useAuth();
    const { savedHelpers } = useSavedHelpersStore();
    const { completedGuides, bookmarkedGuides, lastViewedGuide } = useLearnStore();
    if (!user) {
        return _jsx(Navigate, { to: "/sign-in", replace: true });
    }
    const profileCompleteness = calculateProfileCompleteness(user);
    return (_jsx(PageFrame, { family: "product", width: "wide", density: "compact", children: _jsxs("div", { className: "space-y-6", children: [_jsx(Breadcrumbs, { items: [{ label: "Dashboard" }], className: "mb-1" }), _jsx(PageReveal, { mode: "mount", children: _jsx(PageHeroStage, { family: "product", eyebrow: "Dashboard", title: `Welcome back${user.displayName ? `, ${user.displayName}` : ""}.`, body: "Keep track of saved helpers, learning progress, and the next actions that matter across Solara.", metrics: [
                            { label: "Saved helpers", value: savedHelpers.length, meta: "Contacts and matches you kept close." },
                            { label: "Completed guides", value: completedGuides.length, meta: "Learning progress already recorded." },
                            { label: "Bookmarked guides", value: bookmarkedGuides.length, meta: "Context you wanted to return to." },
                        ], preview: _jsx(DashboardHero, { user: user, profileCompleteness: profileCompleteness }) }) }), _jsx(PageReveal, { mode: "in-view", children: _jsx(QuickActions, {}) }), _jsx(PageReveal, { mode: "in-view", children: _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_0.4fr]", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(SavedHelpersPreview, { savedHelperIds: savedHelpers, maxDisplay: 3 }), _jsx(LearningProgress, { completedCount: completedGuides.length, bookmarkedCount: bookmarkedGuides.length, lastViewedGuide: lastViewedGuide })] }), _jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: _jsx(ActivityFeed, {}) })] }) })] }) }));
};
function calculateProfileCompleteness(user) {
    let completeness = 20;
    if (user.email)
        completeness += 20;
    if (user.displayName)
        completeness += 20;
    if (user.avatarUrl)
        completeness += 20;
    if (user.bio)
        completeness += 20;
    return Math.min(completeness, 100);
}
export default Dashboard;
