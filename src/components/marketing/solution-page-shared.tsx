"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight, Zap, TrendingUp, Home, Building2, Factory, Tractor, Car, BatteryCharging } from "lucide-react";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { REAL_IMAGES } from "@/data/images";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const heroProject = {
  slug: "651-kwp-saedinenie",
  title: "Соларен Парк Съединение",
  kWp: 651,
  location: "Съединение, България",
  category: "Индустриален",
  year: 2023,
  savingsPercent: 82,
  description:
    "Най-големият ни проект — 651 kWp наземна фотоволтаична централа. Захранва местното производство с чиста енергия и спестява над 300 тона CO₂ годишно.",
  image: REAL_IMAGES.projects.saedinenie651_hero,
};

const gridProjects = [
  {
    slug: "270-kwp-carport-kazanlak",
    title: "Соларен Карпорт Казанлък",
    kWp: 270,
    location: "Казанлък",
    category: "Карпорт",
    image: REAL_IMAGES.projects.carport270_hero,
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    slug: "108-kwp-sedem-bg",
    title: "Търговски Обект София",
    kWp: 108,
    location: "София",
    category: "Търговски",
    image: REAL_IMAGES.projects.sedemBg108_hero,
    span: "",
    aspect: "aspect-[4/5]",
  },
  {
    slug: "39-kwp-varna",
    title: "Покривна Система Варна",
    kWp: 39,
    location: "Варна",
    category: "Търговски",
    image: REAL_IMAGES.projects.varna39_hero,
    span: "",
    aspect: "aspect-[4/5]",
  },
];

const allSolutions = [
  { id: "za-doma", title: "За Дома", href: "/resheniya/za-doma", icon: Home, desc: "До 80% спестявания от ток" },
  { id: "za-biznesa", title: "За Бизнеса", href: "/resheniya/za-biznesa", icon: Building2, desc: "Намалете оперативните разходи" },
  { id: "za-industriyata", title: "За Индустрията", href: "/resheniya/za-industriyata", icon: Factory, desc: "Мащабни системи до MW" },
  { id: "za-zemedelieto", title: "За Земеделието", href: "/resheniya/za-zemedelieto", icon: Tractor, desc: "Агриволтаици и помпени системи" },
  { id: "solaren-karport", title: "Соларен Карпорт", href: "/resheniya/solaren-karport", icon: Car, desc: "Паркинг + чиста енергия" },
  { id: "avtonomni-sistemi", title: "Автономни Системи", href: "/resheniya/avtonomni-sistemi", icon: BatteryCharging, desc: "Off-grid и резервно захранване" },
];

export function SolutionPageProjects() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "0px 0px -10% 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section className="overflow-hidden bg-background px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <BadgeChip variant="accent" className="mb-4">Реализирани Проекти</BadgeChip>
            <h2 className="editorial-heading">Проекти, Които Говорят</h2>
            <p className="mt-3 max-w-xl text-lg text-foreground-secondary">
              Всеки проект е индивидуално проектиран за максимална ефективност и възвръщаемост.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-foreground-tertiary">
            <span><strong className="text-accent font-semibold">651 kWp</strong> най-голям проект</span>
            <span><strong className="text-foreground font-semibold">14</strong> завършени</span>
          </div>
        </div>

        <motion.div
          ref={heroRef}
          className="relative mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <GlowCard className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                <ImageEditorial
                  src={heroProject.image}
                  alt={heroProject.title}
                  fill
                  grain
                  parallax
                  containerClassName="absolute inset-0"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <div className="flex gap-2 mb-4">
                  <BadgeChip variant="success">{heroProject.category}</BadgeChip>
                  <BadgeChip>{heroProject.year}</BadgeChip>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {heroProject.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
                  {heroProject.description}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary mb-1">
                      <Zap className="size-3.5" />
                      Мощност
                    </div>
                    <p className="text-xl font-bold text-accent">{heroProject.kWp} kWp</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary mb-1">
                      <TrendingUp className="size-3.5" />
                      Спестяване
                    </div>
                    <p className="text-xl font-bold text-foreground">{heroProject.savingsPercent}%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground-tertiary mb-1">
                      <MapPin className="size-3.5" />
                      Локация
                    </div>
                    <p className="text-sm font-medium text-foreground">{heroProject.location}</p>
                  </div>
                </div>
                <Link
                  href={`/proekti/${heroProject.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Виж проекта
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-4"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {gridProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className={cn("group", project.span)}
            >
              <Link href={`/proekti/${project.slug}`}>
                <GlowCard className="overflow-hidden">
                  <div className={cn("relative w-full", project.aspect)}>
                    <ImageEditorial
                      src={project.image}
                      alt={project.title}
                      fill
                      grain
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                      containerClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <BadgeChip variant="success" className="mb-2 bg-accent/90 text-white border-none">
                        {project.kWp} kWp
                      </BadgeChip>
                      <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
                        <MapPin className="h-3.5 w-3.5" />
                        {project.location}
                        <span className="ml-2 text-white/50">{project.category}</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center md:mt-16">
          <MagneticButton href="/proekti" variant="outline" size="lg">
            Всички Проекти
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

interface RelatedSolutionsProps {
  currentSolutionId: string;
}

export function RelatedSolutions({ currentSolutionId }: RelatedSolutionsProps) {
  const otherSolutions = allSolutions.filter((s) => s.id !== currentSolutionId);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <TextReveal as="h2" className="editorial-display mb-12">
          Други решения
        </TextReveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherSolutions.map((s) => (
            <motion.div key={s.id} variants={staggerItem}>
              <GlowCard className="rounded-2xl h-full">
                <Link href={s.href} className="group block rounded-2xl p-6">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                    <s.icon className="size-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-foreground-secondary mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                    Научете повече
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function SolutionCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground px-6 py-28 text-white md:px-8 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <TextReveal as="h2" className="editorial-hero text-white mb-6">
          Готови за промяната?
        </TextReveal>
        <p className="text-white/60 text-xl mb-10 max-w-xl mx-auto">
          Конфигурирайте системата си онлайн или заявете безплатна консултация.
        </p>
        <MagneticButton href="/konfigurator" variant="primary" size="xl">
          Заявете Консултация
        </MagneticButton>
      </div>
    </section>
  );
}
