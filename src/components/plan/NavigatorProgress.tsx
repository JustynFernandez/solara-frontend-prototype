import React from "react";

type Props = {
  current: number;
  total: number;
};

const NavigatorProgress: React.FC<Props> = ({ current, total }) => {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#c7d2fe]">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-[#003366] via-[#0b4fbf] to-[#ffd700] transition-all" style={{ width: `${pct}%` }} aria-hidden />
      </div>
    </div>
  );
};

export default NavigatorProgress;
