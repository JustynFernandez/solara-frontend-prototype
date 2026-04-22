import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const FooterNewsletter = ({ className = "" }) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim())
            return;
        setStatus("loading");
        setTimeout(() => {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 2500);
        }, 900);
    };
    return (_jsx("div", { className: `solara-footer__newsletter ${className}`, children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Get product updates" }), _jsx("p", { className: "text-sm", children: "New guides, project calls, and major product changes. One short note when there is something worth sending." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), placeholder: "you@example.com", required: true, disabled: status === "loading", className: "solara-footer__newsletter-input w-full rounded-md border px-4 py-3 text-sm outline-none transition disabled:opacity-60" }), _jsx("button", { type: "submit", disabled: status === "loading" || status === "success", className: "solara-footer__newsletter-button inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition disabled:opacity-60", children: status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join update list" })] }), _jsx("p", { className: "text-xs", children: "Unsubscribe any time." })] }) }));
};
export default FooterNewsletter;
