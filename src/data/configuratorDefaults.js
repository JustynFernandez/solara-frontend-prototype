export const UK_REGIONS = {
    scotland: { name: "Scotland", irradiance: 900, latitude: 56.0 },
    north: { name: "North England", irradiance: 950, latitude: 54.0 },
    midlands: { name: "Midlands", irradiance: 1000, latitude: 52.5 },
    south: { name: "South England", irradiance: 1100, latitude: 51.0 },
    wales: { name: "Wales", irradiance: 1000, latitude: 52.0 },
    london: { name: "London", irradiance: 1050, latitude: 51.5 },
};
export const PANEL_SPECS = {
    width: 1.0,
    height: 1.7,
    thickness: 0.04,
    wattage: 400,
    efficiency: 0.21,
};
export const SYSTEM_SPECS = {
    inverterEfficiency: 0.96,
    wiringLoss: 0.02,
    degradationPerYear: 0.005,
    systemLifeYears: 25,
};
export const UK_ELECTRICITY_RATES = {
    gridRate: 0.245,
    exportRate: 0.05,
    selfConsumptionRatio: 0.5,
};
export const UK_CARBON = {
    gridIntensity: 0.233,
};
export const ORIENTATION_FACTORS = {
    0: 0.55,
    45: 0.75,
    90: 0.85,
    135: 0.95,
    180: 1.0,
    225: 0.95,
    270: 0.85,
    315: 0.75,
};
export const PITCH_FACTORS = {
    0: 0.87,
    15: 0.95,
    30: 1.0,
    35: 1.0,
    45: 0.97,
    60: 0.88,
    90: 0.55,
};
export function getOrientationFactor(degrees) {
    const normalized = ((degrees % 360) + 360) % 360;
    const keys = Object.keys(ORIENTATION_FACTORS).map(Number).sort((a, b) => a - b);
    for (let i = 0; i < keys.length - 1; i++) {
        if (normalized >= keys[i] && normalized < keys[i + 1]) {
            const ratio = (normalized - keys[i]) / (keys[i + 1] - keys[i]);
            return (ORIENTATION_FACTORS[keys[i]] * (1 - ratio) +
                ORIENTATION_FACTORS[keys[i + 1]] * ratio);
        }
    }
    return ORIENTATION_FACTORS[180];
}
export function getPitchFactor(degrees) {
    const clamped = Math.max(0, Math.min(90, degrees));
    const keys = Object.keys(PITCH_FACTORS).map(Number).sort((a, b) => a - b);
    for (let i = 0; i < keys.length - 1; i++) {
        if (clamped >= keys[i] && clamped <= keys[i + 1]) {
            const ratio = (clamped - keys[i]) / (keys[i + 1] - keys[i]);
            return (PITCH_FACTORS[keys[i]] * (1 - ratio) +
                PITCH_FACTORS[keys[i + 1]] * ratio);
        }
    }
    return PITCH_FACTORS[30];
}
export const ROOF_PRESETS = {
    flat: {
        label: "Flat Roof",
        description: "Level surface, common on extensions and modern builds",
        pitchAngle: 0,
        icon: "square",
    },
    gabled: {
        label: "Pitched Roof",
        description: "Traditional angled roof with two slopes",
        pitchAngle: 30,
        icon: "triangle",
    },
    hip: {
        label: "Hip Roof",
        description: "Four-sided sloped roof, common on UK homes",
        pitchAngle: 30,
        icon: "home",
    },
};
export const BATTERY_SPECS = {
    capacityKwh: 10,
    width: 0.6,
    height: 1.2,
    depth: 0.15,
    efficiency: 0.9,
    selfConsumptionBoost: 0.25,
    costPerKwh: 400,
};
export const OBSTACLE_SPECS = {
    chimney: {
        width: 0.6,
        depth: 0.6,
        height: 0.8,
        clearance: 0.5,
        label: "Chimney",
    },
    skylight: {
        width: 0.8,
        depth: 1.2,
        height: 0.1,
        clearance: 0.3,
        label: "Skylight",
    },
    vent: {
        width: 0.3,
        depth: 0.3,
        height: 0.25,
        clearance: 0.2,
        label: "Vent Pipe",
    },
};
export const PANEL_PRESETS = {
    "3x4": { rows: 3, cols: 4, label: "3x4 Grid", panels: 12 },
    "2x6": { rows: 2, cols: 6, label: "2x6 Grid", panels: 12 },
    "4x4": { rows: 4, cols: 4, label: "4x4 Grid", panels: 16 },
    "l-shape": { rows: 0, cols: 0, label: "L-Shape", panels: 8 },
    fill: { rows: 0, cols: 0, label: "Fill Roof", panels: 0 },
};
export const MONTHS = [
    { value: 1, label: "January", dayOfYear: 15 },
    { value: 2, label: "February", dayOfYear: 46 },
    { value: 3, label: "March", dayOfYear: 75 },
    { value: 4, label: "April", dayOfYear: 106 },
    { value: 5, label: "May", dayOfYear: 136 },
    { value: 6, label: "June", dayOfYear: 167 },
    { value: 7, label: "July", dayOfYear: 197 },
    { value: 8, label: "August", dayOfYear: 228 },
    { value: 9, label: "September", dayOfYear: 259 },
    { value: 10, label: "October", dayOfYear: 289 },
    { value: 11, label: "November", dayOfYear: 320 },
    { value: 12, label: "December", dayOfYear: 350 },
];
export function getDayOfYear(month) {
    const found = MONTHS.find((m) => m.value === month);
    return found ? found.dayOfYear : 167;
}
