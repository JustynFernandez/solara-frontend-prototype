import React from "react";
import type { Helper } from "@/data/helpers";
import HelperAvatar from "./HelperAvatar";

type Props = {
  helpers: Helper[];
  note: string;
};

const HelperRosterRibbon: React.FC<Props> = ({ helpers, note }) => (
  <div className="solara-helper-roster">
    <div className="solara-helper-roster__avatars" aria-label="Verified helper roster">
      {helpers.map((helper, index) => (
        <HelperAvatar
          key={helper.id}
          name={helper.name}
          src={helper.avatar}
          className="solara-helper-roster__avatar"
          style={{ zIndex: helpers.length - index } as React.CSSProperties}
        />
      ))}
    </div>
    <p className="solara-helper-roster__note">{note}</p>
  </div>
);

export default HelperRosterRibbon;
