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
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
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
import { ArrowRight, Zap, Shield, Wifi, BarChart3, ChevronDown } from "lucide-react";
import { useState } from "react";

const models = [
  { model: "SE3000H", power: "3 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
  { model: "SE4000H", power: "4 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
  { model: "SE5000H", power: "5 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
  { model: "SE6000H", power: "6 kW", efficiency: "99.2%", weight: "9.5 kg", phases: "1Ф", warranty: "12 г." },
  { model: "SE8K", power: "8 kW", efficiency: "99.0%", weight: "15.2 kg", phases: "3Ф", warranty: "12 г." },
  { model: "SE10K", power: "10 kW", efficiency: "99.0%", weight: "15.2 kg", phases: "3Ф", warranty: "12 г." },
];

const bentoCards = [
  { title: "99.2% ефективност", desc: "Минимални загуби при преобразуване на енергията — повече ток достига до дома ви.", icon: Zap, span: "sm:col-span-2" },
  { title: "Вградена безопасност", desc: "SafeDC™ технология автоматично понижава напрежението при аварийни ситуации.", icon: Shield, span: "" },
  { title: "WiFi мониторинг", desc: "Безжична връзка с облачната платформа за наблюдение от всяка точка.", icon: Wifi, span: "" },
  { title: "25 години данни", desc: "Пълна историческа аналитика за производство, потребление и спестявания.", icon: BarChart3, span: "sm:col-span-2" },
];

const faqs = [
  { q: "Какъв размер инвертор ми трябва?", a: "Мощността на инвертора трябва да съответства на общата мощност на соларните панели. За 12 панела по 450W (5.4 kWp) препоръчваме SE5000H или SE6000H." },
  { q: "Какво е предимството на оптимизатори?", a: "Оптимизаторите P950 позволяват на всеки панел да работи независимо. Ако един панел е засенчен, останалите не губят ефективност — за разлика от стринговите инвертори." },
  { q: "Мога ли да добавя батерия по-късно?", a: "Да. SolarEdge инверторите са battery-ready. Можете да свържете батерия за съхранение по всяко време без подмяна на инвертора." },
  { q: "Какъв е гаранционният срок?", a: "Стандартната гаранция е 12 години, с опция за удължаване до 25 години. Оптимизаторите P950 имат 25 години гаранция включена." },
  { q: "Какво е SafeDC™?", a: "SafeDC™ е технология на SolarEdge, която автоматично понижава напрежението на всеки панел до 1V при изключване на инвертора или аварийна ситуация. Това елиминира риска от токов удар при работа по системата." },
  { q: "Работи ли инверторът при спиране на тока?", a: "Стандартният инвертор спира при прекъсване на мрежата (grid-tied). С добавяне на батерия и backup интерфейс, системата автоматично превключва и захранва дома ви." },
];

export function InvertoriContent() {
  const flowRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: "0px 0px -15% 0px" });
  const optRef = useRef<HTMLDivElement>(null);
  const optInView = useInView(optRef, { once: true, margin: "0px 0px -15% 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero: Full-bleed image */}
      <section className="relative min-h-[100vh] flex items-end">
        <ImageEditorial
          src={PRODUCT_IMAGES.inverter}
          alt="Соларна система с инвертор"
          fill
          reveal
          grain
          parallax
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <motion.div variants={blurIn} initial="hidden" animate="visible">
            <BadgeChip variant="accent">SolarEdge HD-Wave</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="text-editorial-hero text-white mt-2 max-w-4xl">
            Инвертори
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" animate="visible" className="mt-6 max-w-xl text-lg text-white/70 font-body">
            Интелигентно преобразуване на соларна енергия с 99.2% ефективност, панелно ниво оптимизация и пълен облачен мониторинг.
          </motion.p>
          <div className="mt-10 flex flex-wrap gap-12">
            <StatNumber value={99.2} suffix="%" context="Ефективност" className="text-white" contextClassName="text-white/50" duration={1500} />
            <StatNumber value={10} suffix=" kW" context="Макс. мощност" className="text-white" contextClassName="text-white/50" />
            <StatNumber value={12} suffix=" г." context="Гаранция" className="text-white" contextClassName="text-white/50" />
          </div>
          <motion.div variants={blurIn} initial="hidden" animate="visible" className="mt-10">
            <MagneticButton href="/konfigurator" variant="primary">
              Безплатна оферта <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* 2 — DC→AC Flow */}
      <section ref={flowRef} className="py-20 md:py-28 bg-[#f7f9f4]">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal as="h2" className="text-editorial-heading text-center mb-16">
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

      {/* 3 — SolarEdge Monitoring Platform (Dark) */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Мониторинг</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-16">
            Облачна платформа
          </TextReveal>
          <motion.div
            variants={createStagger(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { val: 8750, sfx: " kWh", ctx: "Годишно производство" },
              { val: 6200, sfx: " W", ctx: "Текуща мощност" },
              { val: 4150, sfx: " лв", ctx: "Годишни спестявания" },
              { val: 99, sfx: "%", ctx: "Uptime на системата" },
            ].map((s) => (
              <motion.div key={s.ctx} variants={staggerItem} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <StatNumber value={s.val} suffix={s.sfx} context={s.ctx} className="text-white text-3xl md:text-4xl" contextClassName="text-white/50" />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-3 gap-2 max-w-md">
            {[75, 82, 90, 65, 88, 95, 72, 80, 78].map((val, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{ originY: 1 }}
                className="h-16 rounded-sm bg-accent/60"
              >
                <div className="h-full rounded-sm bg-accent" style={{ height: `${val}%` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — P950 Optimizer */}
      <section ref={optRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideFromLeft} initial="hidden" animate={optInView ? "visible" : "hidden"}>
            <p className="text-editorial-overline text-accent">Оптимизация</p>
            <h2 className="text-editorial-heading mt-2">Оптимизатор P950</h2>
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

      {/* 5 — Specs Table */}
      <section className="py-24 md:py-32 bg-[#f7f9f4]">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-12">
            Модели и спецификации
          </TextReveal>
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
                {models.map((m, i) => (
                  <tr key={m.model} className={cn("border-b border-border/50", i % 2 === 0 && "bg-white/60", m.model === "SE5000H" && "bg-accent/5 ring-1 ring-accent/20")}>
                    <td className="py-3 px-4 font-display font-bold">
                      {m.model}
                      {m.model === "SE5000H" && (
                        <span className="ml-2 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          Най-популярен
                        </span>
                      )}
                    </td>
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

      {/* 6 — Bento Benefits */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-12">
            Защо SolarEdge
          </TextReveal>
          <motion.div
            variants={createStagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {bentoCards.map((c) => (
              <motion.div key={c.title} variants={staggerItem} className={c.span}>
                <GlowCard className="h-full">
                  <div className="p-8 h-full flex items-center gap-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <c.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{c.title}</h3>
                      <p className="mt-2 text-foreground-secondary font-body">{c.desc}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-white mb-12">
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
          <TextReveal as="h2" className="text-editorial-display mb-16">
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
          <p className="text-editorial-overline text-accent">Въздействие</p>
          <TextReveal as="h2" className="text-editorial-display mt-2 mb-16">
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

      {/* Related Products */}
      <section className="py-24 md:py-32 bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-editorial-display mb-12">Свързани продукти</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Соларни Панели", desc: "MWT модули с 21.5% ефективност за максимално производство от всеки квадратен метър.", href: "/produkti/solarni-paneli" },
              { title: "Батерии", desc: "LFP съхранение с 6000+ цикъла за енергийна независимост денонощно.", href: "/produkti/baterii" },
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

      {/* 8 — CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="text-editorial-display mb-6">
            Проектирайте вашата система
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            Използвайте нашия онлайн конфигуратор, за да изберете правилния инвертор и оптимизатори за вашия покрив.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Към конфигуратора <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
