"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Wallet, Building2, FileText, ArrowRight } from "lucide-react";

import { TextReveal } from "@/components/ui/text-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";
import { createStagger, staggerItem } from "@/lib/animations";

const FINANCING_OPTIONS = [
  {
    icon: Wallet,
    title: "Собствени Средства",
    monthly: "~120 лв./мес. спестявания",
    benefit: "Максимална възвръщаемост",
    timeline: "Изплащане за 3-5 години",
    detail:
      "Без лихви, без вноски. Инвестирате веднъж и получавате максимална възвръщаемост от системата. Идеално за тези, които искат най-бърза печалба.",
  },
  {
    icon: Building2,
    title: "Банков Кредит",
    monthly: "~89 лв./мес. вноска",
    benefit: "Ниска лихва от 3.5%",
    timeline: "Спестявания от ден 1",
    detail:
      "Месечната вноска по кредита е по-ниска от спестяванията от ток. Работим с водещи банки за преференциални условия за зелени кредити.",
  },
  {
    icon: FileText,
    title: "Лизинг",
    monthly: "~99 лв./мес.",
    benefit: "Без начална инвестиция",
    timeline: "Гъвкави условия",
    detail:
      "Започнете да спестявате без първоначална вноска. Лизинговите схеми включват поддръжка и гаранции. Лесно бюджетиране за бизнеса.",
  },
] as const;

const containerVariants = createStagger(0.12, 0.15);

export function FinancingPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section className="bg-white px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="mb-6 text-center md:mb-8">
          <p className="editorial-overline mb-4">ФИНАНСИРАНЕ</p>
          <TextReveal as="h2" className="editorial-display justify-center">
            Как Се Финансира
          </TextReveal>
        </div>

        <motion.p
          className="mx-auto mb-16 max-w-xl text-center font-body text-base text-foreground-secondary md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          За система 5 kWp (~8,500 лв.)
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FINANCING_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div key={option.title} variants={staggerItem}>
                <TiltCard tiltAmount={5}>
                  <div
                    className={cn(
                      "group relative rounded-xl border border-border/60 bg-white p-8 shadow-sm",
                      "transition-all duration-500 hover:shadow-lg hover:border-accent/30",
                    )}
                  >
                    <div className="mb-6 inline-flex rounded-lg bg-accent/8 p-3">
                      <Icon
                        className="size-6 text-accent"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                      {option.title}
                    </h3>

                    <p className="mt-4 font-display text-2xl font-black tracking-tight text-accent">
                      {option.monthly}
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="font-body text-sm text-foreground-secondary">
                          {option.benefit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="font-body text-sm text-foreground-secondary">
                          {option.timeline}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "mt-0 max-h-0 overflow-hidden opacity-0",
                        "transition-all duration-500 ease-out",
                        "group-hover:mt-6 group-hover:max-h-40 group-hover:opacity-100",
                      )}
                    >
                      <p className="border-t border-border/40 pt-5 font-body text-sm leading-relaxed text-foreground-secondary">
                        {option.detail}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/finansirane"
            className="group inline-flex items-center gap-2 font-display text-base font-semibold text-accent transition-colors hover:text-accent/80"
          >
            Научете Повече За Финансирането
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
