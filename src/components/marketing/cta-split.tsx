"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone } from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { blurIn } from "@/lib/animations";
import { HERO_IMAGES } from "@/data/images";

export function CTASplit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <ImageEditorial
        src={HERO_IMAGES.sunset}
        alt="Соларна инсталация на залез"
        fill
        grain
        duotone="#1a3a12"
        containerClassName="absolute inset-0"
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative px-6 py-24 md:px-8 md:py-32 lg:py-40">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          variants={blurIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-editorial-hero text-white">
            <span className="block font-light">Вашата</span>
            <span className="block font-black">Соларна Революция</span>
          </div>

          <a
            href="tel:+359884321560"
            className="mt-8 inline-flex items-center gap-3 text-xl font-light text-white/90 transition-colors hover:text-white md:text-2xl"
          >
            <Phone className="size-5" strokeWidth={1.5} />
            +359 88 432 1560
          </a>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <MagneticButton href="/kontakti" variant="primary" size="xl">
              Безплатна Консултация
            </MagneticButton>
            <MagneticButton href="/konfigurator" variant="outline" size="xl">
              <span className="text-white">Конфигуратор</span>
            </MagneticButton>
          </div>

          <p className="mt-10 text-sm tracking-wide text-white/50">
            Безплатен оглед · Без скрити такси · 30 год. гаранция
          </p>
        </motion.div>
      </div>
    </section>
  );
}
