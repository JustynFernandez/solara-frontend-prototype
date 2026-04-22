import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const PROJECT_STATUS_RANK = {
  Recruiting: 0,
  "In Progress": 1,
};

const FEATURED_BUILD_MEDIA = {
  "brixton-rooftops": "/hero-community-neighborhood.jpg",
  "camden-coop": "/hero-community-team.jpg",
  "greenwich-garden": "/hero-community-solar-bg.jpg",
  default: "/hero-community-solar-install-poster.jpg",
};

const compactWholeNumber = new Intl.NumberFormat("en-GB", {
  notation: "compact",
  maximumFractionDigits: 0,
});

const compactCurrency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  notation: "compact",
  maximumFractionDigits: 1,
});

const HomeFeaturedBuild = () => {
  const featuredProject = React.useMemo(() => {
    return [...projects]
      .filter((project) => project.status === "Recruiting" || project.status === "In Progress")
      .sort((left, right) => {
        const statusDelta = (PROJECT_STATUS_RANK[left.status] ?? 99) - (PROJECT_STATUS_RANK[right.status] ?? 99);
        if (statusDelta !== 0) return statusDelta;

        const volunteerGapDelta =
          (right.goalVolunteers - right.currentVolunteers) - (left.goalVolunteers - left.currentVolunteers);
        if (volunteerGapDelta !== 0) return volunteerGapDelta;

        return (right.impactEstimateKwhPerYear ?? 0) - (left.impactEstimateKwhPerYear ?? 0);
      })[0];
  }, []);

  const defaultMediaSrc = featuredProject ? FEATURED_BUILD_MEDIA[featuredProject.id] ?? FEATURED_BUILD_MEDIA.default : FEATURED_BUILD_MEDIA.default;
  const [mediaSrc, setMediaSrc] = React.useState(defaultMediaSrc);

  React.useEffect(() => {
    setMediaSrc(defaultMediaSrc);
  }, [defaultMediaSrc]);

  if (!featuredProject) return null;

  const currentNeed =
    featuredProject.tasks.find((task) => task.status === "todo") ??
    featuredProject.tasks.find((task) => task.status === "in-progress") ??
    featuredProject.tasks[0];

  const verifiedRoles = featuredProject.roles.filter((role) => role.verified).slice(0, 2);

  const taskSummary = featuredProject.tasks.reduce(
    (summary, task) => {
      if (task.status === "done") summary.done += 1;
      if (task.status === "in-progress") summary.inProgress += 1;
      if (task.status === "todo") summary.todo += 1;
      return summary;
    },
    { done: 0, inProgress: 0, todo: 0 }
  );

  const volunteerPercent = Math.min(
    100,
    Math.round((featuredProject.currentVolunteers / featuredProject.goalVolunteers) * 100)
  );
  const volunteerGap = Math.max(featuredProject.goalVolunteers - featuredProject.currentVolunteers, 0);

  const hasFunding =
    typeof featuredProject.goalFunding === "number" && typeof featuredProject.currentFunding === "number";

  const metricRows = [
    {
      label: "Volunteers",
      value: `${featuredProject.currentVolunteers}/${featuredProject.goalVolunteers}`,
      note: `${volunteerPercent}% committed`,
    },
    {
      label: "Projected output",
      value: `${compactWholeNumber.format(featuredProject.impactEstimateKwhPerYear ?? 0)} kWh`,
      note: featuredProject.impactEstimateTonsCO2PerYear
        ? `${featuredProject.impactEstimateTonsCO2PerYear}t CO2 avoided / year`
        : "Annual community energy impact",
    },
    hasFunding
      ? {
          label: "Funding",
          value: `${compactCurrency.format(featuredProject.currentFunding)} / ${compactCurrency.format(featuredProject.goalFunding)}`,
          note: "Current backing against target",
        }
      : {
          label: "Task progress",
          value: `${taskSummary.done} done / ${taskSummary.inProgress} active`,
          note: `${taskSummary.todo} tasks queued next`,
        },
  ];

  return (
    <section className="home-redesign__build">
      <div className="home-redesign__build-grid">
        <div className="home-redesign__build-media">
          <div className="home-redesign__build-media-stage">
            <img
              src={mediaSrc}
              alt={featuredProject.name}
              className="home-redesign__build-image"
              loading="eager"
              decoding="async"
              onError={() => {
                if (mediaSrc !== FEATURED_BUILD_MEDIA.default) {
                  setMediaSrc(FEATURED_BUILD_MEDIA.default);
                }
              }}
            />
            <div className="home-redesign__build-media-rail">
              <span>{featuredProject.status}</span>
              <span>{featuredProject.location}</span>
              {featuredProject.tags[0] ? <span>{featuredProject.tags[0]}</span> : null}
            </div>
          </div>
        </div>

        <div className="home-redesign__build-content">
          <div className="home-redesign__build-intro">
            <p className="home-redesign__build-kicker">Current build</p>
            <h2 className="home-redesign__build-title">{featuredProject.name}</h2>
            <p className="home-redesign__build-support">
              {featuredProject.status} in {featuredProject.location}
              {featuredProject.tags[0] ? ` / ${featuredProject.tags[0]}` : ""}
            </p>
            <p className="home-redesign__build-project-desc">{featuredProject.shortDescription}</p>
          </div>

          <dl className="home-redesign__build-metrics">
            {metricRows.map((metric) => (
              <div key={metric.label} className="home-redesign__build-metric">
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
                <p>{metric.note}</p>
              </div>
            ))}
          </dl>

          <div className="home-redesign__build-need">
            <p className="home-redesign__build-need-label">Current need now</p>
            <p className="home-redesign__build-need-title">{currentNeed?.title ?? "Confirm the next install milestone"}</p>
            <p className="home-redesign__build-need-copy">
              {volunteerGap > 0
                ? `${volunteerGap} more volunteer${volunteerGap === 1 ? "" : "s"} needed. `
                : "Volunteer target reached. "}
              {taskSummary.inProgress > 0
                ? `${taskSummary.inProgress} task${taskSummary.inProgress === 1 ? "" : "s"} already moving. This is the next clear opening.`
                : "This is the next clear opening for local support."}
            </p>
          </div>

          <div className="home-redesign__build-role-rail">
            {verifiedRoles.map((role) => (
              <div key={role.id} className="home-redesign__build-role">
                <p>{role.userName}</p>
                <span>{role.name}</span>
              </div>
            ))}
          </div>

          <div className="home-redesign__build-cta">
            <Link to="/projects" className="home-redesign__build-cta-primary">
              Open Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/connect" className="home-redesign__build-cta-secondary">
              Find matching helpers
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedBuild;
