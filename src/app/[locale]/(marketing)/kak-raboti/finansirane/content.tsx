"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  Landmark,
  Wallet,
  Building2,
  FileText,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Percent,
} from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { SolutionCTA } from "@/components/marketing/solution-page-shared";
import { KAK_RABOTI_IMAGES } from "@/data/images";
import { blurIn, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Data ────────────────────────────────────────────────────────── */

const FINANCING_OPTIONS = [
  {
    icon: Wallet,
    title: "Собствени средства",
    highlights: [
      "Максимален ROI — без лихви и такси",
      "Пълен контрол върху системата от ден 1",
      "Данъчна оптимизация за бизнеси",
    ],
  },
  {
    icon: Landmark,
    title: "Банков кредит",
    highlights: [
      "Нисък лихвен процент — от 3.5% годишно",
      "Срок 5–10 години, съобразен с ROI",
      "Нулево самоучастие при партньорски програми",
    ],
  },
  {
    icon: FileText,
    title: "Лизинг",
    highlights: [
      "Фиксирани месечни вноски — бюджетна яснота",
      "Вноските често са по-ниски от спестяванията",
      "Собственост след изплащане на договора",
    ],
  },
  {
    icon: TrendingUp,
    title: "Субсидия",
    highlights: [
      "До 50% покритие на инвестицията",
      "ЕС и национални програми",
      "Комбинируеми с кредит или лизинг",
    ],
  },
] as const;

const SUBSIDY_PROGRAMS = [
  {
    name: "ПРСР",
    badge: "до 50%",
    target: "Земеделски стопанства",
    maxAmount: "100 000 лв.",
    description:
      "Програма за развитие на селските райони — подпомага инвестиции в ВЕИ за земеделски производители. Покрива до 50% от допустимите разходи за фотоволтаични системи.",
    requirements: [
      "Регистрация като земеделски производител",
      "Одобрен инвестиционен проект",
      "Енергиен одит на стопанството",
    ],
  },
  {
    name: "Национален план за възстановяване",
    badge: "до 70%",
    target: "Домакинства",
    maxAmount: "15 000 лв.",
    description:
      "Най-достъпната програма за битови клиенти. Покрива до 70% от стойността на фотоволтаична система за еднофамилни жилища с енергиен клас минимум Е.",
    requirements: [
      "Еднофамилно жилище",
      "Валидно удостоверение за енергиен клас",
      "Изпълнение от лицензиран инсталатор",
    ],
  },
  {
    name: "ОПИК",
    badge: "до 50%",
    target: "Малки и средни предприятия",
    maxAmount: "200 000 лв.",
    description:
      "Оперативна програма за иновации и конкурентоспособност \u2014 финансира енергийни подобрения за МСП, включително покривни и наземни PV инсталации.",
    requirements: [
      "Регистрация като МСП",
      "Финансови отчети за последните 3 години",
      "Бизнес план с енергиен анализ",
    ],
  },
  {
    name: "ЕС Зелена Сделка",
    badge: "Дългосрочна",
    target: "Индустрия",
    maxAmount: "По проект",
    description:
      "Европейски фондове за декарбонизация на индустрията. Дългосрочни програми с по-сложна кандидатура, но значително покритие за мащабни проекти.",
    requirements: [
      "Детайлен план за намаляване на емисиите",
      "Съответствие с таксономия на ЕС",
      "Одобрен технически проект",
    ],
  },
] as const;

const BANK_PRODUCTS = [
  {
    bank: "Стандартен потребителски",
    rate: "от 3.9%",
    term: "до 10 години",
    downPayment: "0–10%",
    note: "За системи до 30 kW. Без обезпечение до 50 000 лв.",
  },
  {
    bank: "Зелен бизнес кредит",
    rate: "от 3.5%",
    term: "до 7 години",
    downPayment: "10–20%",
    note: "Преференциален лихвен процент за ВЕИ инвестиции. Обезпечение — самата система.",
  },
  {
    bank: "Инвестиционен кредит",
    rate: "от 4.2%",
    term: "до 15 години",
    downPayment: "20%",
    note: "За по-големи проекти — търговски и индустриални. Ипотечно обезпечение.",
  },
] as const;

const BANK_REQUIREMENTS = [
  "Стабилен месечен доход (мин. 1 500 лв. нетно)",
  "Чиста кредитна история (без просрочия)",
  "Собственост на имота или договор за наем",
  "Лихвен процент: 3.5–6% годишно (фиксиран или плаващ)",
  "Срок: 3–15 години в зависимост от размера",
  "Самоучастие: 0–20% при различните продукти",
] as const;

const ROI_TABLE = [
  {
    label: "Начална инвестиция",
    own: "100%",
    credit: "0–20%",
    leasing: "1–3 вноски",
  },
  {
    label: "Месечна вноска",
    own: "—",
    credit: "~350 лв.",
    leasing: "~300 лв.",
  },
  {
    label: "Спестявания Год. 1",
    own: "~4 200 лв.",
    credit: "~200 лв. нетно",
    leasing: "~600 лв. нетно",
  },
  {
    label: "Payback период",
    own: "4–5 години",
    credit: "6–8 години",
    leasing: "7–9 години",
  },
  {
    label: "Обща възвръщаемост 25 год.",
    own: "~105 000 лв.",
    credit: "~85 000 лв.",
    leasing: "~80 000 лв.",
  },
] as const;

const FAQS = [
  {
    q: "Мога ли да комбинирам субсидия с банков кредит?",
    a: "Да. Повечето програми позволяват комбиниране — субсидията покрива част от стойността, а остатъкът се финансира чрез кредит. Важно е да проверите условията на конкретната програма, тъй като някои изискват собствено участие.",
  },
  {
    q: "Какъв е минималният доход за банков кредит?",
    a: "Повечето банки изискват нетен месечен доход от поне 1 500 лв. за потребителски кредит. За бизнес кредити се анализират годишните финансови отчети и оборотът на фирмата.",
  },
  {
    q: "Колко време отнема одобрението на субсидия?",
    a: "Зависи от програмата. Националният план за възстановяване обикновено отнема 2–4 месеца от кандидатстване до одобрение. ОПИК може да отнеме 4–6 месеца. Solaron подготвя техническата документация, за да няма забавяне от формални грешки.",
  },
  {
    q: "Има ли данъчни облекчения за фотоволтаици?",
    a: "За фирми — да. Фотоволтаичната система е дълготраен актив с ускорена амортизация, което намалява данъчната основа с до 25% годишно. За домакинства данъчни облекчения се прилагат при участие в програми за енергийна ефективност.",
  },
  {
    q: "Какво се случва със системата при лизинг?",
    a: "При финансов лизинг системата е ваша собственост след изплащане. При операционен лизинг — лизингодателят я поддържа, а вие плащате фиксирана месечна такса. И в двата случая спестяванията от ток са ваши.",
  },
] as const;

/* ─── FAQ Accordion ───────────────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="border-b border-stone-200 last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-accent md:text-lg">
          {q}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-foreground-tertiary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 pr-8 text-base leading-relaxed text-foreground-secondary">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Content ────────────────────────────────────────────────── */

export function FinansiraneContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const bankRef = useRef<HTMLElement>(null);
  const bankInView = useInView(bankRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex min-h-[90vh] items-end">
        <ImageEditorial
          src={KAK_RABOTI_IMAGES.finansirane}
          alt="Финансиране на фотоволтаични системи"
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
            <BadgeChip variant="hero">Финансови</BadgeChip>
          </motion.div>

          <TextReveal as="h1" className="editorial-hero mt-6 max-w-4xl text-white" delay={0.1}>
            Финансиране
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Субсидии, кредити, лизинг и данъчни облекчения.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-8 md:gap-12"
          >
            <motion.div variants={staggerItem}>
              <StatNumber
                value={4}
                suffix=" опции"
                context="Финансиране"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={50}
                suffix="%"
                context="Макс. субсидия"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatNumber
                value={25}
                suffix="%"
                context="Данъчно облекчение"
                className="text-4xl text-white md:text-5xl"
                contextClassName="text-white/50"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FINANCING OPTIONS ───────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Варианти
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Четири начина за финансиране
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Всеки вариант има своите предимства — изберете или комбинирайте в
            зависимост от бюджета, паричния поток и данъчната ви стратегия.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {FINANCING_OPTIONS.map((opt) => (
              <motion.div key={opt.title} variants={staggerItem}>
                <GlowCard className="h-full">
                  <div className="p-6 md:p-8">
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                      <opt.icon className="size-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {opt.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {opt.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 size-4 shrink-0 text-accent" />
                          <span className="text-sm leading-relaxed text-foreground-secondary">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. SUBSIDY PROGRAMS ────────────────────────────────────── */}
      <section className="bg-[#f8faf6] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Програми
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Субсидии и програми
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            България предлага няколко активни програми за финансиране на
            фотоволтаични системи — за домакинства, бизнеси и земеделие.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {SUBSIDY_PROGRAMS.map((prog) => (
              <motion.div key={prog.name} variants={staggerItem}>
                <TiltCard className="h-full">
                  <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {prog.name}
                      </h3>
                      <BadgeChip variant="accent">{prog.badge}</BadgeChip>
                    </div>
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="size-4 text-accent" />
                        {prog.target}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Wallet className="size-4 text-accent" />
                        Макс. {prog.maxAmount}
                      </span>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-foreground-secondary">
                      {prog.description}
                    </p>
                    <div className="space-y-2">
                      {prog.requirements.map((req) => (
                        <div key={req} className="flex items-start gap-2.5">
                          <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-accent" />
                          <span className="text-xs leading-relaxed text-foreground-tertiary">
                            {req}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. BANK CRITERIA ───────────────────────────────────────── */}
      <section ref={bankRef} className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4"
          >
            Банки
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6">
            Банкови изисквания
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-foreground-secondary"
          >
            Основните критерии, на които банките обръщат внимание при
            кредитиране на фотоволтаични системи.
          </motion.p>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={bankInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <GlowCard>
                <div className="p-8">
                  <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                    <Landmark className="size-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-6 font-display text-lg font-bold text-foreground">
                    Какво проверяват банките
                  </h3>
                  <ul className="space-y-4">
                    {BANK_REQUIREMENTS.map((req) => (
                      <li key={req} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span className="text-sm leading-relaxed text-foreground-secondary">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </motion.div>

            {/* Bank product cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={bankInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {BANK_PRODUCTS.map((prod) => (
                <motion.div key={prod.bank} variants={staggerItem}>
                  <GlowCard>
                    <div className="p-6">
                      <h4 className="font-display text-base font-bold text-foreground">
                        {prod.bank}
                      </h4>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-foreground-tertiary">Лихва</p>
                          <p className="mt-0.5 font-display text-sm font-bold text-accent">
                            {prod.rate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground-tertiary">Срок</p>
                          <p className="mt-0.5 font-display text-sm font-bold text-foreground">
                            {prod.term}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground-tertiary">Аванс</p>
                          <p className="mt-0.5 font-display text-sm font-bold text-foreground">
                            {prod.downPayment}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-foreground-tertiary">
                        {prod.note}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. ROI COMPARISON TABLE (dark) ─────────────────────────── */}
      <section className="relative bg-foreground px-6 py-24 text-white md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline mb-4 !text-amber-400"
          >
            Сравнение
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-6 text-white">
            Собствени vs Кредит vs Лизинг
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl text-lg text-white/50"
          >
            Ориентировъчно сравнение за 10 kWp система на стойност ~20 000 лв.
            Реалните числа зависят от тарифата и условията на кредитиране.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-4 text-sm font-semibold text-white/40">
                    Показател
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-amber-400">
                    <Wallet className="mb-1 inline size-4" /> Собствени
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-amber-400">
                    <Landmark className="mb-1 inline size-4" /> Кредит
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-amber-400">
                    <FileText className="mb-1 inline size-4" /> Лизинг
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROI_TABLE.map((row, i) => (
                  <tr
                    key={row.label}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-white/70">
                      {row.label}
                    </td>
                    <td className="px-4 py-4 font-display text-sm font-bold text-white">
                      {row.own}
                    </td>
                    <td className="px-4 py-4 font-display text-sm font-bold text-white/80">
                      {row.credit}
                    </td>
                    <td className="px-4 py-4 font-display text-sm font-bold text-white/80">
                      {row.leasing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-white/30"
          >
            * Примерни стойности за 10 kWp система в Южна България.
            Използвайте нашия ROI калкулатор за точни числа по вашия случай.
          </motion.p>
        </div>
      </section>

      {/* ── 6. FAQ + CTA ───────────────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <TextReveal as="h2" className="editorial-display mb-12 text-center">
            Често задавани въпроси
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>

          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <MagneticButton href="/konfigurator" variant="primary" size="xl">
              Изчислете вашия ROI
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <SolutionCTA />
    </main>
  );
}
