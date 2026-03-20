"use client";

import { useCallback, useSyncExternalStore, type ButtonHTMLAttributes } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 300;

export interface BackToTopProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Scroll offset from top (default smooth). */
  behavior?: ScrollBehavior;
}

export function BackToTop({
  className,
  behavior = "smooth",
  type = "button",
  "aria-label": ariaLabel = "Нагоре",
  ...props
}: BackToTopProps) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    return () => window.removeEventListener("scroll", onStoreChange);
  }, []);

  const visible = useSyncExternalStore(
    subscribe,
    () => window.scrollY > SHOW_AFTER_PX,
    () => false,
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [behavior]);

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-background-card text-foreground shadow-card transition-[opacity,transform,box-shadow] duration-300 ease-out hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 md:bottom-8 md:right-8",
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        className,
      )}
      {...props}
    >
      <ChevronUp className="size-5" aria-hidden />
    </button>
  );
}
