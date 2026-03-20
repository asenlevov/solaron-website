"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export type BatteryUnitProps = {
  visible: boolean;
  position?: [number, number, number];
};

const W = 0.65;
const H = 1.15;
const D = 0.13;
const BRAND_GREEN = "#3B7A2A";

function WallBracket() {
  const thickness = 0.012;
  const bracketH = 0.25;
  const wallDepth = 0.05;

  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * (W / 2 + thickness / 2 + 0.005), 0, 0]}>
          {/* Vertical piece against wall */}
          <mesh position={[0, 0, -D / 2 - wallDepth / 2]}>
            <boxGeometry args={[thickness, bracketH, wallDepth]} />
            <meshStandardMaterial color="#888" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Horizontal lip supporting unit */}
          <mesh position={[side * thickness * 0.5, -bracketH / 2 + thickness / 2, -D / 2 + 0.01]}>
            <boxGeometry args={[thickness * 2.5, thickness, D * 0.4]} />
            <meshStandardMaterial color="#888" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function BatteryUnit({ visible, position = [0, 0, 0] }: BatteryUnitProps) {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const target = visible ? 1 : 0;
    progressRef.current += (target - progressRef.current) * (1 - Math.exp(-6 * delta));

    const t = progressRef.current;
    const scaleVal = 0.85 + t * 0.15;
    g.scale.setScalar(scaleVal);

    g.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          if ("opacity" in m && "transparent" in m) {
            const mat = m as THREE.MeshStandardMaterial;
            mat.transparent = t < 0.99;
            mat.opacity = t;
          }
        }
      }
    });

    g.visible = !(!visible && t < 0.01);
  });

  return (
    <group ref={groupRef} position={position} scale={0.85} visible={false}>
      {/* Main body */}
      <RoundedBox args={[W, H, D]} radius={0.05} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#f5f5f5" roughness={0.25} metalness={0.03} transparent opacity={0} />
      </RoundedBox>

      {/* Front face plate */}
      <mesh position={[0, 0, D / 2 - 0.003]}>
        <boxGeometry args={[W - 0.03, H - 0.03, 0.006]} />
        <meshStandardMaterial color="#fafafa" roughness={0.2} metalness={0.02} transparent opacity={0} />
      </mesh>

      {/* Subtle perimeter edge line */}
      <mesh position={[0, 0, D / 2 + 0.001]}>
        <boxGeometry args={[W - 0.01, H - 0.01, 0.002]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.3} metalness={0.05} transparent opacity={0} />
      </mesh>

      {/* LED status strip */}
      <mesh position={[0, H * 0.34, D / 2 + 0.004]}>
        <boxGeometry args={[0.22, 0.004, 0.004]} />
        <meshStandardMaterial
          color={BRAND_GREEN}
          emissive={BRAND_GREEN}
          emissiveIntensity={2.5}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0}
        />
      </mesh>

      {/* SOLARON brand text */}
      <Text
        position={[0, H * 0.24, D / 2 + 0.006]}
        fontSize={0.045}
        color="#666"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        SOLARON
      </Text>

      {/* Capacity indicator text */}
      <Text
        position={[0, -H * 0.35, D / 2 + 0.006]}
        fontSize={0.025}
        color="#999"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        13.5 kWh
      </Text>

      <WallBracket />
    </group>
  );
}
