"use client";

import Image from "next/image";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { ProductPageProjects, RelatedProducts } from "@/components/marketing/product-page-shared";
import { PRODUCT_IMAGES, REAL_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  blurIn,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  createStagger,
  scaleSpring,
} from "@/lib/animations";
import { ArrowRight, Zap, Shield, Wifi, BarChart3, ChevronDown, Star, DollarSign, Cpu, Battery } from "lucide-react";
import { useState } from "react";

type BrandKey = "solaredge" | "kstar" | "deye";

const brands: Record<BrandKey, {
  name: string;
  tagline: string;
  badge: string;
  positioning: string;
  description: string;
  logo: string;
  accent: string;
  stats: { value: number; suffix: string; context: string }[];
  models: { model: string; power: string; efficiency: string; weight: string; phases: string; warranty: string }[];
  highlights: { title: string; desc: string; icon: typeof Zap }[];
  useCase: string;
}> = {
  solaredge: {
    name: "SolarEdge",
    tagline: "HD-Wave технология. 99.2% ефективност. Пълен контрол.",
    badge: "Най-високо качество",
    positioning: "Премиум инвертори с панелно ниво мониторинг и оптимизация — индустриалният стандарт за максимална производителност и безопасност.",
    description: "SolarEdge е глобалният лидер в интелигентните енергийни решения. HD-Wave инверторите предлагат 99.2% ефективност, SafeDC™ безопасност и панелно ниво мониторинг чрез оптимизатори P950.",
    logo: REAL_IMAGES.partners.solaredge,
    accent: "text-[#E31937]",
    stats: [
      { value: 99.2, suffix: "%", context: "Ефективност" },
      { value: 10, suffix: " kW", context: "Макс. мощност" },
      { value: 12, suffix: " г.", context: "Гаранция" },
    ],
    models: [
      { model: "SE3000H", power: "3 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
      { model: "SE5000H", power: "5 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
      { model: "SE6000H", power: "6 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
      { model: "SE8K", power: "8 kW", efficiency: "99.0%", weight: "15.2 kg", phases: "3Ф", warranty: "12 г." },
      { model: "SE10K", power: "10 kW", efficiency: "99.0%", weight: "15.2 kg", phases: "3Ф", warranty: "12 г." },
    ],
    highlights: [
      { title: "99.2% ефективност", desc: "Минимални загуби — повече ток достига до дома ви.", icon: Zap },
      { title: "SafeDC™ безопасност", desc: "Автоматично понижава напрежението при аварийни ситуации.", icon: Shield },
      { title: "Панелно ниво мониторинг", desc: "Пълна видимост на всеки панел чрез облачната платформа.", icon: Wifi },
      { title: "25 г. аналитика", desc: "Пълна историческа аналитика за производство и потребление.", icon: BarChart3 },
    ],
    useCase: "Препоръчваме за клиенти, които искат най-високата ефективност и пълен контрол над всеки панел.",
  },
  kstar: {
    name: "Kstar",
    tagline: "All-in-one системи. CATL клетки. Елегантен дизайн.",
    badge: "Над средното ниво",
    positioning: "All-in-one хибридни решения с интегрирано съхранение, CATL литиево-желязо-фосфатни клетки и модерен дизайн — над средното ниво качество.",
    description: "Kstar BluE-S серията предлага all-in-one хибридни системи с интегрирани CATL LFP батерии. Модулният дизайн позволява инсталация за 30 минути, IP65 защита и до 10 000 цикъла на батерията.",
    logo: REAL_IMAGES.partners.kstar,
    accent: "text-[#004B87]",
    stats: [
      { value: 97.6, suffix: "%", context: "Ефективност" },
      { value: 12, suffix: " kW", context: "Макс. мощност" },
      { value: 10, suffix: " г.", context: "Гаранция" },
    ],
    models: [
      { model: "BluE-S 3680D", power: "3.68 kW", efficiency: "97.6%", weight: "28 kg", phases: "1Ф", warranty: "10 г." },
      { model: "BluE-S 5000D", power: "5 kW", efficiency: "97.6%", weight: "28 kg", phases: "1Ф", warranty: "10 г." },
      { model: "BluE-S 6000D", power: "6 kW", efficiency: "97.6%", weight: "30 kg", phases: "1Ф", warranty: "10 г." },
      { model: "BluE-E8KT", power: "8 kW", efficiency: "97.5%", weight: "35 kg", phases: "3Ф", warranty: "10 г." },
      { model: "BluE-E10KT", power: "10 kW", efficiency: "97.5%", weight: "37 kg", phases: "3Ф", warranty: "10 г." },
      { model: "BluE-E12KT", power: "12 kW", efficiency: "97.5%", weight: "40 kg", phases: "3Ф", warranty: "10 г." },
    ],
    highlights: [
      { title: "CATL LFP клетки", desc: "10 000+ цикъла с тройна защита на модулно, пакетно и системно ниво.", icon: Battery },
      { title: "All-in-one дизайн", desc: "Инвертор + батерия в едно устройство — монтаж за 30 минути.", icon: Cpu },
      { title: "IP65 защита", desc: "Подходящ за външен монтаж — устойчив на вода и прах.", icon: Shield },
      { title: "SOLARMAN мониторинг", desc: "Дистанционен достъп и контрол чрез мобилно приложение.", icon: Wifi },
    ],
    useCase: "Идеален за клиенти, които искат цялостно решение (инвертор + батерия) с компактен и модерен дизайн.",
  },
  deye: {
    name: "Deye",
    tagline: "Бюджетно решение. Максимална гъвкавост. Източноевропейски лидер.",
    badge: "Най-добро съотношение цена/качество",
    positioning: "Бюджетен бранд с много решения и може би най-доброто решение за източноевропейския пазар — широка гама модели за всякакъв бюджет и мащаб.",
    description: "Deye предлага хибридни инвертори с до 16 паралелни устройства, цветен сензорен дисплей, AC coupling за ретрофит и широк температурен обхват (-40°C до +60°C). Гъвкаво и достъпно решение.",
    logo: REAL_IMAGES.partners.deye,
    accent: "text-[#E85C0D]",
    stats: [
      { value: 97.6, suffix: "%", context: "Ефективност" },
      { value: 50, suffix: " kW", context: "Макс. мощност" },
      { value: 10, suffix: " г.", context: "Гаранция" },
    ],
    models: [
      { model: "SUN-3K-SG", power: "3 kW", efficiency: "97.0%", weight: "24 kg", phases: "1Ф", warranty: "10 г." },
      { model: "SUN-5K-SG05LP1", power: "5 kW", efficiency: "97.6%", weight: "26 kg", phases: "1Ф", warranty: "10 г." },
      { model: "SUN-6K-SG05LP1", power: "6 kW", efficiency: "97.6%", weight: "26 kg", phases: "1Ф", warranty: "10 г." },
      { model: "SUN-8K-SG", power: "8 kW", efficiency: "97.5%", weight: "30 kg", phases: "1Ф", warranty: "10 г." },
      { model: "SUN-12K-SG04LP3", power: "12 kW", efficiency: "97.5%", weight: "32 kg", phases: "3Ф", warranty: "10 г." },
      { model: "SUN-50K-SG01HP3", power: "50 kW", efficiency: "98.4%", weight: "56 kg", phases: "3Ф", warranty: "10 г." },
    ],
    highlights: [
      { title: "Паралелна работа", desc: "До 16 инвертора паралелно — мащабируемост от 5 до 800 kW.", icon: Zap },
      { title: "Цветен дисплей", desc: "Вграден сензорен LCD екран за лесен мониторинг без телефон.", icon: BarChart3 },
      { title: "AC Coupling", desc: "Лесен ретрофит на съществуващи системи без подмяна на панели.", icon: Cpu },
      { title: "Широк температурен обхват", desc: "-40°C до +60°C — работи надеждно при всякакви условия.", icon: Shield },
    ],
    useCase: "Идеален за клиенти с ограничен бюджет, които искат гъвкавост и възможност за бъдещо разширяване.",
  },
};

const brandOrder: BrandKey[] = ["solaredge", "kstar", "deye"];

const faqs = [
  { q: "Какъв размер инвертор ми трябва?", a: "Мощността на инвертора трябва да съответства на общата мощност на соларните панели. За 12 панела по 450W (5.4 kWp) препоръчваме 5-6 kW инвертор от SolarEdge, Kstar или Deye." },
  { q: "Коя марка е най-добра за мен?", a: "SolarEdge предлага най-високо качество с панелно ниво оптимизация. Kstar е идеален за all-in-one решение с интегрирана батерия и елегантен дизайн. Deye е най-достъпният вариант с максимална гъвкавост и мащабируемост." },
  { q: "Какво е предимството на оптимизатори?", a: "Оптимизаторите P950 (SolarEdge) позволяват на всеки панел да работи независимо. При частично засенчване, само засегнатият панел губи ефективност — за разлика от стринговите инвертори." },
  { q: "Мога ли да добавя батерия по-късно?", a: "Да. SolarEdge инверторите са battery-ready, а Kstar и Deye хибридните модели имат вградена поддръжка за батерии. Можете да свържете батерия по всяко време." },
  { q: "Какъв е гаранционният срок?", a: "SolarEdge: 12 години (удължаване до 25). Kstar: 10 години. Deye: 5-10 години в зависимост от модела. Оптимизаторите P950 имат 25 години гаранция." },
  { q: "Работи ли инверторът при спиране на тока?", a: "Стандартните on-grid инвертори спират при прекъсване на мрежата. Хибридните модели на Kstar и Deye (и SolarEdge с батерия) автоматично превключват на резервно захранване." },
  { q: "Кои марки работят за комерсиални системи?", a: "За комерсиални on-grid системи препоръчваме SolarEdge, Kstar и Huawei. За хибридни комерсиални системи — Deye и Huawei. Свържете се с нас за персонална консултация." },
];

export function InvertoriContent() {
  const flowRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: "0px 0px -15% 0px" });
  const optRef = useRef<HTMLDivElement>(null);
  const optInView = useInView(optRef, { once: true, margin: "0px 0px -15% 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<BrandKey>("solaredge");
  const brand = brands[activeBrand];

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero */}
      <section className="relative min-h-[100vh] flex items-end">
        <ImageEditorial
          src={PRODUCT_IMAGES.inverter}
          alt="Соларна система с инвертор"
          fill
          grain
          parallax
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <motion.div variants={blurIn} initial="hidden" animate="visible">
            <BadgeChip variant="hero">SolarEdge · Kstar · Deye</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="editorial-hero text-white mt-3">
            Инвертори
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" animate="visible" className="mt-6 max-w-3xl text-xl md:text-2xl lg:text-3xl text-white/80 font-body">
            Три водещи марки. От премиум до бюджетен клас. Правилният инвертор за всеки проект.
          </motion.p>
          <div className="mt-8 md:mt-12 flex flex-wrap gap-12 md:gap-20">
            <StatNumber value={99.2} suffix="%" context="Макс. ефективност" className="text-white" contextClassName="text-white/60" duration={1500} />
            <StatNumber value={50} suffix=" kW" context="Макс. мощност" className="text-white" contextClassName="text-white/60" />
            <StatNumber value={3} suffix="" context="Марки партньори" className="text-white" contextClassName="text-white/60" />
          </div>
          <motion.div variants={blurIn} initial="hidden" animate="visible" className="mt-8 md:mt-10">
            <MagneticButton href="/konfigurator" variant="primary" size="xl">
              Безплатна оферта
            </MagneticButton>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/40" />
        </motion.div>
      </section>

      {/* 2 — Brand Selector Tabs */}
      <section className="py-6 bg-white border-b border-border/30 sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-2 overflow-x-auto">
            {brandOrder.map((key) => {
              const b = brands[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveBrand(key)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-6 py-3 font-display font-semibold text-sm transition-all whitespace-nowrap",
                    activeBrand === key
                      ? "bg-foreground text-white shadow-lg"
                      : "bg-muted/50 text-foreground-secondary hover:bg-muted"
                  )}
                >
                  <span>{b.name}</span>
                  <span className={cn(
                    "hidden sm:inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                    activeBrand === key ? "bg-accent text-white" : "bg-foreground/10 text-foreground-secondary"
                  )}>
                    {b.badge}
                  </span>
                  {activeBrand === key && (
                    <motion.div
                      layoutId="brand-tab-bg"
                      className="absolute inset-0 rounded-xl bg-foreground -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — Brand Overview */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeBrand}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="py-20 md:py-28 bg-[#f7f9f4]"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="editorial-overline text-accent mb-3">{brand.badge}</p>
                <h2 className="editorial-display">{brand.name}</h2>
                <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
                  {brand.description}
                </p>
                <p className="mt-4 text-base text-foreground-secondary font-body italic">
                  {brand.useCase}
                </p>
                <div className="mt-8 flex flex-wrap gap-10 md:gap-16">
                  {brand.stats.map((s) => (
                    <StatNumber key={s.context} value={s.value} suffix={s.suffix} context={s.context} />
                  ))}
                </div>
              </div>
              <div>
                <motion.div
                  variants={createStagger(0.08)}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-4"
                >
                  {brand.highlights.map((h) => (
                    <motion.div key={h.title} variants={staggerItem}>
                      <GlowCard className="h-full">
                        <div className="p-5 h-full">
                          <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">
                            <h.icon className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <h3 className="font-display font-bold text-sm">{h.title}</h3>
                          <p className="mt-1.5 text-xs text-foreground-secondary font-body leading-relaxed">{h.desc}</p>
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 4 — Brand Specs Table */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="editorial-display mb-4">
            {brand.name} — Модели
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-12">{brand.tagline}</p>
          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/10">
                  {["Модел", "Мощност", "Ефективност", "Тегло", "Фази", "Гаранция"].map((h) => (
                    <th key={h} className="py-3 px-4 font-display font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brand.models.map((m, i) => (
                  <tr key={m.model} className={cn("border-b border-border/50", i % 2 === 0 && "bg-muted/30")}>
                    <td className="py-3 px-4 font-display font-bold">{m.model}</td>
                    <td className="py-3 px-4 font-body">{m.power}</td>
                    <td className="py-3 px-4 font-body text-accent font-semibold">{m.efficiency}</td>
                    <td className="py-3 px-4 font-body">{m.weight}</td>
                    <td className="py-3 px-4 font-body">{m.phases}</td>
                    <td className="py-3 px-4 font-body">{m.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 5 — DC→AC Flow */}
      <section ref={flowRef} className="py-20 md:py-28 bg-[#f7f9f4]">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal as="h2" className="editorial-heading text-center mb-16">
            Преобразуване на енергията
          </TextReveal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={flowInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {[
              { label: "DC Панели", sub: "Постоянен ток", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { label: "Инвертор", sub: "Преобразуване", color: "bg-accent/10 border-accent/30 text-accent" },
              { label: "AC Мрежа / Дом", sub: "Променлив ток", color: "bg-amber-50 border-amber-200 text-amber-700" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-4 md:gap-6">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={flowInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: i * 0.25, duration: 0.5, type: "spring", stiffness: 200 }}
                  className={cn("rounded-2xl border-2 px-8 py-6 text-center", step.color)}
                >
                  <p className="font-display font-bold text-lg">{step.label}</p>
                  <p className="text-sm mt-1 opacity-70 font-body">{step.sub}</p>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={flowInView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.25 + 0.3, duration: 0.5 }}
                    className="hidden md:block h-1 w-16 bg-gradient-to-r from-accent/40 to-accent rounded-full origin-left"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6 — Brand Comparison */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="editorial-overline text-accent">Сравнение</p>
          <TextReveal as="h2" className="editorial-display text-white mt-2 mb-16">
            Кой инвертор е подходящ за вас?
          </TextReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {brandOrder.map((key) => {
              const b = brands[key];
              const isActive = key === activeBrand;
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => setActiveBrand(key)}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "text-left rounded-2xl border p-8 transition-all",
                    isActive
                      ? "border-accent bg-accent/10 ring-2 ring-accent/30"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  )}
                >
                  <p className={cn("text-xs uppercase tracking-widest font-bold mb-3", isActive ? "text-accent" : "text-white/50")}>
                    {b.badge}
                  </p>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">{b.name}</h3>
                  <p className="text-white/60 font-body text-sm leading-relaxed mb-6">{b.positioning}</p>
                  <div className="space-y-3">
                    {b.stats.map((s) => (
                      <div key={s.context} className="flex justify-between items-center">
                        <span className="text-white/50 font-body text-sm">{s.context}</span>
                        <span className="font-display font-bold text-white">{s.value}{s.suffix}</span>
                      </div>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
          <p className="mt-8 text-center text-white/40 font-body text-sm">
            За комерсиални on-grid системи работим и с <strong className="text-white/70">Huawei</strong> инвертори. За хибридни комерсиални проекти — <strong className="text-white/70">Deye</strong> и <strong className="text-white/70">Huawei</strong>.
          </p>
        </div>
      </section>

      {/* 7 — P950 Optimizer (SolarEdge specific) */}
      <section ref={optRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideFromLeft} initial="hidden" animate={optInView ? "visible" : "hidden"}>
            <p className="editorial-overline text-accent">SolarEdge ексклузив</p>
            <h2 className="editorial-heading mt-2">Оптимизатор P950</h2>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
              Всеки панел получава собствен оптимизатор, който следи и максимизира неговата мощност независимо от останалите. При частично засенчване или замърсяване, само засегнатият панел губи ефективност.
            </p>
            <p className="mt-4 text-lg text-muted-foreground font-body leading-relaxed">
              25 години гаранция, панелно ниво мониторинг и SafeDC™ технология за безопасност при аварии.
            </p>
          </motion.div>
          <motion.div variants={slideFromRight} initial="hidden" animate={optInView ? "visible" : "hidden"}>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
                <p className="font-display font-bold text-red-700 mb-4">Стрингов инвертор</p>
                <div className="space-y-2">
                  {[100, 100, 30, 100, 100].map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 rounded-full bg-red-200 flex-1">
                        <div className="h-3 rounded-full bg-red-400" style={{ width: `${Math.min(v, 30)}%` }} />
                      </div>
                      <span className="text-xs text-red-600 w-8 font-body">{Math.min(v, 30)}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-red-500 mt-3 font-body">1 засенчен = всички губят</p>
              </div>
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
                <p className="font-display font-bold text-green-700 mb-4">С оптимизатори</p>
                <div className="space-y-2">
                  {[100, 100, 30, 100, 100].map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 rounded-full bg-green-200 flex-1">
                        <div className="h-3 rounded-full bg-green-500" style={{ width: `${v}%` }} />
                      </div>
                      <span className="text-xs text-green-600 w-8 font-body">{v}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-green-600 mt-3 font-body">Всеки панел е независим</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="editorial-display text-white mb-12">
            Често задавани въпроси
          </TextReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display font-semibold">{f.q}</span>
                  <ChevronDown className={cn("h-5 w-5 transition-transform duration-300 shrink-0 ml-4", openFaq === i && "rotate-180")} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-white/70 font-body leading-relaxed">{f.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Project Gallery */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="editorial-display mb-16">
            Реализирани инсталации
          </TextReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: REAL_IMAGES.installations.nlProjectInstall2, alt: "SolarEdge инвертор — монтаж" },
              { src: REAL_IMAGES.installations.adoreenergyC1, alt: "Покривна система с инвертор" },
              { src: REAL_IMAGES.projects.varna39_1, alt: "39 kWp инсталация — Варна" },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                variants={i % 2 === 0 ? revealFromBottom : scaleSpring}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="relative group overflow-hidden rounded-lg"
              >
                <ImageEditorial
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  grain
                  containerClassName="aspect-[4/3] rounded-lg"
                  className="rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Environmental Impact */}
      <section className="py-24 md:py-32 bg-[#f7f9f4]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="editorial-overline text-accent">Въздействие</p>
          <TextReveal as="h2" className="editorial-display mt-2 mb-16">
            Екологичен принос
          </TextReveal>
          <motion.div
            variants={createStagger(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { val: 4.2, sfx: " т.", ctx: "CO₂ спестени годишно", icon: "🌱" },
              { val: 210, sfx: "", ctx: "Засадени дървета еквивалент", icon: "🌳" },
              { val: 8750, sfx: " kWh", ctx: "Чиста енергия годишно", icon: "⚡" },
              { val: 99.2, sfx: "%", ctx: "Преобразуване DC→AC", icon: "🔄" },
            ].map((s) => (
              <motion.div key={s.ctx} variants={staggerItem} className="text-center">
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <StatNumber value={s.val} suffix={s.sfx} context={s.ctx} className="text-3xl" contextClassName="text-muted-foreground" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductPageProjects />
      <RelatedProducts currentProductId="invertori" />

      {/* 8 — CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="editorial-display mb-6">
            Проектирайте вашата система
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            Използвайте нашия онлайн конфигуратор, за да изберете правилния инвертор и оптимизатори за вашия покрив.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Към конфигуратора
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
