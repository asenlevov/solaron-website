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
  Sun,
  Droplets,
  Sprout,
  ShieldCheck,
  Calendar,
  Banknote,
  Wheat,
  CloudSun,
} from "lucide-react";

const seasons = [
  {
    name: "Пролет",
    months: "Март – Май",
    solar: "Високо",
    farming: "Сеитба, напояване",
    icon: Sprout,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    name: "Лято",
    months: "Юни – Авг",
    solar: "Пиково",
    farming: "Интензивно напояване",
    icon: Sun,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    name: "Есен",
    months: "Сеп – Ное",
    solar: "Умерено",
    farming: "Жътва, преработка",
    icon: Wheat,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    name: "Зима",
    months: "Дек – Фев",
    solar: "Минимално",
    farming: "Поддръжка, отопление",
    icon: CloudSun,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
];

const subsidies = [
  {
    name: "ПРСР — Мярка 4.1",
    amount: "до 50%",
    desc: "Подпомагане за модернизация на стопанства. Покрива соларни системи за собствени нужди.",
    eligible: "Регистрирани земеделски производители",
    deadline: "По покана на ДФЗ",
  },
  {
    name: "ПРСР — Мярка 6.4",
    amount: "до 75%",
    desc: "Диверсификация на неземеделски дейности — производство на електроенергия от ВЕИ.",
    eligible: "Микро и малки предприятия в селски райони",
    deadline: "По покана на ДФЗ",
  },
  {
    name: "Програма за селски райони 2025+",
    amount: "до 60%",
    desc: "Нова програма с фокус върху зелена трансформация. Очаква се да стартира през 2026.",
    eligible: "Земеделски производители",
    deadline: "Предстои обявяване",
  },
];

export default function ZaZemedelietoContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const irrigRef = useRef<HTMLElement>(null);
  const irrigInView = useInView(irrigRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* 1. HERO */}
      <section ref={heroRef} className="relative flex min-h-screen items-end">
        <ImageEditorial
          src={LIFESTYLE_IMAGES.farmland}
          alt="Соларни панели в земеделски район"
          fill
          priority
          parallax
          grain
          duotone="rgba(45, 107, 31, 0.15)"
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-stone-950/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-48 md:px-8 md:pb-28">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="editorial-overline text-accent mb-6"
          >
            За земеделието
          </motion.p>
          <TextReveal as="h1" className="editorial-hero max-w-3xl text-white">
            Слънцето Храни Земята
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed"
          >
            Двойно използване на земята — реколта и чиста енергия.
            Намалете разходите за напояване, съхранение и преработка.
          </motion.p>
        </div>
      </section>

      {/* 2. AGRIVOLTAICS */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline text-accent mb-4"
          >
            Агроволтаици
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            Две реколти от едно поле
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
                <Sprout className="size-10 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="editorial-heading mb-4">Ползи за културите</h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Повдигнатите соларни панели осигуряват частична сянка, намаляват
                  изпарението и защитават от градушка. Доказано увеличение на
                  добивите при определени култури.
                </p>
                <div className="space-y-3">
                  {[
                    "Намалено изпаряване с до 30%",
                    "Защита от екстремни температури",
                    "По-добри добиви при салати, билки, ягоди",
                    "Удължен вегетационен сезон",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-stone-600">
                      <ShieldCheck className="size-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
            <motion.div variants={staggerItem}>
              <TiltCard className="h-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
                <Sun className="size-10 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="editorial-heading mb-4">Ползи за фермата</h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Допълнителен приход от продажба на електроенергия или пълно
                  покриване на собствените нужди за ток — напояване, охлаждане,
                  хладилни камери.
                </p>
                <div className="space-y-3">
                  {[
                    "Безплатна енергия за помпи и системи",
                    "Допълнителен приход от излишъка",
                    "Амортизация за 4–6 години",
                    "Двойно използване на земята",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-stone-600">
                      <ShieldCheck className="size-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. IRRIGATION POWER — dark */}
      <section ref={irrigRef} className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={irrigInView ? "visible" : "hidden"}
            >
              <Droplets className="size-12 text-accent mb-4" strokeWidth={1.5} />
              <TextReveal as="h2" className="editorial-display text-white">
                Напояване от Слънцето
              </TextReveal>
              <p className="mt-4 text-white/60 text-lg leading-relaxed">
                Типична помпа за напояване консумира 5–15 kW.
                Соларна система от 10 kWp покрива напълно нуждите
                и работи точно когато водата е най-необходима — през лятото.
              </p>
            </motion.div>
            <motion.div
              variants={scaleSpring}
              initial="hidden"
              animate={irrigInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-widest text-white/40 mb-2">Типична помпа</p>
                <StatNumber value={10} suffix=" kW" context="мощност на помпа за напояване" className="text-4xl text-white" contextClassName="text-white/50" />
              </div>
              <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
                <p className="text-sm uppercase tracking-widest text-accent mb-2">Препоръчана система</p>
                <StatNumber value={15} suffix=" kWp" context="соларна система + запас" className="text-4xl text-accent" contextClassName="text-accent/60" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SEASONAL CALENDAR */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <TextReveal as="h2" className="editorial-display text-center mb-4">
            Соларно Производство по Сезони
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-lg text-stone-500 mb-16 max-w-2xl mx-auto"
          >
            Слънчевата енергия съвпада перфектно с нуждите на земеделието
          </motion.p>
          <motion.div
            variants={createStagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 md:grid-cols-4"
          >
            {seasons.map((s) => (
              <motion.div
                key={s.name}
                variants={staggerItem}
                className="rounded-2xl border border-stone-200 p-6 text-center"
              >
                <div className={cn("mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl", s.bg)}>
                  <s.icon className={cn("size-7", s.color)} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-lg mb-1">{s.name}</h3>
                <p className="text-xs text-stone-400 mb-4">{s.months}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-500">Соларно</span>
                    <span className={cn("font-semibold", s.color)}>{s.solar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Земеделие</span>
                    <span className="font-semibold text-stone-700">{s.farming}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. SUBSIDY PROGRAMS — dark */}
      <section className="relative bg-stone-900 px-6 py-24 text-white md:px-8 md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline text-accent mb-4"
          >
            Финансиране
          </motion.p>
          <TextReveal as="h2" className="editorial-display text-white mb-16">
            Субсидии и Програми
          </TextReveal>
          <motion.div
            variants={createStagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {subsidies.map((sub) => (
              <motion.div key={sub.name} variants={staggerItem}>
                <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <Banknote className="size-8 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-2">{sub.name}</h3>
                  <p className="editorial-stat text-3xl text-accent mb-4">{sub.amount}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{sub.desc}</p>
                  <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Допустими</span>
                      <span className="text-white/70 text-right max-w-[60%]">{sub.eligible}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Срок</span>
                      <span className="text-white/70">{sub.deadline}</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="overflow-hidden bg-accent px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal as="h2" className="editorial-hero text-white mb-6">
            Отгледайте Енергия
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/80 text-xl mb-10 max-w-xl mx-auto"
          >
            Безплатна консултация за земеделски соларни решения —
            от напояване до енергийна независимост.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Заявете Консултация
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
