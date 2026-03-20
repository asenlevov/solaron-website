"use client";

import * as Switch from "@radix-ui/react-switch";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn, formatCurrency } from "@/lib/utils";

const GROWTH = 0.03;
const HORIZONS = [10, 15, 25] as const;

function cumulativeUtilitySpend(
  monthlyBill: number,
  years: number,
  residualFraction: number,
): number {
  let total = 0;
  const baseAnnual = monthlyBill * 12 * residualFraction;
  for (let y = 0; y < years; y++) {
    total += baseAnnual * (1 + GROWTH) ** y;
  }
  return total;
}

export function SpestqvaniaClient() {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [withBattery, setWithBattery] = useState(false);

  const savingsRate = withBattery ? 0.85 : 0.7;
  const residual = 1 - savingsRate;

  const rows = useMemo(() => {
    return HORIZONS.map((years) => {
      const without = cumulativeUtilitySpend(monthlyBill, years, 1);
      const withSolar = cumulativeUtilitySpend(monthlyBill, years, residual);
      const saved = without - withSolar;
      return { years, without, withSolar, saved };
    });
  }, [monthlyBill, residual]);

  const savings25 = rows.find((r) => r.years === 25)?.saved ?? 0;

  return (
    <>
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6">
            Инструменти
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Калкулатор за Спестявания
          </h1>
          <p className="mt-4 font-body text-lg text-foreground-secondary">
            Бърза оценка на кумулативните разходи за ток с и без солар — с умерен ръст на цените
            3% годишно.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-12 md:py-16">
        <SectionHeader
          align="center"
          label="ВХОД"
          title="Месечна сметка"
          subtitle="Въведете средната си сметка за ток. Превключете батерията, за да видите по-агресивно самопотребление (ориентировъчно +15 п.п. спестявания спрямо PV само)."
          className="mb-12"
        />

        <div className="mx-auto flex max-w-xl flex-col gap-10">
          <div>
            <label
              htmlFor="bill"
              className="mb-2 block text-center font-body text-sm font-medium text-foreground-secondary"
            >
              Месечна сметка (лв.)
            </label>
            <input
              id="bill"
              type="number"
              min={20}
              step={5}
              value={monthlyBill}
              onChange={(e) =>
                setMonthlyBill(Math.max(20, Number(e.target.value) || 0))
              }
              className={cn(
                "mx-auto block h-14 w-full max-w-sm rounded-xl border border-border-medium bg-background px-4 text-center font-display text-3xl font-semibold tabular-nums text-foreground",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            />
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <span className="font-body text-sm font-medium text-foreground-secondary">
              С батерия (по-високо самопотребление)
            </span>
            <Switch.Root
              checked={withBattery}
              onCheckedChange={setWithBattery}
              className={cn(
                "relative h-7 w-12 shrink-0 cursor-pointer rounded-full border border-border bg-background-secondary outline-none",
                "data-[state=checked]:border-accent data-[state=checked]:bg-accent-light",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <Switch.Thumb
                className={cn(
                  "pointer-events-none block size-6 translate-x-0.5 rounded-full bg-foreground shadow transition-transform will-change-transform",
                  "data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-accent",
                )}
              />
            </Switch.Root>
          </div>

          <div className="rounded-2xl border border-border bg-background-secondary/60 p-6 text-center">
            <p className="font-body text-sm text-foreground-secondary">
              Натрупани спестявания за 25 г. (само сметка за ток)
            </p>
            <p className="mt-3 font-display text-4xl font-semibold tabular-nums text-accent md:text-5xl">
              <AnimatedCounter
                key={`${savings25}-${withBattery}`}
                value={Math.round(savings25)}
                duration={1200}
                suffix=" лв."
              />
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray" className="py-12 md:py-16">
        <SectionHeader
          align="center"
          label="СРАВНЕНИЕ"
          title="Разходи за ток във времето"
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {rows.map((row) => (
            <div
              key={row.years}
              className="rounded-2xl border border-border bg-background p-6 shadow-card"
            >
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground-tertiary">
                {row.years} години
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-body text-xs text-foreground-secondary">
                    Без соларни панели
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold tabular-nums text-foreground">
                    {formatCurrency(row.without)}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs text-foreground-secondary">
                    Със соларни панели
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold tabular-nums text-accent">
                    {formatCurrency(row.withSolar)}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-body text-xs text-foreground-secondary">
                    Спестявания (кумулативно)
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold tabular-nums text-success">
                    {formatCurrency(row.saved)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center font-body text-xs text-foreground-tertiary">
          Ориентировъчна симулация — не включва инвестиция в инсталация, такси и индивидуален
          профил на консумация.
        </p>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-12 md:py-16">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <p className="font-body text-base text-foreground-secondary">
            За пълна конфигурация с мощност, панели и 3D преглед:
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/konfigurator">Към конфигуратора</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
