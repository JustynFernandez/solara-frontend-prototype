import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from "react";
const HelperAvatar = ({ name, src, className = "", style }) => {
    const [errored, setErrored] = useState(false);
    const initials = useMemo(() => name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(), [name]);
    return (_jsx("span", { className: className.trim(), "aria-label": name, style: style, children: src && !errored ? (_jsx("img", { src: src, alt: `${name} avatar`, className: "h-full w-full object-cover", onError: () => setErrored(true) })) : (initials) }));
};
export default HelperAvatar;
