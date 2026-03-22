// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = any;

export interface PdfOfferData {
  systemSizeKwp: number;
  panelCount: number;
  hasBattery: boolean;
  batteryCapacityKwh: number;
  annualProductionKwh: number;
  annualSavings: number;
  paybackYears: number;
  savings25yr: number;
  co2SavedKgPerYear: number;
  treeEquivalent: number;
  city: string;
  roofOrientation: string;
  roofArea: number;
  roofPitch: number;
  systemCost: number;
  monthlyBill: number;
}

// ---------------------------------------------------------------------------
// Locale texts & formatting
// ---------------------------------------------------------------------------

interface PdfTexts {
  numberLocale: string;
  dateLocale: string;
  currency: (v: number) => string;
  orientations: Record<string, string>;
  fileName: string;

  personalizedOffer: string;
  docDisclaimer: string;

  coverPanels: string;
  coverPower: string;
  coverSavingsYr: string;
  coverPayback: string;

  yourSystem: string;
  power: string;
  panels: string;
  pcs: string;
  roofArea: string;
  orientation: string;
  pitch: string;
  city: string;
  batteryStorage: string;
  batterySpec: string;
  annualProduction: string;
  monthlyBill: string;

  financialAnalysis: string;
  monthlySavings: string;
  annualSavings: string;
  savings25yr: string;
  systemCost: string;
  paybackPeriod: string;
  years: string;
  savingsAccumulation: string;
  year: string;

  roi: string;
  investment: string;
  paybackLabel: string;
  yr: string;
  cumulativeSavings: string;
  systemCostLegend: string;

  productSpec: string;
  solarPanelsTitle: string;
  solarPanelsSub: string;
  inverterTitle: string;
  inverterSub: string;
  batteryTitle: string;
  specPower: string;
  specEfficiency: string;
  specTechnology: string;
  specWarranty: string;
  specCount: string;
  specTotalPower: string;
  specType: string;
  specMonitoring: string;
  specOptimizers: string;
  specCapacity: string;
  specCycles: string;
  specDoD: string;
  specHybrid: string;
  specMppt: string;
  specLinearWarranty: string;
  specInverterWarranty: string;
  specBatteryWarranty: string;
  specInstallWarranty: string;

  installProcess: string;
  steps: { num: string; t: string; d: string }[];

  envImpact: string;
  co2SavedAnnual: string;
  treeEquivalent: string;
  co2For25yr: string;
  envForecast: string;
  envSummary: string;

  warrantyTitle: string;
  warrantyConditions: string;
  warranties: { c: string; p: string; d: string }[];
  nextSteps: string;
  nextStepsList: string[];
  readyNext: string;
}

function fmtNum(v: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(Math.round(v));
}

