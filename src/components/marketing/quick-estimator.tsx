"use client";

import { useRef, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Home,
  Building,
  Building2,
  Factory,
  ArrowRight,
  Compass,
  ChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { CITY_IRRADIANCE } from "@/lib/electricity-prices";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

const ELECTRICITY_PRICE = 0.25;

type PropertyId = "house" | "apartment" | "business" | "industry";

const PROPERTY_CONFIGS = {
  house: { icon: Home, defaultConsumption: 450, min: 150, max: 1200, step: 10 },
  apartment: { icon: Building, defaultConsumption: 250, min: 80, max: 600, step: 10 },
  business: { icon: Building2, defaultConsumption: 1500, min: 300, max: 5000, step: 50 },
  industry: { icon: Factory, defaultConsumption: 8000, min: 1000, max: 50000, step: 500 },
} as const;

const ORIENTATION_MULTIPLIERS: Record<string, number> = {
  south: 1.0,
  southeast: 0.95,
  southwest: 0.95,
  east: 0.82,
  west: 0.82,
};

const ORIENTATION_IDS = ["south", "southeast", "southwest", "east", "west"] as const;

const CITIES = Object.keys(CITY_IRRADIANCE);

const ORIENTATION_ANGLES: Record<string, number> = {
  south: 180,
  southeast: 135,
  southwest: 225,
  east: 90,
  west: 270,
};

/* ── Mini system visualization ─────────────────────────────────── */

function MiniSystemViz({
  panelCount,
  orientation,
  orientationLabel,
}: {
  panelCount: number;
  orientation: string;
  orientationLabel: string;
}) {
  const displayPanels = Math.min(panelCount, 12);
  const cols = Math.min(displayPanels, 4) || 1;
  const angle = ORIENTATION_ANGLES[orientation] ?? 180;

  const panelW = 11;
  const panelH = 7;
  const gap = 2;

  const panels = Array.from({ length: displayPanels }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const totalW = cols * panelW + (cols - 1) * gap;
    return {
      x: 60 - totalW / 2 + col * (panelW + gap),
      y: 26 + row * (panelH + gap),
      key: i,
    };
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 120 100"
        width={120}
        height={100}
        className="text-foreground"
        aria-hidden
      >
        {/* Sun + animated rays */}
        {displayPanels > 0 && (
          <g>
            <circle cx="100" cy="14" r="7" className="fill-accent/80" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <motion.line
                  key={deg}
                  x1={100 + Math.cos(rad) * 11}
                  y1={14 + Math.sin(rad) * 11}
                  x2={100 + Math.cos(rad) * 15}
                  y2={14 + Math.sin(rad) * 15}
                  className="stroke-accent"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: deg / 360,
                  }}
                />
              );
            })}
          </g>
        )}

        {/* House body */}
        <rect
          x="25"
          y="55"
          width="70"
          height="35"
          rx="2"
          className="fill-foreground/[.06] stroke-foreground/[.15]"
          strokeWidth={1}
        />
        {/* Roof */}
        <polygon
          points="60,15 15,55 105,55"
          className="fill-foreground/[.04] stroke-foreground/[.15]"
          strokeWidth={1}
          strokeLinejoin="round"
        />

        {/* Solar panels */}
        {panels.map(({ x, y, key }) => (
          <motion.rect
            key={key}
            x={x}
            y={y}
            width={panelW}
            height={panelH}
            rx={1}
            className="fill-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: key * 0.04, duration: 0.25 }}
          />
        ))}

        {/* Door */}
        <rect
          x="53"
          y="72"
          width="14"
          height="18"
          rx="1.5"
          className="fill-foreground/[.08]"
        />
        {/* Windows */}
        <rect
          x="32"
          y="63"
          width="12"
          height="10"
          rx="1"
          className="fill-foreground/[.04] stroke-foreground/10"
          strokeWidth={0.5}
        />
        <rect
          x="76"
          y="63"
          width="12"
          height="10"
          rx="1"
          className="fill-foreground/[.04] stroke-foreground/10"
          strokeWidth={0.5}
        />
      </svg>

      {/* Compass indicator */}
      <div className="flex items-center gap-1.5 text-[11px] text-foreground-tertiary">
        <svg viewBox="0 0 20 20" width={14} height={14} aria-hidden>
          <circle
            cx="10"
            cy="10"
            r="8.5"
            fill="none"
            className="stroke-foreground/20"
            strokeWidth={1}
          />
          <motion.line
            x1={10}
            y1={10}
            animate={{
              x2: 10 + Math.sin((angle * Math.PI) / 180) * 6,
              y2: 10 - Math.cos((angle * Math.PI) / 180) * 6,
            }}
            className="stroke-accent"
            strokeWidth={2}
            strokeLinecap="round"
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          />
          <circle cx="10" cy="10" r="1.5" className="fill-accent" />
        </svg>
        <span>{orientationLabel}</span>
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────── */

