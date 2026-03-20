export const BULGARIA_ELECTRICITY_PRICE = 0.25;

export const CITY_IRRADIANCE: Record<string, number> = {
  София: 1250,
  Пловдив: 1350,
  Варна: 1300,
  Бургас: 1350,
  Русе: 1250,
  "Стара Загора": 1350,
  Плевен: 1250,
  Казанлък: 1300,
  Благоевград: 1300,
  Враца: 1200,
  Ямбол: 1350,
  "Златни Пясъци": 1300,
};

const DEFAULT_IRRADIANCE = 1300;

export function getElectricityPrice(): number {
  return BULGARIA_ELECTRICITY_PRICE;
}

export function getIrradianceForCity(city: string): number {
  return CITY_IRRADIANCE[city] ?? DEFAULT_IRRADIANCE;
}
