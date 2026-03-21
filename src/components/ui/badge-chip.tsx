import * as React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-background-secondary text-foreground border border-border",
  accent: "bg-accent/15 text-accent border border-accent/30",
  success: "bg-success/15 text-success border border-success/30",
  new: "bg-accent/15 text-accent border border-accent/30",
} as const;

export interface BadgeChipProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "new";
}

const BadgeChip = React.forwardRef<HTMLSpanElement, BadgeChipProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {variant === "new" && (
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        )}
        {children}
      </span>
    );
  },
);
BadgeChip.displayName = "BadgeChip";

export { BadgeChip };
