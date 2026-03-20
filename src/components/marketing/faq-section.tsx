"use client";

import { useRef } from "react";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";

import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import { createStagger, staggerItem } from "@/lib/animations";

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
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function formatNum(n: number): string {
  return String(n).padStart(2, "0");
}

const containerVariants = createStagger(0.06, 0.15);

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section className="bg-white px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-20">
          <p className="text-editorial-overline mb-4">ВЪПРОСИ</p>
          <TextReveal as="h2" className="text-editorial-heading justify-center">
            Често Задавани Въпроси
          </TextReveal>
        </div>

        <motion.div
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Accordion.Root type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={item.q} variants={staggerItem}>
                <Accordion.Item
                  value={`faq-${i}`}
                  className={cn(
                    "group border-b border-border/50",
                    "transition-all duration-300",
                    "data-[state=open]:border-l-2 data-[state=open]:border-l-accent data-[state=open]:pl-6",
                  )}
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "flex w-full items-center gap-5 py-6 text-left outline-none",
                        "transition-colors hover:text-accent",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        "[&[data-state=open]>svg]:rotate-180",
                      )}
                    >
                      <span className="shrink-0 font-display text-3xl font-black leading-none text-accent/20 md:text-4xl">
                        {formatNum(i + 1)}
                      </span>
                      <span className="flex-1 font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
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
                    <div className="pb-6 pl-[calc(theme(fontSize.3xl)+1.25rem)] pr-8 md:pl-[calc(theme(fontSize.4xl)+1.25rem)]">
                      <p className="font-body text-base leading-relaxed text-foreground-secondary">
                        {item.a}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>

          <motion.div
            className="mt-12 flex justify-center"
            variants={staggerItem}
          >
            <Link
              href="/chesto-zadavani-vaprosi"
              className="group inline-flex items-center gap-2 font-display text-base font-semibold text-accent transition-colors hover:text-accent/80"
            >
              Виж Всички Въпроси
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
