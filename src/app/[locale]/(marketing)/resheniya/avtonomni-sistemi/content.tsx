"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  BatteryCharging,
  Zap,
  Sun,
  Shield,
  Mountain,
  Radio,
  Tractor,
  TrendingUp,
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
    title: "Пълна независимост",
    desc: "Нулева зависимост от мрежата и ценовите промени. Вашата енергия е изцяло под ваш контрол.",
  },
  {
    icon: Zap,
    title: "Надеждност",
    desc: "99.9% uptime с автоматично превключване. Без прекъсвания дори при екстремни условия.",
  },
  {
    icon: Mountain,
    title: "Отдалечени локации",
    desc: "Идеално решение за планински къщи, ферми и обекти без достъп до електрическата мрежа.",
  },
  {
    icon: BatteryCharging,
    title: "Резервно захранване",
    desc: "3–7 дни автономия без слънце. LiFePO₄ батерии с 6000+ цикъла и 15+ години живот.",
  },
];

const useCases = [
  {
    icon: Mountain,
    title: "Планинска къща",
    desc: "Пълна автономия за ваканционен или постоянен имот в планината. Осветление, отопление, готвене — без компромиси.",
    specs: ["5–10 kWp панели", "20–40 kWh батерия", "5–7 дни автономия"],
  },
  {
    icon: Radio,
    title: "Телекомуникации",
    desc: "Непрекъсваемо захранване за телекомуникационни кули, повторители и отдалечени станции.",
    specs: ["3–5 kWp панели", "10–20 kWh батерия", "99.99% uptime"],
  },
  {
    icon: Tractor,
    title: "Земеделско стопанство",
    desc: "Захранване на помпи за напояване, охладителни системи и електрически огради без мрежов достъп.",
    specs: ["10–30 kWp панели", "30–60 kWh батерия", "Сезонна оптимизация"],
  },
];

const autonomyData = [
  { label: "5 kWh", days: 1, width: "14%" },
  { label: "10 kWh", days: 2, width: "28%" },
  { label: "20 kWh", days: 3, width: "43%" },
  { label: "30 kWh", days: 5, width: "71%" },
  { label: "50 kWh", days: 7, width: "100%" },
];

const faqs = [
  {
    q: "Колко издържат батериите на автономна система?",
    a: "LiFePO₄ батериите имат живот от 6000+ цикъла, което означава 15–20 години при ежедневна употреба. След този период запазват над 80% от капацитета си.",
  },
  {
    q: "Как работи системата през зимата?",
    a: "През зимата соларното производство е по-ниско, но правилно оразмерена система компенсира с по-голям батериен масив. При нужда може да се добави резервен генератор за екстремни периоди.",
  },
  {
    q: "Каква поддръжка изисква off-grid системата?",
    a: "Минимална — почистване на панелите 2–3 пъти годишно и проверка на батерийните връзки. Системата има вграден мониторинг, който предупреждава при нередности.",
  },
  {
    q: "Може ли да добавя мрежова връзка по-късно?",
    a: "Да. Хибридните инвертори позволяват бъдещо свързване към мрежата без подмяна на оборудването. Това превръща off-grid системата в хибридна.",
  },
  {
    q: "Как се оразмерява автономна система?",
    a: "Изчисляваме дневната консумация в kWh, умножаваме по желаните дни автономия и добавяме 20% резерв. Панелите се оразмеряват спрямо средногодишната инсолация за региона.",
  },
];

