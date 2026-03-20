"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { PRODUCT_IMAGES, REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  revealFromLeft,
  revealFromRight,
  blurIn,
  scaleSpring,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  createStagger,
} from "@/lib/animations";
import { ArrowRight, Sun, Moon, Battery, Shield, Repeat, ChevronDown, Zap } from "lucide-react";

const lfpVsNmc = [
  { feature: "Химия", lfp: "LiFePO₄", nmc: "NMC 811" },
  { feature: "Жизнен цикъл", lfp: "6 000+ цикъла", nmc: "3 000 цикъла", lfpBetter: true },
  { feature: "Безопасност", lfp: "Не се възпламенява", nmc: "Термичен риск", lfpBetter: true },
  { feature: "Календарен живот", lfp: "15+ години", nmc: "10 години", lfpBetter: true },
  { feature: "Ен. плътност", lfp: "Средна", nmc: "Висока", lfpBetter: false },
  { feature: "Работна температура", lfp: "-20°C до 55°C", nmc: "-10°C до 45°C", lfpBetter: true },
  { feature: "Цена/kWh", lfp: "По-ниска", nmc: "По-висока", lfpBetter: true },
];

const faqs = [
  { q: "Колко батерии са ми нужни?", a: "Зависи от дневното ви потребление. За средно домакинство с 15 kWh дневно потребление, препоръчваме батерия от 10–12 kWh. Нашият конфигуратор ще ви помогне с точния расчет." },
  { q: "Мога ли да бъда напълно автономен?", a: "Да, с достатъчно голяма батерийна система и соларна инсталация можете да покриете 100% от потреблението си. За пълна автономия обикновено трябва 2-3 дни резервен капацитет." },
  { q: "Колко трае батерията?", a: "LFP батериите имат 6 000+ цикъла, което означава 15-20 години при ежедневно използване. SolarEdge предлага 10-годишна гаранция с опция за удължаване." },
  { q: "Безопасни ли са батериите?", a: "Да. LiFePO₄ (LFP) химията не се възпламенява и е значително по-безопасна от NMC алтернативите. Батериите имат множество защити — от претоварване, прегряване и късо съединение." },
];

