import React from "react";
import { cn } from "@/lib/utils";

type PreviewFrameProps = {
  chromeLabel?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  viewportClassName?: string;
  children: React.ReactNode;
};

const PreviewFrame: React.FC<PreviewFrameProps> = ({
  chromeLabel = "Live preview",
  eyebrow,
  title,
  body,
  actions,
  footer,
  className,
  viewportClassName,
  children,
}) => (
  <div className={cn("solara-preview-frame", className)}>
    <div className="solara-preview-frame__chrome">
      <div className="solara-preview-frame__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="solara-preview-frame__chrome-label">{chromeLabel}</span>
    </div>

    {eyebrow || title || body || actions ? (
      <div className="solara-preview-frame__header">
        {eyebrow ? <p className="solara-preview-frame__eyebrow">{eyebrow}</p> : null}
        {title ? <h3 className="solara-preview-frame__title">{title}</h3> : null}
        {body ? <p className="solara-preview-frame__body">{body}</p> : null}
        {actions ? <div className="solara-preview-frame__actions">{actions}</div> : null}
      </div>
    ) : null}

    <div className={cn("solara-preview-frame__viewport", viewportClassName)}>{children}</div>

    {footer ? <div className="solara-preview-frame__footer">{footer}</div> : null}
  </div>
);

export default PreviewFrame;
