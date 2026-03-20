"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  revealFromLeft,
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
  Car,
  Zap,
  Sun,
  Shield,
  Ruler,
  ChevronRight,
  ParkingCircle,
  BatteryCharging,
  PlugZap,
} from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import {
  calculateAnnualProduction,
  calculateAnnualSavings,
} from "@/lib/solar-calculations";

const CARPORT_KWP_PER_SPACE = 2.7;
const CARPORT_IRRADIANCE = 1300;
const EV_USAGE_FRACTION = 0.3;
const EV_PUBLIC_CHARGE_PRICE = 0.40;

export default function SolarenKarportContent() {
  const [parkingSpaces, setParkingSpaces] = useState([30]);
  const [evCharging, setEvCharging] = useState(false);

  const estimatedKWp = useMemo(
    () => Math.round(parkingSpaces[0] * CARPORT_KWP_PER_SPACE),
    [parkingSpaces],
  );
  const panelCount = useMemo(() => Math.round((estimatedKWp * 1000) / 450), [estimatedKWp]);
  const annualProductionKwh = useMemo(
    () => calculateAnnualProduction(panelCount, 450, CARPORT_IRRADIANCE),
    [panelCount],
  );
  const annualSavings = useMemo(
    () => Math.round(calculateAnnualSavings(annualProductionKwh)),
    [annualProductionKwh],
  );
  const evSavings = useMemo(
    () => Math.round(annualProductionKwh * EV_USAGE_FRACTION * EV_PUBLIC_CHARGE_PRICE),
    [annualProductionKwh],
  );

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const caseRef = useRef<HTMLElement>(null);
  const caseInView = useInView(caseRef, { once: true, margin: "0px 0px -15% 0px" });
  const calcRef = useRef<HTMLElement>(null);
  const calcInView = useInView(calcRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* 1. HERO */}
      <section ref={heroRef} className="relative flex min-h-screen items-center">
        <ImageEditorial
          src={REAL_IMAGES.projects.carport270_hero}
          alt="270 kWp соларен карпорт Казанлък"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-8">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-6"
          >
            Соларен карпорт
          </motion.p>
          <TextReveal as="h1" className="text-editorial-hero max-w-3xl text-white">
            Паркингът Произвежда Ток
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed"
          >
            Двойна функция — защита за автомобилите и чиста енергия
            за бизнеса. Иновативното решение, което се изплаща.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-10 inline-flex items-baseline gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-6 backdrop-blur-md"
          >
            <StatNumber value={270} suffix=" kWp" className="text-5xl md:text-6xl text-white" />
          </motion.div>
        </div>
      </section>

      {/* 2. DETAILED CASE STUDY */}
      <section ref={caseRef} className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={caseInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-4"
          >
            Реализиран проект
          </motion.p>
          <TextReveal as="h2" className="text-editorial-display mb-12">
            270 kWp — Казанлък
          </TextReveal>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              variants={revealFromBottom}
              initial="hidden"
              animate={caseInView ? "visible" : "hidden"}
              className="relative h-80 md:h-auto rounded-3xl overflow-hidden"
            >
              <ImageEditorial
                src={REAL_IMAGES.projects.carport270_hero}
                alt="270 kWp карпорт Казанлък"
                fill
                grain
                containerClassName="h-full"
              />
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate={caseInView ? "visible" : "hidden"}
              className="flex flex-col justify-center"
            >
              <div className="grid grid-cols-2 gap-6 mb-8">
                <StatNumber value={270} suffix=" kWp" context="Инсталирана мощност" className="text-3xl" />
                <StatNumber value={100} suffix="+" context="Паркоместа" className="text-3xl" />
                <StatNumber value={324} suffix=" MWh" context="Годишно производство" className="text-3xl" />
                <StatNumber value={58} suffix=" хил." context="лв. спестявания/год." className="text-3xl" />
              </div>
              <p className="text-stone-600 leading-relaxed">
                Най-големият соларен карпорт в региона. Покрива целия паркинг
                на производствено предприятие, осигурявайки защита на автомобилите
                и значителна част от електроенергията на завода.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Двуредов монтаж", "Tier-1 панели", "Стоманена конструкция", "LED осветление"].map((tag) => (
                  <span key={tag} className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-xs text-stone-600">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EV CHARGING — dark */}
      <section className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <BatteryCharging className="size-12 text-accent mb-4" strokeWidth={1.5} />
              <TextReveal as="h2" className="text-editorial-display text-white">
                Карпорт + EV Зареждане
              </TextReveal>
              <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-lg">
                Комбинирайте соларния карпорт с EV зарядни станции.
                Предоставете безплатно зареждане на служителите или
                монетизирайте като публична зарядна точка.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Зареждане директно от соларните панели",
                  "Без допълнителни разходи за ток",
                  "Привличане на клиенти с EV",
                  "ESG бонус за компанията",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Zap className="size-5 text-accent mt-0.5 shrink-0" />
                    <p className="text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={scaleSpring}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative h-80 rounded-3xl overflow-hidden"
            >
              <ImageEditorial
                src={LIFESTYLE_IMAGES.evCharging}
                alt="Соларен карпорт с EV зареждане"
                fill
                grain
                containerClassName="h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. COMMERCIAL ROI CALCULATOR */}
      <section ref={calcRef} className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <TextReveal as="h2" className="text-editorial-display mb-4">
            Калкулатор за Карпорт
          </TextReveal>
          <p className="text-stone-500 text-lg mb-12">
            Изберете брой паркоместа за ориентировъчна оценка
          </p>
          <motion.div
            variants={scaleSpring}
            initial="hidden"
            animate={calcInView ? "visible" : "hidden"}
            className="rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-12 shadow-xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <ParkingCircle className="size-6 text-accent" />
              <label className="text-sm font-semibold text-stone-600">Брой паркоместа</label>
            </div>
            <p className="text-editorial-stat text-4xl mb-8">{parkingSpaces[0]}</p>
            <Slider.Root
              value={parkingSpaces}
              onValueChange={setParkingSpaces}
              min={10}
              max={100}
              step={5}
              className="relative flex w-full items-center h-6 select-none touch-none"
            >
              <Slider.Track className="relative h-2 w-full grow rounded-full bg-stone-200">
                <Slider.Range className="absolute h-full rounded-full bg-accent" />
              </Slider.Track>
              <Slider.Thumb className="block size-6 rounded-full bg-accent shadow-lg ring-2 ring-white focus:outline-none" />
            </Slider.Root>
            <div className="mt-8 flex items-center justify-center gap-3">
              <PlugZap className="size-5 text-accent" />
              <label htmlFor="ev-toggle" className="text-sm font-medium text-stone-600">
                Зарядна станция за EV
              </label>
              <Switch.Root
                id="ev-toggle"
                checked={evCharging}
                onCheckedChange={setEvCharging}
                className={cn(
                  "relative h-6 w-11 shrink-0 cursor-pointer rounded-full border border-stone-300 bg-stone-200 outline-none transition-colors",
                  "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
                  "focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
                )}
              >
                <Switch.Thumb
                  className={cn(
                    "block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform",
                    "data-[state=checked]:translate-x-[1.25rem]",
                  )}
                />
              </Switch.Root>
            </div>

            <div className={cn("mt-6 grid gap-4", evCharging ? "md:grid-cols-3" : "md:grid-cols-2")}>
              <div className="rounded-2xl bg-accent/10 p-6">
                <p className="text-sm uppercase tracking-widest text-accent mb-2">Мощност</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={estimatedKWp}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-editorial-stat text-4xl text-accent"
                  >
                    ~{estimatedKWp} kWp
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="rounded-2xl bg-accent/10 p-6">
                <p className="text-sm uppercase tracking-widest text-accent mb-2">Годишни спестявания</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={annualSavings}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-editorial-stat text-4xl text-accent"
                  >
                    ~{annualSavings.toLocaleString("bg-BG")} лв.
                  </motion.p>
                </AnimatePresence>
              </div>
              {evCharging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-accent/10 p-6"
                >
                  <p className="text-sm uppercase tracking-widest text-accent mb-2">
                    EV зареждане
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={evSavings}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-editorial-stat text-4xl text-accent"
                    >
                      ~{evSavings.toLocaleString("bg-BG")} лв./год.
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-2 text-xs text-stone-500">
                    Спестявания от EV зареждане
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. DESIGN OPTIONS — dark */}
      <section className="relative bg-stone-900 px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="text-editorial-display text-white text-center mb-16">
            Варианти на Конструкция
          </TextReveal>
          <motion.div
            variants={createStagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                title: "Едноредов",
                desc: "Компактен дизайн за тесни паркинги. Един ред колони с конзолна конструкция.",
                specs: ["Ширина: 3–4 м", "Височина: 2.5 м", "kWp/място: ~2.0"],
                shape: (
                  <svg viewBox="0 0 120 60" className="w-full h-20 mb-6">
                    <rect x="5" y="40" width="4" height="20" fill="currentColor" opacity={0.3} />
                    <rect x="55" y="40" width="4" height="20" fill="currentColor" opacity={0.3} />
                    <rect x="105" y="40" width="4" height="20" fill="currentColor" opacity={0.3} />
                    <polygon points="0,40 115,35 115,42 0,47" fill="#3B7A2A" opacity={0.6} />
                    <rect x="0" y="35" width="115" height="3" fill="#3B7A2A" opacity={0.8} />
                  </svg>
                ),
              },
              {
                title: "Двуредов",
                desc: "Стандартен карпорт за двуредово паркиране. Оптимален баланс между мощност и цена.",
                specs: ["Ширина: 6–8 м", "Височина: 3 м", "kWp/място: ~2.7"],
                shape: (
                  <svg viewBox="0 0 120 60" className="w-full h-20 mb-6">
                    <rect x="5" y="30" width="4" height="30" fill="currentColor" opacity={0.3} />
                    <rect x="55" y="30" width="4" height="30" fill="currentColor" opacity={0.3} />
                    <rect x="110" y="30" width="4" height="30" fill="currentColor" opacity={0.3} />
                    <polygon points="0,30 118,25 118,32 0,37" fill="#3B7A2A" opacity={0.6} />
                    <rect x="0" y="25" width="118" height="3" fill="#3B7A2A" opacity={0.8} />
                  </svg>
                ),
              },
              {
                title: "Конзолен",
                desc: "Модерен дизайн без централни колони. Максимална маневреност и естетика.",
                specs: ["Ширина: 5–6 м", "Височина: 3.5 м", "kWp/място: ~3.0"],
                shape: (
                  <svg viewBox="0 0 120 60" className="w-full h-20 mb-6">
                    <rect x="5" y="20" width="6" height="40" fill="currentColor" opacity={0.3} />
                    <rect x="60" y="20" width="6" height="40" fill="currentColor" opacity={0.3} />
                    <rect x="0" y="18" width="120" height="3" fill="#3B7A2A" opacity={0.8} />
                    <polygon points="0,18 120,15 120,21 0,24" fill="#3B7A2A" opacity={0.5} />
                  </svg>
                ),
              },
            ].map((design) => (
              <motion.div
                key={design.title}
                variants={staggerItem}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                {design.shape}
                <h3 className="text-xl font-semibold mb-3">{design.title}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{design.desc}</p>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  {design.specs.map((spec) => (
                    <p key={spec} className="text-xs text-white/40 flex items-center gap-2">
                      <Ruler className="size-3" />
                      {spec}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="overflow-hidden bg-accent px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal as="h2" className="text-editorial-hero text-white mb-6">
            Вашият Паркинг, Вашата Централа
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/80 text-xl mb-10 max-w-xl mx-auto"
          >
            Получете безплатна оценка за соларен карпорт — от проект до реализация.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Заявете Оценка
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
