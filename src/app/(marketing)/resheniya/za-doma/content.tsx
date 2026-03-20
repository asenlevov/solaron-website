"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import * as Slider from "@radix-ui/react-slider";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  revealFromBottom,
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
  Home,
  TrendingUp,
} from "lucide-react";

const packages = [
  {
    name: "Starter",
    kWp: "3 kWp",
    price: "от 5 500 лв.",
    savings: "~85 лв./мес.",
    ideal: "Идеален за апартаменти",
    highlight: false,
  },
  {
    name: "Standard",
    kWp: "5 kWp",
    price: "от 8 500 лв.",
    savings: "~140 лв./мес.",
    ideal: "Най-популярен",
    highlight: true,
  },
  {
    name: "Premium",
    kWp: "10 kWp",
    price: "от 16 000 лв.",
    savings: "~260 лв./мес.",
    ideal: "С батерия",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Подходяща ли е соларна система за моя покрив?",
    a: "Повечето покриви с добра конструкция и южно или западно изложение са подходящи. Правим безплатен оглед и анализ на засенчване.",
  },
  {
    q: "Колко място заемат панелите?",
    a: "За 5 kWp система са нужни около 25–30 m² незасенчена площ. Точният брой панели определяме след оглед.",
  },
  {
    q: "Какво се случва нощем или при облачно?",
    a: "Без батерия ползвате мрежата. При облачно производството е по-ниско, но не спира. С батерия съхранявате енергия за вечерта.",
  },
  {
    q: "Колко време трае монтажът?",
    a: "За типична домашна система — 1 до 3 работни дни. Документацията отнема допълнително 2–4 седмици.",
  },
  {
    q: "Има ли субсидии за домашни соларни системи?",
    a: "Към момента в България няма директни субсидии за домакинствата, но нулевата ДДС ставка значително намалява инвестицията.",
  },
  {
    q: "Каква е гаранцията?",
    a: "Панелите имат 25-годишна гаранция за производителност. Инверторите — 10–12 години. Монтажът — 5 години от Соларон.",
  },
];

