"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Car, TreePine, Home, Leaf } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { cn } from "@/lib/utils";

const metrics: {
  icon: typeof Car;
  value: number;
  suffix?: string;
  label: string;
  context: string;
  comparison: string;
  color: string;
}[] = [
  {
    icon: Car,
    value: 847,
    suffix: " т",
    label: "CO₂ Спестени",
    context: "тона CO₂ годишно",
    comparison: "= 184 коли махнати от пътя",
    color: "text-emerald-600",
  },
  {
    icon: TreePine,
    value: 42350,
    label: "Дървета",
    context: "еквивалент засадени дървета",
    comparison: "= 1 гора от 42 хектара",
    color: "text-green-600",
  },
  {
    icon: Home,
    value: 580,
    label: "Домакинства",
    context: "домакинства захранени",
    comparison: "= малък български град",
    color: "text-teal-600",
  },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <motion.span
      className="tabular-nums"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {value.toLocaleString("bg-BG")}{suffix}
    </motion.span>
  );
}

export function EnvironmentalImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/5 via-background to-background px-6 py-24 md:px-8 md:py-32">
      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <BadgeChip variant="success" className="mb-4">
            <Leaf className="mr-1.5 size-3.5" />
            Екологично Въздействие
          </BadgeChip>
          <h2 className="text-editorial-heading">Нашият Принос за Планетата</h2>
          <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
            Реален принос, измерен от нашите инсталации в България.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <GlowCard>
                  <div className="p-8 text-center">
                    <div className={cn("mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-accent/10", m.color)}>
                      <Icon className="size-7" strokeWidth={1.5} />
                    </div>
                    <p className="text-4xl font-black text-foreground md:text-5xl">
                      <AnimatedNumber value={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground-secondary">{m.context}</p>
                    <p className="mt-3 text-xs text-foreground-tertiary">{m.comparison}</p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm text-foreground-tertiary underline underline-offset-4 transition-colors hover:text-foreground-secondary"
          >
            {expanded ? "Скрий" : "Как изчислихме?"}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-foreground-secondary">
                  Изчисленията се базират на реалните данни от нашите инсталации в
                  България. Средното CO₂ спестяване е калкулирано спрямо
                  емисионния фактор на българската електроенергийна мрежа (0.47
                  кг CO₂/kWh). Еквивалентът в дървета използва стандарта на EPA
                  — едно дърво абсорбира ~22 кг CO₂ годишно. Захранените
                  домакинства са изчислени на база средно потребление от 3,500
                  kWh/год за българско домакинство.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
