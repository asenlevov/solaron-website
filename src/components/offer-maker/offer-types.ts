import type { MountingType } from "@/data/products";
import { getPanelById, getInverterById, getBatteryById } from "@/data/products";
import type { Orientation } from "@/lib/offer-calculations";

export type OfferType = "home" | "business" | "agriculture";

export interface CustomPanel {
  name: string;
  wattage: number;
  efficiency: number;
  warrantyProduct: number;
  warrantyPerformance: number;
  degradation: number;
}

export interface CustomInverter {
  brand: string;
  model: string;
  powerKw: number;
  efficiency: number;
  phases: 1 | 3;
  warrantyYears: number;
  monitoringPlatform: string;
}

export interface CustomBattery {
  brand: string;
  capacityKwh: number;
  chemistry: string;
  warrantyYears: number;
}

export interface ClientInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface ConsultantInfo {
  name: string;
  phone: string;
  email: string;
  initials: string;
}

export interface OfferMeta {
  number: string;
  date: string;
  validUntil: string;
}

export interface SystemConfig {
  panelId: string;
  panelCount: number;
  customPanel: CustomPanel;
  inverterId: string;
  inverterCount: number;
  customInverter: CustomInverter;
  hasBattery: boolean;
  batteryId: string;
  batteryCount: number;
  customBattery: CustomBattery;
  mountingType: MountingType["id"];
  smartMeterCount: number;
  hasEvCharger: boolean;
  evChargerId: string;
}

export interface SiteDetails {
  currentMonthlyBill: number;
  roofArea: number;
  orientation: Orientation;
  tiltDegrees: number;
  city: string;
}

export interface PricingConfig {
  panels: number;
  inverter: number;
  battery: number;
  mounting: number;
  installation: number;
  other: number;
  vatRate: number;
}

