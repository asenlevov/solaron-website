"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown, Factory, Zap, TrendingUp, Shield,
  BarChart3, Gauge, Settings, Activity, ArrowRight, Battery,
} from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import {
  SolutionPageProjects,
  RelatedSolutions,
  SolutionCTA,
} from "@/components/marketing/solution-page-shared";
import { SOLUTION_IMAGES } from "@/data/images";
import { blurIn, staggerContainer, staggerItem } from "@/lib/animations";

const faqs = [
  {
    q: "Какъв е минималният размер на индустриална соларна система?",
    a: "Обикновено стартираме от 100 kWp за индустриални проекти, което покрива нуждите на средно производствено предприятие. За по-малки обекти (30–100 kWp) вижте нашите бизнес решения.",
  },
  {
    q: "Колко време отнема изграждането на MW система?",
    a: "Типичният срок е 3–6 месеца, включително проектиране, разрешителни и монтаж. За наземни централи процедурата по присъединяване може да добави допълнителни 2–3 месеца.",
  },
  {
    q: "Как се оптимизира пиковото потребление?",
    a: "Комбинираме соларно производство с интелигентно управление на товарите и при нужда — батерийно съхранение. Това може да намали пиковата мощност с до 50%, което значително намалява компонента за мрежов достъп.",
  },
  {
    q: "Какви разрешителни са необходими за индустриална система?",
    a: "За системи над 30 kWp се изискват становище от ЕРП, работен проект, разрешение за строеж и договор за присъединяване. Ние управляваме целия процес.",
  },
  {
    q: "Какъв е реалистичният ROI за индустриална соларна система?",
    a: "При текущите цени на електроенергията и ускорена данъчна амортизация, типичният ROI е 2–4 години. С PPA модел няма начална инвестиция и спестяванията започват от ден 1.",
  },
];

const auditSteps = [
  {
    step: "01",
    title: "Анализ на Потреблението",
    desc: "Детайлен преглед на 12-месечни профили на натоварване, пикови часове и тарифни структури.",
    icon: BarChart3,
  },
  {
    step: "02",
    title: "Оценка на Обекта",
    desc: "Измерване на покривни площи, наклони, засенчване и достъп до мрежата. Геотехнически анализ за наземни системи.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Симулация и Проект",
    desc: "PVsyst моделиране на производство, финансов модел с NPV/IRR и оптимална конфигурация на системата.",
    icon: Activity,
  },
  {
    step: "04",
    title: "Изграждане и Пускане",
    desc: "Професионален монтаж без прекъсване на производството. Тестване, присъединяване и мониторинг 24/7.",
    icon: Zap,
  },
];

const chartData = [
  { month: "Яну", h: 90, solar: 20 },
  { month: "Фев", h: 85, solar: 28 },
  { month: "Мар", h: 95, solar: 40 },
  { month: "Апр", h: 100, solar: 55 },
  { month: "Май", h: 110, solar: 70 },
  { month: "Юни", h: 120, solar: 85 },
  { month: "Юли", h: 130, solar: 95 },
  { month: "Авг", h: 125, solar: 90 },
  { month: "Сеп", h: 105, solar: 65 },
  { month: "Окт", h: 95, solar: 40 },
  { month: "Ное", h: 90, solar: 22 },
  { month: "Дек", h: 88, solar: 15 },
];

const archNodes = [
  { x: 60, label: "PV Масив", sub: "100 kWp – MW" },
  { x: 260, label: "Инвертори", sub: "On-grid / Хибридни" },
  { x: 460, label: "Трансформатор", sub: "СрН / НН" },
  { x: 660, label: "Консуматор", sub: "Завод / Мрежа" },
];

