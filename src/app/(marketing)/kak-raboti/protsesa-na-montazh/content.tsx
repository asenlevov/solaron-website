"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  ClipboardList,
  FileSignature,
  Hammer,
  PlugZap,
  Search,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { GlowCard } from "@/components/ui/glow-card";
import { SolutionCTA } from "@/components/marketing/solution-page-shared";
import { KAK_RABOTI_IMAGES } from "@/data/images";
import { blurIn, staggerContainer, staggerItem } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Заявление",
    icon: ClipboardList,
    desc: "Подаване на заявление към ЕРП оператора (EVN/ЧЕЗ/Енерго-Про). Необходими: скица, нот. акт, декларация.",
  },
  {
    n: "02",
    title: "Становище",
    icon: Search,
    desc: "Получаване на становище за присъединяване. Срок: 14 работни дни (до 30kW).",
  },
  {
    n: "03",
    title: "Договор",
    icon: FileSignature,
    desc: "Подписване на предварителен договор за присъединяване с мрежовия оператор.",
  },
  {
    n: "04",
    title: "Проект",
    icon: ArrowRight,
    desc: "Изготвяне на работен проект от лицензиран инженер. Ел. част, PV, конструкции.",
  },
  {
    n: "05",
    title: "Монтаж",
    icon: Hammer,
    desc: "Професионален монтаж от сертифициран екип. 1-3 дни за домашни, 1-2 седмици за търговски.",
  },
  {
    n: "06",
    title: "Пускане",
    icon: PlugZap,
    desc: "72-часов тестов период, пломбиране на електромера и въвеждане в експлоатация.",
  },
] as const;

const DOC_CATEGORIES = [
  {
    title: "Лични документи",
    docs: [
      "Лична карта (копие)",
      "Нотариален акт или договор за наем с нотариална заверка",
    ],
  },
  {
    title: "Технически документи",
    docs: [
      "Скица на имота (актуална)",
      "Еднолинейна схема на електрическата инсталация",
    ],
  },
  {
    title: "ЗЕВИ регистрация",
    docs: [
      "Декларация по чл. 25 от ЗЕВИ",
      "Заявление за вписване в регистъра на производителите",
    ],
  },
  {
    title: "Договор с оператор",
    docs: [
      "Заявление за присъединяване (по образец на ЕРП)",
      "Съгласие за достъп до имота при необходимост",
    ],
  },
] as const;

