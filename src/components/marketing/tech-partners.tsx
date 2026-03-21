"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { REAL_IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";

const partners = [
  { name: "SolarEdge", logo: REAL_IMAGES.partners.solaredge, width: 140 },
  { name: "Engie", logo: REAL_IMAGES.partners.engie, width: 100 },
  { name: "Eneco", logo: REAL_IMAGES.partners.eneco, width: 110 },
  { name: "Hoppenbrouwers", logo: REAL_IMAGES.partners.hoppenbrouwers, width: 150 },
  { name: "Pure Energie", logo: REAL_IMAGES.partners.pureEnergie, width: 120 },
  { name: "Volta Solar", logo: REAL_IMAGES.partners.voltaSolar, width: 110 },
] as const;

export function TechPartners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="border-y border-border bg-background-secondary/30 py-10 md:py-14">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground-tertiary">
          Доверени от водещите в индустрията
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={40}
                className="h-8 w-auto object-contain md:h-10"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
