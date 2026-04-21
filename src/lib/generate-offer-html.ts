import type { OfferState } from "@/components/offer-maker/offer-types";
import { resolvePanel, resolveInverter, resolveBattery } from "@/components/offer-maker/offer-types";
import type { ComputedValues } from "@/components/offer-maker/offer-wizard";
import { getMonitoringForBrand, mountingTypes } from "@/data/products";

function fmt(n: number, decimals = 0): string {
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function generateOfferHtml(
  templateHtml: string,
  state: OfferState,
  computed: ComputedValues,
): string {
  const panel = resolvePanel(state.system);
  const inverter = resolveInverter(state.system);
  const battery = resolveBattery(state.system);
  const mounting = mountingTypes.find((m) => m.id === state.system.mountingType);
  const monitoring = getMonitoringForBrand(inverter.brand);

  const totalPrice = computed.totalPriceEur || 1;
  const pricePct = (v: number) => Math.round((v / totalPrice) * 100);

  const bomTotal =
    state.system.panelCount +
    state.system.inverterCount +
    (state.system.hasBattery ? state.system.batteryCount : 0) +
    state.system.smartMeterCount;

  const replacements: Record<string, string> = {
    CLIENT_NAME: state.client.name,
    CLIENT_ADDRESS: state.client.address,
    CLIENT_PHONE: state.client.phone,
    CLIENT_EMAIL: state.client.email,

    CONSULTANT_NAME: state.consultant.name,
    CONSULTANT_PHONE: state.consultant.phone,
    CONSULTANT_EMAIL: state.consultant.email,
    CONSULTANT_INITIALS: state.consultant.initials,

    OFFER_NUMBER: state.offer.number,
    OFFER_DATE: state.offer.date,
    OFFER_VALID_UNTIL: state.offer.validUntil,
    VALID_UNTIL: state.offer.validUntil,
    DATE: state.offer.date,

    SYSTEM_KWP: fmt(computed.systemKwp, 1),
    PANEL_COUNT: String(state.system.panelCount),
    PANEL_MODEL: panel.name || "—",
    PANEL_POWER: String(panel.wattage),
    PANEL_WATTAGE: String(panel.wattage),
    PANEL_WARRANTY_PRODUCT: String(panel.warrantyProduct),
    PANEL_WARRANTY_PERFORMANCE: String(panel.warrantyPerformance),
    DEGRADATION: String(panel.degradation),

    INVERTER_MODEL: inverter.model ? `${inverter.brand} ${inverter.model}` : "—",
    INVERTER_BRAND: inverter.brand || "—",
    INVERTER_COUNT: String(state.system.inverterCount),
    INVERTER_POWER: String(inverter.powerKw),
    INVERTER_WARRANTY: String(inverter.warrantyYears),

    BATTERY_MODEL: battery ? battery.brand : "—",
    BATTERY_COUNT: state.system.hasBattery ? String(state.system.batteryCount) : "—",
    BATTERY_KWH: battery ? String(battery.capacityKwh) : "—",
    BATTERY_CAPACITY: battery ? String(battery.capacityKwh) : "—",
    BATTERY_WARRANTY: battery ? String(battery.warrantyYears) : "—",

    MOUNTING_TYPE: mounting?.label ?? "—",
    MOUNTING_MODEL: mounting ? mounting.brands.join(" / ") : "—",
    MOUNTING_WARRANTY: String(mounting?.warrantyYears ?? 0),

    SMART_METER_COUNT: String(state.system.smartMeterCount),
    MONITORING_PLATFORM: monitoring?.platform ?? (inverter.monitoringPlatform || "—"),

    INSTALL_WARRANTY: "5",
    BOM_TOTAL_ITEMS: String(bomTotal),

    ANNUAL_PRODUCTION: fmt(computed.annualProductionKwh),
    ANNUAL_SAVINGS: fmt(computed.annualSavingsEur),
    PAYBACK_YEARS: fmt(computed.paybackYears, 1),
    SAVINGS_25_YEAR: fmt(computed.savings25Year),

    CURRENT_BILL: fmt(state.site.currentMonthlyBill),
    NEW_BILL: fmt(computed.newMonthlyBill),
    BILL_AFTER: fmt(computed.newMonthlyBill),

    CO2_SAVED: fmt(computed.co2SavedKg),
    TREES_EQUIVALENT: fmt(computed.treesEquivalent),

    ORIENTATION: state.site.orientation,
    TILT: String(state.site.tiltDegrees),
    CITY: state.site.city,
    ROOF_AREA: String(state.site.roofArea),

    PRICE_PANELS: fmt(state.pricing.panels),
    PRICE_INVERTER: fmt(state.pricing.inverter),
    PRICE_BATTERY: fmt(state.pricing.battery),
    PRICE_MOUNTING: fmt(state.pricing.mounting),
    PRICE_INSTALLATION: fmt(state.pricing.installation),
    PRICE_INSTALL: fmt(state.pricing.installation),
    PRICE_TOTAL: fmt(computed.totalPriceEur),

    VAT_RATE: String(state.pricing.vatRate),
    VAT_AMOUNT: fmt(computed.vatAmount),
    PRICE_WITH_VAT: fmt(computed.totalWithVat),

    PRICE_PANELS_PCT: String(pricePct(state.pricing.panels)),
    PRICE_INVERTER_PCT: String(pricePct(state.pricing.inverter)),
    PRICE_BATTERY_PCT: String(pricePct(state.pricing.battery)),
    PRICE_MOUNTING_PCT: String(pricePct(state.pricing.mounting)),
    PRICE_INSTALL_PCT: String(pricePct(state.pricing.installation)),
  };

  let html = templateHtml;
  for (const [key, value] of Object.entries(replacements)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

export function fixImagePaths(html: string, origin?: string): string {
  const base = origin ?? window.location.origin;
  return html
    .replace(/url\(['"]?solaron\/public\//g, `url('${base}/`)
    .replace(/src="solaron\/public\//g, `src="${base}/`);
}

export function openOfferInNewTab(html: string): void {
  const fixed = fixImagePaths(html);
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(fixed);
  w.document.close();
}
