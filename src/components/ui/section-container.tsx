import React from "react";

type SectionContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const SectionContainer: React.FC<SectionContainerProps> = ({ className = "", children }) => (
  <section className={`mx-auto max-w-7xl px-6 sm:px-12 ${className}`}>{children}</section>
);

export default SectionContainer;
