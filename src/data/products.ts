export type PanelBrand = {
  id: string;
  name: string;
  tech: string;
  badge: string;
  efficiency: number;
  wattage: number;
  warrantyProduct: number;
  warrantyPerformance: number;
  degradation: number;
  strengths: string[];
};

export type InverterModel = {
  id: string;
  brand: 'solaredge' | 'kstar' | 'deye';
  brandName: string;
  model: string;
  powerKw: number;
  efficiency: number;
  weight: string;
  phases: 1 | 3;
  type: 'string' | 'hybrid';
  warrantyYears: number;
  monitoringPlatform: string;
};

export type BatteryModel = {
  id: string;
  brand: 'kstar' | 'pylontech' | 'cnte';
  brandName: string;
  capacityKwh: { min: number; max: number };
  chemistry: string;
  cycles: number;
  warrantyYears: number;
  useCase: 'residential' | 'commercial' | 'both';
};

export type MountingType = {
  id: 'roof' | 'ground' | 'carport' | 'facade';
  label: string;
  brands: string[];
  warrantyYears: number;
};

export type MonitoringPlatform = {
  brand: string;
  platform: string;
  panelLevel: boolean;
  refreshRate: string;
  dataRetention: string;
};

export type EvChargerTier = {
  id: string;
  powerKw: number;
  phases: 1 | 3;
  useCase: string;
};

export const panels: PanelBrand[] = [
  {
    id: 'sunport-mwt-450',
    name: 'Sunport Power',
    tech: 'MWT (Metal Wrap Through)',
    badge: 'Без микропукнатини',
    efficiency: 21.5,
    wattage: 450,
    warrantyProduct: 12,
    warrantyPerformance: 30,
    degradation: 0.4,
    strengths: ['Без лицеви шини', 'IP68 съединителна кутия', 'Бифасиален дизайн', '0.4% годишна деградация'],
  },
  {
    id: 'dmegc-550',
    name: 'DMEGC',
    tech: 'Tier-1 Mono PERC',
    badge: 'Tier-1 бранд',
    efficiency: 21.0,
    wattage: 550,
    warrantyProduct: 12,
    warrantyPerformance: 25,
    degradation: 0.5,
    strengths: ['Tier-1 по BNEF', 'Много добро съотношение цена/качество', 'Доказана производителност', 'Глобална гаранция'],
  },
  {
    id: 'aiko-abc-460',
    name: 'AIKO',
    tech: 'ABC (All Back Contact)',
    badge: 'Много високо качество',
    efficiency: 23.6,
    wattage: 460,
    warrantyProduct: 15,
    warrantyPerformance: 30,
    degradation: 0.35,
    strengths: ['Без лицеви метални контакти', 'Рекордна ефективност', 'По-висока мощност/m²', 'Отлична работа при слаба светлина'],
  },
  {
    id: 'tenka-abc-580',
    name: 'TENKA SOLAR',
    tech: 'ABC, Стъкло-Стъкло',
    badge: '24% КПД — рекорд',
    efficiency: 24.0,
    wattage: 580,
    warrantyProduct: 15,
    warrantyPerformance: 30,
    degradation: 0.3,
    strengths: ['Първият панел с 24% КПД', 'Стъкло-стъкло конструкция', 'ABC технология', 'Максимална дълготрайност'],
  },
];

