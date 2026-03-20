"use client";

import * as THREE from "three";
import { useMemo } from "react";

interface PowerLineProps {
  position?: [number, number, number];
}

export function PowerLine({ position = [0, 0, 0] }: PowerLineProps) {
  const wireGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 24;
    const startX = 0;
    const endX = 10;
    const height = 5.5;
    const sag = 0.8;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = startX + t * (endX - startX);
      const y = height - sag * 4 * t * (1 - t);
      points.push(new THREE.Vector3(x, y, 0));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <group position={position}>
      {/* Utility pole */}
      <mesh castShadow position={[0, 3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 6, 8]} />
        <meshStandardMaterial color="#6b5e50" roughness={0.9} metalness={0} />
      </mesh>

      {/* Cross-arm */}
      <mesh
        castShadow
        position={[0, 5.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.04, 0.04, 1.2, 6]} />
        <meshStandardMaterial color="#6b5e50" roughness={0.9} metalness={0} />
      </mesh>

      {/* Insulators */}
      {[-0.4, 0, 0.4].map((xOff) => (
        <mesh key={xOff} position={[xOff, 5.5, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.15, 6]} />
          <meshStandardMaterial
            color="#4a7a7a"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Power wire (catenary curve) */}
      <line>
        <primitive object={wireGeometry} attach="geometry" />
        <lineBasicMaterial color="#333333" linewidth={1} />
      </line>
    </group>
  );
}
