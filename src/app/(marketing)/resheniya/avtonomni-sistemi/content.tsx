"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  blurIn,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  scaleSpring,
  createStagger,
} from "@/lib/animations";
import {
  Lightbulb,
  Refrigerator,
  Flame,
  Wind,
  Battery,
  SunDim,
  Cpu,
  Gauge,
  Plug,
  PlugZap,
  CheckCircle,
  X,
} from "lucide-react";

const appliances = [
  { id: "lighting", label: "Осветление", watts: 200, icon: Lightbulb, hoursPerDay: 8 },
  { id: "fridge", label: "Хладилник", watts: 150, icon: Refrigerator, hoursPerDay: 24 },
  { id: "water_heater", label: "Бойлер", watts: 2000, icon: Flame, hoursPerDay: 3 },
  { id: "ac", label: "Климатик", watts: 1500, icon: Wind, hoursPerDay: 6 },
];

const components = [
  {
    icon: SunDim,
    title: "Соларни Панели",
    role: "Преобразуват слънчевата светлина в постоянен ток (DC). Основният източник на енергия.",
    spec: "Моно-кристални, 400–550 Wp",
  },
  {
    icon: Battery,
    title: "Батерия (LiFePO₄)",
    role: "Съхраняват енергията за нощта и облачните дни. Литиево-желязо-фосфатните батерии са най-надеждни.",
    spec: "5–50 kWh, 6000+ цикъла",
  },
  {
    icon: Cpu,
    title: "Хибриден Инвертор",
    role: "Преобразува DC в AC, управлява зареждането на батерията и при нужда превключва към мрежата.",
    spec: "3–15 kW, вграден MPPT",
  },
  {
    icon: Gauge,
    title: "Заряден Контролер",
    role: "Регулира зареждането на батерията от панелите. Предотвратява прекомерно зареждане и разреждане.",
    spec: "MPPT, 98%+ ефективност",
  },
];

