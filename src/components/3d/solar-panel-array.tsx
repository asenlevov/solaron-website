"use client";

import { memo, useMemo } from "react";

import { SolarPanel } from "./solar-panel";

export type SolarPanelArrayProps = {
  count: number;
  roofWidth: number;
  roofDepth: number;
  panelScale?: number;
  roofPitchRad?: number;
};

const GAP = 0.18;
const BASE_W = 1.7;
const BASE_D = 1.0;

function depthForRows(rows: number, panelD: number, gap: number) {
  return rows * panelD + (rows - 1) * gap;
}

function computeGrid(
  count: number,
  roofWidth: number,
  roofDepth: number,
  panelW: number,
  panelD: number,
  gap: number,
): { cols: number; rows: number } {
  if (count <= 0) return { cols: 0, rows: 0 };
  let cols = Math.min(
    count,
    Math.max(1, Math.floor((roofWidth + gap) / (panelW + gap))),
  );
  let rows = Math.ceil(count / cols);

  while (cols < count && depthForRows(rows, panelD, gap) > roofDepth) {
    cols += 1;
    rows = Math.ceil(count / cols);
    if (depthForRows(rows, panelD, gap) <= roofDepth) break;
  }

  return { cols, rows };
}

function SolarPanelArrayInner({
  count,
  roofWidth,
  roofDepth,
  panelScale = 1,
  roofPitchRad = 0.28,
}: SolarPanelArrayProps) {
  const positions = useMemo(() => {
    const pw = BASE_W * panelScale;
    const pd = BASE_D * panelScale;
    const { cols, rows } = computeGrid(
      count,
      roofWidth,
      roofDepth,
      pw,
      pd,
      GAP,
    );
    const totalW = cols * pw + (cols - 1) * GAP;
    const totalD = rows * pd + (rows - 1) * GAP;
    const startX = -totalW / 2 + pw / 2;
    const startZ = -totalD / 2 + pd / 2;
    const pos: [number, number, number][] = [];
    let n = 0;
    for (let row = 0; row < rows && n < count; row++) {
      for (let col = 0; col < cols && n < count; col++) {
        const x = startX + col * (pw + GAP);
        const z = startZ + row * (pd + GAP);
        pos.push([x, 0, z]);
        n++;
      }
    }
    return pos;
  }, [count, panelScale, roofDepth, roofWidth]);

  if (count <= 0 || positions.length === 0) return null;

  return (
    <group rotation={[roofPitchRad, 0, 0]}>
      {positions.map((p, i) => (
        <SolarPanel key={i} position={p} />
      ))}
    </group>
  );
}

export const SolarPanelArray = memo(SolarPanelArrayInner);

SolarPanelArray.displayName = "SolarPanelArray";
