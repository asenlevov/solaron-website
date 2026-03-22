"use client";

import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { Building2, Check, ChevronDown, Factory, Home, Landmark } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { HouseType } from "@/components/3d/house-model";
import { CITY_IRRADIANCE } from "@/lib/electricity-prices";
import { cn } from "@/lib/utils";

const ROOF_MIN = 20;
const ROOF_MAX = 200;
const ROOF_DEFAULT = 80;

const BATTERY_OPTIONS = [5, 10, 15, 20] as const;
export type BatteryCapacity = (typeof BATTERY_OPTIONS)[number];

export type SolarConfiguratorConfig = {
  houseType: HouseType;
  roofArea: number;
  panelCount: number;
  hasBattery: boolean;
  batteryCapacity: BatteryCapacity;
  monthlyBill: number;
  city: string;
  roofOrientation: string;
  roofPitch: number;
  shadingLevel: string;
};

const ORIENTATION_OPTIONS = [
  { label: "Юг", value: "Юг" },
  { label: "Югоизток", value: "Югоизток" },
  { label: "Югозапад", value: "Югозапад" },
  { label: "Изток", value: "Изток" },
  { label: "Запад", value: "Запад" },
] as const;

const SHADING_OPTIONS = [
  { label: "Без", value: "Без", desc: "0%" },
  { label: "Леко", value: "Леко", desc: "10%" },
  { label: "Средно", value: "Средно", desc: "25%" },
  { label: "Силно", value: "Силно", desc: "40%" },
] as const;

const HOUSE_OPTIONS: { type: HouseType; label: string; icon: typeof Building2 }[] =
  [
    { type: "single-story", label: "Едноетажна Къща", icon: Home },
    { type: "two-story", label: "Двуетажна Къща", icon: Building2 },
    { type: "villa", label: "Бизнес Сграда", icon: Landmark },
    { type: "commercial", label: "Индустриална Сграда", icon: Factory },
  ];

const CITIES = Object.keys(CITY_IRRADIANCE).sort((a, b) =>
  a.localeCompare(b, "bg"),
);

function panelsFromRoof(roofArea: number): number {
  return Math.max(1, Math.round(roofArea / 3));
}

export type ControlPanelProps = {
  onChange: (config: SolarConfiguratorConfig) => void;
  className?: string;
};

