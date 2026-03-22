"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";

import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  revealFromLeft,
  slideFromRight,
  scaleSpring,
  blurIn,
  staggerContainer,
  staggerItem,
  revealFromBottom,
} from "@/lib/animations";
import { PRODUCT_IMAGES, REAL_IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";

/* ─── Product 1: Panels — full-bleed image left, text overlapping edge ─── */

function SolarPanelsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div ref={ref} className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid items-center lg:grid-cols-[60%_1fr]">
          {/* Full-bleed image */}
          <motion.div
            variants={revealFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <ImageEditorial
              src={PRODUCT_IMAGES.solarPanel}
              alt="Соларни панели с MWT технология — близък план"
              width={1200}
              height={800}
              reveal
              grain
              containerClassName="aspect-[4/3] w-full"
            />
          </motion.div>

          {/* Text overlapping image edge by negative margin */}
          <motion.div
            className="relative z-10 rounded-2xl bg-white px-6 py-12 md:px-12 lg:-ml-12 lg:py-10"
            variants={slideFromRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="editorial-overline mb-4">ПРОДУКТ</p>

            <TextReveal as="h3" className="editorial-display text-foreground">
              Соларни Панели
            </TextReveal>

            {/* Spec badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {["450W", "21.5% ефективност", "30 год. гаранция"].map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-[#3B7A2A]/20 bg-[#3B7A2A]/5 px-4 py-1.5 text-sm font-semibold text-[#3B7A2A]"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-8 max-w-lg space-y-4 text-base leading-relaxed text-foreground-secondary md:text-lg">
              <p>
                Нашите панели използват Metal Wrap Through (MWT) технология — иновативен
                подход, при който проводниците преминават през задната страна на клетката,
                елиминирайки засенчването от традиционните busbar ленти.
              </p>
              <p>
                Резултатът е по-голяма активна повърхност, по-висока ефективност и
                значително по-дълъг експлоатационен живот благодарение на намалените
                механични напрежения.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="editorial-pull-quote mt-8 max-w-md border-l-2 border-[#3B7A2A]/30 pl-6 text-foreground-secondary">
              Технологията MWT елиминира микропукнатините и увеличава ефективността с
              до 3%
            </blockquote>

            <Link
              href="/produkti/solarni-paneli"
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#3B7A2A] transition-colors hover:text-[#2D6120]"
            >
              Научи Повече
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Product 2: Battery — dark bg, centered image, stats around ─── */

function BatterySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:px-8 md:py-32 lg:py-40"
      style={{
        background:
          "linear-gradient(180deg, #0a0f0a 0%, #111a11 50%, #0a0f0a 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(59,122,42,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          variants={blurIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="editorial-overline mb-4">СЪХРАНЕНИЕ</p>
          <TextReveal as="h3" className="editorial-display text-white">
            Батерии
          </TextReveal>
        </motion.div>

        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-12">
          {/* Left stats */}
          <motion.div
            className="flex flex-row items-center justify-center gap-8 overflow-hidden md:flex-col md:items-end md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={scaleSpring}>
              <StatNumber
                value={10}
                suffix=" kWh"
                context="Капацитет"
                className="text-white"
                contextClassName="text-white/40 text-right"
              />
            </motion.div>
            <motion.div variants={scaleSpring}>
              <StatNumber
                value={6000}
                prefix="+"
                context="Цикъла"
                className="text-white"
                contextClassName="text-white/40 text-right"
              />
            </motion.div>
          </motion.div>

          {/* Center product image */}
          <motion.div
            variants={scaleSpring}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <ImageEditorial
              src={PRODUCT_IMAGES.battery}
              alt="Батерия за съхранение на енергия — LFP технология"
              width={400}
              height={500}
              grain
              containerClassName="aspect-[4/5] w-64 md:w-80 rounded-2xl mx-auto"
            />
          </motion.div>

          {/* Right stats */}
          <motion.div
            className="flex flex-row items-center justify-center gap-8 overflow-hidden md:flex-col md:items-start md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={scaleSpring}>
              <StatNumber
                value={10}
                suffix=" год."
                context="Гаранция"
                className="text-white"
                contextClassName="text-white/40"
              />
            </motion.div>
            <motion.div variants={scaleSpring}>
              <StatNumber
                value={95}
                suffix="%"
                context="Ефективност"
                className="text-[#4CAF50]"
                contextClassName="text-white/40"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-2xl text-center"
          variants={blurIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-base leading-relaxed text-white/60 md:text-lg">
            Литиево-желязо-фосфатните (LFP) батерии предлагат несравнима безопасност
            и дълъг живот. Съхранявайте излишната енергия от деня и я използвайте
            вечер — постигнете пълна енергийна независимост без компромиси.
          </p>

          <Link
            href="/produkti/baterii"
            className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#4CAF50] transition-colors hover:text-[#66BB6A]"
          >
            Научи Повече
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Product 3: Inverter — warm bg, ultra-wide image, two-column text ─── */

function InverterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div ref={ref} className="bg-[#f7f7f5] px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Ultra-wide cinematic image */}
        <motion.div
          variants={blurIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ImageEditorial
            src={PRODUCT_IMAGES.inverter}
            alt="Инвертор SolarEdge — монтаж и оптимизация"
            width={1400}
            height={600}
            parallax
            containerClassName="aspect-[21/9] w-full overflow-hidden rounded-2xl"
          />
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16"
          variants={revealFromBottom}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="editorial-overline mb-4">ОПТИМИЗАЦИЯ</p>
          <TextReveal as="h3" className="editorial-display text-foreground">
            Инвертори
          </TextReveal>
        </motion.div>

        {/* Two-column: description left, specs right */}
        <motion.div
          className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={staggerItem} className="space-y-4">
            <p className="text-base leading-relaxed text-foreground-secondary md:text-lg">
              Инверторите SolarEdge с HD-Wave технология преобразуват постоянния
              ток от панелите в променлив ток с рекордна ефективност от 99.5%.
              Всеки панел се оптимизира поотделно чрез P950 оптимайзерите.
            </p>
            <p className="text-base leading-relaxed text-foreground-secondary md:text-lg">
              Вградената платформа за мониторинг ви дава пълна видимост на
              производството в реално време — от всеки отделен панел до цялата
              система.
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <div className="space-y-6">
              {[
                { label: "Технология", value: "SolarEdge HD-Wave" },
                { label: "Оптимайзери", value: "P950 per-panel" },
                { label: "Ефективност", value: "99.5%" },
                { label: "Гаранция", value: "12 години" },
                { label: "Мониторинг", value: "Real-time per-panel" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between border-b border-foreground/5 pb-3"
                >
                  <span className="text-sm font-medium text-foreground-secondary">
                    {spec.label}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/produkti/invertori"
              className={cn(
                "group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#3B7A2A] transition-colors hover:text-[#2D6120]",
              )}
            >
              Научи Повече
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Export ─── */

export function ProductShowcase() {
  return (
    <section>
      <SolarPanelsSection />
      <BatterySection />
      <InverterSection />
    </section>
  );
}
