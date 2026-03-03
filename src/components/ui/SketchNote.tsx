import React from "react";

type SketchNoteProps = {
  text: string;
  tone?: "blue" | "gold" | "mint";
  arrow?: "right" | "left" | "down";
  className?: string;
};

const SketchNote: React.FC<SketchNoteProps> = ({ text, tone = "blue", arrow = "right", className = "" }) => {
  const arrowClass = `handmade-arrow ${arrow !== "right" ? `handmade-arrow--${arrow}` : ""}`.trim();
  return (
    <span className={`solara-note solara-note--${tone} ${className}`.trim()}>
      <span>{text}</span>
      <span className={arrowClass} aria-hidden />
    </span>
  );
};

export default SketchNote;
