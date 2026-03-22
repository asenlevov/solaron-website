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
/** Inset from roof edges so panels stay inside the footprint. */
const ROOF_INSET = 0.12;

function depthForRows(rows: number, panelD: number, gap: number) {
  return rows * panelD + (rows - 1) * gap;
}

function maxColsForWidth(roofWidth: number, panelW: number, gap: number) {
  return Math.max(1, Math.floor((roofWidth + gap) / (panelW + gap)));
}

function maxRowsForDepth(roofDepth: number, panelD: number, gap: number) {
  return Math.max(1, Math.floor((roofDepth + gap) / (panelD + gap)));
}

function computeGrid(
  count: number,
  roofWidth: number,
  roofDepth: number,
  panelW: number,
  panelD: number,
  gap: number,
): { cols: number; rows: number; placed: number } {
  if (count <= 0) return { cols: 0, rows: 0, placed: 0 };
  const effW = Math.max(0.2, roofWidth - 2 * ROOF_INSET);
  const effD = Math.max(0.2, roofDepth - 2 * ROOF_INSET);
  const maxCols = maxColsForWidth(effW, panelW, gap);
  const maxRows = maxRowsForDepth(effD, panelD, gap);
  const capacity = maxCols * maxRows;
  const n = Math.min(count, capacity);

  let cols = Math.min(n, maxCols);
  let rows = Math.ceil(n / cols);

  while (depthForRows(rows, panelD, gap) > effD && cols < maxCols) {
    cols += 1;
    rows = Math.ceil(n / cols);
  }

  return { cols, rows, placed: n };
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
    const { cols, rows, placed } = computeGrid(
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
    for (let row = 0; row < rows && n < placed; row++) {
      for (let col = 0; col < cols && n < placed; col++) {
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
