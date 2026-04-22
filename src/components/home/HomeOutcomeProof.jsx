import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { helpers } from "@/data/helpers";
import { projects } from "@/data/projects";

const PROJECT_STATUS_RANK = {
  Recruiting: 0,
  "In Progress": 1,
};

const HomeOutcomeProof = () => {
  const helpersAvailableNow = React.useMemo(
    () => helpers.filter((helper) => helper.verified && helper.availabilityStatus === "available").length,
    []
  );

  const activeProjects = React.useMemo(
    () => projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress"),
    []
  );

  const recruitingProjects = activeProjects.filter((project) => project.status === "Recruiting").length;

  const featuredProject = React.useMemo(() => {
    return [...activeProjects].sort((left, right) => {
      const statusDelta = (PROJECT_STATUS_RANK[left.status] ?? 99) - (PROJECT_STATUS_RANK[right.status] ?? 99);
      if (statusDelta !== 0) return statusDelta;

      const volunteerGapDelta =
        (right.goalVolunteers - right.currentVolunteers) - (left.goalVolunteers - left.currentVolunteers);
      if (volunteerGapDelta !== 0) return volunteerGapDelta;

      return (right.impactEstimateKwhPerYear ?? 0) - (left.impactEstimateKwhPerYear ?? 0);
    })[0];
  }, [activeProjects]);

  const currentNeed =
    featuredProject?.tasks.find((task) => task.status === "todo") ??
    featuredProject?.tasks.find((task) => task.status === "in-progress") ??
    featuredProject?.tasks[0];

  const volunteerGap = featuredProject
    ? Math.max(featuredProject.goalVolunteers - featuredProject.currentVolunteers, 0)
    : 0;

  const proofRows = [
    {
      label: "Helpers available now",
      value: `${helpersAvailableNow} verified`,
      detail: "Ready to respond without opening a request form first.",
    },
    {
      label: "Projects already recruiting or in progress",
      value: `${activeProjects.length} live`,
      detail: `${recruitingProjects} recruiting now.`,
    },
    {
      label: "Open spots on the featured build",
      value: volunteerGap > 0 ? `${volunteerGap} volunteer spots open` : "Volunteer target reached",
      detail: currentNeed?.title ?? "Next install milestone is already scoped.",
    },
  ];

  return (
    <section className="home-redesign__outcome">
      <div className="home-redesign__outcome-grid">
        <div className="home-redesign__outcome-intro">
          <p className="home-redesign__outcome-kicker">Operational proof</p>
          <h2 className="home-redesign__outcome-title">Local help and real project work are already live.</h2>
          <p className="home-redesign__outcome-copy">
            Helpers are available now, projects are moving, and the planning flow is ready when you need it.
          </p>

          <div className="home-redesign__outcome-links">
            <Link to="/connect" className="home-redesign__outcome-cta-primary">
              Open Connect
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <dl className="home-redesign__outcome-list">
          {proofRows.map((row) => (
            <div key={row.label} className="home-redesign__outcome-row">
              <dt className="home-redesign__outcome-label">{row.label}</dt>
              <dd className="home-redesign__outcome-value">{row.value}</dd>
              <p className="home-redesign__outcome-detail">{row.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HomeOutcomeProof;
