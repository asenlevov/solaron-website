"use client";

import { useRef } from "react";
import { Search, PenTool, Wrench, Zap, Check, type LucideIcon } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import { slideFromLeft, slideFromRight } from "@/lib/animations";

interface Step {
  icon: LucideIcon;
  number: number;
  title: string;
  description: string;
  duration: string;
  provide: string;
  indent: string;
}

const STEP_ICONS = [Search, PenTool, Wrench, Zap] as const;
const STEP_INDENTS = ["lg:ml-[8%]", "lg:ml-[22%]", "lg:ml-[12%]", "lg:ml-[28%]"];

function StepCard({ step, index, whatYouProvideLabel }: { step: Step; index: number; whatYouProvideLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const Icon = step.icon;
  const variants = index % 2 === 0 ? slideFromLeft : slideFromRight;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", step.indent)}>
      <span
        className="pointer-events-none absolute -left-4 -top-8 select-none font-display text-[10rem] font-black leading-none text-accent/[0.05] md:-left-8 md:-top-10 md:text-[14rem]"
        aria-hidden
      >
        {step.number}
      </span>

      <motion.div
        className="relative rounded-xl border border-border bg-white p-6 shadow-card md:max-w-lg md:p-8"
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
            {step.title}
          </h3>
        </div>

        <p className="font-body text-sm leading-relaxed text-foreground-secondary md:text-base">
          {step.description}
        </p>

        <span className="mt-4 inline-flex rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-semibold text-accent">
          {step.duration}
        </span>

        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-1.5 font-body text-xs font-semibold uppercase tracking-wider text-foreground-secondary/60">
            {whatYouProvideLabel}
          </p>
          <div className="flex items-start gap-2 font-body text-sm text-foreground-secondary">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
            <span>{step.provide}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("Home");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  const steps: Step[] = [
    {
      icon: STEP_ICONS[0],
      number: 1,
      title: t("processTimeline.step1Title"),
      description: t("processTimeline.step1Desc"),
      duration: t("processTimeline.step1Duration"),
      provide: t("processTimeline.step1Provide"),
      indent: STEP_INDENTS[0]!,
    },
    {
      icon: STEP_ICONS[1],
      number: 2,
      title: t("processTimeline.step2Title"),
      description: t("processTimeline.step2Desc"),
      duration: t("processTimeline.step2Duration"),
      provide: t("processTimeline.step2Provide"),
      indent: STEP_INDENTS[1]!,
    },
    {
      icon: STEP_ICONS[2],
      number: 3,
      title: t("processTimeline.step3Title"),
      description: t("processTimeline.step3Desc"),
      duration: t("processTimeline.step3Duration"),
      provide: t("processTimeline.step3Provide"),
      indent: STEP_INDENTS[2]!,
    },
    {
      icon: STEP_ICONS[3],
      number: 4,
      title: t("processTimeline.step4Title"),
      description: t("processTimeline.step4Desc"),
      duration: t("processTimeline.step4Duration"),
      provide: t("processTimeline.step4Provide"),
      indent: STEP_INDENTS[3]!,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-background-warm px-6 py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 md:mb-20">
          <p className="editorial-overline mb-4 text-accent">{t("processTimeline.overline")}</p>
          <TextReveal as="h2" className="editorial-display">
            {t("processTimeline.title")}
          </TextReveal>
        </div>

        <div className="relative">
          <div
            className="absolute left-[1.375rem] top-0 hidden h-full w-px lg:block"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-accent/30"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          <div className="flex flex-col gap-12 lg:gap-16">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} whatYouProvideLabel={t("processTimeline.whatYouProvide")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