export interface SlideConfig {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface OfferState {
  type: OfferType;
  client: ClientInfo;
  consultant: ConsultantInfo;
  offer: OfferMeta;
  system: SystemConfig;
  site: SiteDetails;
  pricing: PricingConfig;
  slides: SlideConfig[];
}

export type OfferAction =
  | { type: "SET_OFFER_TYPE"; payload: OfferType }
  | { type: "SET_CLIENT"; payload: Partial<ClientInfo> }
  | { type: "SET_CONSULTANT"; payload: Partial<ConsultantInfo> }
  | { type: "SET_OFFER_META"; payload: Partial<OfferMeta> }
  | { type: "SET_SYSTEM"; payload: Partial<SystemConfig> }
  | { type: "SET_SITE"; payload: Partial<SiteDetails> }
  | { type: "SET_PRICING"; payload: Partial<PricingConfig> }
  | { type: "SET_SLIDES"; payload: SlideConfig[] }
  | { type: "TOGGLE_SLIDE"; payload: string }
  | { type: "RESET"; payload: OfferState };

export const ALL_SLIDE_DEFS: { id: string; label: string }[] = [
  { id: "cover", label: "Заглавна страница" },
  { id: "executive", label: "Обобщение" },
  { id: "bill", label: "Сметка преди/след" },
  { id: "roof", label: "Анализ на покрива" },
  { id: "system", label: "Системно решение" },
  { id: "bom", label: "Спецификация (BOM)" },
  { id: "pricing", label: "Ценово предложение" },
  { id: "roi", label: "Възвръщаемост" },
  { id: "faq", label: "Често задавани въпроси" },
  { id: "portfolio", label: "Наши проекти" },
  { id: "warranty", label: "Гаранции" },
  { id: "progress", label: "Какво сме направили" },
  { id: "monitoring", label: "Мониторинг" },
  { id: "whynow", label: "Защо точно сега" },
  { id: "cta", label: "Следващи стъпки" },
  { id: "confirmation", label: "Потвърждение" },
];

export function getDefaultSlides(offerType: OfferType): SlideConfig[] {
  return ALL_SLIDE_DEFS.map((s, i) => ({
    id: s.id,
    label: s.label,
    enabled: true,
    order: i,
  }));
}

function generateOfferNumber(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `SOL-${yy}${mm}-${seq}`;
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function createInitialState(offerType: OfferType = "home"): OfferState {
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setDate(validUntil.getDate() + 30);

  return {
    type: offerType,
    client: { name: "", address: "", phone: "", email: "" },
    consultant: { name: "", phone: "", email: "", initials: "" },
    offer: {
      number: generateOfferNumber(),
      date: formatDate(now),
      validUntil: formatDate(validUntil),
    },
    system: {
      panelId: "sunport-mwt-450",
      panelCount: 14,
      customPanel: { name: "", wattage: 450, efficiency: 21, warrantyProduct: 12, warrantyPerformance: 25, degradation: 0.5 },
      inverterId: "solaredge-se5000h",
      inverterCount: 1,
      customInverter: { brand: "", model: "", powerKw: 5, efficiency: 97, phases: 3, warrantyYears: 10, monitoringPlatform: "" },
      hasBattery: false,
      batteryId: "kstar-blue-s",
      batteryCount: 1,
      customBattery: { brand: "", capacityKwh: 10, chemistry: "LFP", warrantyYears: 10 },
      mountingType: "roof",
      smartMeterCount: 1,
      hasEvCharger: false,
      evChargerId: "ev-7kw",
    },
    site: {
      currentMonthlyBill: 200,
      roofArea: 60,
      orientation: "Юг",
      tiltDegrees: 30,
      city: "София",
    },
    pricing: {
      panels: 0,
      inverter: 0,
      battery: 0,
      mounting: 0,
      installation: 0,
      other: 0,
      vatRate: offerType === "home" ? 0 : 20,
    },
    slides: getDefaultSlides(offerType),
  };
}

export interface ResolvedPanel {
  name: string;
  wattage: number;
  efficiency: number;
  warrantyProduct: number;
  warrantyPerformance: number;
  degradation: number;
}

export interface ResolvedInverter {
  brand: string;
  model: string;
  powerKw: number;
  efficiency: number;
  phases: 1 | 3;
  warrantyYears: number;
  monitoringPlatform: string;
}

export interface ResolvedBattery {
  brand: string;
  capacityKwh: number;
  chemistry: string;
  warrantyYears: number;
}

export function resolvePanel(system: SystemConfig): ResolvedPanel {
  if (system.panelId === "custom") {
    return system.customPanel;
  }
  const p = getPanelById(system.panelId);
  if (!p) return system.customPanel;
  return { name: p.name, wattage: p.wattage, efficiency: p.efficiency, warrantyProduct: p.warrantyProduct, warrantyPerformance: p.warrantyPerformance, degradation: p.degradation };
}

export function resolveInverter(system: SystemConfig): ResolvedInverter {
  if (system.inverterId === "custom") {
    return system.customInverter;
  }
  const inv = getInverterById(system.inverterId);
  if (!inv) return system.customInverter;
  return { brand: inv.brandName, model: inv.model, powerKw: inv.powerKw, efficiency: inv.efficiency, phases: inv.phases, warrantyYears: inv.warrantyYears, monitoringPlatform: inv.monitoringPlatform };
}

export function resolveBattery(system: SystemConfig): ResolvedBattery | null {
  if (!system.hasBattery) return null;
  if (system.batteryId === "custom") {
    return system.customBattery;
  }
  const b = getBatteryById(system.batteryId);
  if (!b) return system.customBattery;
  return { brand: b.brandName, capacityKwh: b.capacityKwh.max, chemistry: b.chemistry, warrantyYears: b.warrantyYears };
}

export function offerReducer(state: OfferState, action: OfferAction): OfferState {
  switch (action.type) {
    case "SET_OFFER_TYPE":
      return {
        ...state,
        type: action.payload,
        pricing: {
          ...state.pricing,
          vatRate: action.payload === "home" ? 0 : 20,
        },
        slides: getDefaultSlides(action.payload),
      };
    case "SET_CLIENT":
      return { ...state, client: { ...state.client, ...action.payload } };
    case "SET_CONSULTANT":
      return { ...state, consultant: { ...state.consultant, ...action.payload } };
    case "SET_OFFER_META":
      return { ...state, offer: { ...state.offer, ...action.payload } };
    case "SET_SYSTEM":
      return { ...state, system: { ...state.system, ...action.payload } };
    case "SET_SITE":
      return { ...state, site: { ...state.site, ...action.payload } };
    case "SET_PRICING":
      return { ...state, pricing: { ...state.pricing, ...action.payload } };
    case "SET_SLIDES":
      return { ...state, slides: action.payload };
    case "TOGGLE_SLIDE":
      return {
        ...state,
        slides: state.slides.map((s) =>
          s.id === action.payload ? { ...s, enabled: !s.enabled } : s,
        ),
      };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}
