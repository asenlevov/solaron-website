"use client";

import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RoiVisualization } from "@/components/configurator/roi-visualization";
import { SummaryCard } from "@/components/configurator/summary-card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
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
import { cn, formatNumber } from "@/lib/utils";

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
  S: 1,
  N: 0.58,
  E: 0.88,
  W: 0.88,
};

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

export function RoiKalkulatorClient() {
  const [city, setCity] = useState(
    CITIES.includes("София") ? "София" : (CITIES[0] ?? "София"),
  );
  const [orientation, setOrientation] = useState<string>("S");
  const [pitch, setPitch] = useState(30);
  const [shading, setShading] = useState(0);
  const [monthlyConsumption, setMonthlyConsumption] = useState(400);
  const [electricityRate, setElectricityRate] = useState(0.25);

  const metrics = useMemo(() => {
    const irr = effectiveIrradiance(city, orientation, pitch, shading);
    const kwhPerPanel = (450 / 1000) * irr;
    const annualNeed = monthlyConsumption * 12;
    const recommendedPanels = Math.min(
      120,
      Math.max(4, Math.ceil((annualNeed * 0.95) / Math.max(kwhPerPanel, 1))),
    );

    const annualProduction = calculateAnnualProduction(
      recommendedPanels,
      450,
      irr,
    );
    const annualSavings = calculateAnnualSavings(annualProduction, electricityRate);
    const systemCost = calculateSystemCost(recommendedPanels, false, 0);
    const paybackYears = calculatePaybackPeriod(systemCost, annualSavings);
    const projection = calculate25YearProjection(systemCost, annualSavings);
    const totalSavings25yr =
      projection[projection.length - 1]?.cumulativeSavings ?? 0;
    const env = calculateEnvironmentalImpact(annualProduction);
    const systemSizeKwp = (recommendedPanels * 450) / 1000;

    return {
      irr,
      recommendedPanels,
      annualProduction,
      annualSavings,
      systemCost,
      paybackYears,
      projection,
      totalSavings25yr,
      env,
      systemSizeKwp,
    };
  }, [
    city,
    orientation,
    pitch,
    shading,
    monthlyConsumption,
    electricityRate,
  ]);

  return (
    <>
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6">
            Инструменти
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            ROI Калкулатор
          </h1>
          <p className="mt-4 font-body text-lg text-foreground-secondary">
            Ориентировъчна прогноза за производство, спестявания и 25-годишен
            хоризонт — по ваш град, покрив и консумация.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start">
          <div className="space-y-8">
            <SectionHeader
              align="left"
              label="ВХОДНИ ДАННИ"
              title="Параметри"
              subtitle="Препоръчаният брой панели се изчислява автоматично така, че да покрие около 95% от годишната консумация при зададените условия."
              className="mb-0"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                  Град
                </p>
                <Select.Root value={city} onValueChange={setCity}>
                  <Select.Trigger
                    className={cn(
                      "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border-medium bg-background px-3 font-body text-sm text-foreground",
                      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="size-4 text-foreground-tertiary" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className="z-50 max-h-[min(280px,70vh)] overflow-hidden rounded-lg border border-border bg-background shadow-elevated"
                      position="popper"
                      sideOffset={4}
                    >
                      <Select.Viewport className="p-1">
                        {CITIES.map((c) => (
                          <Select.Item
                            key={c}
                            value={c}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-body text-sm outline-none",
                              "data-[highlighted]:bg-background-secondary data-[state=checked]:text-accent",
                            )}
                          >
                            <Select.ItemText>{c}</Select.ItemText>
                            <Select.ItemIndicator>
                              <Check className="size-4" />
                            </Select.ItemIndicator>
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
                  <Select.Trigger
                    className={cn(
                      "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border-medium bg-background px-3 font-body text-sm text-foreground",
                      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="size-4 text-foreground-tertiary" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className="z-50 overflow-hidden rounded-lg border border-border bg-background shadow-elevated"
                      position="popper"
                      sideOffset={4}
                    >
                      <Select.Viewport className="p-1">
                        {ORIENTATION_OPTIONS.map((o) => (
                          <Select.Item
                            key={o.value}
                            value={o.value}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-body text-sm outline-none",
                              "data-[highlighted]:bg-background-secondary data-[state=checked]:text-accent",
                            )}
                          >
                            <Select.ItemText>{o.label}</Select.ItemText>
                            <Select.ItemIndicator>
                              <Check className="size-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                  Наклон (pitch)
                </p>
                <span className="font-display text-sm font-semibold tabular-nums text-foreground">
                  {pitch}°
                </span>
              </div>
              <Slider.Root
                className="relative flex w-full touch-none select-none items-center py-2"
                value={[pitch]}
                onValueChange={(v) => setPitch(v[0] ?? 0)}
                min={0}
                max={45}
                step={1}
                aria-label="Наклон на покрива"
              >
                <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
                  <Slider.Range className="absolute h-full rounded-full bg-accent" />
                </Slider.Track>
                <Slider.Thumb
                  className={cn(
                    "block size-6 cursor-grab rounded-full border-2 border-background bg-accent shadow-elevated",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "active:cursor-grabbing",
                  )}
                />
              </Slider.Root>
              <p className="mt-1 font-body text-xs text-foreground-tertiary">
                0°–45°
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                  Сенки (загуба)
                </p>
                <span className="font-display text-sm font-semibold tabular-nums text-foreground">
                  {shading}%
                </span>
              </div>
              <Slider.Root
                className="relative flex w-full touch-none select-none items-center py-2"
                value={[shading]}
                onValueChange={(v) => setShading(v[0] ?? 0)}
                min={0}
                max={50}
                step={1}
                aria-label="Процент сенки"
              >
                <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
                  <Slider.Range className="absolute h-full rounded-full bg-secondary" />
                </Slider.Track>
                <Slider.Thumb
                  className={cn(
                    "block size-6 cursor-grab rounded-full border-2 border-background bg-secondary shadow-elevated",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "active:cursor-grabbing",
                  )}
                />
              </Slider.Root>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="monthly-kwh"
                  className="mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary"
                >
                  Месечна консумация (kWh)
                </label>
                <input
                  id="monthly-kwh"
                  type="number"
                  min={50}
                  step={10}
                  value={monthlyConsumption}
                  onChange={(e) =>
                    setMonthlyConsumption(
                      Math.max(50, Number(e.target.value) || 0),
                    )
                  }
                  className={cn(
                    "h-10 w-full rounded-lg border border-border-medium bg-background px-3 font-body text-sm tabular-nums text-foreground",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="rate"
                  className="mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary"
                >
                  Цена ток (лв./kWh)
                </label>
                <input
                  id="rate"
                  type="number"
                  min={0.05}
                  max={2}
                  step={0.01}
                  value={electricityRate}
                  onChange={(e) =>
                    setElectricityRate(
                      Math.max(0.05, Number(e.target.value) || 0),
                    )
                  }
                  className={cn(
                    "h-10 w-full rounded-lg border border-border-medium bg-background px-3 font-body text-sm tabular-nums text-foreground",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background-secondary/60 px-4 py-3 font-body text-sm text-foreground-secondary">
              <p>
                Ефективна инсолация (модел):{" "}
                <span className="font-semibold tabular-nums text-foreground">
                  {formatNumber(Math.round(metrics.irr))}
                </span>{" "}
                kWh/kWp/год. · Препоръчани панели:{" "}
                <span className="font-semibold text-foreground">
                  {metrics.recommendedPanels}
                </span>{" "}
                · Мощност:{" "}
                <span className="font-semibold tabular-nums text-foreground">
                  {metrics.systemSizeKwp.toFixed(2)} kWp
                </span>
              </p>
            </div>
          </div>

          <SummaryCard
            systemSizeKwp={metrics.systemSizeKwp}
            panelCount={metrics.recommendedPanels}
            hasBattery={false}
            batteryCapacityKwh={0}
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
              CO₂ (годишно)
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
