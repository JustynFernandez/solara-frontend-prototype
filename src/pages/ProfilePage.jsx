import React from "react";
import { Link, useParams } from "react-router-dom";
import { helpers, mockUser } from "../data/mockData";
import SkillIcon, { skillDetails } from "../components/shared/SkillIcon";
import TooltipCard from "../components/shared/TooltipCard";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageIntro from "@/components/ui/page-intro";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";

const statCard = (label, value) => (
  <div className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-4 shadow-sm">
    <p className="text-xs uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]">{label}</p>
    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const ProfilePage = () => {
  const { id } = useParams();
  const profile = helpers.find((helper) => helper.id === id) || mockUser;
  const profileSignals = [
    {
      eyebrow: "Support fit",
      title: profile.availability || "Flexible schedule",
      body: "Availability and response rhythm help projects decide whether this is the right first contact.",
    },
    {
      eyebrow: "Strengths",
      title: `${profile.skills?.length || 0} skills visible`,
      body: "Shared skills, resources, and tags make the helper legible before a request starts.",
    },
  ];

  return (
    <PageFrame family="product" width="wide" density="compact" className="min-h-screen">
      <PageReveal mode="mount" className="space-y-8">
        <PageHeroStage
          family="product"
          eyebrow="Helper profile"
          title={profile.name}
          body={profile.location}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <InlineAction to="/request-help" emphasis="strong">Request help</InlineAction>
              <InlineAction to="/connect">Back to helpers</InlineAction>
            </div>
          }
          metrics={[
            { label: "Rating", value: profile.rating?.toFixed(1) ?? "4.8", meta: "Community feedback and fit." },
            { label: "Availability", value: profile.availability || "Flexible", meta: "Current working rhythm." },
            { label: "Activity", value: profile.activityScore ? `${profile.activityScore}%` : "90%", meta: "Recent engagement across Solara." },
          ]}
          preview={
            <PreviewFrame
              chromeLabel="Profile card"
              eyebrow="At a glance"
              title="What people see before they open the full detail."
              body="Role, location, and skills should be legible in seconds."
            >
              <div className="flex items-start gap-4">
                <img src={profile.photo} alt={profile.name} className="h-24 w-24 rounded-[1rem] object-cover ring-1 ring-[var(--solara-rule)]" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-[var(--solara-text-strong)]">{profile.name}</h2>
                  <p className="text-sm text-[var(--solara-text-muted)]">{profile.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.roles?.map((role) => (
                      <span key={role} className="rounded-md border border-[var(--solara-rule)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)]">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
          </PreviewFrame>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <SurfacePanel variant="product" layout="preview">
              <PageIntro
                variant="product"
                layout="preview"
                eyebrow="About"
                title="What this helper brings to the work."
                body={profile.bio}
                className="max-w-none"
              />
            </SurfacePanel>

            <SurfacePanel variant="product" layout="preview">
              <div className="flex items-center justify-between gap-4">
                <PageIntro
                  variant="product"
                  layout="preview"
                  eyebrow="Skills and resources"
                  title="Read the core capabilities before opening the full conversation."
                  body="Hover over a skill to see the shared capability behind it."
                  className="max-w-none"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Hover to learn</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {profile.skills?.map((skill) => (
                  <div key={skill} className="group relative">
                    <SkillIcon name={skill} className="h-12 w-12" />
                    <TooltipCard title={skill} description={skillDetails[skill] || "Shared knowledge"} />
                  </div>
                ))}
              </div>
              {profile.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </SurfacePanel>
          </div>

          <div className="space-y-4">
            <SurfacePanel variant="product" layout="rail" className="p-5">
              <PageIntro
                variant="product"
                layout="rail"
                eyebrow="At a glance"
                title="Screen the helper before you decide on the next move."
                body="Keep the key signals visible without forcing the user into a long profile read."
                className="max-w-none"
              />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {statCard("Rating", profile.rating?.toFixed(1) ?? "4.8")}
                {statCard("Availability", profile.availability || "Flexible")}
                {statCard("Joined", profile.joinedAt || "2024")}
                {statCard("Activity", profile.activityScore ? `${profile.activityScore}%` : "90%")}
              </div>
            </SurfacePanel>

            <SurfacePanel variant="product" layout="rail" className="p-5">
              <ActionRail compact items={profileSignals} />
            </SurfacePanel>

            <SurfacePanel variant="product" layout="rail" className="p-5">
              <PageIntro
                variant="product"
                layout="rail"
                eyebrow="Next steps"
                title="Keep the handoff direct."
                body="Move from profile review into a request or back into the wider helper roster."
                className="max-w-none"
              />
              <ActionRail
                items={[
                  { title: "Send a request", body: "Open a support request if this helper fits the job.", action: <Link to="/request-help" className="solara-inline-action solara-inline-action--default">Open</Link> },
                  { title: "Return to helpers", body: "Browse the full helper roster again.", action: <Link to="/connect" className="solara-inline-action solara-inline-action--default">Browse</Link> },
                ]}
              />
            </SurfacePanel>
          </div>
        </div>
      </PageReveal>
    </PageFrame>
  );
};

export default ProfilePage;
