import { useState, useEffect, useCallback } from "react";
export function useScrollSpy(sectionIds, options = {}) {
    const [activeId, setActiveId] = useState(null);
    const { rootMargin = "-20% 0px -60% 0px", threshold = 0 } = options;
    const handleIntersect = useCallback((entries) => {
        const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
        if (intersectingEntries.length > 0) {
            const sorted = intersectingEntries.sort((a, b) => {
                if (b.intersectionRatio !== a.intersectionRatio) {
                    return b.intersectionRatio - a.intersectionRatio;
                }
                return a.boundingClientRect.top - b.boundingClientRect.top;
            });
            setActiveId(sorted[0].target.id);
        }
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin,
            threshold,
        });
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });
        if (sectionIds.length > 0 && !activeId) {
            const firstElement = document.getElementById(sectionIds[0]);
            if (firstElement) {
                const rect = firstElement.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) {
                    setActiveId(sectionIds[0]);
                }
            }
        }
        return () => {
            observer.disconnect();
        };
    }, [sectionIds, rootMargin, threshold, handleIntersect, activeId]);
    return activeId;
}
export default useScrollSpy;
