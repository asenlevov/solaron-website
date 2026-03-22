"use client";

import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Home");
  const tc = useTranslations("Common");

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
            <p className="editorial-overline mb-4">{t("productShowcase.solarPanels.overline")}</p>

            <TextReveal as="h3" className="editorial-display text-foreground">
              {t("productShowcase.solarPanels.title")}
            </TextReveal>

            {/* Spec badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {(t.raw("productShowcase.solarPanels.specs") as string[]).map((spec: string) => (
                <span
                  key={spec}
                  className="rounded-full border border-[#3B7A2A]/20 bg-[#3B7A2A]/5 px-4 py-1.5 text-sm font-semibold text-[#3B7A2A]"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-8 max-w-lg space-y-4 text-base leading-relaxed text-foreground-secondary md:text-lg">
              <p>{t("productShowcase.solarPanels.desc1")}</p>
              <p>{t("productShowcase.solarPanels.desc2")}</p>
            </div>

            {/* Pull quote */}
            <blockquote className="editorial-pull-quote mt-8 max-w-md border-l-2 border-[#3B7A2A]/30 pl-6 text-foreground-secondary">
              {t("productShowcase.solarPanels.pullQuote")}
            </blockquote>

            <Link
              href={"/produkti/solarni-paneli" as never}
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#3B7A2A] transition-colors hover:text-[#2D6120]"
            >
              {tc("learnMore")}
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
  const t = useTranslations("Home");
  const tc = useTranslations("Common");

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
          <p className="editorial-overline mb-4">{t("productShowcase.batteries.overline")}</p>
          <TextReveal as="h3" className="editorial-display text-white">
            {t("productShowcase.batteries.title")}
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
                context={t("productShowcase.batteries.capacity")}
                className="text-white"
                contextClassName="text-white/40 text-right"
              />
            </motion.div>
            <motion.div variants={scaleSpring}>
              <StatNumber
                value={6000}
                prefix="+"
                context={t("productShowcase.batteries.cycles")}
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
                context={t("productShowcase.batteries.warrantyLabel")}
                className="text-white"
                contextClassName="text-white/40"
              />
            </motion.div>
            <motion.div variants={scaleSpring}>
              <StatNumber
                value={95}
                suffix="%"
                context={t("productShowcase.batteries.efficiencyLabel")}
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
            {t("productShowcase.batteries.desc")}
          </p>

          <Link
            href={"/produkti/baterii" as never}
            className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#4CAF50] transition-colors hover:text-[#66BB6A]"
          >
            {tc("learnMore")}
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
  const t = useTranslations("Home");
  const tc = useTranslations("Common");

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
          <p className="editorial-overline mb-4">{t("productShowcase.inverters.overline")}</p>
          <TextReveal as="h3" className="editorial-display text-foreground">
            {t("productShowcase.inverters.title")}
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
              {t("productShowcase.inverters.desc1")}
            </p>
            <p className="text-base leading-relaxed text-foreground-secondary md:text-lg">
              {t("productShowcase.inverters.desc2")}
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <div className="space-y-6">
              {[
                { label: t("productShowcase.inverters.specTechnology"), value: t("productShowcase.inverters.specTechnologyValue") },
                { label: t("productShowcase.inverters.specOptimizers"), value: t("productShowcase.inverters.specOptimizersValue") },
                { label: t("productShowcase.inverters.specEfficiency"), value: t("productShowcase.inverters.specEfficiencyValue") },
                { label: t("productShowcase.inverters.specWarranty"), value: t("productShowcase.inverters.specWarrantyValue") },
                { label: t("productShowcase.inverters.specMonitoring"), value: t("productShowcase.inverters.specMonitoringValue") },
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
              href={"/produkti/invertori" as never}
              className={cn(
                "group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#3B7A2A] transition-colors hover:text-[#2D6120]",
              )}
            >
              {tc("learnMore")}
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
