import React from "react";

type TableOfContentsProps = {
  items: { id: string; label: string }[];
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => (
  <nav className="sticky top-24 space-y-3 rounded-2xl card-surface p-4 text-sm text-slate-800 dark:text-white">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Contents</p>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="text-slate-800 transition hover:text-[#0f62c7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7] dark:text-slate-100 dark:hover:text-white"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default TableOfContents;