export function QuickEstimator() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const t = useTranslations("Home");
  const tc = useTranslations("Common");

  const [propertyType, setPropertyType] = useState<PropertyId>("house");
  const [city, setCity] = useState("София");
  const [monthlyConsumption, setMonthlyConsumption] = useState(450);
  const [showInLev, setShowInLev] = useState(false);
  const [orientation, setOrientation] = useState("south");
  const [showDetails, setShowDetails] = useState(false);

  const PROPERTY_TYPES = [
    { id: "house" as const, label: t("quickEstimator.house"), ...PROPERTY_CONFIGS.house },
    { id: "apartment" as const, label: t("quickEstimator.apartment"), ...PROPERTY_CONFIGS.apartment },
    { id: "business" as const, label: t("quickEstimator.business"), ...PROPERTY_CONFIGS.business },
    { id: "industry" as const, label: t("quickEstimator.industry"), ...PROPERTY_CONFIGS.industry },
  ];

  const ORIENTATIONS = [
    { id: "south", label: t("quickEstimator.south"), multiplier: ORIENTATION_MULTIPLIERS.south! },
    { id: "southeast", label: t("quickEstimator.southeast"), multiplier: ORIENTATION_MULTIPLIERS.southeast! },
    { id: "southwest", label: t("quickEstimator.southwest"), multiplier: ORIENTATION_MULTIPLIERS.southwest! },
    { id: "east", label: t("quickEstimator.east"), multiplier: ORIENTATION_MULTIPLIERS.east! },
    { id: "west", label: t("quickEstimator.west"), multiplier: ORIENTATION_MULTIPLIERS.west! },
  ];

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
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 99;
    const co2Saved = (annualProduction * 0.4) / 1000;
    const treeEquivalent = Math.round((annualProduction * 0.4) / 22);
    const savings25y = Math.round(
      (annualSavings * (Math.pow(1.03, 25) - 1)) / 0.03,
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
    setMonthlyConsumption(showInLev ? Math.round(v / ELECTRICITY_PRICE) : v);
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background-secondary/50 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <BadgeChip variant="accent" className="mb-4">
            {t("quickEstimator.badge")}
          </BadgeChip>
          <h2 className="editorial-heading">{t("quickEstimator.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
            {t("quickEstimator.subtitle")}
          </p>
        </motion.div>

        {/* ── Grid: inputs | viz | results ── */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* ── Input panel ── */}
          <motion.div
            className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Property type */}
            <div className="mb-6">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                {t("quickEstimator.propertyType")}
              </p>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((pt) => {
                  const Icon = pt.icon;
                  const selected = propertyType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handlePropertyChange(pt.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                        selected
                          ? "bg-accent text-white shadow-sm"
                          : "border border-border text-foreground-secondary hover:border-border-medium hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" strokeWidth={1.5} />
                      {pt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                {t("quickEstimator.locationLabel")}
              </p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-foreground-tertiary">
                {t("quickEstimator.solarEnergyPerYear", { value: String(irradiance) })}
              </p>
            </div>

            {/* Monthly consumption */}
            <div className="mb-6">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                  {t("quickEstimator.monthlyConsumption")}
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
                  {showInLev ? t("quickEstimator.inLev") : t("quickEstimator.preferLev")}
                </button>
              </div>

              <div className="mb-3 text-center">
                <span className="text-3xl font-bold tabular-nums text-foreground">
                  {sliderValue.toLocaleString("bg-BG")}
                </span>
                <span className="ml-1.5 text-lg text-foreground-secondary">
                  {showInLev ? t("quickEstimator.lvPerMonth") : t("quickEstimator.kWhPerMonth")}
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
                <span>
                  {sliderMin.toLocaleString("bg-BG")} {showInLev ? "лв." : "kWh"}
                </span>
                <span>
                  {sliderMax.toLocaleString("bg-BG")} {showInLev ? "лв." : "kWh"}
                </span>
              </div>

              {(propertyType === "house" || propertyType === "apartment") && (
                <p className="mt-2 text-xs text-foreground-tertiary">
                  {t("quickEstimator.avgHousehold")}
                </p>
              )}
            </div>

            {/* Orientation */}
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                <Compass className="mr-1 inline size-3.5 align-[-2px]" />
                {t("quickEstimator.roofOrientation")}
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

          {/* ── Mini system visualization ── */}
          <motion.div
            className="flex items-center justify-center py-4 lg:self-center lg:py-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <MiniSystemViz
              panelCount={results.panelCount}
              orientation={orientation}
              orientationLabel={orientationData.label}
            />
          </motion.div>

          {/* ── Results panel ── */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Hero stat – monthly savings */}
            <div className="rounded-2xl border border-accent/20 bg-accent/5 px-6 py-8 text-center">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                {t("quickEstimator.monthlySavings")}
              </p>
              <AnimatedCounter
                key={`m-${results.monthlySavings}`}
                value={results.monthlySavings}
                duration={400}
                className="text-5xl font-black tabular-nums text-accent md:text-6xl"
              />
              <p className="mt-1 text-sm font-medium text-accent/60">
                {t("quickEstimator.lvPerMonthUnit")}
              </p>
            </div>

            {/* Secondary stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-background px-4 py-4 text-center">
                <AnimatedCounter
                  key={`a-${results.annualSavings}`}
                  value={results.annualSavings}
                  duration={400}
                  className="text-xl font-bold tabular-nums text-foreground"
                />
                <p className="mt-0.5 text-xs text-foreground-tertiary">
                  {t("quickEstimator.lvPerYear")}
                </p>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-4 text-center">
                <AnimatedCounter
                  key={`25-${results.savings25y}`}
                  value={results.savings25y}
                  duration={500}
                  className="text-xl font-bold tabular-nums text-accent"
                />
                <p className="mt-0.5 text-xs text-accent/60">{t("quickEstimator.in25Years")}</p>
              </div>
            </div>

            {/* System recommendation */}
            <GlowCard>
              <div className="px-5 py-4">
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-accent">
                    {results.actualKWp.toFixed(1)} kWp
                  </span>{" "}
                  система
                  <span className="mx-1.5 text-foreground-tertiary">•</span>
                  {results.panelCount} {tc("panels")}
                  <span className="mx-1.5 text-foreground-tertiary">•</span>
                  {results.roofArea} {tc("roofArea")}
                </p>
              </div>
            </GlowCard>

            {/* Payback bar */}
            <div className="rounded-xl border border-border bg-background p-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-foreground-secondary">{t("quickEstimator.payback")}</span>
                <span className="font-bold text-accent">
                  {t("quickEstimator.paybackYears", { value: results.paybackYears.toFixed(1) })}
                </span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-emerald-400"
                  animate={{
                    width: `${Math.min(results.paybackYears / 10, 1) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-foreground-tertiary">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10 г.</span>
              </div>
            </div>

            {/* System cost */}
            <div className="rounded-xl border border-border bg-background px-5 py-4">
              <p className="mb-1 text-xs text-foreground-tertiary">
                {t("quickEstimator.approximateCost")}
              </p>
              <p className="text-lg font-bold tabular-nums text-foreground">
                {Math.round(results.systemCost * 0.85).toLocaleString("bg-BG")}{" "}
                –{" "}
                {Math.round(results.systemCost * 1.15).toLocaleString("bg-BG")}{" "}
                лв.
              </p>
            </div>

            {/* Environmental impact */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 px-5 py-3">
              <p className="text-sm text-foreground-secondary">
                <span className="font-semibold text-accent">
                  {results.co2Saved.toFixed(1)} т
                </span>{" "}
                CO₂/год. ={" "}
                <span className="font-semibold text-accent">
                  {results.treeEquivalent}
                </span>{" "}
                дървета
              </p>
            </div>

            {/* Collapsible details */}
            <div className="rounded-xl border border-border bg-background">
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
              >
                <span>{tc("details")}</span>
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    showDetails && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-5 py-3 text-sm text-foreground-secondary">
                      {t("quickEstimator.financingFrom", { value: String(results.financingMonthly) })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href={"/konfigurator" as never}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-accent-hover hover:shadow-lg"
          >
            {t("quickEstimator.fullConfiguration")}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
