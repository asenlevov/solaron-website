"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  Car,
  Zap,
  Sun,
  Shield,
  PlugZap,
  TrendingUp,
  ParkingCircle,
  ArrowRight,
} from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import {
  SolutionPageProjects,
  RelatedSolutions,
  SolutionCTA,
} from "@/components/marketing/solution-page-shared";
import { SOLUTION_IMAGES } from "@/data/images";
import { blurIn, staggerContainer, staggerItem } from "@/lib/animations";

const benefits = [
  {
    icon: Shield,
    title: "Защита на МПС",
    desc: "Алуминиевата конструкция предпазва автомобилите от слънце, градушка и дъжд — целогодишно.",
  },
  {
    icon: Sun,
    title: "Чиста Енергия",
    desc: "Бифациалните панели произвеждат до 25% повече енергия от стандартните, използвайки отразена светлина.",
  },
  {
    icon: PlugZap,
    title: "EV Зареждане",
    desc: "Интегрирани зарядни станции за електрически автомобили — захранвани директно от карпорта.",
  },
  {
    icon: TrendingUp,
    title: "Допълнителен Приход",
    desc: "Двоен приход: таксуване за паркиране и продажба на излишна енергия на мрежата.",
  },
];

const techCards = [
  {
    title: "Алуминиева конструкция",
    desc: "IP65 защита, 25+ години живот. Без корозия, без поддръжка.",
  },
  {
    title: "Бифациални панели",
    desc: "До 25% повече добив благодарение на двустранно усвояване на светлината.",
  },
  {
    title: "EV зареждане",
    desc: "AC/DC зарядни станции, интегрирани в конструкцията от фаза проектиране.",
  },
  {
    title: "Мониторинг",
    desc: "Реално време следене на производство, потребление и приходи от EV зареждане.",
  },
];

const chargerTypes = [
  {
    name: "AC Wallbox",
    power: "7–22 kW",
    time: "4–8 часа",
    use: "Служители, дълго паркиране",
  },
  {
    name: "DC Fast Charger",
    power: "50–150 kW",
    time: "20–40 мин.",
    use: "Публични станции, търговски обекти",
  },
  {
    name: "Ultra-Fast DC",
    power: "150–350 kW",
    time: "10–20 мин.",
    use: "Магистрални хъбове, флотови бази",
  },
];

const faqs = [
  {
    q: "Какви са структурните изисквания за монтаж?",
    a: "Необходима е равна бетонна или асфалтова основа с минимална носеща способност 2.5 kN/m². Конструкцията е самоносеща — не се нуждае от допълнителни фундаменти в повечето случаи.",
  },
  {
    q: "Как се интегрира EV зареждането?",
    a: "Зарядните станции се вграждат директно в колоните на конструкцията. Окабеляването минава вътре в алуминиевите профили. Всяка станция може да се управлява отделно чрез облачна платформа.",
  },
  {
    q: "Какъв е срокът за възвръщаемост на инвестицията?",
    a: "При комбиниран модел (паркиране + енергия + EV зареждане) типичният срок за ROI е 5–7 години. С публични EV станции срокът може да се съкрати до 4–5 години.",
  },
  {
    q: "Издържа ли конструкцията на силен вятър?",
    a: "Конструкцията е проектирана за ветрово натоварване до 160 km/h (зона III по Еврокод). Допълнително се изчислява за конкретната локация и височина.",
  },
  {
    q: "Какви разрешителни са необходими?",
    a: "За карпорти над 200 m² е необходимо разрешение за строеж. Ние управляваме целия процес — от проектиране до получаване на Акт 16.",
  },
];

