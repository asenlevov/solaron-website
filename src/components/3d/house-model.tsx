"use client";

import { useMemo } from "react";
import * as THREE from "three";

export type HouseType = "single-story" | "two-story" | "villa" | "commercial";

export type HouseModelProps = {
  type: HouseType;
  color?: string;
  showRoof: boolean;
  roofPitchDeg?: number;
};

const WALL_COLOR = "#f8f8f8";
const ROOF_COLOR = "#4a4a4a";
const DOOR_COLOR = "#333333";
const FOUNDATION_COLOR = "#e8e4dc";
const TRIM_COLOR = "#e0e0e0";
const FRAME_COLOR = "#2d2d2d";

const OVERHANG = 0.15;
const FOUNDATION_H = 0.18;

type Spec = {
  w: number;
  h: number;
  d: number;
  roof: "pitched" | "flat";
  rise: number;
  wing?: { w: number; h: number; d: number; offset: [number, number, number] };
};

const SPECS: Record<HouseType, Spec> = {
  "single-story": { w: 8, h: 3.4, d: 7, roof: "pitched", rise: 1.5 },
  "two-story": { w: 8, h: 6.0, d: 7, roof: "pitched", rise: 1.6 },
  villa: {
    w: 10,
    h: 4.4,
    d: 9,
    roof: "pitched",
    rise: 1.7,
    wing: { w: 5, h: 3.4, d: 5.5, offset: [7.5, 0, -1.2] },
  },
  commercial: { w: 12, h: 4.8, d: 13, roof: "flat", rise: 0.25 },
};

