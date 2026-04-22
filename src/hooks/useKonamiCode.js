import { useState, useEffect, useCallback } from "react";
const KONAMI_SEQUENCE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];
export const useKonamiCode = (callback) => {
    const [index, setIndex] = useState(0);
    const handleKeyDown = useCallback((event) => {
        const key = event.key;
        const expectedKey = KONAMI_SEQUENCE[index];
        if (key === expectedKey) {
            const nextIndex = index + 1;
            if (nextIndex === KONAMI_SEQUENCE.length) {
                setIndex(0);
                callback();
            }
            else {
                setIndex(nextIndex);
            }
        }
        else {
            setIndex(0);
        }
    }, [index, callback]);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);
};
export default useKonamiCode;
