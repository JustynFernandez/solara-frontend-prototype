import React, { useMemo, useState } from "react";

type Props = {
  name: string;
  src?: string;
  className?: string;
  style?: React.CSSProperties;
};

const HelperAvatar: React.FC<Props> = ({ name, src, className = "", style }) => {
  const [errored, setErrored] = useState(false);
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [name]
  );

  return (
    <span className={className.trim()} aria-label={name} style={style}>
      {src && !errored ? (
        <img src={src} alt={`${name} avatar`} className="h-full w-full object-cover" onError={() => setErrored(true)} />
      ) : (
        initials
      )}
    </span>
  );
};

export default HelperAvatar;
