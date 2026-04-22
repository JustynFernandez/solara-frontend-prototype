import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
const SubmitButton = ({ children, disabled, loading, loadingText, disabledReason, onClick, type = "submit", variant = "primary", className = "", }) => {
    const isDisabled = disabled || loading;
    const variantStyles = {
        primary: "bg-button-primary text-white shadow-md hover:shadow-lg focus-visible:ring-solara-blue",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600",
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("button", { type: type, onClick: onClick, disabled: isDisabled, "aria-busy": loading, className: `
          inline-flex w-full items-center justify-center gap-2 rounded-full
          px-5 py-3 text-sm font-semibold
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
          ${!isDisabled ? "hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]" : ""}
          ${variantStyles[variant]}
          ${className}
        `, "aria-describedby": isDisabled && disabledReason ? "submit-reason" : undefined, children: [loading && _jsx(Loader2, { className: "h-4 w-4 animate-spin" }), loading && loadingText ? loadingText : children] }), isDisabled && disabledReason && !loading && (_jsx("p", { id: "submit-reason", className: "text-center text-xs text-slate-500 dark:text-slate-400", children: disabledReason }))] }));
};
export default SubmitButton;
