"use client";

import { useMemo } from "react";
import * as THREE from "three";

export type HouseType = "single-story" | "two-story" | "villa" | "commercial";

export type HouseModelProps = {
  type: HouseType;
  color?: string;
  showRoof: boolean;
};

const WALL_COLOR = "#f0ece5";
const ROOF_COLOR = "#3a3632";
const DOOR_COLOR = "#5a4a3a";
const FOUNDATION_COLOR = "#bab5ad";
const TRIM_COLOR = "#f5f2ec";
const SIDING_COLOR = "#e5e0d8";

const OVERHANG = 0.5;
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
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    8, 9, 10,
    11, 13, 12,
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
}: {
  position: [number, number, number];
  width: number;
  height: number;
  divisions?: [number, number];
}) {
  const frameThickness = 0.04;
  const frameDepth = 0.06;
  const [cols, rows] = divisions;

  return (
    <group position={position}>
      {/* Outer frame */}
      <mesh castShadow>
        <boxGeometry args={[width + frameThickness * 2, height + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial color="#4a4540" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.015]}>
        <boxGeometry args={[width, height, 0.01]} />
        <meshPhysicalMaterial
          color="#fffbf0"
          transmission={0.6}
          ior={1.5}
          roughness={0.05}
          metalness={0.05}
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
            <meshStandardMaterial color="#4a4540" roughness={0.6} metalness={0.1} />
          </mesh>
        );
      })}

      {/* Vertical divider bars */}
      {Array.from({ length: cols - 1 }, (_, i) => {
        const x = -width / 2 + ((i + 1) / cols) * width;
        return (
          <mesh key={`v-${i}`} position={[x, 0, 0.03]}>
            <boxGeometry args={[0.015, height, 0.02]} />
            <meshStandardMaterial color="#4a4540" roughness={0.6} metalness={0.1} />
          </mesh>
        );
      })}

      {/* Window sill */}
      <mesh position={[0, -height / 2 - 0.02, 0.04]}>
        <boxGeometry args={[width + 0.06, 0.025, 0.08]} />
        <meshStandardMaterial color="#d5d0ca" roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  );
}

/* ─── Horizontal clapboard siding strips on front and back walls ─── */

function WallSiding({ w, h, d, y }: { w: number; h: number; d: number; y: number }) {
  const count = Math.floor(h / 0.25);
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const stripY = y - h / 2 + (i + 0.5) * (h / count);
        return (
          <group key={i}>
            <mesh position={[0, stripY, d / 2 + 0.015]}>
              <boxGeometry args={[w, 0.008, 0.01]} />
              <meshStandardMaterial color={SIDING_COLOR} roughness={0.8} metalness={0} />
            </mesh>
            <mesh position={[0, stripY, -d / 2 - 0.015]}>
              <boxGeometry args={[w, 0.008, 0.01]} />
              <meshStandardMaterial color={SIDING_COLOR} roughness={0.8} metalness={0} />
            </mesh>
            <mesh position={[-w / 2 - 0.015, stripY, 0]}>
              <boxGeometry args={[0.01, 0.008, d]} />
              <meshStandardMaterial color={SIDING_COLOR} roughness={0.8} metalness={0} />
            </mesh>
            <mesh position={[w / 2 + 0.015, stripY, 0]}>
              <boxGeometry args={[0.01, 0.008, d]} />
              <meshStandardMaterial color={SIDING_COLOR} roughness={0.8} metalness={0} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ─── Corner trim boards ─── */

function CornerTrims({ w, h, d, y }: { w: number; h: number; d: number; y: number }) {
  const trimW = 0.06;
  const corners: [number, number, number][] = [
    [-w / 2, y, -d / 2],
    [w / 2, y, -d / 2],
    [-w / 2, y, d / 2],
    [w / 2, y, d / 2],
  ];
  return (
    <group>
      {corners.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[trimW, h, trimW]} />
          <meshStandardMaterial color={TRIM_COLOR} roughness={0.65} metalness={0.02} />
        </mesh>
      ))}
    </group>
  );
}

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
  const doorW = 0.9;
  const doorH = h * 0.52;
  const doorY = FOUNDATION_H + doorH / 2;
  const doorZ = d / 2 + 0.025;

  return (
    <group position={[x, 0, 0]}>
      {/* Door frame */}
      <mesh castShadow position={[0, doorY, doorZ]}>
        <boxGeometry args={[doorW + 0.08, doorH + 0.04, 0.05]} />
        <meshStandardMaterial color="#4a4540" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Door panel */}
      <mesh castShadow position={[0, doorY, doorZ + 0.01]}>
        <boxGeometry args={[doorW, doorH, 0.04]} />
        <meshStandardMaterial color={DOOR_COLOR} roughness={0.65} metalness={0.08} />
      </mesh>

      {/* Recessed upper panel */}
      <mesh position={[0, doorY + doorH * 0.18, doorZ + 0.035]}>
        <boxGeometry args={[doorW * 0.7, doorH * 0.35, 0.008]} />
        <meshStandardMaterial color="#5e5040" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Recessed lower panel */}
      <mesh position={[0, doorY - doorH * 0.18, doorZ + 0.035]}>
        <boxGeometry args={[doorW * 0.7, doorH * 0.3, 0.008]} />
        <meshStandardMaterial color="#5e5040" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Handle */}
      <mesh position={[doorW * 0.35, doorY, doorZ + 0.055]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshStandardMaterial color="#b0a090" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Porch awning */}
      <mesh castShadow position={[0, doorY + doorH / 2 + 0.1, doorZ + 0.25]}>
        <boxGeometry args={[doorW + 0.6, 0.04, 0.5]} />
        <meshStandardMaterial color={ROOF_COLOR} roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Awning brackets */}
      {[-0.5, 0.5].map((side) => (
        <mesh key={side} castShadow position={[side * (doorW / 2 + 0.2), doorY + doorH / 2 + 0.02, doorZ + 0.3]}>
          <boxGeometry args={[0.02, 0.12, 0.04]} />
          <meshStandardMaterial color="#333" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}

      {/* Porch step */}
      <mesh receiveShadow position={[0, 0.06, d / 2 + 0.35]}>
        <boxGeometry args={[doorW + 0.6, 0.12, 0.5]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.75} metalness={0.02} />
      </mesh>
    </group>
  );
}

