"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

export type SummaryCardProps = {
  systemSizeKwp: number;
  panelCount: number;
  hasBattery: boolean;
  batteryCapacityKwh: number;
  annualProductionKwh: number;
  annualSavings: number;
  paybackYears: number;
  savings25yr: number;
  co2SavedKgPerYear: number;
  treeEquivalent: number;
  city: string;
  className?: string;
};

export function SummaryCard({
  systemSizeKwp,
  panelCount,
  hasBattery,
  batteryCapacityKwh,
  annualProductionKwh,
  annualSavings,
  paybackYears,
  savings25yr,
  co2SavedKgPerYear,
  treeEquivalent,
  city,
  className,
}: SummaryCardProps) {
  const monthlySavings = annualSavings / 12;
  const query = new URLSearchParams({
    panelCount: String(panelCount),
    kWp: systemSizeKwp.toFixed(2),
    battery: hasBattery ? `${batteryCapacityKwh}kWh` : "no",
    city,
    monthlySavings: String(Math.round(monthlySavings)),
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-background shadow-elevated",
        className,
      )}
    >
      <div className="border-b border-border bg-background-card px-6 py-5">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
          Обобщение
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
          Вашата система
        </h3>
      </div>

      <div className="space-y-6 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-body text-xs text-foreground-secondary">
              Мощност
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-accent">
              {systemSizeKwp.toFixed(2)} kWp
            </p>
          </div>
          <div>
            <p className="font-body text-xs text-foreground-secondary">
              Панели
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">
              {formatNumber(panelCount)}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="font-body text-xs text-foreground-secondary">
              Батерия
            </p>
            <p className="mt-1 font-body text-base text-foreground">
              {hasBattery ? (
                <>
                  Да —{" "}
                  <span className="font-semibold text-foreground">
                    {batteryCapacityKwh} kWh
                  </span>
                </>
              ) : (
                "Не"
              )}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-body text-xs text-foreground-secondary">
              Годишно производство
            </p>
            <p className="mt-1 font-display text-xl font-semibold tabular-nums text-foreground">
              {formatNumber(Math.round(annualProductionKwh))}{" "}
              <span className="text-base font-medium text-foreground-secondary">
                kWh
              </span>
            </p>
          </div>
          <div>
            <p className="font-body text-xs text-foreground-secondary">
              Годишни спестявания
            </p>
            <p className="mt-1 font-display text-xl font-semibold tabular-nums text-accent">
              {formatCurrency(annualSavings)}
            </p>
          </div>
          <div>
            <p className="font-body text-xs text-foreground-secondary">
              Изплащане
            </p>
            <p className="mt-1 font-display text-xl font-semibold tabular-nums text-foreground">
              {Number.isFinite(paybackYears)
                ? `${paybackYears < 10 ? paybackYears.toFixed(1) : formatNumber(Math.round(paybackYears))} г.`
                : "—"}
            </p>
          </div>
          <div>
            <p className="font-body text-xs text-foreground-secondary">
              Спестявания (25 г.)
            </p>
            <p className="mt-1 font-display text-xl font-semibold tabular-nums text-success">
              {formatCurrency(savings25yr)}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
            Околна среда (годишно)
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-8">
            <p className="font-body text-sm text-foreground">
              <span className="font-display text-lg font-semibold tabular-nums text-foreground">
                {formatNumber(Math.round(co2SavedKgPerYear))} kg
              </span>{" "}
              CO₂ по-малко
            </p>
            <p className="font-body text-sm text-foreground">
              Еквивалент на{" "}
              <span className="font-display text-lg font-semibold tabular-nums text-secondary">
                {treeEquivalent < 10
                  ? treeEquivalent.toFixed(1)
                  : formatNumber(Math.round(treeEquivalent))}
              </span>{" "}
              дървета
            </p>
          </div>
        </div>

        <Button asChild variant="primary" size="lg" className="w-full">
          <Link href={`/kontakti?${query.toString()}`}>
            Заявка за Оферта
          </Link>
        </Button>
      </div>
    </div>
  );
}
