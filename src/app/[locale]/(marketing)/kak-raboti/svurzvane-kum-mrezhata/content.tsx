"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  PlugZap,
  Zap,
  Home,
  Building2,
  ArrowRight,
  ArrowLeftRight,
  Shield,
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

const CONNECTION_TYPES = [
  {
    id: "self",
    title: "Собствено Потребление",
    subtitle: "За домакинства с висока дневна консумация",
    description:
      "Произведената енергия се използва изцяло за захранване на обекта. Излишъкът не се подава към мрежата. Без нужда от договор за изкупуване.",
    pros: [
      "Без договор за изкупуване",
      "Опростена процедура",
      "Без 5% такса към ФСЕС",
    ],
  },
  {
    id: "sell",
    title: "Продажба на Ток",
    subtitle: "За инвеститори и обекти с ниска консумация",
    description:
      "Цялата произведена електроенергия се продава на мрежовия оператор — по преференциални цени за до 30 kW или на свободен пазар.",
    pros: [
      "Стабилен приходен поток",
      "Преференциални цени до 30 kW",
      "Подходящо за инвестиция",
    ],
  },
  {
    id: "combined",
    title: "Комбинирано",
    subtitle: "Най-популярният модел в България",
    description:
      "Произведената енергия се ползва за собствени нужди, а излишъкът се продава. Максимална гъвкавост и оптимална възвръщаемост.",
    pros: [
      "Максимална гъвкавост",
      "Спестявания + приходи",
      "Оптимална ROI",
    ],
  },
] as const;

const TIMELINE_MILESTONES = [
  { year: "2012", label: "ЗЕВИ приет", detail: "Закон за енергията от възобновяеми източници — правна рамка за присъединяване на ВЕИ централи." },
  { year: "2018", label: "Опростена процедура до 30 kW", detail: "Домакинства и малки бизнеси получават значително улеснена административна процедура." },
  { year: "2023", label: "Нетно отчитане", detail: "ЗИД на ЗЕВИ въвежда нетно отчитане и нови правила за гаранциите при присъединяване." },
] as const;

const PROCEDURE_STEPS = [
  {
    num: "01",
    title: "Заявление за проучване",
    timeline: "1–3 дни",
    party: "Собственик",
    detail: "Подавате искане за проучване към вашето ЕРП. Прилагат се документи за собственост и скица на обекта.",
  },
  {
    num: "02",
    title: "Становище от ЕРП",
    timeline: "до 14 дни",
    party: "Оператор",
    detail: "Операторът издава становище за условията за присъединяване. Валидно е 6 месеца от датата на издаване.",
  },
  {
    num: "03",
    title: "Предварителен договор",
    timeline: "5–10 дни",
    party: "Двустранен",
    detail: "Сключвате предварителен договор за присъединяване, определящ техническите параметри и гаранциите.",
  },
  {
    num: "04",
    title: "Проектиране",
    timeline: "2–4 седмици",
    party: "Инженер",
    detail: "Изготвя се електрически проект за присъединяване, съгласуван с оператора. Одобрява се техническото решение.",
  },
  {
    num: "05",
    title: "Изграждане и монтаж",
    timeline: "1–3 седмици",
    party: "Изпълнител",
    detail: "Монтират се панели, инвертор и присъединителна апаратура. Провежда се 72-часов пробен период.",
  },
  {
    num: "06",
    title: "Окончателен договор",
    timeline: "5–10 дни",
    party: "Двустранен",
    detail: "Сключва се окончателен договор за изкупуване или нетно отчитане. Системата се пуска официално.",
  },
] as const;

const OPERATORS = [
  {
    name: "EVN",
    fullName: "Електроразпределение Юг",
    region: "Южна и Югоизточна България",
    areas: "Пловдив, Стара Загора, Бургас, Хасково, Пазарджик",
    url: "https://www.evn.bg/",
    processing: "~14 работни дни",
    color: "#e8352b",
  },
  {
    name: "ЧЕЗ Разпределение",
    fullName: "Електроразпределителни Мрежи Запад",
    region: "Западна България",
    areas: "София, Перник, Благоевград, Враца, Монтана",
    url: "https://www.cez.bg/",
    processing: "~14 работни дни",
    color: "#f58220",
  },
  {
    name: "Енерго-Про",
    fullName: "Електроразпределение Север",
    region: "Северна и Североизточна България",
    areas: "Варна, Русе, Велико Търново, Плевен, Добрич",
    url: "https://www.energo-pro.bg/",
    processing: "~14 работни дни",
    color: "#00a551",
  },
] as const;

