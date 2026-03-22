"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type EnergyFlowProps = {
  visible: boolean;
  speed?: number;
  panelPosition?: [number, number, number];
  inverterPosition?: [number, number, number];
  housePosition?: [number, number, number];
  batteryPosition?: [number, number, number];
};

const PARTICLE_COUNT = 30;
const BRAND_GREEN = new THREE.Color("#3B7A2A");
const TRAIL_LENGTH = 2;

function createSplinePath(
  panelPos: THREE.Vector3,
  inverterPos: THREE.Vector3,
  housePos: THREE.Vector3,
  batteryPos: THREE.Vector3,
): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    [
      panelPos.clone(),
      new THREE.Vector3(
        (panelPos.x + inverterPos.x) / 2,
        (panelPos.y + inverterPos.y) / 2 + 0.5,
        (panelPos.z + inverterPos.z) / 2,
      ),
      inverterPos.clone(),
      new THREE.Vector3(
        (inverterPos.x + housePos.x) / 2,
        (inverterPos.y + housePos.y) / 2 + 0.3,
        (inverterPos.z + housePos.z) / 2,
      ),
      housePos.clone(),
      new THREE.Vector3(
        (housePos.x + batteryPos.x) / 2,
        (housePos.y + batteryPos.y) / 2 + 0.3,
        (housePos.z + batteryPos.z) / 2,
      ),
      batteryPos.clone(),
    ],
    false,
    "catmullrom",
    0.5,
  );
}

const vertexShader = `
  attribute float aOffset;
  attribute float aSize;
  uniform float uTime;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float t = mod(aOffset + uTime, 1.0);
    vAlpha = uOpacity * smoothstep(0.0, 0.1, t) * smoothstep(1.0, 0.85, t);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (80.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);

    gl_FragColor = vec4(uColor, vAlpha * glow);
  }
`;

export function EnergyFlow({
  visible,
  speed = 1,
  panelPosition = [0, 4, 0],
  inverterPosition = [4, 2, 3],
  housePosition = [0, 1.5, 0],
  batteryPosition = [-4, 2, 3],
}: EnergyFlowProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const opacityRef = useRef(0);

  const { curve, positions, offsets, sizes, uniforms, geometry } =
    useMemo(() => {
      const panelVec = new THREE.Vector3(...panelPosition);
      const inverterVec = new THREE.Vector3(...inverterPosition);
      const houseVec = new THREE.Vector3(...housePosition);
      const batteryVec = new THREE.Vector3(...batteryPosition);

      const c = createSplinePath(panelVec, inverterVec, houseVec, batteryVec);

      const totalParticles = PARTICLE_COUNT * TRAIL_LENGTH;
      const pos = new Float32Array(totalParticles * 3);
      const off = new Float32Array(totalParticles);
      const sz = new Float32Array(totalParticles);

      for (let i = 0; i < totalParticles; i++) {
        const baseIdx = Math.floor(i / TRAIL_LENGTH);
        const trailIdx = i % TRAIL_LENGTH;

        off[i] = (baseIdx / PARTICLE_COUNT + trailIdx * 0.008) % 1.0;
        sz[i] = (1.0 - trailIdx / TRAIL_LENGTH) * 2.0 + 0.8;

        const point = c.getPointAt(off[i]);
        pos[i * 3] = point.x;
        pos[i * 3 + 1] = point.y;
        pos[i * 3 + 2] = point.z;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aOffset", new THREE.BufferAttribute(off, 1));
      geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));

      const u = {
        uTime: { value: 0 },
        uColor: { value: BRAND_GREEN },
        uOpacity: { value: 0 },
      };

      return {
        curve: c,
        positions: pos,
        offsets: off,
        sizes: sz,
        uniforms: u,
        geometry: geo,
      };
    }, [panelPosition, inverterPosition, housePosition, batteryPosition]);

  useFrame((_, delta) => {
    const targetOpacity = visible ? 1 : 0;
    opacityRef.current +=
      (targetOpacity - opacityRef.current) * (1 - Math.exp(-4 * delta));
    uniforms.uOpacity.value = opacityRef.current;

    if (opacityRef.current < 0.01 && !visible) return;

    uniforms.uTime.value += delta * speed * 0.15;

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const totalParticles = PARTICLE_COUNT * TRAIL_LENGTH;

    for (let i = 0; i < totalParticles; i++) {
      const t = (offsets[i] + uniforms.uTime.value) % 1.0;
      const point = curve.getPointAt(Math.max(0, Math.min(1, t)));

      const spread = 0.05;
      const hash = Math.sin(i * 12.9898 + uniforms.uTime.value * 0.5) * 43758.5453;
      const rx = (hash - Math.floor(hash) - 0.5) * spread;
      const ry = (Math.sin(hash * 2.0) * 0.5) * spread;
      const rz = (Math.cos(hash * 3.0) * 0.5) * spread;

      posAttr.setXYZ(i, point.x + rx, point.y + ry, point.z + rz);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
