"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  Gauge,
  Sun,
  Moon,
  Battery,
  Zap,
  TrendingUp,
  ArrowLeftRight,
  ArrowRight,
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

const faqs = [
  {
    q: "Как се формира месечната сметка при нетно отчитане?",
    a: "Електромерът отчита отделно внесената и изнесената енергия. В края на месеца разликата се остойностява по пазарни цени — ако сте произвели повече, отколкото сте потребили, получавате кредит за следващ период. Ако сте потребили повече — доплащате разликата.",
  },
  {
    q: "Какво става, ако имам отрицателно салдо (произвел съм повече)?",
    a: "Излишъкът се прехвърля като кредит за следващите месеци в рамките на 12-месечния отчетен период. В края на периода неизползваният кредит се изкупува по средната борсова цена, намалена с дължимите такси.",
  },
  {
    q: "Каква е максималната мощност на системата за нетно отчитане?",
    a: "За битови потребители лимитът е 30 kWp инсталирана мощност. Системата трябва да е оразмерена спрямо реалната консумация, за да бъде одобрена от ЕРП-то.",
  },
  {
    q: "Каква е разликата между нетно отчитане и преференциална цена (feed-in)?",
    a: "При нетно отчитане произведената енергия компенсира потреблението — плащате само нетната разлика. При feed-in tariff цялото производство се продава на фиксирана цена, но тази схема вече не е достъпна за нови инсталации в България.",
  },
  {
    q: "Мога ли да сменя доставчика на електроенергия?",
    a: "Да, нетното отчитане е обвързано с мрежовия оператор (ЕРП), а не с доставчика. Можете свободно да сменяте доставчик, но трябва да уведомите и двете страни и да проверите условията за изкупуване на излишъка.",
  },
];

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative flex min-h-[85vh] items-end overflow-hidden">
      <ImageEditorial
        src={KAK_RABOTI_IMAGES.netnoMetering}
        alt="Покривна фотоволтаична система с двупосочен електромер"
        fill
        sizes="100vw"
        priority
        parallax
        grain
        containerClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-8 md:pb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <BadgeChip variant="hero">Финансови</BadgeChip>
        </motion.div>

        <TextReveal as="h1" className="editorial-hero mt-6 max-w-4xl text-white">
          Нетно Отчитане
        </TextReveal>

        <motion.p
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
        >
          Двупосочен електромер. Продавайте излишъка. Купувайте при нужда.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-8"
        >
          <StatNumber
            value={2}
            suffix="-посочен"
            context="Електромер"
            className="text-4xl text-white md:text-5xl"
            contextClassName="text-white/60"
          />
          <StatNumber
            value={30}
            suffix=" kW"
            context="Макс. мощност"
            className="text-4xl text-white md:text-5xl"
            contextClassName="text-white/60"
          />
          <StatNumber
            value={12}
            suffix=" мес."
            context="Отчетен период"
            className="text-4xl text-white md:text-5xl"
            contextClassName="text-white/60"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. TWO-WAY METER                                                   */
