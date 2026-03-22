"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SceneCanvasDynamic } from "@/components/3d/scene-container";
import { BatteryUnit } from "@/components/3d/battery-unit";
import { DioramaBase } from "@/components/3d/diorama-base";
import { EnergyFlow } from "@/components/3d/energy-flow";
import type { HouseType } from "@/components/3d/house-model";
import { HouseModel } from "@/components/3d/house-model";
import { SolarPanelArray } from "@/components/3d/solar-panel-array";
import { Tree } from "@/components/3d/tree";
import {
  ControlPanel,
  type SolarConfiguratorConfig,
} from "@/components/configurator/control-panel";
import { RoiVisualization } from "@/components/configurator/roi-visualization";
import { SummaryCard } from "@/components/configurator/summary-card";
import { getIrradianceForCity } from "@/lib/electricity-prices";
import {
  calculate25YearProjection,
  calculateAnnualProduction,
  calculateAnnualSavings,
  calculateEnvironmentalImpact,
  calculatePaybackPeriod,
  calculateSystemCost,
} from "@/lib/solar-calculations";

const FOUNDATION_H = 0.18;

const HOUSE_SPECS: Record<HouseType, { w: number; h: number; d: number }> = {
  "single-story": { w: 8, h: 3.4, d: 7 },
  "two-story": { w: 8, h: 6.0, d: 7 },
  villa: { w: 10, h: 4.4, d: 9 },
  commercial: { w: 12, h: 4.8, d: 13 },
};

const BATTERY_POS: Record<HouseType, [number, number, number]> = {
  "single-story": [4.5, 1.4, 3],
  "two-story": [4.5, 1.4, 3],
  villa: [5.5, 1.4, 4],
  commercial: [6.5, 1.4, 6],
};

const ORIENTATION_MULTIPLIERS: Record<string, number> = {
  "Юг": 1.0,
  "Югоизток": 0.95,
  "Югозапад": 0.95,
  "Изток": 0.82,
  "Запад": 0.82,
};

const SHADING_MULTIPLIERS: Record<string, number> = {
  "Без": 1.0,
  "Леко": 0.9,
  "Средно": 0.75,
  "Силно": 0.6,
};

const DEFAULT_CONFIG: SolarConfiguratorConfig = {
  houseType: "single-story",
  roofArea: 80,
  panelCount: 27,
  hasBattery: true,
  batteryCapacity: 10,
  monthlyBill: 150,
  city: "София",
  roofOrientation: "Юг",
  roofPitch: 30,
  shadingLevel: "Без",
};

function ConfiguratorScene({
  houseType,
  roofArea,
  panelCount,
  hasBattery,
  roofPitchDeg,
}: {
  houseType: HouseType;
  roofArea: number;
  panelCount: number;
  hasBattery: boolean;
  roofPitchDeg: number;
}) {
  const scale = Math.sqrt(roofArea / 80);
  const spec = HOUSE_SPECS[houseType];
  const isFlat = houseType === "commercial";

  const pitchRad = (roofPitchDeg * Math.PI) / 180;
  const rise = isFlat ? 0.25 : Math.tan(pitchRad) * (spec.d / 2);

  const wallTop = FOUNDATION_H + spec.h;

  // The house geometry is rendered with scale=[scale, 1, scale].
  // Y stays 1:1 but Z is multiplied by scale, changing the apparent pitch.
  const apparentPitchRad = isFlat ? 0 : Math.atan2(rise, (spec.d / 2) * scale);

  const midSlopeY = wallTop + rise * 0.5;
  const halfSlopeZ = (spec.d / 4) * scale;

  const NORMAL_OFFSET = 0.15;
  const nOffY = NORMAL_OFFSET * Math.cos(apparentPitchRad);
  const nOffZ = NORMAL_OFFSET * Math.sin(apparentPitchRad);

  const backMountY = isFlat ? wallTop + 0.3 : midSlopeY + nOffY;
  const backMountZ = isFlat ? 0 : -halfSlopeZ - nOffZ;
  const frontMountY = backMountY;
  const frontMountZ = isFlat ? 0 : halfSlopeZ + nOffZ;

  const roofWidth = spec.w * scale * 0.85;
  const slopeDepth = isFlat ? spec.d * scale * 0.85 : (spec.d / 2) * scale * 0.85;

  const backCount = isFlat ? panelCount : Math.ceil(panelCount / 2);
  const frontCount = isFlat ? 0 : panelCount - backCount;

  const backMount: [number, number, number] = [0, backMountY, backMountZ];
  const frontMount: [number, number, number] = [0, frontMountY, frontMountZ];

  const batt = BATTERY_POS[houseType];
  const scaledBatt: [number, number, number] = [
    batt[0] * scale,
    batt[1],
    batt[2] * scale,
  ];

  const showFlow = panelCount > 0;
  const backPitchRad = isFlat ? 0 : -apparentPitchRad;
  const frontPitchRad = isFlat ? 0 : apparentPitchRad;

  return (
    <group>
      <DioramaBase />
      <group scale={[scale, 1, scale]}>
        <HouseModel type={houseType} showRoof roofPitchDeg={isFlat ? undefined : roofPitchDeg} />
      </group>
      {backCount > 0 && (
        <group position={backMount}>
          <SolarPanelArray
            count={backCount}
            roofWidth={roofWidth}
            roofDepth={slopeDepth}
            roofPitchRad={backPitchRad}
          />
        </group>
      )}
      {frontCount > 0 && (
        <group position={frontMount}>
          <SolarPanelArray
            count={frontCount}
            roofWidth={roofWidth}
            roofDepth={slopeDepth}
            roofPitchRad={frontPitchRad}
          />
        </group>
      )}
      <BatteryUnit visible={hasBattery} position={scaledBatt} />
      <EnergyFlow
        visible={showFlow}
        panelPosition={[0, backMountY + 0.5, backMountZ]}
        housePosition={[0, 1.5, 0]}
        inverterPosition={[4 * scale, 2, 3 * scale]}
        batteryPosition={scaledBatt}
      />
      <Tree position={[-6, 0, 3]} scale={0.9} type="deciduous" />
      <Tree position={[6, 0, -2]} scale={0.8} type="conifer" />
    </group>
  );
}