const TEXTS: Record<string, PdfTexts> = {
  bg: {
    numberLocale: "bg-BG",
    dateLocale: "bg-BG",
    currency: (v) => `${new Intl.NumberFormat("bg-BG").format(Math.round(v))} лв.`,
    orientations: { "Юг": "Юг", "Югоизток": "Югоизток", "Югозапад": "Югозапад", "Изток": "Изток", "Запад": "Запад" },
    fileName: "Solaron-Оферта.pdf",

    personalizedOffer: "Персонализирана Соларна Оферта",
    docDisclaimer: "Този документ е генериран от Solaron конфигуратора. За финална оферта, свържете се с нас.",

    coverPanels: "Панели",
    coverPower: "Мощност",
    coverSavingsYr: "Спестявания/г.",
    coverPayback: "Изплащане",

    yourSystem: "Вашата Соларна Система",
    power: "Мощност",
    panels: "Панели",
    pcs: "бр.",
    roofArea: "Покривна площ",
    orientation: "Ориентация",
    pitch: "Наклон",
    city: "Град",
    batteryStorage: "Батерийно Съхранение",
    batterySpec: "LiFePO4  |  6 000+ цикъла  |  10 г. гаранция",
    annualProduction: "Годишно производство",
    monthlyBill: "Месечна сметка",

    financialAnalysis: "Финансов Анализ",
    monthlySavings: "Месечни спестявания",
    annualSavings: "Годишни спестявания",
    savings25yr: "Спестявания (25 г.)",
    systemCost: "Цена на системата",
    paybackPeriod: "Период на изплащане:",
    years: "години",
    savingsAccumulation: "Натрупване на спестявания по години",
    year: "Година",

    roi: "Възвръщаемост на Инвестицията",
    investment: "Инвестиция",
    paybackLabel: "Изплащане",
    yr: "г.",
    cumulativeSavings: "Кумулативни спестявания",
    systemCostLegend: "Цена на системата",

    productSpec: "Продуктова Спецификация",
    solarPanelsTitle: "Соларни Панели",
    solarPanelsSub: "Монокристални MWT 450W",
    inverterTitle: "Инвертор",
    inverterSub: "SolarEdge HD-Wave",
    batteryTitle: "Батерия",
    specPower: "Мощност",
    specEfficiency: "Ефективност",
    specTechnology: "Технология",
    specWarranty: "Гаранция",
    specCount: "Брой",
    specTotalPower: "Обща мощност",
    specType: "Тип",
    specMonitoring: "Мониторинг",
    specOptimizers: "Оптимизатори",
    specCapacity: "Капацитет",
    specCycles: "Цикли",
    specDoD: "DoD",
    specHybrid: "Хибриден",
    specMppt: "MPPT за панел",
    specLinearWarranty: "30 г. линейна",
    specInverterWarranty: "12 години",
    specBatteryWarranty: "10 години",
    specInstallWarranty: "5 години",

    installProcess: "Процес на Инсталация",
    steps: [
      { num: "01", t: "Консултация", d: "Безплатна техническа консултация на място. Анализ на покрива и потреблението." },
      { num: "02", t: "Проектиране", d: "Детайлен технически проект с 3D визуализация, съобразен с вашите нужди." },
      { num: "03", t: "Документация", d: "Цялата документация за присъединяване към електроразпределителното дружество." },
      { num: "04", t: "Монтаж", d: "Професионален монтаж от сертифициран екип. 2\u20133 дни за жилищни системи." },
      { num: "05", t: "Свързване", d: "Свързване към мрежата и настройка на мониторинг системата в реално време." },
      { num: "06", t: "Активиране", d: "Финално тестване, пускане и обучение за ползване на мониторинг приложението." },
    ],

    envImpact: "Екологичен Принос",
    co2SavedAnnual: "CO\u2082 спестено годишно",
    treeEquivalent: "Еквивалент на дървета",
    co2For25yr: "CO\u2082 за 25 години",
    envForecast: "25-годишна екологична прогноза",
    envSummary: "За 25 години вашата система ще предотврати {co2} kg CO\u2082 \u2014 еквивалент на {trees} дървета.",

    warrantyTitle: "Гаранция и Следващи Стъпки",
    warrantyConditions: "Гаранционни Условия",
    warranties: [
      { c: "Соларни панели", p: "30 години", d: "Линейна гаранция (мин. 87.4% на 25-та година)" },
      { c: "Инвертор", p: "12 години", d: "Пълна гаранция, опция за удължаване до 25 г." },
      { c: "Батерия", p: "10 години", d: "Капацитет мин. 70% след 6 000 цикъла" },
      { c: "Монтаж", p: "5 години", d: "Качество на монтаж и конструкция" },
    ],
    nextSteps: "Следващи Стъпки",
    nextStepsList: [
      "Свържете се с нас за безплатна консултация",
      "Получете детайлен технически проект",
      "Финална оферта с фиксирана цена",
      "Насладете се на чиста енергия",
    ],
    readyNext: "Готови ли сте за следващата стъпка?",
  },

  en: {
    numberLocale: "en-US",
    dateLocale: "en-US",
    currency: (v) => `€${new Intl.NumberFormat("en-US").format(Math.round(v))}`,
    orientations: { "Юг": "South", "Югоизток": "Southeast", "Югозапад": "Southwest", "Изток": "East", "Запад": "West" },
    fileName: "Solaron-Offer.pdf",

    personalizedOffer: "Personalized Solar Offer",
    docDisclaimer: "This document was generated by the Solaron configurator. For a final offer, contact us.",

    coverPanels: "Panels",
    coverPower: "Power",
    coverSavingsYr: "Savings/yr",
    coverPayback: "Payback",

    yourSystem: "Your Solar System",
    power: "Power",
    panels: "Panels",
    pcs: "pcs",
    roofArea: "Roof Area",
    orientation: "Orientation",
    pitch: "Pitch",
    city: "City",
    batteryStorage: "Battery Storage",
    batterySpec: "LiFePO4  |  6,000+ cycles  |  10 yr warranty",
    annualProduction: "Annual Production",
    monthlyBill: "Monthly Bill",

    financialAnalysis: "Financial Analysis",
    monthlySavings: "Monthly Savings",
    annualSavings: "Annual Savings",
    savings25yr: "Savings (25 yr)",
    systemCost: "System Cost",
    paybackPeriod: "Payback period:",
    years: "years",
    savingsAccumulation: "Savings accumulation by year",
    year: "Year",

    roi: "Return on Investment",
    investment: "Investment",
    paybackLabel: "Payback",
    yr: "yr",
    cumulativeSavings: "Cumulative Savings",
    systemCostLegend: "System Cost",

    productSpec: "Product Specification",
    solarPanelsTitle: "Solar Panels",
    solarPanelsSub: "Monocrystalline MWT 450W",
    inverterTitle: "Inverter",
    inverterSub: "SolarEdge HD-Wave",
    batteryTitle: "Battery",
    specPower: "Power",
    specEfficiency: "Efficiency",
    specTechnology: "Technology",
    specWarranty: "Warranty",
    specCount: "Count",
    specTotalPower: "Total Power",
    specType: "Type",
    specMonitoring: "Monitoring",
    specOptimizers: "Optimizers",
    specCapacity: "Capacity",
    specCycles: "Cycles",
    specDoD: "DoD",
    specHybrid: "Hybrid",
    specMppt: "MPPT per panel",
    specLinearWarranty: "30 yr linear",
    specInverterWarranty: "12 years",
    specBatteryWarranty: "10 years",
    specInstallWarranty: "5 years",

    installProcess: "Installation Process",
    steps: [
      { num: "01", t: "Consultation", d: "Free on-site technical consultation. Roof and consumption analysis." },
      { num: "02", t: "Design", d: "Detailed technical design with 3D visualization, tailored to your needs." },
      { num: "03", t: "Documentation", d: "All documentation for grid connection with the utility company." },
      { num: "04", t: "Installation", d: "Professional installation by a certified team. 2\u20133 days for residential systems." },
      { num: "05", t: "Connection", d: "Grid connection and real-time monitoring system setup." },
      { num: "06", t: "Activation", d: "Final testing, commissioning, and monitoring app training." },
    ],

    envImpact: "Environmental Impact",
    co2SavedAnnual: "CO\u2082 saved annually",
    treeEquivalent: "Tree equivalent",
    co2For25yr: "CO\u2082 over 25 years",
    envForecast: "25-year environmental forecast",
    envSummary: "Over 25 years your system will prevent {co2} kg CO\u2082 \u2014 equivalent to {trees} trees.",

    warrantyTitle: "Warranty & Next Steps",
    warrantyConditions: "Warranty Terms",
    warranties: [
      { c: "Solar Panels", p: "30 years", d: "Linear warranty (min. 87.4% at year 25)" },
      { c: "Inverter", p: "12 years", d: "Full warranty, option to extend to 25 yr" },
      { c: "Battery", p: "10 years", d: "Capacity min. 70% after 6,000 cycles" },
      { c: "Installation", p: "5 years", d: "Installation and construction quality" },
    ],
    nextSteps: "Next Steps",
    nextStepsList: [
      "Contact us for a free consultation",
      "Receive a detailed technical design",
      "Final offer with a fixed price",
      "Enjoy clean energy",
    ],
    readyNext: "Ready for the next step?",
  },

  nl: {
    numberLocale: "nl-NL",
    dateLocale: "nl-NL",
    currency: (v) => `\u20AC ${new Intl.NumberFormat("nl-NL").format(Math.round(v))}`,
    orientations: { "Юг": "Zuid", "Югоизток": "Zuidoost", "Югозапад": "Zuidwest", "Изток": "Oost", "Запад": "West" },
    fileName: "Solaron-Offerte.pdf",

    personalizedOffer: "Gepersonaliseerde Zonne-offerte",
    docDisclaimer: "Dit document is gegenereerd door de Solaron configurator. Neem contact met ons op voor een definitieve offerte.",

    coverPanels: "Panelen",
    coverPower: "Vermogen",
    coverSavingsYr: "Besparing/jr.",
    coverPayback: "Terugverdientijd",

    yourSystem: "Uw Zonnepanelensysteem",
    power: "Vermogen",
    panels: "Panelen",
    pcs: "st.",
    roofArea: "Dakoppervlakte",
    orientation: "Ori\u00EBntatie",
    pitch: "Helling",
    city: "Stad",
    batteryStorage: "Batterijopslag",
    batterySpec: "LiFePO4  |  6.000+ cycli  |  10 jr. garantie",
    annualProduction: "Jaarlijkse Productie",
    monthlyBill: "Maandelijkse Rekening",

    financialAnalysis: "Financi\u00EBle Analyse",
    monthlySavings: "Maandelijkse Besparingen",
    annualSavings: "Jaarlijkse Besparingen",
    savings25yr: "Besparingen (25 jr.)",
    systemCost: "Systeemkosten",
    paybackPeriod: "Terugverdientijd:",
    years: "jaren",
    savingsAccumulation: "Opbouw besparingen per jaar",
    year: "Jaar",

    roi: "Rendement op Investering",
    investment: "Investering",
    paybackLabel: "Terugverdientijd",
    yr: "jr.",
    cumulativeSavings: "Cumulatieve Besparingen",
    systemCostLegend: "Systeemkosten",

    productSpec: "Productspecificatie",
    solarPanelsTitle: "Zonnepanelen",
    solarPanelsSub: "Monokristallijn MWT 450W",
    inverterTitle: "Omvormer",
    inverterSub: "SolarEdge HD-Wave",
    batteryTitle: "Batterij",
    specPower: "Vermogen",
    specEfficiency: "Effici\u00EBntie",
    specTechnology: "Technologie",
    specWarranty: "Garantie",
    specCount: "Aantal",
    specTotalPower: "Totaal vermogen",
    specType: "Type",
    specMonitoring: "Monitoring",
    specOptimizers: "Optimizers",
    specCapacity: "Capaciteit",
    specCycles: "Cycli",
    specDoD: "DoD",
    specHybrid: "Hybride",
    specMppt: "MPPT per paneel",
    specLinearWarranty: "30 jr. lineair",
    specInverterWarranty: "12 jaar",
    specBatteryWarranty: "10 jaar",
    specInstallWarranty: "5 jaar",

    installProcess: "Installatieproces",
    steps: [
      { num: "01", t: "Consultatie", d: "Gratis technische consultatie op locatie. Analyse van het dak en verbruik." },
      { num: "02", t: "Ontwerp", d: "Gedetailleerd technisch ontwerp met 3D-visualisatie, afgestemd op uw behoeften." },
      { num: "03", t: "Documentatie", d: "Alle documentatie voor aansluiting op het elektriciteitsnet." },
      { num: "04", t: "Installatie", d: "Professionele installatie door een gecertificeerd team. 2\u20133 dagen voor woningen." },
      { num: "05", t: "Aansluiting", d: "Aansluiting op het net en installatie van het real-time monitoringsysteem." },
      { num: "06", t: "Activering", d: "Eindtest, inbedrijfstelling en training voor de monitoring-app." },
    ],

    envImpact: "Milieu-impact",
    co2SavedAnnual: "CO\u2082 bespaard per jaar",
    treeEquivalent: "Boomequivalent",
    co2For25yr: "CO\u2082 over 25 jaar",
    envForecast: "25-jarige milieuprognose",
    envSummary: "Over 25 jaar zal uw systeem {co2} kg CO\u2082 voorkomen \u2014 equivalent van {trees} bomen.",

    warrantyTitle: "Garantie & Volgende Stappen",
    warrantyConditions: "Garantievoorwaarden",
    warranties: [
      { c: "Zonnepanelen", p: "30 jaar", d: "Lineaire garantie (min. 87,4% in jaar 25)" },
      { c: "Omvormer", p: "12 jaar", d: "Volledige garantie, optie tot 25 jr. verlenging" },
      { c: "Batterij", p: "10 jaar", d: "Capaciteit min. 70% na 6.000 cycli" },
      { c: "Installatie", p: "5 jaar", d: "Installatie- en constructiekwaliteit" },
    ],
    nextSteps: "Volgende Stappen",
    nextStepsList: [
      "Neem contact met ons op voor een gratis consultatie",
      "Ontvang een gedetailleerd technisch ontwerp",
      "Definitieve offerte met vaste prijs",
      "Geniet van schone energie",
    ],
    readyNext: "Klaar voor de volgende stap?",
  },
};