/* ------------------------------------------------------------------ */
function TwoWayMeterSection() {
  const [mode, setMode] = useState<"day" | "night">("day");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section ref={ref} className="bg-white px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <TextReveal as="h2" className="editorial-display mb-4">
          Как работи нетното отчитане
        </TextReveal>
        <motion.p
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 max-w-2xl text-lg text-foreground-secondary"
        >
          Двупосочният електромер отчита енергията и в двете посоки — от мрежата
          към вас и от вас към мрежата.
        </motion.p>

        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setMode("day")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              mode === "day"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "bg-background-secondary text-foreground-secondary hover:bg-background-secondary/80"
            }`}
          >
            <Sun className="size-4" /> Ден
          </button>
          <button
            onClick={() => setMode("night")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              mode === "night"
                ? "bg-stone-800 text-white shadow-lg shadow-stone-800/25"
                : "bg-background-secondary text-foreground-secondary hover:bg-background-secondary/80"
            }`}
          >
            <Moon className="size-4" /> Нощ
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <GlowCard className="overflow-hidden">
            <div className="p-8 md:p-12">
              <svg
                viewBox="0 0 800 260"
                className="w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Solar Panels */}
                <g>
                  <rect x="40" y="40" width="120" height="80" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="2" />
                  <Sun className="size-6" x="80" y="10" />
                  <text x="100" y="75" textAnchor="middle" className="fill-accent text-xs font-semibold" fontSize="13">
                    Панели
                  </text>
                  <text x="100" y="100" textAnchor="middle" className="fill-accent/60 text-xs" fontSize="11">
                    {mode === "day" ? "Произвеждат" : "Не произвеждат"}
                  </text>
                </g>

                {/* Home */}
                <g>
                  <rect x="330" y="40" width="140" height="80" rx="8" className="fill-blue-50 stroke-blue-400" strokeWidth="2" />
                  <text x="400" y="75" textAnchor="middle" className="fill-blue-600 text-xs font-semibold" fontSize="13">
                    Вашият Дом
                  </text>
                  <text x="400" y="100" textAnchor="middle" className="fill-blue-400 text-xs" fontSize="11">
                    Консумация
                  </text>
                </g>

                {/* Grid */}
                <g>
                  <rect x="620" y="40" width="140" height="80" rx="8" className="fill-stone-100 stroke-stone-400" strokeWidth="2" />
                  <text x="690" y="75" textAnchor="middle" className="fill-stone-600 text-xs font-semibold" fontSize="13">
                    Ел. Мрежа
                  </text>
                  <text x="690" y="100" textAnchor="middle" className="fill-stone-400 text-xs" fontSize="11">
                    {mode === "day" ? "Получава" : "Доставя"}
                  </text>
                </g>

                {/* Meter */}
                <g>
                  <rect x="510" y="50" width="70" height="60" rx="6" className="fill-amber-50 stroke-amber-500" strokeWidth="2" />
                  <text x="545" y="77" textAnchor="middle" className="fill-amber-600 text-xs font-bold" fontSize="10">
                    МЕТЪР
                  </text>
                  <motion.text
                    x="545"
                    y="97"
                    textAnchor="middle"
                    className="fill-amber-500 text-xs"
                    fontSize="10"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {mode === "day" ? "→ →" : "← ←"}
                  </motion.text>
                </g>

                {/* Day arrows: Panels → Home + Home → Grid */}
                {mode === "day" && (
                  <>
                    <motion.line
                      x1="160" y1="80" x2="330" y2="80"
                      className="stroke-accent"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.polygon
                      points="325,72 340,80 325,88"
                      className="fill-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    />
                    <text x="245" y="72" textAnchor="middle" className="fill-accent/70 text-xs" fontSize="10">
                      Захранване
                    </text>

                    <motion.line
                      x1="470" y1="80" x2="510" y2="80"
                      className="stroke-accent/60"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <motion.line
                      x1="580" y1="80" x2="620" y2="80"
                      className="stroke-accent"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                    <motion.polygon
                      points="615,72 630,80 615,88"
                      className="fill-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    />
                    <text x="600" y="45" textAnchor="middle" className="fill-accent/70 text-xs" fontSize="10">
                      Излишък
                    </text>
                  </>
                )}

                {/* Night arrows: Grid → Home */}
                {mode === "night" && (
                  <>
                    <motion.line
                      x1="620" y1="80" x2="470" y2="80"
                      className="stroke-stone-400"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.polygon
                      points="475,72 460,80 475,88"
                      className="fill-stone-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    />
                    <text x="545" y="140" textAnchor="middle" className="fill-stone-400 text-xs" fontSize="10">
                      Покупка от мрежата
                    </text>

                    <motion.line
                      x1="160" y1="80" x2="330" y2="80"
                      className="stroke-stone-300"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ duration: 0.5 }}
                    />
                    <text x="245" y="72" textAnchor="middle" className="fill-stone-300 text-xs" fontSize="10">
                      Неактивни
                    </text>
                  </>
                )}

                {/* Net result */}
                <g>
                  <rect x="200" y="180" width="400" height="60" rx="12" className={mode === "day" ? "fill-accent/10 stroke-accent/30" : "fill-stone-100 stroke-stone-300"} strokeWidth="1.5" />
                  <text x="400" y="207" textAnchor="middle" className={mode === "day" ? "fill-accent" : "fill-stone-600"} fontSize="13" fontWeight="600">
                    {mode === "day"
                      ? "Нетен резултат: Произведено > Потребено → Кредит"
                      : "Нетен резултат: Потребено > Произведено → Дебит"}
                  </text>
                  <text x="400" y="227" textAnchor="middle" className="fill-foreground-secondary" fontSize="11">
                    Разликата се остойностява по пазарни цени в края на месеца
                  </text>
                </g>
              </svg>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. MARKET PRICING                                                  */
