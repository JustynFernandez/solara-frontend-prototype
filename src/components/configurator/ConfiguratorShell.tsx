import React from "react";
import { Sun, Zap } from "lucide-react";
import { useEcoMode } from "../../hooks/useEcoMode";
import InlineAction from "@/components/ui/inline-action";
import MetricBand from "@/components/ui/metric-band";

type ConfiguratorShellProps = {
  children: React.ReactNode;
};

const ConfiguratorShell: React.FC<ConfiguratorShellProps> = ({ children }) => {
  const { ecoModeEnabled } = useEcoMode();

  return (
    <div className="relative min-h-screen text-[var(--solara-text-strong)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <header className="rounded-[1.25rem] border border-[var(--solara-rule)] bg-[color-mix(in_srgb,var(--solara-surface-1)_94%,transparent)] px-4 py-4 shadow-[var(--solara-shadow-soft)] backdrop-blur-sm sm:px-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-accent-strong)]">
                    <Sun className="h-5 w-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                      3D configurator
                    </p>
                    <h1 className="text-xl font-semibold tracking-[-0.02em] text-[var(--solara-text-strong)]">
                      Test panel layouts before the project moves forward.
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-[var(--solara-text-muted)]">
                      Work directly on roof geometry, panel placement, and rough performance without leaving the planning flow.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                  {ecoModeEnabled ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--solara-rule)] px-3 py-1">
                      <Zap className="h-3.5 w-3.5 text-[var(--solara-accent)]" />
                      Eco mode
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Auto-saving
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <InlineAction to="/plan">Back to planning</InlineAction>
                <InlineAction to="/solar-navigator" emphasis="default">
                  Open navigator
                </InlineAction>
              </div>

              <MetricBand
                compact
                items={[
                  { label: "Workspace", value: "Interactive", meta: "Live 3D placement surface" },
                  { label: "Mode", value: ecoModeEnabled ? "Eco" : "Standard", meta: "Rendering profile" },
                  { label: "State", value: "Auto-save", meta: "Changes persist locally" },
                ]}
              />
            </div>

            <div className="rounded-[1.15rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                Workspace notes
              </p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--solara-text-muted)]">
                <p>Use this space for direct panel placement and quick scenario tests before sharing a plan.</p>
                <p>Keep the rest of the chrome quiet so the canvas remains the primary surface.</p>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

export default ConfiguratorShell;
