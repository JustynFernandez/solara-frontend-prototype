import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type InlineActionProps = {
  to?: string;
  href?: string;
  children: React.ReactNode;
  emphasis?: "default" | "strong" | "quiet";
  className?: string;
};

const InlineAction: React.FC<InlineActionProps> = ({
  to,
  href,
  children,
  emphasis = "default",
  className,
}) => {
  const classes = cn("solara-inline-action", `solara-inline-action--${emphasis}`, className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <span className={classes}>{children}</span>;
};

export default InlineAction;