/* ------------------------------------------------------------------ */
function MarketPricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section ref={ref} className="bg-[#f8faf6] px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <BadgeChip variant="accent" className="mb-4">Пазар</BadgeChip>
        <TextReveal as="h2" className="editorial-display mb-4">
          Пазарни Цени
        </TextReveal>
        <motion.p
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-foreground-secondary"
        >
          Излишната енергия се изкупува по борсови цени, които варират значително
          между пиковите и извънпиковите часове.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2"
        >
          <motion.div variants={staggerItem}>
            <GlowCard className="h-full">
              <div className="p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                  <Sun className="size-4" /> Пикови часове
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">07:00 — 22:00</h3>
                <p className="mt-3 text-foreground-secondary leading-relaxed">
                  По-високо търсене, но и масово соларно производство, което през летните
                  месеци може да свали цените значително в обедните часове (12:00–16:00).
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">0.10–0.25</span>
                  <span className="text-sm text-foreground-secondary">лв./kWh</span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-stone-200">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "70%" } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlowCard className="h-full">
              <div className="p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  <Moon className="size-4" /> Извънпикови часове
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">22:00 — 07:00</h3>
                <p className="mt-3 text-foreground-secondary leading-relaxed">
                  Ниско търсене и липса на соларно производство. Цените са стабилни,
                  но обикновено по-ниски. Потреблението в тези часове идва от мрежата.
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">0.05–0.12</span>
                  <span className="text-sm text-foreground-secondary">лв./kWh</span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-stone-200">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "35%" } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>

        <motion.div
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <ArrowLeftRight className="mt-1 size-6 shrink-0 text-accent" />
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                Нетно салдо по пазарни цени
              </h4>
              <p className="mt-2 text-foreground-secondary leading-relaxed">
                При нетно отчитане разликата между внесената и изнесената енергия се остойностява
                по средна борсова цена за съответния час. Това означава, че стойността на вашия
                излишък зависи от <strong>кога</strong> го произвеждате, а не само <strong>колко</strong>.
                Оптимизацията на самопотреблението е ключова за максимална възвращаемост.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. FSES FEE                                                        */
/* ------------------------------------------------------------------ */
function FsesFeeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section ref={ref} className="bg-white px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <BadgeChip variant="default" className="mb-4">Регулация</BadgeChip>
        <TextReveal as="h2" className="editorial-display mb-4">
          ФСЕС — Фонд Сигурност на Електроенергийната Система
        </TextReveal>
        <motion.p
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-foreground-secondary"
        >
          Основният разход при нетно отчитане е таксата към ФСЕС — 5% от стойността
          на цялата произведена електроенергия.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <TiltCard className="rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]  md:items-center">
              <div className="text-center">
                <Zap className="mx-auto mb-3 size-8 text-accent" strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground-secondary">Общо производство</p>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">6 000 kWh</p>
                <p className="mt-1 text-xs text-foreground-secondary">годишно</p>
              </div>

              <div className="hidden text-3xl font-light text-stone-300 md:block">×</div>

              <div className="text-center">
                <Gauge className="mx-auto mb-3 size-8 text-amber-500" strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground-secondary">ФСЕС ставка</p>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">5%</p>
                <p className="mt-1 text-xs text-foreground-secondary">от стойността</p>
              </div>

              <div className="hidden text-3xl font-light text-stone-300 md:block">=</div>

              <div className="rounded-2xl bg-accent/10 p-6 text-center">
                <TrendingUp className="mx-auto mb-3 size-8 text-accent" strokeWidth={1.5} />
                <p className="text-sm font-medium text-accent">Годишна такса ФСЕС</p>
                <p className="mt-1 font-display text-3xl font-bold text-accent">~45 лв.</p>
                <p className="mt-1 text-xs text-accent/70">~3.75 лв./мес.</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 grid gap-6 sm:grid-cols-3"
        >
          <motion.div variants={staggerItem}>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
              <StatNumber value={5} suffix="%" context="от произведената стойност" className="text-4xl" />
            </div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
              <StatNumber value={45} suffix=" лв." context="типична годишна такса (5kWp)" className="text-4xl" />
            </div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
              <StatNumber value={90} suffix="%" context="от спестяванията остават за вас" className="text-4xl" />
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 text-center text-foreground-secondary"
        >
          Таксата се начислява върху цялото производство, не само върху излишъка.
          При 5 kWp система и средна борсова цена от 0.15 лв./kWh, годишният разход е минимален
          спрямо спестяванията от 1 500–2 000 лв.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. SELF-CONSUMPTION OPTIMIZATION (dark)                            */
