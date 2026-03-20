"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
} from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { Suspense, type CSSProperties, type ReactNode } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

export type SceneCanvasProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  shadows?: boolean;
  autoRotate?: boolean;
};

const DEFAULT_CAMERA = {
  position: [5, 4, 9] as [number, number, number],
  fov: 40,
  near: 0.1,
  far: 200,
};

const BG_COLOR = "#e8edf2";

function LoadingFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white">
      <div className="relative size-10">
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#3B7A2A]" />
      </div>
      <span className="font-body text-sm font-medium tracking-wide text-neutral-400">
        Зареждане на 3D...
      </span>
    </div>
  );
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.12}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <SSAO
        radius={0.04}
        intensity={8}
        luminanceInfluence={0.6}
        color={new THREE.Color(0, 0, 0)}
      />
      <Vignette offset={0.3} darkness={0.4} />
    </EffectComposer>
  );
}

export function SceneCanvas({
  children,
  className,
  style,
  camera,
  shadows = true,
  autoRotate = false,
}: SceneCanvasProps) {
  const cam = { ...DEFAULT_CAMERA, ...camera };

  return (
    <div
      className={cn("relative h-full w-full min-h-[240px]", className)}
      style={style}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          className="!h-full !w-full"
          shadows={shadows ? "soft" : false}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          camera={{
            position: cam.position,
            fov: cam.fov,
            near: cam.near,
            far: cam.far,
          }}
        >
          <color attach="background" args={[BG_COLOR]} />
          <fog attach="fog" args={[BG_COLOR, 25, 60]} />

          {shadows && <SoftShadows size={25} samples={16} focus={0.5} />}

          <ambientLight intensity={0.5} />

          {/* Main sun light — warm golden */}
          <directionalLight
            castShadow={shadows}
            position={[12, 14, 10]}
            intensity={1.8}
            color="#fff8ee"
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-bias={-0.001}
            shadow-normalBias={0.04}
          />

          {/* Fill light — cool blue */}
          <directionalLight
            position={[-8, 10, -6]}
            intensity={0.4}
            color="#d0d8f0"
          />

          {/* Rim / accent light */}
          <directionalLight
            position={[-4, 8, 12]}
            intensity={0.3}
          />

          {/* Warm ground bounce */}
          <directionalLight
            position={[0, -2, 0]}
            intensity={0.15}
            color="#fff0d0"
          />

          <Environment preset="city" />

          <ContactShadows
            position={[0, 0.005, 0]}
            opacity={0.4}
            scale={30}
            blur={2}
            far={20}
          />

          {children}

          <PostProcessing />

          <OrbitControls
            makeDefault
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

export const SceneCanvasDynamic = dynamic(
  () => Promise.resolve({ default: SceneCanvas }),
  {
    ssr: false,
    loading: () => <LoadingFallback />,
  },
);
