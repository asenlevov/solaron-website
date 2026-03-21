"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, children, onMouseMove, ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsHovering(true);
        onMouseMove?.(e);
      },
      [onMouseMove],
    );

    const handleMouseLeave = React.useCallback(() => {
      setIsHovering(false);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl p-[1px] transition-colors",
          className,
        )}
        style={{
          background: isHovering
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 122, 42, 0.2), transparent 40%)`
            : "var(--border)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="relative rounded-[calc(1rem-1px)] bg-background">
          {children}
        </div>
      </div>
    );
  },
);
GlowCard.displayName = "GlowCard";

export { GlowCard };
