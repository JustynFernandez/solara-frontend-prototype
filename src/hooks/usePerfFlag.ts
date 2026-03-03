import { useEffect, useState } from "react";

export const usePerfFlag = () => {
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const root = document.documentElement;
    const update = () => setIsLowPerf(root.getAttribute("data-perf") === "low");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-perf"] });
    return () => observer.disconnect();
  }, []);

  return isLowPerf;
};
