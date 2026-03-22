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

function n(v: number): string {
  return new Intl.NumberFormat("bg-BG").format(Math.round(v));
}

function lv(v: number): string {
  return `${new Intl.NumberFormat("bg-BG").format(Math.round(v))} лв.`;
}

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

function headerBar(doc: Doc) {
  doc.setFillColor(G);
  doc.rect(0, 0, PW, 3.5, "F");
}

function footer(doc: Doc, pg: number, total: number) {
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
  doc.text("Персонализирана Соларна Оферта", MX + sw + doc.getTextWidth("on") + 4, PH - 10);
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

function pageCover(doc: Doc, data: PdfOfferData) {
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
  doc.text("Персонализирана Соларна Оферта", MX + 28, 96);

  doc.setFontSize(11);
  doc.setTextColor(G4);
  const today = new Date().toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${today}  |  ${data.city}  |  ${data.systemSizeKwp.toFixed(1)} kWp`, MX + 28, 112);

  const statsY = 128;
  const statsData = [
    { label: "Панели", value: `${data.panelCount}` },
    { label: "Мощност", value: `${data.systemSizeKwp.toFixed(1)} kWp` },
    { label: "Спестявания/г.", value: lv(data.annualSavings) },
    { label: "Изплащане", value: Number.isFinite(data.paybackYears) ? `${data.paybackYears.toFixed(1)} г.` : "—" },
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
  doc.text(
    "Този документ е генериран от Solaron конфигуратора. За финална оферта, свържете се с нас.",
    PW / 2,
    PH - 16,
    { align: "center" },
  );

  doc.setFontSize(7.5);
  doc.setTextColor(G4);
  doc.text("solaron.pro  |  +359 896 699 009  |  info@solaron.pro", PW / 2, PH - 9, {
    align: "center",
  });
}

function pageSystem(doc: Doc, data: PdfOfferData) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, "Вашата Соларна Система", 22);

  const bw = (CW - 16) / 3;
  const bh = 36;

  card(doc, MX, y, bw, bh, "Мощност", `${data.systemSizeKwp.toFixed(2)} kWp`, true);
  card(doc, MX + bw + 8, y, bw, bh, "Панели", `${data.panelCount} бр.`);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, "Покривна площ", `${data.roofArea} м\u00B2`);

  y += bh + 8;
  card(doc, MX, y, bw, bh, "Ориентация", data.roofOrientation);
  card(doc, MX + bw + 8, y, bw, bh, "Наклон", `${data.roofPitch}\u00B0`);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, "Град", data.city);

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
    doc.text("Батерийно Съхранение", MX + 14, y + 13);

    doc.setFont("Inter", "bold");
    doc.setFontSize(14);
    doc.setTextColor(G);
    doc.text(`${data.batteryCapacityKwh} kWh`, MX + 14, y + 24);

    doc.setFont("Inter", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(G6);
    doc.text("LiFePO4  |  6 000+ цикъла  |  10 г. гаранция", MX + 80, y + 19);

    y += 40;
  }

  doc.setFillColor(BG);
  doc.roundedRect(MX, y, CW, 28, 3, 3, "F");

  doc.setFont("Inter", "normal");
  doc.setFontSize(9);
  doc.setTextColor(G6);
  doc.text("Годишно производство", MX + 12, y + 11);
  doc.setFont("Inter", "bold");
  doc.setFontSize(13);
  doc.setTextColor(D);
  doc.text(`${n(data.annualProductionKwh)} kWh`, MX + 12, y + 22);

  doc.setFont("Inter", "normal");
  doc.setFontSize(9);
  doc.setTextColor(G6);
  doc.text("Месечна сметка", MX + CW / 2 + 12, y + 11);
  doc.setFont("Inter", "bold");
  doc.setFontSize(13);
  doc.setTextColor(D);
  doc.text(lv(data.monthlyBill), MX + CW / 2 + 12, y + 22);

  footer(doc, 2, 8);
}

function pageFinance(doc: Doc, data: PdfOfferData) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, "Финансов Анализ", 22);

  const bw = (CW - 24) / 4;
  const bh = 40;

  card(doc, MX, y, bw, bh, "Месечни спестявания", lv(data.annualSavings / 12));
  card(doc, MX + bw + 8, y, bw, bh, "Годишни спестявания", lv(data.annualSavings), true);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, "Спестявания (25 г.)", lv(data.savings25yr));
  card(doc, MX + (bw + 8) * 3, y, bw, bh, "Цена на системата", lv(data.systemCost));

  y += bh + 10;

  doc.setFillColor(CARD);
  doc.roundedRect(MX, y, CW, 24, 3, 3, "F");
  doc.setFillColor(G);
  doc.roundedRect(MX, y, 4, 24, 2, 0, "F");
  doc.rect(MX + 2, y, 2, 24, "F");

  doc.setFont("Inter", "normal");
  doc.setFontSize(10);
  doc.setTextColor(G6);
  doc.text("Период на изплащане:", MX + 14, y + 15);
  doc.setFont("Inter", "bold");
  doc.setFontSize(16);
  doc.setTextColor(G);
  const payT = Number.isFinite(data.paybackYears) ? `${data.paybackYears.toFixed(1)} години` : "\u2014";
  doc.text(payT, MX + 75, y + 15);

  y += 36;

  doc.setFont("Inter", "bold");
  doc.setFontSize(11);
  doc.setTextColor(D);
  doc.text("Натрупване на спестявания по години", MX, y);
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
  doc.text("Година", cX + cW / 2, y + cH + 9, { align: "center" });

  footer(doc, 3, 8);
}

function pageROI(doc: Doc, data: PdfOfferData) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, "Възвръщаемост на Инвестицията", 22);

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
  doc.text(`Инвестиция: ${lv(data.systemCost)}`, cX + cW, costY - 2, { align: "right" });

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
    doc.text(`Изплащане: ${data.paybackYears.toFixed(1)} г.`, bx, costY - 5, { align: "center" });
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
  doc.text("Година", cX + cW / 2, cY + cH + 10, { align: "center" });

  y = cY + cH + 16;
  doc.setFillColor(G);
  doc.rect(MX, y, 8, 3, "F");
  doc.setFont("Inter", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(D);
  doc.text("Кумулативни спестявания", MX + 12, y + 2.5);

  doc.setDrawColor("#ef4444");
  doc.setLineWidth(0.35);
  doc.setLineDashPattern([3, 2], 0);
  doc.line(MX + 80, y + 1.5, MX + 88, y + 1.5);
  doc.setLineDashPattern([], 0);
  doc.text("Цена на системата", MX + 92, y + 2.5);

  footer(doc, 4, 8);
}

function pageSpecs(doc: Doc, data: PdfOfferData) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  const y = heading(doc, "Продуктова Спецификация", 22);

  const specs = [
    {
      title: "Соларни Панели",
      sub: "Монокристални MWT 450W",
      rows: [
        ["Мощност", "450 W"],
        ["Ефективност", "21.5%"],
        ["Технология", "MWT (Metal Wrap Through)"],
        ["Гаранция", "30 г. линейна"],
        ["Брой", `${data.panelCount} бр.`],
        ["Обща мощност", `${data.systemSizeKwp.toFixed(2)} kWp`],
      ],
    },
    {
      title: "Инвертор",
      sub: "SolarEdge HD-Wave",
      rows: [
        ["Тип", "Хибриден"],
        ["Ефективност", "99.5%"],
        ["Мониторинг", "Wi-Fi"],
        ["Гаранция", "12 години"],
        ["Оптимизатори", "MPPT за панел"],
      ],
    },
  ];

  if (data.hasBattery) {
    specs.push({
      title: "Батерия",
      sub: `LiFePO4 \u2013 ${data.batteryCapacityKwh} kWh`,
      rows: [
        ["Капацитет", `${data.batteryCapacityKwh} kWh`],
        ["Технология", "LiFePO4 (LFP)"],
        ["Цикли", "6 000+"],
        ["Гаранция", "10 години"],
        ["DoD", "95%"],
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

  footer(doc, 5, 8);
}

function pageInstall(doc: Doc) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  const y = heading(doc, "Процес на Инсталация", 22);

  const steps = [
    { num: "01", t: "Консултация", d: "Безплатна техническа консултация на място. Анализ на покрива и потреблението." },
    { num: "02", t: "Проектиране", d: "Детайлен технически проект с 3D визуализация, съобразен с вашите нужди." },
    { num: "03", t: "Документация", d: "Цялата документация за присъединяване към електроразпределителното дружество." },
    { num: "04", t: "Монтаж", d: "Професионален монтаж от сертифициран екип. 2\u20133 дни за жилищни системи." },
    { num: "05", t: "Свързване", d: "Свързване към мрежата и настройка на мониторинг системата в реално време." },
    { num: "06", t: "Активиране", d: "Финално тестване, пускане и обучение за ползване на мониторинг приложението." },
  ];

  const cols = 3;
  const gX = 8;
  const gY = 8;
  const bW = (CW - gX * (cols - 1)) / cols;
  const bH = (PH - y - 32 - gY) / 2;

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i]!;
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

  footer(doc, 6, 8);
}

function pageEnv(doc: Doc, data: PdfOfferData) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, "Екологичен Принос", 22);

  const bw = (CW - 16) / 3;
  const bh = 44;

  card(doc, MX, y, bw, bh, "CO\u2082 спестено годишно", `${n(data.co2SavedKgPerYear)} kg`, true);
  card(doc, MX + bw + 8, y, bw, bh, "Еквивалент на дървета", `${data.treeEquivalent < 10 ? data.treeEquivalent.toFixed(1) : n(data.treeEquivalent)}`);
  card(doc, MX + (bw + 8) * 2, y, bw, bh, "CO\u2082 за 25 години", `${n(data.co2SavedKgPerYear * 25)} kg`);

  y += bh + 14;

  doc.setFont("Inter", "bold");
  doc.setFontSize(11);
  doc.setTextColor(D);
  doc.text("25-годишна екологична прогноза", MX, y);
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
    doc.text(`${yr} г.`, bx + barW * 0.4, y + cH + 5, { align: "center" });
  }

  y = y + cH + 12;
  doc.setFont("Inter", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(G6);
  doc.text(
    `За 25 години вашата система ще предотврати ${n(co25)} kg CO\u2082 \u2014 еквивалент на ${n(data.treeEquivalent * 25)} дървета.`,
    MX,
    y,
  );

  footer(doc, 7, 8);
}

function pageWarranty(doc: Doc) {
  doc.setFillColor(W);
  doc.rect(0, 0, PW, PH, "F");
  headerBar(doc);

  let y = heading(doc, "Гаранция и Следващи Стъпки", 22);

  doc.setFont("Inter", "bold");
  doc.setFontSize(12);
  doc.setTextColor(D);
  doc.text("Гаранционни Условия", MX, y);
  y += 7;

  const warranties = [
    { c: "Соларни панели", p: "30 години", d: "Линейна гаранция (мин. 87.4% на 25-та година)" },
    { c: "Инвертор", p: "12 години", d: "Пълна гаранция, опция за удължаване до 25 г." },
    { c: "Батерия", p: "10 години", d: "Капацитет мин. 70% след 6 000 цикъла" },
    { c: "Монтаж", p: "5 години", d: "Качество на монтаж и конструкция" },
  ];

  const wW = (CW - 10) / 2;
  const wH = 34;

  for (let i = 0; i < warranties.length; i++) {
    const w = warranties[i]!;
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

  y += Math.ceil(warranties.length / 2) * (wH + 6) + 12;

  doc.setDrawColor("#e5e7eb");
  doc.setLineWidth(0.2);
  doc.line(MX, y, PW - MX, y);
  y += 10;

  doc.setFont("Inter", "bold");
  doc.setFontSize(12);
  doc.setTextColor(D);
  doc.text("Следващи Стъпки", MX, y);
  y += 9;

  const steps = [
    "Свържете се с нас за безплатна консултация",
    "Получете детайлен технически проект",
    "Финална оферта с фиксирана цена",
    "Насладете се на чиста енергия",
  ];

  for (let i = 0; i < steps.length; i++) {
    doc.setFillColor(G);
    doc.circle(MX + 5, y + 1, 3.5, "F");
    doc.setFont("Inter", "bold");
    doc.setFontSize(9);
    doc.setTextColor(W);
    doc.text(`${i + 1}`, MX + 5, y + 3, { align: "center" });

    doc.setFont("Inter", "normal");
    doc.setFontSize(10);
    doc.setTextColor(D);
    doc.text(steps[i]!, MX + 14, y + 3);
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
  doc.text("Готови ли сте за следващата стъпка?", MX + CW / 2, y + 18, { align: "center" });

  doc.setFont("Inter", "normal");
  doc.setFontSize(10);
  doc.setTextColor(GL);
  doc.text("solaron.pro  |  +359 896 699 009  |  info@solaron.pro", MX + CW / 2, y + 30, {
    align: "center",
  });

  footer(doc, 8, 8);
}

export async function generateSolarOffer(data: PdfOfferData): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  await loadFonts(doc);

  pageCover(doc, data);

  doc.addPage();
  pageSystem(doc, data);

  doc.addPage();
  pageFinance(doc, data);

  doc.addPage();
  pageROI(doc, data);

  doc.addPage();
  pageSpecs(doc, data);

  doc.addPage();
  pageInstall(doc);

  doc.addPage();
  pageEnv(doc, data);

  doc.addPage();
  pageWarranty(doc);

  doc.save("Solaron-Оферта.pdf");
}
