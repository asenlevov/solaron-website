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
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { CITY_IRRADIANCE } from "@/lib/electricity-prices";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ELECTRICITY_PRICE = 0.25;

const PROPERTY_TYPES = [
  { id: "house" as const, label: "Къща", icon: Home, defaultConsumption: 450, min: 150, max: 1200, step: 10 },
  { id: "apartment" as const, label: "Апартамент", icon: Building, defaultConsumption: 250, min: 80, max: 600, step: 10 },
  { id: "business" as const, label: "Бизнес", icon: Building2, defaultConsumption: 1500, min: 300, max: 5000, step: 50 },
  { id: "industry" as const, label: "Индустрия", icon: Factory, defaultConsumption: 8000, min: 1000, max: 50000, step: 500 },
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
    const selfConsumptionRate = propertyType === "business" || propertyType === "industry" ? 0.85 : 0.7;
    const usefulProduction = annualProduction * selfConsumptionRate;
    const annualSavings = usefulProduction * ELECTRICITY_PRICE;
    const systemCost = panelCount * 1200;
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 99;
    const co2Saved = (annualProduction * 0.4) / 1000;
    const treeEquivalent = Math.round((annualProduction * 0.4) / 22);
    const savings25y = Math.round(annualSavings * (Math.pow(1.03, 25) - 1) / 0.03);
    const roofArea = Math.ceil(panelCount * 2);

    return {
      actualKWp, panelCount, roofArea,
      monthlySavings: Math.round(annualSavings / 12),
      annualSavings: Math.round(annualSavings),
      savings25y, paybackYears, systemCost, co2Saved, treeEquivalent,
      financingMonthly: Math.round(systemCost / 120),
    };
  }, [monthlyConsumption, irradiance, orientationData.multiplier, propertyType]);

  function handlePropertyChange(id: PropertyId) {
    setPropertyType(id);
    const p = PROPERTY_TYPES.find((pt) => pt.id === id)!;
    setMonthlyConsumption(p.defaultConsumption);
  }

  const sliderMin = showInLev ? Math.round(property.min * ELECTRICITY_PRICE) : property.min;
  const sliderMax = showInLev ? Math.round(property.max * ELECTRICITY_PRICE) : property.max;
  const sliderStep = showInLev ? Math.max(1, Math.round(property.step * ELECTRICITY_PRICE)) : property.step;
  const sliderValue = showInLev ? Math.round(monthlyConsumption * ELECTRICITY_PRICE) : monthlyConsumption;

  function handleSliderChange(values: number[]) {
    const v = values[0] ?? property.defaultConsumption;
    setMonthlyConsumption(showInLev ? Math.round(v / ELECTRICITY_PRICE) : v);
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-background-secondary/50 px-6 py-24 md:px-8 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <BadgeChip variant="accent" className="mb-4">Интелигентен Калкулатор</BadgeChip>
          <h2 className="text-editorial-heading">Изчислете Вашата Система</h2>
          <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
            Персонализирана оценка на база вашата консумация, локация и покрив.
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Property type */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
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
                        "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-all duration-200",
                        selected
                          ? "border-accent/40 bg-accent/10 text-accent shadow-sm"
                          : "border-border bg-background text-foreground-secondary hover:border-border-medium hover:text-foreground",
                      )}
                    >
                      <Icon className="size-6" strokeWidth={1.5} />
                      <span>{pt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                2. Локация
              </p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-foreground-tertiary">
                Вашият район получава ~{irradiance} kWh/kWp слънчева енергия годишно
              </p>
            </div>

            {/* Monthly consumption */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                  3. Месечно потребление
                </p>
                <button
                  type="button"
                  onClick={() => setShowInLev((v) => !v)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all",
                    showInLev
                      ? "bg-accent/10 text-accent"
                      : "text-foreground-tertiary hover:text-foreground-secondary",
                  )}
                >
                  {showInLev ? "В лв. ✓" : "Предпочитам в лв."}
                </button>
              </div>

              <div className="mb-4 text-center">
                <span className="text-3xl font-bold tabular-nums text-foreground">
                  {sliderValue.toLocaleString("bg-BG")}
                </span>
                <span className="ml-1.5 text-lg text-foreground-secondary">
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
                <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-border">
                  <Slider.Range className="absolute h-full rounded-full bg-accent" />
                </Slider.Track>
                <Slider.Thumb className="block size-6 cursor-grab rounded-full border-2 border-background bg-accent shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing" />
              </Slider.Root>

              <div className="mt-1 flex justify-between text-xs text-foreground-tertiary">
                <span>{sliderMin.toLocaleString("bg-BG")} {showInLev ? "лв." : "kWh"}</span>
                <span>{sliderMax.toLocaleString("bg-BG")} {showInLev ? "лв." : "kWh"}</span>
              </div>

              {(propertyType === "house" || propertyType === "apartment") && (
                <p className="mt-2 text-xs text-foreground-tertiary">
                  Не знаете? Средното домакинство: ~380 kWh/мес.
                </p>
              )}
            </div>

            {/* Orientation */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
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
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                      orientation === o.id
                        ? "bg-accent text-white shadow-sm"
                        : "border border-border text-foreground-secondary hover:border-border-medium hover:text-foreground",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* System recommendation */}
            <GlowCard className="mb-4">
              <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                  Препоръчана система
                </p>
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  Препоръчваме{" "}
                  <span className="text-accent">{results.actualKWp.toFixed(1)} kWp</span>{" "}
                  система
                </p>
                <div className="mt-2 flex gap-6 text-sm text-foreground-secondary">
                  <span>{results.panelCount} панела</span>
                  <span>~{results.roofArea} м² покривна площ</span>
                </div>
              </div>
            </GlowCard>

            {/* Financial cards */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <GlowCard>
                <div className="p-4 text-center">
                  <AnimatedCounter
                    key={`m-${results.monthlySavings}`}
                    value={results.monthlySavings}
                    duration={400}
                    className="text-xl font-black tabular-nums text-foreground md:text-2xl"
                  />
                  <p className="mt-1 text-xs text-foreground-secondary">лв./месец</p>
                </div>
              </GlowCard>
              <GlowCard>
                <div className="p-4 text-center">
                  <AnimatedCounter
                    key={`a-${results.annualSavings}`}
                    value={results.annualSavings}
                    duration={400}
                    className="text-xl font-black tabular-nums text-foreground md:text-2xl"
                  />
                  <p className="mt-1 text-xs text-foreground-secondary">лв./годишно</p>
                </div>
              </GlowCard>
              <GlowCard>
                <div className="p-4 text-center border-l-2 border-l-accent/20">
                  <AnimatedCounter
                    key={`25-${results.savings25y}`}
                    value={results.savings25y}
                    duration={500}
                    className="text-xl font-black tabular-nums text-accent md:text-2xl"
                  />
                  <p className="mt-1 text-xs text-accent/60">за 25 години</p>
                </div>
              </GlowCard>
            </div>

            {/* Payback bar */}
            <div className="mb-4 rounded-xl border border-border bg-background p-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-foreground-secondary">Изплащане</span>
                <span className="font-bold text-accent">
                  {results.paybackYears.toFixed(1)} години
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-emerald-400"
                  animate={{ width: `${Math.min(results.paybackYears / 10, 1) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-foreground-tertiary">
                <span>0</span><span>2</span><span>4</span><span>6</span><span>8</span><span>10 г.</span>
              </div>
            </div>

            {/* System cost */}
            <div className="mb-4 rounded-xl border border-border bg-background px-5 py-4">
              <p className="mb-1 text-xs text-foreground-tertiary">Приблизителна стойност</p>
              <p className="text-lg font-bold tabular-nums text-foreground">
                {Math.round(results.systemCost * 0.85).toLocaleString("bg-BG")} –{" "}
                {Math.round(results.systemCost * 1.15).toLocaleString("bg-BG")} лв.
              </p>
            </div>

            {/* Environmental */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 px-5 py-3">
              <p className="text-sm text-foreground-secondary">
                <span className="font-semibold text-accent">{results.co2Saved.toFixed(1)} т</span>{" "}
                CO2/год. ={" "}
                <span className="font-semibold text-accent">{results.treeEquivalent}</span>{" "}
                дървета
              </p>
            </div>

            <p className="mt-3 text-center text-xs text-foreground-tertiary">
              от ~{results.financingMonthly} лв./мес. с банков кредит
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/konfigurator"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-accent-hover hover:shadow-lg"
          >
            Пълна Конфигурация
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
