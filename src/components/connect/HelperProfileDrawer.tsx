import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Clock3, MapPin, ShieldCheck, Star, X } from "lucide-react";
import type { Helper } from "../../data/helpers";

type Props = {
  helper: Helper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequest: (helper: Helper) => void;
  saved: boolean;
  onSaveToggle: (helper: Helper) => void;
};

const levelCopy: Record<Helper["level"], string> = {
  community: "Guidance, photos, checklists, and remote support.",
  trained: "Peer review, site walkthroughs, and tool coaching.",
  certified: "Mains wiring, commissioning, and formal sign-off.",
};

const supportLabel = (helper: Helper) =>
  helper.supportTypes.includes("remote") && helper.supportTypes.includes("visit")
    ? "Remote + on-site"
    : helper.supportTypes.includes("visit")
      ? "On-site support"
      : "Remote support";

const helperInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const HelperProfileDrawer: React.FC<Props> = ({ helper, open, onOpenChange, onRequest, saved, onSaveToggle }) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  if (!helper || !open) return null;

  return createPortal(
    <div className="solara-helper-drawer" role="dialog" aria-modal="true" aria-labelledby={`helper-drawer-title-${helper.id}`}>
      <button type="button" className="solara-helper-drawer__scrim" onClick={() => onOpenChange(false)} aria-label="Close helper profile" />

      <div className="solara-helper-drawer__panel">
        <div className="solara-helper-drawer__top">
          <div className="solara-helper-drawer__identity">
            <span className="solara-helper-drawer__avatar">
              {helper.avatar ? <img src={helper.avatar} alt={`${helper.name} avatar`} className="h-full w-full object-cover" /> : helperInitials(helper.name)}
            </span>
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id={`helper-drawer-title-${helper.id}`} className="solara-helper-drawer__name">
                  {helper.name}
                </h2>
                {helper.verified ? <ShieldCheck className="h-4 w-4 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
              </div>
              <p className="solara-helper-drawer__level">{levelCopy[helper.level]}</p>
              <div className="flex flex-wrap gap-2">
                <span className="solara-helper-drawer__pill">{supportLabel(helper)}</span>
                <span className="solara-helper-drawer__pill">{helper.coarseLocationLabel}</span>
                <span className="solara-helper-drawer__pill">{helper.responseTimeLabel}</span>
              </div>
            </div>
          </div>

          <button type="button" onClick={() => onOpenChange(false)} className="solara-helper-drawer__close">
            <X className="h-4 w-4" aria-hidden="true" />
            Close
          </button>
        </div>

        <div className="solara-helper-drawer__grid">
          <section className="solara-helper-drawer__section">
            <p className="solara-helper-drawer__label">Profile</p>
            <p className="solara-helper-drawer__body">{helper.bio}</p>

            <div className="solara-helper-drawer__facts">
              <div className="solara-helper-drawer__fact">
                <p className="solara-helper-drawer__fact-label">Location</p>
                <p className="solara-helper-drawer__fact-value inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {helper.coarseLocationLabel}
                </p>
              </div>
              <div className="solara-helper-drawer__fact">
                <p className="solara-helper-drawer__fact-label">Response</p>
                <p className="solara-helper-drawer__fact-value inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {helper.responseTimeLabel}
                </p>
              </div>
              <div className="solara-helper-drawer__fact">
                <p className="solara-helper-drawer__fact-label">Rating</p>
                <p className="solara-helper-drawer__fact-value inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-[var(--solara-accent)]" />
                  {helper.rating.toFixed(1)} from {helper.reviewsCount} reviews
                </p>
              </div>
              <div className="solara-helper-drawer__fact">
                <p className="solara-helper-drawer__fact-label">Completed</p>
                <p className="solara-helper-drawer__fact-value">{helper.completedProjectsCount} projects</p>
              </div>
            </div>
          </section>

          <section className="solara-helper-drawer__section">
            <p className="solara-helper-drawer__label">Skills</p>
            <div className="solara-helper-drawer__skills">
              {helper.skills.map((skill) => (
                <span key={skill} className="solara-helper-drawer__skill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="solara-helper-drawer__notice">
              <p className="solara-helper-drawer__fact-label">Safety rule</p>
              <p className="solara-helper-drawer__body">Any work involving mains wiring requires a certified professional.</p>
            </div>
          </section>
        </div>

        <div className="solara-helper-drawer__actions">
          <button type="button" onClick={() => onRequest(helper)} className="solara-inline-action solara-inline-action--strong">
            Request support
          </button>
          <button type="button" onClick={() => onSaveToggle(helper)} className="solara-inline-action solara-inline-action--default">
            {saved ? "Saved helper" : "Save helper"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default HelperProfileDrawer;
