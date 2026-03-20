"use client";

import { useRef } from "react";
import { Search, PenTool, Wrench, Zap, Check, type LucideIcon } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
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

const steps: Step[] = [
  {
    icon: Search,
    number: 1,
    title: "Консултация",
    description:
      "Безплатен оглед и анализ на покрива. Изчисляваме оптималния размер на системата спрямо вашето потребление.",
    duration: "1-2 дни",
    provide: "Сметка за ток, снимка на покрива",
    indent: "lg:ml-[8%]",
  },
  {
    icon: PenTool,
    number: 2,
    title: "Проектиране",
    description:
      "3D модел и персонализиран проект. Всяка система е уникална — проектираме за максимална ефективност.",
    duration: "3-5 дни",
    provide: "Достъп до тавана/покрива",
    indent: "lg:ml-[22%]",
  },
  {
    icon: Wrench,
    number: 3,
    title: "Монтаж",
    description:
      "Професионален монтаж от сертифициран екип. Използваме само висококачествени компоненти с гаранция.",
    duration: "1-3 дни",
    provide: "Достъп до имота",
    indent: "lg:ml-[12%]",
  },
  {
    icon: Zap,
    number: 4,
    title: "Активиране",
    description:
      "Свързване и пускане в експлоатация. Системата започва да произвежда енергия от първия ден.",
    duration: "1-2 седмици",
    provide: "Документи за ЕРП",
    indent: "lg:ml-[28%]",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
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
            Какво осигурявате:
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-background-warm px-6 py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 md:mb-20">
          <p className="text-editorial-overline mb-4 text-accent">ПРОЦЕС</p>
          <TextReveal as="h2" className="text-editorial-display">
            Нашият Процес
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
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
