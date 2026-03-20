"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  revealFromRight,
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
  Mountain,
  Building,
  FileText,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle,
  Factory,
  Scale,
} from "lucide-react";

const gridSteps = [
  { step: "01", title: "Заявление", duration: "1 седмица", desc: "Подаване на заявление до ЕРП" },
  { step: "02", title: "Технически условия", duration: "2–4 седмици", desc: "Получаване на становище от ЕРП" },
  { step: "03", title: "Работен проект", duration: "4–6 седмици", desc: "Изготвяне на PV проект и ел. част" },
  { step: "04", title: "Разрешение за строеж", duration: "2–4 седмици", desc: "Одобрение от община и ДНСК" },
  { step: "05", title: "Присъединяване", duration: "2–4 седмици", desc: "Подписване на договор и пускане" },
];

export default function ZaIndustriyataContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const caseRef = useRef<HTMLElement>(null);
  const caseInView = useInView(caseRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* 1. HERO — full-bleed 651 kWp */}
      <section ref={heroRef} className="relative flex min-h-screen items-end">
        <ImageEditorial
          src={REAL_IMAGES.projects.saedinenie651_hero}
          alt="651 kWp индустриална соларна централа Съединение"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-48 md:px-8 md:pb-28">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-6"
          >
            Индустриални решения
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatNumber
                value={651}
                suffix=" kWp"
                className="text-7xl md:text-9xl text-white"
              />
            </motion.div>
            <motion.div
              variants={blurIn}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="mt-4 md:mt-0 md:pb-3"
            >
              <TextReveal as="h1" className="text-editorial-hero text-white text-3xl md:text-5xl">
                Мащабна Енергия За Индустрията
              </TextReveal>
              <p className="mt-3 max-w-lg text-white/60 text-lg">
                От 30 kWp до мегаватови централи — проектираме, изграждаме
                и поддържаме индустриални соларни системи.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. GROUND VS ROOFTOP */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="text-editorial-display text-center mb-16">
            Наземна или Покривна?
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 md:grid-cols-2"
          >
            <motion.div variants={staggerItem}>
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Mountain className="size-10 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-editorial-heading mb-4">Наземен Монтаж</h3>
                <ul className="space-y-3">
                  {[
                    "Неограничена мощност — от 100 kWp до MW",
                    "Оптимален наклон и ориентация",
                    "По-лесна поддръжка и почистване",
                    "Подходящ за неизползваеми терени",
                    "Изисква строително разрешение",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-stone-600">
                      <CheckCircle className="size-4 text-accent mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-accent/10 p-4">
                  <p className="text-sm text-accent font-semibold">Типична мощност: 100–1000+ kWp</p>
                </div>
              </TiltCard>
            </motion.div>
            <motion.div variants={staggerItem}>
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Building className="size-10 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="text-editorial-heading mb-4">Покривен Монтаж</h3>
                <ul className="space-y-3">
                  {[
                    "Използва съществуващата покривна площ",
                    "Без допълнителен терен",
                    "По-бърза реализация",
                    "По-ниска начална инвестиция",
                    "Ограничен от покривната конструкция",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-stone-600">
                      <CheckCircle className="size-4 text-accent mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-accent/10 p-4">
                  <p className="text-sm text-accent font-semibold">Типична мощност: 30–200 kWp</p>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. GRID CONNECTION >30 kW — dark */}
      <section className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <TextReveal as="h2" className="text-editorial-display text-white text-center mb-4">
            Присъединяване над 30 kW
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/50 text-lg text-center mb-16 max-w-2xl mx-auto"
          >
            Процедурата отнема 3–6 месеца. Ние управляваме целия процес вместо вас.
          </motion.p>
          <motion.div
            variants={createStagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="grid gap-6 md:grid-cols-5">
              {gridSteps.map((s) => (
                <motion.div key={s.step} variants={staggerItem} className="relative text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-white font-bold text-sm">
                    {s.step}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{s.title}</h4>
                  <p className="text-xs text-accent font-medium mb-2">{s.duration}</p>
                  <p className="text-xs text-white/60">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm text-accent">
              <Clock className="size-4" />
              Общо времетраене: 3–6 месеца
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. FINANCIAL MODELS */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="text-editorial-display text-center mb-16">
            Финансови Модели
          </TextReveal>
          <motion.div
            variants={createStagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "PPA — Споразумение за Изкупуване",
                desc: "Без начална инвестиция. Плащате за произведената енергия на цена по-ниска от мрежовата.",
                metrics: [
                  ["Начална инвестиция", "0 лв."],
                  ["Цена на kWh", "по-ниска от EVN"],
                  ["Договор", "10–20 години"],
                ],
                icon: Scale,
              },
              {
                title: "Лизинг",
                desc: "Фиксирани месечни вноски с опция за собственост. Вноската е по-ниска от спестяванията.",
                metrics: [
                  ["Начална вноска", "10–20%"],
                  ["Срок", "5–7 години"],
                  ["Собственост", "след изплащане"],
                ],
                icon: FileText,
              },
              {
                title: "Собствена Инвестиция",
                desc: "Максимална възвръщаемост. Пълна данъчна оптимизация с ускорена амортизация.",
                metrics: [
                  ["ROI", "< 4 години"],
                  ["Данъчна полза", "33% за 3 г."],
                  ["Спестявания", "100% от ден 1"],
                ],
                icon: Factory,
              },
            ].map((model) => (
              <motion.div key={model.title} variants={staggerItem}>
                <TiltCard className="h-full rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-10">
                  <model.icon className="size-10 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="text-editorial-heading mb-3">{model.title}</h3>
                  <p className="text-stone-600 text-sm mb-6 leading-relaxed">{model.desc}</p>
                  <div className="space-y-3 border-t border-stone-200 pt-4">
                    {model.metrics.map(([label, val]) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-stone-500">{label}</span>
                        <span className="font-semibold text-stone-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CASE STUDY DEEP DIVE — dark */}
      <section ref={caseRef} className="relative bg-stone-900 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={caseInView ? "visible" : "hidden"}
            className="text-editorial-overline text-accent mb-4"
          >
            Детайлен проект
          </motion.p>
          <TextReveal as="h2" className="text-editorial-display text-white mb-12">
            651 kWp — Съединение
          </TextReveal>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              variants={revealFromBottom}
              initial="hidden"
              animate={caseInView ? "visible" : "hidden"}
              className="relative h-80 md:h-auto rounded-3xl overflow-hidden"
            >
              <ImageEditorial
                src={REAL_IMAGES.projects.saedinenie651_hero}
                alt="651 kWp Съединение"
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
                <StatNumber value={651} suffix=" kWp" context="Инсталирана мощност" className="text-4xl text-white" contextClassName="text-white/50" />
                <StatNumber value={780} suffix=" MWh" context="Годишно производство" className="text-4xl text-white" contextClassName="text-white/50" />
                <StatNumber value={1600} prefix="" suffix="+" context="Соларни панели" className="text-4xl text-white" contextClassName="text-white/50" />
                <StatNumber value={4} suffix=" седм." context="Време за монтаж" className="text-4xl text-white" contextClassName="text-white/50" />
              </div>
              <p className="text-white/60 leading-relaxed">
                Наземна индустриална централа за производствено предприятие
                в Съединение. Покрива 85% от енергийните нужди на завода
                и осигурява пълна възвръщаемост за под 4 години.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Наземен монтаж", "Tier-1 панели", "String инвертори", "Мониторинг 24/7"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="overflow-hidden bg-accent px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal as="h2" className="text-editorial-hero text-white mb-6">
            Мащабна Енергия
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/80 text-xl mb-10 max-w-xl mx-auto"
          >
            Свържете се с нас за безплатна оценка на вашия индустриален обект.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Заявете Консултация
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
