"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

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
  roofOrientation?: string;
  roofArea?: number;
  roofPitch?: number;
  systemCost?: number;
  monthlyBill?: number;
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
  roofOrientation,
  roofArea,
  roofPitch,
  systemCost,
  monthlyBill,
  className,
}: SummaryCardProps) {
  const locale = useLocale();
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

        <button
          type="button"
          onClick={async () => {
            const { generateSolarOffer } = await import(
              "@/lib/generate-pdf-offer"
            );
            await generateSolarOffer(
              {
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
                roofOrientation: roofOrientation ?? "Юг",
                roofArea: roofArea ?? 80,
                roofPitch: roofPitch ?? 30,
                systemCost: systemCost ?? panelCount * 1200,
                monthlyBill: monthlyBill ?? 150,
              },
              locale,
            );
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent-light/20 px-4 py-3 font-body text-sm font-semibold text-accent transition-colors hover:bg-accent-light/40 active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Изтегли Оферта (PDF)
        </button>
      </div>
    </div>
  );
}
