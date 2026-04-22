import React from "react";
import { cn } from "@/lib/utils";

type FormShellProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: React.ReactNode;
  aside?: React.ReactNode;
  lead?: React.ReactNode;
  footer?: React.ReactNode;
  layout?: "default" | "hero" | "split" | "preview" | "rail" | "closeout";
  className?: string;
  mainClassName?: string;
  asideClassName?: string;
  children: React.ReactNode;
};

const FormShell: React.FC<FormShellProps> = ({
  eyebrow,
  title,
  body,
  aside,
  lead,
  footer,
  layout = "default",
  className,
  mainClassName,
  asideClassName,
  children,
}) => (
  <div className={cn("solara-form-shell", `solara-form-shell--layout-${layout}`, className)}>
    <div className={cn("solara-form-shell__main", mainClassName)}>
      {lead ? <div className="solara-form-shell__lead">{lead}</div> : null}
      {eyebrow || title || body ? (
        <header className="solara-form-shell__header">
          {eyebrow ? <p className="solara-form-shell__eyebrow">{eyebrow}</p> : null}
          {title ? <h1 className="solara-form-shell__title">{title}</h1> : null}
          {body ? <div className="solara-form-shell__body">{body}</div> : null}
        </header>
      ) : null}
      <div className="solara-form-shell__content">{children}</div>
      {footer ? <div className="solara-form-shell__footer">{footer}</div> : null}
    </div>
    {aside ? <aside className={cn("solara-form-shell__aside", asideClassName)}>{aside}</aside> : null}
  </div>
);

export default FormShell;
