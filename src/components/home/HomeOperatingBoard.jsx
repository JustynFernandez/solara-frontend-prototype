import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { helpers } from "@/data/helpers";
import { projects } from "@/data/projects";
import { navigatorQuestions } from "@/components/ui/solar-navigator-wizard";

const laneContent = {
  helpers: {
    id: "helpers",
    label: "Help now",
    badge: "Start here",
    title: "Find verified local help",
    body: "Open verified helpers by response speed, location, and skill.",
    ctaLabel: "Browse helpers",
    ctaTo: "/connect",
  },
  navigator: {
    id: "navigator",
    label: "Plan first",
    title: "Build a plan before you spend",
    body: "See the first planning questions before you open Navigator.",
    ctaLabel: "Run Navigator",
    ctaTo: "/solar-navigator",
  },
  projects: {
    id: "projects",
    label: "Join a build",
    title: "Open work already underway",
    body: "Open recruiting and in-progress projects with current volunteer demand.",
    ctaLabel: "Open projects",
    ctaTo: "/projects",
  },
};

const laneOrder = [laneContent.helpers, laneContent.navigator, laneContent.projects];

const availabilityRank = {
  available: 0,
  limited: 1,
  unavailable: 2,
};

const projectStatusRank = {
  Recruiting: 0,
  "In Progress": 1,
};

const previewMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
};

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const HelperAvatar = ({ src, name }) => {
  const [imageFailed, setImageFailed] = React.useState(!src);

  React.useEffect(() => {
    setImageFailed(!src);
  }, [src]);

  return (
    <span className="home-redesign__board-avatar-shell" aria-hidden="true">
      {imageFailed ? (
        <span className="home-redesign__board-avatar-fallback">{getInitials(name)}</span>
      ) : (
        <img src={src} alt="" className="home-redesign__board-avatar" onError={() => setImageFailed(true)} />
      )}
    </span>
  );
};

