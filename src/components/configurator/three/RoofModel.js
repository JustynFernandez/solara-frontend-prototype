import { jsx as _jsx } from "react/jsx-runtime";
import { useConfiguratorStore } from "../hooks/useConfiguratorStore";
import FlatRoof from "./roofs/FlatRoof";
import GabledRoof from "./roofs/GabledRoof";
import HipRoof from "./roofs/HipRoof";
const RoofModel = () => {
    const { roof } = useConfiguratorStore();
    const RoofComponent = {
        flat: FlatRoof,
        gabled: GabledRoof,
        hip: HipRoof,
    }[roof.type];
    return (_jsx("group", { rotation: [0, (roof.orientation * Math.PI) / 180, 0], children: _jsx(RoofComponent, {}) }));
};
export default RoofModel;
