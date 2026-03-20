"use client";

import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

export type InverterModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

const W = 0.45;
const H = 0.55;
const D = 0.14;

function StatusLEDs() {
  const leds: { x: number; color: string }[] = [
    { x: -0.04, color: "#3B7A2A" },
    { x: 0, color: "#3B7A2A" },
    { x: 0.04, color: "#3b82f6" },
  ];
  return (
    <group position={[W * 0.2, H * 0.28, D / 2 + 0.008]}>
      {leds.map((led) => (
        <mesh key={led.x} position={[led.x, 0, 0]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial
            color={led.color}
            emissive={led.color}
            emissiveIntensity={1.5}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function DisplayScreen() {
  return (
    <group position={[-W * 0.05, H * 0.1, D / 2 + 0.005]}>
      <mesh>
        <boxGeometry args={[W * 0.45, H * 0.2, 0.005]} />
        <meshStandardMaterial
          color="#1a2332"
          emissive="#0f2840"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* Screen border */}
      <mesh position={[0, 0, -0.002]}>
        <boxGeometry args={[W * 0.48, H * 0.23, 0.003]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}

function VentilationGrid({ side }: { side: 1 | -1 }) {
  const rows = 4;
  const cols = 3;
  return (
    <group position={[side * (W / 2 + 0.001), 0, 0]}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const y = (row - (rows - 1) / 2) * 0.07;
        const z = (col - (cols - 1) / 2) * 0.025;
        return (
          <mesh
            key={i}
            position={[0, y, z]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <boxGeometry args={[0.015, 0.003, 0.015]} />
            <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

function CablePorts() {
  const ports = [-0.06, 0, 0.06];
  return (
    <group position={[0, -H / 2, 0]}>
      {ports.map((x) => (
        <mesh key={x} position={[x, -0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.06, 12]} />
          <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function WallMountBracket() {
  const thickness = 0.012;
  const bracketH = 0.2;
  return (
    <group position={[0, 0, -D / 2]}>
      {/* horizontal plate against wall */}
      <mesh position={[0, 0, -thickness / 2]}>
        <boxGeometry args={[W * 0.6, bracketH, thickness]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* lip that holds the inverter */}
      <mesh position={[0, -bracketH / 2 + thickness / 2, 0.02]}>
        <boxGeometry args={[W * 0.6, thickness, 0.04 + thickness]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function InverterModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: InverterModelProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main body */}
      <RoundedBox
        args={[W, H, D]}
        radius={0.02}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.4}
          metalness={0.25}
        />
      </RoundedBox>

      {/* Display screen */}
      <DisplayScreen />

      {/* Status LEDs */}
      <StatusLEDs />

      {/* Brand text */}
      <Text
        position={[0, -H * 0.15, D / 2 + 0.008]}
        fontSize={0.028}
        color="#a0aec0"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        SolarEdge
      </Text>

      {/* Ventilation grids on both sides */}
      <VentilationGrid side={1} />
      <VentilationGrid side={-1} />

      {/* Cable ports on bottom */}
      <CablePorts />

      {/* Wall mount bracket on back */}
      <WallMountBracket />
    </group>
  );
}
