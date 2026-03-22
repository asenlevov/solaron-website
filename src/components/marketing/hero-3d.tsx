"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { SceneCanvasDynamic } from "@/components/3d/scene-container";
import { HouseModel } from "@/components/3d/house-model";
import { SolarPanelArray } from "@/components/3d/solar-panel-array";
import { BatteryUnit } from "@/components/3d/battery-unit";
import { EnergyFlow } from "@/components/3d/energy-flow";
import { DioramaBase } from "@/components/3d/diorama-base";
import { Tree } from "@/components/3d/tree";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

function HeroScene() {
  return (
    <group>
      <DioramaBase />
      <HouseModel type="single-story" showRoof />
      <group position={[0, 3.57, 0.15]}>
        <SolarPanelArray count={12} roofWidth={5} roofDepth={7} />
      </group>
      <BatteryUnit visible position={[4, 0.65, 2]} />
      <Tree position={[-6, 0, -5]} scale={0.7} type="deciduous" />
      <Tree position={[-8, 0, 2]} scale={0.6} type="conifer" />
      <Tree position={[7, 0, -5]} scale={0.65} type="deciduous" />
      <Tree position={[9, 0, 1]} scale={0.45} type="conifer" />
      <EnergyFlow
        visible
        panelPosition={[0, 4, 0]}
        inverterPosition={[3.5, 2, 3]}
        housePosition={[0, 1.5, 0]}
        batteryPosition={[4, 0.65, 2]}
      />
    </group>
  );
}

export function Hero3D() {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations("Home");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0f0a]"
    >
      <div className="absolute inset-0">
        <SceneCanvasDynamic
          className="h-full w-full"
          camera={{ position: [8, 5, 10], fov: 35 }}
          autoRotate
        >
          <HeroScene />
        </SceneCanvasDynamic>
      </div>

      {/* Left-side gradient for text readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 50%, white 100%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl overflow-hidden">
          <div style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7), 0 4px 60px rgba(0,0,0,0.4)" }}>
            <TextReveal
              as="h1"
              className="editorial-hero font-light text-white"
              delay={0.1}
            >
              {t("hero.3dTitle1")}
            </TextReveal>
            <TextReveal
              as="span"
              className="editorial-hero font-black text-white"
              delay={0.3}
            >
              {t("hero.3dTitle2")}
            </TextReveal>
          </div>

          <motion.p
            className="mt-6 max-w-xl text-lg text-white/80 md:text-xl"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.6), 0 2px 40px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {t("hero.3dSubtitle", { percent: "80%" })}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.2em] text-white/50 md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span>{t("hero.3dYears")}</span>
            <span className="text-[#3B7A2A]">·</span>
            <span>{t("hero.3dClients")}</span>
            <span className="text-[#3B7A2A]">·</span>
            <span>{t("hero.3dAward")}</span>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            <MagneticButton href="/konfigurator" variant="primary" size="xl">
              {t("hero.primaryCta")}
            </MagneticButton>
            <MagneticButton href="/kontakti" variant="outline" size="xl">
              {t("hero.secondaryCta")}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <motion.div
          className="h-12 w-[2px] rounded-full bg-[#3B7A2A]"
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
