const DEFAULT_PANEL_WATTAGE = 450;
const DEFAULT_IRRADIANCE_FACTOR = 1300;
const DEFAULT_ELECTRICITY_PRICE = 0.25;
const PANEL_UNIT_COST_BGN = 1200;
const BATTERY_COST_PER_KWH_BGN = 800;
const CO2_KG_PER_KWH = 0.4;
const TREE_CO2_KG_PER_YEAR = 22;
const HOME_KWH_PER_YEAR = 4000;

export type YearProjection = {
  year: number;
  cumulativeSavings: number;
  netSavings: number;
};

export type EnvironmentalImpact = {
  co2Saved: number;
  treeEquivalent: number;
  homesPowered: number;
};

export function calculateAnnualProduction(
  panelCount: number,
  panelWattage: number = DEFAULT_PANEL_WATTAGE,
  irradianceFactor: number = DEFAULT_IRRADIANCE_FACTOR,
): number {
  return panelCount * (panelWattage / 1000) * irradianceFactor;
}

export function calculateAnnualSavings(
  annualProduction: number,
  electricityPrice: number = DEFAULT_ELECTRICITY_PRICE,
): number {
  return annualProduction * electricityPrice;
}

export function calculateSystemCost(
  panelCount: number,
  hasBattery: boolean,
  batteryCapacity: number = 0,
): number {
  const panels = panelCount * PANEL_UNIT_COST_BGN;
  const battery =
    hasBattery && batteryCapacity > 0
      ? batteryCapacity * BATTERY_COST_PER_KWH_BGN
      : 0;
  return panels + battery;
}

export function calculatePaybackPeriod(
  systemCost: number,
  annualSavings: number,
): number {
  if (annualSavings <= 0) return Number.POSITIVE_INFINITY;
  return systemCost / annualSavings;
}

export function calculate25YearProjection(
  systemCost: number,
  annualSavings: number,
  electricityPriceGrowth: number = 0.03,
): YearProjection[] {
  const rows: YearProjection[] = [];
  let cumulative = 0;
  for (let year = 1; year <= 25; year++) {
    const yearSavings = annualSavings * (1 + electricityPriceGrowth) ** (year - 1);
    cumulative += yearSavings;
    rows.push({
      year,
      cumulativeSavings: cumulative,
      netSavings: cumulative - systemCost,
    });
  }
  return rows;
}

export function calculateEnvironmentalImpact(
  annualProduction: number,
): EnvironmentalImpact {
  const co2Saved = annualProduction * CO2_KG_PER_KWH;
  return {
    co2Saved,
    treeEquivalent: co2Saved / TREE_CO2_KG_PER_YEAR,
    homesPowered: annualProduction / HOME_KWH_PER_YEAR,
  };
}
