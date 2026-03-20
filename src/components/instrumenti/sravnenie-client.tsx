"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

type Cell = string | { value: string; best?: boolean };

function SpecTable({
  rows,
  columns,
}: {
  rows: { label: string; cells: Cell[] }[];
  columns: string[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left font-body text-sm">
        <thead>
          <tr className="border-b border-border bg-background-secondary">
            <th className="px-4 py-3 font-semibold text-foreground">Параметър</th>
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 font-semibold text-foreground">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="px-4 py-3 text-foreground-secondary">{row.label}</td>
              {row.cells.map((cell, i) => {
                const val = typeof cell === "string" ? cell : cell.value;
                const best = typeof cell === "object" && cell.best;
                return (
                  <td key={i} className="px-4 py-3">
                    {best ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="font-medium text-foreground">{val}</span>
                        <Badge variant="accent">Най-добро</Badge>
                      </span>
                    ) : (
                      <span className="text-foreground">{val}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PANEL_ROWS = [
  {
    label: "Технология",
    cells: [
      { value: "MWT (между-метал)", best: true },
      "Монокристал стандарт",
      "Поликристал",
    ],
  },
  {
    label: "Номинална мощност (тип.)",
    cells: ["450 W", { value: "450 W", best: true }, "330 W"],
  },
  {
    label: "Ефективност (тип.)",
    cells: [{ value: "~22%", best: true }, "~21%", "~17%"],
  },
  {
    label: "Температурен коефициент",
    cells: [{ value: "По-нисък разсейване", best: true }, "Среден", "По-висок"],
  },
  {
    label: "Подходящо за ограничен покрив",
    cells: [{ value: "Да (висока плътност)", best: true }, "Да", "Средно"],
  },
];

const INVERTER_ROWS = [
  {
    label: "Архитектура",
    cells: ["Оптимизатори + централен инвертор", { value: "Низов инвертор", best: true }],
  },
  {
    label: "MPPT на панел",
    cells: [{ value: "Да (по модул)", best: true }, "По низове"],
  },
  {
    label: "Сенки / различни ориентации",
    cells: [{ value: "По-толерантно", best: true }, "По-чувствително"],
  },
  {
    label: "Сложност / цена",
    cells: ["По-висока", { value: "По-ниска", best: true }],
  },
  {
    label: "Мониторинг",
    cells: [{ value: "Детайлен по модул", best: true }, "Обобщен"],
  },
];

const BATTERY_ROWS = [
  {
    label: "Химия",
    cells: [{ value: "LiFePO₄", best: true }, "Оловно-киселинни"],
  },
  {
    label: "Цикли (тип.)",
    cells: [{ value: "6000+", best: true }, "800–1200"],
  },
  {
    label: "Дълбоко разреждане",
    cells: [{ value: "Безопасно", best: true }, "Ограничава се"],
  },
  {
    label: "Енергийна плътност",
    cells: [{ value: "По-висока", best: true }, "По-ниска"],
  },
  {
    label: "Поддръжка",
    cells: [{ value: "Минимална", best: true }, "Проверка на електролит"],
  },
];

export function SravnenieClient() {
  return (
    <>
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6">
            Инструменти
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Сравнение на Продукти
          </h1>
          <p className="mt-4 font-body text-lg text-foreground-secondary">
            Ориентировъчни разлики между типови класове оборудване — финалният избор зависи от
            проекта и оглед на място.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-12 md:py-16">
        <SectionHeader
          align="center"
          label="ТАБЛИЦИ"
          title="Сравнете категориите"
          className="mb-10"
        />

        <Tabs.Root defaultValue="panels" className="w-full">
          <Tabs.List
            className={cn(
              "mb-10 flex flex-wrap justify-center gap-2 rounded-xl border border-border bg-background-secondary/80 p-1",
            )}
          >
            {[
              { id: "panels", label: "Панели" },
              { id: "inverters", label: "Инвертори" },
              { id: "batteries", label: "Батерии" },
            ].map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                className={cn(
                  "rounded-lg px-5 py-2.5 font-body text-sm font-medium text-foreground-secondary transition-colors",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-card",
                )}
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="panels">
            <SpecTable
              columns={["MWT 450W", "Стандарт моно", "Стандарт поли"]}
              rows={PANEL_ROWS}
            />
          </Tabs.Content>
          <Tabs.Content value="inverters">
            <SpecTable
              columns={["SolarEdge (оптимизатори)", "Низов инвертор"]}
              rows={INVERTER_ROWS}
            />
          </Tabs.Content>
          <Tabs.Content value="batteries">
            <SpecTable
              columns={["LiFePO₄", "Оловно-киселинни"]}
              rows={BATTERY_ROWS}
            />
          </Tabs.Content>
        </Tabs.Root>
      </SectionWrapper>

      <SectionWrapper background="gray" className="py-12 md:py-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-background p-8 text-center md:flex-row md:text-left">
          <p className="font-body text-base text-foreground-secondary">
            Нуждаете се от оферта с конкретни модели и гаранции? Пишете ни.
          </p>
          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link href="/kontakti">Контакт</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
