import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import FormShell from "@/components/ui/form-shell";
import MetricBand from "@/components/ui/metric-band";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import { useAuth } from "../context/auth-context";
import { skillOptions } from "../data/mockData";

const roles = ["Helper", "Seeker"] as const;

const fieldClassName =
  "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";
const fileInputClassName =
  "text-sm text-[var(--solara-text-muted)] file:mr-3 file:rounded-md file:border file:border-[var(--solara-rule)] file:bg-[var(--solara-surface-2)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--solara-text-strong)]";

const AccountCreate = () => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Helper"]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((item) => item !== role) : [...prev, role]));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]));
  };

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({ roles: selectedRoles, skills: selectedSkills, photo });
    navigate("/my-account");
  };

  return (
    <PageFrame family="hub" width="wide" density="compact" className="min-h-[calc(100vh-5rem)]">
      <PageReveal mode="mount">
        <FormShell
          eyebrow="Profile setup"
          title="Tell Solara how you want to participate."
          body="Choose your role, add the skills or resources you can share, and upload a profile photo. This setup stays mock-only and in-memory, but it should feel like a real account step."
          layout="split"
          lead={
            <MetricBand
              compact
              items={[
                { label: "Matching", value: "Cleaner fit", meta: "Skills and roles improve helper discovery and requests." },
                { label: "Handoff", value: "Faster context", meta: "Projects can understand your role before opening a full profile." },
              ]}
            />
          }
          aside={
            <PreviewFrame
              chromeLabel="What changes after this"
              eyebrow="Profile impact"
              title="Your profile becomes usable across Connect and Projects."
              body="Roles and skills shape how you appear in helper discovery, support requests, and project invitations."
              viewportClassName="pt-0"
            >
              <ActionRail
                compact
                items={[
                  { eyebrow: "Cleaner matching", title: "Route requests based on real skills.", body: "Projects and helpers can screen for actual capabilities instead of generic tags." },
                  { eyebrow: "Faster handoff", title: "Make your role legible before profile expansion.", body: "People can understand fit without reading a full profile first." },
                ]}
              />
            </PreviewFrame>
          }
        >
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Role</p>
              <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Use this to tell Solara how you want to show up in the network.</p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => {
                  const active = selectedRoles.includes(role);
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
              <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Skills and resources</p>
              <p className="text-sm leading-6 text-[var(--solara-text-muted)]">These tags help the rest of Solara place you in the right conversations.</p>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const active = selectedSkills.includes(skill);
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

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="photo">
                Profile photo
              </label>
              <p className="text-sm leading-6 text-[var(--solara-text-muted)]">A photo is optional, but it makes the mock profile feel complete.</p>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className={fileInputClassName}
                />
                {photo ? <img src={photo} alt="Profile preview" className="h-14 w-14 rounded-[1rem] border border-[var(--solara-rule)] object-cover" /> : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button type="submit" className="solara-inline-action solara-inline-action--strong min-w-[11rem]">
                Save and continue
              </button>
              <button type="button" onClick={() => navigate("/my-account")} className="solara-inline-action solara-inline-action--default">
                Skip for now
              </button>
            </div>
          </form>
        </FormShell>
      </PageReveal>
    </PageFrame>
  );
};

export default AccountCreate;