function Chimney({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh castShadow position={[x, y, z]}>
      <boxGeometry args={[0.4, 0.8, 0.4]} />
      <meshStandardMaterial color="#9ca3af" roughness={0.7} metalness={0.05} />
    </mesh>
  );
}

function Gutters({ w, d, h }: { w: number; d: number; h: number }) {
  const hw = w / 2 + OVERHANG;
  const hd = d / 2 + OVERHANG;
  return (
    <group>
      <mesh position={[0, h, -hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.06, 0.05]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, h, hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.06, 0.05]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-hw + 0.05, h / 2, -hd]}>
        <boxGeometry args={[0.06, h, 0.06]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[hw - 0.05, h / 2, -hd]}>
        <boxGeometry args={[0.06, h, 0.06]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Ridge cap and fascia for pitched roofs ─── */

function RoofDetails({ w, d, h, rise }: { w: number; d: number; h: number; rise: number }) {
  const ridgeY = h + rise;
  const eaveY = h;
  const hw = w / 2 + OVERHANG;
  const hd = d / 2 + OVERHANG;

  return (
    <group>
      {/* Ridge cap */}
      <mesh castShadow position={[0, ridgeY + 0.015, 0]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.03, 0.12]} />
        <meshStandardMaterial color="#3a3f44" roughness={0.45} metalness={0.08} />
      </mesh>

      {/* Fascia boards along eave lines */}
      <mesh castShadow position={[0, eaveY - 0.03, -hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.08, 0.025]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.65} metalness={0.02} />
      </mesh>
      <mesh castShadow position={[0, eaveY - 0.03, hd]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.08, 0.025]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.65} metalness={0.02} />
      </mesh>

      {/* Rake boards along gable edges */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          castShadow
          position={[side * hw, eaveY + rise / 2, 0]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[0.025, 0.06, d + OVERHANG * 2]} />
          <meshStandardMaterial color={TRIM_COLOR} roughness={0.65} metalness={0.02} />
        </mesh>
      ))}

      {/* Soffit boards under overhang */}
      <mesh position={[0, eaveY + 0.01, -hd + 0.05]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.01, OVERHANG]} />
        <meshStandardMaterial color="#f0ece6" roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[0, eaveY + 0.01, hd - 0.05]}>
        <boxGeometry args={[w + OVERHANG * 2, 0.01, OVERHANG]} />
        <meshStandardMaterial color="#f0ece6" roughness={0.7} metalness={0} />
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
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.02} />
      </mesh>
      <WallSiding w={w} h={h} d={d} y={wallY} />
      <CornerTrims w={w} h={h} d={d} y={wallY} />
      {windowLayout}
    </group>
  );
}

