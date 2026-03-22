"use client";

import { useRef } from "react";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "motion/react";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "Колко струва инсталацията на соларна система?",
    a: "Цената зависи от мощността и типа система. За жилищни системи от 3 до 10 kWp, цените варират между 5,000 и 18,000 лв. Предлагаме безплатна консултация и персонализирана оферта.",
  },
  {
    q: "За колко време се изплаща инвестицията?",
    a: "При текущите цени на електроенергията, типичната жилищна система се изплаща за 3-5 години. С нетно отчитане и оптимална ориентация, срокът може да бъде и по-кратък.",
  },
  {
    q: "Какво е нетно отчитане?",
    a: "Нетното отчитане е механизъм, при който излишната произведена енергия се връща в мрежата и се приспада от сметката ви. В България домакинствата могат да ползват нетно отчитане за системи до 30 kWp.",
  },
  {
    q: "Колко дълго трае монтажът?",
    a: "Типичният монтаж на жилищна система отнема 1-3 дни. За по-големи търговски системи — 1-2 седмици. Целият процес от консултация до пускане отнема 2-4 седмици.",
  },
  {
    q: "Каква гаранция предлагате?",
    a: "Предлагаме 30-годишна гаранция за соларните панели, 25-годишна за инверторите и 10-годишна за батериите. Допълнително, даваме 5-годишна гаранция за монтажа.",
  },
  {
    q: "Имам ли нужда от разрешение за монтаж?",
    a: "За системи до 30 kWp обикновено не е необходимо строително разрешение. За по-големи системи се изисква проектна документация. Ние се грижим за цялата документация.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

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
              Въпроси
            </BadgeChip>
            <h2 className="editorial-heading">
              Често Задавани Въпроси
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              Всичко, което трябва да знаете за соларните системи и процеса на инсталация.
            </p>

            <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
              <p className="text-sm font-medium text-foreground">
                Не намирате отговор на вашия въпрос?
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                Свържете се с нас за безплатна консултация.
              </p>
              <Link
                href="/kontakti"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Свържете се с нас
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
                href="/chesti-vuprosi"
                className="group inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Виж Всички Въпроси
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
