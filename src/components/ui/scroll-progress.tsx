"use client";

import { useCallback, useSyncExternalStore, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function getScrollPercent(): number {
  if (typeof document === "undefined" || typeof window === "undefined") return 0;
  const el = document.documentElement;
  const scrollTop = el.scrollTop || document.body.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  if (scrollHeight <= 0) return 0;
  return Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
}

export interface ScrollProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Accent bar color; defaults to design accent. */
  barClassName?: string;
}

export function ScrollProgress({ className, barClassName, ...props }: ScrollProgressProps) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    window.addEventListener("resize", onStoreChange, { passive: true });
    return () => {
      window.removeEventListener("scroll", onStoreChange);
      window.removeEventListener("resize", onStoreChange);
    };
  }, []);

  const percent = useSyncExternalStore(
    subscribe,
    () => getScrollPercent(),
    () => 0,
  );

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
      className={cn("pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] bg-transparent", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full origin-left bg-accent transition-[width] duration-150 ease-out",
          barClassName,
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