const HomeOperatingBoard = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeLane, setActiveLane] = React.useState("helpers");

  const helpersPreview = React.useMemo(
    () =>
      [...helpers]
        .filter((helper) => helper.verified)
        .sort((left, right) => {
          const availabilityDelta =
            availabilityRank[left.availabilityStatus] - availabilityRank[right.availabilityStatus];
          if (availabilityDelta !== 0) return availabilityDelta;
          return right.rating - left.rating;
        })
        .slice(0, 3)
        .map((helper) => ({
          id: helper.id,
          avatar: helper.avatar,
          name: helper.name,
          level: helper.level,
          location: helper.coarseLocationLabel,
          responseTime: helper.responseTimeLabel,
          skills: helper.skills.slice(0, 2),
        })),
    []
  );

  const navigatorPreview = React.useMemo(
    () =>
      navigatorQuestions.slice(0, 3).map((question, index) => ({
        id: question.id,
        index: index + 1,
        prompt: question.prompt,
      })),
    []
  );

  const projectsPreview = React.useMemo(
    () =>
      [...projects]
        .filter((project) => project.status === "Recruiting" || project.status === "In Progress")
        .sort((left, right) => {
          const statusDelta = (projectStatusRank[left.status] ?? 99) - (projectStatusRank[right.status] ?? 99);
          if (statusDelta !== 0) return statusDelta;
          const rightGap = right.goalVolunteers - right.currentVolunteers;
          const leftGap = left.goalVolunteers - left.currentVolunteers;
          return rightGap - leftGap;
        })
        .slice(0, 2)
        .map((project) => {
          const volunteerPercent = Math.min(
            100,
            Math.round((project.currentVolunteers / Math.max(project.goalVolunteers, 1)) * 100)
          );

          return {
            id: project.id,
            name: project.name,
            location: project.location,
            status: project.status,
            tag: project.tags[0] ?? "",
            volunteerPercent,
            volunteerLabel: `${project.currentVolunteers}/${project.goalVolunteers} volunteers`,
          };
        }),
    []
  );

  const boardMetrics = React.useMemo(
    () => [
      {
        label: "Helpers online",
        value: String(
          helpers.filter((helper) => helper.verified && helper.availabilityStatus === "available").length
        ),
      },
      {
        label: "Projects active",
        value: String(projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress").length),
      },
      {
        label: "Navigator flow",
        value: `${navigatorQuestions.length} steps`,
      },
    ],
    []
  );

  const active = laneContent[activeLane] ?? laneContent.helpers;

  return (
    <div className="home-redesign__board">
      <div className="home-redesign__board-grid">
        <div className="home-redesign__board-rail" role="tablist" aria-label="Live board lanes">
          {laneOrder.map((lane) => (
            <button
              key={lane.id}
              type="button"
              role="tab"
              aria-selected={activeLane === lane.id}
              aria-controls={`home-live-board-${lane.id}`}
              className={`home-redesign__board-lane${activeLane === lane.id ? " is-active" : ""}`}
              onClick={() => setActiveLane(lane.id)}
            >
              <span className="home-redesign__board-lane-meta">
                <span className="home-redesign__board-lane-label">{lane.label}</span>
                {lane.badge ? <span className="home-redesign__board-lane-badge">{lane.badge}</span> : null}
              </span>
              <span className="home-redesign__board-lane-title">{lane.title}</span>
              <span className="home-redesign__board-lane-body">{lane.body}</span>
              <span className="home-redesign__board-lane-cta">
                {lane.ctaLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          ))}
        </div>

        <div className="home-redesign__board-shell">
          <div className="home-redesign__board-browser">
            <div className="home-redesign__board-browser-meta">
              {boardMetrics.map((metric) => (
                <div key={metric.label} className="home-redesign__board-metric">
                  <span className="home-redesign__board-metric-label">{metric.label}</span>
                  <span className="home-redesign__board-metric-value">{metric.value}</span>
                </div>
              ))}
            </div>

            <div className="home-redesign__board-preview" id={`home-live-board-${activeLane}`} role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div key={activeLane} className="home-redesign__board-preview-pane" {...(prefersReducedMotion ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 }, transition: { duration: 0 } } : previewMotion)}>
                  {activeLane === "helpers" ? (
                    <div className="home-redesign__board-pane home-redesign__board-pane--helpers">
                      <div className="home-redesign__board-pane-header">
                        <div>
                          <p className="home-redesign__board-pane-kicker">Helpers lane</p>
                          <p className="home-redesign__board-pane-title">Verified helpers available now</p>
                        </div>
                        <Link to={active.ctaTo} className="home-redesign__board-pane-link">
                          {active.ctaLabel}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>

                      <div className="home-redesign__board-helper-list">
                        {helpersPreview.map((helper) => (
                          <div key={helper.id} className="home-redesign__board-helper-row">
                            <div className="home-redesign__board-helper-main">
                              <HelperAvatar src={helper.avatar} name={helper.name} />
                              <div className="home-redesign__board-helper-copy">
                                <p className="home-redesign__board-helper-name">{helper.name}</p>
                                <p className="home-redesign__board-helper-meta">
                                  {helper.level} / {helper.location}
                                </p>
                              </div>
                            </div>
                            <div className="home-redesign__board-helper-side">
                              <p className="home-redesign__board-helper-response">{helper.responseTime}</p>
                              <p className="home-redesign__board-helper-skills">{helper.skills.join(" / ")}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {activeLane === "navigator" ? (
                    <div className="home-redesign__board-pane home-redesign__board-pane--navigator">
                      <div className="home-redesign__board-pane-header">
                        <div>
                          <p className="home-redesign__board-pane-kicker">Navigator lane</p>
                          <p className="home-redesign__board-pane-title">First questions before you commit</p>
                        </div>
                        <Link to={active.ctaTo} className="home-redesign__board-pane-link">
                          {active.ctaLabel}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>

                      <div className="home-redesign__board-nav-progress">
                        <div className="home-redesign__board-nav-progress-track">
                          <motion.span
                            className="home-redesign__board-nav-progress-fill"
                            initial={prefersReducedMotion ? false : { scaleX: 0 }}
                            animate={{ scaleX: 0.6 }}
                            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                        <span className="home-redesign__board-nav-progress-label">3 / 5 complete</span>
                      </div>

                      <div className="home-redesign__board-nav-list">
                        {navigatorPreview.map((question) => (
                          <div key={question.id} className="home-redesign__board-nav-row">
                            <span className="home-redesign__board-nav-index">0{question.index}</span>
                            <div className="home-redesign__board-nav-copy">
                              <p className="home-redesign__board-nav-prompt">{question.prompt}</p>
                              <p className="home-redesign__board-nav-meta">Stored as part of your saved run</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-[var(--home-accent-strong)]" aria-hidden="true" />
                          </div>
                        ))}
                      </div>

                      <p className="home-redesign__board-pane-footer">Save and resume</p>
                    </div>
                  ) : null}

                  {activeLane === "projects" ? (
                    <div className="home-redesign__board-pane home-redesign__board-pane--projects">
                      <div className="home-redesign__board-pane-header">
                        <div>
                          <p className="home-redesign__board-pane-kicker">Projects lane</p>
                          <p className="home-redesign__board-pane-title">Projects with open volunteer demand</p>
                        </div>
                        <Link to={active.ctaTo} className="home-redesign__board-pane-link">
                          {active.ctaLabel}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>

                      <div className="home-redesign__board-project-list">
                        {projectsPreview.map((project) => (
                          <div key={project.id} className="home-redesign__board-project-row">
                            <div className="home-redesign__board-project-main">
                              <p className="home-redesign__board-project-name">{project.name}</p>
                              <p className="home-redesign__board-project-meta">
                                {project.location} / {project.status}
                                {project.tag ? ` / ${project.tag}` : ""}
                              </p>
                            </div>
                            <div className="home-redesign__board-project-progress">
                              <p className="home-redesign__board-project-label">{project.volunteerLabel}</p>
                              <div className="home-redesign__board-project-track">
                                <motion.span
                                  className="home-redesign__board-project-fill"
                                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                                  animate={{ scaleX: project.volunteerPercent / 100 }}
                                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOperatingBoard;