export function ControlPanel({ onChange, className }: ControlPanelProps) {
  const [houseType, setHouseType] = useState<HouseType>("single-story");
  const [roofArea, setRoofArea] = useState(ROOF_DEFAULT);
  const [panelCount, setPanelCount] = useState(() => panelsFromRoof(ROOF_DEFAULT));
  const [hasBattery, setHasBattery] = useState(false);
  const [batteryCapacity, setBatteryCapacity] = useState<BatteryCapacity>(10);
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [city, setCity] = useState(
    CITIES.includes("София") ? "София" : (CITIES[0] ?? "София"),
  );
  const [roofOrientation, setRoofOrientation] = useState("Юг");
  const [roofPitch, setRoofPitch] = useState(30);
  const [shadingLevel, setShadingLevel] = useState("Без");

  useEffect(() => {
    setPanelCount(panelsFromRoof(roofArea));
  }, [roofArea]);

  const config = useMemo<SolarConfiguratorConfig>(
    () => ({
      houseType,
      roofArea,
      panelCount,
      hasBattery,
      batteryCapacity,
      monthlyBill,
      city,
      roofOrientation,
      roofPitch,
      shadingLevel,
    }),
    [
      batteryCapacity,
      city,
      hasBattery,
      houseType,
      monthlyBill,
      panelCount,
      roofArea,
      roofOrientation,
      roofPitch,
      shadingLevel,
    ],
  );

  useEffect(() => {
    onChange(config);
  }, [config, onChange]);

  const panelMax = Math.max(4, Math.ceil(roofArea / 1.5));

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-background shadow-card",
        className,
      )}
    >
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Конфигурация
        </h2>
        <p className="mt-1 font-body text-sm text-foreground-secondary">
          Настройте системата и вижте резултатите в реално време.
        </p>
      </div>

      <div className="divide-y divide-border">
        <section className="px-5 py-5">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
            Тип сграда
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {HOUSE_OPTIONS.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => setHouseType(type)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition-colors",
                  houseType === type
                    ? "border-accent bg-accent-light/60 text-foreground"
                    : "border-border bg-background-secondary/50 text-foreground-secondary hover:border-border-medium",
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="font-body text-[11px] font-medium leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="px-5 py-5">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
              Покривна площ
            </p>
            <span className="font-display text-sm font-semibold tabular-nums text-foreground">
              {roofArea} м²
            </span>
          </div>
          <Slider.Root
            className="relative flex w-full touch-none select-none items-center py-2"
            value={[roofArea]}
            onValueChange={(v) => setRoofArea(v[0] ?? ROOF_DEFAULT)}
            min={ROOF_MIN}
            max={ROOF_MAX}
            step={1}
            aria-label="Покривна площ"
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
          <p className="mt-2 font-body text-xs text-foreground-tertiary">
            {ROOF_MIN}–{ROOF_MAX} м²
          </p>
        </section>

        <section className="px-5 py-5">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
              Брой панели
            </p>
            <span className="font-display text-sm font-semibold tabular-nums text-foreground">
              {panelCount}
            </span>
          </div>
          <Slider.Root
            className="relative flex w-full touch-none select-none items-center py-2"
            value={[panelCount]}
            onValueChange={(v) =>
              setPanelCount(Math.min(panelMax, Math.max(1, v[0] ?? 1)))
            }
            min={1}
            max={panelMax}
            step={1}
            aria-label="Брой панели"
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
          <p className="mt-2 font-body text-xs text-foreground-tertiary">
            Ориентир: ~1 панел на 3 м² покрив. Макс. за избрания покрив:{" "}
            {panelMax}.
          </p>
        </section>

        <section className="px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                Батерия
              </p>
              <p className="mt-0.5 font-body text-sm text-foreground-secondary">
                Съхранение на енергия
              </p>
            </div>
            <Switch.Root
              checked={hasBattery}
              onCheckedChange={setHasBattery}
              className={cn(
                "relative h-7 w-12 shrink-0 cursor-pointer rounded-full border border-border-medium bg-background-secondary outline-none",
                "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <Switch.Thumb
                className={cn(
                  "block size-6 translate-x-0.5 rounded-full bg-background shadow-soft transition-transform will-change-transform",
                  "data-[state=checked]:translate-x-[1.375rem] data-[state=checked]:bg-white",
                )}
              />
            </Switch.Root>
          </div>

          {hasBattery ? (
            <div className="mt-4">
              <p className="mb-2 font-body text-xs font-medium text-foreground-secondary">
                Капацитет (kWh)
              </p>
              <Select.Root
                value={String(batteryCapacity)}
                onValueChange={(v) =>
                  setBatteryCapacity(Number(v) as BatteryCapacity)
                }
              >
                <Select.Trigger
                  className={cn(
                    "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border-medium bg-background px-3 font-body text-sm text-foreground",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                  aria-label="Капацитет на батерията"
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
                      {BATTERY_OPTIONS.map((opt) => (
                        <Select.Item
                          key={opt}
                          value={String(opt)}
                          className={cn(
                            "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-body text-sm outline-none",
                            "data-[highlighted]:bg-background-secondary data-[state=checked]:text-accent",
                          )}
                        >
                          <Select.ItemText>{opt} kWh</Select.ItemText>
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
          ) : null}
        </section>

        <section className="px-5 py-5">
          <label
            htmlFor="monthly-bill"
            className="mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary"
          >
            Месечна сметка (лв.)
          </label>
          <input
            id="monthly-bill"
            type="number"
            min={0}
            step={5}
            value={monthlyBill}
            onChange={(e) =>
              setMonthlyBill(Math.max(0, Number(e.target.value) || 0))
            }
            className={cn(
              "h-10 w-full rounded-lg border border-border-medium bg-background px-3 font-body text-sm tabular-nums text-foreground",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          />
        </section>

        <section className="px-5 py-5">
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
            Град
          </p>
          <Select.Root value={city} onValueChange={setCity}>
            <Select.Trigger
              className={cn(
                "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border-medium bg-background px-3 font-body text-sm text-foreground",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Град за слънчева инсолация"
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
        </section>

        <section className="px-5 py-5">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
            Ориентация на покрива
          </p>
          <div className="flex flex-wrap gap-2">
            {ORIENTATION_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setRoofOrientation(value)}
                className={cn(
                  "rounded-xl border px-3 py-2 font-body text-[11px] font-medium transition-colors",
                  roofOrientation === value
                    ? "border-accent bg-accent-light/60 text-foreground"
                    : "border-border bg-background-secondary/50 text-foreground-secondary hover:border-border-medium",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="px-5 py-5">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
              Наклон на покрива
            </p>
            <span className="font-display text-sm font-semibold tabular-nums text-foreground">
              {roofPitch}°
            </span>
          </div>
          <Slider.Root
            className="relative flex w-full touch-none select-none items-center py-2"
            value={[roofPitch]}
            onValueChange={(v) => setRoofPitch(v[0] ?? 30)}
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
          <p className="mt-2 font-body text-xs text-foreground-tertiary">
            0–45°&ensp;·&ensp;
            <span
              className={cn(
                "font-medium",
                roofPitch >= 30 && roofPitch <= 35
                  ? "text-accent"
                  : "text-foreground-tertiary",
              )}
            >
              Оптимално: 30–35°
            </span>
          </p>
        </section>

        <section className="px-5 py-5">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
            Засенчване
          </p>
          <div className="grid grid-cols-4 gap-2">
            {SHADING_OPTIONS.map(({ label, value, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setShadingLevel(value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition-colors",
                  shadingLevel === value
                    ? "border-accent bg-accent-light/60 text-foreground"
                    : "border-border bg-background-secondary/50 text-foreground-secondary hover:border-border-medium",
                )}
              >
                <span className="font-body text-[11px] font-medium leading-tight">
                  {label}
                </span>
                <span className="font-body text-[10px] text-foreground-tertiary">
                  {desc}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
