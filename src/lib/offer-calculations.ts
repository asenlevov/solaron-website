import { getIrradianceForCity } from '@/lib/electricity-prices';

export type Orientation = 'Юг' | 'Югоизток' | 'Югозапад' | 'Изток' | 'Запад' | 'Североизток' | 'Северозапад' | 'Север';

export const ORIENTATIONS: Orientation[] = [
  'Юг', 'Югоизток', 'Югозапад', 'Изток', 'Запад', 'Североизток', 'Северозапад', 'Север',
];

const ORIENTATION_FACTORS: Record<Orientation, number> = {
  'Юг': 1.0,
  'Югоизток': 0.95,
  'Югозапад': 0.95,
  'Изток': 0.85,
  'Запад': 0.85,
  'Североизток': 0.75,
  'Северозапад': 0.75,
  'Север': 0.65,
};

const TILT_BREAKPOINTS: [number, number][] = [
  [0, 0.87],
  [15, 0.95],
  [30, 1.0],
  [35, 1.0],
  [45, 0.97],
  [60, 0.90],
  [90, 0.70],
];

function interpolateTiltFactor(tiltDegrees: number): number {
  const clamped = Math.max(0, Math.min(90, tiltDegrees));

  for (let i = 0; i < TILT_BREAKPOINTS.length - 1; i++) {
    const [t0, f0] = TILT_BREAKPOINTS[i];
    const [t1, f1] = TILT_BREAKPOINTS[i + 1];
    if (clamped >= t0 && clamped <= t1) {
      const ratio = (clamped - t0) / (t1 - t0);
      return f0 + ratio * (f1 - f0);
    }
  }

  return TILT_BREAKPOINTS[TILT_BREAKPOINTS.length - 1][1];
}

export function calculateSystemPower(panelCount: number, panelWattage: number): number {
  return (panelCount * panelWattage) / 1000;
}

export function calculateAnnualProduction(
  kWp: number,
  city: string,
  orientation: string,
  tiltDegrees: number,
): number {
  const irradiance = getIrradianceForCity(city);
  const base = kWp * irradiance;
  const orientationFactor = ORIENTATION_FACTORS[orientation as Orientation] ?? 1.0;
  const tiltFactor = interpolateTiltFactor(tiltDegrees);
  return base * orientationFactor * tiltFactor;
}

export function calculateAnnualSavings(
  annualProductionKwh: number,
  electricityPrice: number,
  selfConsumptionRatio: number = 0.7,
): number {
  const selfConsumed = annualProductionKwh * selfConsumptionRatio * electricityPrice;
  const exported = annualProductionKwh * (1 - selfConsumptionRatio) * electricityPrice * 0.9;
  return selfConsumed + exported;
}

export function calculatePaybackYears(totalCost: number, annualSavings: number): number {
  if (annualSavings <= 0) return Infinity;
  return totalCost / annualSavings;
}

export function calculate25YearSavings(
  annualSavings: number,
  electricityPriceGrowthRate: number = 0.03,
  panelDegradationRate: number = 0.005,
): number {
  let total = 0;
  for (let year = 1; year <= 25; year++) {
    total +=
      annualSavings *
      Math.pow(1 + electricityPriceGrowthRate, year - 1) *
      Math.pow(1 - panelDegradationRate, year - 1);
  }
  return total;
}

export function calculate25YearProjection(
  systemCost: number,
  annualSavings: number,
  electricityPriceGrowthRate: number = 0.03,
  panelDegradationRate: number = 0.005,
): Array<{ year: number; annualSavings: number; cumulativeSavings: number; netSavings: number }> {
  const projection: Array<{ year: number; annualSavings: number; cumulativeSavings: number; netSavings: number }> = [];
  let cumulative = 0;

  for (let year = 1; year <= 25; year++) {
    const yearSavings =
      annualSavings *
      Math.pow(1 + electricityPriceGrowthRate, year - 1) *
      Math.pow(1 - panelDegradationRate, year - 1);
    cumulative += yearSavings;
    projection.push({
      year,
      annualSavings: yearSavings,
      cumulativeSavings: cumulative,
      netSavings: cumulative - systemCost,
    });
  }

  return projection;
}

export function calculateVAT(
  subtotal: number,
  vatRatePercent: number,
): { subtotal: number; vat: number; total: number } {
  const vat = subtotal * (vatRatePercent / 100);
  return {
    subtotal,
    vat,
    total: subtotal + vat,
  };
}

export function calculatePriceBreakdown(
  prices: { panels: number; inverter: number; battery: number; mounting: number; installation: number; other?: number },
): Array<{ label: string; amount: number; percentage: number }> {
  const entries: Array<{ label: string; amount: number }> = [
    { label: 'Панели', amount: prices.panels },
    { label: 'Инвертор', amount: prices.inverter },
    { label: 'Батерия', amount: prices.battery },
    { label: 'Монтажна конструкция', amount: prices.mounting },
    { label: 'Монтаж', amount: prices.installation },
  ];

  if (prices.other && prices.other > 0) {
    entries.push({ label: 'Други', amount: prices.other });
  }

  const total = entries.reduce((sum, e) => sum + e.amount, 0);

  return entries.map((e) => ({
    label: e.label,
    amount: e.amount,
    percentage: total > 0 ? (e.amount / total) * 100 : 0,
  }));
}

export function calculateBillComparison(
  currentMonthlyBill: number,
  annualSavings: number,
): { currentMonthly: number; newMonthly: number; monthlySavings: number; annualSavings: number; savings25Year: number } {
  const monthlySavings = annualSavings / 12;
  const newMonthly = Math.max(0, currentMonthlyBill - monthlySavings);

  return {
    currentMonthly: currentMonthlyBill,
    newMonthly,
    monthlySavings: currentMonthlyBill - newMonthly,
    annualSavings,
    savings25Year: calculate25YearSavings(annualSavings),
  };
}

export function calculateCO2Savings(annualProductionKwh: number): {
  co2SavedKg: number;
  treesEquivalent: number;
} {
  const co2SavedKg = annualProductionKwh * 0.4;
  return {
    co2SavedKg,
    treesEquivalent: co2SavedKg / 22,
  };
}