const archCards = [
  {
    icon: Zap,
    title: "Високомощни Панели",
    desc: "Tier-1 бифациални модули 550–600 Wp с 25-годишна гаранция за производителност.",
  },
  {
    icon: Gauge,
    title: "Индустриални Инвертори",
    desc: "On-grid: SolarEdge, Kstar, Huawei, SMA — string и централни инвертори с 98.5%+ ефективност. Хибридни: Deye, Huawei за системи със съхранение.",
  },
  {
    icon: Activity,
    title: "SCADA Мониторинг",
    desc: "24/7 наблюдение на всеки стринг с автоматични аларми и отдалечена диагностика.",
  },
  {
    icon: Battery,
    title: "Съхранение на Енергия",
    desc: "За индустриални хибридни системи работим с Kstar и CNTE кабинетни системи за съхранение на електроенергия.",
  },
  {
    icon: Shield,
    title: "Защита и Съответствие",
    desc: "Пълно съответствие с БДС, IEC 62446 и изискванията на ЕРП за присъединяване.",
  },
];

const benefitCards = [
  {
    icon: BarChart3,
    title: "Пикова Оптимизация",
    desc: "Намалете пиковата мощност с до 50%. Соларното производство покрива точно пиковите часове на консумация, намалявайки компонентата за достъп до мрежата.",
    stat: "50%",
    statLabel: "намаление на пика",
  },
  {
    icon: Shield,
    title: "Мрежова Независимост",
    desc: "С батерийно съхранение от Kstar и CNTE и интелигентно управление на товарите, вашето производство продължава дори при прекъсвания на захранването.",
    stat: "99.5%",
    statLabel: "uptime",
  },
  {
    icon: TrendingUp,
    title: "Регулаторно Съответствие",
    desc: "ESG отчетност, въглеродни кредити и съответствие с Европейската директива за устойчивост — бъдете подготвени за CSRD.",
    stat: "100%",
    statLabel: "ESG съответствие",
  },
  {
    icon: Settings,
    title: "Мащабируемост",
    desc: "Модулна архитектура позволява поетапно разширение — започнете с покрива и добавете наземна система когато бизнесът расте.",
    stat: "∞",
    statLabel: "мащабируемост",
  },
];