export const inverters: InverterModel[] = [
  { id: 'se3000h', brand: 'solaredge', brandName: 'SolarEdge', model: 'SE3000H', powerKw: 3, efficiency: 99.2, weight: '9.5kg', phases: 1, type: 'string', warrantyYears: 12, monitoringPlatform: 'MySolarEdge' },
  { id: 'se5000h', brand: 'solaredge', brandName: 'SolarEdge', model: 'SE5000H', powerKw: 5, efficiency: 99.2, weight: '9.5kg', phases: 1, type: 'string', warrantyYears: 12, monitoringPlatform: 'MySolarEdge' },
  { id: 'se6000h', brand: 'solaredge', brandName: 'SolarEdge', model: 'SE6000H', powerKw: 6, efficiency: 99.2, weight: '9.5kg', phases: 1, type: 'string', warrantyYears: 12, monitoringPlatform: 'MySolarEdge' },
  { id: 'se8k', brand: 'solaredge', brandName: 'SolarEdge', model: 'SE8K', powerKw: 8, efficiency: 99.0, weight: '15.2kg', phases: 3, type: 'string', warrantyYears: 12, monitoringPlatform: 'MySolarEdge' },
  { id: 'se10k', brand: 'solaredge', brandName: 'SolarEdge', model: 'SE10K', powerKw: 10, efficiency: 99.0, weight: '15.2kg', phases: 3, type: 'string', warrantyYears: 12, monitoringPlatform: 'MySolarEdge' },

  { id: 'kstar-blue-s-3680d', brand: 'kstar', brandName: 'Kstar', model: 'BluE-S 3680D', powerKw: 3.68, efficiency: 97.6, weight: '28kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN' },
  { id: 'kstar-blue-s-5000d', brand: 'kstar', brandName: 'Kstar', model: 'BluE-S 5000D', powerKw: 5, efficiency: 97.6, weight: '28kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN' },
  { id: 'kstar-blue-s-6000d', brand: 'kstar', brandName: 'Kstar', model: 'BluE-S 6000D', powerKw: 6, efficiency: 97.6, weight: '30kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN' },
  { id: 'kstar-blue-e8kt', brand: 'kstar', brandName: 'Kstar', model: 'BluE-E8KT', powerKw: 8, efficiency: 97.5, weight: '35kg', phases: 3, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN' },
  { id: 'kstar-blue-e10kt', brand: 'kstar', brandName: 'Kstar', model: 'BluE-E10KT', powerKw: 10, efficiency: 97.5, weight: '37kg', phases: 3, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN' },
  { id: 'kstar-blue-e12kt', brand: 'kstar', brandName: 'Kstar', model: 'BluE-E12KT', powerKw: 12, efficiency: 97.5, weight: '40kg', phases: 3, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN' },

  { id: 'deye-sun-3k-sg', brand: 'deye', brandName: 'Deye', model: 'SUN-3K-SG', powerKw: 3, efficiency: 97.0, weight: '24kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN / Deye Cloud' },
  { id: 'deye-sun-5k-sg05lp1', brand: 'deye', brandName: 'Deye', model: 'SUN-5K-SG05LP1', powerKw: 5, efficiency: 97.6, weight: '26kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN / Deye Cloud' },
  { id: 'deye-sun-6k-sg05lp1', brand: 'deye', brandName: 'Deye', model: 'SUN-6K-SG05LP1', powerKw: 6, efficiency: 97.6, weight: '26kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN / Deye Cloud' },
  { id: 'deye-sun-8k-sg', brand: 'deye', brandName: 'Deye', model: 'SUN-8K-SG', powerKw: 8, efficiency: 97.5, weight: '30kg', phases: 1, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN / Deye Cloud' },
  { id: 'deye-sun-12k-sg04lp3', brand: 'deye', brandName: 'Deye', model: 'SUN-12K-SG04LP3', powerKw: 12, efficiency: 97.5, weight: '32kg', phases: 3, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN / Deye Cloud' },
  { id: 'deye-sun-50k-sg01hp3', brand: 'deye', brandName: 'Deye', model: 'SUN-50K-SG01HP3', powerKw: 50, efficiency: 98.4, weight: '56kg', phases: 3, type: 'hybrid', warrantyYears: 10, monitoringPlatform: 'SOLARMAN / Deye Cloud' },
];

export const batteries: BatteryModel[] = [
  { id: 'kstar-blue-s', brand: 'kstar', brandName: 'Kstar', capacityKwh: { min: 5.1, max: 20.4 }, chemistry: 'CATL LFP', cycles: 10000, warrantyYears: 10, useCase: 'residential' },
  { id: 'pylontech', brand: 'pylontech', brandName: 'Pylontech', capacityKwh: { min: 2.4, max: 14.4 }, chemistry: 'LFP', cycles: 6000, warrantyYears: 10, useCase: 'residential' },
  { id: 'cnte-star-h', brand: 'cnte', brandName: 'CNTE', capacityKwh: { min: 100, max: 372 }, chemistry: 'LFP', cycles: 8000, warrantyYears: 10, useCase: 'commercial' },
];

export const mountingTypes: MountingType[] = [
  { id: 'roof', label: 'Покрив', brands: ['Van Der Valk', 'Sunbeam'], warrantyYears: 20 },
  { id: 'ground', label: 'Земя', brands: ['Van Der Valk', 'Sunbeam'], warrantyYears: 20 },
  { id: 'carport', label: 'Карпорт', brands: ['Van Der Valk'], warrantyYears: 20 },
  { id: 'facade', label: 'Фасада', brands: ['Sunbeam'], warrantyYears: 15 },
];

export const monitoringPlatforms: MonitoringPlatform[] = [
  { brand: 'SolarEdge', platform: 'MySolarEdge / mySolarEdge App', panelLevel: true, refreshRate: '15 секунди', dataRetention: '25 години' },
  { brand: 'Kstar', platform: 'SOLARMAN App', panelLevel: false, refreshRate: '5 минути', dataRetention: '10 години' },
  { brand: 'Deye', platform: 'SOLARMAN / Deye Cloud', panelLevel: false, refreshRate: '5 минути', dataRetention: '10 години' },
];

export const evChargerTiers: EvChargerTier[] = [
  { id: 'ev-7kw', powerKw: 7, phases: 1, useCase: 'Домашно зареждане' },
  { id: 'ev-11kw', powerKw: 11, phases: 3, useCase: 'Домашно / Бизнес' },
  { id: 'ev-22kw', powerKw: 22, phases: 3, useCase: 'Бизнес / Обществено' },
];

export function getPanelById(id: string): PanelBrand | undefined {
  return panels.find((p) => p.id === id);
}

export function getInverterById(id: string): InverterModel | undefined {
  return inverters.find((i) => i.id === id);
}

export function getInvertersByBrand(brand: string): InverterModel[] {
  return inverters.filter((i) => i.brand === brand);
}

export function getBatteryById(id: string): BatteryModel | undefined {
  return batteries.find((b) => b.id === id);
}

export function getMonitoringForBrand(inverterBrand: string): MonitoringPlatform | undefined {
  const brandMap: Record<string, string> = {
    solaredge: 'SolarEdge',
    kstar: 'Kstar',
    deye: 'Deye',
  };
  const displayName = brandMap[inverterBrand.toLowerCase()] ?? inverterBrand;
  return monitoringPlatforms.find((m) => m.brand.toLowerCase() === displayName.toLowerCase());
}
