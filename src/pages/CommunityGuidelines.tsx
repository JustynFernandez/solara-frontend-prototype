import React from "react";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";

const CommunityGuidelines: React.FC = () => (
  <PageFrame family="editorial" width="wide" density="compact">
    <PageReveal mode="mount">
      <PageHeroStage
        family="guide"
        eyebrow="Community guidelines"
        title="A respectful, inclusive solar community."
        body="Solara is for neighbors helping neighbors. Keep interactions honest, inclusive, and free from scams or misrepresentation."
        metrics={[
          { label: "Baseline", value: "Respect first", meta: "Participation starts with safety, honesty, and inclusion." },
          { label: "Moderation", value: "Report early", meta: "Flag scams, harassment, or unsafe advice quickly." },
          { label: "Boundary", value: "No false claims", meta: "Qualifications and risk should stay transparent." },
        ]}
        preview={
          <PreviewFrame
            chromeLabel="Community expectations"
            eyebrow="Shared standards"
            title="The platform works when people are specific, respectful, and honest about scope."
            body="Good collaboration starts with clarity about skill, safety, and the role community members are actually playing."
          >
            <ActionRail
              compact
              items={[
                { eyebrow: "Respect", title: "Keep the space inclusive and non-discriminatory.", body: "Treat neighbors, volunteers, and certified professionals with the same baseline respect." },
                { eyebrow: "Transparency", title: "State your real qualifications.", body: "Do not overstate experience, certification, or the risk of a task." },
                { eyebrow: "Escalation", title: "Report bad behavior before it spreads.", body: "Unsafe advice and harassment should be paused quickly, not debated into normalcy." },
              ]}
            />
          </PreviewFrame>
        }
      />
    </PageReveal>

    <PageReveal mode="in-view">
      <div className="grid gap-4 lg:grid-cols-2">
        <SurfacePanel as="article" variant="guide" layout="preview">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Principles</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>Respect, inclusion, and non-discrimination.</li>
              <li>Transparent skills and qualifications; no false claims.</li>
              <li>Safety-first: pause if something feels risky.</li>
              <li>Credit others' work and share knowledge openly.</li>
            </ul>
          </div>
        </SurfacePanel>

        <SurfacePanel as="article" variant="guide" layout="preview">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reporting & moderation</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>Flag scams, harassment, or unsafe advice.</li>
              <li>Organisers can remove posts or pause collaboration.</li>
              <li>Repeat violations may be removed from Solara spaces.</li>
            </ul>
          </div>
        </SurfacePanel>
      </div>
    </PageReveal>

    <PageReveal mode="in-view">
      <SurfacePanel as="article" variant="guide" layout="closeout">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Professional boundaries</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Helpers are community members, not employees of Solara. For high-risk electrical work, use certified professionals.
          </p>
        </div>
      </SurfacePanel>
    </PageReveal>
  </PageFrame>
);

export default CommunityGuidelines;