function getTexts(locale: string): PdfTexts {
  return TEXTS[locale] ?? TEXTS.bg!;
}

// ---------------------------------------------------------------------------
// Colours & layout constants
// ---------------------------------------------------------------------------

const G = "#3B7A2A";
const GL = "#5CA644";
const GD = "#2d5e20";
const D = "#111827";
const G6 = "#4b5563";
const G4 = "#9ca3af";
const W = "#ffffff";
const BG = "#fafcf8";
const CARD = "#f0f4ec";

const PW = 297;
const PH = 210;
const MX = 20;
const CW = PW - MX * 2;

// ---------------------------------------------------------------------------
// Font loading
// ---------------------------------------------------------------------------

async function loadFonts(doc: Doc) {
  const [regBuf, boldBuf] = await Promise.all([
    fetch("/fonts/Inter-Regular.ttf").then((r) => r.arrayBuffer()),
    fetch("/fonts/Inter-Bold.ttf").then((r) => r.arrayBuffer()),
  ]);

  const toB64 = (buf: ArrayBuffer) => {
    const bytes = new Uint8Array(buf);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
    return btoa(binary);
  };

  doc.addFileToVFS("Inter-Regular.ttf", toB64(regBuf));
  doc.addFont("Inter-Regular.ttf", "Inter", "normal");
  doc.addFileToVFS("Inter-Bold.ttf", toB64(boldBuf));
  doc.addFont("Inter-Bold.ttf", "Inter", "bold");
  doc.setFont("Inter", "normal");
}