export default function AvtonomniSistemiContent() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["lighting", "fridge"]));

  const totals = useMemo(() => {
    let dailyWh = 0;
    appliances.forEach((a) => {
      if (selected.has(a.id)) dailyWh += a.watts * a.hoursPerDay;
    });
    const dailyKWh = dailyWh / 1000;
    const solarKWp = Math.ceil(dailyKWh / 4.5 * 10) / 10;
    const batteryKWh = Math.ceil(dailyKWh * 1.2);
    return { dailyKWh: Math.round(dailyKWh * 10) / 10, solarKWp, batteryKWh };
  }, [selected]);

  const toggleAppliance = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const caseRef = useRef<HTMLElement>(null);
  const caseInView = useInView(caseRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* 1. HERO — dark aesthetic */}
      <section ref={heroRef} className="relative flex min-h-screen items-center bg-stone-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-stone-950" />
        <div className="grain pointer-events-none absolute inset-0 opacity-30" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-accent blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/3 size-64 rounded-full bg-emerald-400 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-8">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-6"
          >
            Автономни системи
          </motion.p>
          <TextReveal as="h1" className="text-editorial-hero max-w-4xl text-white">
            Пълна Енергийна Независимост
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg text-white/60 leading-relaxed"
          >
            Off-grid и хибридни системи за места без мрежа или
            за тези, които искат пълен контрол над енергията си.
          </motion.p>
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            {["Без мрежа", "Без сметки", "Без прекъсвания"].map((tag) => (
              <span key={tag} className="rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm text-accent font-medium">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. SYSTEM SIZING — interactive */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <TextReveal as="h2" className="text-editorial-display text-center mb-4">
            Оразмерете Системата
          </TextReveal>
          <p className="text-center text-lg text-stone-500 mb-12">
            Изберете уредите, които искате да захранвате
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-10">
            {appliances.map((a) => {
              const isOn = selected.has(a.id);
              return (
                <motion.button
                  key={a.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleAppliance(a.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-5 text-left transition-all",
                    isOn
                      ? "border-accent bg-accent/10 shadow-md shadow-accent/10"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  )}
                >
                  <div className={cn(
                    "flex size-12 items-center justify-center rounded-xl transition-colors",
                    isOn ? "bg-accent text-white" : "bg-stone-100 text-stone-400"
                  )}>
                    <a.icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{a.label}</p>
                    <p className="text-xs text-stone-500">{a.watts} W × {a.hoursPerDay} ч/ден</p>
                  </div>
                  <div className={cn(
                    "flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                    isOn ? "border-accent bg-accent" : "border-stone-300"
                  )}>
                    {isOn && <CheckCircle className="size-4 text-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            layout
            className="rounded-3xl border border-stone-200 bg-white p-8 md:p-10 shadow-xl"
          >
            <p className="text-sm uppercase tracking-widest text-stone-400 mb-6 text-center">
              Препоръчана система
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center rounded-2xl bg-stone-50 p-6">
                <p className="text-xs text-stone-400 mb-1">Дневна консумация</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={totals.dailyKWh}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-editorial-stat text-3xl"
                  >
                    {totals.dailyKWh} kWh
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="text-center rounded-2xl bg-accent/10 p-6">
                <p className="text-xs text-accent mb-1">Соларни панели</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={totals.solarKWp}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-editorial-stat text-3xl text-accent"
                  >
                    {totals.solarKWp} kWp
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="text-center rounded-2xl bg-stone-50 p-6">
                <p className="text-xs text-stone-400 mb-1">Батерия</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={totals.batteryKWh}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-editorial-stat text-3xl"
                  >
                    {totals.batteryKWh} kWh
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CASE STUDY — 15 kW Vratsa — dark */}
      <section ref={caseRef} className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={caseInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-4"
          >
            Реализиран проект
          </motion.p>
          <TextReveal as="h2" className="text-editorial-display text-white mb-12">
            15 kW + 16 kWh Батерия — Враца
          </TextReveal>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              variants={revealFromBottom}
              initial="hidden"
              animate={caseInView ? "visible" : "hidden"}
              className="relative h-80 md:h-auto rounded-3xl overflow-hidden"
            >
              <ImageEditorial
                src={REAL_IMAGES.projects.vratsa15_1}
                alt="15 kW автономна система Враца"
                fill
                grain
                containerClassName="h-full"
              />
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate={caseInView ? "visible" : "hidden"}
              className="flex flex-col justify-center"
            >
              <div className="grid grid-cols-2 gap-6 mb-8">
                <StatNumber value={15} suffix=" kW" context="Соларни панели" className="text-4xl text-white" contextClassName="text-white/50" />
                <StatNumber value={16} suffix=" kWh" context="Батерия LiFePO₄" className="text-4xl text-white" contextClassName="text-white/50" />
                <StatNumber value={95} suffix="%" context="Енергийна независимост" className="text-4xl text-accent" contextClassName="text-accent/60" />
                <StatNumber value={280} suffix=" лв." context="Месечни спестявания" className="text-4xl text-white" contextClassName="text-white/50" />
              </div>
              <blockquote className="text-editorial-pull-quote text-white/60 italic border-l-2 border-accent pl-6">
                &ldquo;С батерията имаме ток и при спиране на мрежата. Децата не
                усещат разлика — всичко работи безпроблемно.&rdquo;
              </blockquote>
              <p className="mt-3 text-sm text-white/50">— Семейство от Враца</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. COMPONENT BREAKDOWN */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="text-editorial-display text-center mb-16">
            Компоненти на Системата
          </TextReveal>
          <motion.div
            variants={createStagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {components.map((comp, i) => (
              <motion.div key={comp.title} variants={staggerItem}>
                <TiltCard className="h-full rounded-3xl border border-stone-200 bg-stone-50 p-8">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-accent/10">
                    <comp.icon className="size-7 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-editorial-overline text-stone-400 mb-1">0{i + 1}</p>
                  <h3 className="text-lg font-semibold mb-3">{comp.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{comp.role}</p>
                  <p className="text-xs text-accent font-medium">{comp.spec}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. HYBRID VS PURE OFF-GRID — dark */}
      <section className="relative bg-stone-900 px-6 py-24 text-white md:px-8 md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <TextReveal as="h2" className="text-editorial-display text-white text-center mb-16">
            Хибридна vs Off-Grid
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 md:grid-cols-2"
          >
            <motion.div variants={staggerItem}>
              <TiltCard className="h-full rounded-3xl border border-accent/20 bg-accent/5 p-8 md:p-10">
                <PlugZap className="size-10 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-editorial-heading text-white mb-4">Хибридна Система</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Свързана към мрежата с батерия. Използвате собствена енергия
                  с приоритет, а мрежата е резервен вариант. Най-популярният избор.
                </p>
                <div className="space-y-3">
                  {[
                    "Свързана към мрежата",
                    "Батерия за нощта и аварии",
                    "Продажба на излишъка",
                    "По-малка батерия нужна",
                    "По-достъпна цена",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className="size-4 text-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-accent/20 p-4 text-center">
                  <p className="text-sm text-accent font-semibold">Препоръчваме за повечето случаи</p>
                </div>
              </TiltCard>
            </motion.div>
            <motion.div variants={staggerItem}>
              <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
                <Plug className="size-10 text-white/60 mb-4" strokeWidth={1.5} />
                <h3 className="text-editorial-heading text-white mb-4">Чист Off-Grid</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Напълно независима система без връзка с мрежата.
                  Изисква по-голяма батерия и резервен генератор за зимата.
                </p>
                <div className="space-y-3">
                  {[
                    "Без мрежова връзка",
                    "Голям батериен масив",
                    "Резервен генератор",
                    "Пълна независимост",
                    "За отдалечени локации",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className="size-4 text-white/40 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-white/10 p-4 text-center">
                  <p className="text-sm text-white/50">За места без достъп до мрежата</p>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="relative bg-stone-950 px-6 py-28 text-white md:px-8 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <TextReveal as="h2" className="text-editorial-hero text-white mb-6">
            Независимост. Сега.
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/50 text-xl mb-10 max-w-xl mx-auto"
          >
            Проектираме персонализирана автономна система за вашите нужди.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="primary" size="xl">
            Заявете Консултация
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
