"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageEditorialProps extends Omit<ImageProps, "alt"> {
  alt: string;
  parallax?: boolean;
  parallaxAmount?: number;
  grain?: boolean;
  reveal?: boolean;
  duotone?: string;
  className?: string;
  containerClassName?: string;
}

export function ImageEditorial({
  parallax = false,
  parallaxAmount = 40,
  grain = false,
  reveal = false,
  duotone,
  className,
  containerClassName,
  ...props
}: ImageEditorialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallaxAmount, -parallaxAmount]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.div
        className="h-full w-full"
        style={parallax ? { y } : undefined}
        initial={reveal ? { clipPath: "inset(100% 0 0 0)" } : undefined}
        animate={reveal && isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={reveal ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] } : undefined}
      >
        <Image
          {...props}
          className={cn("h-full w-full object-cover", parallax && "scale-110", className)}
        />
      </motion.div>

      {grain && <div className="grain pointer-events-none absolute inset-0" />}

      {duotone && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: duotone }}
        />
      )}
    </div>
  );
}
