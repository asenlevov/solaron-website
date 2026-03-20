"use client";

import { useRef, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { motion, useInView } from "motion/react";
import {
  Home,
  Building,
  Building2,
  Factory,
  ArrowRight,
  Compass,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TextReveal } from "@/components/ui/text-reveal";
import { revealFromBottom } from "@/lib/animations";
import { CITY_IRRADIANCE } from "@/lib/electricity-prices";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ELECTRICITY_PRICE = 0.25;

const PROPERTY_TYPES = [
  {
    id: "house" as const,
    label: "Къща",
    icon: Home,
    defaultConsumption: 450,
    min: 150,
    max: 1200,
    step: 10,
  },
  {
    id: "apartment" as const,
    label: "Апартамент",
    icon: Building,
    defaultConsumption: 250,
    min: 80,
    max: 600,
    step: 10,
  },
  {
    id: "business" as const,
    label: "Бизнес",
    icon: Building2,
    defaultConsumption: 1500,
    min: 300,
    max: 5000,
    step: 50,
  },
  {
    id: "industry" as const,
    label: "Индустрия",
    icon: Factory,
    defaultConsumption: 8000,
    min: 1000,
    max: 50000,
    step: 500,
  },
];

type PropertyId = (typeof PROPERTY_TYPES)[number]["id"];

const ORIENTATIONS = [
  { id: "south", label: "Юг", multiplier: 1.0 },
  { id: "southeast", label: "Югоизток", multiplier: 0.95 },
  { id: "southwest", label: "Югозапад", multiplier: 0.95 },
  { id: "east", label: "Изток", multiplier: 0.82 },
  { id: "west", label: "Запад", multiplier: 0.82 },
];

const CITIES = Object.keys(CITY_IRRADIANCE);

export function QuickEstimator() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const [propertyType, setPropertyType] = useState<PropertyId>("house");
  const [city, setCity] = useState("София");
  const [monthlyConsumption, setMonthlyConsumption] = useState(450);
  const [showInLev, setShowInLev] = useState(false);
  const [orientation, setOrientation] = useState("south");

  const property = PROPERTY_TYPES.find((p) => p.id === propertyType)!;
  const orientationData = ORIENTATIONS.find((o) => o.id === orientation)!;
  const irradiance = CITY_IRRADIANCE[city] ?? 1300;

  const results = useMemo(() => {
    const annualConsumption = monthlyConsumption * 12;
    const effectiveIrradiance = irradiance * orientationData.multiplier;
    const recommendedKWp = annualConsumption / effectiveIrradiance;
    const panelCount = Math.ceil(recommendedKWp / 0.45);
    const actualKWp = panelCount * 0.45;
    const annualProduction = actualKWp * effectiveIrradiance;
    const selfConsumptionRate =
      propertyType === "business" || propertyType === "industry" ? 0.85 : 0.7;
    const usefulProduction = annualProduction * selfConsumptionRate;
    const annualSavings = usefulProduction * ELECTRICITY_PRICE;
    const systemCost = panelCount * 1200;
    const paybackYears =
      annualSavings > 0 ? systemCost / annualSavings : 99;
    const co2Saved = (annualProduction * 0.4) / 1000;
    const treeEquivalent = Math.round((annualProduction * 0.4) / 22);
    const savings25y = Math.round(
      annualSavings * (Math.pow(1.03, 25) - 1) / 0.03,
    );
    const roofArea = Math.ceil(panelCount * 2);

    return {
      actualKWp,
      panelCount,
      roofArea,
      monthlySavings: Math.round(annualSavings / 12),
      annualSavings: Math.round(annualSavings),
      savings25y,
      paybackYears,
      systemCost,
      co2Saved,
      treeEquivalent,
      financingMonthly: Math.round(systemCost / 120),
    };
  }, [monthlyConsumption, irradiance, orientationData.multiplier, propertyType]);

  function handlePropertyChange(id: PropertyId) {
    setPropertyType(id);
    const p = PROPERTY_TYPES.find((pt) => pt.id === id)!;
    setMonthlyConsumption(p.defaultConsumption);
  }

  const sliderMin = showInLev
    ? Math.round(property.min * ELECTRICITY_PRICE)
    : property.min;
  const sliderMax = showInLev
    ? Math.round(property.max * ELECTRICITY_PRICE)
    : property.max;
  const sliderStep = showInLev
    ? Math.max(1, Math.round(property.step * ELECTRICITY_PRICE))
    : property.step;
  const sliderValue = showInLev
    ? Math.round(monthlyConsumption * ELECTRICITY_PRICE)
    : monthlyConsumption;

  function handleSliderChange(values: number[]) {
    const v = values[0] ?? property.defaultConsumption;
    setMonthlyConsumption(
      showInLev ? Math.round(v / ELECTRICITY_PRICE) : v,
    );
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-8 md:py-32 lg:py-40"
      style={{
        background:
          "linear-gradient(165deg, #0a0f0a 0%, #1a2a1a 60%, #0f1a0f 100%)",
      }}
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center md:mb-20"
          variants={revealFromBottom}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-editorial-overline mb-4">
            ИНТЕЛИГЕНТЕН КАЛКУЛАТОР
          </p>
          <TextReveal as="h2" className="text-editorial-display text-white">
            Изчислете Вашата Система
          </TextReveal>
        </motion.div>

        {/* Split layout */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: inputs ── */}
          <motion.div
            variants={revealFromBottom}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:max-w-lg"
          >
            {/* 1 — Property type */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-white/40">
                1. Тип имот
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PROPERTY_TYPES.map((pt) => {
                  const Icon = pt.icon;
                  const selected = propertyType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handlePropertyChange(pt.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-all duration-300",
                        selected
                          ? "border-[#3B7A2A]/50 bg-[#3B7A2A]/20 text-white shadow-[0_0_20px_rgba(59,122,42,0.15)]"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70",
                      )}
                    >
                      <Icon className="size-6" strokeWidth={1.5} />
                      <span>{pt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2 — Location */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-white/40">
                2. Локация
              </p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(
                  "w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3",
                  "text-white backdrop-blur-sm transition-colors",
                  "focus:border-[#3B7A2A]/50 focus:outline-none",
                )}
              >
                {CITIES.map((c) => (
                  <option
                    key={c}
                    value={c}
                    className="bg-[#0a0f0a] text-white"
                  >
                    {c}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[#4CAF50]/60">
                Вашият район получава ~{irradiance} kWh/kWp слънчева енергия
                годишно
              </p>
            </div>

            {/* 3 — Monthly consumption */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-white/40">
                  3. Месечно потребление
                </p>
                <button
                  type="button"
                  onClick={() => setShowInLev((v) => !v)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all",
                    showInLev
                      ? "bg-[#3B7A2A]/20 text-[#4CAF50]"
                      : "text-white/40 hover:text-white/60",
                  )}
                >
                  {showInLev ? "В лв. ✓" : "Предпочитам в лв."}
                </button>
              </div>

              <div className="mb-4 text-center">
                <span className="text-3xl font-bold tabular-nums text-white">
                  {sliderValue.toLocaleString("bg-BG")}
                </span>
                <span className="ml-1.5 text-lg text-white/50">
                  {showInLev ? "лв./мес." : "kWh/мес."}
                </span>
              </div>

              <Slider.Root
                className="relative flex w-full touch-none select-none items-center py-4"
                value={[sliderValue]}
                onValueChange={handleSliderChange}
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                aria-label="Месечно потребление"
              >
                <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10">
                  <Slider.Range
                    className="absolute h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #2D6120, #3B7A2A, #4CAF50)",
                    }}
                  />
                </Slider.Track>
                <Slider.Thumb
                  className={cn(
                    "block size-7 cursor-grab rounded-full border-[3px] border-[#3B7A2A] bg-white",
                    "shadow-[0_0_0_4px_rgba(59,122,42,0.15),0_0_15px_rgba(59,122,42,0.3)]",
                    "transition-shadow hover:shadow-[0_0_0_6px_rgba(59,122,42,0.2),0_0_25px_rgba(59,122,42,0.5)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B7A2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0a]",
                    "active:cursor-grabbing",
                  )}
                />
              </Slider.Root>

              <div className="mt-1 flex justify-between text-xs text-white/50">
                <span>
                  {sliderMin.toLocaleString("bg-BG")}{" "}
                  {showInLev ? "лв." : "kWh"}
                </span>
                <span>
                  {sliderMax.toLocaleString("bg-BG")}{" "}
                  {showInLev ? "лв." : "kWh"}
                </span>
              </div>

              {(propertyType === "house" || propertyType === "apartment") && (
                <p className="mt-2 text-xs text-white/50">
                  Не знаете? Средното домакинство: ~380 kWh/мес.
                </p>
              )}
            </div>

            {/* 4 — Roof orientation */}
            <div>
              <p className="mb-3 text-sm font-medium text-white/40">
                <Compass className="mr-1.5 inline size-4 align-[-2px]" />
                4. Ориентация на покрива
              </p>
              <div className="flex flex-wrap gap-2">
                {ORIENTATIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOrientation(o.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                      orientation === o.id
                        ? "bg-[#3B7A2A] text-white shadow-[0_0_15px_rgba(59,122,42,0.25)]"
                        : "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/70",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: results dashboard ── */}
          <motion.div
            variants={revealFromBottom}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:max-w-xl"
          >
            {/* System recommendation */}
            <div className="mb-5 rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                Препоръчана система
              </p>
              <p className="text-2xl font-bold text-white md:text-3xl">
                Препоръчваме{" "}
                <span className="text-[#4CAF50]">
                  {results.actualKWp.toFixed(1)} kWp
                </span>{" "}
                система
              </p>
              <div className="mt-2 flex gap-6 text-sm text-white/50">
                <span>{results.panelCount} панела</span>
                <span>~{results.roofArea} м² покривна площ</span>
              </div>
            </div>

            {/* Financial cards */}
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center backdrop-blur-sm">
                <AnimatedCounter
                  key={`m-${results.monthlySavings}`}
                  value={results.monthlySavings}
                  duration={400}
                  className="text-xl font-black tabular-nums text-white md:text-2xl"
                />
                <p className="mt-1 text-xs text-white/60">лв./месец</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center backdrop-blur-sm">
                <AnimatedCounter
                  key={`a-${results.annualSavings}`}
                  value={results.annualSavings}
                  duration={400}
                  className="text-xl font-black tabular-nums text-white md:text-2xl"
                />
                <p className="mt-1 text-xs text-white/60">лв./годишно</p>
              </div>
              <div className="rounded-xl border border-[#3B7A2A]/15 bg-[#3B7A2A]/5 p-4 text-center backdrop-blur-sm">
                <AnimatedCounter
                  key={`25-${results.savings25y}`}
                  value={results.savings25y}
                  duration={500}
                  className="text-xl font-black tabular-nums text-[#4CAF50] md:text-2xl"
                />
                <p className="mt-1 text-xs text-[#4CAF50]/50">за 25 години</p>
              </div>
            </div>

            {/* Payback bar */}
            <div className="mb-5 rounded-xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white/50">Изплащане</span>
                <span className="font-bold text-[#4CAF50]">
                  {results.paybackYears.toFixed(1)} години
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#2D6120] to-[#4CAF50]"
                  animate={{
                    width: `${Math.min(results.paybackYears / 10, 1) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-white/50">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10 г.</span>
              </div>
            </div>

            {/* System cost */}
            <div className="mb-4 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
              <p className="mb-1 text-xs text-white/40">
                Приблизителна стойност
              </p>
              <p className="text-lg font-bold tabular-nums text-white">
                {Math.round(results.systemCost * 0.85).toLocaleString("bg-BG")}{" "}
                –{" "}
                {Math.round(results.systemCost * 1.15).toLocaleString("bg-BG")}{" "}
                лв.
              </p>
            </div>

            {/* Environmental */}
            <div className="rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
              <p className="text-sm text-white/50">
                <span className="font-semibold text-[#4CAF50]">
                  {results.co2Saved.toFixed(1)} т
                </span>{" "}
                CO₂/год. ={" "}
                <span className="font-semibold text-[#4CAF50]">
                  {results.treeEquivalent}
                </span>{" "}
                дървета
              </p>
            </div>

            {/* Financing teaser */}
            <p className="mt-3 text-center text-xs text-white/50">
              от ~{results.financingMonthly} лв./мес. с банков кредит
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          variants={revealFromBottom}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Link
            href="/konfigurator"
            className={cn(
              "group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white",
              "border border-white/20 transition-all duration-300",
              "hover:border-white/40 hover:bg-white/5",
            )}
          >
            Пълна Конфигурация
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