function useBounceKey(deps: unknown[]): number {
  const [key, setKey] = useState(0);
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setKey((k) => k + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return key;
}

export default function KonfiguratorPage() {
  const [config, setConfig] = useState<SolarConfiguratorConfig>(DEFAULT_CONFIG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const onConfigChange = useCallback((c: SolarConfiguratorConfig) => {
    setConfig(c);
  }, []);

  const metrics = useMemo(() => {
    const irradiance = getIrradianceForCity(config.city);
    const orientationMult = ORIENTATION_MULTIPLIERS[config.roofOrientation] ?? 1;
    const shadingMult = SHADING_MULTIPLIERS[config.shadingLevel] ?? 1;
    const pitchFactor = 1 - Math.abs(config.roofPitch - 33) * 0.003;
    const effectiveIrradiance = irradiance * orientationMult * shadingMult * pitchFactor;
    const annualProduction = calculateAnnualProduction(
      config.panelCount,
      450,
      effectiveIrradiance,
    );
    const annualSavings = calculateAnnualSavings(annualProduction);
    const systemCost = calculateSystemCost(
      config.panelCount,
      config.hasBattery,
      config.hasBattery ? config.batteryCapacity : 0,
    );
    const paybackYears = calculatePaybackPeriod(systemCost, annualSavings);
    const projection = calculate25YearProjection(systemCost, annualSavings);
    const totalSavings25yr =
      projection[projection.length - 1]?.cumulativeSavings ?? 0;
    const env = calculateEnvironmentalImpact(annualProduction);
    const systemSizeKwp = (config.panelCount * 450) / 1000;

    return {
      irradiance,
      annualProduction,
      annualSavings,
      systemCost,
      paybackYears,
      projection,
      totalSavings25yr,
      env,
      systemSizeKwp,
    };
  }, [config]);

  const bounceKey = useBounceKey([
    config.panelCount,
    config.roofArea,
    config.hasBattery,
    config.batteryCapacity,
    config.city,
    config.houseType,
    config.roofOrientation,
    config.roofPitch,
    config.shadingLevel,
  ]);

  const showCelebration =
    Number.isFinite(metrics.paybackYears) && metrics.paybackYears < 5 && metrics.paybackYears > 0;

  return (
    <div
      className={`bg-background text-foreground transition-all duration-700 ease-out ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 pt-14 pb-10 md:px-6 md:pt-22 lg:px-8">
        <header className="mb-8 max-w-3xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Solaron
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Конфигуратор на Соларна Система
          </h1>
          <p className="mt-3 font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
            Визуализирайте инсталацията, оценете спестяванията и екологичния
            ефект — с интерактивен 3D модел и прогноза за 25 години.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-border bg-background-secondary/30 shadow-card lg:sticky lg:top-28 lg:h-[min(75vh,700px)] lg:w-[60%]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30 pointer-events-none z-10" />
            <SceneCanvasDynamic
              className="h-full w-full"
              camera={{ position: [14, 7, 16], fov: 38 }}
              target={[0, 2, 0]}
              autoRotate
            >
              <ConfiguratorScene
                houseType={config.houseType}
                roofArea={config.roofArea}
                panelCount={config.panelCount}
                hasBattery={config.hasBattery}
                roofPitchDeg={config.roofPitch}
              />
            </SceneCanvasDynamic>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[40%]">
            <ControlPanel onChange={onConfigChange} />

            {showCelebration ? (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-[#3B7A2A]/30 bg-[#3B7A2A]/10 px-4 py-3 animate-pulse">
                <span className="inline-block size-2.5 rounded-full bg-[#3B7A2A]" />
                <span className="font-display text-sm font-semibold text-[#3B7A2A]">
                  Отлична Инвестиция!
                </span>
              </div>
            ) : null}

            <div
              key={bounceKey}
              className="animate-[bounce-in_0.3s_ease-out]"
              style={{
                animation: bounceKey > 0 ? "bounce-in 0.3s ease-out" : "none",
              }}
            >
              <RoiVisualization
                projection={metrics.projection}
                annualSavings={metrics.annualSavings}
                paybackYears={metrics.paybackYears}
                totalSavings25yr={metrics.totalSavings25yr}
                co2Saved={metrics.env.co2Saved}
                systemCost={metrics.systemCost}
              />
            </div>
            <div
              key={`summary-${bounceKey}`}
              style={{
                animation: bounceKey > 0 ? "bounce-in 0.3s ease-out 0.05s both" : "none",
              }}
            >
              <SummaryCard
                systemSizeKwp={metrics.systemSizeKwp}
                panelCount={config.panelCount}
                hasBattery={config.hasBattery}
                batteryCapacityKwh={config.batteryCapacity}
                annualProductionKwh={metrics.annualProduction}
                annualSavings={metrics.annualSavings}
                paybackYears={metrics.paybackYears}
                savings25yr={metrics.totalSavings25yr}
                co2SavedKgPerYear={metrics.env.co2Saved}
                treeEquivalent={metrics.env.treeEquivalent}
                city={config.city}
                roofOrientation={config.roofOrientation}
                roofArea={config.roofArea}
                roofPitch={config.roofPitch}
                systemCost={metrics.systemCost}
                monthlyBill={config.monthlyBill}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