/* ------------------------------------------------------------------ */
function SelfConsumptionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const scenarios = [
    {
      title: "Без батерия",
      percent: "40–50%",
      barWidth: "45%",
      color: "bg-stone-400",
      desc: "Излишъкът отива в мрежата по ниски дневни цени",
    },
    {
      title: "С батерия",
      percent: "70–85%",
      barWidth: "78%",
      color: "bg-accent",
      desc: "Съхранявате енергия за вечерта и намалявате покупката",
    },
    {
      title: "Батерия + Smart",
      percent: "85–95%",
      barWidth: "92%",
      color: "bg-emerald-400",
      desc: "Интелигентно управление оптимизира потреблението в реално време",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground px-6 py-24 text-white md:px-8 md:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <BadgeChip variant="hero" className="mb-4">Оптимизация</BadgeChip>
        <TextReveal as="h2" className="editorial-display text-white mb-4">
          Оптимизация на самопотреблението
        </TextReveal>
        <motion.p
          variants={blurIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-white/60"
        >
          Колкото повече енергия потребявате директно, толкова по-малко зависите от
          пазарните цени при продажба на излишъка.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* SVG Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <svg
              viewBox="0 0 400 340"
              className="w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="130" y="10" width="140" height="60" rx="10" className="fill-accent/20 stroke-accent/50" strokeWidth="1.5" />
              <text x="200" y="35" textAnchor="middle" className="fill-accent" fontSize="12" fontWeight="600">Соларни Панели</text>
              <text x="200" y="55" textAnchor="middle" className="fill-accent/60" fontSize="10">Производство</text>

              <rect x="20" y="150" width="120" height="60" rx="10" className="fill-blue-500/20 stroke-blue-400/50" strokeWidth="1.5" />
              <text x="80" y="175" textAnchor="middle" className="fill-blue-400" fontSize="12" fontWeight="600">Дом</text>
              <text x="80" y="195" textAnchor="middle" className="fill-blue-400/60" fontSize="10">Потребление</text>

              <rect x="260" y="150" width="120" height="60" rx="10" className="fill-amber-500/20 stroke-amber-400/50" strokeWidth="1.5" />
              <text x="320" y="175" textAnchor="middle" className="fill-amber-400" fontSize="12" fontWeight="600">Батерия</text>
              <text x="320" y="195" textAnchor="middle" className="fill-amber-400/60" fontSize="10">Съхранение</text>

              <rect x="130" y="270" width="140" height="60" rx="10" className="fill-white/10 stroke-white/20" strokeWidth="1.5" />
              <text x="200" y="295" textAnchor="middle" className="fill-white/60" fontSize="12" fontWeight="600">Ел. Мрежа</text>
              <text x="200" y="315" textAnchor="middle" className="fill-white/30" fontSize="10">Минимален износ</text>

              {/* Arrows */}
              <motion.path
                d="M170 70 L100 150"
                className="stroke-accent"
                strokeWidth="2"
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.path
                d="M230 70 L300 150"
                className="stroke-amber-400"
                strokeWidth="2"
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.path
                d="M260 180 L140 180"
                className="stroke-blue-400"
                strokeWidth="2"
                strokeDasharray="6 3"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <motion.path
                d="M200 70 L200 270"
                className="stroke-white/20"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </svg>
          </motion.div>

          {/* Scenarios */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center gap-6"
          >
            {scenarios.map((s) => (
              <motion.div
                key={s.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Battery className="size-5 text-white/60" />
                    <h4 className="font-display text-lg font-semibold">{s.title}</h4>
                  </div>
                  <span className="font-display text-2xl font-bold text-accent">{s.percent}</span>
                </div>
                <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${s.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: s.barWidth } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                </div>
                <p className="text-sm text-white/50">{s.desc}</p>
              </motion.div>
            ))}

            <p className="mt-2 text-sm text-white/40">
              Самопотребление = % от произведената енергия, използвана директно в домакинството
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. FAQ + CTA                                                       */
/* ------------------------------------------------------------------ */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl">
        <TextReveal as="h2" className="editorial-display mb-12 text-center">
          Често задавани въпроси
        </TextReveal>

        <div className="divide-y divide-stone-200">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between py-5 text-left font-semibold text-foreground transition-colors hover:text-accent"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-foreground-secondary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 leading-relaxed text-foreground-secondary">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <MagneticButton href="/kontakti" variant="outline" size="lg">
            Имате друг въпрос?
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT                                                        */
/* ------------------------------------------------------------------ */
export function NetnoMeteringContent() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <TwoWayMeterSection />
      <MarketPricingSection />
      <FsesFeeSection />
      <SelfConsumptionSection />
      <FaqSection />
      <SolutionCTA />
    </main>
  );
}
