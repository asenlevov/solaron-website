"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Системата работи безупречно от първия ден. За 8 месеца вече сме спестили над 4000 лв.",
    name: "Иван Петров",
    role: "Домакинство",
    location: "Казанлък",
    project: "5 kW Кран",
  },
  {
    quote: "Професионален подход от начало до край. Монтажът приключи за 2 дни.",
    name: "Мария Георгиева",
    role: "Домакинство",
    location: "Враца",
    project: "15 kW Враца",
  },
  {
    quote: "Инвестицията се изплати за по-малко от 4 години. Сега практически имаме безплатен ток.",
    name: "Стефан Димитров",
    role: "Управител",
    location: "София",
    project: "108 kWp Седем БГ",
  },
  {
    quote: "Solaron проектира и монтира системата с невероятна прецизност.",
    name: "Петър Николов",
    role: "Собственик",
    location: "Варна",
    project: "39 kWp Варна",
  },
] as const;

const INTERVAL_MS = 5000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -15% 0px" });

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
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
      className="px-6 py-24 md:px-8 md:py-32"
      style={{ backgroundColor: "#f7f7f5" }}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-editorial-overline mb-16 md:mb-20">Отзиви</p>

        <div className="relative min-h-[320px] overflow-hidden md:min-h-[280px]">
          <span
            className="pointer-events-none absolute -top-8 left-0 select-none font-serif text-[12rem] leading-none text-accent opacity-5 md:-top-12 md:text-[16rem]"
            aria-hidden
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <blockquote className="text-editorial-pull-quote max-w-3xl">
                {t.quote}
              </blockquote>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-display text-base font-semibold tracking-tight">
                      {t.name}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      Потвърден клиент
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground-secondary">
                    {t.role}, {t.location} · Проект: {t.project}
                  </p>
                </div>

                <div className="flex gap-0.5" role="img" aria-label="5 от 5 звезди">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Star className="size-4 fill-accent text-accent" aria-hidden />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(i);
                setProgress(0);
              }}
              className="group relative h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-foreground/10"
              aria-label={`Отидете на отзив ${i + 1}`}
            >
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-accent",
                  i === active ? "w-full" : "w-0",
                )}
                style={
                  i === active
                    ? {
                        transition: `width ${INTERVAL_MS}ms linear`,
                        width: `${progress}%`,
                      }
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
