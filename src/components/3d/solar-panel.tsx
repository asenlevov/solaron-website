"use client";

import { useMemo } from "react";
import * as THREE from "three";

export type SolarPanelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

const PANEL_W = 1.7;
const PANEL_T = 0.03;
const PANEL_D = 1.0;
const FRAME_T = 0.02;
const FRAME_INSET = 0.006;

function CellGrid({
  panelW,
  panelD,
  yOffset,
}: {
  panelW: number;
  panelD: number;
  yOffset: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const cols = 6;
    const rows = 10;
    const positions: number[] = [];

    const inset = FRAME_INSET + FRAME_T;
    const usableW = panelW - inset * 2;
    const usableD = panelD - inset * 2;
    const startX = -usableW / 2;
    const startZ = -usableD / 2;

    for (let i = 1; i < cols; i++) {
      const x = startX + (i / cols) * usableW;
      positions.push(x, yOffset, startZ, x, yOffset, startZ + usableD);
    }
    for (let i = 1; i < rows; i++) {
      const z = startZ + (i / rows) * usableD;
      positions.push(startX, yOffset, z, startX + usableW, yOffset, z);
    }

    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [panelD, panelW, yOffset]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="#060d15"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function AluminumFrame({ w, d, t }: { w: number; d: number; t: number }) {
  const frameH = t + FRAME_T;
  const inset = FRAME_INSET;
  const matProps = { color: "#b8b8b8", metalness: 0.9, roughness: 0.2 } as const;

  return (
    <group>
      <mesh castShadow position={[0, 0, d / 2 - FRAME_T / 2 + inset]}>
        <boxGeometry args={[w + FRAME_T * 2, frameH, FRAME_T]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh castShadow position={[0, 0, -d / 2 + FRAME_T / 2 - inset]}>
        <boxGeometry args={[w + FRAME_T * 2, frameH, FRAME_T]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh castShadow position={[-w / 2 + FRAME_T / 2 - inset, 0, 0]}>
        <boxGeometry args={[FRAME_T, frameH, d + FRAME_T * 2]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh castShadow position={[w / 2 - FRAME_T / 2 + inset, 0, 0]}>
        <boxGeometry args={[FRAME_T, frameH, d + FRAME_T * 2]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
}

function JunctionBox() {
  return (
    <mesh position={[0, -PANEL_T / 2 - 0.01, PANEL_D / 2 - 0.15]}>
      <boxGeometry args={[0.15, 0.02, 0.1]} />
      <meshStandardMaterial color="#2d2d2d" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

export function SolarPanel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: SolarPanelProps) {
  const scaleArr: [number, number, number] =
    typeof scale === "number" ? [scale, scale, scale] : scale;

  return (
    <group position={position} rotation={rotation} scale={scaleArr}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[PANEL_W, PANEL_T, PANEL_D]} />
        <meshPhysicalMaterial
          color="#1a2535"
          metalness={0.15}
          roughness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2.0}
        />
      </mesh>

      <CellGrid panelW={PANEL_W} panelD={PANEL_D} yOffset={PANEL_T / 2 + 0.001} />
      <AluminumFrame w={PANEL_W} d={PANEL_D} t={PANEL_T} />
      <JunctionBox />
    </group>
  );
}
