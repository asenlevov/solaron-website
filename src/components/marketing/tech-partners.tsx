"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { createStagger, staggerItem } from "@/lib/animations";

const partners = [
  { name: "SolarEdge", credential: "Инвертори и оптимизатори · 25+ години", opacity: 1 },
  { name: "Van Der Valk", credential: "Конструкции · 15 год. гаранция", opacity: 0.8 },
  { name: "Sunport Power", credential: "MWT панели · 30 год. гаранция", opacity: 0.6 },
  { name: "Pylontech", credential: "LFP батерии · 6000+ цикъла", opacity: 0.4 },
] as const;

const stagger = createStagger(0.12, 0.15);

export function TechPartners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section className="bg-white px-6 py-24 md:px-8 md:py-32">
      <div ref={ref} className="mx-auto max-w-4xl">
        <p className="text-editorial-overline mb-16 md:mb-20">Партньори</p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {partners.map((partner, i) => (
            <motion.div key={partner.name} variants={staggerItem}>
              {i > 0 && <div className="h-[1px] bg-accent/20" />}
              <div className="py-8 md:py-10">
                <h3
                  className="font-display text-4xl font-light tracking-tight md:text-5xl"
                  style={{ opacity: partner.opacity }}
                >
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {partner.credential}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
