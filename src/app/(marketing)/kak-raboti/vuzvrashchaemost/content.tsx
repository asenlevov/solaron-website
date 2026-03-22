"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  LineChart,
  Sun,
  Compass,
  Eye,
  Zap,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { SolutionCTA } from "@/components/marketing/solution-page-shared";
import { KAK_RABOTI_IMAGES } from "@/data/images";
import { blurIn, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Data ────────────────────────────────────────────────────────── */

const ROI_FACTORS = [
  {
    icon: Compass,
    title: "Ориентация и наклон",
    highlight: "Юг 30° = 100%",
    desc: "Южно изложение при 30° наклон дава максимален годишен добив. Югоизток/Югозапад ≈ 95%. Изток/Запад ≈ 85% — разпределят производството по часове, но намаляват общия обем.",
  },
  {
    icon: Eye,
    title: "Засенчване",
    highlight: "5% сянка → −20–30%",
    desc: "Дори 5% засенчване намалява производството с 20–30% при стрингови инвертори. Оптимизаторите и микроинверторите смекчават ефекта, но огледът на място е задължителен.",
  },
  {
    icon: Zap,
    title: "Потребление",
    highlight: "Самопотребление > продажба",
    desc: "Колкото повече консумирате сами, толкова по-висок е ROI. Самопотреблението спестява пълната цена на тока, докато продажбата към мрежата носи по-малко.",
  },
  {
    icon: TrendingUp,
    title: "Цени на тока",
    highlight: "0.25 лв → 5.2 г. | 0.30 лв → 4.3 г.",
    desc: "При 0.25 лв/kWh payback е 5.2 години. При 0.30 лв/kWh — само 4.3. Всяко поскъпване на тока ускорява изплащането на инвестицията.",
  },
] as const;

const PVGIS_STATS = [
  { label: "Годишно производство", value: "6 500 kWh/yr" },
  { label: "Специфичен добив", value: "1 300 kWh/kWp" },
  { label: "Performance Ratio", value: "82%" },
] as const;

const CASE_STUDY = {
  system: "5 kWp — 10× LONGi Hi-MO 6 + SolarEdge SE5000H",
  investment: 12500,
  annualProduction: 6500,
  annualSavings: 1625,
  payback: 5.2,
  return25yr: 35000,
  pricePerKwh: 0.25,
} as const;

const CUMULATIVE_SAVINGS = [
  { year: 1, savings: 1625 },
  { year: 2, savings: 3250 },
  { year: 3, savings: 4875 },
  { year: 4, savings: 6500 },
  { year: 5, savings: 8125 },
  { year: 6, savings: 9750 },
  { year: 7, savings: 11375 },
  { year: 8, savings: 13000 },
  { year: 9, savings: 14625 },
  { year: 10, savings: 16250 },
] as const;

const MAX_SAVINGS = 16250;

const PAYBACK_TABLE = [
  {
    system: "3 kWp",
    investment: "7 500 лв.",
    production: "3 900 kWh",
    savings: "975 лв.",
    payback: "7.7 г.",
  },
  {
    system: "5 kWp",
    investment: "12 500 лв.",
    production: "6 500 kWh",
    savings: "1 625 лв.",
    payback: "5.2 г.",
    highlighted: true,
  },
  {
    system: "10 kWp",
    investment: "22 000 лв.",
    production: "13 000 kWh",
    savings: "3 250 лв.",
    payback: "4.5 г.",
  },
  {
    system: "15 kWp",
    investment: "30 000 лв.",
    production: "19 500 kWh",
    savings: "4 875 лв.",
    payback: "4.1 г.",
  },
] as const;

const FAQS = [
  {
    q: "Колко точно пари ще спестя с фотоволтаична система?",
    a: "Спестяванията зависят от консумацията, ориентацията на покрива, цената на тока и дела на самопотреблението. За типична 5 kWp система в България — около 1 600 лв. годишно при 0.25 лв/kWh. Нашият калкулатор дава персонализирана 25-годишна прогноза.",
  },
  {
    q: "Какво е PVGIS и мога ли да му вярвам?",
    a: "PVGIS е безплатен инструмент на Joint Research Centre (JRC) към Европейската комисия. Използва сателитни данни за слънчев ресурс и е стандартен референтен инструмент в индустрията. Стойностите му са консервативни и обикновено се потвърждават от реалните данни.",
  },
  {
    q: "Деградацията на панелите влияе ли на ROI?",
    a: "Да, но минимално. Съвременните панели губят около 0.4% мощност годишно. За 25 години общата загуба е около 10%. Нашите калкулации включват деградацията, затова payback от 5.2 години е реалистичен, а не оптимистичен.",
  },
  {
    q: "По-голямата система винаги ли е по-изгодна?",
    a: "Не задължително. По-голямата система има по-нисък payback заради икономия от мащаба, но ако излишъкът надхвърля консумацията ви, допълнителният kWh се продава на по-ниска цена. Оптималният размер балансира инвестиция, консумация и покривно пространство.",
  },
  {
    q: "Включена ли е батерията в тези изчисления?",
    a: "Не. Цифрите тук са за мрежови системи без батерия. Добавянето на батерия увеличава инвестицията с 4 000–8 000 лв., но повишава самопотреблението. За домакинства с голяма вечерна консумация батерията може да подобри ROI.",
  },
] as const;

/* ─── Chart Components ────────────────────────────────────────────── */

function CumulativeSavingsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end gap-2 md:gap-3 h-64 md:h-80">
        {CUMULATIVE_SAVINGS.map((d, i) => {
          const heightPercent = (d.savings / MAX_SAVINGS) * 100;
          const isBreakEven = d.year === 5;
          return (
            <div
              key={d.year}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <motion.div
                className={`text-[10px] md:text-xs font-bold tabular-nums ${isBreakEven ? "text-amber-400" : "text-white/60"}`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                {d.savings >= 1000
                  ? `${(d.savings / 1000).toFixed(1)}K`
                  : d.savings}
              </motion.div>
              <div className="relative w-full flex-1 flex items-end">
                <motion.div
                  className={`w-full rounded-t-md ${
                    d.savings >= CASE_STUDY.investment
                      ? "bg-gradient-to-t from-accent to-accent/60"
                      : "bg-gradient-to-t from-white/30 to-white/10"
                  }`}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${heightPercent}%` } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                {isBreakEven && (
                  <motion.div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-amber-400 px-2 py-0.5 text-[9px] font-bold text-black"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.2 }}
                  >
                    BREAK-EVEN
                  </motion.div>
                )}
              </div>
              <span className="text-[10px] md:text-xs text-white/60 font-medium">
                {d.year} г.
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-center gap-6 text-xs text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-white/20" />{" "}
          Преди изплащане
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent" />{" "}
          След изплащане
        </span>
      </div>
    </div>
  );
}

/* ─── PVGIS Visual ────────────────────────────────────────────────── */

function PVGISMockVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <GlowCard>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-lg bg-blue-50 p-2.5">
                <BarChart3 className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  PVGIS Simulation
                </p>
                <p className="text-xs text-foreground-tertiary">
                  Joint Research Centre — EC
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-border bg-background-secondary/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="size-4 text-amber-500" />
                <span className="text-xs font-semibold text-foreground">
                  Локация: Пловдив, България (42.15°N, 24.75°E)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-foreground-tertiary text-xs">
                    Система
                  </span>
                  <p className="font-semibold text-foreground">5 kWp</p>
                </div>
                <div>
                  <span className="text-foreground-tertiary text-xs">
                    Наклон / Азимут
                  </span>
                  <p className="font-semibold text-foreground">30° / Юг</p>
                </div>
                <div>
                  <span className="text-foreground-tertiary text-xs">
                    Загуби
                  </span>
                  <p className="font-semibold text-foreground">14% (типични)</p>
                </div>
                <div>
                  <span className="text-foreground-tertiary text-xs">
                    Технология
                  </span>
                  <p className="font-semibold text-foreground">Mono-Si</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {PVGIS_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-lg bg-accent/5 p-3 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-lg font-bold text-accent md:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] text-foreground-tertiary leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

/* ─── FAQ Accordion ───────────────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="border-b border-stone-200 last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-accent md:text-lg">
          {q}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-foreground-tertiary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 pr-8 text-base leading-relaxed text-foreground-secondary">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Content ────────────────────────────────────────────────── */

export function VuzvrashchaemostContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="overflow-hidden">
      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative flex min-h-[90vh] items-end">
        <ImageEditorial
          src={KAK_RABOTI_IMAGES.vuzvrashchaemost}
          alt="Фотоволтаична система — възвръщаемост на инвестицията"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BadgeChip variant="hero">ROI</BadgeChip>
          </motion.div>

          <TextReveal
            as="h1"
            className="editorial-hero mt-6 max-w-4xl text-white"
            delay={0.1}
          >
            Възвръщаемост на Инвестицията
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Конкретни числа. Реални проекти. Прозрачни калкулации.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-8 md:gap-12"
          >
            <motion.div variants={staggerItem}>
              <StatNumber
                value={5.2}
                suffix=" год."
                context="Среден ROI"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={6500}
                suffix=" kWh"
                context="Год. производство 5kWp"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={1625}
                suffix=" лв."
                context="Год. спестяване"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. ROI FACTORS ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Фактори
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Какво определя ROI?
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Четири ключови фактора определят колко бързо се изплаща
            фотоволтаичната система.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {ROI_FACTORS.map((factor) => (
              <motion.div key={factor.title} variants={staggerItem}>
                <TiltCard className="h-full">
                  <GlowCard className="h-full">
                    <div className="p-6 md:p-8">
                      <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                        <factor.icon
                          className="size-6 text-accent"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {factor.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-accent">
                        {factor.highlight}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                        {factor.desc}
                      </p>
                    </div>
                  </GlowCard>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. PVGIS VISUAL ── */}
      <section className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Инструмент
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            PVGIS — Европейски Калкулатор
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Joint Research Centre (JRC) поддържа безплатния PVGIS инструмент,
            който комбинира сателитни данни за слънчев ресурс с параметрите на
            инсталацията.
          </motion.p>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <PVGISMockVisual />

            <motion.div
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Изберете локация",
                    text: "Посочете адреса на покрива и PVGIS използва сателитни данни за слънчевия ресурс на точното място.",
                  },
                  {
                    num: "02",
                    title: "Въведете параметри",
                    text: "Мощност на системата, наклон, азимут и загуби — за по-реалистична прогноза добавете реалните стойности от огледа.",
                  },
                  {
                    num: "03",
                    title: "Получете прогноза",
                    text: "Годишно производство в kWh, месечни стойности и Performance Ratio — основа за ROI калкулацията.",
                  },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <MagneticButton
                href="https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en"
                variant="outline"
                size="md"
              >
                Отвори PVGIS
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. CASE STUDY ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Казус
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Реален Казус: 5 kWp, Пловдив
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            {CASE_STUDY.system} — южен покрив без засенчване.
          </motion.p>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            >
              <div className="grid grid-cols-2 gap-4 mb-8">
                <GlowCard>
                  <div className="p-5 text-center">
                    <StatNumber
                      value={CASE_STUDY.investment}
                      suffix=" лв."
                      context="Инвестиция"
                      className="text-2xl text-foreground md:text-3xl"
                      contextClassName="text-foreground-secondary"
                    />
                  </div>
                </GlowCard>
                <GlowCard>
                  <div className="p-5 text-center">
                    <StatNumber
                      value={CASE_STUDY.annualProduction}
                      suffix=" kWh"
                      context="Год. производство"
                      className="text-2xl text-foreground md:text-3xl"
                      contextClassName="text-foreground-secondary"
                    />
                  </div>
                </GlowCard>
                <GlowCard>
                  <div className="p-5 text-center">
                    <StatNumber
                      value={CASE_STUDY.annualSavings}
                      suffix=" лв."
                      context="Год. спестяване"
                      className="text-2xl text-accent md:text-3xl"
                      contextClassName="text-foreground-secondary"
                    />
                  </div>
                </GlowCard>
                <GlowCard>
                  <div className="p-5 text-center">
                    <StatNumber
                      value={CASE_STUDY.return25yr}
                      prefix="+"
                      suffix=" лв."
                      context="Доход за 25 год."
                      className="text-2xl text-foreground md:text-3xl"
                      contextClassName="text-foreground-secondary"
                    />
                  </div>
                </GlowCard>
              </div>

              <div className="rounded-xl border border-border p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">
                    Цена на kWh
                  </span>
                  <span className="font-semibold text-foreground">
                    {CASE_STUDY.pricePerKwh} лв.
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">
                    Payback период
                  </span>
                  <span className="font-bold text-accent">
                    {CASE_STUDY.payback} години
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">
                    Деградация
                  </span>
                  <span className="font-semibold text-foreground">
                    0.4% / год. (включена)
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="rounded-2xl bg-foreground p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <LineChart className="size-5 text-accent" />
                <h3 className="font-display text-lg font-bold text-white">
                  Кумулативни спестявания
                </h3>
              </div>
              <CumulativeSavingsChart />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PAYBACK COMPARISON TABLE ── */}
      <section className="relative bg-foreground px-6 py-24 text-white md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4 !text-amber-400"
          >
            Сравнение
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6 text-white">
            Сравнение по размер на системата
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-white/50"
          >
            По-големите системи имат по-нисък payback заради икономия от
            мащаба. Ето как се сравняват четирите най-популярни конфигурации.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto rounded-xl border border-white/10"
          >
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-5 py-4 font-display font-semibold text-white">
                    Система
                  </th>
                  <th className="px-5 py-4 font-display font-semibold text-white">
                    Инвестиция
                  </th>
                  <th className="px-5 py-4 font-display font-semibold text-white">
                    Год. производство
                  </th>
                  <th className="px-5 py-4 font-display font-semibold text-white">
                    Год. спестяване
                  </th>
                  <th className="px-5 py-4 font-display font-semibold text-white">
                    Payback
                  </th>
                </tr>
              </thead>
              <tbody>
                {PAYBACK_TABLE.map((row, i) => (
                  <motion.tr
                    key={row.system}
                    className={`border-b border-white/5 transition-colors hover:bg-white/5 ${"highlighted" in row && row.highlighted ? "bg-accent/10" : ""}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <td className="px-5 py-4 font-semibold text-white">
                      {row.system}
                    </td>
                    <td className="px-5 py-4 text-white/70">
                      {row.investment}
                    </td>
                    <td className="px-5 py-4 text-white/70">
                      {row.production}
                    </td>
                    <td className="px-5 py-4 text-white/70">{row.savings}</td>
                    <td
                      className={`px-5 py-4 font-bold ${"highlighted" in row && row.highlighted ? "text-accent" : "text-amber-400"}`}
                    >
                      {row.payback}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 text-sm text-white/30"
          >
            * Стойностите са ориентировъчни при 0.25 лв/kWh и южен покрив без
            засенчване. Реалните числа зависят от конкретните условия.
          </motion.p>
        </div>
      </section>

      {/* ── 6. FAQ + CTA ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <TextReveal as="h2" className="editorial-display mb-12 text-center">
            Често задавани въпроси
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>

          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 flex justify-center"
          >
            <MagneticButton
              href="/instrumenti/roi-kalkulator"
              variant="primary"
              size="lg"
            >
              Пресметнете с вашите параметри
              <ArrowRight className="size-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <SolutionCTA />
    </main>
  );
}
