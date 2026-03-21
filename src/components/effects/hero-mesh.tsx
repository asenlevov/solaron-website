"use client";

import { cn } from "@/lib/utils";

export interface HeroMeshProps {
  className?: string;
}

export function HeroMesh({ className }: HeroMeshProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <svg className="absolute size-0">
        <defs>
          <filter id="hero-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ filter: "url(#hero-noise)" }}
      />

      <div className="absolute inset-0 [mix-blend-mode:multiply]">
        <div
          className="absolute -left-20 -top-20 size-[600px] rounded-full opacity-[0.12] blur-[100px] will-change-transform"
          style={{
            background:
              "conic-gradient(from 0deg, #3B7A2A, #4ade80, #3B7A2A)",
            animation: "mesh-drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-16 -top-32 size-[550px] rounded-full opacity-[0.10] blur-[100px] will-change-transform"
          style={{
            background:
              "conic-gradient(from 120deg, #f59e0b, #fbbf24, #d97706, #f59e0b)",
            animation: "mesh-drift-2 28s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-1/4 top-1/4 size-[480px] rounded-full opacity-[0.08] blur-[110px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, #0ea5e9 0%, #0284c7 50%, transparent 70%)",
            animation: "mesh-drift-3 32s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-24 -left-16 size-[520px] rounded-full opacity-[0.10] blur-[100px] will-change-transform"
          style={{
            background:
              "conic-gradient(from 240deg, #059669, #10b981, #059669)",
            animation: "mesh-drift-4 24s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-1/3 top-1/3 size-[400px] rounded-full opacity-[0.06] blur-[120px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle, #d97706 0%, transparent 70%)",
            animation: "mesh-drift-5 36s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-20 size-[460px] rounded-full opacity-[0.09] blur-[100px] will-change-transform"
          style={{
            background:
              "conic-gradient(from 60deg, #14b8a6, #0d9488, #2dd4bf, #14b8a6)",
            animation: "mesh-drift-6 22s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] rounded-full opacity-[0.05] blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          animation: "mesh-pulse 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
