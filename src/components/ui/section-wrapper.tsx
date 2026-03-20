import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const backgroundClasses = {
  white: "bg-background text-foreground",
  gray: "bg-background-secondary text-foreground",
  dark: "bg-[#0a0f0a] text-white",
} as const;

export type SectionWrapperBackground = keyof typeof backgroundClasses;

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  background?: SectionWrapperBackground;
  id?: string;
}

export function SectionWrapper({
  as: Component = "section",
  background = "white",
  id,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Component
      id={id}
      className={cn(
        "px-6 py-20 md:px-8 md:py-28 lg:py-32",
        backgroundClasses[background],
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </Component>
  );
}
