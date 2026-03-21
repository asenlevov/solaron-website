"use client";

import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { Check, ChevronDown, Sun, Cpu, Battery, Monitor, Zap } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RoiVisualization } from "@/components/configurator/roi-visualization";
import { SummaryCard } from "@/components/configurator/summary-card";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { CITY_IRRADIANCE } from "@/lib/electricity-prices";
import {
  calculate25YearProjection,
  calculateAnnualProduction,
  calculateAnnualSavings,
  calculateEnvironmentalImpact,
  calculatePaybackPeriod,
  calculateSystemCost,
} from "@/lib/solar-calculations";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

const CITIES = Object.keys(CITY_IRRADIANCE).sort((a, b) =>
  a.localeCompare(b, "bg"),
);

const ORIENTATION_OPTIONS = [
  { value: "S", label: "Юг (S)" },
  { value: "N", label: "Север (N)" },
  { value: "E", label: "Изток (E)" },
  { value: "W", label: "Запад (W)" },
] as const;

const ORIENTATION_FACTOR: Record<string, number> = {
  S: 1, N: 0.58, E: 0.88, W: 0.88,
};

const PANEL_WATTAGES = [
  { value: 400, label: "400W" },
  { value: 450, label: "450W" },
  { value: 500, label: "500W" },
] as const;

const INVERTER_TYPES = [
  { value: "string", label: "String", cost: 0 },
  { value: "micro", label: "Micro", cost: 1200 },
  { value: "hybrid", label: "Хибриден", cost: 2400 },
] as const;

const EV_CHARGER_TYPES = [
  { value: "7", label: "7 kW", cost: 1800 },
  { value: "11", label: "11 kW", cost: 2800 },
  { value: "22", label: "22 kW", cost: 4500 },
] as const;

function pitchFactorDeg(deg: number): number {
  const optimal = 32;
  return Math.max(0.88, 1 - Math.abs(deg - optimal) * 0.004);
}

function effectiveIrradiance(
  city: string,
  orientation: string,
  pitchDeg: number,
  shadingPct: number,
): number {
  const base = CITY_IRRADIANCE[city] ?? 1300;
  const ori = ORIENTATION_FACTOR[orientation] ?? 1;
  const pitch = pitchFactorDeg(pitchDeg);
  const shade = 1 - shadingPct / 100;
  return base * ori * pitch * shade;
}

function ModuleToggle({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
  badge,
  children,
}: {
  icon: typeof Sun;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-200",
        enabled
          ? "border-accent/30 bg-accent/[0.03]"
          : "border-border bg-background",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
              enabled ? "bg-accent/10 text-accent" : "bg-background-secondary text-foreground-tertiary",
            )}
          >
            <Icon className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-foreground">
                {label}
              </span>
              {badge && <BadgeChip variant="new">{badge}</BadgeChip>}
            </div>
            <p className="mt-0.5 text-xs text-foreground-secondary">
              {description}
            </p>
          </div>
        </div>
        <Switch.Root
          checked={enabled}
          onCheckedChange={onToggle}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
            enabled ? "bg-accent" : "bg-border",
          )}
        >
          <Switch.Thumb
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform",
              enabled ? "translate-x-5" : "translate-x-0",
            )}
          />
        </Switch.Root>
      </div>
      {enabled && children && (
        <div className="mt-3 pl-12">{children}</div>
      )}
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  color = "accent",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
          {label}
        </span>
        <span className="font-display text-sm font-semibold tabular-nums text-foreground">
          {value}{unit}
        </span>
      </div>
      <Slider.Root
        className="relative flex w-full touch-none select-none items-center py-2"
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? min)}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
          <Slider.Range className="absolute h-full rounded-full bg-accent" />
        </Slider.Track>
        <Slider.Thumb className="block size-6 cursor-grab rounded-full border-2 border-background bg-accent shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing" />
      </Slider.Root>
    </div>
  );
}

