import React from "react";

const TooltipCard = ({ title, description }) => (
  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 opacity-0 shadow-xl transition duration-200 peer-hover:opacity-100">
    <div className="font-semibold text-slate-900">{title}</div>
    <div className="mt-1 leading-relaxed">{description}</div>
  </div>
);

export default TooltipCard;