// ---------------------------------------------------------------------------
// Reusable drawing helpers
// ---------------------------------------------------------------------------

function headerBar(doc: Doc) {
  doc.setFillColor(G);
  doc.rect(0, 0, PW, 3.5, "F");
}

function footer(doc: Doc, pg: number, total: number, t: PdfTexts) {
  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.2);
  doc.line(MX, PH - 16, PW - MX, PH - 16);

  doc.setFont("Inter", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(D);
  doc.text("Solar", MX, PH - 10);
  const sw = doc.getTextWidth("Solar");
  doc.setTextColor(G);
  doc.text("on", MX + sw, PH - 10);

  doc.setFont("Inter", "normal");
  doc.setFontSize(7);
  doc.setTextColor(G4);
  doc.text(t.personalizedOffer, MX + sw + doc.getTextWidth("on") + 4, PH - 10);
  doc.text(`${pg} / ${total}`, PW - MX, PH - 10, { align: "right" });
}

function heading(doc: Doc, title: string, y: number): number {
  doc.setFont("Inter", "bold");
  doc.setFontSize(22);
  doc.setTextColor(D);
  doc.text(title, MX, y);

  doc.setFillColor(G);
  doc.rect(MX, y + 3, 40, 1.5, "F");

  return y + 16;
}

function card(
  doc: Doc,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  accent = false,
) {
  if (accent) {
    doc.setFillColor(G);
    doc.roundedRect(x, y, w, h, 2.5, 2.5, "F");
  } else {
    doc.setFillColor(CARD);
    doc.roundedRect(x, y, w, h, 2.5, 2.5, "F");
    doc.setDrawColor("#d4ddd0");
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, w, h, 2.5, 2.5, "S");
  }

  doc.setFont("Inter", "normal");
  doc.setFontSize(8);
  doc.setTextColor(accent ? "#b8dbb0" : G6);
  doc.text(label, x + w / 2, y + h * 0.38, { align: "center" });

  doc.setFont("Inter", "bold");
  doc.setFontSize(14);
  doc.setTextColor(accent ? W : D);
  doc.text(value, x + w / 2, y + h * 0.72, { align: "center" });
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

