import React from "react";

const FilterDropdown = ({ categories, value, onChange }) => (
  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
    Category
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </label>
);

export default FilterDropdown;
