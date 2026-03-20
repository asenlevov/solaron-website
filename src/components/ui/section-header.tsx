"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        isCenter && "mx-auto text-center",
        !isCenter && "text-left",
        className,
      )}
    >
      {label ? (
        <p
          className={cn(
            "mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-all duration-500 md:text-sm",
            isCenter && "mx-auto",
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-6 opacity-0",
          )}
        >
          {label}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight text-foreground transition-all duration-500 delay-150 md:text-4xl lg:text-5xl",
          subtitle ? "mb-4 md:mb-5" : "",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "font-body text-base leading-relaxed text-foreground-secondary transition-all duration-500 delay-300 md:text-lg",
            isCenter && "mx-auto max-w-2xl",
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