export default function ZaDomaContent() {
  const [monthlyBill, setMonthlyBill] = useState([200]);
  const solarCalc = useMemo(() => {
    const bill = monthlyBill[0];
    const monthlyConsumption = bill / 0.25;
    const annualConsumption = monthlyConsumption * 12;
    const recommendedKWp = annualConsumption / 1300;
    const panelCount = Math.ceil(recommendedKWp / 0.45);
    const annualSavings = Math.round(panelCount * 0.45 * 1300 * 0.7 * 0.25);
    const systemCost = panelCount * 1200;
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 0;
    const systemKWp = panelCount * 0.45;
    return { annualSavings, systemKWp, panelCount, paybackYears, systemCost };
  }, [monthlyBill]);

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const billRef = useRef<HTMLElement>(null);
  const billInView = useInView(billRef, { once: true, margin: "0px 0px -15% 0px" });
  const configRef = useRef<HTMLElement>(null);
  const configInView = useInView(configRef, { once: true, margin: "0px 0px -15% 0px" });
  const propRef = useRef<HTMLElement>(null);
  const propInView = useInView(propRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* 1. HERO */}
      <section ref={heroRef} className="relative flex min-h-screen items-end">
        <ImageEditorial
          src={LIFESTYLE_IMAGES.modernHome}
          alt="Къща със соларни панели"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-8 md:pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/90 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
          >
            <span className="size-2 animate-pulse rounded-full bg-white" />
            Най-популярно
          </motion.div>
          <TextReveal as="h1" className="text-editorial-hero max-w-3xl text-white">
            Соларна Енергия За Дома
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            Превърнете покрива си в електроцентрала. Спестете до 80% от
            сметката за ток и увеличете стойността на имота си.
          </motion.p>
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-8 inline-flex items-baseline gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md"
          >
            <span className="text-editorial-stat text-4xl text-white md:text-5xl">80%</span>
            <span className="text-base text-white/70">спестявания от ток</span>
          </motion.div>
        </div>
      </section>

      {/* 2. BENEFITS BENTO */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-editorial-overline text-accent mb-4"
          >
            Защо соларна система?
          </motion.p>
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Три причини да започнете
          </TextReveal>
          <motion.div
            variants={createStagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-5"
          >
            <motion.div variants={staggerItem} className="md:col-span-3">
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <PiggyBank className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                <StatNumber value={80} suffix="%" context="намалена сметка за ток" className="text-5xl md:text-6xl" />
                <h3 className="text-editorial-heading mt-4">Сериозни Спестявания</h3>
                <p className="mt-2 max-w-md text-stone-600">
                  Произвеждате собствена енергия и плащате минимални суми за ток.
                  Системата се изплаща за 4–6 години.
                </p>
              </TiltCard>
            </motion.div>
            <motion.div variants={staggerItem} className="md:col-span-2">
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Unplug className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                <h3 className="text-editorial-heading">Енергийна Независимост</h3>
                <p className="mt-2 text-stone-600">
                  По-малко зависимост от променливите цени на тока. С батерия
                  имате ток и при спиране на мрежата.
                </p>
              </TiltCard>
            </motion.div>
            <motion.div variants={staggerItem} className="md:col-span-5">
              <TiltCard className="rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                  <div className="flex-1">
                    <Leaf className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                    <h3 className="text-editorial-heading">Чиста Енергия</h3>
                    <p className="mt-2 max-w-lg text-stone-600">
                      Една 5 kWp система спестява над 4 тона CO₂ годишно —
                      еквивалентно на 200 засадени дървета.
                    </p>
                  </div>
                  <StatNumber value={4} suffix=" т" context="CO₂ спестени годишно" className="text-5xl md:text-6xl" />
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. PACKAGE TIERS */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="text-editorial-display text-center mb-4">
            Изберете Вашия Пакет
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-lg text-stone-500 mb-16 max-w-2xl mx-auto"
          >
            Три варианта — за всяко домакинство и бюджет
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {packages.map((pkg) => (
              <motion.div key={pkg.name} variants={staggerItem}>
                <TiltCard
                  className={cn(
                    "rounded-3xl border p-8 md:p-10 transition-shadow",
                    pkg.highlight
                      ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                      : "border-stone-200 bg-white"
                  )}
                >
                  {pkg.highlight && (
                    <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                      {pkg.ideal}
                    </span>
                  )}
                  <p className="text-editorial-overline text-stone-400">{pkg.kWp}</p>
                  <h3 className="text-editorial-heading mt-1">{pkg.name}</h3>
                  <p className="text-editorial-stat text-3xl mt-4">{pkg.price}</p>
                  <p className="mt-2 text-accent font-semibold">{pkg.savings} спестявания</p>
                  {!pkg.highlight && (
                    <p className="mt-3 text-sm text-stone-500">{pkg.ideal}</p>
                  )}
                  <MagneticButton
                    href="/konfigurator"
                    variant={pkg.highlight ? "primary" : "outline"}
                    size="md"
                    className="mt-8 w-full"
                  >
                    Конфигурирай
                  </MagneticButton>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. BEFORE/AFTER BILL — dark */}
      <section ref={billRef} className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={billInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-6"
          >
            Преди и след
          </motion.p>
          <TextReveal as="h2" className="text-editorial-display text-white mb-16">
            Вашата сметка за ток се променя
          </TextReveal>
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={billInView ? "visible" : "hidden"}
              className="rounded-2xl border border-red-500/20 bg-red-950/30 px-10 py-8"
            >
              <p className="text-sm uppercase tracking-widest text-red-400 mb-2">Преди</p>
              <p className="text-editorial-stat text-5xl text-red-400 md:text-6xl">250 лв.</p>
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
              <p className="text-sm uppercase tracking-widest text-accent mb-2">След</p>
              <StatNumber value={50} prefix="" suffix=" лв." context="на месец" className="text-5xl md:text-6xl text-accent" contextClassName="text-accent/60" />
            </motion.div>
          </div>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={billInView ? "visible" : "hidden"}
            className="mt-10 text-white/50 text-lg"
          >
            Пример за домакинство с 5 kWp система
          </motion.p>
        </div>
      </section>

      {/* 5. MINI CONFIGURATOR */}
      <section ref={configRef} className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <TextReveal as="h2" className="text-editorial-display mb-4">
            Колко ще спестите?
          </TextReveal>
          <p className="text-stone-500 text-lg mb-12">
            Преместете плъзгача за да видите прогнозните спестявания
          </p>
          <motion.div
            variants={scaleSpring}
            initial="hidden"
            animate={configInView ? "visible" : "hidden"}
            className="rounded-3xl border border-stone-200 bg-white p-8 md:p-12 shadow-xl"
          >
            <label className="block text-sm font-semibold text-stone-600 mb-6">
              Текуща месечна сметка за ток
            </label>
            <p className="text-editorial-stat text-4xl mb-8">{monthlyBill[0]} лв./мес.</p>
            <Slider.Root
              value={monthlyBill}
              onValueChange={setMonthlyBill}
              min={50}
              max={500}
              step={10}
              className="relative flex w-full items-center h-6 select-none touch-none"
            >
              <Slider.Track className="relative h-2 w-full grow rounded-full bg-stone-200">
                <Slider.Range className="absolute h-full rounded-full bg-accent" />
              </Slider.Track>
              <Slider.Thumb className="block size-6 rounded-full bg-accent shadow-lg ring-2 ring-white focus:outline-none" />
            </Slider.Root>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-accent/10 p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-accent/70 mb-1">Система</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`kw-${solarCalc.systemKWp}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-editorial-stat text-3xl text-accent sm:text-4xl"
                  >
                    {solarCalc.systemKWp.toFixed(1)} kWp
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-xs text-stone-500">{solarCalc.panelCount} панела</p>
              </div>
              <div className="rounded-2xl bg-accent/10 p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-accent/70 mb-1">Годишни спестявания</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`sav-${solarCalc.annualSavings}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-editorial-stat text-3xl text-accent sm:text-4xl"
                  >
                    ~{solarCalc.annualSavings.toLocaleString("bg-BG")} лв.
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="rounded-2xl bg-accent/10 p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-accent/70 mb-1">Изплащане</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`pb-${solarCalc.paybackYears.toFixed(1)}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-editorial-stat text-3xl text-accent sm:text-4xl"
                  >
                    {solarCalc.paybackYears.toFixed(1)} г.
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-xs text-stone-500">~{solarCalc.systemCost.toLocaleString("bg-BG")} лв.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CASE STUDIES */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-editorial-overline text-accent mb-4"
          >
            Реални проекти
          </motion.p>
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Вашите съседи вече спестяват
          </TextReveal>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                image: REAL_IMAGES.projects.kran5_1,
                title: "5 kW — Кран, Велинград",
                stat: 5,
                savings: "~100 лв./мес.",
                quote: "Системата се вписа перфектно в покрива и от първия месец виждаме разликата в сметките.",
              },
              {
                image: REAL_IMAGES.projects.vratsa15_1,
                title: "15 kW + батерия — Враца",
                stat: 15,
                savings: "~280 лв./мес.",
                quote: "С батерията имаме ток и при спиране на мрежата. Пълна независимост.",
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                variants={i === 0 ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="group overflow-hidden rounded-3xl border border-stone-200 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageEditorial
                    src={project.image}
                    alt={project.title}
                    fill
                    parallax
                    containerClassName="h-full"
                  />
                  <div className="absolute bottom-4 left-4">
                    <StatNumber
                      value={project.stat}
                      suffix=" kW"
                      className="text-3xl text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-editorial-heading">{project.title}</h3>
                  <p className="mt-1 text-accent font-semibold">{project.savings} спестявания</p>
                  <blockquote className="text-editorial-pull-quote mt-4 text-stone-500 italic border-l-2 border-accent pl-4">
                    &ldquo;{project.quote}&rdquo;
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINANCING — dark */}
      <section className="bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <TextReveal as="h2" className="text-editorial-display text-white mb-4">
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
            {[
              {
                icon: HandCoins,
                title: "Кеш",
                desc: "Еднократно плащане с максимална отстъпка. Най-ниска обща цена.",
                detail: "от 5 500 лв.",
              },
              {
                icon: CreditCard,
                title: "Кредит",
                desc: "Банков кредит с ниска лихва. Месечната вноска е по-малка от спестяванията.",
                detail: "от 95 лв./мес.",
              },
              {
                icon: Landmark,
                title: "Лизинг",
                desc: "Оперативен лизинг — без начална вноска. Плащате по-малко от текущата сметка.",
                detail: "от 120 лв./мес.",
              },
            ].map((option) => (
              <motion.div
                key={option.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <option.icon className="size-8 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-white/60 text-sm mb-4">{option.desc}</p>
                <p className="text-accent font-bold text-lg">{option.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. PROPERTY VALUE */}
      <section ref={propRef} className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={propInView ? "visible" : "hidden"}
              className="flex-1"
            >
              <Home className="size-12 text-accent mb-4" strokeWidth={1.5} />
              <TextReveal as="h2" className="text-editorial-display">
                По-скъп имот
              </TextReveal>
              <p className="mt-4 text-stone-600 text-lg leading-relaxed max-w-md">
                Проучванията показват, че имотите със соларни системи се продават по-бързо и
                на по-висока цена. Купувачите оценяват ниските сметки за ток.
              </p>
            </motion.div>
            <motion.div
              variants={scaleSpring}
              initial="hidden"
              animate={propInView ? "visible" : "hidden"}
              className="mt-8 md:mt-0 flex items-center gap-4"
            >
              <TrendingUp className="size-10 text-accent" strokeWidth={1.5} />
              <StatNumber
                value={8}
                prefix="4–"
                suffix="%"
                context="увеличена стойност на имота"
                className="text-6xl md:text-7xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <TextReveal as="h2" className="text-editorial-display text-center mb-12">
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
                <Accordion.Item value={`faq-${i}`} className="border-b border-stone-200">
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left font-semibold text-stone-900 transition-colors hover:text-accent">
                    <span>{item.q}</span>
                    <ChevronDown className="size-5 shrink-0 text-stone-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <p className="pb-5 pr-8 leading-relaxed text-stone-600">{item.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* 10. CTA — dark */}
      <section className="relative bg-stone-950 px-6 py-28 text-white md:px-8 md:py-36 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <TextReveal as="h2" className="text-editorial-hero text-white mb-6">
            Готови за промяната?
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/60 text-xl mb-10 max-w-xl mx-auto"
          >
            Конфигурирайте системата си онлайн и получете ориентировъчна оферта за минути.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="primary" size="xl">
            Конфигурирай Система
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
