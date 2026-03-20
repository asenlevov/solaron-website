"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "dark";
  size?: "md" | "lg" | "xl";
  showArrow?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  size = "lg",
  showArrow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.2,
      y: (e.clientY - rect.top - rect.height / 2) * 0.2,
    });
  };

  const reset = () => { setPos({ x: 0, y: 0 }); setHovered(false); };

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-300 overflow-hidden",
    size === "md" && "h-11 px-6 text-sm",
    size === "lg" && "h-13 px-8 text-base",
    size === "xl" && "h-[3.75rem] px-10 text-lg",
    variant === "primary" && [
      "text-white",
      "bg-gradient-to-b from-[#3B7A2A] to-[#2d6120]",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_rgba(59,122,42,0.25)]",
      "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_20px_rgba(59,122,42,0.4)]",
    ],
    variant === "outline" && [
      "border border-current bg-transparent",
      "hover:bg-accent hover:text-white hover:border-accent",
    ],
    variant === "dark" && [
      "text-white",
      "bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]",
      "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
      "hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5",
    ],
    className,
  );

  const content = (
    <motion.div
      ref={ref}
      className={styles}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
    >
      {/* Shimmer sweep on hover */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700",
          hovered && "translate-x-full",
        )}
      />
      
      <span className="relative z-10">{children}</span>
      
      {showArrow && (
        <ArrowRight className={cn(
          "relative z-10 size-4 transition-all duration-300",
          hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 w-0",
        )} />
      )}
    </motion.div>
  );

  if (href) return <Link href={href} className="inline-block">{content}</Link>;
  return <button type="button" className="inline-block" onClick={onClick}>{content}</button>;
}
