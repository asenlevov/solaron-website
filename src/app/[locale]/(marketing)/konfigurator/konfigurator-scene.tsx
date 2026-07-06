"use client";

import SceneCanvas from "@/components/3d/scene-canvas";
import { BatteryUnit } from "@/components/3d/battery-unit";
import { DioramaBase } from "@/components/3d/diorama-base";
import { EnergyFlow } from "@/components/3d/energy-flow";
import type { HouseType } from "@/components/3d/house-model";
import { HouseModel } from "@/components/3d/house-model";
import { SolarPanelArray } from "@/components/3d/solar-panel-array";
import { Tree } from "@/components/3d/tree";

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

export interface KonfiguratorSceneProps {
  houseType: HouseType;
  roofArea: number;
  panelCount: number;
  hasBattery: boolean;
  roofPitchDeg: number;
}

function ConfiguratorScene({
  houseType,
  roofArea,
  panelCount,
  hasBattery,
  roofPitchDeg,
}: KonfiguratorSceneProps) {
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

export default function KonfiguratorScene(props: KonfiguratorSceneProps) {
  return (
    <SceneCanvas
      className="h-full w-full"
      camera={{ position: [14, 7, 16], fov: 38 }}
      target={[0, 2, 0]}
      autoRotate
    >
      <ConfiguratorScene {...props} />
    </SceneCanvas>
  );
}
