"use client";

import { useRef, useEffect, useState, useCallback, type HTMLAttributes } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function clampDecimals(n: number, decimals: number): number {
  if (!Number.isFinite(n)) return 0;
  const d = Math.max(0, Math.min(20, Math.floor(decimals)));
  const factor = 10 ** d;
  return Math.round(n * factor) / factor;
}

export interface AnimatedCounterProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
  className,
  ...props
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const safeValue = Number.isFinite(value) ? value : 0;
  const safeDuration = Math.max(0, duration);
  const safeDecimals = Number.isFinite(decimals)
    ? Math.max(0, Math.min(20, Math.floor(decimals)))
    : 0;

  const cancelRaf = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isInView || completedRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || safeDuration === 0) {
      completedRef.current = true;
      const id = requestAnimationFrame(() => {
        setDisplay(clampDecimals(safeValue, safeDecimals));
      });
      return () => cancelAnimationFrame(id);
    }

    completedRef.current = true;
    const startVal = 0;
    const endVal = safeValue;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / safeDuration);
      const eased = easeOutCubic(t);
      const current = startVal + (endVal - startVal) * eased;
      setDisplay(clampDecimals(current, safeDecimals));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(clampDecimals(endVal, safeDecimals));
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelRaf();
    };
  }, [isInView, safeValue, safeDuration, safeDecimals, cancelRaf]);

  const formatted =
    safeDecimals > 0
      ? display.toLocaleString("bg-BG", {
          minimumFractionDigits: safeDecimals,
          maximumFractionDigits: safeDecimals,
        })
      : Math.round(display).toLocaleString("bg-BG");

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
