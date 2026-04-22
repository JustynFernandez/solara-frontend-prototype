import React from "react";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";

const Safety: React.FC = () => (
  <PageFrame family="editorial" width="wide" density="compact">
    <PageReveal mode="mount">
      <PageHeroStage
        family="guide"
        eyebrow="Safety & scope"
        title="Work safely, stay within scope."
        body="Solara is a community platform. Helpers are community members, not employees of Solara. Always follow local regulations and use licensed professionals for high-risk work."
        metrics={[
          { label: "High-risk work", value: "Certified only", meta: "Use licensed professionals where required." },
          { label: "Community role", value: "Neighbor help", meta: "This is support, not employer-managed labor." },
          { label: "Default move", value: "Pause if unsure", meta: "Escalate unclear or unsafe situations early." },
        ]}
        preview={
          <PreviewFrame
            chromeLabel="Safety checks"
            eyebrow="Default guardrails"
            title="Start with the non-negotiables."
            body="Every project should protect people, equipment, and the limits of community knowledge."
          >
            <ActionRail
              compact
              items={[
                { eyebrow: "PPE", title: "Use protective equipment and safe access.", body: "Ladders, anchors, and electrical isolation are not optional." },
                { eyebrow: "Scope", title: "Stay inside your real level of training.", body: "Do not stretch community help into professional electrical work." },
                { eyebrow: "Escalation", title: "Stop when the risk picture changes.", body: "Pause work and escalate when a job becomes unclear or unsafe." },
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
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Do</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>Use licensed electricians for any grid-tied or high-voltage work.</li>
              <li>Wear PPE, de-energize circuits, and follow lock-out/tag-out where relevant.</li>
              <li>Document shade surveys, torque checks, and maintenance schedules.</li>
              <li>Match equipment to manufacturer specs; check voltage/current limits.</li>
              <li>Ensure safe ladders, harnesses, and rooftop practices.</li>
            </ul>
          </div>
        </SurfacePanel>

        <SurfacePanel as="article" variant="guide" layout="preview">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Do not</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>Perform electrical work you're not qualified for.</li>
              <li>Bypass safety devices or ignore manufacturer warnings.</li>
              <li>Work at height without proper anchors or supervision.</li>
              <li>Share unvetted advice as professional guidance.</li>
            </ul>
          </div>
        </SurfacePanel>
      </div>
    </PageReveal>

    <PageReveal mode="in-view">
      <SurfacePanel as="article" variant="guide" layout="closeout">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reporting & escalation</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            If you see unsafe behavior or misrepresentation, let the organiser know and pause work until risks are resolved.
          </p>
        </div>
      </SurfacePanel>
    </PageReveal>
  </PageFrame>
);

export default Safety;