/* ─── Inline SVG Energy Flow Diagrams ─────────────────────────────── */

function SelfConsumptionDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 280 200" className="w-full" aria-hidden>
        {/* Solar panel */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <rect x="90" y="20" width="100" height="50" rx="8" fill="#3B7A2A" opacity={0.15} />
          <rect x="95" y="25" width="90" height="40" rx="5" fill="#3B7A2A" opacity={0.3} />
          <text x="140" y="50" textAnchor="middle" fill="#3B7A2A" fontSize="12" fontWeight="700">Панели</text>
        </motion.g>

        {/* Home */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <rect x="90" y="130" width="100" height="50" rx="8" fill="#3B7A2A" opacity={0.1} />
          <text x="140" y="160" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="700">Дом</text>
        </motion.g>

        {/* Grid (faded) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <rect x="10" y="130" width="60" height="50" rx="8" fill="#d4d4d4" opacity={0.3} />
          <text x="40" y="160" textAnchor="middle" fill="#a3a3a3" fontSize="10" fontWeight="600">Мрежа</text>
        </motion.g>

        {/* Green arrow: Solar → Home */}
        <motion.path
          d="M 140 70 L 140 130"
          fill="none"
          stroke="#3B7A2A"
          strokeWidth={3}
          markerEnd="url(#arrowGreen)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* Gray dashed arrow: Grid → Home (when needed) */}
        <motion.path
          d="M 70 155 L 90 155"
          fill="none"
          stroke="#a3a3a3"
          strokeWidth={2}
          strokeDasharray="4 3"
          markerEnd="url(#arrowGray)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        />

        <defs>
          <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3B7A2A" />
          </marker>
          <marker id="arrowGray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#a3a3a3" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function SellAllDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 280 200" className="w-full" aria-hidden>
        {/* Solar panel */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <rect x="20" y="70" width="100" height="50" rx="8" fill="#3B7A2A" opacity={0.15} />
          <rect x="25" y="75" width="90" height="40" rx="5" fill="#3B7A2A" opacity={0.3} />
          <text x="70" y="100" textAnchor="middle" fill="#3B7A2A" fontSize="12" fontWeight="700">Панели</text>
        </motion.g>

        {/* Grid */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <rect x="160" y="70" width="100" height="50" rx="8" fill="#FBBF24" opacity={0.15} />
          <text x="210" y="100" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">Мрежа</text>
        </motion.g>

        {/* Green arrow: Solar → Grid (all energy sold) */}
        <motion.path
          d="M 120 95 L 160 95"
          fill="none"
          stroke="#3B7A2A"
          strokeWidth={3}
          markerEnd="url(#arrowGreenSell)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Animated energy dots */}
        <motion.circle
          r="4"
          fill="#3B7A2A"
          initial={{ opacity: 0 }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            cx: [125, 135, 148, 158],
            cy: [95, 95, 95, 95],
          } : {}}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Label */}
        <motion.text
          x="140"
          y="145"
          textAnchor="middle"
          fill="#3B7A2A"
          fontSize="10"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ delay: 1 }}
        >
          100% продажба
        </motion.text>

        <defs>
          <marker id="arrowGreenSell" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3B7A2A" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function CombinedDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 280 220" className="w-full" aria-hidden>
        {/* Solar panel */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <rect x="90" y="10" width="100" height="50" rx="8" fill="#3B7A2A" opacity={0.15} />
          <rect x="95" y="15" width="90" height="40" rx="5" fill="#3B7A2A" opacity={0.3} />
          <text x="140" y="40" textAnchor="middle" fill="#3B7A2A" fontSize="12" fontWeight="700">Панели</text>
        </motion.g>

        {/* Home */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <rect x="20" y="140" width="100" height="50" rx="8" fill="#3B7A2A" opacity={0.1} />
          <text x="70" y="170" textAnchor="middle" fill="#1a1a1a" fontSize="12" fontWeight="700">Дом</text>
        </motion.g>

        {/* Grid */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <rect x="160" y="140" width="100" height="50" rx="8" fill="#FBBF24" opacity={0.15} />
          <text x="210" y="170" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="700">Мрежа</text>
        </motion.g>

        {/* Green arrow: Solar → Home (priority) */}
        <motion.path
          d="M 120 60 L 80 140"
          fill="none"
          stroke="#3B7A2A"
          strokeWidth={3}
          markerEnd="url(#arrowGreenComb)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* Amber dashed arrow: surplus → Grid */}
        <motion.path
          d="M 160 60 L 200 140"
          fill="none"
          stroke="#FBBF24"
          strokeWidth={2}
          strokeDasharray="6 4"
          markerEnd="url(#arrowAmber)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Labels */}
        <motion.text
          x="75"
          y="105"
          fill="#3B7A2A"
          fontSize="9"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.8 } : {}}
          transition={{ delay: 1.2 }}
        >
          приоритет
        </motion.text>
        <motion.text
          x="195"
          y="105"
          fill="#b45309"
          fontSize="9"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.8 } : {}}
          transition={{ delay: 1.4 }}
        >
          излишък
        </motion.text>

        <defs>
          <marker id="arrowGreenComb" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3B7A2A" />
          </marker>
          <marker id="arrowAmber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#FBBF24" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Procedure Step Component ────────────────────────────────────── */

