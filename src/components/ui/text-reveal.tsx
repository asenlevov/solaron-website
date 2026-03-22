"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  staggerDelay = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [parentCentered, setParentCentered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (parent && getComputedStyle(parent).textAlign === "center") {
      setParentCentered(true);
    }
  }, []);

  const words = children.split(" ");

  const resolvedClassName = (() => {
    if (!className) return className;
    if (className.includes("editorial-hero") && !className.includes("editorial-hero-sm")) {
      const totalChars = children.length;
      if (totalChars > 20 || words.length > 3) {
        return className.replace("editorial-hero", "editorial-hero-sm");
      }
    }
    return className;
  })();

  const shouldCenter =
    resolvedClassName?.includes("text-center") || parentCentered;

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn("flex flex-wrap", shouldCenter && "justify-center", resolvedClassName)} aria-label={children}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] py-[0.05em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.5,
              delay: delay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
