"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { cn } from "@/lib/utils";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6] as const;

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const t = useTranslations("Home");
  const tc = useTranslations("Common");

  const FAQ_ITEMS = FAQ_KEYS.map((n) => ({
    q: t(`faq.q${n}`),
    a: t(`faq.a${n}`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="bg-background px-6 py-24 md:px-8 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Left column — header + CTA */}
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BadgeChip variant="accent" className="mb-4">
              <HelpCircle className="mr-1.5 size-3.5" />
              {t("faq.badge")}
            </BadgeChip>
            <h2 className="editorial-heading">
              {t("faq.title")}
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              {t("faq.subtitle")}
            </p>

            <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
              <p className="text-sm font-medium text-foreground">
                {t("faq.notFoundTitle")}
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                {t("faq.notFoundSubtitle")}
              </p>
              <Link
                href={"/kontakti" as never}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {tc("contactUs")}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right column — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Accordion.Root type="single" collapsible className="w-full space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <Accordion.Item
                  key={item.q}
                  value={`faq-${i}`}
                  className="group rounded-xl border border-border bg-background transition-all duration-200 data-[state=open]:border-accent/30 data-[state=open]:shadow-sm"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "flex w-full items-center gap-4 px-6 py-5 text-left outline-none",
                        "transition-colors hover:text-accent",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        "[&[data-state=open]>svg]:rotate-180",
                      )}
                    >
                      <span className="shrink-0 flex size-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-base font-semibold tracking-tight text-foreground md:text-lg">
                        {item.q}
                      </span>
                      <ChevronDown
                        className="size-5 shrink-0 text-foreground-tertiary transition-transform duration-300 ease-out"
                        aria-hidden
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    className={cn(
                      "overflow-hidden",
                      "data-[state=closed]:animate-[accordion-up_0.3s_ease-out]",
                      "data-[state=open]:animate-[accordion-down_0.3s_ease-out]",
                    )}
                  >
                    <div className="px-6 pb-6 pl-[calc(2rem+1.5rem)]">
                      <p className="text-base leading-relaxed text-foreground-secondary">
                        {item.a}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            <motion.div
              className="mt-8 flex justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href={"/chesti-vuprosi" as never}
                className="group inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {t("faq.seeAll")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