function ProcedureStep({
  step,
  index,
  isLast,
}: {
  step: (typeof PROCEDURE_STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent/10 text-sm font-bold text-accent">
          {step.num}
        </div>
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-gradient-to-b from-accent/40 to-accent/10"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-10">
        <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
        <div className="mt-2 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
            <ChevronDown className="size-3 -rotate-90" />
            {step.timeline}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
            {step.party}
          </span>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50">
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main Content ────────────────────────────────────────────────── */

export function SvurzvaneMrezhataContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="overflow-hidden">
      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative flex min-h-[90vh] items-end">
        <ImageEditorial
          src={KAK_RABOTI_IMAGES.svurzvaneMrezhata}
          alt="Свързване на фотоволтаична система към електрическата мрежа"
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
            <BadgeChip variant="hero">Технически</BadgeChip>
          </motion.div>

          <TextReveal as="h1" className="editorial-hero mt-6 max-w-4xl text-white" delay={0.1}>
            Свързване към Мрежата
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Три начина за присъединяване, ЗЕВИ регулации и стъпка по стъпка процедура за свързване
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-8 md:gap-12"
          >
            <motion.div variants={staggerItem}>
              <StatNumber
                value={3}
                suffix=" типа"
                context="Свързване"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={30}
                suffix=" kW"
                context="Опростена процедура"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={14}
                suffix=" дни"
                context="Становище"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. CONNECTION TYPES ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Типове свързване
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Три Начина за Присъединяване
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Изберете модела, който отговаря на вашата консумация и инвестиционни цели.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {CONNECTION_TYPES.map((type, i) => {
              const diagrams = [
                <SelfConsumptionDiagram key="self" />,
                <SellAllDiagram key="sell" />,
                <CombinedDiagram key="combined" />,
              ];
              return (
                <motion.div key={type.id} variants={staggerItem}>
                  <TiltCard className="h-full">
                    <GlowCard className="h-full">
                      <div className="flex h-full flex-col p-6">
                        {/* Diagram */}
                        <div className="mb-6 rounded-xl bg-stone-50 p-4">
                          {diagrams[i]}
                        </div>

                        <h3 className="font-display text-xl font-bold text-foreground">
                          {type.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-accent">
                          {type.subtitle}
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-secondary">
                          {type.description}
                        </p>

                        <ul className="mt-5 space-y-2 border-t border-stone-100 pt-4">
                          {type.pros.map((pro) => (
                            <li key={pro} className="flex items-center gap-2 text-sm text-foreground-secondary">
                              <Zap className="size-3.5 shrink-0 text-accent" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlowCard>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 3. ZEVI LEGAL ── */}
      <section className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Регулации
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            ЗЕВИ — Правна Рамка
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Законът за енергията от възобновяеми източници определя правата,
            задълженията и процедурите за присъединяване на ВЕИ централи.
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent md:left-1/2 md:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-12 md:space-y-16"
            >
              {TIMELINE_MILESTONES.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  variants={staggerItem}
                  className={`relative flex flex-col gap-4 md:flex-row md:items-start md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year badge - center */}
                  <div className="z-10 flex shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-white shadow-lg">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={`md:w-[calc(50%-3rem)] ${
                      i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <GlowCard>
                      <div className="p-6">
                        <div className="mb-2 flex items-center gap-2 md:hidden">
                          <Shield className="size-4 text-accent" />
                          <span className="text-xs font-bold text-accent uppercase tracking-wider">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {milestone.label}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                          {milestone.detail}
                        </p>
                      </div>
                    </GlowCard>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Rights & obligations summary */}
          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid gap-6 md:grid-cols-2"
          >
            <GlowCard>
              <div className="p-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                  <PlugZap className="size-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold">Права на производителя</h3>
                <ul className="mt-3 space-y-2">
                  {[
                    "Присъединяване при наличен капацитет на мрежата",
                    "Продажба на излишъка при комбиниран режим",
                    "Нетно отчитане за системи до 30 kW (от 2023)",
                    "Опростена процедура без лиценз до 30 kW",
                  ].map((right) => (
                    <li key={right} className="flex items-start gap-2 text-sm text-foreground-secondary">
                      <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent" />
                      {right}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
            <GlowCard>
              <div className="p-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-amber-500/10 p-3">
                  <Shield className="size-6 text-amber-600" />
                </div>
                <h3 className="font-display text-lg font-bold">Задължения</h3>
                <ul className="mt-3 space-y-2">
                  {[
                    "Гаранция ~50 000 лв./MW за системи над 10.8 kW",
                    "Съответствие с техническите изисквания на ЕРП",
                    "Годишни такси за достъп до мрежата",
                    "Монтаж от лицензиран електроинженер",
                  ].map((duty) => (
                    <li key={duty} className="flex items-start gap-2 text-sm text-foreground-secondary">
                      <ArrowLeftRight className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── 4. 6-STEP PROCEDURE (dark) ── */}
      <section className="relative bg-foreground px-6 py-24 md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4 !text-accent"
          >
            Процедура
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6 text-white">
            6 Стъпки до Присъединяване
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-white/50"
          >
            От заявлението до пускане под напрежение — типичната процедура
            отнема 6–12 седмици в зависимост от оператора и мощността.
          </motion.p>

          <div className="mx-auto max-w-2xl">
            {PROCEDURE_STEPS.map((step, i) => (
              <ProcedureStep
                key={step.num}
                step={step}
                index={i}
                isLast={i === PROCEDURE_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OPERATORS ── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Оператори
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Електроразпределителни Дружества
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Подайте заявление за проучване към оператора, обслужващ вашия регион.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {OPERATORS.map((op) => (
              <motion.div key={op.name} variants={staggerItem}>
                <GlowCard className="h-full">
                  <div className="p-6">
                    {/* Color accent bar */}
                    <div
                      className="mb-5 h-1 w-12 rounded-full"
                      style={{ backgroundColor: op.color }}
                    />

                    <h3 className="font-display text-xl font-bold text-foreground">
                      {op.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foreground-secondary">
                      {op.fullName}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground-tertiary">
                          Регион
                        </span>
                        <p className="mt-0.5 text-sm text-foreground-secondary">{op.region}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground-tertiary">
                          Обхват
                        </span>
                        <p className="mt-0.5 text-sm text-foreground-secondary">{op.areas}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-foreground-tertiary">
                          Срок за становище
                        </span>
                        <p className="mt-0.5 text-sm font-semibold text-accent">{op.processing}</p>
                      </div>
                    </div>

                    <a
                      href={op.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                    >
                      Посетете сайта
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <SolutionCTA />
    </main>
  );
}