const OPERATORS = [
  {
    name: "EVN",
    region: "Южна България",
    cities: "Пловдив, Стара Загора, Бургас",
    processingTime: "~14 работни дни",
  },
  {
    name: "ЧЕЗ Разпределение",
    region: "Западна България",
    cities: "София, Плевен, Враца",
    processingTime: "~14 работни дни",
  },
  {
    name: "Енерго-Про",
    region: "Североизток",
    cities: "Варна, Русе, Велико Търново",
    processingTime: "~14 работни дни",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Accordion                                                          */
/* ------------------------------------------------------------------ */

function DocAccordion({
  title,
  docs,
  defaultOpen = false,
}: {
  title: string;
  docs: readonly string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between py-5 text-left font-display font-semibold text-foreground transition-colors hover:text-accent"
      >
        <span>{title}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-foreground-tertiary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <ul className="space-y-3 pb-6">
          {docs.map((doc) => (
            <li key={doc} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-foreground-secondary">{doc}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step component                                                     */
/* ------------------------------------------------------------------ */

function TimelineStep({
  step,
  index,
  total,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const Icon = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-8"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * index }}
    >
      <div className="flex flex-col items-center">
        <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-white font-display text-lg font-bold shadow-lg shadow-accent/20">
          {step.n}
        </div>
        {!isLast && (
          <motion.div
            className="mt-2 w-px flex-1 bg-accent/20"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      <div className={`pb-12 ${isLast ? "pb-0" : ""}`}>
        <div className="mb-2 inline-flex items-center gap-2">
          <Icon className="size-5 text-accent" strokeWidth={1.5} />
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
            {step.title}
          </h3>
        </div>
        <p className="max-w-md text-foreground-secondary leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main content                                                       */
/* ------------------------------------------------------------------ */

export function ProtsesNaMontazhContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const docsRef = useRef<HTMLElement>(null);
  const docsInView = useInView(docsRef, { once: true, margin: "0px 0px -15% 0px" });
  const zeviRef = useRef<HTMLElement>(null);
  const zeviInView = useInView(zeviRef, { once: true, margin: "0px 0px -15% 0px" });
  const opsRef = useRef<HTMLElement>(null);
  const opsInView = useInView(opsRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[80vh] items-end"
      >
        <ImageEditorial
          src={KAK_RABOTI_IMAGES.protsesNaMontazh}
          alt="Процес на монтаж на фотоволтаична система"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BadgeChip variant="hero" className="mb-6">
              Процедура
            </BadgeChip>
          </motion.div>

          <TextReveal as="h1" className="editorial-hero max-w-3xl text-white">
            Процес на Монтаж
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            6 стъпки от заявление до чиста енергия.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { value: 6, suffix: " стъпки", context: "Процес" },
              { value: 30, suffix: " дни", context: "Среден срок" },
              { value: 100, suffix: "%", context: "Ние управляваме" },
            ].map((stat) => (
              <motion.div key={stat.context} variants={staggerItem}>
                <StatNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  context={stat.context}
                  className="text-4xl text-white md:text-5xl"
                  contextClassName="text-white/60"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. TIMELINE ────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline text-accent mb-4"
          >
            Стъпка по стъпка
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            От заявление до пуск
          </TextReveal>

          <div className="mx-auto max-w-2xl">
            {STEPS.map((step, i) => (
              <TimelineStep
                key={step.n}
                step={step}
                index={i}
                total={STEPS.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DOCUMENT CHECKLIST ──────────────────────────────────── */}
      <section ref={docsRef} className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={docsInView ? "visible" : "hidden"}
            className="editorial-overline text-accent mb-4"
          >
            Чеклист
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-12">
            Необходими документи
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={docsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <GlowCard className="overflow-hidden">
              <div className="p-8 md:p-10">
                {DOC_CATEGORIES.map((cat, i) => (
                  <DocAccordion
                    key={cat.title}
                    title={cat.title}
                    docs={cat.docs}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>
            </GlowCard>
          </motion.div>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={docsInView ? "visible" : "hidden"}
            className="mx-auto mt-8 max-w-2xl text-center text-sm text-foreground-tertiary"
          >
            Финалният списък зависи от мрежовия оператор и типа обект. Solaron
            подготвя пълния пакет вместо вас.
          </motion.p>
        </div>
      </section>

      {/* ── 4. ZEVI GUARANTEES ─────────────────────────────────────── */}
      <section ref={zeviRef} className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={zeviInView ? "visible" : "hidden"}
            className="editorial-overline text-accent mb-4"
          >
            Регулации
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6 max-w-3xl">
            ЗЕВИ — Закон за енергията от възобновяеми източници
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={zeviInView ? "visible" : "hidden"}
            className="max-w-2xl text-lg text-foreground-secondary leading-relaxed mb-16"
          >
            ЗЕВИ гарантира преференциални условия за малки производители на
            електрическа енергия от фотоволтаични системи. Опростената
            процедура за инсталации до 30 kW прави процеса достъпен за всяко
            домакинство и бизнес.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={zeviInView ? "visible" : "hidden"}
            className="grid gap-8 sm:grid-cols-3"
          >
            {[
              { value: 20, suffix: " год.", context: "Гарантиран изкуп" },
              { value: 15, suffix: " год.", context: "Преференциална цена" },
              { value: 30, suffix: " kW", context: "Опростена процедура" },
            ].map((stat) => (
              <motion.div
                key={stat.context}
                variants={staggerItem}
                className="rounded-2xl border border-neutral-200 bg-white p-8 text-center"
              >
                <StatNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  context={stat.context}
                  className="text-5xl md:text-6xl"
                  contextClassName="text-foreground-secondary"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. NETWORK OPERATORS (dark) ────────────────────────────── */}
      <section ref={opsRef} className="bg-foreground px-6 py-24 text-white md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={opsInView ? "visible" : "hidden"}
            className="editorial-overline text-accent mb-4"
          >
            Оператори
          </motion.p>
          <TextReveal as="h2" className="editorial-display text-white mb-16">
            Мрежови Оператори
          </TextReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={opsInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-3"
          >
            {OPERATORS.map((op) => (
              <motion.div key={op.name} variants={staggerItem}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm h-full">
                  <h3 className="font-display text-xl font-bold mb-1">
                    {op.name}
                  </h3>
                  <BadgeChip variant="accent" className="mb-4">
                    {op.region}
                  </BadgeChip>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    Покритие: {op.cities}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <ArrowRight className="size-4 text-accent" />
                    <span className="text-white/80">
                      Обработка: {op.processingTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ─────────────────────────────────────────────────── */}
      <SolutionCTA />
    </main>
  );
}
