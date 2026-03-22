// eslint-disable-next-line @typescript-eslint/no-explicit-any
type jsPDF = any;

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

const GREEN = "#3B7A2A";
const GREEN_LIGHT = "#5CA644";
const DARK = "#1a1a1a";
const GRAY = "#64748b";
const GRAY_LIGHT = "#94a3b8";
const WHITE = "#ffffff";
const BG_LIGHT = "#f8faf7";
const BG_CARD = "#f1f5f0";

const PW = 297;
const PH = 210;
const MX = 24;
const MY = 20;
const CONTENT_W = PW - MX * 2;

function fmt(n: number): string {
  return new Intl.NumberFormat("bg-BG").format(Math.round(n));
}

function fmtCurrency(n: number): string {
  return new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency: "BGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function pageFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  doc.setFontSize(8);
  doc.setTextColor(GRAY_LIGHT);
  doc.text(`Solaron  |  Персонализирана Соларна Оферта`, MX, PH - 10);
  doc.text(`${pageNum} / ${totalPages}`, PW - MX, PH - 10, {
    align: "right",
  });
}

function sectionTitle(doc: jsPDF, title: string, y: number): number {
  doc.setFontSize(26);
  doc.setTextColor(DARK);
  doc.text(title, MX, y);

  doc.setDrawColor(GREEN);
  doc.setLineWidth(0.8);
  doc.line(MX, y + 3, MX + 50, y + 3);

  return y + 16;
}

