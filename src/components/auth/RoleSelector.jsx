import React from "react";

const roles = ["Helper", "Seeker", "Both"];

const RoleSelector = ({ value, onChange }) => (
  <div className="space-y-2">
    <p className="text-sm font-semibold text-slate-800">Choose your role</p>
    <div className="flex flex-wrap gap-3">
      {roles.map((role) => {
        const active = value.includes(role);
        return (
          <button
            type="button"
            key={role}
            onClick={() => {
              if (role === "Both") {
                onChange(["Helper", "Seeker"]);
                return;
              }
              const next = active ? value.filter((r) => r !== role) : [...value, role];
              onChange(next);
            }}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              active
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
            }`}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            {role}
          </button>
        );
      })}
    </div>
  </div>
);

export default RoleSelector;