export function RoiKalkulatorClient() {
  const [city, setCity] = useState(CITIES.includes("София") ? "София" : (CITIES[0] ?? "София"));
  const [orientation, setOrientation] = useState<string>("S");
  const [pitch, setPitch] = useState(30);
  const [shading, setShading] = useState(0);
  const [monthlyConsumption, setMonthlyConsumption] = useState(400);
  const [electricityRate, setElectricityRate] = useState(0.25);

  const [panelWattage, setPanelWattage] = useState(450);
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryCapacity, setBatteryCapacity] = useState(10);
  const [inverterType, setInverterType] = useState("string");
  const [hasMonitoring, setHasMonitoring] = useState(true);
  const [hasEvCharger, setHasEvCharger] = useState(false);
  const [evChargerType, setEvChargerType] = useState("11");

  const metrics = useMemo(() => {
    const irr = effectiveIrradiance(city, orientation, pitch, shading);
    const kwhPerPanel = (panelWattage / 1000) * irr;
    const annualNeed = monthlyConsumption * 12;
    const recommendedPanels = Math.min(
      120,
      Math.max(4, Math.ceil((annualNeed * 0.95) / Math.max(kwhPerPanel, 1))),
    );

    const annualProduction = calculateAnnualProduction(recommendedPanels, panelWattage, irr);
    const annualSavings = calculateAnnualSavings(annualProduction, electricityRate);

    const baseCost = calculateSystemCost(recommendedPanels, hasBattery, hasBattery ? batteryCapacity : 0);
    const inverterAddon = INVERTER_TYPES.find((t) => t.value === inverterType)?.cost ?? 0;
    const monitoringCost = hasMonitoring ? 400 : 0;
    const evCost = hasEvCharger ? (EV_CHARGER_TYPES.find((t) => t.value === evChargerType)?.cost ?? 0) : 0;
    const systemCost = baseCost + inverterAddon + monitoringCost + evCost;

    const paybackYears = calculatePaybackPeriod(systemCost, annualSavings);
    const projection = calculate25YearProjection(systemCost, annualSavings);
    const totalSavings25yr = projection[projection.length - 1]?.cumulativeSavings ?? 0;
    const env = calculateEnvironmentalImpact(annualProduction);
    const systemSizeKwp = (recommendedPanels * panelWattage) / 1000;

    const costBreakdown = {
      panels: recommendedPanels * 1200,
      inverter: inverterAddon,
      battery: hasBattery ? batteryCapacity * 800 : 0,
      monitoring: monitoringCost,
      ev: evCost,
    };

    const traditionalCost25yr = monthlyConsumption * 12 * electricityRate *
      Array.from({ length: 25 }, (_, i) => Math.pow(1.03, i)).reduce((a, b) => a + b, 0);

    return {
      irr, recommendedPanels, annualProduction, annualSavings,
      systemCost, paybackYears, projection, totalSavings25yr,
      env, systemSizeKwp, costBreakdown, traditionalCost25yr,
    };
  }, [city, orientation, pitch, shading, monthlyConsumption, electricityRate, panelWattage, hasBattery, batteryCapacity, inverterType, hasMonitoring, hasEvCharger, evChargerType]);

  const selectTriggerClass = cn(
    "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border-medium bg-background px-3 font-body text-sm text-foreground",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
  const selectItemClass = cn(
    "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-body text-sm outline-none",
    "data-[highlighted]:bg-background-secondary data-[state=checked]:text-accent",
  );

  return (
    <>
      {/* Hero */}
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <BadgeChip variant="accent" className="mb-6">Инструменти</BadgeChip>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            ROI Калкулатор
          </h1>
          <p className="mt-4 font-body text-lg text-foreground-secondary">
            Конфигурирайте вашата система модул по модул и вижте 25-годишна
            прогноза за спестявания, производство и екологичен ефект.
          </p>
        </div>
      </SectionWrapper>

      {/* Main calculator */}
      <SectionWrapper background="white" className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
          <div className="space-y-8">
            {/* Module Toggles */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Системни Модули
              </h2>
              <div className="space-y-3">
                <ModuleToggle
                  icon={Sun}
                  label="Соларни Панели"
                  description="MWT модули с висока ефективност"
                  enabled={true}
                  onToggle={() => {}}
                >
                  <div className="flex gap-2">
                    {PANEL_WATTAGES.map((pw) => (
                      <button
                        key={pw.value}
                        type="button"
                        onClick={() => setPanelWattage(pw.value)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          panelWattage === pw.value
                            ? "bg-accent text-white"
                            : "border border-border bg-background text-foreground-secondary hover:border-border-medium",
                        )}
                      >
                        {pw.label}
                      </button>
                    ))}
                  </div>
                </ModuleToggle>

                <ModuleToggle
                  icon={Cpu}
                  label="Инвертор"
                  description="Тип на инвертора"
                  enabled={true}
                  onToggle={() => {}}
                >
                  <div className="flex gap-2">
                    {INVERTER_TYPES.map((inv) => (
                      <button
                        key={inv.value}
                        type="button"
                        onClick={() => setInverterType(inv.value)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          inverterType === inv.value
                            ? "bg-accent text-white"
                            : "border border-border bg-background text-foreground-secondary hover:border-border-medium",
                        )}
                      >
                        {inv.label}
                        {inv.cost > 0 && (
                          <span className="ml-1 text-[10px] opacity-70">
                            +{formatCurrency(inv.cost)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </ModuleToggle>

                <ModuleToggle
                  icon={Battery}
                  label="Батерия"
                  description="LFP съхранение, 6000+ цикъла"
                  enabled={hasBattery}
                  onToggle={setHasBattery}
                >
                  <SliderInput
                    label="Капацитет"
                    value={batteryCapacity}
                    onChange={setBatteryCapacity}
                    min={5}
                    max={20}
                    step={1}
                    unit=" kWh"
                  />
                </ModuleToggle>

                <ModuleToggle
                  icon={Monitor}
                  label="Мониторинг"
                  description="Панел по панел, 24/7 достъп"
                  enabled={hasMonitoring}
                  onToggle={setHasMonitoring}
                  badge="Ново"
                />

                <ModuleToggle
                  icon={Zap}
                  label="EV Зарядна Станция"
                  description="Интелигентно зареждане"
                  enabled={hasEvCharger}
                  onToggle={setHasEvCharger}
                  badge="Ново"
                >
                  <div className="flex gap-2">
                    {EV_CHARGER_TYPES.map((ev) => (
                      <button
                        key={ev.value}
                        type="button"
                        onClick={() => setEvChargerType(ev.value)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          evChargerType === ev.value
                            ? "bg-accent text-white"
                            : "border border-border bg-background text-foreground-secondary hover:border-border-medium",
                        )}
                      >
                        {ev.label}
                      </button>
                    ))}
                  </div>
                </ModuleToggle>
              </div>
            </div>

            {/* Environment Inputs */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Параметри на Обекта
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                    Град
                  </p>
                  <Select.Root value={city} onValueChange={setCity}>
                    <Select.Trigger className={selectTriggerClass}>
                      <Select.Value />
                      <Select.Icon><ChevronDown className="size-4 text-foreground-tertiary" /></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="z-50 max-h-[min(280px,70vh)] overflow-hidden rounded-lg border border-border bg-background shadow-elevated" position="popper" sideOffset={4}>
                        <Select.Viewport className="p-1">
                          {CITIES.map((c) => (
                            <Select.Item key={c} value={c} className={selectItemClass}>
                              <Select.ItemText>{c}</Select.ItemText>
                              <Select.ItemIndicator><Check className="size-4" /></Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                <div>
                  <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                    Ориентация на покрива
                  </p>
                  <Select.Root value={orientation} onValueChange={setOrientation}>
                    <Select.Trigger className={selectTriggerClass}>
                      <Select.Value />
                      <Select.Icon><ChevronDown className="size-4 text-foreground-tertiary" /></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="z-50 overflow-hidden rounded-lg border border-border bg-background shadow-elevated" position="popper" sideOffset={4}>
                        <Select.Viewport className="p-1">
                          {ORIENTATION_OPTIONS.map((o) => (
                            <Select.Item key={o.value} value={o.value} className={selectItemClass}>
                              <Select.ItemText>{o.label}</Select.ItemText>
                              <Select.ItemIndicator><Check className="size-4" /></Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <SliderInput label="Наклон" value={pitch} onChange={setPitch} min={0} max={45} step={1} unit="°" />
                <SliderInput label="Сенки (загуба)" value={shading} onChange={setShading} min={0} max={50} step={1} unit="%" />
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="monthly-kwh" className="mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                    Месечна консумация (kWh)
                  </label>
                  <input
                    id="monthly-kwh"
                    type="number"
                    min={50}
                    step={10}
                    value={monthlyConsumption}
                    onChange={(e) => setMonthlyConsumption(Math.max(50, Number(e.target.value) || 0))}
                    className="h-10 w-full rounded-lg border border-border-medium bg-background px-3 font-body text-sm tabular-nums text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="rate" className="mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                    Цена ток (лв./kWh)
                  </label>
                  <input
                    id="rate"
                    type="number"
                    min={0.05}
                    max={2}
                    step={0.01}
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(Math.max(0.05, Number(e.target.value) || 0))}
                    className="h-10 w-full rounded-lg border border-border-medium bg-background px-3 font-body text-sm tabular-nums text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* System info */}
            <div className="rounded-xl border border-border bg-background-secondary/60 px-4 py-3 font-body text-sm text-foreground-secondary">
              <p>
                Ефективна инсолация:{" "}
                <span className="font-semibold tabular-nums text-foreground">
                  {formatNumber(Math.round(metrics.irr))}
                </span>{" "}
                kWh/kWp/год. | Панели:{" "}
                <span className="font-semibold text-foreground">
                  {metrics.recommendedPanels} x {panelWattage}W
                </span>{" "}
                | Мощност:{" "}
                <span className="font-semibold tabular-nums text-foreground">
                  {metrics.systemSizeKwp.toFixed(2)} kWp
                </span>
              </p>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Разбивка на Стойността
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Соларни панели", value: metrics.costBreakdown.panels },
                  ...(metrics.costBreakdown.inverter > 0 ? [{ label: "Надценка инвертор", value: metrics.costBreakdown.inverter }] : []),
                  ...(metrics.costBreakdown.battery > 0 ? [{ label: `Батерия (${batteryCapacity} kWh)`, value: metrics.costBreakdown.battery }] : []),
                  ...(metrics.costBreakdown.monitoring > 0 ? [{ label: "Мониторинг система", value: metrics.costBreakdown.monitoring }] : []),
                  ...(metrics.costBreakdown.ev > 0 ? [{ label: `EV зарядна (${evChargerType} kW)`, value: metrics.costBreakdown.ev }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-foreground-secondary">{item.label}</span>
                    <span className="font-display text-sm font-semibold tabular-nums text-foreground">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2 border-t-2 border-foreground/20">
                  <span className="text-sm font-semibold text-foreground">Обща стойност</span>
                  <span className="font-display text-lg font-bold tabular-nums text-accent">
                    {formatCurrency(metrics.systemCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <SummaryCard
            systemSizeKwp={metrics.systemSizeKwp}
            panelCount={metrics.recommendedPanels}
            hasBattery={hasBattery}
            batteryCapacityKwh={hasBattery ? batteryCapacity : 0}
            annualProductionKwh={metrics.annualProduction}
            annualSavings={metrics.annualSavings}
            paybackYears={metrics.paybackYears}
            savings25yr={metrics.totalSavings25yr}
            co2SavedKgPerYear={metrics.env.co2Saved}
            treeEquivalent={metrics.env.treeEquivalent}
            city={city}
          />
        </div>
      </SectionWrapper>

      {/* Chart */}
      <SectionWrapper background="gray" className="py-12 md:py-16">
        <RoiVisualization
          projection={metrics.projection}
          annualSavings={metrics.annualSavings}
          paybackYears={metrics.paybackYears}
          totalSavings25yr={metrics.totalSavings25yr}
          co2Saved={metrics.env.co2Saved}
          systemCost={metrics.systemCost}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
              CO2 (годишно)
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-foreground">
              {formatNumber(Math.round(metrics.env.co2Saved))} kg
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
              Еквивалент дървета
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-secondary">
              {metrics.env.treeEquivalent < 10
                ? metrics.env.treeEquivalent.toFixed(1)
                : formatNumber(Math.round(metrics.env.treeEquivalent))}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
              Домакинства (екв.)
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-foreground">
              {metrics.env.homesPowered.toFixed(2)}
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Cost Comparison */}
      <SectionWrapper background="white" className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
            Сравнение: 25 Години Разходи
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <GlowCard>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-3 rounded-full bg-red-500" />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Без Соларна Система
                  </h3>
                </div>
                <p className="font-display text-3xl font-bold tabular-nums text-red-500">
                  {formatCurrency(Math.round(metrics.traditionalCost25yr))}
                </p>
                <p className="mt-2 text-sm text-foreground-secondary">
                  Общ разход за ток за 25 години при 3% годишно поскъпване
                </p>
                <div className="mt-4 space-y-1.5 text-sm text-foreground-secondary">
                  <div className="flex justify-between">
                    <span>Месечно (сега)</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(Math.round(monthlyConsumption * electricityRate))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Месечно (год. 10)</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(Math.round(monthlyConsumption * electricityRate * Math.pow(1.03, 10)))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Месечно (год. 25)</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(Math.round(monthlyConsumption * electricityRate * Math.pow(1.03, 25)))}
                    </span>
                  </div>
                </div>
              </div>
            </GlowCard>

            <GlowCard>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-3 rounded-full bg-accent" />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Със Solaron Система
                  </h3>
                </div>
                <p className="font-display text-3xl font-bold tabular-nums text-accent">
                  {formatCurrency(Math.round(metrics.systemCost))}
                </p>
                <p className="mt-2 text-sm text-foreground-secondary">
                  Еднократна инвестиция + минимална поддръжка
                </p>
                <div className="mt-4 space-y-1.5 text-sm text-foreground-secondary">
                  <div className="flex justify-between">
                    <span>Спестявания (25 год.)</span>
                    <span className="font-medium text-accent">
                      {formatCurrency(Math.round(metrics.totalSavings25yr))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Нетна печалба</span>
                    <span className="font-medium text-accent">
                      {formatCurrency(Math.round(metrics.totalSavings25yr - metrics.systemCost))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <span className="font-medium text-accent">
                      {((metrics.totalSavings25yr / metrics.systemCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

          <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
            <p className="font-display text-xl font-bold text-foreground">
              Спестявате{" "}
              <span className="text-accent">
                {formatCurrency(Math.round(metrics.traditionalCost25yr - metrics.systemCost))}
              </span>{" "}
              за 25 години
            </p>
            <p className="mt-2 text-sm text-foreground-secondary">
              Плюс защита от бъдещи поскъпвания на електроенергията и приходи от нетно отчитане
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="white" className="py-12 md:py-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-background-secondary/80 p-8 text-center md:flex-row md:text-left">
          <p className="font-body text-base text-foreground-secondary">
            Искате оферта и оглед на място? Свържете се с екипа на Solaron.
          </p>
          <Link
            href="/kontakti"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-accent px-8 font-medium text-white shadow-soft transition-colors hover:bg-accent-hover"
          >
            Контакт
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
