"use client";

import * as THREE from "three";

const PLATFORM_W = 26;
const PLATFORM_D = 22;
const PLATFORM_H = 0.3;

export function DioramaBase() {
  return (
    <group>
      {/* Main platform */}
      <mesh receiveShadow position={[0, -PLATFORM_H / 2 - 0.01, 0]}>
        <boxGeometry args={[PLATFORM_W, PLATFORM_H, PLATFORM_D]} />
        <meshStandardMaterial color="#e0ddd5" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* Lawn — left */}
      <mesh receiveShadow position={[-7.5, 0.05, -0.5]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[9, 17]} />
        <meshStandardMaterial color="#7daa5e" roughness={0.95} metalness={0} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
      </mesh>

      {/* Lawn — right */}
      <mesh receiveShadow position={[7.5, 0.05, -0.5]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[9, 17]} />
        <meshStandardMaterial color="#7daa5e" roughness={0.95} metalness={0} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
      </mesh>

      {/* Lawn — back */}
      <mesh receiveShadow position={[0, 0.05, -9]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[PLATFORM_W - 2, 4]} />
        <meshStandardMaterial color="#7daa5e" roughness={0.95} metalness={0} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
      </mesh>

      {/* Lawn patch — slightly different shade for organic look */}
      <mesh receiveShadow position={[-5, 0.07, 2]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color="#85b465" roughness={0.95} metalness={0} polygonOffset polygonOffsetFactor={-1.5} polygonOffsetUnits={-1.5} />
      </mesh>

      {/* Lawn patch — darker accent */}
      <mesh receiveShadow position={[6, 0.07, -3]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#72a050" roughness={0.95} metalness={0} polygonOffset polygonOffsetFactor={-1.5} polygonOffsetUnits={-1.5} />
      </mesh>

      {/* Driveway */}
      <mesh receiveShadow position={[3.5, 0.09, 6.5]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
        <planeGeometry args={[3.6, 9]} />
        <meshStandardMaterial color="#aaa8a3" roughness={0.85} metalness={0.03} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
      </mesh>

      {/* Sidewalk */}
      <mesh receiveShadow position={[0, 0.08, 5.5]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
        <planeGeometry args={[16, 1.2]} />
        <meshStandardMaterial color="#d0cdc8" roughness={0.85} metalness={0.02} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
      </mesh>

      {/* Short path to door */}
      <mesh receiveShadow position={[-0.5, 0.085, 3.4]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={4}>
        <planeGeometry args={[1.6, 1.8]} />
        <meshStandardMaterial color="#d0cdc8" roughness={0.85} metalness={0.02} polygonOffset polygonOffsetFactor={-3} polygonOffsetUnits={-3} />
      </mesh>
    </group>
  );
}
