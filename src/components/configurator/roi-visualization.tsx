"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { YearProjection } from "@/lib/solar-calculations";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

export type RoiVisualizationProps = {
  projection: YearProjection[];
  annualSavings: number;
  paybackYears: number;
  totalSavings25yr: number;
  co2Saved: number;
  systemCost: number;
  className?: string;
};

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background-secondary/40 px-4 py-3">
      <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-foreground-tertiary">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-semibold tabular-nums tracking-tight text-foreground md:text-2xl">
        {value}
      </p>
      {sub ? (
        <p className="mt-0.5 font-body text-xs text-foreground-secondary">{sub}</p>
      ) : null}
    </div>
  );
}

export function RoiVisualization({
  projection,
  annualSavings,
  paybackYears,
  totalSavings25yr,
  co2Saved,
  systemCost,
  className,
}: RoiVisualizationProps) {
  const chartData = projection.map((p) => ({
    year: p.year,
    cumulativeSavings: p.cumulativeSavings,
    systemCost,
  }));

  const paybackX =
    Number.isFinite(paybackYears) && paybackYears > 0
      ? Math.min(25, Math.max(1, Math.ceil(paybackYears)))
      : null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-background p-5 shadow-card",
        className,
      )}
    >
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Възвръщаемост
        </h3>
        <p className="mt-1 font-body text-sm text-foreground-secondary">
          Натрупани спестявания спрямо инвестицията за 25 години.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Годишни спестявания"
          value={formatCurrency(annualSavings)}
        />
        <MetricCard
          label="Изплащане"
          value={
            Number.isFinite(paybackYears)
              ? `${paybackYears < 10 ? paybackYears.toFixed(1) : formatNumber(Math.round(paybackYears))} г.`
              : "—"
          }
        />
        <MetricCard
          label="Общо 25 г."
          value={formatCurrency(totalSavings25yr)}
          sub="Натрупани спестявания"
        />
        <MetricCard
          label="CO₂ спестени / год."
          value={`${formatNumber(Math.round(co2Saved))} kg`}
        />
      </div>

      <div className="h-[280px] w-full min-w-0 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 6"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--foreground-tertiary)", fontSize: 11 }}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--foreground-tertiary)", fontSize: 11 }}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              width={44}
            />
            <Tooltip
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--border-medium)",
                borderRadius: 12,
                fontSize: 13,
              }}
              labelFormatter={(y) => `Година ${y}`}
              formatter={(value, name) => {
                const n = Number(value ?? 0);
                const key = String(name);
                if (key === "cumulativeSavings")
                  return [formatCurrency(n), "Натрупани спестявания"];
                if (key === "systemCost")
                  return [formatCurrency(n), "Инвестиция"];
                return [formatCurrency(n), key];
              }}
            />
            <ReferenceLine
              y={systemCost}
              stroke="var(--border-medium)"
              strokeWidth={2}
              strokeDasharray="6 4"
              label={{
                value: "Инвестиция",
                position: "insideTopRight",
                fill: "var(--foreground-secondary)",
                fontSize: 11,
              }}
            />
            {paybackX ? (
              <ReferenceLine
                x={paybackX}
                stroke="var(--secondary)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                label={{
                  value: "Изплащане",
                  position: "top",
                  fill: "var(--secondary)",
                  fontSize: 11,
                }}
              />
            ) : null}
            <Area
              type="monotone"
              dataKey="cumulativeSavings"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#savingsFill)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--accent)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
