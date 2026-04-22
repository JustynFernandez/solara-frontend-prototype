import { useEffect, useMemo, useState } from "react";
export const useEcoMode = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [lowBattery, setLowBattery] = useState(false);
    const [batterySupported, setBatterySupported] = useState(false);
    const [manualOverride, setManualOverride] = useState(() => {
        if (typeof window === "undefined")
            return null;
        const stored = localStorage.getItem("solara:eco-mode");
        return stored === null ? null : stored === "true";
    });
    useEffect(() => {
        if (typeof window === "undefined")
            return undefined;
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);
        const handleChange = (event) => setPrefersReducedMotion(event.matches);
        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleChange);
        }
        else {
            // @ts-expect-error older Safari fallback
            mediaQuery.addListener(handleChange);
        }
        return () => {
            if (typeof mediaQuery.removeEventListener === "function") {
                mediaQuery.removeEventListener("change", handleChange);
            }
            else {
                // @ts-expect-error older Safari fallback
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);
    useEffect(() => {
        if (typeof navigator === "undefined" || typeof navigator.getBattery !== "function")
            return undefined;
        let batteryRef;
        let isCancelled = false;
        let removeBatteryListeners;
        navigator
            .getBattery()
            .then((battery) => {
            if (isCancelled)
                return;
            batteryRef = battery;
            setBatterySupported(true);
            const updateBattery = () => {
                setLowBattery(battery.level <= 0.25 || (!battery.charging && battery.level <= 0.3));
            };
            updateBattery();
            battery.addEventListener("levelchange", updateBattery);
            battery.addEventListener("chargingchange", updateBattery);
            removeBatteryListeners = () => {
                battery.removeEventListener("levelchange", updateBattery);
                battery.removeEventListener("chargingchange", updateBattery);
            };
        })
            .catch(() => {
            setBatterySupported(false);
        });
        return () => {
            isCancelled = true;
            removeBatteryListeners?.();
        };
    }, []);
    const isLowEndDevice = useMemo(() => {
        if (typeof navigator === "undefined")
            return false;
        const cores = navigator.hardwareConcurrency || 0;
        const memory = navigator.deviceMemory || 0;
        return (cores > 0 && cores <= 4) || (memory > 0 && memory <= 4);
    }, []);
    const autoEco = prefersReducedMotion || lowBattery;
    const ecoModeEnabled = manualOverride ?? autoEco;
    const toggleEcoMode = () => {
        setManualOverride((previous) => {
            const next = !(previous ?? ecoModeEnabled);
            if (typeof window !== "undefined") {
                localStorage.setItem("solara:eco-mode", String(next));
            }
            return next;
        });
    };
    const resetEcoMode = () => {
        setManualOverride(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("solara:eco-mode");
        }
    };
    return { ecoModeEnabled, prefersReducedMotion, lowBattery, isLowEndDevice, manualOverride, batterySupported, toggleEcoMode, resetEcoMode };
};
