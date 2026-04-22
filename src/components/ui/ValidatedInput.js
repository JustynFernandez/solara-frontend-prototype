import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, AlertCircle } from "lucide-react";
const ValidatedInput = ({ id, label, value, onChange, onBlur, error, touched, placeholder, type = "text", required, disabled, className = "", autoComplete, }) => {
    const showError = touched && error;
    const showSuccess = touched && !error && value.length > 0;
    return (_jsxs("div", { className: `space-y-1 ${className}`, children: [_jsxs("label", { htmlFor: id, className: "block text-sm font-semibold text-slate-900 dark:text-white", children: [label, required && _jsx("span", { className: "ml-0.5 text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { id: id, type: type, value: value, onChange: (e) => onChange(e.target.value), onBlur: onBlur, placeholder: placeholder, disabled: disabled, autoComplete: autoComplete, className: `
            w-full rounded-xl border px-4 py-3 pr-10 text-sm transition-all
            focus:outline-none focus:ring-2
            disabled:cursor-not-allowed disabled:opacity-60
            ${showError
                            ? "border-red-400 bg-red-50 text-red-900 ring-red-200 dark:border-red-500 dark:bg-red-900/20 dark:text-red-200"
                            : showSuccess
                                ? "border-emerald-400 bg-emerald-50 ring-emerald-200 dark:border-emerald-500 dark:bg-emerald-900/20"
                                : "border-slate-200 bg-white ring-blue-500 dark:border-white/15 dark:bg-white/5"}
            text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500
          `, "aria-invalid": showError ? "true" : "false", "aria-describedby": showError ? `${id}-error` : undefined }), showSuccess && (_jsx(Check, { className: "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500" })), showError && (_jsx(AlertCircle, { className: "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" }))] }), showError && (_jsxs("p", { id: `${id}-error`, className: "flex items-center gap-1 text-xs text-red-600 dark:text-red-400", children: [_jsx(AlertCircle, { className: "h-3 w-3" }), error] }))] }));
};
export default ValidatedInput;