export function HouseModel({ type, color = WALL_COLOR, showRoof }: HouseModelProps) {
  const spec = SPECS[type];

  const pitchedRoofGeo = useMemo(() => {
    if (spec.roof !== "pitched") return null;
    return createGableRoofGeometry(spec.w, spec.d, spec.h, spec.rise, OVERHANG);
  }, [spec]);

  const wingRoofGeo = useMemo(() => {
    if (!spec.wing || spec.roof !== "pitched") return null;
    return createGableRoofGeometry(
      spec.wing.w,
      spec.wing.d,
      spec.wing.h,
      spec.rise * 0.8,
      OVERHANG * 0.7,
    );
  }, [spec]);

  const wallY = FOUNDATION_H + spec.h / 2;
  const isCommercial = type === "commercial";
  const isVilla = type === "villa";
  const isTwoStory = type === "two-story";

  return (
    <group>
      <Foundation w={spec.w} d={spec.d} />

      <BuildingBlock w={spec.w} h={spec.h} d={spec.d} wallY={wallY} color={color} />

      {/* ── Front windows ── */}
      <group>
        <WindowUnit
          position={[spec.w * 0.25, wallY + spec.h * 0.08, spec.d / 2 + 0.02]}
          width={spec.w * 0.12}
          height={spec.h * 0.24}
        />
        <WindowUnit
          position={[-spec.w * 0.25, wallY + spec.h * 0.08, spec.d / 2 + 0.02]}
          width={spec.w * 0.12}
          height={spec.h * 0.24}
        />

        {isTwoStory && (
          <>
            <WindowUnit
              position={[spec.w * 0.25, wallY + spec.h * 0.35, spec.d / 2 + 0.02]}
              width={spec.w * 0.11}
              height={spec.h * 0.16}
            />
            <WindowUnit
              position={[-spec.w * 0.25, wallY + spec.h * 0.35, spec.d / 2 + 0.02]}
              width={spec.w * 0.11}
              height={spec.h * 0.16}
            />
            <WindowUnit
              position={[0, wallY + spec.h * 0.35, spec.d / 2 + 0.02]}
              width={spec.w * 0.09}
              height={spec.h * 0.13}
              divisions={[2, 1]}
            />
          </>
        )}

        {isCommercial && (
          <>
            <WindowUnit
              position={[0, wallY - spec.h * 0.05, spec.d / 2 + 0.02]}
              width={spec.w * 0.32}
              height={spec.h * 0.38}
              divisions={[3, 2]}
            />
            <WindowUnit
              position={[spec.w * 0.35, wallY + spec.h * 0.1, spec.d / 2 + 0.02]}
              width={spec.w * 0.11}
              height={spec.h * 0.2}
            />
            <WindowUnit
              position={[-spec.w * 0.35, wallY + spec.h * 0.1, spec.d / 2 + 0.02]}
              width={spec.w * 0.11}
              height={spec.h * 0.2}
            />
          </>
        )}
      </group>

      {/* ── Front door ── */}
      <FrontDoor x={0} wallY={wallY} h={spec.h} d={spec.d} />

      {/* ── Side windows ── */}
      <WindowUnit
        position={[-spec.w / 2 - 0.02, wallY + spec.h * 0.08, 0]}
        width={spec.d * 0.1}
        height={spec.h * 0.22}
      />
      <WindowUnit
        position={[spec.w / 2 + 0.02, wallY + spec.h * 0.08, -spec.d * 0.15]}
        width={spec.d * 0.1}
        height={spec.h * 0.22}
      />

      {/* ── Back window ── */}
      <WindowUnit
        position={[spec.w * 0.15, wallY + spec.h * 0.08, -spec.d / 2 - 0.02]}
        width={spec.w * 0.18}
        height={spec.h * 0.22}
      />

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
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.5} metalness={0.05} />
          </mesh>
        </group>
      )}

      {/* ── Flat roof ── */}
      {showRoof && spec.roof === "flat" && (
        <>
          <mesh castShadow receiveShadow position={[0, FOUNDATION_H + spec.h + spec.rise / 2, 0]}>
            <boxGeometry args={[spec.w + 0.5, spec.rise, spec.d + 0.5]} />
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.5} metalness={0.05} />
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
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.5} metalness={0.05} />
          </mesh>
          <RoofDetails w={spec.w} d={spec.d} h={FOUNDATION_H + spec.h} rise={spec.rise} />
          <Gutters w={spec.w} d={spec.d} h={FOUNDATION_H + spec.h} />
          {(type === "single-story" || isVilla) && (
            <Chimney
              x={spec.w * 0.25}
              y={FOUNDATION_H + spec.h + spec.rise * 0.7}
              z={-spec.d * 0.15}
            />
          )}
        </>
      )}

      {/* ── Villa wing roof ── */}
      {showRoof && isVilla && spec.wing && wingRoofGeo && (
        <group position={[spec.wing.offset[0], FOUNDATION_H, spec.wing.offset[2]]}>
          <mesh castShadow receiveShadow geometry={wingRoofGeo}>
            <meshStandardMaterial color={ROOF_COLOR} roughness={0.5} metalness={0.05} />
          </mesh>
          <RoofDetails w={spec.wing.w} d={spec.wing.d} h={spec.wing.h} rise={spec.rise * 0.8} />
        </group>
      )}
    </group>
  );
}
