"use client";

import { Users, Award, Shield, Clock, Leaf, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES: ReadonlyArray<{
  label: string;
  icon: typeof Users;
}> = [
  { label: "20+ години опит", icon: Clock },
  { label: "384+ клиенти", icon: Users },
  { label: "EUPD 2024", icon: Award },
  { label: "SolarEdge Certified", icon: Shield },
  { label: "30 год. гаранция", icon: Zap },
  { label: "Зелена енергия", icon: Leaf },
];

interface TrustBadgesProps {
  variant?: "compact" | "full" | "hero";
  className?: string;
}

export function TrustBadges({
  variant = "compact",
  className,
}: TrustBadgesProps) {
  if (variant === "full") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
          className,
        )}
      >
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center"
          >
            <badge.icon className="size-5 text-accent" />
            <span className="text-xs font-medium text-foreground-secondary">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-2",
          className,
        )}
      >
        {BADGES.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs text-white/70"
          >
            <badge.icon className="size-3.5 shrink-0 text-white/50" />
            <span>{badge.label}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      {BADGES.map((badge) => (
        <span
          key={badge.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background-secondary/60 px-3 py-1.5 text-xs text-foreground-secondary"
        >
          <badge.icon className="size-3.5 shrink-0 text-accent" />
          <span>{badge.label}</span>
        </span>
      ))}
    </div>
  );
}
