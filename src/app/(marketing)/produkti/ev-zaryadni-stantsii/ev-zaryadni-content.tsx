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
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { PRODUCT_IMAGES, LIFESTYLE_IMAGES, REAL_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  blurIn,
  scaleSpring,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  createStagger,
  revealFromLeft,
  revealFromRight,
} from "@/lib/animations";
import { ArrowRight, Sun, Moon, Sparkles, Car, Zap, Battery, Home, Plug, ChevronDown, Leaf, Fuel } from "lucide-react";

const chargingModes = [
  {
    icon: Sun,
    title: "Solar First",
    subtitle: "Приоритет слънце",
    desc: "Зарядната станция използва първо енергия от соларните панели. Мрежата се включва само при облачно време или през нощта.",
    accent: "bg-amber-50 border-amber-200 text-amber-800",
    iconColor: "text-amber-500",
  },
  {
    icon: Moon,
    title: "Off-Peak",
    subtitle: "Нощна тарифа",
    desc: "Зареждане в часовете с най-ниска тарифа (22:00–06:00). Идеално за домакинства без соларна система.",
    accent: "bg-indigo-50 border-indigo-200 text-indigo-800",
    iconColor: "text-indigo-500",
  },
  {
    icon: Sparkles,
    title: "Smart Mix",
    subtitle: "Интелигентен режим",
    desc: "Алгоритъмът комбинира соларна енергия, нощна тарифа и батерия за минимална цена на kWh.",
    accent: "bg-accent/5 border-accent/20 text-foreground",
    iconColor: "text-accent",
  },
];

const vehicles = [
  { brand: "Tesla", models: "Model 3/Y/S/X", speed: "11 kW AC / 250 kW DC", time: "~4.5 ч. (AC)" },
  { brand: "BMW", models: "iX, i4, iX3", speed: "11 kW AC / 195 kW DC", time: "~5 ч. (AC)" },
  { brand: "VW", models: "ID.3, ID.4, ID.5", speed: "11 kW AC / 135 kW DC", time: "~5.5 ч. (AC)" },
  { brand: "Hyundai/Kia", models: "IONIQ 5/6, EV6", speed: "11 kW AC / 240 kW DC", time: "~5 ч. (AC)" },
  { brand: "Mercedes", models: "EQA, EQB, EQS", speed: "11 kW AC / 200 kW DC", time: "~5 ч. (AC)" },
];

const evFaqs = [
  { q: "Колко време отнема зареждането?", a: "Зависи от мощността на зарядната станция и капацитета на батерията. При 11 kW AC зареждане, типичен EV (60 kWh) се зарежда напълно за ~5.5 часа. При нощно зареждане от соларна батерия, автомобилът е готов сутринта." },
  { q: "Кои автомобили са съвместими?", a: "Нашите зарядни станции поддържат всички EV марки с Type 2 конектор — Tesla, BMW, VW, Hyundai, Kia, Mercedes, Audi, Porsche и др. Мощността се адаптира автоматично към всеки модел." },
  { q: "Нужна ли е специална инсталация?", a: "Да, зарядната станция изисква отделна електрическа линия и автоматичен прекъсвач. Нашият екип извършва пълната инсталация, включително проектиране и пускане в експлоатация." },
  { q: "Колко струва зареждането вкъщи?", a: "При зареждане от соларни панели цената е ~0.15 лв/kWh, или ~3.00 лв за 100 km. Това е 4-5 пъти по-евтино от бензинов автомобил и 4 пъти по-евтино от обществена зарядна станция." },
];

