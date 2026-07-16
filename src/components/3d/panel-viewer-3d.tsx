"use client";

import SceneCanvas from "@/components/3d/scene-canvas";
import { SolarPanel } from "@/components/3d/solar-panel";

/* Loaded via next/dynamic so three.js stays out of the product page's route chunk. */
export default function PanelViewer3D() {
  return (
    <SceneCanvas camera={{ position: [0, 1.5, 3.5], fov: 35 }} autoRotate>
      <SolarPanel position={[0, 0.5, 0]} rotation={[-0.3, Math.PI, 0]} scale={1.5} />
    </SceneCanvas>
  );
}
