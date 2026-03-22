"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { GlowCard } from "@/components/ui/glow-card";
import { QuickEstimator } from "@/components/marketing/quick-estimator";
import {
  SolutionPageProjects,
  RelatedSolutions,
  SolutionCTA,
} from "@/components/marketing/solution-page-shared";
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  blurIn,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  scaleSpring,
  createStagger,
} from "@/lib/animations";
import {
  ChevronDown,
  PiggyBank,
  Unplug,
  Leaf,
  CreditCard,
  Landmark,
  HandCoins,
  TrendingUp,
  Shield,
  Zap,
  Sun,
  Phone,
  FileText,
  Wrench,
  Sparkles,
  Check,
  MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

/* Bento grid data is inlined in the JSX for richer per-card visuals */

const processSteps = [
  {
    icon: Phone,
    title: "Безплатна Консултация",
    desc: "Анализираме покрива, потреблението и целите ви. Предлагаме оптимална система.",
    time: "1–2 дни",
  },
  {
    icon: FileText,
    title: "Проектиране",
    desc: "Изготвяме техническия проект, подаваме документи и съгласуваме с ЕРП.",
    time: "2–4 седмици",
  },
  {
    icon: Wrench,
    title: "Монтаж",
    desc: "Професионален монтаж от сертифициран екип. Тестваме всеки компонент.",
    time: "1–3 дни",
  },
  {
    icon: Sparkles,
    title: "Спестявания",
    desc: "Системата произвежда енергия от първия ден. Следите всичко в реално време.",
    time: "от ден 1",
  },
];

const caseStudies = [
  {
    image: REAL_IMAGES.projects.kran5_1,
    title: "5 kW — Кран, Велинград",
    stat: 5,
    savings: "~100 лв./мес.",
    quote:
      "Системата се вписа перфектно в покрива и от първия месец виждаме разликата в сметките.",
    slug: "5-kwp-kran",
  },
  {
    image: REAL_IMAGES.projects.vratsa15_1,
    title: "15 kW + батерия — Враца",
    stat: 15,
    savings: "~280 лв./мес.",
    quote:
      "С батерията имаме ток и при спиране на мрежата. Пълна независимост.",
    slug: "15-kwp-vratsa",
  },
  {
    image: REAL_IMAGES.projects.kazanlak30_1,
    title: "30 kW — Казанлък",
    stat: 30,
    savings: "~520 лв./мес.",
    quote:
      "Инвестицията се изплати за по-малко от 4 години. Качеството е безкомпромисно.",
    slug: "30-kwp-kazanlak",
  },
];

const financingOptions = [
  {
    icon: HandCoins,
    title: "Кеш",
    desc: "Еднократно плащане с максимална отстъпка. Най-ниска обща цена.",
    detail: "от 5 500 лв.",
    note: "Най-добра цена",
  },
  {
    icon: CreditCard,
    title: "Кредит",
    desc: "Банков кредит с ниска лихва. Месечната вноска е по-малка от спестяванията.",
    detail: "от 95 лв./мес.",
    note: "Месечната вноска е съпоставима или по-ниска от текущата ви сметка за ток",
  },
  {
    icon: Landmark,
    title: "Лизинг",
    desc: "Оперативен лизинг — без начална вноска. Плащате по-малко от текущата сметка.",
    detail: "от 120 лв./мес.",
    note: "Без начална вноска",
  },
];

const techComponents = [
  {
    name: "SolarEdge HD-Wave Инвертори",
    description: "99.2% ефективност, SafeDC™ безопасност, панелно ниво мониторинг. Най-високо качество на пазара.",
    tier: "Премиум",
  },
  {
    name: "Kstar BluE-S Хибридни",
    description: "All-in-one системи с CATL LFP клетки и елегантен дизайн. Над средното ниво качество.",
    tier: "All-in-one",
  },
  {
    name: "Deye Хибридни Инвертори",
    description: "Бюджетно решение с максимална гъвкавост. Може би най-доброто решение за източноевропейския пазар.",
    tier: "Стойност",
  },
  {
    name: "Соларни Панели",
    description: "DMEGC (Tier-1), AIKO и TENKA SOLAR (ABC технология, до 24% КПД) — панели от среден до премиум клас.",
    tier: "Tier-1+",
  },
  {
    name: "Конструкции",
    description: "Van der Valk и Sunbeam — европейско качество с реални гаранции и тестове за издръжливост.",
    tier: "Европейски",
  },
];

const warranties = [
  { years: 25, label: "Производствена гаранция на панелите", icon: Sun },
  { years: 12, label: "Гаранция на инвертора", icon: Zap },
  { years: 5, label: "Гаранция на монтажа от Соларон", icon: Wrench },
];

const faqs = [
  {
    q: "Подходяща ли е соларна система за моя покрив?",
    a: "Повечето покриви с добра конструкция и южно или западно изложение са подходящи. Правим безплатен оглед и анализ на засенчване преди да предложим решение.",
  },
  {
    q: "Колко място заемат панелите?",
    a: "За 5 kWp система са нужни около 25–30 m² незасенчена площ. Точният брой панели определяме след оглед на покрива.",
  },
  {
    q: "Какво се случва нощем или при облачно?",
    a: "Без батерия ползвате мрежата. При облачно производството е по-ниско, но не спира. С батерия съхранявате енергия за вечерта и нощта.",
  },
  {
    q: "Колко време трае монтажът?",
    a: "За типична домашна система — 1 до 3 работни дни. Документацията и съгласуването с ЕРП отнемат допълнително 2–4 седмици.",
  },
  {
    q: "Има ли субсидии за домашни соларни системи?",
    a: "Към момента в България няма директни субсидии за домакинствата, но нулевата ДДС ставка (0% вместо 20%) значително намалява инвестицията.",
  },
  {
    q: "Каква е гаранцията?",
    a: "Панелите имат 25-годишна гаранция за производителност. Инверторите — 12 години с опция за удължаване. Монтажът — 5 години от Соларон.",
  },
  {
    q: "Какво е нетно отчитане?",
    a: "Нетното отчитане ви позволява да продавате излишната енергия обратно в мрежата. Плащате само разликата между произведено и потребено за 12-месечен период.",
  },
  {
    q: "Какви разрешителни са нужни?",
    a: "За системи до 30 kWp за собствено потребление не е нужно строително разрешително. Нужно е само уведомление до ЕРП и присъединителен договор, което ние уреждаме.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ZaDomaContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const billRef = useRef<HTMLElement>(null);
  const billInView = useInView(billRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  });

  return (
    <main className="overflow-hidden">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — Invertori-style with stats                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-end"
      >
        <ImageEditorial
          src={LIFESTYLE_IMAGES.modernHome}
          alt="Къща със соларни панели"
          fill
          priority
          parallax
          grain
          sizes="100vw"
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <BadgeChip variant="hero">Резидентни системи</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="editorial-hero text-white mt-3">
            Соларна Енергия За Дома
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-2xl text-xl md:text-2xl text-white/80 font-body"
          >
            Спестете до 80% от сметката за ток. Увеличете стойността на
            имота си. Независимост от мрежата.
          </motion.p>
          <div className="mt-8 md:mt-12 flex flex-wrap gap-12 md:gap-20">
            <StatNumber
              value={80}
              suffix="%"
              context="Спестявания"
              className="text-white"
              contextClassName="text-white/60"
              duration={1500}
            />
            <StatNumber
              value={25}
              suffix=" г."
              context="Гаранция"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={0}
              suffix="% ДДС"
              context="За домакинства"
              className="text-white"
              contextClassName="text-white/60"
            />
          </div>
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-8 md:mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="https://wa.me/359896699009"
              variant="primary"
              size="xl"
            >
              <MessageCircle className="mr-2 size-5" />
              Безплатна Консултация
            </MagneticButton>
            <MagneticButton
              href="/konfigurator"
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Конфигурирай Система
            </MagneticButton>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/40" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. BENEFITS BENTO — 6 Cards, asymmetric layout             */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline text-accent mb-4"
          >
            Защо соларна система?
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            Шест причини да започнете
          </TextReveal>

          <motion.div
            variants={createStagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto_auto]"
          >
            {/* ── SAVINGS: wide card with animated meter ── */}
            <motion.div variants={staggerItem} className="md:col-span-4 md:row-span-1">
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center md:gap-10">
                  <div className="flex-1">
                    <PiggyBank className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                    <h3 className="editorial-heading">Сериозни Спестявания</h3>
                    <p className="mt-2 max-w-sm text-stone-600">
                      Произвеждате собствена енергия и плащате минимални суми за ток. Системата се изплаща за 4–6 години.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 flex flex-col items-center">
                    <svg viewBox="0 0 120 80" className="w-40 md:w-48">
                      <defs>
                        <linearGradient id="b-meter" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="50%" stopColor="#facc15" />
                          <stop offset="100%" stopColor="#3B7A2A" />
                        </linearGradient>
                      </defs>
                      <path d="M 15 65 A 45 45 0 0 1 105 65" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
                      <path d="M 15 65 A 45 45 0 0 1 105 65" fill="none" stroke="url(#b-meter)" strokeWidth="10" strokeLinecap="round" strokeDasharray="141" strokeDashoffset="28">
                        <animate attributeName="stroke-dashoffset" from="141" to="28" dur="1.5s" fill="freeze" begin="0.5s" />
                      </path>
                      <text x="60" y="58" textAnchor="middle" className="fill-foreground" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">80%</text>
                      <text x="60" y="72" textAnchor="middle" className="fill-stone-400" fontSize="8">по-ниска сметка</text>
                    </svg>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* ── INDEPENDENCE: tall card ── */}
            <motion.div variants={staggerItem} className="md:col-span-2 md:row-span-2">
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Unplug className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                <h3 className="editorial-heading">Енергийна Независимост</h3>
                <p className="mt-2 text-stone-600">
                  По-малко зависимост от променливите цени на тока. С батерия имате ток и при спиране на мрежата.
                </p>
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-accent/5 px-4 py-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-accent/10">
                    <Zap className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Батерийно съхранение</p>
                    <p className="text-xs text-stone-500">Ток и при спиране на мрежата</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-accent/5 px-4 py-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-accent/10">
                    <Sun className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Нетно отчитане</p>
                    <p className="text-xs text-stone-500">Продавайте излишъка обратно</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* ── CLEAN ENERGY ── */}
            <motion.div variants={staggerItem} className="md:col-span-2">
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Leaf className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                <div className="flex items-baseline gap-2">
                  <StatNumber value={4} suffix=" т" className="text-4xl md:text-5xl" />
                  <span className="text-sm text-stone-400">CO₂ / год.</span>
                </div>
                <h3 className="editorial-heading mt-3">Чиста Енергия</h3>
                <p className="mt-2 text-stone-600 text-sm">
                  Еквивалентно на 200 засадени дървета годишно.
                </p>
              </TiltCard>
            </motion.div>

            {/* ── PROPERTY VALUE ── */}
            <motion.div variants={staggerItem} className="md:col-span-2">
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <TrendingUp className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                <div className="flex items-baseline gap-1">
                  <StatNumber value={8} prefix="4–" suffix="%" className="text-4xl md:text-5xl" />
                </div>
                <h3 className="editorial-heading mt-3">По-скъп Имот</h3>
                <p className="mt-2 text-stone-600 text-sm">
                  Имотите със соларни системи се продават по-бързо и на по-висока цена.
                </p>
              </TiltCard>
            </motion.div>

            {/* ── 0% VAT: accent card ── */}
            <motion.div variants={staggerItem} className="md:col-span-3">
              <TiltCard className="h-full rounded-3xl border border-accent/20 bg-accent/5 p-8 md:p-10">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-white">
                    <span className="text-xl font-bold">0%</span>
                  </div>
                  <div>
                    <h3 className="editorial-heading">Без ДДС</h3>
                    <p className="text-stone-600 text-sm mt-1">
                      Домашните соларни системи са освободени от ДДС — директна отстъпка от цената.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* ── WARRANTY: with timeline visual ── */}
            <motion.div variants={staggerItem} className="md:col-span-3">
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Shield className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                <h3 className="editorial-heading">Тройна Гаранция</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { years: 25, label: "Панели", color: "bg-accent" },
                    { years: 12, label: "Инвертор", color: "bg-accent/70" },
                    { years: 5, label: "Монтаж", color: "bg-accent/40" },
                  ].map((w) => (
                    <div key={w.label} className="flex items-center gap-3">
                      <div className="w-10 text-right text-sm font-bold text-foreground">{w.years} г.</div>
                      <div className="flex-1 h-2.5 rounded-full bg-stone-100 overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", w.color)}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(w.years / 25) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs text-stone-500 w-16">{w.label}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. BEFORE / AFTER BILL                                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        ref={billRef}
        className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden"
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={billInView ? "visible" : "hidden"}
            className="editorial-overline text-accent mb-6"
          >
            Преди и след
          </motion.p>
          <TextReveal as="h2" className="editorial-display text-white text-center mb-16">
            Вашата сметка за ток се променя
          </TextReveal>
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={billInView ? "visible" : "hidden"}
              className="rounded-2xl border border-red-500/20 bg-red-950/30 px-10 py-8"
            >
              <p className="text-sm uppercase tracking-widest text-red-400 mb-2">
                Преди
              </p>
              <p className="editorial-stat text-5xl text-red-400 md:text-6xl">
                250 лв.
              </p>
              <p className="text-red-400/60 mt-1">на месец</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={billInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="text-4xl text-accent font-bold"
            >
              →
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate={billInView ? "visible" : "hidden"}
              className="rounded-2xl border border-accent/30 bg-accent/10 px-10 py-8"
            >
              <p className="text-sm uppercase tracking-widest text-accent mb-2">
                След
              </p>
              <StatNumber
                value={50}
                suffix=" лв."
                context="на месец"
                className="text-5xl md:text-6xl text-accent"
                contextClassName="text-accent/60"
              />
            </motion.div>
          </div>
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate={billInView ? "visible" : "hidden"}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                Месечно
              </p>
              <p className="text-2xl font-bold text-accent">~200 лв.</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                Годишно
              </p>
              <p className="text-2xl font-bold text-accent">~2 400 лв.</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                За 25 години
              </p>
              <p className="text-2xl font-bold text-accent">~60 000 лв.</p>
            </div>
          </motion.div>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={billInView ? "visible" : "hidden"}
            className="mt-6 text-white/40 text-sm"
          >
            Пример за домакинство с 5 kWp система при 250 лв./мес. сметка
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. HOW IT WORKS — 4 Steps                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="editorial-overline text-accent mb-4"
            >
              Процесът
            </motion.p>
            <TextReveal as="h2" className="editorial-display text-center">
              Четири стъпки до спестявания
            </TextReveal>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-stone-200 md:left-1/2 md:-translate-x-px" />
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={cn(
                  "relative mb-12 last:mb-0 pl-16 md:w-1/2 md:pl-0",
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                )}
              >
                <div
                  className={cn(
                    "absolute left-3.5 top-1 flex size-5 items-center justify-center rounded-full border-2 border-accent bg-white md:top-1",
                    i % 2 === 0
                      ? "md:left-auto md:-right-2.5"
                      : "md:-left-2.5"
                  )}
                >
                  <div className="size-2 rounded-full bg-accent" />
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <div
                    className={cn(
                      "flex items-center gap-3 mb-3",
                      i % 2 === 0 && "md:flex-row-reverse"
                    )}
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                      <step.icon className="size-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-accent/70">
                        Стъпка {i + 1}
                      </p>
                      <h3 className="font-display text-lg font-bold">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="mt-2 text-xs text-accent font-semibold">
                    {step.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <MagneticButton
              href="https://wa.me/359896699009"
              variant="primary"
              size="lg"
            >
              Заявете безплатна консултация
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. INTERACTIVE SAVINGS CALCULATOR                          */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.p
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="editorial-overline text-accent mb-4"
            >
              Калкулатор
            </motion.p>
            <TextReveal as="h2" className="editorial-display text-center">
              Колко ще спестите?
            </TextReveal>
            <motion.p
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 text-stone-500 text-lg max-w-xl mx-auto"
            >
              Въведете данните за имота си и вижте персонализирана прогноза
            </motion.p>
          </div>
          <QuickEstimator />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 6. CASE STUDIES — 3 Projects                               */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline text-accent mb-4"
          >
            Реални проекти
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            Реализирани системи
          </TextReveal>
          <div className="space-y-12">
            {caseStudies.map((project, i) => (
              <motion.div
                key={project.title}
                variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={cn(
                  "group grid gap-8 md:grid-cols-2 md:items-center",
                  i % 2 !== 0 && "md:[direction:rtl]"
                )}
              >
                <div className="relative h-72 md:h-96 overflow-hidden rounded-3xl md:[direction:ltr]">
                  <ImageEditorial
                    src={project.image}
                    alt={project.title}
                    fill
                    parallax
                    grain
                    sizes="(max-width: 768px) 100vw, 50vw"
                    containerClassName="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <BadgeChip
                      variant="success"
                      className="bg-accent/90 text-white border-none"
                    >
                      {project.stat} kWp
                    </BadgeChip>
                  </div>
                </div>
                <div className="md:[direction:ltr]">
                  <h3 className="editorial-heading">{project.title}</h3>
                  <p className="mt-2 text-accent font-semibold text-lg">
                    {project.savings} спестявания
                  </p>
                  <blockquote className="mt-4 border-l-2 border-accent pl-4 text-stone-500 italic leading-relaxed">
                    &ldquo;{project.quote}&rdquo;
                  </blockquote>
                  <MagneticButton
                    href={`/proekti/${project.slug}`}
                    variant="outline"
                    size="md"
                    className="mt-6"
                  >
                    Виж проекта
                  </MagneticButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 7. FINANCING                                               */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <TextReveal as="h2" className="editorial-display text-white mb-4">
            Гъвкаво Финансиране
          </TextReveal>
          <p className="text-white/50 text-lg mb-12 max-w-xl">
            Три начина да финансирате системата — изберете удобния за вас
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {financingOptions.map((option) => (
              <motion.div
                key={option.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <option.icon
                  className="size-8 text-accent mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-semibold mb-2">
                  {option.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{option.desc}</p>
                <p className="text-accent font-bold text-lg">
                  {option.detail}
                </p>
                <p className="mt-3 text-xs text-white/40">{option.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 9. TECHNOLOGY & QUALITY                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.p
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="editorial-overline text-accent mb-4"
            >
              Компоненти
            </motion.p>
            <TextReveal as="h2" className="editorial-display text-center">
              Водещи марки, доказано качество
            </TextReveal>
            <motion.p
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 text-stone-500 text-lg max-w-2xl mx-auto"
            >
              Работим с три инверторни марки и Tier-1+ панели — от премиум до оптимално съотношение цена/качество
            </motion.p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {techComponents.map((comp) => (
              <motion.div key={comp.name} variants={staggerItem}>
                <GlowCard className="h-full rounded-2xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="size-8 text-accent" />
                      <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {comp.tier}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-3">
                      {comp.name}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 10. WARRANTY                                               */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-foreground px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent" />
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Shield className="mx-auto size-12 text-accent mb-6" />
          <TextReveal as="h2" className="editorial-display text-white text-center mb-4">
            Пълна Гаранция
          </TextReveal>
          <p className="text-white/50 text-lg mb-16 max-w-xl mx-auto">
            Всяка система е защитена с тройна гаранция за вашето спокойствие
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {warranties.map((w) => (
              <motion.div
                key={w.label}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm text-center"
              >
                <w.icon className="mx-auto size-8 text-accent mb-4" />
                <StatNumber
                  value={w.years}
                  suffix=" г."
                  className="text-5xl text-white"
                />
                <p className="mt-3 text-white/60 text-sm">{w.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 11. FAQ — 8 Questions                                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <TextReveal as="h2" className="editorial-display text-center mb-12">
            Често задавани въпроси
          </TextReveal>
          <Accordion.Root type="single" collapsible>
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
              >
                <Accordion.Item
                  value={`faq-${i}`}
                  className="border-b border-stone-200"
                >
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left font-semibold text-stone-900 transition-colors hover:text-accent">
                    <span>{item.q}</span>
                    <ChevronDown className="size-5 shrink-0 text-stone-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <p className="pb-5 pr-8 leading-relaxed text-stone-600">
                      {item.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 12. REAL PROJECTS — Shared Component                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <SolutionPageProjects />

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 13. RELATED SOLUTIONS                                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <RelatedSolutions currentSolutionId="za-doma" />

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 14. CTA                                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <SolutionCTA />
    </main>
  );
}
