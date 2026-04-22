import React from "react";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "editorial" | "hub" | "product" | "quiet";
  layout?: "default" | "hero" | "split" | "preview" | "rail" | "closeout";
  align?: "left" | "center";
  className?: string;
  trailing?: React.ReactNode;
};

const PageIntro: React.FC<PageIntroProps> = ({
  eyebrow,
  title,
  body,
  meta,
  actions,
  variant = "editorial",
  layout = "default",
  align = "left",
  className,
  trailing,
}) => (
  <header
    className={cn(
      "solara-page-intro",
      `solara-page-intro--${variant}`,
      `solara-page-intro--layout-${layout}`,
      align === "center" && "solara-page-intro--center",
      className
    )}
  >
    {eyebrow ? <p className="solara-page-intro__eyebrow">{eyebrow}</p> : null}
    <div className="solara-page-intro__copy">
      <h1 className="solara-page-intro__title">{title}</h1>
      {body ? <div className="solara-page-intro__body">{body}</div> : null}
      {meta ? <div className="solara-page-intro__meta">{meta}</div> : null}
    </div>
    {actions ? <div className="solara-page-intro__actions">{actions}</div> : null}
    {trailing ? <div className="solara-page-intro__trailing">{trailing}</div> : null}
  </header>
);

export default PageIntro;