export function BateriiContent() {
  const dayNightRef = useRef<HTMLDivElement>(null);
  const dayNightInView = useInView(dayNightRef, { once: true, margin: "0px 0px -15% 0px" });
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "0px 0px -10% 0px" });
  const caseRef = useRef<HTMLDivElement>(null);
  const caseInView = useInView(caseRef, { once: true, margin: "0px 0px -10% 0px" });
  const [sliderVal, setSliderVal] = useState(20);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [backupLevel, setBackupLevel] = useState<"low" | "medium" | "high">("medium");

  const backupMultiplier = backupLevel === "low" ? 0.6 : backupLevel === "high" ? 1.0 : 0.8;
  const recommendedCapacity = Math.round(sliderVal * backupMultiplier);
  const nightCoveragePercent = Math.round((recommendedCapacity / sliderVal) * 100);

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero: Dark, product glow */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#0a0f1a] via-[#0f1a2e] to-[#0a1520]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,100vw)] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p variants={blurIn} initial="hidden" animate="visible" className="text-editorial-overline text-accent">
              Съхранение
            </motion.p>
            <TextReveal as="h1" className="text-editorial-hero max-w-4xl text-white mt-2">
              Батерии
            </TextReveal>
            <motion.p variants={slideFromLeft} initial="hidden" animate="visible" className="mt-6 text-lg text-white/60 font-body max-w-md">
              LiFePO₄ батерии за енергийна независимост — зареждайте от слънцето, използвайте денонощно.
            </motion.p>
            <div className="mt-10 flex gap-12">
              <StatNumber value={6000} suffix="+" context="Цикъла" className="text-white" contextClassName="text-white/50" />
              <StatNumber value={15} suffix=" г." context="Живот" className="text-white" contextClassName="text-white/50" />
            </div>
          </div>
          <motion.div variants={scaleSpring} initial="hidden" animate="visible" className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-accent/20 to-transparent blur-2xl" />
            <ImageEditorial
              src={PRODUCT_IMAGES.battery}
              alt="Батерийна система"
              width={600}
              height={450}
              grain
              containerClassName="aspect-[4/3] rounded-2xl relative z-10"
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* 2 — Sizing Calculator */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-center mb-4">
            Калкулатор за размер
          </TextReveal>
          <p className="text-center text-muted-foreground font-body mb-12 max-w-lg mx-auto">
            Преместете плъзгача, за да видите препоръчителния капацитет на батерия за вашето дневно потребление.
          </p>
          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#f8faf6] rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-4">
              <label className="font-display font-semibold">Дневно потребление</label>
              <span className="text-2xl font-display font-bold text-accent">{sliderVal} kWh</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-accent/20 appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-body">
              <span>5 kWh</span>
              <span>50 kWh</span>
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground font-body mb-3 text-center">Важност на мрежовия резерв</p>
              <div className="flex justify-center gap-2 mb-8">
                {([
                  { key: "low" as const, label: "Ниска" },
                  { key: "medium" as const, label: "Средна" },
                  { key: "high" as const, label: "Висока" },
                ]).map((level) => (
                  <button
                    key={level.key}
                    type="button"
                    onClick={() => setBackupLevel(level.key)}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                      backupLevel === level.key
                        ? "bg-accent text-white shadow-md"
                        : "border border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
                    )}
                  >
                    {level.label}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground font-body mb-2">Препоръчителен капацитет</p>
                <p className="text-5xl font-display font-black text-accent">{recommendedCapacity} kWh</p>
                <p className="mt-3 text-sm font-body text-muted-foreground">
                  С тази батерия покривате <span className="font-semibold text-accent">{nightCoveragePercent}%</span> от нощното потребление
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 — Day/Night Split */}
      <section ref={dayNightRef} className="relative overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[50vh]">
          <motion.div
            variants={revealFromLeft}
            initial="hidden"
            animate={dayNightInView ? "visible" : "hidden"}
            className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 md:p-16 flex flex-col justify-center"
          >
            <Sun className="h-12 w-12 text-amber-500 mb-6" strokeWidth={1.5} />
            <h3 className="text-editorial-heading">Ден</h3>
            <p className="mt-4 text-lg text-amber-800/70 font-body leading-relaxed max-w-md">
              Панелите произвеждат електричество. Домът се захранва директно, а излишъкът зарежда батерията. При пълна батерия, излишъкът се продава в мрежата.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-display font-semibold text-amber-600">Зареждане</span>
            </div>
          </motion.div>
          <motion.div
            variants={revealFromRight}
            initial="hidden"
            animate={dayNightInView ? "visible" : "hidden"}
            className="bg-gradient-to-br from-[#0f1a2e] to-[#0a0f1a] p-12 md:p-16 flex flex-col justify-center"
          >
            <Moon className="h-12 w-12 text-blue-300 mb-6" strokeWidth={1.5} />
            <h3 className="text-editorial-heading text-white">Нощ</h3>
            <p className="mt-4 text-lg text-blue-200/60 font-body leading-relaxed max-w-md">
              Слънцето залязва, но домът продължава да работи на батерийна енергия. Без прекъсвания, без зависимост от мрежата, без нощна тарифа.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-display font-semibold text-blue-300">Разреждане</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 — LFP vs NMC */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Технология</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-12">
            LFP срещу NMC
          </TextReveal>
          <motion.div variants={revealFromBottom} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-x-auto">
            <table className="w-full max-w-3xl text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Характеристика</th>
                  <th className="py-3 px-4 font-display font-semibold text-accent">LFP (нашият избор)</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">NMC</th>
                </tr>
              </thead>
              <tbody>
                {lfpVsNmc.map((row) => (
                  <tr key={row.feature} className="border-b border-white/10">
                    <td className="py-3 px-4 text-white/70 font-body">{row.feature}</td>
                    <td className={cn("py-3 px-4 font-body", row.lfpBetter ? "text-accent font-semibold" : "text-white/70")}>{row.lfp}</td>
                    <td className={cn("py-3 px-4 font-body", !row.lfpBetter && row.lfpBetter !== undefined ? "text-white font-semibold" : "text-white/50")}>{row.nmc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 5 — Integration Diagram */}
      <section ref={diagramRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal as="h2" className="text-editorial-heading text-center mb-16">
            Интеграция в системата
          </TextReveal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={diagramInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            {[
              { icon: Sun, label: "Соларни панели", sub: "Производство", color: "text-amber-500 border-amber-200 bg-amber-50" },
              { icon: Battery, label: "Батерия", sub: "Съхранение", color: "text-accent border-accent/30 bg-accent/5" },
              { icon: Zap, label: "Дом + Мрежа", sub: "Потребление", color: "text-blue-600 border-blue-200 bg-blue-50" },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center gap-4 md:gap-6">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={diagramInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("rounded-2xl border-2 px-8 py-6 text-center", node.color)}
                >
                  <node.icon className="h-8 w-8 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-display font-bold">{node.label}</p>
                  <p className="text-xs mt-1 opacity-60 font-body">{node.sub}</p>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={diagramInView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                    className="hidden md:flex items-center gap-1 origin-left"
                  >
                    <div className="h-0.5 w-12 bg-border" />
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6 — Case Study */}
      <section ref={caseRef} className="py-24 md:py-32 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={revealFromLeft} initial="hidden" animate={caseInView ? "visible" : "hidden"}>
            <ImageEditorial
              src={REAL_IMAGES.projects.vratsa15_1}
              alt="60 kW инсталация с батерия"
              width={600}
              height={450}
              grain
              reveal
              containerClassName="aspect-[4/3] rounded-2xl"
              className="rounded-2xl"
            />
          </motion.div>
          <motion.div variants={slideFromRight} initial="hidden" animate={caseInView ? "visible" : "hidden"}>
            <p className="text-editorial-overline text-accent">Реален проект</p>
            <h2 className="text-editorial-heading mt-2">60 kW + 184 kWh батерия</h2>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
              Търговски обект с високо нощно потребление. Соларната система с 60 kW мощност зарежда 184 kWh батерийна система през деня, осигурявайки пълна автономия от 18:00 до 08:00.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatNumber value={60} suffix=" kW" context="Соларна мощност" />
              <StatNumber value={184} suffix=" kWh" context="Батерия" />
              <StatNumber value={85} suffix="%" context="Автономия" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-12">
            Въпроси и отговори
          </TextReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
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
              { title: "Инвертори SolarEdge", desc: "HD-Wave технология с 99.5% ефективност за интелигентно преобразуване на енергията.", href: "/produkti/invertori" },
              { title: "Мониторинг", desc: "Наблюдение в реално време, панел по панел, от всяка точка на света.", href: "/produkti/monitoring" },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="group rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-lg">
                <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Научи повече <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0a0f1a] via-[#0f1a2e] to-[#0a1520]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="text-editorial-display text-white mb-6">
            Енергийна независимост
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-white/60 font-body mb-10 max-w-xl mx-auto">
            Конфигурирайте соларна система с батерия и разберете колко можете да спестите.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="primary" size="xl">
            Изчислете спестяванията <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