export function ZaIndustriyataContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const challengeRef = useRef<HTMLElement>(null);
  const challengeInView = useInView(challengeRef, { once: true, margin: "0px 0px -10% 0px" });
  const archRef = useRef<HTMLElement>(null);
  const archInView = useInView(archRef, { once: true, margin: "0px 0px -10% 0px" });
  const benefitsRef = useRef<HTMLElement>(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "0px 0px -10% 0px" });
  const auditRef = useRef<HTMLElement>(null);
  const auditInView = useInView(auditRef, { once: true, margin: "0px 0px -10% 0px" });
  const caseRef = useRef<HTMLElement>(null);
  const caseInView = useInView(caseRef, { once: true, margin: "0px 0px -10% 0px" });
  const faqRef = useRef<HTMLElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "0px 0px -10% 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-hidden">
      {/* ─── 1. HERO ─── */}
      <section ref={heroRef} className="relative flex min-h-screen items-end">
        <ImageEditorial
          src={SOLUTION_IMAGES.zaIndustriyata}
          alt="Индустриална соларна централа"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-48 md:pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BadgeChip variant="hero">
              <Factory className="size-4" />
              Индустриални Решения
            </BadgeChip>
          </motion.div>

          <TextReveal as="h1" className="editorial-hero mt-6 max-w-4xl text-white">
            Мащабна Соларна Енергия за Индустрията
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            От 100 kWp до мегаватови централи — проектираме, изграждаме и
            оптимизираме индустриални фотоволтаични системи с гарантирана
            възвръщаемост.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-6"
          >
            {[
              { value: "1", suffix: " MW+", label: "Капацитет" },
              { value: "50", suffix: "%", label: "Пиково намаление" },
              { value: "2", suffix: " год.", label: "ROI" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-md"
              >
                <p className="editorial-stat text-3xl text-white md:text-4xl">
                  {stat.value}{stat.suffix}
                </p>
                <p className="mt-1 text-sm text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10"
          >
            <MagneticButton href="/konfigurator" variant="primary" size="xl">
              Заявете Енергиен Одит
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <ChevronDown className="size-6 animate-bounce text-white/40" />
          </motion.div>
        </div>
      </section>

      {/* ─── 2. INDUSTRIAL CHALLENGE ─── */}
      <section ref={challengeRef} className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={challengeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="editorial-overline text-accent mb-4"
          >
            Предизвикателството
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            Енергийният проблем в индустрията
          </TextReveal>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={challengeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-stone-600">
                Индустриалните предприятия в България плащат средно{" "}
                <strong className="text-stone-900">0.22–0.28 лв./kWh</strong>,
                като пиковата компонента може да достигне{" "}
                <strong className="text-stone-900">40% от сметката</strong>.
              </p>
              <p className="text-lg leading-relaxed text-stone-600">
                Соларната система не само намалява цената на kWh, но и
                „отрязва" пиковете в потреблението — точно когато слънцето
                е най-силно, вашето производство работи на пълна мощност.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Високи тарифи", "Пикови надбавки", "Регулаторен натиск", "Въглеродни такси"].map((tag) => (
                  <BadgeChip key={tag} variant="accent">{tag}</BadgeChip>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={challengeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 400 240" className="w-full" fill="none">
                <rect x="0" y="0" width="400" height="240" rx="16" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1" />
                <text x="200" y="28" textAnchor="middle" className="fill-stone-500 text-[11px] font-medium">
                  Месечни Енергийни Разходи (хил. лв.)
                </text>
                {chartData.map((d, i) => (
                  <g key={d.month} transform={`translate(${30 + i * 30}, 0)`}>
                    <rect x="0" y={210 - d.h} width="18" height={d.h} rx="3" fill="#e7e5e4" />
                    <rect x="0" y={210 - d.solar} width="18" height={d.solar} rx="3" fill="#3b7a2a" opacity="0.8" />
                    <text x="9" y="228" textAnchor="middle" className="fill-stone-400 text-[8px]">{d.month}</text>
                  </g>
                ))}
                <circle cx="260" cy="46" r="4" fill="#e7e5e4" />
                <text x="270" y="50" className="fill-stone-500 text-[9px]">Без соларна</text>
                <circle cx="330" cy="46" r="4" fill="#3b7a2a" />
                <text x="340" y="50" className="fill-stone-500 text-[9px]">Със соларна</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. SYSTEM ARCHITECTURE ─── */}
      <section ref={archRef} className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="editorial-overline text-accent mb-4"
          >
            Архитектура
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Индустриална Системна Архитектура
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={archInView ? "visible" : "hidden"}
            className="mb-16 max-w-2xl text-lg text-stone-500"
          >
            Всяка индустриална система се проектира индивидуално за
            максимална ефективност и интеграция с вашите процеси.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={archInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-16"
          >
            <svg viewBox="0 0 800 200" className="w-full" fill="none">
              <rect x="0" y="0" width="800" height="200" rx="16" fill="white" stroke="#e7e5e4" strokeWidth="1" />
              {archNodes.map((node, i) => (
                <g key={node.label}>
                  <rect
                    x={node.x} y="60" width="120" height="80" rx="12"
                    fill="#f5f5f4" stroke="#3b7a2a" strokeWidth="1.5"
                    strokeDasharray={i === 3 ? "4 2" : "0"}
                  />
                  <text x={node.x + 60} y="95" textAnchor="middle" className="fill-stone-800 text-[12px] font-semibold">
                    {node.label}
                  </text>
                  <text x={node.x + 60} y="115" textAnchor="middle" className="fill-stone-400 text-[10px]">
                    {node.sub}
                  </text>
                  {i < 3 && (
                    <line
                      x1={node.x + 120} y1="100" x2={node.x + 200} y2="100"
                      stroke="#3b7a2a" strokeWidth="2" markerEnd="url(#arrowhead)"
                    />
                  )}
                </g>
              ))}
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="#3b7a2a" />
                </marker>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={archInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {archCards.map((card) => (
              <motion.div key={card.title} variants={staggerItem}>
                <GlowCard className="h-full">
                  <div className="p-6">
                    <card.icon className="size-8 text-accent mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-stone-600">{card.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 4. BENEFITS ─── */}
      <section ref={benefitsRef} className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="editorial-overline text-accent mb-4"
          >
            Предимства
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            Защо индустриална соларна система?
          </TextReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-2"
          >
            {benefitCards.map((b) => (
              <motion.div key={b.title} variants={staggerItem}>
                <TiltCard className="h-full rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <b.icon className="size-10 text-accent" strokeWidth={1.5} />
                    <div className="text-right">
                      <p className="editorial-stat text-3xl text-accent">{b.stat}</p>
                      <p className="text-xs text-stone-400">{b.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="editorial-heading mb-3">{b.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{b.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 5. ENERGY AUDIT PROCESS ─── */}
      <section
        ref={auditRef}
        className="relative bg-foreground px-6 py-24 text-white md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={auditInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="editorial-overline text-accent mb-4"
          >
            Нашият Процес
          </motion.p>
          <TextReveal as="h2" className="editorial-display text-white mb-16">
            От Анализ до Пускане
          </TextReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={auditInView ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-4"
          >
            {auditSteps.map((s, i) => (
              <motion.div key={s.step} variants={staggerItem} className="relative text-center">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                  <s.icon className="size-8" strokeWidth={1.5} />
                </div>
                <p className="editorial-overline text-accent mb-2">{s.step}</p>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{s.desc}</p>
                {i < auditSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={auditInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-14 text-center"
          >
            <MagneticButton href="/konfigurator" variant="primary" size="lg">
              <span className="flex items-center gap-2">
                Заявете Безплатен Одит
                <ArrowRight className="size-4" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ─── 6. CASE STUDY ─── */}
      <section ref={caseRef} className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={caseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="editorial-overline text-accent mb-4"
          >
            Детайлен Проект
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-12">
            651 kWp — Наземна Централа, Съединение
          </TextReveal>

          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={caseInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
            >
              <ImageEditorial
                src={SOLUTION_IMAGES.zaIndustriyata}
                alt="651 kWp Наземна централа Съединение"
                fill
                grain
                parallax
                containerClassName="absolute inset-0"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={caseInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-6 mb-8">
                <StatNumber
                  value={651} suffix=" kWp"
                  context="Инсталирана мощност" className="text-4xl"
                />
                <StatNumber
                  value={780} suffix=" MWh"
                  context="Годишно производство" className="text-4xl"
                />
                <StatNumber
                  value={1600} suffix="+"
                  context="Соларни панели" className="text-4xl"
                />
                <StatNumber
                  value={3.5} suffix=" г."
                  context="Възвръщаемост" className="text-4xl"
                />
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                Наземна индустриална централа за производствено предприятие
                в Съединение. Покрива 85% от енергийните нужди на завода и
                осигурява пълна възвръщаемост за под 4 години. Системата
                включва Tier-1 бифациални модули и string инвертори с
                мониторинг 24/7.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Наземен монтаж", "Tier-1 панели", "String инвертори", "Мониторинг 24/7"].map((tag) => (
                  <BadgeChip key={tag} variant="default">{tag}</BadgeChip>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6.5 VIDEO ─── */}
      <section className="bg-stone-950 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <BadgeChip variant="hero">На терен</BadgeChip>
              <h2 className="editorial-display mt-4 text-white">
                Вижте монтажа в действие
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                Нашият екип на индустриален покрив — от разгръщането на
                панелите до завършената конструкция. Същият процес и стандарт
                на всеки обект.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <iframe
                src="https://www.youtube.com/embed/Fjznvk88lfQ?rel=0&modestbranding=1"
                title="Индустриален соларен монтаж"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ─── */}
      <section ref={faqRef} className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <TextReveal as="h2" className="editorial-display text-center mb-12">
            Често задавани въпроси
          </TextReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="divide-y divide-stone-200"
          >
            {faqs.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="group flex w-full items-center justify-between py-5 text-left font-semibold text-stone-900 transition-colors hover:text-accent"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-stone-400 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 leading-relaxed text-stone-600">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 8. SHARED SECTIONS ─── */}
      <SolutionPageProjects />
      <RelatedSolutions currentSolutionId="za-industriyata" />
      <SolutionCTA />
    </main>
  );
}
