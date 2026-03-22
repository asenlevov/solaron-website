"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Car, TreePine, Home, Leaf } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { cn } from "@/lib/utils";

const METRIC_ICONS = [Car, TreePine, Home] as const;
const METRIC_VALUES = [847, 42350, 580] as const;
const METRIC_SUFFIX_KEYS = ["co2Suffix", null, null] as const;
const METRIC_COLORS = ["text-emerald-600", "text-green-600", "text-teal-600"] as const;

function AnimatedNumber({ value, suffix = "", numLocale = "bg-BG" }: { value: number; suffix?: string; numLocale?: string }) {
  return (
    <motion.span
      className="tabular-nums"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {value.toLocaleString(numLocale)}{suffix}
    </motion.span>
  );
}

export function EnvironmentalImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("Home");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const numLocale = locale === "bg" ? "bg-BG" : locale === "nl" ? "nl-NL" : "en-US";

  const suffixes = METRIC_SUFFIX_KEYS.map((key) =>
    key ? t(`environmentalImpact.${key}`) : undefined,
  );

  const metrics = [
    {
      icon: METRIC_ICONS[0],
      value: METRIC_VALUES[0],
      suffix: suffixes[0],
      label: t("environmentalImpact.co2Label"),
      context: t("environmentalImpact.co2Context"),
      comparison: t("environmentalImpact.co2Comparison"),
      color: METRIC_COLORS[0],
    },
    {
      icon: METRIC_ICONS[1],
      value: METRIC_VALUES[1],
      suffix: suffixes[1],
      label: t("environmentalImpact.treesLabel"),
      context: t("environmentalImpact.treesContext"),
      comparison: t("environmentalImpact.treesComparison"),
      color: METRIC_COLORS[1],
    },
    {
      icon: METRIC_ICONS[2],
      value: METRIC_VALUES[2],
      suffix: suffixes[2],
      label: t("environmentalImpact.householdsLabel"),
      context: t("environmentalImpact.householdsContext"),
      comparison: t("environmentalImpact.householdsComparison"),
      color: METRIC_COLORS[2],
    },
  ];

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
            {t("environmentalImpact.overline")}
          </BadgeChip>
          <h2 className="editorial-heading">{t("environmentalImpact.title")}</h2>
          <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
            {t("environmentalImpact.subtitle")}
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
                      <AnimatedNumber value={m.value} suffix={m.suffix} numLocale={numLocale} />
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
            {expanded ? tc("hide") : t("environmentalImpact.howWeCalculated")}
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
                  {t("environmentalImpact.calculationExplanation")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
