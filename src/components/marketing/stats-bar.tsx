"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface StatsBarProps {
  stats: { value: string; label: string }[];
  className?: string;
}

function parseStatValue(value: string) {
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1].replace(/,/g, "")), suffix: match[2] };
}

function AnimatedNumber({
  value,
  inView,
}: {
  value: string;
  inView: boolean;
}) {
  const { num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, num]);

  const formatted =
    num >= 1000 ? display.toLocaleString("bg-BG") : display.toString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export function StatsBar({ stats, className }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className={cn(
        "border-y border-border bg-background-secondary/50",
        "flex flex-col items-center divide-y divide-border md:flex-row md:divide-x md:divide-y-0",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex w-full flex-1 flex-col items-center justify-center gap-1 px-6 py-8"
        >
          <span className="text-4xl font-bold font-display text-foreground">
            <AnimatedNumber value={stat.value} inView={inView} />
          </span>
          <span className="text-sm text-foreground-secondary">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