function pageCover(doc: Doc, data: PdfOfferData, t: PdfTexts) {
  const n = (v: number) => fmtNum(v, t.numberLocale);

  doc.setFillColor(D);
  doc.rect(0, 0, PW, PH, "F");

  doc.setFillColor(G);
  doc.rect(0, 0, PW, 5, "F");

  doc.setFillColor(GD);
  doc.roundedRect(MX, 28, CW, 120, 6, 6, "F");
  doc.setFillColor("#243f1a");
  doc.roundedRect(MX + 1, 29, CW - 2, 118, 5.5, 5.5, "F");

  doc.setFillColor(G);
  doc.rect(MX + 28, 50, 50, 2, "F");

  doc.setFont("Inter", "bold");
  doc.setFontSize(52);
  doc.setTextColor(W);
  doc.text("Solar", MX + 28, 78);
  const sw = doc.getTextWidth("Solar");
  doc.setTextColor(GL);
  doc.text("on", MX + 28 + sw, 78);

  doc.setFont("Inter", "normal");
  doc.setFontSize(20);
  doc.setTextColor("#d1d5db");
  doc.text(t.personalizedOffer, MX + 28, 96);

  doc.setFontSize(11);
  doc.setTextColor(G4);
  const today = new Date().toLocaleDateString(t.dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${today}  |  ${data.city}  |  ${data.systemSizeKwp.toFixed(1)} kWp`, MX + 28, 112);

  const statsY = 128;
  const paybackVal = Number.isFinite(data.paybackYears)
    ? `${data.paybackYears.toFixed(1)} ${t.yr}`
    : "\u2014";
  const statsData = [
    { label: t.coverPanels, value: `${data.panelCount}` },
    { label: t.coverPower, value: `${data.systemSizeKwp.toFixed(1)} kWp` },
    { label: t.coverSavingsYr, value: t.currency(data.annualSavings) },
    { label: t.coverPayback, value: paybackVal },
  ];
  const statW = (CW - 56 - 12 * 3) / 4;
  for (let i = 0; i < statsData.length; i++) {
    const sx = MX + 28 + i * (statW + 12);
    doc.setFont("Inter", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(G4);
    doc.text(statsData[i]!.label, sx, statsY);
    doc.setFont("Inter", "bold");
    doc.setFontSize(13);
    doc.setTextColor(GL);
    doc.text(statsData[i]!.value, sx, statsY + 10);
  }

  doc.setFont("Inter", "normal");
  doc.setFontSize(8);
  doc.setTextColor("#6b7280");
  doc.text(t.docDisclaimer, PW / 2, PH - 16, { align: "center" });

  doc.setFontSize(7.5);
  doc.setTextColor(G4);
  doc.text("solaron.io  |  +359 896 699 009  |  hello@solaron.io", PW / 2, PH - 9, {
    align: "center",
  });
}

function pageSystem(doc: Doc, data: PdfOfferData, t: PdfTexts) {
  const n = (v: number) => fmtNum(v, t.numberLocale);
  const orient = t.orientations[data.roofOrientation] ?? data.roofOrientation;

  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, t.yourSystem, 22);

  const bw = (CW - 16) / 3;
  const bh = 36;

  card(doc, MX, y, bw, bh, t.power, `${data.systemSizeKwp.toFixed(2)} kWp`, true);
  card(doc, MX + bw + 8, y, bw, bh, t.panels, `${data.panelCount} ${t.pcs}`);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, t.roofArea, `${data.roofArea} m\u00B2`);

  y += bh + 8;
  card(doc, MX, y, bw, bh, t.orientation, orient);
  card(doc, MX + bw + 8, y, bw, bh, t.pitch, `${data.roofPitch}\u00B0`);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, t.city, data.city);

  y += bh + 10;

  if (data.hasBattery) {
    doc.setFillColor(CARD);
    doc.roundedRect(MX, y, CW, 30, 3, 3, "F");
    doc.setDrawColor("#d4ddd0");
    doc.setLineWidth(0.3);
    doc.roundedRect(MX, y, CW, 30, 3, 3, "S");

    doc.setFillColor(G);
    doc.roundedRect(MX, y, 4, 30, 2, 0, "F");
    doc.rect(MX + 2, y, 2, 30, "F");

    doc.setFont("Inter", "bold");
    doc.setFontSize(11);
    doc.setTextColor(D);
    doc.text(t.batteryStorage, MX + 14, y + 13);

    doc.setFont("Inter", "bold");
    doc.setFontSize(14);
    doc.setTextColor(G);
    doc.text(`${data.batteryCapacityKwh} kWh`, MX + 14, y + 24);

    doc.setFont("Inter", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(G6);
    doc.text(t.batterySpec, MX + 80, y + 19);

    y += 40;
  }

  doc.setFillColor(BG);
  doc.roundedRect(MX, y, CW, 28, 3, 3, "F");

  doc.setFont("Inter", "normal");
  doc.setFontSize(9);
  doc.setTextColor(G6);
  doc.text(t.annualProduction, MX + 12, y + 11);
  doc.setFont("Inter", "bold");
  doc.setFontSize(13);
  doc.setTextColor(D);
  doc.text(`${n(data.annualProductionKwh)} kWh`, MX + 12, y + 22);

  doc.setFont("Inter", "normal");
  doc.setFontSize(9);
  doc.setTextColor(G6);
  doc.text(t.monthlyBill, MX + CW / 2 + 12, y + 11);
  doc.setFont("Inter", "bold");
  doc.setFontSize(13);
  doc.setTextColor(D);
  doc.text(t.currency(data.monthlyBill), MX + CW / 2 + 12, y + 22);

  footer(doc, 2, 8, t);
}

function pageFinance(doc: Doc, data: PdfOfferData, t: PdfTexts) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, t.financialAnalysis, 22);

  const bw = (CW - 24) / 4;
  const bh = 40;

  card(doc, MX, y, bw, bh, t.monthlySavings, t.currency(data.annualSavings / 12));
  card(doc, MX + bw + 8, y, bw, bh, t.annualSavings, t.currency(data.annualSavings), true);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, t.savings25yr, t.currency(data.savings25yr));
  card(doc, MX + (bw + 8) * 3, y, bw, bh, t.systemCost, t.currency(data.systemCost));

  y += bh + 10;

  doc.setFillColor(CARD);
  doc.roundedRect(MX, y, CW, 24, 3, 3, "F");
  doc.setFillColor(G);
  doc.roundedRect(MX, y, 4, 24, 2, 0, "F");
  doc.rect(MX + 2, y, 2, 24, "F");

  doc.setFont("Inter", "normal");
  doc.setFontSize(10);
  doc.setTextColor(G6);
  doc.text(t.paybackPeriod, MX + 14, y + 15);
  doc.setFont("Inter", "bold");
  doc.setFontSize(16);
  doc.setTextColor(G);
  const payT = Number.isFinite(data.paybackYears)
    ? `${data.paybackYears.toFixed(1)} ${t.years}`
    : "\u2014";
  doc.text(payT, MX + 75, y + 15);

  y += 36;

  doc.setFont("Inter", "bold");
  doc.setFontSize(11);
  doc.setTextColor(D);
  doc.text(t.savingsAccumulation, MX, y);
  y += 8;

  const cX = MX;
  const cW = CW;
  const cH = PH - y - 28;
  const bars = 25;
  const gap = 1.5;
  const barW = (cW - gap * (bars - 1)) / bars;

  const yearly: number[] = [];
  for (let i = 0; i < 25; i++) yearly.push(data.annualSavings * 1.03 ** i);
  const mx = Math.max(...yearly);

  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.15);
  doc.line(cX, y + cH, cX + cW, y + cH);

  for (let i = 0; i < bars; i++) {
    const h = (yearly[i]! / mx) * (cH - 6);
    const bx = cX + i * (barW + gap);
    const by = y + cH - h;

    doc.setFillColor(i < Math.ceil(data.paybackYears) ? GL : G);
    doc.roundedRect(bx, by, barW, h, 0.8, 0.8, "F");

    if (i % 5 === 0 || i === 24) {
      doc.setFont("Inter", "normal");
      doc.setFontSize(6);
      doc.setTextColor(G4);
      doc.text(`${i + 1}`, bx + barW / 2, y + cH + 4, { align: "center" });
    }
  }

  doc.setFont("Inter", "normal");
  doc.setFontSize(7);
  doc.setTextColor(G4);
  doc.text(t.year, cX + cW / 2, y + cH + 9, { align: "center" });

  footer(doc, 3, 8, t);
}

function pageROI(doc: Doc, data: PdfOfferData, t: PdfTexts) {
  const n = (v: number) => fmtNum(v, t.numberLocale);

  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, t.roi, 22);

  const cX = MX + 12;
  const cY = y + 6;
  const cW = CW - 24;
  const cH = PH - cY - 42;

  const proj: { yr: number; cum: number }[] = [];
  let cum = 0;
  for (let i = 0; i < 25; i++) {
    cum += data.annualSavings * 1.03 ** i;
    proj.push({ yr: i + 1, cum });
  }
  const maxC = proj[24]!.cum;
  const yMax = Math.max(maxC, data.systemCost * 1.2);

  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.2);
  doc.line(cX, cY, cX, cY + cH);
  doc.line(cX, cY + cH, cX + cW, cY + cH);

  for (let i = 0; i <= 4; i++) {
    const gy = cY + cH - (cH * i) / 4;
    doc.setDrawColor("#f3f4f6");
    doc.setLineWidth(0.1);
    doc.line(cX, gy, cX + cW, gy);
    doc.setFont("Inter", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(G4);
    doc.text(n((yMax * i) / 4), cX - 2, gy + 1, { align: "right" });
  }

  const costY = cY + cH - (data.systemCost / yMax) * cH;
  doc.setDrawColor("#ef4444");
  doc.setLineWidth(0.35);
  doc.setLineDashPattern([3, 2], 0);
  doc.line(cX, costY, cX + cW, costY);
  doc.setLineDashPattern([], 0);

  doc.setFont("Inter", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor("#ef4444");
  doc.text(`${t.investment}: ${t.currency(data.systemCost)}`, cX + cW, costY - 2, { align: "right" });

  doc.setDrawColor(G);
  doc.setLineWidth(0.6);
  for (let i = 1; i < proj.length; i++) {
    const p = proj[i - 1]!;
    const c = proj[i]!;
    doc.line(
      cX + ((p.yr - 1) / 24) * cW,
      cY + cH - (p.cum / yMax) * cH,
      cX + ((c.yr - 1) / 24) * cW,
      cY + cH - (c.cum / yMax) * cH,
    );
  }

  if (Number.isFinite(data.paybackYears) && data.paybackYears <= 25) {
    const bx = cX + ((data.paybackYears - 1) / 24) * cW;
    doc.setFillColor(G);
    doc.circle(bx, costY, 2, "F");
    doc.setFillColor(W);
    doc.circle(bx, costY, 1, "F");

    doc.setFont("Inter", "bold");
    doc.setFontSize(8);
    doc.setTextColor(G);
    doc.text(`${t.paybackLabel}: ${data.paybackYears.toFixed(1)} ${t.yr}`, bx, costY - 5, { align: "center" });
  }

  for (let i = 0; i < 25; i += 5) {
    const xT = cX + (i / 24) * cW;
    doc.setFont("Inter", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(G4);
    doc.text(`${i + 1}`, xT, cY + cH + 5, { align: "center" });
  }
  doc.text("25", cX + cW, cY + cH + 5, { align: "center" });

  doc.setFontSize(7);
  doc.text(t.year, cX + cW / 2, cY + cH + 10, { align: "center" });

  y = cY + cH + 16;
  doc.setFillColor(G);
  doc.rect(MX, y, 8, 3, "F");
  doc.setFont("Inter", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(D);
  doc.text(t.cumulativeSavings, MX + 12, y + 2.5);

  doc.setDrawColor("#ef4444");
  doc.setLineWidth(0.35);
  doc.setLineDashPattern([3, 2], 0);
  doc.line(MX + 80, y + 1.5, MX + 88, y + 1.5);
  doc.setLineDashPattern([], 0);
  doc.text(t.systemCostLegend, MX + 92, y + 2.5);

  footer(doc, 4, 8, t);
}

function pageSpecs(doc: Doc, data: PdfOfferData, t: PdfTexts) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  const y = heading(doc, t.productSpec, 22);

  const specs = [
    {
      title: t.solarPanelsTitle,
      sub: t.solarPanelsSub,
      rows: [
        [t.specPower, "450 W"],
        [t.specEfficiency, "21.5%"],
        [t.specTechnology, "MWT (Metal Wrap Through)"],
        [t.specWarranty, t.specLinearWarranty],
        [t.specCount, `${data.panelCount} ${t.pcs}`],
        [t.specTotalPower, `${data.systemSizeKwp.toFixed(2)} kWp`],
      ],
    },
    {
      title: t.inverterTitle,
      sub: t.inverterSub,
      rows: [
        [t.specType, t.specHybrid],
        [t.specEfficiency, "99.5%"],
        [t.specMonitoring, "Wi-Fi"],
        [t.specWarranty, t.specInverterWarranty],
        [t.specOptimizers, t.specMppt],
      ],
    },
  ];

  if (data.hasBattery) {
    specs.push({
      title: t.batteryTitle,
      sub: `LiFePO4 \u2013 ${data.batteryCapacityKwh} kWh`,
      rows: [
        [t.specCapacity, `${data.batteryCapacityKwh} kWh`],
        [t.specTechnology, "LiFePO4 (LFP)"],
        [t.specCycles, "6 000+"],
        [t.specWarranty, t.specBatteryWarranty],
        [t.specDoD, "95%"],
      ],
    });
  }

  const colW = (CW - (specs.length - 1) * 8) / specs.length;
  const cardH = PH - y - 30;

  for (let s = 0; s < specs.length; s++) {
    const sp = specs[s]!;
    const sx = MX + s * (colW + 8);

    doc.setFillColor(CARD);
    doc.roundedRect(sx, y, colW, cardH, 3, 3, "F");

    doc.setFillColor(G);
    doc.roundedRect(sx, y, colW, 20, 3, 3, "F");
    doc.rect(sx, y + 14, colW, 6, "F");

    doc.setFont("Inter", "bold");
    doc.setFontSize(12);
    doc.setTextColor(W);
    doc.text(sp.title, sx + colW / 2, y + 13, { align: "center" });

    doc.setFont("Inter", "normal");
    doc.setFontSize(8);
    doc.setTextColor(G6);
    doc.text(sp.sub, sx + colW / 2, y + 30, { align: "center" });

    let iy = y + 40;
    for (const [label, value] of sp.rows) {
      doc.setFont("Inter", "normal");
      doc.setFontSize(8);
      doc.setTextColor(G6);
      doc.text(label!, sx + 10, iy);

      doc.setFont("Inter", "bold");
      doc.setFontSize(9);
      doc.setTextColor(D);
      doc.text(value!, sx + 10, iy + 8);

      doc.setDrawColor("#dde3d8");
      doc.setLineWidth(0.12);
      doc.line(sx + 10, iy + 12, sx + colW - 10, iy + 12);
      iy += 17;
    }
  }

  footer(doc, 5, 8, t);
}

function pageInstall(doc: Doc, t: PdfTexts) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  const y = heading(doc, t.installProcess, 22);

  const cols = 3;
  const gX = 8;
  const gY = 8;
  const bW = (CW - gX * (cols - 1)) / cols;
  const bH = (PH - y - 32 - gY) / 2;

  for (let i = 0; i < t.steps.length; i++) {
    const s = t.steps[i]!;
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = MX + col * (bW + gX);
    const by = y + row * (bH + gY);

    doc.setFillColor(CARD);
    doc.roundedRect(bx, by, bW, bH, 3, 3, "F");

    doc.setFillColor(G);
    doc.circle(bx + 14, by + 14, 7, "F");
    doc.setFont("Inter", "bold");
    doc.setFontSize(10);
    doc.setTextColor(W);
    doc.text(s.num, bx + 14, by + 16.5, { align: "center" });

    doc.setFont("Inter", "bold");
    doc.setFontSize(11);
    doc.setTextColor(D);
    doc.text(s.t, bx + 28, by + 16.5);

    doc.setFont("Inter", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(G6);
    const lines = doc.splitTextToSize(s.d, bW - 18);
    doc.text(lines, bx + 9, by + 28);
  }

  footer(doc, 6, 8, t);
}

function pageEnv(doc: Doc, data: PdfOfferData, t: PdfTexts) {
  const n = (v: number) => fmtNum(v, t.numberLocale);

  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, t.envImpact, 22);

  const bw = (CW - 16) / 3;
  const bh = 44;

  card(doc, MX, y, bw, bh, t.co2SavedAnnual, `${n(data.co2SavedKgPerYear)} kg`, true);
  card(doc, MX + bw + 8, y, bw, bh, t.treeEquivalent, `${data.treeEquivalent < 10 ? data.treeEquivalent.toFixed(1) : n(data.treeEquivalent)}`);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, t.co2For25yr, `${n(data.co2SavedKgPerYear * 25)} kg`);

  y += bh + 14;

  doc.setFont("Inter", "bold");
  doc.setFontSize(11);
  doc.setTextColor(D);
  doc.text(t.envForecast, MX, y);
  y += 8;

  const cX = MX + 12;
  const cW = CW - 24;
  const cH = PH - y - 36;
  const co25 = data.co2SavedKgPerYear * 25;
  const maxV = co25;

  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.2);
  doc.line(cX, y, cX, y + cH);
  doc.line(cX, y + cH, cX + cW, y + cH);

  for (let i = 0; i <= 4; i++) {
    const gy = y + cH - (cH * i) / 4;
    doc.setDrawColor("#f3f4f6");
    doc.setLineWidth(0.1);
    doc.line(cX, gy, cX + cW, gy);
    doc.setFont("Inter", "normal");
    doc.setFontSize(6);
    doc.setTextColor(G4);
    doc.text(`${n((maxV * i) / 4)} kg`, cX - 2, gy + 1, { align: "right" });
  }

  const milestones = [1, 5, 10, 15, 20, 25];
  const barW = cW / (milestones.length * 2 + 1);

  for (let i = 0; i < milestones.length; i++) {
    const yr = milestones[i]!;
    const val = data.co2SavedKgPerYear * yr;
    const h = (val / maxV) * (cH - 6);
    const bx = cX + (i * 2 + 1) * barW;

    doc.setFillColor(G);
    doc.roundedRect(bx, y + cH - h, barW * 0.8, h, 1, 1, "F");

    doc.setFont("Inter", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(D);
    doc.text(n(val), bx + barW * 0.4, y + cH - h - 2, { align: "center" });

    doc.setFont("Inter", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(G4);
    doc.text(`${yr} ${t.yr}`, bx + barW * 0.4, y + cH + 5, { align: "center" });
  }

  y = y + cH + 12;
  doc.setFont("Inter", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(G6);
  doc.text(
    t.envSummary
      .replace("{co2}", n(co25))
      .replace("{trees}", n(data.treeEquivalent * 25)),
    MX,
    y,
  );

  footer(doc, 7, 8, t);
}

function pageWarranty(doc: Doc, t: PdfTexts) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, t.warrantyTitle, 22);

  doc.setFont("Inter", "bold");
  doc.setFontSize(12);
  doc.setTextColor(D);
  doc.text(t.warrantyConditions, MX, y);
  y += 7;

  const wW = (CW - 10) / 2;
  const wH = 34;

  for (let i = 0; i < t.warranties.length; i++) {
    const w = t.warranties[i]!;
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = MX + col * (wW + 10);
    const by = y + row * (wH + 6);

    doc.setFillColor(CARD);
    doc.roundedRect(bx, by, wW, wH, 3, 3, "F");
    doc.setFillColor(G);
    doc.roundedRect(bx, by, 3, wH, 1.5, 0, "F");
    doc.rect(bx + 1.5, by, 1.5, wH, "F");

    doc.setFont("Inter", "bold");
    doc.setFontSize(10);
    doc.setTextColor(D);
    doc.text(w.c, bx + 12, by + 12);

    doc.setFont("Inter", "bold");
    doc.setFontSize(11);
    doc.setTextColor(G);
    doc.text(w.p, bx + wW - 10, by + 12, { align: "right" });

    doc.setFont("Inter", "normal");
    doc.setFontSize(8);
    doc.setTextColor(G6);
    const dl = doc.splitTextToSize(w.d, wW - 22);
    doc.text(dl, bx + 12, by + 22);
  }

  y += Math.ceil(t.warranties.length / 2) * (wH + 6) + 12;

  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.2);
  doc.line(MX, y, PW - MX, y);
  y += 10;

  doc.setFont("Inter", "bold");
  doc.setFontSize(12);
  doc.setTextColor(D);
  doc.text(t.nextSteps, MX, y);
  y += 9;

  for (let i = 0; i < t.nextStepsList.length; i++) {
    doc.setFillColor(G);
    doc.circle(MX + 5, y + 1, 3.5, "F");
    doc.setFont("Inter", "bold");
    doc.setFontSize(9);
    doc.setTextColor(W);
    doc.text(`${i + 1}`, MX + 5, y + 3, { align: "center" });

    doc.setFont("Inter", "normal");
    doc.setFontSize(10);
    doc.setTextColor(D);
    doc.text(t.nextStepsList[i]!, MX + 14, y + 3);
    y += 13;
  }

  y += 6;
  doc.setFillColor(D);
  doc.roundedRect(MX, y, CW, 38, 4, 4, "F");

  doc.setFillColor(G);
  doc.rect(MX, y, CW, 4, "F");
  doc.roundedRect(MX, y, CW, 4, 4, 4, "F");

  doc.setFont("Inter", "bold");
  doc.setFontSize(15);
  doc.setTextColor(W);
  doc.text(t.readyNext, MX + CW / 2, y + 18, { align: "center" });

  doc.setFont("Inter", "normal");
  doc.setFontSize(10);
  doc.setTextColor(GL);
  doc.text("solaron.io  |  +359 896 699 009  |  hello@solaron.io", MX + CW / 2, y + 30, {
    align: "center",
  });

  footer(doc, 8, 8, t);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function generateSolarOffer(
  data: PdfOfferData,
  locale: string = "bg",
): Promise<void> {
  const t = getTexts(locale);
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  await loadFonts(doc);

  pageCover(doc, data, t);

  doc.addPage();
  pageSystem(doc, data, t);

  doc.addPage();
  pageFinance(doc, data, t);

  doc.addPage();
  pageROI(doc, data, t);

  doc.addPage();
  pageSpecs(doc, data, t);

  doc.addPage();
  pageInstall(doc, t);

  doc.addPage();
  pageEnv(doc, data, t);

  doc.addPage();
  pageWarranty(doc, t);

  doc.save(t.fileName);
}
