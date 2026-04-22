import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HelperAvatar from "./HelperAvatar";
const HelperRosterRibbon = ({ helpers, note }) => (_jsxs("div", { className: "solara-helper-roster", children: [_jsx("div", { className: "solara-helper-roster__avatars", "aria-label": "Verified helper roster", children: helpers.map((helper, index) => (_jsx(HelperAvatar, { name: helper.name, src: helper.avatar, className: "solara-helper-roster__avatar", style: { zIndex: helpers.length - index } }, helper.id))) }), _jsx("p", { className: "solara-helper-roster__note", children: note })] }));
export default HelperRosterRibbon;
