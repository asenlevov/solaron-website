"use client";

import dynamic from "next/dynamic";

export type { SceneCanvasProps } from "./scene-canvas";

export function SceneLoadingFallback() {
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

/*
 * Real code-split boundary: three.js / @react-three only download when a
 * page actually renders a 3D scene, instead of being bundled into every
 * route chunk that imports this file (which route prefetching would then
 * pull onto pages like the homepage).
 */
export const SceneCanvasDynamic = dynamic(() => import("./scene-canvas"), {
  ssr: false,
  loading: () => <SceneLoadingFallback />,
});
