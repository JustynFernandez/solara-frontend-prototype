import React, { useState } from "react";
import ActionRail from "@/components/ui/action-rail";
import InlineAction from "@/components/ui/inline-action";
import MetricBand from "@/components/ui/metric-band";
import PageFrame from "@/components/ui/page-frame";
import FormShell from "@/components/ui/form-shell";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SketchNote from "../components/ui/SketchNote";

const categories = ["Installation", "Tools", "Advice & Learning", "Maintenance", "Community Projects"];
const fieldClassName =
  "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";

const RequestHelp = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageFrame family="hub" width="wide" density="compact">
      <PageReveal mode="mount" className="space-y-8">
        <PageHeroStage
          family="hub"
          eyebrow="Request help"
          title="Tell the community what you need."
          body="A simple request form for matching support, tools, and guidance, with enough context for helpers to respond quickly."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/connect" emphasis="strong">Browse helpers first</InlineAction>
              <InlineAction to="/plan">Open planning routes</InlineAction>
            </div>
          }
          metrics={[
            { label: "Matching", value: "Clear brief", meta: "Good details improve response quality." },
            { label: "Support", value: "Local + remote", meta: "Ask for hands-on help or guidance." },
            { label: "Visibility", value: "One intake", meta: "Requests stay visible to the right routes." },
          ]}
          preview={
            <PreviewFrame
              chromeLabel="Request flow"
              eyebrow="What happens next"
              title="A short request still needs enough signal."
              body="Category, location, and a practical description are enough to start matching help."
            >
              <ActionRail
                compact
                items={[
                  { eyebrow: "1", title: "Describe the real blocker", body: "State the task, risk, or tool gap as clearly as possible." },
                  { eyebrow: "2", title: "Choose the right lane", body: "Installation, tools, advice, maintenance, or community work." },
                  { eyebrow: "3", title: "Surface the next response", body: "Helpers can respond with fit, availability, or a better route." },
                ]}
              />
            </PreviewFrame>
          }
        />

        <FormShell
          eyebrow="Request intake"
          title="Send a request helpers can act on."
          body="Keep it short, but specific enough that someone can tell whether they fit."
          layout="split"
          lead={
            <MetricBand
              compact
              items={[
                { label: "Best requests", value: "Specific brief", meta: "Name the work, location, and any safety constraints." },
                { label: "Fastest replies", value: "Clear category", meta: "Helpers can route themselves faster when the lane is obvious." },
              ]}
            />
          }
          aside={
            <PreviewFrame chromeLabel="Before you submit" viewportClassName="pt-0">
              <ActionRail
                compact
                items={[
                  { eyebrow: "Include", title: "Location and job type", body: "City, neighborhood, and the category that best matches the work." },
                  { eyebrow: "Mention", title: "Urgency and constraints", body: "Access issues, timing, budget guardrails, or safety concerns." },
                  { eyebrow: "Keep", title: "The ask practical", body: "Enough detail to respond, without turning this into a full project brief." },
                ]}
              />
            </PreviewFrame>
          }
        >
          {submitted && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-[1rem] border border-[var(--solara-accent-soft)] bg-[var(--solara-accent-soft)]/50 px-4 py-3 text-sm font-semibold text-[var(--solara-text-strong)]"
            >
              Thanks. This mock request is now staged as a visible helper handoff.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-[var(--solara-text-strong)]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={fieldClassName}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-semibold text-[var(--solara-text-strong)]">
                Help category
              </label>
              <select
                id="category"
                name="category"
                required
                className={fieldClassName}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-[var(--solara-text-strong)]">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                className={fieldClassName}
                placeholder="Describe what you need help with..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-semibold text-[var(--solara-text-strong)]">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className={fieldClassName}
                placeholder="City or neighborhood"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SketchNote text="Details help us match" tone="blue" className="hidden sm:inline-flex" />
              <button
                type="submit"
                className="motion-arrow-shift inline-flex items-center justify-center gap-2 rounded-full bg-button-primary bg-[length:220%_220%] px-5 py-3 text-sm font-semibold text-white shadow-solara-soft transition hover:scale-[1.02] hover:shadow-glow hover:bg-[position:100%_50%] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
              >
                Submit request
                <svg className="motion-arrow h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </form>
        </FormShell>
      </PageReveal>
    </PageFrame>
  );
};

export default RequestHelp;