function drawInfoBox(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  accent = false,
) {
  doc.setFillColor(accent ? GREEN : BG_CARD);
  doc.roundedRect(x, y, w, h, 3, 3, "F");

  doc.setFontSize(9);
  doc.setTextColor(accent ? "#c8e6c0" : GRAY);
  doc.text(label, x + w / 2, y + 12, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(accent ? WHITE : DARK);
  doc.text(value, x + w / 2, y + 26, { align: "center" });
}

function pageCover(doc: jsPDF) {
  doc.setFillColor(BG_LIGHT);
  doc.rect(0, 0, PW, PH, "F");

  doc.setDrawColor(GREEN);
  doc.setLineWidth(1.2);
  doc.line(MX, 40, MX + 80, 40);

  doc.setFontSize(48);
  doc.setTextColor(DARK);
  doc.text("Solar", MX, 70);
  const solarW = doc.getTextWidth("Solar");
  doc.setTextColor(GREEN);
  doc.text("on", MX + solarW, 70);

  doc.setFontSize(22);
  doc.setTextColor(DARK);
  doc.text("Персонализирана Соларна Оферта", MX, 90);

  doc.setFontSize(12);
  doc.setTextColor(GRAY);
  const today = new Date().toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Дата: ${today}`, MX, 110);
  doc.text("Подготвена за: Вашата система", MX, 120);

  doc.setDrawColor(GREEN);
  doc.setLineWidth(0.4);
  doc.line(MX, PH - 40, PW - MX, PH - 40);

  doc.setFontSize(9);
  doc.setTextColor(GRAY);
  doc.text(
    "Този документ е автоматично генериран от Solaron конфигуратора и представлява ориентировъчна оферта.",
    MX,
    PH - 32,
  );
  doc.text("За финална оферта, моля свържете се с нас.", MX, PH - 26);
}

function pageSystemOverview(doc: jsPDF, data: PdfOfferData) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Вашата Соларна Система", MY + 10);

  const boxW = (CONTENT_W - 16) / 3;
  const boxH = 38;
  const row1Y = y + 4;

  drawInfoBox(doc, MX, row1Y, boxW, boxH, "Мощност", `${data.systemSizeKwp.toFixed(2)} kWp`, true);
  drawInfoBox(doc, MX + boxW + 8, row1Y, boxW, boxH, "Панели", `${data.panelCount} бр.`);
  drawInfoBox(doc, MX + (boxW + 8) * 2, row1Y, boxW, boxH, "Покривна площ", `${data.roofArea} м²`);

  const row2Y = row1Y + boxH + 8;
  drawInfoBox(doc, MX, row2Y, boxW, boxH, "Ориентация", data.roofOrientation);
  drawInfoBox(doc, MX + boxW + 8, row2Y, boxW, boxH, "Наклон", `${data.roofPitch}°`);
  drawInfoBox(doc, MX + (boxW + 8) * 2, row2Y, boxW, boxH, "Град", data.city);

  if (data.hasBattery) {
    const batY = row2Y + boxH + 12;
    doc.setFillColor(BG_CARD);
    doc.roundedRect(MX, batY, CONTENT_W, 32, 3, 3, "F");

    doc.setFontSize(11);
    doc.setTextColor(DARK);
    doc.text("Батерийно Съхранение", MX + 12, batY + 14);

    doc.setFontSize(14);
    doc.setTextColor(GREEN);
    doc.text(`${data.batteryCapacityKwh} kWh`, MX + 12, batY + 24);

    doc.setFontSize(9);
    doc.setTextColor(GRAY);
    doc.text("LiFePO4 (LFP) технология  ·  6 000+ цикъла  ·  10 години гаранция", MX + 80, batY + 20);
  }

  y = (data.hasBattery ? row2Y + boxH + 52 : row2Y + boxH + 16);

  doc.setFontSize(10);
  doc.setTextColor(GRAY);
  doc.text("Годишно производство:", MX, y);
  doc.setTextColor(DARK);
  doc.setFontSize(14);
  doc.text(`${fmt(data.annualProductionKwh)} kWh`, MX + 55, y);

  doc.setFontSize(10);
  doc.setTextColor(GRAY);
  doc.text("Месечна сметка:", MX + 140, y);
  doc.setTextColor(DARK);
  doc.setFontSize(14);
  doc.text(`${fmtCurrency(data.monthlyBill)}`, MX + 185, y);

  pageFooter(doc, 2, 8);
}

function pageFinancialAnalysis(doc: jsPDF, data: PdfOfferData) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Финансов Анализ", MY + 10);

  const boxW = (CONTENT_W - 24) / 4;
  const boxH = 42;

  drawInfoBox(doc, MX, y, boxW, boxH, "Месечни спестявания", fmtCurrency(data.annualSavings / 12));
  drawInfoBox(doc, MX + boxW + 8, y, boxW, boxH, "Годишни спестявания", fmtCurrency(data.annualSavings), true);
  drawInfoBox(doc, MX + (boxW + 8) * 2, y, boxW, boxH, "Спестявания (25 г.)", fmtCurrency(data.savings25yr));
  drawInfoBox(doc, MX + (boxW + 8) * 3, y, boxW, boxH, "Цена на системата", fmtCurrency(data.systemCost));

  y += boxH + 12;

  doc.setFillColor(BG_CARD);
  doc.roundedRect(MX, y, CONTENT_W, 28, 3, 3, "F");
  doc.setFontSize(11);
  doc.setTextColor(DARK);
  doc.text("Период на изплащане:", MX + 12, y + 17);
  doc.setFontSize(18);
  doc.setTextColor(GREEN);
  const paybackText = Number.isFinite(data.paybackYears)
    ? `${data.paybackYears.toFixed(1)} години`
    : "—";
  doc.text(paybackText, MX + 80, y + 17);

  y += 40;

  doc.setFontSize(13);
  doc.setTextColor(DARK);
  doc.text("Натрупване на спестявания по години", MX, y);
  y += 8;

  const chartX = MX;
  const chartW = CONTENT_W;
  const chartH = PH - y - 30;
  const barCount = 25;
  const barGap = 2;
  const barW = (chartW - barGap * (barCount - 1)) / barCount;

  const yearlySavings: number[] = [];
  for (let i = 0; i < 25; i++) {
    yearlySavings.push(data.annualSavings * (1.03 ** i));
  }
  const maxVal = Math.max(...yearlySavings);

  doc.setDrawColor("#e2e8f0");
  doc.setLineWidth(0.2);
  doc.line(chartX, y + chartH, chartX + chartW, y + chartH);

  for (let i = 0; i < barCount; i++) {
    const barH = (yearlySavings[i]! / maxVal) * (chartH - 8);
    const bx = chartX + i * (barW + barGap);
    const by = y + chartH - barH;

    doc.setFillColor(i < Math.ceil(data.paybackYears) ? GREEN_LIGHT : GREEN);
    doc.roundedRect(bx, by, barW, barH, 1, 1, "F");

    if (i % 5 === 0 || i === 24) {
      doc.setFontSize(6);
      doc.setTextColor(GRAY);
      doc.text(`${i + 1}`, bx + barW / 2, y + chartH + 5, { align: "center" });
    }
  }

  doc.setFontSize(7);
  doc.setTextColor(GRAY);
  doc.text("Година", chartX + chartW / 2, y + chartH + 10, { align: "center" });

  pageFooter(doc, 3, 8);
}

function pageRoiTimeline(doc: jsPDF, data: PdfOfferData) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Възвръщаемост на Инвестицията", MY + 10);

  const chartX = MX + 10;
  const chartY = y + 10;
  const chartW = CONTENT_W - 20;
  const chartH = PH - chartY - 45;

  const projection: { year: number; cumulative: number }[] = [];
  let cumulative = 0;
  for (let i = 0; i < 25; i++) {
    cumulative += data.annualSavings * (1.03 ** i);
    projection.push({ year: i + 1, cumulative });
  }
  const maxCum = projection[24]!.cumulative;
  const yMax = Math.max(maxCum, data.systemCost * 1.2);

  doc.setDrawColor("#e2e8f0");
  doc.setLineWidth(0.3);
  doc.line(chartX, chartY, chartX, chartY + chartH);
  doc.line(chartX, chartY + chartH, chartX + chartW, chartY + chartH);

  for (let i = 0; i <= 4; i++) {
    const gridY = chartY + chartH - (chartH * i) / 4;
    doc.setDrawColor("#f1f5f9");
    doc.setLineWidth(0.15);
    doc.line(chartX, gridY, chartX + chartW, gridY);
    doc.setFontSize(7);
    doc.setTextColor(GRAY_LIGHT);
    doc.text(fmt((yMax * i) / 4), chartX - 2, gridY + 1, { align: "right" });
  }

  const costLineY = chartY + chartH - (data.systemCost / yMax) * chartH;
  doc.setDrawColor("#ef4444");
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([3, 2], 0);
  doc.line(chartX, costLineY, chartX + chartW, costLineY);
  doc.setLineDashPattern([], 0);

  doc.setFontSize(7);
  doc.setTextColor("#ef4444");
  doc.text(`Цена на системата: ${fmtCurrency(data.systemCost)}`, chartX + chartW + 1, costLineY, {
    align: "right",
  });

  doc.setDrawColor(GREEN);
  doc.setLineWidth(0.7);
  for (let i = 1; i < projection.length; i++) {
    const prev = projection[i - 1]!;
    const curr = projection[i]!;
    const x1 = chartX + ((prev.year - 1) / 24) * chartW;
    const y1 = chartY + chartH - (prev.cumulative / yMax) * chartH;
    const x2 = chartX + ((curr.year - 1) / 24) * chartW;
    const y2 = chartY + chartH - (curr.cumulative / yMax) * chartH;
    doc.line(x1, y1, x2, y2);
  }

  if (Number.isFinite(data.paybackYears) && data.paybackYears <= 25) {
    const bepX = chartX + ((data.paybackYears - 1) / 24) * chartW;
    doc.setFillColor(GREEN);
    doc.circle(bepX, costLineY, 2.5, "F");

    doc.setFontSize(8);
    doc.setTextColor(GREEN);
    doc.text(
      `Изплащане: ${data.paybackYears.toFixed(1)} г.`,
      bepX,
      costLineY - 6,
      { align: "center" },
    );
  }

  for (let i = 0; i < 25; i += 5) {
    const xTick = chartX + (i / 24) * chartW;
    doc.setFontSize(7);
    doc.setTextColor(GRAY);
    doc.text(`${i + 1}`, xTick, chartY + chartH + 5, { align: "center" });
  }
  const lastX = chartX + chartW;
  doc.text("25", lastX, chartY + chartH + 5, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(GRAY);
  doc.text("Година", chartX + chartW / 2, chartY + chartH + 12, { align: "center" });

  const legendY = chartY + chartH + 18;
  doc.setFillColor(GREEN);
  doc.rect(MX, legendY, 8, 3, "F");
  doc.setFontSize(8);
  doc.setTextColor(DARK);
  doc.text("Кумулативни спестявания", MX + 12, legendY + 3);

  doc.setDrawColor("#ef4444");
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([3, 2], 0);
  doc.line(MX + 90, legendY + 1.5, MX + 98, legendY + 1.5);
  doc.setLineDashPattern([], 0);
  doc.text("Цена на системата", MX + 102, legendY + 3);

  pageFooter(doc, 4, 8);
}

function pageProductSpecs(doc: jsPDF, data: PdfOfferData) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Продуктова Спецификация", MY + 10);

  const specs = [
    {
      title: "Соларни Панели",
      subtitle: "Монокристални MWT 450W",
      items: [
        ["Мощност", "450 W"],
        ["Ефективност", "21.5%"],
        ["Технология", "MWT (Metal Wrap Through)"],
        ["Гаранция", "30 години линейна производителност"],
        ["Брой", `${data.panelCount} бр.`],
        ["Обща мощност", `${data.systemSizeKwp.toFixed(2)} kWp`],
      ],
    },
    {
      title: "Инвертор",
      subtitle: "SolarEdge HD-Wave",
      items: [
        ["Тип", "Хибриден инвертор"],
        ["Ефективност", "99.5%"],
        ["Мониторинг", "Вграден Wi-Fi мониторинг"],
        ["Гаранция", "12 години"],
        ["Оптимизатори", "Индивидуален MPPT за всеки панел"],
      ],
    },
  ];

  if (data.hasBattery) {
    specs.push({
      title: "Батерия",
      subtitle: `LiFePO4 – ${data.batteryCapacityKwh} kWh`,
      items: [
        ["Капацитет", `${data.batteryCapacityKwh} kWh`],
        ["Технология", "LiFePO4 (LFP)"],
        ["Цикли", "6 000+"],
        ["Гаранция", "10 години"],
        ["DoD (Дълбочина на разряд)", "95%"],
      ],
    });
  }

  const colW = (CONTENT_W - (specs.length - 1) * 10) / specs.length;

  for (let s = 0; s < specs.length; s++) {
    const spec = specs[s]!;
    const sx = MX + s * (colW + 10);

    doc.setFillColor(BG_CARD);
    doc.roundedRect(sx, y, colW, PH - y - 35, 3, 3, "F");

    doc.setFillColor(GREEN);
    doc.roundedRect(sx, y, colW, 22, 3, 3, "F");
    doc.setFillColor(GREEN);
    doc.rect(sx, y + 16, colW, 6, "F");

    doc.setFontSize(13);
    doc.setTextColor(WHITE);
    doc.text(spec.title, sx + colW / 2, y + 14, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(GRAY);
    doc.text(spec.subtitle, sx + colW / 2, y + 32, { align: "center" });

    let iy = y + 42;
    for (const [label, value] of spec.items) {
      doc.setFontSize(9);
      doc.setTextColor(GRAY);
      doc.text(label!, sx + 10, iy);

      doc.setFontSize(10);
      doc.setTextColor(DARK);
      doc.text(value!, sx + 10, iy + 8);

      doc.setDrawColor("#e2e8f0");
      doc.setLineWidth(0.15);
      doc.line(sx + 10, iy + 12, sx + colW - 10, iy + 12);
      iy += 18;
    }
  }

  pageFooter(doc, 5, 8);
}

function pageInstallation(doc: jsPDF) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Процес на Инсталация", MY + 10);

  const steps = [
    {
      num: "01",
      title: "Консултация",
      desc: "Безплатна техническа консултация на място. Анализ на покрива, електрическата инсталация и потреблението.",
    },
    {
      num: "02",
      title: "Проектиране",
      desc: "Изготвяне на детайлен технически проект с 3D визуализация, съобразен с вашите специфични нужди.",
    },
    {
      num: "03",
      title: "Документация",
      desc: "Подготовка на цялата необходима документация за присъединяване към електроразпределителното дружество.",
    },
    {
      num: "04",
      title: "Монтаж",
      desc: "Професионален монтаж от сертифициран екип. Средна продължителност 2–3 дни за жилищни системи.",
    },
    {
      num: "05",
      title: "Свързване",
      desc: "Свързване към електрическата мрежа и настройка на системата за мониторинг в реално време.",
    },
    {
      num: "06",
      title: "Активиране",
      desc: "Финално тестване, пускане в експлоатация и обучение за ползване на мониторинг приложението.",
    },
  ];

  const cols = 3;
  const rows = 2;
  const gapX = 10;
  const gapY = 10;
  const boxW = (CONTENT_W - gapX * (cols - 1)) / cols;
  const boxH = (PH - y - 40 - gapY) / rows;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]!;
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = MX + col * (boxW + gapX);
    const by = y + row * (boxH + gapY);

    doc.setFillColor(BG_CARD);
    doc.roundedRect(bx, by, boxW, boxH, 3, 3, "F");

    doc.setFillColor(GREEN);
    doc.circle(bx + 16, by + 16, 8, "F");
    doc.setFontSize(12);
    doc.setTextColor(WHITE);
    doc.text(step.num, bx + 16, by + 18, { align: "center" });

    doc.setFontSize(13);
    doc.setTextColor(DARK);
    doc.text(step.title, bx + 30, by + 18);

    doc.setFontSize(9);
    doc.setTextColor(GRAY);
    const lines = doc.splitTextToSize(step.desc, boxW - 20);
    doc.text(lines, bx + 10, by + 30);
  }

  pageFooter(doc, 6, 8);
}

function pageEnvironmentalImpact(doc: jsPDF, data: PdfOfferData) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Екологичен Принос", MY + 10);

  const boxW = (CONTENT_W - 16) / 3;
  const boxH = 50;

  drawInfoBox(doc, MX, y, boxW, boxH, "CO₂ спестено годишно", `${fmt(data.co2SavedKgPerYear)} kg`, true);
  drawInfoBox(doc, MX + boxW + 8, y, boxW, boxH, "Еквивалент на дървета", `${data.treeEquivalent < 10 ? data.treeEquivalent.toFixed(1) : fmt(data.treeEquivalent)}`);
  drawInfoBox(doc, MX + (boxW + 8) * 2, y, boxW, boxH, "CO₂ за 25 години", `${fmt(data.co2SavedKgPerYear * 25)} kg`);

  y += boxH + 16;

  doc.setFontSize(13);
  doc.setTextColor(DARK);
  doc.text("25-годишна екологична прогноза", MX, y);
  y += 10;

  const chartX = MX + 10;
  const chartW = CONTENT_W - 20;
  const chartH = PH - y - 40;

  doc.setDrawColor("#e2e8f0");
  doc.setLineWidth(0.3);
  doc.line(chartX, y, chartX, y + chartH);
  doc.line(chartX, y + chartH, chartX + chartW, y + chartH);

  const co2_25 = data.co2SavedKgPerYear * 25;
  const trees_25 = data.treeEquivalent * 25;
  const maxBarVal = co2_25;

  for (let i = 0; i <= 4; i++) {
    const gridY = y + chartH - (chartH * i) / 4;
    doc.setDrawColor("#f1f5f9");
    doc.setLineWidth(0.15);
    doc.line(chartX, gridY, chartX + chartW, gridY);
    doc.setFontSize(7);
    doc.setTextColor(GRAY_LIGHT);
    doc.text(`${fmt((maxBarVal * i) / 4)} kg`, chartX - 2, gridY + 1, { align: "right" });
  }

  const milestoneYears = [1, 5, 10, 15, 20, 25];
  const barW = chartW / (milestoneYears.length * 2 + 1);

  for (let i = 0; i < milestoneYears.length; i++) {
    const yr = milestoneYears[i]!;
    const co2Val = data.co2SavedKgPerYear * yr;
    const barH = (co2Val / maxBarVal) * (chartH - 6);
    const bx = chartX + (i * 2 + 1) * barW;

    doc.setFillColor(GREEN);
    doc.roundedRect(bx, y + chartH - barH, barW * 0.8, barH, 1, 1, "F");

    doc.setFontSize(7);
    doc.setTextColor(DARK);
    doc.text(`${fmt(co2Val)}`, bx + barW * 0.4, y + chartH - barH - 3, { align: "center" });

    doc.setFontSize(7);
    doc.setTextColor(GRAY);
    doc.text(`${yr} г.`, bx + barW * 0.4, y + chartH + 5, { align: "center" });
  }

  y = y + chartH + 14;
  doc.setFontSize(9);
  doc.setTextColor(GRAY);
  doc.text(
    `За 25 години вашата система ще предотврати ${fmt(co2_25)} kg CO₂ емисии — еквивалентът на ${fmt(trees_25)} дървета.`,
    MX,
    y,
  );

  pageFooter(doc, 7, 8);
}

function pageWarrantyAndNextSteps(doc: jsPDF) {
  doc.setFillColor(WHITE);
  doc.rect(0, 0, PW, PH, "F");

  let y = sectionTitle(doc, "Гаранция и Следващи Стъпки", MY + 10);

  doc.setFontSize(14);
  doc.setTextColor(DARK);
  doc.text("Гаранционни Условия", MX, y);
  y += 8;

  const warranties = [
    { component: "Соларни панели", period: "30 години", desc: "Линейна гаранция за производителност (мин. 87.4% на 25-та година)" },
    { component: "Инвертор", period: "12 години", desc: "Пълна гаранция, с опция за удължаване до 25 години" },
    { component: "Батерия", period: "10 години", desc: "Гаранция за капацитет (мин. 70% след 6 000 цикъла)" },
    { component: "Монтаж", period: "5 години", desc: "Гаранция за качество на монтажни дейности и конструкция" },
  ];

  const wBoxW = (CONTENT_W - 12) / 2;
  const wBoxH = 36;

  for (let i = 0; i < warranties.length; i++) {
    const w = warranties[i]!;
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = MX + col * (wBoxW + 12);
    const by = y + row * (wBoxH + 6);

    doc.setFillColor(BG_CARD);
    doc.roundedRect(bx, by, wBoxW, wBoxH, 3, 3, "F");

    doc.setFontSize(11);
    doc.setTextColor(DARK);
    doc.text(w.component, bx + 10, by + 12);

    doc.setFontSize(13);
    doc.setTextColor(GREEN);
    doc.text(w.period, bx + wBoxW - 10, by + 12, { align: "right" });

    doc.setFontSize(8);
    doc.setTextColor(GRAY);
    const descLines = doc.splitTextToSize(w.desc, wBoxW - 20);
    doc.text(descLines, bx + 10, by + 22);
  }

  y += Math.ceil(warranties.length / 2) * (wBoxH + 6) + 16;

  doc.setDrawColor("#e2e8f0");
  doc.setLineWidth(0.3);
  doc.line(MX, y, PW - MX, y);
  y += 12;

  doc.setFontSize(14);
  doc.setTextColor(DARK);
  doc.text("Следващи Стъпки", MX, y);
  y += 10;

  const nextSteps = [
    "Свържете се с нас за безплатна консултация на място",
    "Нашият екип ще изготви детайлен технически проект",
    "Получете финална оферта с фиксирана цена",
    "Насладете се на чиста енергия и спестявания",
  ];

  for (let i = 0; i < nextSteps.length; i++) {
    doc.setFillColor(GREEN);
    doc.circle(MX + 6, y + 1, 4, "F");
    doc.setFontSize(10);
    doc.setTextColor(WHITE);
    doc.text(`${i + 1}`, MX + 6, y + 3, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(DARK);
    doc.text(nextSteps[i]!, MX + 16, y + 3);
    y += 14;
  }

  y += 8;
  doc.setFillColor(GREEN);
  doc.roundedRect(MX, y, CONTENT_W, 40, 4, 4, "F");

  doc.setFontSize(16);
  doc.setTextColor(WHITE);
  doc.text("Готови ли сте за следващата стъпка?", MX + CONTENT_W / 2, y + 16, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor("#c8e6c0");
  doc.text(
    "solaron.bg  ·  +359 88 123 4567  ·  info@solaron.bg",
    MX + CONTENT_W / 2,
    y + 30,
    { align: "center" },
  );

  pageFooter(doc, 8, 8);
}

export async function generateSolarOffer(data: PdfOfferData): Promise<void> {
  const jsPDFModule = await import(/* webpackIgnore: true */ "jspdf");
  const jsPDF = jsPDFModule.default;
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  pageCover(doc);

  doc.addPage();
  pageSystemOverview(doc, data);

  doc.addPage();
  pageFinancialAnalysis(doc, data);

  doc.addPage();
  pageRoiTimeline(doc, data);

  doc.addPage();
  pageProductSpecs(doc, data);

  doc.addPage();
  pageInstallation(doc);

  doc.addPage();
  pageEnvironmentalImpact(doc, data);

  doc.addPage();
  pageWarrantyAndNextSteps(doc);

  doc.save("Solaron-Оферта.pdf");
}
