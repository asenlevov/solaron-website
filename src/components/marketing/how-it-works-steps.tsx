"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  MessageSquare,
  Ruler,
  Wrench,
  PlugZap,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Безплатна Консултация",
    description:
      "Свържете се с нас за безплатен оглед и анализ на вашите нужди. Оценяваме покрива, консумацията и определяме оптималната система.",
    icon: MessageSquare,
    color: "#3B7A2A",
    details: [
      "Безплатен оглед на обекта",
      "Анализ на консумацията от последните 12 месеца",
      "Оценка на покрива и ориентацията",
      "Персонализирана оферта в рамките на 48 часа",
    ],
  },
  {
    number: "02",
    title: "Проектиране на Системата",
    description:
      "Нашият инженерен екип проектира системата с подбор на компоненти, 3D моделиране и техническа документация за одобрение.",
    icon: Ruler,
    color: "#059669",
    details: [
      "3D моделиране на системата",
      "Подбор на оптимални компоненти",
      "Техническа документация за ЕРП",
      "Изчисление на очаквана производителност",
    ],
  },
  {
    number: "03",
    title: "Професионален Монтаж",
    description:
      "Сертифициран екип монтира системата с европейско качество. Процесът отнема 1-3 дни в зависимост от размера.",
    icon: Wrench,
    color: "#0ea5e9",
    details: [
      "Сертифицирани монтажници с 20+ год. опит",
      "Монтаж за 1-3 работни дни",
      "Европейски стандарти за качество",
      "Пълно почистване след монтаж",
    ],
  },
  {
    number: "04",
    title: "Свързване към Мрежата",
    description:
      "Извършваме всички административни процедури за свързване към електрическата мрежа и активиране на нетно отчитане.",
    icon: PlugZap,
    color: "#f59e0b",
    details: [
      "Подаване на документи към ЕРП",
      "Настройка на нетно отчитане",
      "Тестване и пускане в експлоатация",
      "Регистрация в мониторинг платформата",
    ],
  },
  {
    number: "05",
    title: "Мониторинг и Поддръжка",
    description:
      "Следете производителността в реално време. Нашият екип осигурява поддръжка и гаранционен сервиз за целия живот на системата.",
    icon: Monitor,
    color: "#8B5CF6",
    details: [
      "24/7 мониторинг на производителността",
      "Автоматични известия при проблеми",
      "Годишна профилактика включена",
      "30-годишна гаранция на панелите",
    ],
  },
];

export function HowItWorksSteps({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div ref={ref} className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent hidden md:block" />

        <div className="space-y-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative md:pl-16"
              >
                <div
                  className="hidden md:flex absolute left-0 top-4 h-12 w-12 rounded-xl items-center justify-center"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}
                >
                  <Icon className="size-6" />
                </div>

                <div
                  className={cn(
                    "rounded-xl border p-5 cursor-pointer transition-all duration-300",
                    expandedStep === i
                      ? "border-accent/30 bg-accent/5 shadow-lg"
                      : "border-border bg-background hover:border-border-medium hover:shadow-card",
                  )}
                  onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="md:hidden" style={{ color: step.color }}>
                          <Icon className="size-5" />
                        </span>
                        <span className="text-xs font-mono font-bold" style={{ color: step.color }}>
                          СТЪПКА {step.number}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedStep === i ? 180 : 0 }}
                      className="shrink-0 text-foreground-secondary mt-1 text-lg"
                    >
                      &#8595;
                    </motion.div>
                  </div>

                  {expandedStep === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className="grid gap-2 sm:grid-cols-2">
                        {step.details.map((detail) => (
                          <div key={detail} className="flex items-start gap-2 text-sm">
                            <div
                              className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: step.color }}
                            />
                            <span className="text-foreground-secondary">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
