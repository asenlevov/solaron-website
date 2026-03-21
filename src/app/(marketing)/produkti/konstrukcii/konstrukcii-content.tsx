"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { PRODUCT_IMAGES, REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
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
  revealFromLeft,
} from "@/lib/animations";
import { ArrowRight, Home, Mountain, Car, Building2, Wind, Snowflake, Timer, Award, ChevronDown, Shield, Layers, Scale } from "lucide-react";

const mountTypes = [
  {
    id: "roof",
    label: "Покрив",
    icon: Home,
    image: REAL_IMAGES.projects.varna39_hero,
    description: "Системи за скатен и плосък покрив. Лесна инсталация, минимално натоварване, максимална издръжливост.",
    specs: [
      { label: "Наклон", value: "5°–60°" },
      { label: "Покритие", value: "Керемиди, ламарина, битум" },
      { label: "Монтаж", value: "4–6 часа за 10 панела" },
    ],
  },
  {
    id: "ground",
    label: "Земя",
    icon: Mountain,
    image: REAL_IMAGES.projects.saedinenie651_hero,
    description: "Наземни конструкции за големи инсталации. Регулируем ъгъл, здрави фундаменти, дълъг живот.",
    specs: [
      { label: "Наклон", value: "15°–35° регулируем" },
      { label: "Фундамент", value: "Бетонен или забивен" },
      { label: "Капацитет", value: "До 1 MWp на система" },
    ],
  },
  {
    id: "carport",
    label: "Карпорт",
    icon: Car,
    image: REAL_IMAGES.projects.carport270_hero,
    description: "Соларни навеси за паркинги. Двойна функция — енергия и защита на автомобилите.",
    specs: [
      { label: "Височина", value: "2.5–4.5 m" },
      { label: "Покритие", value: "1–4 паркоместа" },
      { label: "Интеграция", value: "EV зарядна станция" },
    ],
  },
  {
    id: "facade",
    label: "Фасада",
    icon: Building2,
    image: REAL_IMAGES.projects.sedemBg108_hero,
    description: "Фасадни системи за вертикален монтаж. Архитектурна интеграция с енергийна функция.",
    specs: [
      { label: "Ъгъл", value: "70°–90°" },
      { label: "Приложение", value: "Бизнес сгради" },
      { label: "Естетика", value: "Скрити елементи" },
    ],
  },
];

const installSteps = [
  { src: REAL_IMAGES.installations.stepSurvey, title: "Оглед", desc: "Технически оглед на покрива и околната среда" },
  { src: REAL_IMAGES.installations.stepDesign, title: "Проектиране", desc: "3D моделиране и инженерни изчисления" },
  { src: REAL_IMAGES.installations.stepInstall, title: "Монтаж", desc: "Професионална инсталация от сертифициран екип" },
  { src: REAL_IMAGES.installations.stepOperation, title: "Експлоатация", desc: "Пускане в действие и мониторинг" },
];

const konstrukciiFaqs = [
  { q: "Колко тежи конструкцията върху покрива?", a: "Алуминиевата конструкция за скатен покрив тежи ~2.5 kg/m², а с панелите общо ~12 kg/m². Това е значително под допустимото натоварване на стандартен покрив (>100 kg/m²)." },
  { q: "Какъв е гаранционният срок на конструкцията?", a: "Конструкциите Van Der Valk имат 25-годишна гаранция. Анодираният алуминий серия 6000 не корозира и запазва структурната си цялост десетилетия." },
  { q: "Колко време отнема монтажът?", a: "За стандартна покривна система от 10-12 панела, монтажът на конструкцията и панелите отнема 1 работен ден. По-големи търговски проекти — 2-5 дни." },
  { q: "Може ли да се монтира на плосък покрив?", a: "Да. Имаме специализирани системи за плосък покрив с баластна фиксация (без пробиване на покривната мембрана) и оптимален наклон от 15° за максимално производство." },
];