export function EvZaryadniContent() {
  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "0px 0px -15% 0px" });
  const integRef = useRef<HTMLDivElement>(null);
  const integInView = useInView(integRef, { once: true, margin: "0px 0px -15% 0px" });
  const vehicleRef = useRef<HTMLDivElement>(null);
  const vehicleInView = useInView(vehicleRef, { once: true, margin: "0px 0px -10% 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [monthlyKm, setMonthlyKm] = useState(1500);

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero */}
      <section className="relative min-h-[100vh] flex items-end">
        <ImageEditorial
          src={PRODUCT_IMAGES.evCharging}
          alt="Соларен карпорт с EV зарядни станции"
          fill
          reveal
          grain
          parallax
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <motion.div variants={blurIn} initial="hidden" animate="visible">
            <BadgeChip variant="hero">E-мобилност</BadgeChip>
          </motion.div>
          <TextReveal as="h1" className="text-editorial-hero text-white mt-2 max-w-4xl">
            EV Зарядни Станции
          </TextReveal>
          <motion.p variants={slideFromLeft} initial="hidden" animate="visible" className="mt-6 max-w-xl text-lg md:text-2xl text-white/70 font-body leading-relaxed">
            Заредете автомобила си от слънцето. Интелигентни зарядни станции, интегрирани с вашата соларна система и батерия.
          </motion.p>
          <div className="mt-10 flex flex-wrap gap-12">
            <StatNumber value={22} suffix=" kW" context="Макс. мощност" className="text-white" contextClassName="text-white/50" />
            <StatNumber value={77} suffix="%" context="Спестяване" className="text-accent" contextClassName="text-white/50" />
            <StatNumber value={0.15} suffix=" лв/kWh" context="Цена от слънце" className="text-white" contextClassName="text-white/50" duration={1500} />
          </div>
          <motion.div variants={blurIn} initial="hidden" animate="visible" className="mt-10">
            <MagneticButton href="/konfigurator" variant="primary">
              Конфигурирай система
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

      {/* 2 — Smart Charging Modes */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-4">
            Режими на зареждане
          </TextReveal>
          <p className="text-lg text-muted-foreground font-body mb-12 max-w-2xl">
            Три интелигентни режима, които адаптират зареждането към условията — за максимална икономия и удобство.
          </p>
          <motion.div
            variants={createStagger(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {chargingModes.map((mode) => (
              <motion.div key={mode.title} variants={staggerItem}>
                <TiltCard className="h-full">
                  <div className={cn("rounded-2xl border-2 p-8 h-full", mode.accent)}>
                    <mode.icon className={cn("h-10 w-10 mb-5", mode.iconColor)} strokeWidth={1.5} />
                    <div className="mb-1">
                      <span className="text-xs font-display font-semibold uppercase tracking-wider opacity-60">{mode.subtitle}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold">{mode.title}</h3>
                    <p className="mt-3 text-sm opacity-70 font-body leading-relaxed">{mode.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3 — Vehicle Compatibility */}
      <section ref={vehicleRef} className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Съвместимост</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-12">
            Поддържани автомобили
          </TextReveal>
          <motion.div
            variants={revealFromBottom}
            initial="hidden"
            animate={vehicleInView ? "visible" : "hidden"}
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  {["Марка", "Модели", "Мощност на зареждане", "Време 10→80%"].map((h) => (
                    <th key={h} className="py-3 px-4 font-display font-semibold text-white/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr key={v.brand} className={cn("border-b border-white/10", i % 2 === 0 && "bg-white/3")}>
                    <td className="py-4 px-4 font-display font-bold">{v.brand}</td>
                    <td className="py-4 px-4 font-body text-white/70">{v.models}</td>
                    <td className="py-4 px-4 font-body text-white/70">{v.speed}</td>
                    <td className="py-4 px-4 font-body text-accent">{v.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-6 text-xs text-white/50 font-body">
            * Времената за зареждане са приблизителни при 11 kW AC зареждане. Реалните стойности зависят от модела и условията.
          </p>
        </div>
      </section>

      {/* 4 — Cost Comparison */}
      <section ref={compRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Цена на зареждане
          </TextReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={compInView ? "visible" : "hidden"}
              className="rounded-3xl border-2 border-accent/20 bg-accent/5 p-10 text-center"
            >
              <Home className="h-10 w-10 text-accent mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-sm font-display font-semibold text-accent uppercase tracking-wider mb-2">Вкъщи със соларни панели</p>
              <p className="text-6xl font-display font-black text-accent">0.15</p>
              <p className="text-lg text-muted-foreground font-body mt-1">лв/kWh</p>
              <div className="mt-6 pt-6 border-t border-accent/20">
                <p className="text-sm text-muted-foreground font-body">100 km ≈ 3.00 лв</p>
              </div>
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate={compInView ? "visible" : "hidden"}
              className="rounded-3xl border-2 border-border bg-muted/30 p-10 text-center"
            >
              <Plug className="h-10 w-10 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Обществена станция</p>
              <p className="text-6xl font-display font-black text-muted-foreground">0.65</p>
              <p className="text-lg text-muted-foreground font-body mt-1">лв/kWh</p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground font-body">100 km ≈ 13.00 лв</p>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={scaleSpring}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-8 py-4">
              <span className="text-3xl font-display font-black text-accent">77%</span>
              <span className="text-sm text-muted-foreground font-body text-left">по-ниска цена<br />на зареждане вкъщи</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5 — Integration Diagram */}
      <section ref={integRef} className="py-24 md:py-32 bg-[#0a0f1a] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-white text-center mb-16">
            Интегрирана система
          </TextReveal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={integInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            {[
              { icon: Sun, label: "Соларни панели", sub: "Производство", glow: "shadow-amber-500/20" },
              { icon: Battery, label: "Батерия", sub: "Съхранение", glow: "shadow-accent/20" },
              { icon: Car, label: "EV Зарядна", sub: "Зареждане", glow: "shadow-blue-500/20" },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center gap-4 md:gap-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={integInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
                  className={cn("bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-center shadow-lg", node.glow)}
                >
                  <node.icon className="h-8 w-8 mx-auto mb-2 text-accent" strokeWidth={1.5} />
                  <p className="font-display font-bold">{node.label}</p>
                  <p className="text-xs mt-1 text-white/40 font-body">{node.sub}</p>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={integInView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                    className="hidden md:flex items-center gap-1 origin-left"
                  >
                    <div className="h-0.5 w-10 bg-accent/30" />
                    <Zap className="h-4 w-4 text-accent" />
                    <div className="h-0.5 w-10 bg-accent/30" />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-white/40 font-body mt-12 max-w-lg mx-auto"
          >
            Соларните панели захранват батерията и зарядната станция. При нужда мрежата допълва, но приоритетът винаги е чиста енергия.
          </motion.p>
        </div>
      </section>

      {/* 6 — Cost Savings Calculator */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-center mb-4">
            Калкулатор за спестявания
          </TextReveal>
          <p className="text-center text-muted-foreground font-body mb-12 max-w-lg mx-auto">
            Изчислете колко спестявате като зареждате от слънцето вместо от бензиностанцията.
          </p>
          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#f8faf6] rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-4">
              <label className="font-display font-semibold">Месечни километри</label>
              <span className="text-2xl font-display font-bold text-accent">{monthlyKm} km</span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={monthlyKm}
              onChange={(e) => setMonthlyKm(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-accent/20 appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-body">
              <span>500 km</span>
              <span>5 000 km</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 text-center">
                <Fuel className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <p className="text-xs text-red-600 font-body mb-1">Бензин (8л/100km)</p>
                <p className="text-3xl font-display font-black text-red-600">{Math.round(monthlyKm * 0.08 * 2.8)} лв</p>
                <p className="text-xs text-red-500 mt-1 font-body">/ месец</p>
              </div>
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center">
                <Zap className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-xs text-green-600 font-body mb-1">EV от соларни панели</p>
                <p className="text-3xl font-display font-black text-green-600">{Math.round(monthlyKm * 0.2 * 0.15)} лв</p>
                <p className="text-xs text-green-500 mt-1 font-body">/ месец</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground font-body">Годишно спестявате</p>
              <p className="text-4xl font-display font-black text-accent mt-1">
                {Math.round((monthlyKm * 0.08 * 2.8 - monthlyKm * 0.2 * 0.15) * 12)} лв
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7 — Environmental Impact */}
      <section className="py-24 md:py-32 bg-[#f7f9f4]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-editorial-overline text-accent">Екология</p>
          <TextReveal as="h2" className="text-editorial-display mt-2 mb-16">
            Пътуване с нулеви емисии
          </TextReveal>
          <motion.div
            variants={createStagger(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { val: 2.4, sfx: " т.", ctx: "CO₂ спестени годишно" },
              { val: 120, sfx: "", ctx: "Засадени дървета еквивалент" },
              { val: 77, sfx: "%", ctx: "По-евтино от бензин" },
              { val: 0, sfx: "", ctx: "Вредни емисии" },
            ].map((s) => (
              <motion.div key={s.ctx} variants={staggerItem} className="text-center p-6 rounded-2xl bg-white border border-border/50">
                <StatNumber value={s.val} suffix={s.sfx} context={s.ctx} className="text-3xl" contextClassName="text-muted-foreground" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8 — Testimonial */}
      <section className="py-28 md:py-36 bg-white">
        <div className="mx-auto max-w-5xl px-6 relative">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.06, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute -top-16 -left-8 text-[16rem] leading-none font-display text-foreground select-none pointer-events-none"
          >
            &ldquo;
          </motion.span>
          <motion.blockquote
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-editorial-pull-quote text-foreground relative z-10"
          >
            Зареждам колата от покрива всяка нощ. Сметката за гориво падна от 400 лв на под 50 лв месечно.
          </motion.blockquote>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 text-muted-foreground font-body text-sm"
          >
            — Георги К., Tesla Model 3, София
          </motion.p>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-white mb-12">
            Често задавани въпроси
          </TextReveal>
          <div className="space-y-3">
            {evFaqs.map((f, i) => (
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

      {/* Related Products */}
      <section className="py-24 md:py-32 bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-editorial-display mb-12">Свързани продукти</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Батерии", desc: "LFP съхранение с 6000+ цикъла за енергийна независимост денонощно.", href: "/produkti/baterii" },
              { title: "Соларни Панели", desc: "MWT модули с 21.5% ефективност за максимално производство от всеки квадратен метър.", href: "/produkti/solarni-paneli" },
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
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="text-editorial-display mb-6">
            Заредете от слънцето
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            Добавете EV зарядна станция към вашата соларна система и намалете разходите за гориво с до 77%.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Конфигурирайте система <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
