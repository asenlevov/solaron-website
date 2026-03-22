"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  Sun,
  Zap,
  Battery,
  Gauge,
  Home,
  ArrowRight,
  Layers,
  Waves,
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

const SYSTEM_COMPONENTS = [
  {
    icon: Sun,
    title: "Соларни Панели",
    spec: "Монокристални 400–580 Wp",
    desc: "Високоефективни монокристални модули с 25-годишна гаранция за линейна мощност. Оптимизирани за българските климатични условия.",
  },
  {
    icon: Waves,
    title: "Инвертор",
    spec: "DC → AC, SolarEdge / Huawei",
    desc: "Преобразува постоянния ток от панелите в променлив 230V. MPPT проследяване осигурява максимална мощност при всякакви условия.",
  },
  {
    icon: Battery,
    title: "Батерия",
    spec: "LFP, 5–20 kWh опция",
    desc: "Литиево-желязо-фосфатни (LFP) акумулатори за съхранение на излишната енергия. Над 6 000 цикъла и 10-годишна гаранция.",
  },
  {
    icon: Gauge,
    title: "Мониторинг",
    spec: "WiFi / LAN, 24/7 данни",
    desc: "Облачен портал с данни в реално време за производство, потребление и спестявания. Аларми при отклонения от нормата.",
  },
] as const;

const REGIONS = [
  { name: "Южна България", range: "1 600–1 750 kWh/m²", percent: 95 },
  { name: "Черноморие", range: "1 500–1 650 kWh/m²", percent: 88 },
  { name: "Западна България", range: "1 350–1 500 kWh/m²", percent: 78 },
  { name: "Северна България", range: "1 400–1 550 kWh/m²", percent: 82 },
] as const;

const MONTHLY_PRODUCTION = [
  { month: "Ян", kwh: 200 },
  { month: "Фев", kwh: 280 },
  { month: "Мар", kwh: 450 },
  { month: "Апр", kwh: 600 },
  { month: "Май", kwh: 780 },
  { month: "Юни", kwh: 900 },
  { month: "Юли", kwh: 920 },
  { month: "Авг", kwh: 850 },
  { month: "Сеп", kwh: 650 },
  { month: "Окт", kwh: 400 },
  { month: "Ное", kwh: 250 },
  { month: "Дек", kwh: 180 },
] as const;

const MAX_KWH = 920;

const FAQS = [
  {
    q: "Какъв е фотоволтаичният ефект?",
    a: "Фотоволтаичният ефект е физично явление, при което фотоните от слънчевата светлина освобождават електрони в полупроводников материал (обикновено силиций), създавайки електрически ток. Открит е през 1839 г. от Александър-Едмон Бекерел.",
  },
  {
    q: "Каква е ефективността на съвременните панели?",
    a: "Монокристалните панели днес достигат 20–23% ефективност в реални условия. Премиум модулите с IBC или HJT технология надвишават 24%. За сравнение — преди 10 години средната ефективност беше 14–16%.",
  },
  {
    q: "Колко произвеждат панелите при облачно време?",
    a: "При облачно производството намалява до 10–30% от номиналното, но не спира напълно. Модерните панели работят и с дифузна слънчева светлина. Годишно облачността е вече включена в прогнозните модели.",
  },
  {
    q: "Колко години работи една соларна система?",
    a: "Панелите имат 25–30-годишна гаранция за мощност и реален живот над 35 години. Инверторите — 10–15 години. Батериите (LFP) — над 10 години и 6 000+ цикъла. Конструкцията издържа целия живот на системата.",
  },
  {
    q: "Трябва ли ми батерия задължително?",
    a: "Не. Мрежовата система без батерия е по-евтина и напълно функционална \u2014 мрежата действа като виртуално хранилище. Батерията се препоръчва при скъпи пикови тарифи, чести прекъсвания или желание за максимална автономия.",
  },
] as const;

/* ─── Animated SVG Components ─────────────────────────────────────── */

function PhotovoltaicDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="relative w-full max-w-lg mx-auto lg:mx-0">
      <svg viewBox="0 0 400 320" className="w-full" aria-hidden>
        {/* Sun */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <circle cx="80" cy="50" r="28" fill="#FBBF24" opacity={0.2} />
          <circle cx="80" cy="50" r="18" fill="#FBBF24" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.line
              key={angle}
              x1={80 + 26 * Math.cos((angle * Math.PI) / 180)}
              y1={50 + 26 * Math.sin((angle * Math.PI) / 180)}
              x2={80 + 36 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 36 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FBBF24"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={inView ? { opacity: 1, pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
            />
          ))}
        </motion.g>

        {/* Photon arrows */}
        {[0, 1, 2].map((i) => (
          <motion.line
            key={`photon-${i}`}
            x1={100 + i * 30}
            y1={80}
            x2={140 + i * 20}
            y2={140}
            stroke="#FBBF24"
            strokeWidth={2}
            strokeDasharray="6 4"
            markerEnd="url(#arrowYellow)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={inView ? { opacity: 0.7, pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.15, repeat: Infinity, repeatDelay: 2, repeatType: "loop" }}
          />
        ))}

        {/* Silicon cell */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <rect x="100" y="140" width="200" height="60" rx="6" fill="#1e3a5f" opacity={0.9} />
          <rect x="100" y="140" width="200" height="30" rx="0" fill="#2a5a8f" opacity={0.6} />
          <text x="200" y="158" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">N-тип силиций</text>
          <text x="200" y="183" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">P-тип силиций</text>
          <line x1="100" y1="170" x2="300" y2="170" stroke="#4ade80" strokeWidth={1.5} strokeDasharray="4 3" />
          <text x="320" y="173" fill="#4ade80" fontSize="9" fontWeight="600">PN преход</text>
        </motion.g>

        {/* Electron flow */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.path
            d="M 300 170 Q 340 170 340 210 Q 340 250 300 250 L 100 250 Q 60 250 60 210 Q 60 170 100 170"
            fill="none"
            stroke="#3B7A2A"
            strokeWidth={2}
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.3 }}
          />
          {/* Electron dots animating along the path */}
          <motion.circle
            r="4"
            fill="#4ade80"
            initial={{ opacity: 0 }}
            animate={inView ? {
              opacity: [0, 1, 1, 0],
              cx: [300, 340, 60, 100],
              cy: [170, 250, 250, 170],
            } : {}}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <text x="200" y="270" textAnchor="middle" fill="#3B7A2A" fontSize="11" fontWeight="700">DC ток →</text>
        </motion.g>

        {/* Inverter box */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <rect x="140" y="286" width="120" height="30" rx="6" fill="#3B7A2A" />
          <text x="200" y="305" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">Инвертор → AC 230V</text>
        </motion.g>

        <defs>
          <marker id="arrowYellow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#FBBF24" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function EnergyFlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const nodes = [
    { x: 60, label: "Слънце", icon: "☀️" },
    { x: 160, label: "Панели", icon: "⬛" },
    { x: 260, label: "Инвертор", icon: "⚡" },
    { x: 360, label: "Дом", icon: "🏠" },
    { x: 460, label: "Мрежа", icon: "🔌" },
  ];

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox="0 0 520 100" className="w-full min-w-[480px]" aria-hidden>
        {nodes.map((node, i) => (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <circle cx={node.x} cy={40} r="24" fill="#3B7A2A" opacity={0.15} />
            <circle cx={node.x} cy={40} r="18" fill="#3B7A2A" opacity={0.25} />
            <text x={node.x} y={45} textAnchor="middle" fontSize="16">{node.icon}</text>
            <text
              x={node.x}
              y={82}
              textAnchor="middle"
              fill="currentColor"
              fontSize="10"
              fontWeight="600"
              className="fill-foreground-secondary"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={`flow-${i}`}
            x1={nodes[i].x + 24}
            y1={40}
            x2={nodes[i + 1].x - 24}
            y2={40}
            stroke="#3B7A2A"
            strokeWidth={2}
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

function MonthlyBarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end gap-2 md:gap-3 h-64 md:h-80">
        {MONTHLY_PRODUCTION.map((m, i) => {
          const heightPercent = (m.kwh / MAX_KWH) * 100;
          return (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                className="text-xs md:text-sm font-bold text-amber-400 tabular-nums"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                {m.kwh}
              </motion.div>
              <motion.div
                className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent/60"
                initial={{ height: 0 }}
                animate={inView ? { height: `${heightPercent}%` } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-[10px] md:text-xs text-white/60 font-medium">{m.month}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center text-sm text-white/40">
        kWh / месец — типична 5 kWp система в Южна България
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ───────────────────────────────────────────────── */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
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

export function SlanchevaEnergiyaContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="overflow-hidden">
      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative flex min-h-[90vh] items-end">
        <ImageEditorial
          src={KAK_RABOTI_IMAGES.slanchevaEnergiya}
          alt="Слънчеви панели произвеждат чиста енергия"
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
            <BadgeChip variant="hero">Основи</BadgeChip>
          </motion.div>

          <TextReveal as="h1" className="editorial-hero mt-6 max-w-4xl text-white" delay={0.1}>
            Как Работи Слънчевата Енергия
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Фотоволтаичен ефект, компоненти и потенциал на България
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-8 md:gap-12"
          >
            <motion.div variants={staggerItem}>
              <StatNumber
                value={1600}
                suffix=" kWh/m²"
                context="Годишна инсолация"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={300}
                suffix="+"
                context="Слънчеви дни"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={14}
                suffix=" GW"
                context="Потенциал на БГ"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. PHOTOVOLTAIC EFFECT ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Фотоволтаичният ефект
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            От фотон до електричество
          </TextReveal>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <PhotovoltaicDiagram />

            <motion.div
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              className="space-y-5"
            >
              {[
                { num: "01", title: "Фотони удрят силициевите клетки", text: "Слънчевата светлина е поток от фотони. Когато ударят полупроводниковия материал на соларната клетка, предават енергията си на електроните в кристалната решетка." },
                { num: "02", title: "Освобождават се електрони", text: "PN преходът в клетката създава вътрешно електрическо поле, което разделя освободените електрони и генерира напрежение между контактите." },
                { num: "03", title: "Създава се постоянен ток (DC)", text: "Потокът от електрони образува DC ток. Модулите се свързват серийно и паралелно, за да се получи желаната мощност на системата." },
                { num: "04", title: "Инверторът превръща DC в AC 230V", text: "Инверторът синхронизира фазата и честотата с мрежата, осигурява MPPT оптимизация и защити при пренапрежение или авария." },
              ].map((step, i) => (
                <div key={step.num} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">{step.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. SYSTEM COMPONENTS ── */}
      <section className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Компоненти на системата
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            От слънце до контакт
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Енергията тече от панелите, през инвертора, до дома и мрежата.
          </motion.p>

          <div className="mb-16">
            <EnergyFlowDiagram />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SYSTEM_COMPONENTS.map((comp) => (
              <motion.div key={comp.title} variants={staggerItem}>
                <GlowCard className="h-full">
                  <div className="p-6">
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                      <comp.icon className="size-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{comp.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-accent">{comp.spec}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{comp.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. SOLAR MAP OF BULGARIA ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Ресурс
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Соларна Карта на България
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            България разполага с отлични стойности на годишна слънчева инсолация — сред
            най-високите в ЕС.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {REGIONS.map((region) => (
              <motion.div key={region.name} variants={staggerItem}>
                <GlowCard className="h-full">
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{region.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-accent">{region.range}</p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-foreground-tertiary mb-1.5">
                        <span>Производителност</span>
                        <span className="font-bold text-foreground">{region.percent}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${region.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. SEASONAL PRODUCTION ── */}
      <section className="bg-foreground px-6 py-24 text-white md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4 !text-amber-400"
          >
            Прогноза
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6 text-white">
            Сезонно Производство
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-white/50"
          >
            Лятото носи пикове, зимата — по-къси дни и по-ниски ъгли на слънцето.
            Ето как изглежда типичното месечно производство за 5 kWp система.
          </motion.p>

          <MonthlyBarChart />
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
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <SolutionCTA />
    </main>
  );
}
