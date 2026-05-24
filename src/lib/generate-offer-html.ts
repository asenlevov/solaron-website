import type { OfferState } from "@/components/offer-maker/offer-types";
import { resolvePanel, resolveInverter, resolveBattery } from "@/components/offer-maker/offer-types";
import type { ComputedValues } from "@/components/offer-maker/offer-wizard";
import { getMonitoringForBrand, getPanelById, getInverterById, getBatteryById, mountingTypes } from "@/data/products";

function fmt(n: number, decimals = 0): string {
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function generateBreakdownBar(state: OfferState, totalPrice: number): string {
  const items = state.pricing.lineItems.filter((i) => i.amount > 0);
  if (items.length === 0) return '<div class="breakdown-bar"></div>';

  const segments = items.map((item, idx) => {
    const pct = Math.round((item.amount / totalPrice) * 100);
    const colorClass = `s${(idx % 11) + 1}`;
    return `<div class="breakdown-segment ${colorClass}" style="flex: ${pct};">${pct}%</div>`;
  });

  return `<div class="breakdown-bar">${segments.join("\n                ")}</div>`;
}

function generateBreakdownLegend(state: OfferState, totalPrice: number): string {
  const items = state.pricing.lineItems.filter((i) => i.amount > 0);
  if (items.length === 0) return '<div class="breakdown-legend"></div>';

  const rows = items.map((item, idx) => {
    const colorClass = `s${(idx % 11) + 1}`;
    const amount = item.amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `<div class="breakdown-item">
                  <div class="breakdown-item-dot ${colorClass}"></div>
                  <div class="breakdown-item-label">${item.label}</div>
                  <div class="breakdown-item-value">${amount} €</div>
                </div>`;
  });

  return `<div class="breakdown-legend">${rows.join("\n                ")}</div>`;
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

  const rawPanel = getPanelById(state.system.panelId);
  const rawInverter = getInverterById(state.system.inverterId);
  const rawBattery = state.system.hasBattery ? getBatteryById(state.system.batteryId) : undefined;

  const totalPrice = computed.totalPriceEur || 1;
  const pricePct = (v: number) => Math.round((v / totalPrice) * 100);
  const getLineItemAmount = (id: string) => state.pricing.lineItems.find((i) => i.id === id)?.amount ?? 0;

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

    PRICE_PANELS: fmt(getLineItemAmount("panels")),
    PRICE_INVERTER: fmt(getLineItemAmount("inverter")),
    PRICE_BATTERY: fmt(getLineItemAmount("battery")),
    PRICE_MOUNTING: fmt(getLineItemAmount("mounting")),
    PRICE_INSTALLATION: fmt(getLineItemAmount("installation")),
    PRICE_INSTALL: fmt(getLineItemAmount("installation")),
    PRICE_DESIGN: fmt(getLineItemAmount("design")),
    PRICE_OTHER: fmt(
      state.pricing.lineItems
        .filter((i) => !["panels", "inverter", "battery", "mounting", "installation", "design"].includes(i.id))
        .reduce((sum, i) => sum + i.amount, 0),
    ),
    PRICE_TOTAL: fmt(computed.totalPriceEur),

    VAT_RATE: String(state.pricing.vatRate),
    VAT_AMOUNT: fmt(computed.vatAmount),
    PRICE_WITH_VAT: fmt(computed.totalWithVat),

    PRICE_PANELS_PCT: String(pricePct(getLineItemAmount("panels"))),
    PRICE_INVERTER_PCT: String(pricePct(getLineItemAmount("inverter"))),
    PRICE_BATTERY_PCT: String(pricePct(getLineItemAmount("battery"))),
    PRICE_MOUNTING_PCT: String(pricePct(getLineItemAmount("mounting"))),
    PRICE_INSTALL_PCT: String(pricePct(getLineItemAmount("installation"))),
    PRICE_DESIGN_PCT: String(pricePct(getLineItemAmount("design"))),

    BREAKDOWN_BAR: generateBreakdownBar(state, totalPrice),
    BREAKDOWN_LEGEND: generateBreakdownLegend(state, totalPrice),

    SAVINGS_25Y: fmt(computed.savings25Year),
    INVERTER_WHY_SHORT: inverter.brand === "SolarEdge"
      ? "HD-Wave технология с 99.2% ефективност и панелно ниво мониторинг"
      : `${inverter.brand} хибриден инвертор с ${inverter.efficiency}% ефективност`,
    SUBSIDY_PCT: "0",
    PRICE_AFTER_SUBSIDY: fmt(computed.totalWithVat),
    BILL_25Y: fmt(state.site.currentMonthlyBill * 12 * 25),
    BILL_AFTER_25Y: fmt(computed.newMonthlyBill * 12 * 25),

    PANEL_DATASHEET_URL: rawPanel?.datasheetUrl ?? "",
    INVERTER_DATASHEET_URL: rawInverter?.datasheetUrl ?? "",
    BATTERY_DATASHEET_URL: rawBattery?.datasheetUrl ?? "",

    CONSULTANT_SIGNATURE_URL: state.consultant.signatureUrl || "",
  };

  let html = templateHtml;
  for (const [key, value] of Object.entries(replacements)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }

  const disabledSlideNumbers = new Set<number>();
  state.slides.forEach((s, i) => {
    if (!s.enabled) disabledSlideNumbers.add(i + 1);
  });
  if (disabledSlideNumbers.size > 0) {
    html = html.replace(
      /<section\s+class="slide[^"]*"\s+data-slide="(\d+)"[\s\S]*?<\/section>/g,
      (match, num) => (disabledSlideNumbers.has(Number(num)) ? "" : match),
    );
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
