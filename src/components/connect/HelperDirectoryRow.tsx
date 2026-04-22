import React from "react";
import { Clock3, ShieldCheck, Star } from "lucide-react";
import type { Helper } from "@/data/helpers";
import HelperAvatar from "./HelperAvatar";

type Props = {
  helper: Helper;
  onOpenProfile: (helper: Helper) => void;
  onRequest: (helper: Helper) => void;
  saved: boolean;
  onSaveToggle: (id: string) => void;
  variant?: "priority" | "standard";
  rank?: number;
};

const levelLabel: Record<Helper["level"], string> = {
  community: "Community volunteer",
  trained: "Trained volunteer",
  certified: "Certified installer",
};

const availabilityLabel: Record<Helper["availabilityStatus"], string> = {
  available: "Available now",
  limited: "Limited availability",
  unavailable: "Unavailable",
};

const getSpecialtyLine = (helper: Helper) => helper.skills.slice(0, 2).join(" / ");

const getSupportLabel = (helper: Helper) =>
  helper.supportTypes.includes("remote") && helper.supportTypes.includes("visit")
    ? "Remote + on-site"
    : helper.supportTypes.includes("visit")
      ? "On-site support"
      : "Remote support";

const getPriorityReason = (helper: Helper) => {
  if (helper.level === "certified") return "Best first move for regulated work.";
  if (helper.supportTypes.includes("remote") && helper.supportTypes.includes("visit")) return "Can handle remote review and local follow-through.";
  if (helper.supportTypes.includes("remote")) return "Useful when the first pass is still remote.";
  return "Strong option for hands-on local support.";
};

const HelperDirectoryRow: React.FC<Props> = ({
  helper,
  onOpenProfile,
  onRequest,
  saved,
  onSaveToggle,
  variant = "standard",
  rank,
}) => {
  const isPriority = variant === "priority";

  return (
    <article className={`solara-helper-card ${isPriority ? "is-priority" : "is-standard"}`}>
      {isPriority ? (
        <aside className="solara-helper-card__rank">
          <span className="solara-helper-card__rank-index">{String(rank ?? 0).padStart(2, "0")}</span>
          <p className="solara-helper-card__rank-label">Priority</p>
          <p className="solara-helper-card__rank-note">{getPriorityReason(helper)}</p>
        </aside>
      ) : null}

      <div className="solara-helper-card__main">
        <div className="solara-helper-card__identity">
          <HelperAvatar name={helper.name} src={helper.avatar} className="solara-helper-card__avatar" />
          <div className="solara-helper-card__identity-copy">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="solara-helper-card__name">{helper.name}</h3>
              {helper.verified ? <ShieldCheck className="h-3.5 w-3.5 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
            </div>
            <p className="solara-helper-card__level">{levelLabel[helper.level]}</p>
            <p className="solara-helper-card__bio">{helper.bio}</p>
          </div>
        </div>

        <div className="solara-helper-card__skills">
          {helper.skills.slice(0, isPriority ? 4 : 3).map((skill) => (
            <span key={skill} className="solara-helper-card__skill">
              {skill}
            </span>
          ))}
        </div>

        <div className="solara-helper-card__facts">
          <div>
            <span>Availability</span>
            <strong>{availabilityLabel[helper.availabilityStatus]}</strong>
          </div>
          <div>
            <span>Support</span>
            <strong>{getSupportLabel(helper)}</strong>
          </div>
          <div>
            <span>Best for</span>
            <strong>{getSpecialtyLine(helper)}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{helper.coarseLocationLabel}</strong>
          </div>
          <div>
            <span>Response</span>
            <strong className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {helper.responseTimeLabel}
            </strong>
          </div>
          <div>
            <span>Proof</span>
            <strong className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-[var(--solara-accent)]" />
              {helper.rating.toFixed(1)} / {helper.completedProjectsCount} projects
            </strong>
          </div>
        </div>
      </div>

      <div className="solara-helper-card__actions">
        <div className="solara-helper-card__primary-actions">
          <button type="button" onClick={() => onOpenProfile(helper)} className="solara-inline-action solara-inline-action--default">
            View profile
          </button>
          <button type="button" onClick={() => onRequest(helper)} className="solara-inline-action solara-inline-action--strong">
            Request support
          </button>
        </div>
        <button
          type="button"
          onClick={() => onSaveToggle(helper.id)}
          aria-pressed={saved}
          className={`solara-helper-card__save${saved ? " is-saved" : ""}`}
        >
          {saved ? "Saved helper" : "Save helper"}
        </button>
      </div>
    </article>
  );
};

export default HelperDirectoryRow;
