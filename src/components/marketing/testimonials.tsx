"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 6000;

export function Testimonials() {
  const t = useTranslations("Home");

  const testimonials = [
    {
      quote: t("testimonials.testimonial1.quote"),
      name: t("testimonials.testimonial1.name"),
      role: t("testimonials.household"),
      location: t("testimonials.testimonial1.location"),
      project: t("testimonials.testimonial1.project"),
      savings: t("testimonials.testimonial1.savings"),
      rating: 5,
    },
    {
      quote: t("testimonials.testimonial2.quote"),
      name: t("testimonials.testimonial2.name"),
      role: t("testimonials.household"),
      location: t("testimonials.testimonial2.location"),
      project: t("testimonials.testimonial2.project"),
      savings: t("testimonials.testimonial2.savings"),
      rating: 5,
    },
    {
      quote: t("testimonials.testimonial3.quote"),
      name: t("testimonials.testimonial3.name"),
      role: t("testimonials.manager"),
      location: t("testimonials.testimonial3.location"),
      project: t("testimonials.testimonial3.project"),
      savings: t("testimonials.testimonial3.savings"),
      rating: 5,
    },
    {
      quote: t("testimonials.testimonial4.quote"),
      name: t("testimonials.testimonial4.name"),
      role: t("testimonials.owner"),
      location: t("testimonials.testimonial4.location"),
      project: t("testimonials.testimonial4.project"),
      savings: t("testimonials.testimonial4.savings"),
      rating: 5,
    },
  ];
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

  const tItem = testimonials[active]!;

  return (
    <section
      ref={sectionRef}
      className="bg-background-secondary/30 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <BadgeChip variant="accent" className="mb-4">{t("testimonials.overline")}</BadgeChip>
            <h2 className="editorial-heading">{t("testimonials.title")}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:bg-background hover:text-foreground"
              aria-label={t("testimonials.prevLabel")}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:bg-background hover:text-foreground"
              aria-label={t("testimonials.nextLabel")}
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
                <div className="flex gap-0.5 mb-6" role="img" aria-label={t("testimonials.starsLabel", { n: tItem.rating })}>
                  {Array.from({ length: tItem.rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>

                <blockquote className="text-xl font-medium leading-relaxed text-foreground md:text-2xl lg:text-3xl max-w-4xl">
                  &ldquo;{tItem.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-lg">
                      {tItem.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display text-base font-semibold text-foreground">
                          {tItem.name}
                        </p>
                        <BadgeChip variant="success">{t("testimonials.verified")}</BadgeChip>
                      </div>
                      <p className="text-sm text-foreground-secondary">
                        {tItem.role}, {tItem.location} · {tItem.project}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                    <span className="text-sm font-semibold text-accent">{tItem.savings}</span>
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
              aria-label={t("testimonials.goToLabel", { n: i + 1 })}
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
