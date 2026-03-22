"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { StatNumber } from "@/components/ui/stat-number";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { REAL_IMAGES } from "@/data/images";
import { scaleSpring, createStagger } from "@/lib/animations";

const STAT_VALUES = [20, 384, 1500, 2100] as const;
const STAT_SUFFIXES = ["+", "+", "+", "+"] as const;
const STAT_KEYS = ["yearsExperience", "happyClients", "kWpInstalled", "mWhProduced"] as const;

export function StatsSection() {
  const t = useTranslations("Home");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      {/* Background image with green duotone */}
      <div className="absolute inset-0">
        <ImageEditorial
          src={REAL_IMAGES.projects.saedinenie651_hero}
          alt="651 kWp соларен проект Съединение"
          fill
          duotone="rgba(45, 107, 31, 0.6)"
          grain
          containerClassName="h-full w-full"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="grain pointer-events-none absolute inset-0 z-[1]" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-6xl flex-col flex-wrap items-center gap-12 overflow-hidden px-6 sm:flex-row sm:justify-between md:px-12"
        variants={createStagger(0.15, 0.2)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {STAT_KEYS.map((key, i) => (
          <motion.div
            key={key}
            variants={scaleSpring}
            className="text-center"
          >
            <StatNumber
              value={STAT_VALUES[i]!}
              suffix={STAT_SUFFIXES[i]}
              context={t(`stats.${key}`)}
              className="text-white"
              contextClassName="text-white/70"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