export function SolarenKarportContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const dualRef = useRef<HTMLElement>(null);
  const dualInView = useInView(dualRef, { once: true, margin: "0px 0px -15% 0px" });
  const techRef = useRef<HTMLElement>(null);
  const techInView = useInView(techRef, { once: true, margin: "0px 0px -15% 0px" });
  const benefitsRef = useRef<HTMLElement>(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "0px 0px -15% 0px" });
  const evRef = useRef<HTMLElement>(null);
  const evInView = useInView(evRef, { once: true, margin: "0px 0px -15% 0px" });
  const revenueRef = useRef<HTMLElement>(null);
  const revenueInView = useInView(revenueRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative flex min-h-screen items-center">
        <ImageEditorial
          src={SOLUTION_IMAGES.solarenKarport}
          alt="Соларен карпорт — 270 kWp референтен проект"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BadgeChip variant="hero">Соларен Карпорт</BadgeChip>
          </motion.div>

          <TextReveal as="h1" className="editorial-hero mt-6 max-w-3xl text-white">
            Вашият Паркинг, Вашата Централа
          </TextReveal>

          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            Двоен приход — от паркиране и от чиста енергия.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap gap-6"
          >
            {[
              { value: 270, suffix: " kWp", context: "Референтен проект" },
              { value: 12, suffix: "+", context: "Паркоместа" },
              { value: 100, suffix: "%", context: "IP65 Защита" },
            ].map((s) => (
              <motion.div
                key={s.context}
                variants={staggerItem}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-5 backdrop-blur-md"
              >
                <StatNumber
                  value={s.value}
                  suffix={s.suffix}
                  context={s.context}
                  className="text-4xl text-white md:text-5xl"
                  contextClassName="text-white/50"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. DUAL-PURPOSE VALUE PROP ── */}
      <section ref={dualRef} className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={dualInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <BadgeChip variant="accent" className="mb-4">
                Двойна функция
              </BadgeChip>
              <h2 className="editorial-display">Паркинг + Енергия</h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-stone-600">
                Соларният карпорт превръща всеки квадратен метър паркинг в
                източник на приход. Конструкцията защитава автомобилите от
                атмосферни условия, а панелите на покрива произвеждат чиста
                електроенергия — за собствено потребление или продажба на мрежата.
              </p>
              <p className="mt-4 text-stone-500 leading-relaxed">
                С интегрирани EV зарядни станции карпортът става пълноценен
                енергиен хъб — паркиране, зареждане и производство на едно място.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={dualInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex justify-center"
            >
              <svg viewBox="0 0 400 260" className="w-full max-w-md" aria-label="Напречен разрез на соларен карпорт">
                {/* Ground */}
                <rect x="20" y="220" width="360" height="4" rx="2" fill="#d6d3d1" />
                {/* Left column */}
                <rect x="60" y="80" width="8" height="140" rx="2" fill="#78716c" />
                {/* Right column */}
                <rect x="332" y="80" width="8" height="140" rx="2" fill="#78716c" />
                {/* Beam */}
                <rect x="50" y="72" width="300" height="10" rx="3" fill="#a8a29e" />
                {/* Solar panels */}
                <rect x="55" y="58" width="70" height="14" rx="2" fill="#3B7A2A" opacity={0.85} />
                <rect x="130" y="58" width="70" height="14" rx="2" fill="#3B7A2A" opacity={0.85} />
                <rect x="205" y="58" width="70" height="14" rx="2" fill="#3B7A2A" opacity={0.85} />
                <rect x="280" y="58" width="70" height="14" rx="2" fill="#3B7A2A" opacity={0.85} />
                {/* Sun rays */}
                <circle cx="200" cy="20" r="12" fill="#facc15" opacity={0.7} />
                <line x1="200" y1="4" x2="200" y2="0" stroke="#facc15" strokeWidth="2" opacity={0.5} />
                <line x1="214" y1="8" x2="218" y2="4" stroke="#facc15" strokeWidth="2" opacity={0.5} />
                <line x1="186" y1="8" x2="182" y2="4" stroke="#facc15" strokeWidth="2" opacity={0.5} />
                {/* Car silhouette */}
                <rect x="120" y="180" width="80" height="35" rx="6" fill="#78716c" opacity={0.3} />
                <rect x="130" y="170" width="60" height="14" rx="4" fill="#78716c" opacity={0.25} />
                <circle cx="140" cy="218" r="7" fill="#57534e" opacity={0.3} />
                <circle cx="185" cy="218" r="7" fill="#57534e" opacity={0.3} />
                {/* EV charger */}
                <rect x="310" y="150" width="16" height="65" rx="3" fill="#3B7A2A" opacity={0.6} />
                <rect x="313" y="155" width="10" height="8" rx="1" fill="#fff" opacity={0.7} />
                {/* Labels */}
                <text x="90" y="50" fill="#3B7A2A" fontSize="10" fontWeight="600">Соларни панели</text>
                <text x="80" y="140" fill="#78716c" fontSize="9">Конструкция</text>
                <text x="135" y="250" fill="#78716c" fontSize="9">Паркиране</text>
                <text x="300" y="145" fill="#3B7A2A" fontSize="9">EV зареждане</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. TECHNICAL DIAGRAM ── */}
      <section ref={techRef} className="bg-[#f8faf6] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <BadgeChip variant="accent" className="mb-4">
              Технология
            </BadgeChip>
            <h2 className="editorial-display">Инженерно Решение</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-500">
              Всеки компонент е проектиран за максимална ефективност и дълготрайност.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-16 flex justify-center"
          >
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" aria-label="Техническа схема на карпорт конструкция">
              {/* Foundation */}
              <rect x="30" y="170" width="540" height="6" rx="3" fill="#d6d3d1" />
              {/* Left foundation block */}
              <rect x="70" y="160" width="24" height="16" rx="2" fill="#a8a29e" />
              {/* Right foundation block */}
              <rect x="506" y="160" width="24" height="16" rx="2" fill="#a8a29e" />
              {/* Left column */}
              <rect x="78" y="55" width="8" height="105" fill="#78716c" />
              {/* Right column */}
              <rect x="514" y="55" width="8" height="105" fill="#78716c" />
              {/* Top beam / rail */}
              <rect x="70" y="48" width="460" height="8" rx="2" fill="#57534e" />
              {/* Panel modules */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <rect x={80 + i * 75} y="32" width="68" height="16" rx="2" fill="#3B7A2A" opacity={0.8} />
                  <line x1={80 + i * 75 + 22} y1="32" x2={80 + i * 75 + 22} y2="48" stroke="#2d6320" strokeWidth="0.5" opacity={0.4} />
                  <line x1={80 + i * 75 + 45} y1="32" x2={80 + i * 75 + 45} y2="48" stroke="#2d6320" strokeWidth="0.5" opacity={0.4} />
                </g>
              ))}
              {/* Dimension lines */}
              <line x1="78" y1="185" x2="522" y2="185" stroke="#3B7A2A" strokeWidth="1" strokeDasharray="4,3" />
              <text x="280" y="198" fill="#3B7A2A" fontSize="10" textAnchor="middle" fontWeight="600">6–8 м (двуредов)</text>
              <line x1="555" y1="48" x2="555" y2="170" stroke="#78716c" strokeWidth="1" strokeDasharray="4,3" />
              <text x="570" y="115" fill="#78716c" fontSize="9" textAnchor="start" transform="rotate(90,570,115)">3 м</text>
            </svg>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {techCards.map((card) => (
              <motion.div key={card.title} variants={staggerItem}>
                <GlowCard>
                  <div className="p-6">
                    <h3 className="editorial-heading text-lg">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">{card.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. BENEFITS ── */}
      <section ref={benefitsRef} className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="editorial-display">Предимства</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-stone-500">
              Четири причини да изберете соларен карпорт за вашия бизнес.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            className="grid gap-6 sm:grid-cols-2"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={staggerItem}>
                <TiltCard className="h-full rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-10">
                  <b.icon className="mb-4 size-10 text-accent" strokeWidth={1.5} />
                  <h3 className="editorial-heading">{b.title}</h3>
                  <p className="mt-2 text-stone-600 leading-relaxed">{b.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. EV CHARGING INTEGRATION (dark) ── */}
      <section ref={evRef} className="relative bg-foreground py-24 text-white md:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:url('/grain.png')]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <BadgeChip variant="hero" className="mb-4">
              <PlugZap className="size-4" /> EV Интеграция
            </BadgeChip>
            <h2 className="editorial-display text-white">
              Зареждане от Слънцето
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              Интегрирайте зарядни станции директно в конструкцията на карпорта.
              Енергията идва от панелите на покрива — без допълнителен товар върху
              мрежата.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={evInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-3"
          >
            {chargerTypes.map((ch) => (
              <motion.div
                key={ch.name}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <Zap className="mb-4 size-8 text-accent" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold">{ch.name}</h3>
                <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Мощност</span>
                    <span className="font-semibold text-accent">{ch.power}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Време за зареждане</span>
                    <span className="font-semibold">{ch.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Приложение</span>
                    <span className="text-right text-white/70">{ch.use}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. REVENUE MODEL ── */}
      <section ref={revenueRef} className="bg-[#f8faf6] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <BadgeChip variant="accent" className="mb-4">
              Финансов модел
            </BadgeChip>
            <h2 className="editorial-display">Двоен Приход</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-500">
              Комбинацията от паркиране и чиста енергия създава устойчив бизнес модел
              с ускорена възвръщаемост.
            </p>
          </div>

          <div className="grid items-stretch gap-8 md:grid-cols-2">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={revenueInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-3xl border border-stone-200 bg-white p-8 md:p-10"
            >
              <p className="editorial-overline mb-6 text-stone-400">Обикновен паркинг</p>
              <div className="flex-1 space-y-4">
                <div className="rounded-xl bg-stone-100 p-5 text-center">
                  <p className="text-sm text-stone-500 mb-1">Приход</p>
                  <p className="editorial-stat text-3xl text-stone-400">Само паркиране</p>
                </div>
                <div className="rounded-xl bg-stone-100 p-5 text-center">
                  <p className="text-sm text-stone-500 mb-1">Разходи за ток</p>
                  <p className="editorial-stat text-3xl text-red-400">100%</p>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={revenueInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-10"
            >
              <p className="editorial-overline mb-6 text-accent">Соларен карпорт</p>
              <div className="flex-1 space-y-4">
                <div className="rounded-xl bg-accent/10 p-5 text-center">
                  <StatNumber
                    value={270}
                    suffix=" kWp"
                    context="Инсталирана мощност"
                    className="text-3xl text-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-accent/10 p-5 text-center">
                    <StatNumber
                      value={324}
                      suffix=" MWh"
                      context="Годишно производство"
                      className="text-2xl text-accent"
                    />
                  </div>
                  <div className="rounded-xl bg-accent/10 p-5 text-center">
                    <StatNumber
                      value={58}
                      suffix=" хил."
                      context="лв. спестявания/год."
                      className="text-2xl text-accent"
                    />
                  </div>
                </div>
                <div className="rounded-xl bg-accent/10 p-5 text-center">
                  <p className="text-sm text-accent/70 mb-1">ROI</p>
                  <p className="editorial-stat text-3xl text-accent">5–7 години</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="editorial-display mb-12 text-center">
            Често Задавани Въпроси
          </h2>
          <div className="divide-y divide-stone-200">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between py-5 text-left font-semibold text-stone-900 transition-colors hover:text-accent"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-stone-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-8 leading-relaxed text-stone-600">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. SHARED SECTIONS ── */}
      <SolutionPageProjects />
      <RelatedSolutions currentSolutionId="solaren-karport" />
      <SolutionCTA />
    </main>
  );
}
