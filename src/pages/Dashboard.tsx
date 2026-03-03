import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useSavedHelpersStore } from "../store/useSavedHelpersStore";
import { useLearnStore } from "../store/useLearnStore";
import SectionContainer from "../components/ui/section-container";
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

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Calculate profile completeness (mock logic)
  const profileCompleteness = calculateProfileCompleteness(user);

  return (
    <div className="relative min-h-screen pb-24">
      <SectionContainer className="relative space-y-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: "Dashboard" }]}
          className="mb-2"
        />

        {/* Hero section with greeting and profile */}
        <DashboardHero user={user} profileCompleteness={profileCompleteness} />

        {/* Quick actions grid */}
        <QuickActions />

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
          <div className="space-y-6">
            {/* Saved helpers preview */}
            <SavedHelpersPreview savedHelperIds={savedHelpers} maxDisplay={3} />

            {/* Learning progress */}
            <LearningProgress
              completedCount={completedGuides.length}
              bookmarkedCount={bookmarkedGuides.length}
              lastViewedGuide={lastViewedGuide}
            />
          </div>

          {/* Activity feed sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ActivityFeed />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

function calculateProfileCompleteness(user: { email: string; displayName?: string; avatarUrl?: string; bio?: string }): number {
  let completeness = 20; // Base for having an account

  if (user.email) completeness += 20;
  if (user.displayName) completeness += 20;
  if (user.avatarUrl) completeness += 20;
  if (user.bio) completeness += 20;

  return Math.min(completeness, 100);
}

export default Dashboard;
