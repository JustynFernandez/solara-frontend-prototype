import { useMemo } from "react";
import { PANEL_SPECS, SYSTEM_SPECS, UK_ELECTRICITY_RATES, UK_CARBON, UK_REGIONS, BATTERY_SPECS, getOrientationFactor, getPitchFactor, } from "../../../data/configuratorDefaults";
export function calculateEnergyEstimate(params) {
    const { panelCount, orientation, pitchAngle, region = "london", batteryCount = 0 } = params;
    const batteryCapacityKwh = batteryCount * BATTERY_SPECS.capacityKwh;
    if (panelCount === 0) {
        return {
            panelCount: 0,
            systemSizeKw: 0,
            annualKwh: 0,
            annualSavingsGbp: 0,
            annualCo2Kg: 0,
            paybackYears: 0,
            lifetimeSavingsGbp: 0,
            selfConsumedKwh: 0,
            exportedKwh: 0,
            batteryCount,
            batteryCapacityKwh,
            selfConsumptionRate: UK_ELECTRICITY_RATES.selfConsumptionRatio,
        };
    }
    const regionData = UK_REGIONS[region];
    const systemSizeKw = (panelCount * PANEL_SPECS.wattage) / 1000;
    const orientationFactor = getOrientationFactor(orientation);
    const pitchFactor = getPitchFactor(pitchAngle);
    const systemEfficiency = SYSTEM_SPECS.inverterEfficiency * (1 - SYSTEM_SPECS.wiringLoss);
    const peakSunHours = regionData.irradiance / 1000;
    const annualKwh = systemSizeKw *
        peakSunHours *
        365 *
        (1 / 365) *
        orientationFactor *
        pitchFactor *
        systemEfficiency *
        1000;
    // Battery boosts self-consumption by allowing storage of excess generation
    const baseSelfConsumption = UK_ELECTRICITY_RATES.selfConsumptionRatio;
    const batteryBoost = batteryCount > 0
        ? batteryCount * BATTERY_SPECS.selfConsumptionBoost
        : 0;
    const selfConsumptionRate = Math.min(0.95, baseSelfConsumption + batteryBoost);
    const selfConsumedKwh = annualKwh * selfConsumptionRate;
    const exportedKwh = annualKwh * (1 - selfConsumptionRate);
    const annualSavingsGbp = selfConsumedKwh * UK_ELECTRICITY_RATES.gridRate +
        exportedKwh * UK_ELECTRICITY_RATES.exportRate;
    const annualCo2Kg = annualKwh * UK_CARBON.gridIntensity;
    const estimatedCostPerKw = 1200;
    const batteryCost = batteryCapacityKwh * BATTERY_SPECS.costPerKwh;
    const totalSystemCost = systemSizeKw * estimatedCostPerKw + batteryCost;
    const paybackYears = annualSavingsGbp > 0 ? totalSystemCost / annualSavingsGbp : 0;
    let lifetimeSavingsGbp = 0;
    for (let year = 0; year < SYSTEM_SPECS.systemLifeYears; year++) {
        const degradedOutput = Math.pow(1 - SYSTEM_SPECS.degradationPerYear, year);
        lifetimeSavingsGbp += annualSavingsGbp * degradedOutput;
    }
    return {
        panelCount,
        systemSizeKw: Math.round(systemSizeKw * 100) / 100,
        annualKwh: Math.round(annualKwh),
        annualSavingsGbp: Math.round(annualSavingsGbp),
        annualCo2Kg: Math.round(annualCo2Kg),
        paybackYears: Math.round(paybackYears * 10) / 10,
        lifetimeSavingsGbp: Math.round(lifetimeSavingsGbp),
        selfConsumedKwh: Math.round(selfConsumedKwh),
        exportedKwh: Math.round(exportedKwh),
        batteryCount,
        batteryCapacityKwh,
        selfConsumptionRate: Math.round(selfConsumptionRate * 100),
    };
}
export function useEnergyEstimate(params) {
    return useMemo(() => calculateEnergyEstimate(params), [params.panelCount, params.orientation, params.pitchAngle, params.region, params.batteryCount]);
}