function createGableRoofGeometry(
  width: number,
  depth: number,
  wallHeight: number,
  rise: number,
  overhang: number,
): THREE.BufferGeometry {
  const w2 = width / 2 + overhang;
  const d2 = depth / 2 + overhang;
  const y0 = wallHeight;
  const y1 = wallHeight + rise;

  const positions = new Float32Array([
    -w2, y0, -d2, w2, y0, -d2, w2, y1, 0, -w2, y1, 0,
    -w2, y0, d2, w2, y0, d2, w2, y1, 0, -w2, y1, 0,
    -w2, y0, -d2, -w2, y0, d2, -w2, y1, 0,
    w2, y0, -d2, w2, y0, d2, w2, y1, 0,
  ]);

  const indices = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    8, 10, 9,
    11, 12, 13,
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/* ─── Window with multi-pane frame, glass, dividers, interior glow, and sill ─── */

function WindowUnit({
  position,
  width,
  height,
  divisions = [2, 2],
  rotation = [0, 0, 0] as [number, number, number],
}: {
  position: [number, number, number];
  width: number;
  height: number;
  divisions?: [number, number];
  rotation?: [number, number, number];
}) {
  const frameThickness = 0.04;
  const frameDepth = 0.06;
  const [cols, rows] = divisions;

  return (
    <group position={position} rotation={rotation}>
      {/* Outer frame */}
      <mesh castShadow>
        <boxGeometry args={[width + frameThickness * 2, height + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.015]}>
        <boxGeometry args={[width, height, 0.01]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          transmission={0.6}
          ior={1.5}
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.9}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>

      {/* Interior glow behind glass */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[width * 0.9, height * 0.9]} />
        <meshStandardMaterial
          color="#fff4d6"
          emissive="#fff4d6"
          emissiveIntensity={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Horizontal divider bars */}
      {Array.from({ length: rows - 1 }, (_, i) => {
        const y = -height / 2 + ((i + 1) / rows) * height;
        return (
          <mesh key={`h-${i}`} position={[0, y, 0.03]}>
            <boxGeometry args={[width, 0.015, 0.02]} />
            <meshStandardMaterial color={FRAME_COLOR} roughness={0.4} metalness={0.15} />
          </mesh>
        );
      })}

      {/* Vertical divider bars */}
      {Array.from({ length: cols - 1 }, (_, i) => {
        const x = -width / 2 + ((i + 1) / cols) * width;
        return (
          <mesh key={`v-${i}`} position={[x, 0, 0.03]}>
            <boxGeometry args={[0.015, height, 0.02]} />
            <meshStandardMaterial color={FRAME_COLOR} roughness={0.4} metalness={0.15} />
          </mesh>
        );
      })}

      {/* Window sill */}
      <mesh position={[0, -height / 2 - 0.02, 0.04]}>
        <boxGeometry args={[width + 0.06, 0.025, 0.08]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  );
}

/* ─── Horizontal clapboard siding strips on front and back walls ─── */

function Foundation({ w, d }: { w: number; d: number }) {
  return (
    <mesh receiveShadow position={[0, FOUNDATION_H / 2, 0]}>
      <boxGeometry args={[w + 0.3, FOUNDATION_H, d + 0.3]} />
      <meshStandardMaterial color={FOUNDATION_COLOR} roughness={0.85} metalness={0.02} />
    </mesh>
  );
}

/* ─── Front door with recessed panel, handle, and porch awning ─── */

function FrontDoor({
  x,
  wallY,
  h,
  d,
}: {
  x: number;
  wallY: number;
  h: number;
  d: number;
}) {
  const doorW = 0.95;
  const doorH = h * 0.55;
  const doorY = FOUNDATION_H + doorH / 2;
  const doorZ = d / 2 + 0.025;

  return (
    <group position={[x, 0, 0]}>
      {/* Door frame */}
      <mesh castShadow position={[0, doorY, doorZ]}>
        <boxGeometry args={[doorW + 0.06, doorH + 0.04, 0.05]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Clean flat door panel */}
      <mesh castShadow position={[0, doorY, doorZ + 0.01]}>
        <boxGeometry args={[doorW, doorH, 0.04]} />
        <meshStandardMaterial color={DOOR_COLOR} roughness={0.25} metalness={0.1} />
      </mesh>

      {/* Modern bar handle */}
      <mesh position={[doorW * 0.35, doorY, doorZ + 0.05]}>
        <boxGeometry args={[0.02, 0.25, 0.02]} />
        <meshStandardMaterial color="#999" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Minimal flat canopy */}
      <mesh castShadow position={[0, doorY + doorH / 2 + 0.08, doorZ + 0.3]}>
        <boxGeometry args={[doorW + 0.6, 0.03, 0.55]} />
        <meshStandardMaterial color={ROOF_COLOR} roughness={0.3} metalness={0.15} />
      </mesh>

      {/* Porch step */}
      <mesh receiveShadow position={[0, 0.12, d / 2 + 0.35]}>
        <boxGeometry args={[doorW + 0.6, 0.14, 0.5]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  );
}

function Gutters({ w, d, h }: { w: number; d: number; h: number }) {
  const hd = d / 2 + OVERHANG;
  return (
    <group>
      <mesh position={[0, h, -hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.04, 0.04]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, h, hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.04, 0.04]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Ridge cap and fascia for pitched roofs ─── */

function RoofDetails({ w, d, h, rise }: { w: number; d: number; h: number; rise: number }) {
  const ridgeY = h + rise;
  const eaveY = h;
  const hd = d / 2 + OVERHANG;

  return (
    <group>
      {/* Ridge cap */}
      <mesh castShadow position={[0, ridgeY + 0.025, 0]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.05, 0.2]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Thin fascia along eaves */}
      <mesh castShadow position={[0, eaveY - 0.02, -hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.04, 0.02]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[0, eaveY - 0.02, hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.04, 0.02]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
}

function ACUnit({ position }: { position: [number, number, number] }) {
  return (
    <mesh castShadow position={position}>
      <boxGeometry args={[0.6, 0.35, 0.5]} />
      <meshStandardMaterial color="#9ca3af" roughness={0.5} metalness={0.3} />
    </mesh>
  );
}

function ParapetWalls({ w, d, h }: { w: number; d: number; h: number }) {
  const parapetH = 0.3;
  const thickness = 0.12;
  const y = h + parapetH / 2;
  return (
    <group>
      <mesh position={[0, y, d / 2 - thickness / 2]}>
        <boxGeometry args={[w, parapetH, thickness]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.75} metalness={0.02} />
      </mesh>
      <mesh position={[0, y, -d / 2 + thickness / 2]}>
        <boxGeometry args={[w, parapetH, thickness]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.75} metalness={0.02} />
      </mesh>
      <mesh position={[w / 2 - thickness / 2, y, 0]}>
        <boxGeometry args={[thickness, parapetH, d]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.75} metalness={0.02} />
      </mesh>
      <mesh position={[-w / 2 + thickness / 2, y, 0]}>
        <boxGeometry args={[thickness, parapetH, d]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.75} metalness={0.02} />
      </mesh>
    </group>
  );
}

/* ─── Building block: walls + siding + trim + windows for a rectangular volume ─── */

function BuildingBlock({
  w,
  h,
  d,
  wallY,
  color,
  windowLayout,
}: {
  w: number;
  h: number;
  d: number;
  wallY: number;
  color: string;
  windowLayout?: React.ReactNode;
}) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, wallY, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.02} />
      </mesh>
      {windowLayout}
    </group>
  );
}

export function HouseModel({ type, color = WALL_COLOR, showRoof, roofPitchDeg }: HouseModelProps) {
  const spec = SPECS[type];

  const rise = useMemo(() => {
    if (roofPitchDeg == null) return spec.rise;
    const rad = (roofPitchDeg * Math.PI) / 180;
    return Math.tan(rad) * (spec.d / 2);
  }, [roofPitchDeg, spec.d, spec.rise]);

  const wingRise = useMemo(() => {
    if (!spec.wing) return 0;
    if (roofPitchDeg == null) return spec.rise * 0.8;
    const rad = (roofPitchDeg * Math.PI) / 180;
    return Math.tan(rad) * (spec.wing.d / 2);
  }, [roofPitchDeg, spec.wing, spec.rise]);

  const pitchedRoofGeo = useMemo(() => {
    if (spec.roof !== "pitched") return null;
    return createGableRoofGeometry(spec.w, spec.d, spec.h, rise, OVERHANG);
  }, [spec.roof, spec.w, spec.d, spec.h, rise]);

  const wingRoofGeo = useMemo(() => {
    if (!spec.wing || spec.roof !== "pitched") return null;
    return createGableRoofGeometry(
      spec.wing.w,
      spec.wing.d,
      spec.wing.h,
      wingRise,
      OVERHANG * 0.7,
    );
  }, [spec.wing, spec.roof, wingRise]);

  const wallY = FOUNDATION_H + spec.h / 2;
  const isCommercial = type === "commercial";
  const isVilla = type === "villa";
  const isTwoStory = type === "two-story";

  return (
    <group>
      <Foundation w={spec.w} d={spec.d} />

      <BuildingBlock w={spec.w} h={spec.h} d={spec.d} wallY={wallY} color={color} />

      {/* ── Windows ── */}
      {(() => {
        const storyH = isTwoStory ? spec.h / 2 : spec.h;
        const floorBase = FOUNDATION_H;
        const winH = Math.min(storyH * 0.4, 1.2);
        const winW = Math.min(spec.w * 0.14, 1.2);
        const winCenterY1 = floorBase + storyH * 0.5;
        const winCenterY2 = isTwoStory ? floorBase + storyH + storyH * 0.5 : 0;
        const fz = spec.d / 2 + 0.02;
        const bz = -spec.d / 2 - 0.02;
        const lx = -spec.w / 2 - 0.02;
        const rx = spec.w / 2 + 0.02;
        const sideWinW = Math.min(spec.d * 0.12, 1.0);

        const floor1Windows = (
          <>
            {/* Front — ground floor */}
            <WindowUnit position={[spec.w * 0.25, winCenterY1, fz]} width={winW} height={winH} divisions={[2, 2]} />
            <WindowUnit position={[-spec.w * 0.25, winCenterY1, fz]} width={winW} height={winH} divisions={[2, 2]} />
            {/* Left side */}
            <WindowUnit position={[lx, winCenterY1, 0]} width={sideWinW} height={winH} rotation={[0, -Math.PI / 2, 0]} />
            {/* Right side */}
            <WindowUnit position={[rx, winCenterY1, -spec.d * 0.15]} width={sideWinW} height={winH} rotation={[0, Math.PI / 2, 0]} />
            {/* Back */}
            <WindowUnit position={[spec.w * 0.2, winCenterY1, bz]} width={winW * 1.2} height={winH} rotation={[0, Math.PI, 0]} />
            <WindowUnit position={[-spec.w * 0.2, winCenterY1, bz]} width={winW} height={winH} rotation={[0, Math.PI, 0]} />
          </>
        );

        const floor2Windows = isTwoStory ? (
          <>
            {/* Front — second floor */}
            <WindowUnit position={[spec.w * 0.25, winCenterY2, fz]} width={winW * 0.9} height={winH * 0.85} divisions={[2, 2]} />
            <WindowUnit position={[-spec.w * 0.25, winCenterY2, fz]} width={winW * 0.9} height={winH * 0.85} divisions={[2, 2]} />
            <WindowUnit position={[0, winCenterY2, fz]} width={winW * 0.7} height={winH * 0.7} divisions={[1, 2]} />
            {/* Left side */}
            <WindowUnit position={[lx, winCenterY2, 0]} width={sideWinW} height={winH * 0.85} rotation={[0, -Math.PI / 2, 0]} />
            {/* Right side */}
            <WindowUnit position={[rx, winCenterY2, -spec.d * 0.15]} width={sideWinW} height={winH * 0.85} rotation={[0, Math.PI / 2, 0]} />
            {/* Back */}
            <WindowUnit position={[spec.w * 0.2, winCenterY2, bz]} width={winW} height={winH * 0.85} rotation={[0, Math.PI, 0]} />
          </>
        ) : null;

        const commercialWindows = isCommercial ? (
          <>
            {/* Large front glazing */}
            <WindowUnit position={[0, winCenterY1 - 0.2, fz]} width={spec.w * 0.3} height={winH * 1.1} divisions={[4, 2]} />
            <WindowUnit position={[spec.w * 0.3, winCenterY1, fz]} width={winW} height={winH * 0.9} divisions={[2, 2]} />
            <WindowUnit position={[-spec.w * 0.3, winCenterY1, fz]} width={winW} height={winH * 0.9} divisions={[2, 2]} />
            {/* Side windows — multiple along long walls */}
            {[-0.3, 0, 0.3].map((zOff) => (
              <WindowUnit key={`l${zOff}`} position={[lx, winCenterY1, spec.d * zOff]} width={sideWinW} height={winH * 0.9} rotation={[0, -Math.PI / 2, 0]} />
            ))}
            {[-0.3, 0, 0.3].map((zOff) => (
              <WindowUnit key={`r${zOff}`} position={[rx, winCenterY1, spec.d * zOff]} width={sideWinW} height={winH * 0.9} rotation={[0, Math.PI / 2, 0]} />
            ))}
            {/* Back */}
            <WindowUnit position={[spec.w * 0.2, winCenterY1, bz]} width={winW * 1.2} height={winH * 0.9} rotation={[0, Math.PI, 0]} />
            <WindowUnit position={[-spec.w * 0.2, winCenterY1, bz]} width={winW * 1.2} height={winH * 0.9} rotation={[0, Math.PI, 0]} />
          </>
        ) : null;

        return (
          <group>
            {!isCommercial && floor1Windows}
            {floor2Windows}
            {commercialWindows}
          </group>
        );
      })()}

      {/* ── Front door ── */}
      <FrontDoor x={0} wallY={wallY} h={isTwoStory ? spec.h / 2 : spec.h} d={spec.d} />

      {/* ── Villa side wing ── */}
      {spec.wing && (
        <group position={[spec.wing.offset[0], 0, spec.wing.offset[2]]}>
          <Foundation w={spec.wing.w} d={spec.wing.d} />
          <BuildingBlock
            w={spec.wing.w}
            h={spec.wing.h}
            d={spec.wing.d}
            wallY={FOUNDATION_H + spec.wing.h / 2}
            color={color}
          />
          <WindowUnit
            position={[0, FOUNDATION_H + spec.wing.h * 0.55, spec.wing.d / 2 + 0.02]}
            width={spec.wing.w * 0.25}
            height={spec.wing.h * 0.26}
          />
          {/* Covered patio between wing and main */}
          <mesh
            receiveShadow
            position={[-spec.wing.w / 2 - 0.5, FOUNDATION_H + spec.wing.h - 0.05, 0]}
          >
            <boxGeometry args={[1, 0.06, spec.wing.d - 0.5]} />
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} metalness={0.05} />
          </mesh>
        </group>
      )}

      {/* ── Flat roof ── */}
      {showRoof && spec.roof === "flat" && (
        <>
          <mesh castShadow receiveShadow position={[0, FOUNDATION_H + spec.h + spec.rise / 2, 0]}>
            <boxGeometry args={[spec.w + 0.5, spec.rise, spec.d + 0.5]} />
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} metalness={0.05} />
          </mesh>
          {isCommercial && (
            <>
              <ParapetWalls w={spec.w + 0.5} d={spec.d + 0.5} h={FOUNDATION_H + spec.h + spec.rise} />
              <ACUnit position={[spec.w * 0.3, FOUNDATION_H + spec.h + spec.rise + 0.175, -spec.d * 0.25]} />
              <ACUnit position={[-spec.w * 0.25, FOUNDATION_H + spec.h + spec.rise + 0.175, spec.d * 0.2]} />
            </>
          )}
        </>
      )}

      {/* ── Pitched roof ── */}
      {showRoof && spec.roof === "pitched" && pitchedRoofGeo && (
        <>
          <mesh castShadow receiveShadow geometry={pitchedRoofGeo} position={[0, FOUNDATION_H, 0]}>
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.35} metalness={0.2} side={THREE.DoubleSide} />
          </mesh>
          <RoofDetails w={spec.w} d={spec.d} h={FOUNDATION_H + spec.h} rise={rise} />
          <Gutters w={spec.w} d={spec.d} h={FOUNDATION_H + spec.h} />
        </>
      )}

      {/* ── Villa wing roof ── */}
      {showRoof && isVilla && spec.wing && wingRoofGeo && (
        <group position={[spec.wing.offset[0], FOUNDATION_H, spec.wing.offset[2]]}>
          <mesh castShadow receiveShadow geometry={wingRoofGeo}>
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.35} metalness={0.2} side={THREE.DoubleSide} />
          </mesh>
          <RoofDetails w={spec.wing.w} d={spec.wing.d} h={spec.wing.h} rise={wingRise} />
        </group>
      )}
    </group>
  );
}
