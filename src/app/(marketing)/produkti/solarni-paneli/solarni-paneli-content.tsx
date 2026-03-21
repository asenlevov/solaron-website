"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { type MotionValue, motion, useInView, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { SceneCanvasDynamic } from "@/components/3d/scene-container";
import { SolarPanel } from "@/components/3d/solar-panel";
import { REAL_IMAGES, PRODUCT_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  blurIn,
  scaleSpring,
  slideUp,
  slideFromRight,
  staggerContainer,
  staggerItem,
  createStagger,
} from "@/lib/animations";
import {
  Zap,
  Shield,
  TrendingDown,
  CloudRain,
  ArrowRight,
  Check,
  X as XIcon,
  Sun,
  Cloud,
  CloudSun,
  Thermometer,
  ChevronDown,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */

const specs = [
  { label: "Мощност", value: "450 Wp", highlight: true },
  { label: "Ефективност", value: "21.5%", highlight: true },
  { label: "Тип клетка", value: "MWT Mono", highlight: false },
  { label: "Размери", value: "1722 × 1134 × 30 mm", highlight: false },
  { label: "Тегло", value: "21.5 kg", highlight: false },
  { label: "Рамка", value: "Анодиран алуминий", highlight: false },
  { label: "Съединителна кутия", value: "IP68", highlight: false },
  { label: "Гаранция", value: "30 години", highlight: true },
];

const comparison = [
  { tech: "MWT Mono", efficiency: "21.5%", degradation: "0.4%/год", bifacial: true, microcrack: true, best: true },
  { tech: "PERC Mono", efficiency: "20.5%", degradation: "0.55%/год", bifacial: false, microcrack: false, best: false },
  { tech: "HJT", efficiency: "22.0%", degradation: "0.4%/год", bifacial: true, microcrack: true, best: false },
];

const warrantyData = [
  { year: 1, output: 97 },
  { year: 5, output: 95 },
  { year: 10, output: 92 },
  { year: 15, output: 90 },
  { year: 20, output: 88.5 },
  { year: 25, output: 87.5 },
  { year: 30, output: 84.8 },
];

const industryAvg = [
  { year: 1, output: 97 },
  { year: 5, output: 94 },
  { year: 10, output: 90 },
  { year: 15, output: 87 },
  { year: 20, output: 84 },
  { year: 25, output: 80 },
  { year: 30, output: 76 },
];

const benefits = [
  { icon: Zap, title: "Висока ефективност", desc: "21.5% ефективност при стандартни условия — до 12% повече енергия от конвенционални PERC панели.", stat: "21.5%" },
  { icon: Shield, title: "Издръжливост", desc: "IP68 клас защита, анодирана алуминиева рамка и устойчивост на корозия за 30+ години експлоатация.", stat: "IP68" },
  { icon: TrendingDown, title: "Ниска деградация", desc: "Само 0.4% годишна деградация. След 30 години панелите произвеждат над 84% от началната си мощност.", stat: "0.4%" },
  { icon: CloudRain, title: "Всякакви условия", desc: "Оптимална работа при облачно време, разсеяна светлина и високи температури благодарение на MWT технологията.", stat: "+8%" },
];

const layers = [
  { label: "Предно стъкло", desc: "3.2mm закалено стъкло с антирефлексно покритие", color: "#a8d4f0", highlight: false },
  { label: "EVA плёнка", desc: "Етилен-винил ацетат за херметизация", color: "#e8e8e8", highlight: false },
  { label: "MWT клетки", desc: "Монокристални клетки с задни контакти", color: "#1a2744", highlight: true },
  { label: "EVA плёнка", desc: "Долна херметизация", color: "#e8e8e8", highlight: false },
  { label: "Задно покритие", desc: "Устойчив на UV полимерен лист", color: "#f5f5f5", highlight: false },
];

const conditions = [
  { label: "Слънчево", performance: 100, icon: Sun, desc: "Пълна номинална мощност" },
  { label: "Облачно", performance: 78, icon: Cloud, desc: "MWT предимство: +8% vs PERC" },
  { label: "Разсеяна светлина", performance: 68, icon: CloudSun, desc: "Оптимизирано за дифузна светлина" },
  { label: "Високи температури", performance: 92, icon: Thermometer, desc: "Нисък температурен коефициент" },
];

const galleryImages = [
  { src: REAL_IMAGES.projects.saedinenie651_hero, alt: "651 kWp инсталация Съединение", aspect: "aspect-[4/3]", desc: "651 kWp наземна инсталация — гр. Съединение" },
  { src: REAL_IMAGES.projects.carport270_hero, alt: "270 kWp соларен карпорт Казанлък", aspect: "aspect-[3/4]", desc: "270 kWp соларен карпорт — гр. Казанлък" },
  { src: REAL_IMAGES.projects.varna39_hero, alt: "39 kWp покривна инсталация Варна", aspect: "aspect-[4/3]", desc: "39 kWp покривна система — гр. Варна" },
  { src: REAL_IMAGES.projects.kazanlak30_1, alt: "30 kWp инсталация Казанлък", aspect: "aspect-[3/4]", desc: "30 kWp покривна система — гр. Казанлък" },
  { src: REAL_IMAGES.installations.adoreenergyC1, alt: "Инсталация от близо", aspect: "aspect-[4/3]", desc: "Детайл от монтаж на MWT панели" },
  { src: REAL_IMAGES.projects.venelin63_hero, alt: "63 kWp инсталация", aspect: "aspect-[3/4]", desc: "63 kWp покривна система — с. Венелин" },
  { src: REAL_IMAGES.installations.nlProjectOverview1, alt: "Проект панорама", aspect: "aspect-[4/3]", desc: "Завършен търговски проект — панорамен изглед" },
];

/* ── Circular Progress SVG ────────────────────────────────── */

function CircularProgress({ value, size = 80, strokeWidth = 6 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-white/10" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-accent transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

/* ── Exploded Layer Component ─────────────────────────────── */

function ExplodedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const spread = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto md:mx-0">
      <div className="flex flex-col items-center gap-0">
        {layers.map((layer, i) => {
          const centerIndex = 2;
          const distFromCenter = i - centerIndex;
          return (
            <ExplodedLayer
              key={layer.label + i}
              layer={layer}
              index={i}
              distFromCenter={distFromCenter}
              spread={spread}
            />
          );
        })}
      </div>
    </div>
  );
}

function ExplodedLayer({
  layer,
  index,
  distFromCenter,
  spread,
}: {
  layer: typeof layers[number];
  index: number;
  distFromCenter: number;
  spread: MotionValue<number>;
}) {
  const y = useTransform(spread, [0, 1], [0, distFromCenter * 24]);
  const isHighlight = layer.highlight;
  const isLight = layer.color === "#e8e8e8" || layer.color === "#f5f5f5";
  const height = isHighlight ? "h-20" : layer.color === "#e8e8e8" ? "h-5" : "h-12";

  return (
    <motion.div className="relative flex items-center w-full" style={{ y }}>
      {index % 2 === 0 ? (
        <div className="hidden md:flex items-center justify-end w-40 mr-4">
          <div className="text-right">
            <p className="text-sm font-display font-bold text-foreground">{layer.label}</p>
            <p className="text-xs text-muted-foreground font-body">{layer.desc}</p>
          </div>
          <div className="w-8 h-px bg-border ml-3 flex-shrink-0" />
        </div>
      ) : (
        <div className="hidden md:block w-40 mr-4" />
      )}

      <div
        className={cn(
          "w-48 md:w-64 rounded-md shadow-sm border transition-shadow duration-500",
          height,
          isHighlight && "ring-2 ring-green-400/60 shadow-[0_0_20px_rgba(74,222,128,0.2)]",
          !isHighlight && "border-black/5",
        )}
        style={{ backgroundColor: layer.color }}
      />

      {index % 2 !== 0 ? (
        <div className="hidden md:flex items-center w-40 ml-4">
          <div className="w-8 h-px bg-border mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-display font-bold text-foreground">{layer.label}</p>
            <p className="text-xs text-muted-foreground font-body">{layer.desc}</p>
          </div>
        </div>
      ) : (
        <div className="hidden md:block w-40 ml-4" />
      )}

      <p className="md:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap font-body">
        {layer.label}
      </p>
    </motion.div>
  );
}

/* ── Main Content ─────────────────────────────────────────── */

export function SolarniPaneliContent() {
  const techRef = useRef<HTMLDivElement>(null);
  const techInView = useInView(techRef, { once: true, margin: "0px 0px -15% 0px" });
  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: "0px 0px -10% 0px" });
  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "0px 0px -10% 0px" });
  const warrantyRef = useRef<HTMLDivElement>(null);
  const warrantyInView = useInView(warrantyRef, { once: true, margin: "0px 0px -10% 0px" });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "0px 0px -10% 0px" });
  const conditionsRef = useRef<HTMLDivElement>(null);
  const conditionsInView = useInView(conditionsRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div className="overflow-hidden">
      {/* ── 1 · Hero ──────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex items-end">
        <ImageEditorial
          src={PRODUCT_IMAGES.solarPanel}
          alt="Модерен дом със соларни панели"
          fill
          reveal
          grain
          parallax
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32">
          <TextReveal as="h1" className="text-editorial-hero text-white max-w-4xl">
            Соларни Панели
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg md:text-xl text-white/80 font-body leading-relaxed"
          >
            MWT монокристални модули от ново поколение — максимална ефективност,
            минимална деградация, 30 години гарантирана производителност.
          </motion.p>
          <div className="mt-14 flex flex-wrap gap-12 md:gap-20">
            <StatNumber value={450} suffix="W" context="Пикова мощност" className="text-white" contextClassName="text-white/60" />
            <StatNumber value={21.5} suffix="%" context="Ефективност" className="text-white" contextClassName="text-white/60" duration={1500} />
            <StatNumber value={30} suffix=" год." context="Гаранция" className="text-white" contextClassName="text-white/60" duration={1800} />
          </div>
        </div>

        {/* Bouncing scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/40" />
        </motion.div>
      </section>

      {/* ── 2 · MWT Technology — Animated Exploded View ──── */}
      <section ref={techRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ExplodedView />

            <motion.div
              variants={slideFromRight}
              initial="hidden"
              animate={techInView ? "visible" : "hidden"}
            >
              <p className="text-editorial-overline text-accent">Технология</p>
              <h2 className="text-editorial-heading mt-2 font-display">
                MWT — Metal Wrap Through
              </h2>
              <div className="mt-8 space-y-5">
                <p className="text-lg text-muted-foreground font-body leading-relaxed">
                  При конвенционалните PERC клетки токопроводящите шини на лицевата
                  страна засенчват до <span className="font-semibold text-foreground">3% от повърхността</span>.
                  MWT технологията елиминира тези шини, като прекарва токовите
                  контакти през микроотвори към задната страна на клетката.
                </p>
                <p className="text-lg text-muted-foreground font-body leading-relaxed">
                  Резултатът: по-голяма активна площ, по-висока ефективност и
                  значително намален риск от микропукнатини — най-честата причина
                  за деградация при традиционните панели.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-2xl font-display font-bold text-foreground">3%</p>
                  <p className="text-sm text-muted-foreground font-body">възстановена площ</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-2xl font-display font-bold text-foreground">0%</p>
                  <p className="text-sm text-muted-foreground font-body">лицеви шини</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3 · Key Advantages — 2×2 Grid ────────────────── */}
      <section className="py-24 md:py-32 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-center mb-16">
            Предимства
          </TextReveal>
          <motion.div
            variants={createStagger(0.12, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={staggerItem}>
                <TiltCard className="h-full">
                  <div className="relative rounded-2xl border border-accent/10 bg-gradient-to-br from-white to-accent/[0.03] p-8 md:p-10 h-full overflow-hidden">
                    <span className="absolute top-6 right-6 text-2xl font-display font-black text-accent/15">
                      {b.stat}
                    </span>
                    <b.icon className="h-8 w-8 text-accent mb-5" strokeWidth={1.5} />
                    <h3 className="text-xl font-display font-bold">{b.title}</h3>
                    <p className="mt-3 text-muted-foreground font-body leading-relaxed">{b.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4 · Interactive 3D Panel Viewer ───────────────── */}
      <section className="py-24 md:py-32 bg-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">3D Модел</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-8">
            Разгледайте панела
          </TextReveal>
          <div className="aspect-[16/9] max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10">
            <SceneCanvasDynamic
              camera={{ position: [2, 1.5, 3], fov: 35 }}
              autoRotate
            >
              <SolarPanel position={[0, 0.5, 0]} rotation={[-0.3, 0, 0]} scale={1.5} />
            </SceneCanvasDynamic>
          </div>
          <p className="mt-4 text-center text-sm text-white/50 font-body">
            Завъртете с мишката за да разгледате от всеки ъгъл
          </p>
        </div>
      </section>

      {/* ── 5 · Technical Specifications ──────────────────── */}
      <section ref={specsRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-12">
            Технически характеристики
          </TextReveal>
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={specsInView ? "visible" : "hidden"}
            className="max-w-2xl mx-auto rounded-2xl border border-border overflow-hidden"
          >
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex items-center justify-between px-6 py-4",
                  i % 2 === 0 ? "bg-muted/30" : "bg-white",
                  s.highlight && "border-l-[3px] border-l-accent",
                )}
              >
                <span className="text-sm text-muted-foreground font-body">{s.label}</span>
                <span className={cn(
                  "text-sm font-display font-semibold",
                  s.highlight ? "text-accent" : "text-foreground",
                )}>
                  {s.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6 · Technology Comparison ─────────────────────── */}
      <section ref={compRef} className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Сравнение</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-12">
            MWT срещу конкуренцията
          </TextReveal>
          <motion.div
            variants={revealFromBottom}
            initial="hidden"
            animate={compInView ? "visible" : "hidden"}
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Технология</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Ефективност</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Деградация</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Бифасиален</th>
                  <th className="py-3 px-4 font-display font-semibold text-white/60">Без микропукнатини</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr key={c.tech} className={cn("border-b border-white/10", c.best && "bg-accent/15")}>
                    <td className="py-4 px-4 font-display font-bold">
                      {c.tech}
                      {c.best && (
                        <span className="ml-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          Нашият избор
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-body">{c.efficiency}</td>
                    <td className="py-4 px-4 font-body">{c.degradation}</td>
                    <td className="py-4 px-4">
                      {c.bifacial
                        ? <Check className="h-6 w-6 text-green-400" strokeWidth={2.5} />
                        : <XIcon className="h-5 w-5 text-white/40" />}
                    </td>
                    <td className="py-4 px-4">
                      {c.microcrack
                        ? <Check className="h-6 w-6 text-green-400" strokeWidth={2.5} />
                        : <XIcon className="h-5 w-5 text-white/40" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={compInView ? "visible" : "hidden"}
            className="mt-8 text-sm text-white/50 font-body max-w-2xl leading-relaxed"
          >
            * HJT постига по-висока лабораторна ефективност, но при значително по-висока цена.
            MWT предлага оптималния баланс между производителност, издръжливост и цена.
          </motion.p>
        </div>
      </section>

      {/* ── 7 · Installation Gallery ──────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Реализирани проекти
          </TextReveal>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.alt}
                variants={i % 2 === 0 ? revealFromBottom : scaleSpring}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                className="break-inside-avoid group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <ImageEditorial
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={450}
                    grain
                    containerClassName={cn("rounded-lg", img.aspect)}
                    className="rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-lg">
                    <p className="text-white text-sm font-body">{img.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8 · Warranty Timeline with Industry Avg ──────── */}
      <section ref={warrantyRef} className="py-24 md:py-32 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Гаранция</p>
          <TextReveal as="h2" className="text-editorial-display mt-2 mb-16">
            30 години гарантирана мощност
          </TextReveal>

          <div className="relative max-w-3xl">
            {/* Industry average dotted overlay */}
            <div className="absolute inset-0 flex items-end gap-3 md:gap-6 h-64 pointer-events-none z-10">
              {industryAvg.map((d) => (
                <div key={`avg-${d.year}`} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex justify-center">
                    <div
                      className="w-full border-t-2 border-dashed border-red-400/40"
                      style={{ marginTop: `${200 - (d.output / 100) * 200}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm bg-gradient-to-t from-accent to-accent/60" />
                <span className="text-xs font-body text-muted-foreground">MWT панели</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0 border-t-2 border-dashed border-red-400/50" />
                <span className="text-xs font-body text-muted-foreground">Индустриален стандарт</span>
              </div>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-3 md:gap-6 h-64">
              {warrantyData.map((d, i) => (
                <motion.div
                  key={d.year}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ scaleY: 0 }}
                  animate={warrantyInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                >
                  <span className="text-xs font-display font-bold text-accent">{d.output}%</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent/60"
                    style={{ height: `${(d.output / 100) * 200}px` }}
                  />
                  <span className="text-xs text-muted-foreground font-body">Год. {d.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9 · Performance in Real Conditions ────────────── */}
      <section ref={conditionsRef} className="py-24 md:py-32 bg-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-editorial-overline text-accent">Производителност</p>
          <TextReveal as="h2" className="text-editorial-display text-white mt-2 mb-16">
            При всякакви условия
          </TextReveal>
          <motion.div
            variants={createStagger(0.1, 0.15)}
            initial="hidden"
            animate={conditionsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {conditions.map((c) => (
              <motion.div
                key={c.label}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <CircularProgress value={c.performance} size={88} strokeWidth={5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-display font-bold text-white">{c.performance}%</span>
                  </div>
                </div>
                <c.icon className="h-6 w-6 text-accent mb-3" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-white text-sm">{c.label}</h3>
                <p className="mt-2 text-xs text-white/50 font-body leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 10 · Pull Quote ───────────────────────────────── */}
      <section ref={quoteRef} className="py-28 md:py-36 bg-[#f8faf6]">
        <div className="mx-auto max-w-5xl px-6 relative">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={quoteInView ? { opacity: 0.06, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute -top-16 -left-8 text-[16rem] leading-none font-display text-foreground select-none pointer-events-none"
          >
            &ldquo;
          </motion.span>
          <motion.blockquote
            variants={blurIn}
            initial="hidden"
            animate={quoteInView ? "visible" : "hidden"}
            className="text-editorial-pull-quote text-foreground relative z-10"
          >
            Технологията MWT елиминира микропукнатините — най-честата причина за
            загуба на мощност при конвенционалните панели.
          </motion.blockquote>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={quoteInView ? "visible" : "hidden"}
            className="mt-6 text-muted-foreground font-body text-sm"
          >
            — Инж. технически отдел, Solaron Energy
          </motion.p>
        </div>
      </section>

      {/* ── 11 · Related Products ─────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-12">
            Свързани продукти
          </TextReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6 max-w-3xl"
          >
            {[
              { title: "Инвертори SolarEdge", href: "/produkti/invertori", img: PRODUCT_IMAGES.inverter },
              { title: "Конструкции за монтаж", href: "/produkti/konstrukcii", img: REAL_IMAGES.projects.varna39_1 },
            ].map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <GlowCard className="rounded-2xl h-full">
                  <Link href={p.href} className="group block overflow-hidden rounded-2xl">
                    <div className="relative aspect-[16/9]">
                      <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="font-display font-bold">{p.title}</h3>
                      <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 12 · CTA ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-foreground">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="text-editorial-display text-white mb-6">
            Готови за соларна енергия?
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-white/70 font-body mb-10 max-w-xl mx-auto"
          >
            Конфигурирайте вашата система онлайн и получете персонализирана оферта за минути.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="primary" size="xl">
            Конфигуратор <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