export function KonstrukciiContent() {
  const [activeType, setActiveType] = useState("roof");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const engInView = useInView(engRef, { once: true, margin: "0px 0px -15% 0px" });
  const partnerRef = useRef<HTMLDivElement>(null);
  const partnerInView = useInView(partnerRef, { once: true, margin: "0px 0px -10% 0px" });

  const current = mountTypes.find((t) => t.id === activeType)!;

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero */}
      <section className="relative min-h-[100vh] flex items-end">
        <ImageEditorial
          src={PRODUCT_IMAGES.constructions}
          alt="Премиум конструкция за соларни панели"
          fill
          parallax
          grain
          reveal
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <motion.div variants={blurIn} initial="hidden" animate="visible">
            <BadgeChip variant="accent">Монтажни системи</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="text-editorial-hero max-w-4xl text-white mt-2">
            Конструкции
          </TextReveal>
          <motion.p variants={slideFromLeft} initial="hidden" animate="visible" className="mt-6 max-w-lg text-lg text-white/70 font-body">
            Алуминиеви конструкции за всеки тип инсталация — от скатен покрив до соларен карпорт. Проектирани за българския климат.
          </motion.p>
          <div className="mt-10 flex flex-wrap gap-12">
            <StatNumber value={180} suffix=" km/h" context="Вятърно натоварване" className="text-white" contextClassName="text-white/50" />
            <StatNumber value={250} suffix=" kg/m²" context="Снежно натоварване" className="text-white" contextClassName="text-white/50" />
            <StatNumber value={25} suffix=" г." context="Гаранция" className="text-white" contextClassName="text-white/50" />
          </div>
          <motion.div variants={blurIn} initial="hidden" animate="visible" className="mt-10">
            <MagneticButton href="/kontakti" variant="primary">
              Безплатна консултация <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* 2 — Type Selector */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-12">
            Типове конструкции
          </TextReveal>
          <div className="flex flex-wrap gap-3 mb-12">
            {mountTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300",
                  activeType === t.id
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={current.image} alt={current.label} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-editorial-heading">{current.label}</h3>
                <p className="mt-4 text-lg text-muted-foreground font-body leading-relaxed">{current.description}</p>
                <div className="mt-8 space-y-4">
                  {current.specs.map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground font-body">{s.label}</span>
                      <span className="text-sm font-display font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3 — Engineering Specs */}
      <section ref={engRef} className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Инженерство</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-16">
            Проектирани за издръжливост
          </TextReveal>
          <motion.div
            variants={createStagger(0.12, 0.2)}
            initial="hidden"
            animate={engInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Wind, val: 130, sfx: " km/h", label: "Вятърно натоварване" },
              { icon: Snowflake, val: 200, sfx: " kg/m²", label: "Снежно натоварване" },
              { icon: Timer, val: 25, sfx: "+ г.", label: "Корозионна устойчивост" },
              { icon: Award, val: 6005, sfx: "-T5", label: "Алуминий серия" },
            ].map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <s.icon className="h-8 w-8 text-accent mx-auto mb-4" strokeWidth={1.5} />
                <StatNumber value={s.val} suffix={s.sfx} context={s.label} className="text-white text-3xl" contextClassName="text-white/50" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4 — Installation Steps */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Процес на инсталация
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {installSteps.map((step, i) => (
              <motion.div key={step.title} variants={staggerItem}>
                <div className="group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <Image src={step.src} alt={step.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-body">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5 — Van Der Valk Partner */}
      <section ref={partnerRef} className="py-24 md:py-32 bg-[#f8faf6]">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={partnerInView ? "visible" : "hidden"}
            className="bg-white rounded-3xl p-10 md:p-16 border border-border/50 text-center"
          >
            <p className="text-editorial-overline text-accent mb-4">Партньор</p>
            <h2 className="text-editorial-heading">Van Der Valk Solar Systems</h2>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              Работим с Van Der Valk — холандски производител на монтажни системи с над 15 години опит и инсталации в 40+ държави. Техните алуминиеви конструкции са сертифицирани по EN 1090 и оптимизирани за минимално време за монтаж с максимална сигурност.
            </p>
            <div className="mt-10 flex justify-center gap-12 flex-wrap">
              <StatNumber value={15} suffix="+ г." context="Опит" />
              <StatNumber value={40} suffix="+" context="Държави" />
              <StatNumber value={3} suffix=" GW" context="Инсталиран капацитет" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6 — Material Comparison */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-editorial-overline text-accent">Материали</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-12">
            Защо алуминий?
          </TextReveal>
          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Характеристика</th>
                  <th className="py-3 px-4 font-display font-semibold text-accent">Алуминий 6000</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Стомана</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Поцинкована</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {[
                  { feat: "Тегло", al: "Леко (2.7 g/cm³)", steel: "Тежко (7.8 g/cm³)", galv: "Тежко (7.8 g/cm³)" },
                  { feat: "Корозия", al: "Имунен", steel: "Ръждясва", galv: "Частична защита" },
                  { feat: "Живот", al: "50+ години", steel: "15-20 години", galv: "25-30 години" },
                  { feat: "Поддръжка", al: "Нулева", steel: "Периодична", galv: "Минимална" },
                  { feat: "Рециклируемост", al: "100%", steel: "Частична", galv: "Частична" },
                ].map((r, i) => (
                  <tr key={r.feat} className={cn("border-b border-white/10", i % 2 === 0 && "bg-white/[0.02]")}>
                    <td className="py-3 px-4 font-display font-bold text-white">{r.feat}</td>
                    <td className="py-3 px-4 font-body text-accent font-semibold">{r.al}</td>
                    <td className="py-3 px-4 font-body">{r.steel}</td>
                    <td className="py-3 px-4 font-body">{r.galv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 7 — Certifications */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-editorial-overline text-accent">Сертификати</p>
          <TextReveal as="h2" className="text-editorial-display mt-2 mb-16">
            Тествани и сертифицирани
          </TextReveal>
          <motion.div
            variants={createStagger(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Shield, label: "EN 1090", desc: "Европейски стандарт за стоманени и алуминиеви конструкции" },
              { icon: Wind, label: "180 km/h", desc: "Тествани за устойчивост на вятърно натоварване" },
              { icon: Snowflake, label: "250 kg/m²", desc: "Издържат на екстремно снежно натоварване" },
              { icon: Award, label: "ISO 9001", desc: "Международен стандарт за качество" },
            ].map((cert) => (
              <motion.div key={cert.label} variants={staggerItem} className="rounded-2xl border border-border/50 p-6 text-center">
                <cert.icon className="h-8 w-8 mx-auto mb-3 text-accent" strokeWidth={1.5} />
                <p className="font-display font-bold text-lg">{cert.label}</p>
                <p className="mt-2 text-xs text-muted-foreground font-body">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8 — Project Gallery */}
      <section className="py-24 md:py-32 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Реализирани конструкции
          </TextReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: REAL_IMAGES.projects.varna39_hero, alt: "39 kWp покривна конструкция — Варна" },
              { src: REAL_IMAGES.projects.carport270_hero, alt: "270 kWp соларен карпорт — Казанлък" },
              { src: REAL_IMAGES.installations.adoreenergyC1, alt: "Покривна инсталация" },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-lg">
                  <p className="text-white text-sm font-body">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-center mb-16">
            Често задавани въпроси
          </TextReveal>
          <div className="space-y-3">
            {konstrukciiFaqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-display font-semibold">{f.q}</span>
                  <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4", openFaq === i && "rotate-180")} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted-foreground font-body leading-relaxed">{f.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 md:py-32 bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-editorial-display mb-12">Свързани продукти</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Соларни Панели", desc: "MWT модули с 21.5% ефективност за максимално производство от всеки квадратен метър.", href: "/produkti/solarni-paneli" },
              { title: "Мониторинг", desc: "Наблюдение в реално време, панел по панел, от всяка точка на света.", href: "/produkti/monitoring" },
            ].map((p) => (
              <GlowCard key={p.href}>
                <Link href={p.href} className="group block p-8">
                  <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Научи повече <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — CTA */}
      <section className="py-24 md:py-32 bg-foreground">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="text-editorial-display text-white mb-6">
            Подберете конструкция
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-white/60 font-body mb-10 max-w-lg mx-auto">
            Нашите инженери ще проектират оптималната монтажна система за вашия обект.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="primary" size="xl">
            Безплатна консултация <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
