import React from "react";
import { useConfiguratorStore } from "../hooks/useConfiguratorStore";
import FlatRoof from "./roofs/FlatRoof";
import GabledRoof from "./roofs/GabledRoof";
import HipRoof from "./roofs/HipRoof";

const RoofModel: React.FC = () => {
  const { roof } = useConfiguratorStore();

  const RoofComponent = {
    flat: FlatRoof,
    gabled: GabledRoof,
    hip: HipRoof,
  }[roof.type];

  return (
    <group rotation={[0, (roof.orientation * Math.PI) / 180, 0]}>
      <RoofComponent />
    </group>
  );
};

export default RoofModel;
