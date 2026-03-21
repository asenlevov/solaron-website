"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface StatNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  context?: string;
  className?: string;
  contextClassName?: string;
  duration?: number;
}

export function StatNumber({
  value,
  suffix,
  prefix,
  context,
  className,
  contextClassName,
  duration = 2000,
}: StatNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const overshoot = progress < 1 ? eased * 1.05 : 1;
      setDisplay(Math.round(value * Math.min(overshoot, 1)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col overflow-hidden">
      <div className={cn("editorial-stat", className)}>
        {prefix}
        {display.toLocaleString("bg-BG")}
        {suffix && <span className="text-[0.6em]">{suffix}</span>}
      </div>
      {context && (
        <p className={cn("mt-2 text-sm md:text-base font-body", contextClassName)}>
          {context}
        </p>
      )}
    </div>
  );
}
