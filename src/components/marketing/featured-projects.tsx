"use client";

import { useRef } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { REAL_IMAGES } from "@/data/images";
import { revealFromBottom, createStagger, slideUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const heroProject = {
  title: "Соларен Парк Съединение",
  kWp: 651,
  location: "Съединение, България",
  category: "Индустриален",
  description:
    "Най-големият ни проект — 651 kWp наземна фотоволтаична централа. Захранва местното производство с чиста енергия и спестява над 300 тона CO₂ годишно.",
  image: REAL_IMAGES.projects.saedinenie651_hero,
};

const gridProjects = [
  {
    title: "Соларен Карпорт Казанлък",
    kWp: 270,
    location: "Казанлък",
    category: "Карпорт",
    image: REAL_IMAGES.projects.carport270_hero,
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Търговски Обект София",
    kWp: 108,
    location: "София",
    category: "Търговски",
    image: REAL_IMAGES.projects.sedemBg108_hero,
    span: "",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Покривна Система Варна",
    kWp: 39,
    location: "Варна",
    category: "Търговски",
    image: REAL_IMAGES.projects.varna39_hero,
    span: "",
    aspect: "aspect-[4/5]",
  },
];

export function FeaturedProjects() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "0px 0px -10% 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section className="overflow-hidden bg-[#0a0f0a] px-6 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Stats bar */}
        <div className="mb-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 pb-6 text-editorial-overline text-white/50">
          <span>
            <strong className="text-accent">651 kWp</strong> най-голям проект
          </span>
          <span aria-hidden className="hidden text-white/40 sm:inline">·</span>
          <span>
            <strong className="text-white/80">14</strong> завършени
          </span>
          <span aria-hidden className="hidden text-white/40 sm:inline">·</span>
          <span>
            <strong className="text-white/80">4</strong> държави
          </span>
        </div>

        {/* Hero project */}
        <motion.div
          ref={heroRef}
          className="relative mb-10 md:mb-14"
          variants={revealFromBottom}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 items-end lg:grid-cols-[1fr_380px]">
            {/* Image — fills ~70% width on desktop */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl lg:aspect-[2/1]">
              <ImageEditorial
                src={heroProject.image}
                alt={heroProject.title}
                fill
                grain
                parallax
                containerClassName="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0f0a]/80 max-lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a]/70 to-transparent lg:hidden" />
            </div>

            {/* Details card — overlaps on desktop */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0f0a]/90 p-6 backdrop-blur-md max-lg:-mt-24 lg:absolute lg:bottom-6 lg:right-0 lg:w-[380px] lg:p-8">
              <span className="mb-3 inline-flex rounded-full bg-accent/15 px-3 py-1 font-body text-xs font-semibold text-accent">
                {heroProject.category}
              </span>

              <StatNumber
                value={heroProject.kWp}
                suffix=" kWp"
                className="text-accent"
                contextClassName="text-white/50"
              />

              <h3 className="mt-3 font-display text-xl font-bold text-white md:text-2xl">
                {heroProject.title}
              </h3>

              <p className="mt-2 font-body text-sm leading-relaxed text-white/60">
                {heroProject.description}
              </p>

              <div className="mt-4 flex items-center gap-1.5 font-body text-sm text-white/50">
                <MapPin className="h-4 w-4" />
                {heroProject.location}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid projects */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-4"
          variants={createStagger(0.12, 0.1)}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {gridProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={slideUp}
              className={cn("group relative overflow-hidden rounded-2xl", project.span)}
            >
              <div className={cn("relative w-full", project.aspect)}>
                <ImageEditorial
                  src={project.image}
                  alt={project.title}
                  fill
                  grain
                  className="transition-all duration-700 ease-out [clip-path:inset(4%)] group-hover:[clip-path:inset(0%)]"
                  containerClassName="absolute inset-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <span className="mb-2 inline-flex rounded-full bg-accent/90 px-2.5 py-0.5 font-display text-xs font-bold text-white">
                    {project.kWp} kWp
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 font-body text-xs text-white/60">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                    <span className="ml-2 text-white/40">{project.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 flex justify-center md:mt-16">
          <MagneticButton href="/proekti" variant="outline" size="lg">
            <span className="text-white">Всички Проекти</span>
            <ArrowRight className="ml-2 h-4 w-4 text-white" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
