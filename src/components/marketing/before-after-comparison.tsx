"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  XCircle,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OLD_COSTS = [
  { name: "Електричество", cost: "280 лв./мес.", rotate: -3, x: 0, y: 0 },
  { name: "Отопление", cost: "150 лв./мес.", rotate: 2, x: 15, y: -8 },
  { name: "Климатизация", cost: "120 лв./мес.", rotate: -1.5, x: -10, y: 5 },
  { name: "Бойлер", cost: "80 лв./мес.", rotate: 3, x: 20, y: -3 },
  { name: "Покачване", cost: "+10%/год.", rotate: -2, x: 5, y: 8 },
  { name: "Зависимост", cost: "100% мрежа", rotate: 1, x: -15, y: -5 },
];

const SOLARON_BENEFITS = [
  { name: "Панели", color: "#3B7A2A" },
  { name: "Инвертор", color: "#059669" },
  { name: "Батерия", color: "#0ea5e9" },
  { name: "Мониторинг", color: "#f59e0b" },
  { name: "Net Metering", color: "#8B5CF6" },
  { name: "Гаранция", color: "#14b8a6" },
];

const BEFORE_WARNINGS = ["Растящи цени", "CO2 емисии", "Мрежова зависимост"];
const AFTER_BADGES = ["80% спестявания", "Чиста енергия", "Енергийна независимост"];

export function BeforeAfterComparison({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <div ref={containerRef} className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="grid gap-4 md:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-9 items-center justify-center rounded-full bg-red-500/10">
              <XCircle className="size-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Традиционна Енергия
              </h3>
              <p className="text-xs text-foreground-secondary">Скъпо и неефективно</p>
            </div>
          </div>

          <div className="relative h-[200px] md:h-[240px] mb-4">
            <div className="absolute inset-0 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center">
              {OLD_COSTS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
                  className="absolute rounded-lg border border-red-500/15 bg-background/80 backdrop-blur-sm px-3 py-2 shadow-sm"
                  style={{
                    transform: `rotate(${item.rotate}deg) translate(${item.x}px, ${item.y}px)`,
                    left: `${8 + (i % 3) * 30}%`,
                    top: `${15 + Math.floor(i / 3) * 45}%`,
                  }}
                >
                  <div className="text-xs font-medium text-foreground/80 whitespace-nowrap">{item.name}</div>
                  <div className="text-[10px] text-red-500">{item.cost}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mb-3">
            <span className="text-2xl font-bold text-red-500">630+ лв.</span>
            <span className="text-sm text-foreground-secondary">/месец</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {BEFORE_WARNINGS.map((w) => (
              <span key={w} className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-red-500">
                <AlertTriangle className="size-2.5" />
                {w}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-accent/30 bg-accent/[0.03] p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-9 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="size-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Solaron Решение
              </h3>
              <p className="text-xs text-foreground-secondary">Пълна соларна система</p>
            </div>
          </div>

          <div className="relative h-[200px] md:h-[240px] mb-4 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-xl border border-accent/20 bg-background/80 backdrop-blur-sm p-5 w-full max-w-[280px] shadow-lg shadow-accent/5"
            >
              <div className="text-center mb-4">
                <div className="font-display text-sm font-semibold text-accent">Solaron System</div>
                <div className="text-[10px] text-foreground-secondary mt-0.5">Всичко в една система</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SOLARON_BENEFITS.map((cap, i) => (
                  <motion.div
                    key={cap.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="size-7 rounded-md flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: cap.color }}
                    >
                      {cap.name.slice(0, 2)}
                    </div>
                    <span className="text-[8px] text-foreground-secondary leading-none text-center">{cap.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-3">
            <span className="text-xs text-foreground-secondary">от </span>
            <span className="text-2xl font-bold text-accent">126 лв.</span>
            <span className="text-sm text-foreground-secondary">/месец</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {AFTER_BADGES.map((b) => (
              <span key={b} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
                <CheckCircle2 className="size-2.5" />
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/[0.05] to-transparent p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-accent/10 shrink-0">
            <Calculator className="size-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Домакинствата спестяват средно <span className="text-accent">6,000 лв./година</span> и
              намаляват CO2 с <span className="text-accent">4.2 тона/година</span>
            </p>
            <p className="text-xs text-foreground-secondary mt-0.5">
              Като заменят конвенционалната енергия с фотоволтаична система.
            </p>
          </div>
        </div>
        <Link
          href="/konfigurator"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Изчисли Спестяванията
          <ArrowRight className="size-3.5" />
        </Link>
      </motion.div>
    </div>
  );
}
