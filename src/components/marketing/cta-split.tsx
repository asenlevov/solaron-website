"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone, ArrowRight, Shield, Clock, BadgeCheck } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import Link from "next/link";
import { cn } from "@/lib/utils";

const guarantees = [
  { icon: Shield, text: "30 год. гаранция панели" },
  { icon: Clock, text: "Безплатен оглед" },
  { icon: BadgeCheck, text: "Без скрити такси" },
];

export function CTASplit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-emerald-700 px-6 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNjBMNjAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-50" />

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <BadgeChip className="mb-6 border-white/20 bg-white/10 text-white">
          Готови ли сте?
        </BadgeChip>

        <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
          Вашата Соларна<br />Революция Започва Тук
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Безплатна консултация с наш експерт. Ще проектираме идеалната система за вашите нужди — без ангажимент.
        </p>

        <a
          href="tel:+359884321560"
          className="mt-8 inline-flex items-center gap-3 text-2xl font-light text-white/90 transition-colors hover:text-white md:text-3xl"
        >
          <Phone className="size-6" strokeWidth={1.5} />
          +359 88 432 1560
        </a>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
          <Link
            href="/kontakti"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-accent shadow-lg transition-all duration-200 hover:bg-white/90 hover:shadow-xl"
          >
            Безплатна Консултация
            <ArrowRight className="size-5" />
          </Link>
          <Link
            href="/konfigurator"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10"
          >
            Конфигуратор
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.text} className="flex items-center gap-2 text-sm text-white/70">
                <Icon className="size-4 text-white/50" />
                {g.text}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
