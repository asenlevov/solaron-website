"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Системата работи безупречно от първия ден. За 8 месеца вече сме спестили над 4000 лв. Solaron подходиха изключително професионално — от първата среща до финалния тест.",
    name: "Иван Петров",
    role: "Домакинство",
    location: "Казанлък",
    project: "5 kW система",
    savings: "4000+ лв.",
    rating: 5,
  },
  {
    quote: "Професионален подход от начало до край. Монтажът приключи за 2 дни, а системата работи над очакванията. Вече препоръчах Solaron на трима съседи.",
    name: "Мария Георгиева",
    role: "Домакинство",
    location: "Враца",
    project: "15 kW система",
    savings: "80% спестяване",
    rating: 5,
  },
  {
    quote: "Инвестицията се изплати за по-малко от 4 години. Сега практически имаме безплатен ток. Качеството на компонентите и изпълнението е на световно ниво.",
    name: "Стефан Димитров",
    role: "Управител",
    location: "София",
    project: "108 kWp система",
    savings: "Безплатен ток",
    rating: 5,
  },
  {
    quote: "Solaron проектира и монтира системата с невероятна прецизност. Мониторинг платформата ни дава пълна видимост над продукцията в реално време.",
    name: "Петър Николов",
    role: "Собственик",
    location: "Варна",
    project: "39 kWp система",
    savings: "70% спестяване",
    rating: 5,
  },
] as const;

const INTERVAL_MS = 6000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -15% 0px" });

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    setProgress(0);
    const frame = requestAnimationFrame(() => setProgress(100));
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="bg-background-secondary/30 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <BadgeChip variant="accent" className="mb-4">Отзиви на Клиенти</BadgeChip>
            <h2 className="text-editorial-heading">Какво Казват Нашите Клиенти</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:bg-background hover:text-foreground"
              aria-label="Предишен отзив"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:bg-background hover:text-foreground"
              aria-label="Следващ отзив"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <GlowCard>
          <div className="relative overflow-hidden p-8 md:p-12">
            <Quote className="absolute right-8 top-8 size-16 text-accent/10 md:size-24" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-0.5 mb-6" role="img" aria-label={`${t.rating} от 5 звезди`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>

                <blockquote className="text-xl font-medium leading-relaxed text-foreground md:text-2xl lg:text-3xl max-w-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display text-base font-semibold text-foreground">
                          {t.name}
                        </p>
                        <BadgeChip variant="success">Потвърден</BadgeChip>
                      </div>
                      <p className="text-sm text-foreground-secondary">
                        {t.role}, {t.location} · {t.project}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                    <span className="text-sm font-semibold text-accent">{t.savings}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </GlowCard>

        {/* Progress dots */}
        <div className="mt-8 flex gap-2 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setActive(i); setProgress(0); }}
              className="group relative h-1.5 w-12 cursor-pointer overflow-hidden rounded-full bg-border"
              aria-label={`Отидете на отзив ${i + 1}`}
            >
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-accent",
                  i === active ? "w-full" : "w-0",
                )}
                style={
                  i === active
                    ? { transition: `width ${INTERVAL_MS}ms linear`, width: `${progress}%` }
                    : i < active
                      ? { width: "100%", transition: "none" }
                      : { width: "0%", transition: "none" }
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