export function AvtonomniSistemiContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const archRef = useRef<HTMLElement>(null);
  const archInView = useInView(archRef, { once: true, margin: "0px 0px -15% 0px" });
  const sizingRef = useRef<HTMLElement>(null);
  const sizingInView = useInView(sizingRef, { once: true, margin: "0px 0px -15% 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-hidden">
      {/* ─── 1. HERO ─── */}
      <section ref={heroRef} className="relative flex min-h-screen items-end">
        <ImageEditorial
          src={SOLUTION_IMAGES.avtonomniSistemi}
          alt="Автономна соларна система с батерии"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-8 md:pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <BadgeChip variant="hero">Off-Grid Системи</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="editorial-hero mt-6 max-w-4xl text-white">
            Пълна Енергийна Независимост
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            100% автономност. 3–7 дни без слънце. 99.9% uptime.
          </motion.p>
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <StatNumber
              value={100}
              suffix="%"
              context="Независимост"
              className="text-5xl text-white md:text-6xl"
              contextClassName="text-white/50"
            />
            <StatNumber
              value={7}
              suffix=" дни"
              context="Автономия"
              className="text-5xl text-white md:text-6xl"
              contextClassName="text-white/50"
            />
            <StatNumber
              value={99.9}
              suffix="%"
              context="Uptime"
              className="text-5xl text-accent md:text-6xl"
              contextClassName="text-accent/60"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── 2. WHY OFF-GRID ─── */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <TextReveal as="h2" className="editorial-display mb-6">
                Защо off-grid?
              </TextReveal>
              <p className="text-lg leading-relaxed text-foreground-secondary mb-6">
                В отдалечени райони електрическата мрежа е ненадеждна или
                напълно липсва. Прекъсванията са чести, а свързването — скъпо
                и бавно. Off-grid системите дават пълен контрол над енергията.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                С модерните LiFePO₄ батерии и високоефективни панели,
                автономните системи вече осигуряват комфорт, равен на мрежовия
                — без месечни сметки и без зависимост от доставчик.
              </p>
            </div>
            <motion.div
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <svg viewBox="0 0 320 240" className="w-full max-w-md" fill="none">
                <rect x="20" y="40" width="120" height="80" rx="12" className="fill-red-100 stroke-red-300" strokeWidth="1.5" />
                <text x="80" y="72" textAnchor="middle" className="fill-red-500 text-[11px] font-semibold">Мрежа</text>
                <text x="80" y="90" textAnchor="middle" className="fill-red-400 text-[9px]">Нестабилна</text>
                <text x="80" y="105" textAnchor="middle" className="fill-red-400 text-[9px]">Скъпа връзка</text>
                <line x1="140" y1="80" x2="180" y2="80" className="stroke-stone-300" strokeWidth="2" strokeDasharray="6 4" />
                <text x="160" y="72" textAnchor="middle" className="fill-stone-400 text-[9px]">✕</text>
                <rect x="180" y="40" width="120" height="80" rx="12" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
                <text x="240" y="72" textAnchor="middle" className="fill-accent text-[11px] font-semibold">Off-Grid</text>
                <text x="240" y="90" textAnchor="middle" className="fill-accent/70 text-[9px]">100% автономия</text>
                <text x="240" y="105" textAnchor="middle" className="fill-accent/70 text-[9px]">0 лв./мес.</text>
                <circle cx="240" cy="170" r="30" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
                <text x="240" y="168" textAnchor="middle" className="fill-accent text-[10px] font-bold">☀</text>
                <text x="240" y="182" textAnchor="middle" className="fill-accent/70 text-[8px]">Свободна</text>
                <text x="240" y="192" textAnchor="middle" className="fill-accent/70 text-[8px]">енергия</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. OFF-GRID ARCHITECTURE ─── */}
      <section ref={archRef} className="bg-[#f8faf6] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="editorial-display text-center mb-6">
            Архитектура на Системата
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={archInView ? "visible" : "hidden"}
            className="text-center text-lg text-foreground-secondary mb-16 max-w-2xl mx-auto"
          >
            Четири ключови компонента, проектирани да работят безотказно заедно
          </motion.p>

          <motion.div
            variants={blurIn}
            initial="hidden"
            animate={archInView ? "visible" : "hidden"}
            className="mb-16 flex justify-center"
          >
            <svg viewBox="0 0 700 100" className="w-full max-w-3xl" fill="none">
              <rect x="0" y="20" width="130" height="60" rx="10" className="fill-amber-50 stroke-amber-400" strokeWidth="1.5" />
              <text x="65" y="46" textAnchor="middle" className="fill-amber-600 text-[11px] font-semibold">☀ Панели</text>
              <text x="65" y="62" textAnchor="middle" className="fill-amber-500/70 text-[9px]">DC производство</text>
              <line x1="130" y1="50" x2="175" y2="50" className="stroke-stone-300" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="175" y="20" width="130" height="60" rx="10" className="fill-sky-50 stroke-sky-400" strokeWidth="1.5" />
              <text x="240" y="46" textAnchor="middle" className="fill-sky-600 text-[11px] font-semibold">⚡ Контролер</text>
              <text x="240" y="62" textAnchor="middle" className="fill-sky-500/70 text-[9px]">MPPT регулация</text>
              <line x1="305" y1="50" x2="350" y2="50" className="stroke-stone-300" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="350" y="20" width="130" height="60" rx="10" className="fill-emerald-50 stroke-emerald-400" strokeWidth="1.5" />
              <text x="415" y="46" textAnchor="middle" className="fill-emerald-600 text-[11px] font-semibold">🔋 Батерия</text>
              <text x="415" y="62" textAnchor="middle" className="fill-emerald-500/70 text-[9px]">LiFePO₄ масив</text>
              <line x1="480" y1="50" x2="525" y2="50" className="stroke-stone-300" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="525" y="20" width="160" height="60" rx="10" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
              <text x="605" y="46" textAnchor="middle" className="fill-accent text-[11px] font-semibold">🏠 Инвертор → Товари</text>
              <text x="605" y="62" textAnchor="middle" className="fill-accent/70 text-[9px]">AC консуматори</text>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-stone-400" />
                </marker>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { title: "Соларни панели", spec: "Моно, 400–550 Wp", desc: "Преобразуват слънчевата светлина в постоянен ток. Основният енергиен източник." },
              { title: "MPPT контролер", spec: "98%+ ефективност", desc: "Регулира зареждането от панелите. Извлича максимална мощност при всякакви условия." },
              { title: "LiFePO₄ батерия", spec: "5–50 kWh, 6000+ цикъла", desc: "Съхранява енергия за нощта и облачните дни. Най-надеждната батерийна технология." },
              { title: "Хибриден инвертор", spec: "3–15 kW, 48V–400V", desc: "Преобразува DC в AC и управлява целия енергиен поток. Работи и при нулева мрежа." },
            ].map((comp) => (
              <motion.div key={comp.title} variants={staggerItem}>
                <GlowCard className="h-full">
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold mb-1">{comp.title}</h3>
                    <p className="text-xs text-accent font-medium mb-3">{comp.spec}</p>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{comp.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 4. BENEFITS ─── */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="editorial-display text-center mb-16">
            Предимства на Off-Grid
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={staggerItem}>
                <TiltCard className="h-full rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-10">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-accent/10">
                    <b.icon className="size-7 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="editorial-heading text-xl mb-3">{b.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{b.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 5. USE CASES (DARK) ─── */}
      <section className="bg-foreground px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="editorial-display text-white text-center mb-6">
            Сценарии за Използване
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-white/50 text-lg mb-16 max-w-2xl mx-auto"
          >
            Off-grid системите са идеални навсякъде, където мрежата е ненадеждна или липсва
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {useCases.map((uc) => (
              <motion.div key={uc.title} variants={staggerItem}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <uc.icon className="size-10 text-accent mb-5" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold mb-3">{uc.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{uc.desc}</p>
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    {uc.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-sm text-white/70">
                        <ArrowRight className="size-3 text-accent shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 6. AUTONOMY SIZING ─── */}
      <section ref={sizingRef} className="bg-[#f8faf6] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <TextReveal as="h2" className="editorial-display text-center mb-6">
            Колко дни автономия имате?
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={sizingInView ? "visible" : "hidden"}
            className="text-center text-lg text-foreground-secondary mb-16 max-w-2xl mx-auto"
          >
            Продължителността зависи от размера на батерийния масив и дневната консумация
          </motion.p>

          <motion.div
            variants={blurIn}
            initial="hidden"
            animate={sizingInView ? "visible" : "hidden"}
            className="rounded-3xl border border-stone-200 bg-white p-8 md:p-12 shadow-lg mb-12"
          >
            <p className="text-sm uppercase tracking-widest text-foreground-tertiary mb-8 text-center">
              Дни автономия при средна консумация 7 kWh/ден
            </p>
            <div className="space-y-5">
              {autonomyData.map((row) => (
                <div key={row.label} className="flex items-center gap-4">
                  <span className="w-16 text-right text-sm font-semibold text-foreground-secondary shrink-0">
                    {row.label}
                  </span>
                  <div className="flex-1 h-10 rounded-full bg-stone-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 flex items-center justify-end pr-3"
                      initial={{ width: 0 }}
                      animate={sizingInView ? { width: row.width } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-xs font-bold text-white whitespace-nowrap">
                        {row.days} {row.days === 1 ? "ден" : "дни"}
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={sizingInView ? "visible" : "hidden"}
            className="grid gap-6 md:grid-cols-3"
          >
            <motion.div variants={staggerItem} className="text-center">
              <StatNumber value={48} suffix="V–400V" context="Системно напрежение" className="text-4xl" />
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <StatNumber value={6000} suffix="+" context="Цикъла на батерия" className="text-4xl" />
            </motion.div>
            <motion.div variants={staggerItem} className="text-center">
              <StatNumber value={15} suffix=" г." context="Живот на батерия" className="text-4xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 7. FAQ ─── */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl">
          <TextReveal as="h2" className="editorial-display text-center mb-12">
            Често задавани въпроси
          </TextReveal>
          <div className="divide-y divide-stone-200">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between py-5 text-left font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-foreground-tertiary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
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
        </div>
      </section>

      {/* ─── 8. SHARED SECTIONS ─── */}
      <SolutionPageProjects />
      <RelatedSolutions currentSolutionId="avtonomni-sistemi" />
      <SolutionCTA />
    </main>
  );
}
