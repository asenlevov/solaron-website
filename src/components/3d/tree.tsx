"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
  type?: "deciduous" | "conifer";
}

export function Tree({ position = [0, 0, 0], scale = 1, type = "deciduous" }: TreeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + position[0] * 2) * 0.008;
    }
  });

  if (type === "conifer") {
    return (
      <group ref={groupRef} position={position} scale={scale}>
        <mesh castShadow position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.06, 0.1, 1.8, 8]} />
          <meshStandardMaterial color="#4a3728" roughness={0.9} metalness={0} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} castShadow position={[0, 1.4 + i * 0.6, 0]}>
            <coneGeometry args={[0.9 - i * 0.18, 1.0, 8]} />
            <meshStandardMaterial color={`hsl(${120 + i * 8}, ${38 - i * 3}%, ${28 + i * 4}%)`} roughness={0.85} metalness={0} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh castShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 2.2, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} metalness={0} />
      </mesh>
      {/* Main foliage cluster */}
      <mesh castShadow position={[0, 2.4, 0]}>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial color="#4a7c3c" roughness={0.85} metalness={0} />
      </mesh>
      <mesh castShadow position={[0.4, 2.7, 0.25]}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial color="#3d6d32" roughness={0.85} metalness={0} />
      </mesh>
      <mesh castShadow position={[-0.3, 2.1, -0.3]}>
        <icosahedronGeometry args={[0.65, 2]} />
        <meshStandardMaterial color="#55864a" roughness={0.85} metalness={0} />
      </mesh>
      <mesh castShadow position={[0.25, 2.0, -0.3]}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial color="#4e7a40" roughness={0.85} metalness={0} />
      </mesh>
      <mesh castShadow position={[-0.3, 2.6, 0.2]}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial color="#5a8f4e" roughness={0.85} metalness={0} />
      </mesh>
      <mesh castShadow position={[0.08, 2.9, -0.08]}>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial color="#447035" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}
