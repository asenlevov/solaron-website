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
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
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
import { ArrowRight, Home, Mountain, Car, Building2, Wind, Snowflake, Timer, Award } from "lucide-react";

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

export function KonstrukciiContent() {
  const [activeType, setActiveType] = useState("roof");
  const engRef = useRef<HTMLDivElement>(null);
  const engInView = useInView(engRef, { once: true, margin: "0px 0px -15% 0px" });
  const partnerRef = useRef<HTMLDivElement>(null);
  const partnerInView = useInView(partnerRef, { once: true, margin: "0px 0px -10% 0px" });

  const current = mountTypes.find((t) => t.id === activeType)!;

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero */}
      <section className="relative min-h-[80vh] flex items-end">
        <ImageEditorial
          src={REAL_IMAGES.projects.varna39_hero}
          alt="Покривна соларна конструкция"
          fill
          parallax
          grain
          reveal
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
          <motion.div variants={blurIn} initial="hidden" animate="visible">
            <BadgeChip variant="accent">Монтажни системи</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="text-editorial-hero max-w-4xl text-white mt-2">
            Конструкции
          </TextReveal>
          <motion.p variants={slideFromLeft} initial="hidden" animate="visible" className="mt-6 max-w-lg text-lg text-white/70 font-body">
            Алуминиеви конструкции за всеки тип инсталация — от скатен покрив до соларен карпорт. Проектирани за българския климат.
          </motion.p>
        </div>
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
