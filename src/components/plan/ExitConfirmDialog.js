import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AnimatedButton from "../ui/animated-button";
const ExitConfirmDialog = ({ open, onCancel, onConfirm }) => {
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-[#0a0f1e] p-5 text-white shadow-[0_22px_80px_rgba(0,0,0,0.45)]", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-lg font-semibold", children: "Exit Solar Navigator?" }), _jsx("p", { className: "text-sm text-slate-200/80", children: "Progress is saved. You can resume later." })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(AnimatedButton, { variant: "outline", onClick: onCancel, className: "px-4 py-2", children: "Stay" }), _jsx(AnimatedButton, { onClick: onConfirm, className: "px-4 py-2", children: "Exit" })] })] }) }));
};
export default ExitConfirmDialog;
