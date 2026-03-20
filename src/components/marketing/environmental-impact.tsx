"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Car, TreePine, Home } from "lucide-react";
import { StatNumber } from "@/components/ui/stat-number";
import { scaleSpring, createStagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const metrics: {
  icon: typeof Car;
  value: number;
  suffix?: string;
  context: string;
  comparison: string;
}[] = [
  {
    icon: Car,
    value: 847,
    suffix: " тона",
    context: "CO₂ спестени годишно",
    comparison: "= 184 коли от пътя",
  },
  {
    icon: TreePine,
    value: 42350,
    context: "дървета еквивалент",
    comparison: "= 1 гора от 42 хектара",
  },
  {
    icon: Home,
    value: 580,
    context: "домакинства захранени",
    comparison: "= малък български град",
  },
];

const stagger = createStagger(0.15, 0.1);

export function EnvironmentalImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-8 md:py-32 lg:py-40" style={{ backgroundColor: "#0a0f0a" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(59,122,42,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(40,100,30,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(59,122,42,0.05) 0%, transparent 50%)
          `,
          animation: "pulse-subtle 8s ease-in-out infinite",
        }}
      />

      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[200px] font-black leading-none text-white opacity-[0.02] md:text-[300px]"
        aria-hidden
      >
        CO₂
      </span>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <p className="text-editorial-overline mb-10 text-accent md:mb-14">Екология</p>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.context}
                variants={scaleSpring}
                className="flex flex-col items-center text-center md:items-start md:text-left"
              >
                <Icon className="mb-4 size-8 text-accent/60" strokeWidth={1.5} aria-hidden />
                <StatNumber
                  value={m.value}
                  suffix={m.suffix}
                  context={m.context}
                  className="text-accent"
                  contextClassName="text-white/60"
                />
                <p className="mt-3 text-sm text-white/40">{m.comparison}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-20 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={cn(
              "font-body text-sm text-white/40 underline underline-offset-4 transition-colors hover:text-white/60",
            )}
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
                <p className="mx-auto mt-6 max-w-2xl text-center font-body text-sm leading-relaxed text-white/50">
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
