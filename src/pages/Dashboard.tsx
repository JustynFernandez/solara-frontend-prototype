import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useSavedHelpersStore } from "../store/useSavedHelpersStore";
import { useLearnStore } from "../store/useLearnStore";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import SurfacePanel from "@/components/ui/surface-panel";
import DashboardHero from "../components/dashboard/DashboardHero";
import QuickActions from "../components/dashboard/QuickActions";
import SavedHelpersPreview from "../components/dashboard/SavedHelpersPreview";
import LearningProgress from "../components/dashboard/LearningProgress";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import Breadcrumbs from "../components/ui/Breadcrumbs";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { savedHelpers } = useSavedHelpersStore();
  const { completedGuides, bookmarkedGuides, lastViewedGuide } = useLearnStore();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  const profileCompleteness = calculateProfileCompleteness(user);

  return (
    <PageFrame family="product" width="wide" density="compact">
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Dashboard" }]} className="mb-1" />
        <PageReveal mode="mount">
          <PageHeroStage
            family="product"
            eyebrow="Dashboard"
            title={`Welcome back${user.displayName ? `, ${user.displayName}` : ""}.`}
            body="Keep track of saved helpers, learning progress, and the next actions that matter across Solara."
            metrics={[
              { label: "Saved helpers", value: savedHelpers.length, meta: "Contacts and matches you kept close." },
              { label: "Completed guides", value: completedGuides.length, meta: "Learning progress already recorded." },
              { label: "Bookmarked guides", value: bookmarkedGuides.length, meta: "Context you wanted to return to." },
            ]}
            preview={<DashboardHero user={user} profileCompleteness={profileCompleteness} />}
          />
        </PageReveal>

        <PageReveal mode="in-view">
          <QuickActions />
        </PageReveal>

        <PageReveal mode="in-view">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
          <div className="space-y-6">
            <SavedHelpersPreview savedHelperIds={savedHelpers} maxDisplay={3} />
            <LearningProgress
              completedCount={completedGuides.length}
              bookmarkedCount={bookmarkedGuides.length}
              lastViewedGuide={lastViewedGuide}
            />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ActivityFeed />
          </div>
          </div>
        </PageReveal>
      </div>
    </PageFrame>
  );
};

function calculateProfileCompleteness(user: { email: string; displayName?: string; avatarUrl?: string; bio?: string }): number {
  let completeness = 20;
  if (user.email) completeness += 20;
  if (user.displayName) completeness += 20;
  if (user.avatarUrl) completeness += 20;
  if (user.bio) completeness += 20;
  return Math.min(completeness, 100);
}

export default Dashboard;
