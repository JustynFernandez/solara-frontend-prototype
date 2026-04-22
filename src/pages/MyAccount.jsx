import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageIntro from "@/components/ui/page-intro";
import PageHeroStage from "@/components/ui/page-hero-stage";
import MetricBand from "@/components/ui/metric-band";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import { useAuth } from "../context/auth-context";
import { locations, skillOptions } from "../data/mockData";

const fieldClassName =
  "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";

const roleOptions = ["Helper", "Seeker"];

const MyAccount = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(user || {});

  const initials = useMemo(() => {
    if (!user?.name) return "SO";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user?.name]);

  if (!user) {
    return (
      <PageFrame family="account" width="wide" density="compact">
        <PageReveal mode="mount">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SurfacePanel variant="account" density="comfortable" className="space-y-5">
              <PageIntro
                variant="quiet"
                eyebrow="My account"
                title="You are signed out."
                body="Sign in to view your profile, saved helpers, and planning progress."
                align="left"
              />
              <MetricBand
                compact
                items={[
                  { label: "Profile", value: "Private", meta: "Your saved identity and preferences stay behind sign-in." },
                  { label: "Context", value: "Stored", meta: "Helpers, projects, and planning notes reappear after login." },
                ]}
              />
              <div className="flex flex-wrap gap-3">
                <InlineAction to="/sign-in" emphasis="strong">
                  Sign in
                </InlineAction>
                <InlineAction to="/register">Create account</InlineAction>
              </div>
            </SurfacePanel>

            <PreviewFrame
              chromeLabel="Why it matters"
              eyebrow="Account continuity"
              title="Keep your profile, helpers, and planning history together."
              body="The account area is the stable surface that carries your identity through the rest of Solara."
              viewportClassName="pt-0"
            >
              <ActionRail
                compact
                items={[
                  { eyebrow: "Saved work", title: "Return to the same setup.", body: "Projects and helper shortlists wait for you instead of starting fresh." },
                  { eyebrow: "Profile state", title: "Keep your roles visible.", body: "Location, skills, and photo all stay attached to your account." },
                ]}
              />
            </PreviewFrame>
          </div>
        </PageReveal>
      </PageFrame>
    );
  }

  const toggleRole = (role) => {
    setDraft((prev) => {
      const roles = prev.roles || [];
      return {
        ...prev,
        roles: roles.includes(role) ? roles.filter((item) => item !== role) : [...roles, role],
      };
    });
  };

  const toggleSkill = (skill) => {
    setDraft((prev) => {
      const skills = prev.skills || [];
      return {
        ...prev,
        skills: skills.includes(skill) ? skills.filter((item) => item !== skill) : [...skills, skill],
      };
    });
  };

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile(draft);
    setEditing(false);
  };

  const roleCount = user.roles?.length || 0;
  const skillCount = user.skills?.length || 0;
  const bioWords = user.bio ? user.bio.split(/\s+/).filter(Boolean).length : 0;

  return (
    <PageFrame family="account" width="wide" density="compact">
      <PageReveal mode="mount">
        <PageHeroStage
          family="account"
          eyebrow="My account"
          title={user.name}
          body={`${user.location} - ${(user.roles || []).join(", ")}`}
          actions={
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              className="solara-inline-action solara-inline-action--strong"
            >
              {editing ? "Cancel" : "Edit profile"}
            </button>
          }
          metrics={[
            { label: "Roles", value: roleCount, meta: "How you appear across Solara" },
            { label: "Skills", value: skillCount, meta: "Used for matching and requests" },
            { label: "Bio", value: bioWords, meta: "Words available for context" },
          ]}
          preview={
            <PreviewFrame
              chromeLabel="Profile summary"
              eyebrow="Visible identity"
              title="The profile people see before opening the full detail."
              body="Keep your role, skills, and short context readable at a glance."
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-xl font-semibold text-[var(--solara-text-strong)]">
                  {user.photo ? <img src={user.photo} alt={user.name} className="h-full w-full object-cover" /> : initials}
                </span>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-[var(--solara-text-strong)]">{user.name}</p>
                  <p className="text-sm text-[var(--solara-text-muted)]">{user.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {(user.roles || []).map((role) => (
                      <span key={role} className="rounded-full border border-[var(--solara-rule)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)]">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </PreviewFrame>
          }
        />
      </PageReveal>

      <PageReveal mode="in-view">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SurfacePanel variant="account" layout="preview" density="comfortable" className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-xl font-semibold text-[var(--solara-text-strong)]">
                {user.photo ? <img src={user.photo} alt={user.name} className="h-full w-full object-cover" /> : initials}
              </span>
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Profile</p>
                <p className="text-xl font-semibold text-[var(--solara-text-strong)]">{user.name}</p>
                <p className="text-sm text-[var(--solara-text-muted)]">{user.location}</p>
                <div className="flex flex-wrap gap-2">
                  {(user.roles || []).map((role) => (
                    <span key={role} className="rounded-full border border-[var(--solara-rule)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)]">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-[var(--solara-rule-soft)] pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">About</p>
              <p className="text-sm leading-6 text-[var(--solara-text-muted)]">{user.bio || "No bio added yet."}</p>
            </div>

            <div className="space-y-3 border-t border-[var(--solara-rule-soft)] pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Skills and resources</p>
              <div className="flex flex-wrap gap-2">
                {(user.skills || []).length > 0 ? (
                  user.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-[var(--solara-rule)] px-3 py-2 text-sm text-[var(--solara-text-muted)]">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-[var(--solara-text-muted)]">No skills added yet.</span>
                )}
              </div>
            </div>
          </SurfacePanel>

          <SurfacePanel variant="account" layout="rail" density="compact" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Actions</p>
              <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
                Move into the parts of Solara where your profile matters most.
              </p>
            </div>
            <ActionRail
              items={[
                { title: "Browse helpers", body: "See who matches your role and location best.", action: <Link to="/connect/helpers" className="solara-inline-action solara-inline-action--default">Open</Link> },
                { title: "Open projects", body: "Move from profile into active neighborhood workspaces.", action: <Link to="/projects" className="solara-inline-action solara-inline-action--default">Open</Link> },
                { title: "Run Navigator", body: "Turn your next solar question into a practical route.", action: <Link to="/plan/navigator" className="solara-inline-action solara-inline-action--default">Open</Link> },
              ]}
            />
          </SurfacePanel>
        </div>
      </PageReveal>

      {editing ? (
        <PageReveal mode="in-view">
          <SurfacePanel variant="account" layout="split" density="comfortable">
            <form onSubmit={saveProfile} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--solara-text-strong)]">
                    Name
                    <input
                      type="text"
                      value={draft.name || ""}
                      onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                      className={fieldClassName}
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--solara-text-strong)]">
                    Location
                    <select
                      value={draft.location || "London"}
                      onChange={(event) => setDraft((prev) => ({ ...prev, location: event.target.value }))}
                      className={fieldClassName}
                    >
                      {locations.filter((city) => city !== "Any").map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <label className="block space-y-2 text-sm font-semibold text-[var(--solara-text-strong)]">
                Bio
                <textarea
                  rows="3"
                  value={draft.bio || ""}
                  onChange={(event) => setDraft((prev) => ({ ...prev, bio: event.target.value }))}
                  className={fieldClassName}
                />
              </label>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Roles</p>
                <div className="flex flex-wrap gap-2">
                  {roleOptions.map((role) => {
                    const active = (draft.roles || []).includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleRole(role)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                            : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)] hover:border-[var(--solara-accent-soft)]"
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => {
                    const active = (draft.skills || []).includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          active
                            ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                            : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="solara-inline-action solara-inline-action--strong">
                  Save changes
                </button>
                <button type="button" onClick={() => setEditing(false)} className="solara-inline-action solara-inline-action--default">
                  Cancel
                </button>
              </div>
            </form>
          </SurfacePanel>
        </PageReveal>
      ) : null}
    </PageFrame>
  );
};

export default MyAccount;
