import React from "react";
import PageIntro from "@/components/ui/page-intro";
import SurfacePanel from "@/components/ui/surface-panel";
import MetricBand, { type MetricBandItem } from "@/components/ui/metric-band";
import { cn } from "@/lib/utils";

type HeroFamily = "editorial" | "hub" | "product" | "guide" | "account";

type PageHeroStageProps = {
  family?: HeroFamily;
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  metrics?: MetricBandItem[];
  preview?: React.ReactNode;
  rail?: React.ReactNode;
  className?: string;
  previewClassName?: string;
  children?: React.ReactNode;
};

const introVariantMap: Record<HeroFamily, "editorial" | "hub" | "product" | "quiet"> = {
  editorial: "editorial",
  hub: "hub",
  product: "product",
  guide: "quiet",
  account: "quiet",
};

const panelVariantMap: Record<HeroFamily, "editorial" | "product" | "guide" | "account"> = {
  editorial: "editorial",
  hub: "editorial",
  product: "product",
  guide: "guide",
  account: "account",
};

const PageHeroStage: React.FC<PageHeroStageProps> = ({
  family = "editorial",
  eyebrow,
  title,
  body,
  meta,
  actions,
  metrics,
  preview,
  rail,
  className,
  previewClassName,
  children,
}) => (
  <SurfacePanel
    variant={panelVariantMap[family]}
    layout="hero"
    density="comfortable"
    className={cn("solara-page-hero-stage", `solara-page-hero-stage--${family}`, className)}
  >
    <div className={cn("solara-page-hero-stage__main", preview && "solara-page-hero-stage__main--with-preview")}>
      <div className="solara-page-hero-stage__copy">
        <PageIntro
          eyebrow={eyebrow}
          title={title}
          body={body}
          meta={meta}
          actions={actions}
          variant={introVariantMap[family]}
          layout={preview ? "split" : "hero"}
          className="max-w-none border-t-0 pt-0"
        />
        {children ? <div className="solara-page-hero-stage__detail">{children}</div> : null}
      </div>

      {preview ? <div className={cn("solara-page-hero-stage__preview", previewClassName)}>{preview}</div> : null}
    </div>

    {metrics?.length ? <MetricBand items={metrics} className="solara-page-hero-stage__metrics" /> : null}
    {rail ? <div className="solara-page-hero-stage__rail">{rail}</div> : null}
  </SurfacePanel>
);

export default PageHeroStage;
