"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/text-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { LIFESTYLE_IMAGES } from "@/data/images";
import { createStagger, slideUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function SolutionFinder() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const t = useTranslations("Home");

  const solutions = [
    {
      title: t("solutionFinder.forHome"),
      subtitle: t("solutionFinder.forHomeSubtitle"),
      badge: t("solutionFinder.forHomeBadge"),
      image: LIFESTYLE_IMAGES.modernHome,
      href: "/resheniya/za-doma",
      aspect: "aspect-[3/4]",
      colSpan: "",
    },
    {
      title: t("solutionFinder.forBusiness"),
      subtitle: t("solutionFinder.forBusinessSubtitle"),
      badge: null,
      image: LIFESTYLE_IMAGES.business,
      href: "/resheniya/za-biznesa",
      aspect: "aspect-[4/3]",
      colSpan: "",
    },
    {
      title: t("solutionFinder.forIndustry"),
      subtitle: t("solutionFinder.forIndustrySubtitle"),
      badge: null,
      image: LIFESTYLE_IMAGES.factory,
      href: "/resheniya/za-industriyata",
      aspect: "aspect-[4/3]",
      colSpan: "",
    },
    {
      title: t("solutionFinder.forAgriculture"),
      subtitle: t("solutionFinder.forAgricultureSubtitle"),
      badge: null,
      image: LIFESTYLE_IMAGES.farmland,
      href: "/resheniya/za-zemedelieto",
      aspect: "aspect-[3/4]",
      colSpan: "",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 md:mb-20">
          <p className="editorial-overline mb-4 text-accent">{t("solutionFinder.overline")}</p>
          <TextReveal as="h2" className="editorial-display">
            {t("solutionFinder.title")}
          </TextReveal>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          variants={createStagger(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {solutions.map((sol) => (
            <motion.div key={sol.href} variants={slideUp}>
              <Link href={sol.href as never} className="group relative block">
                <TiltCard className={cn("overflow-hidden rounded-2xl", sol.aspect)} tiltAmount={5}>
                  <ImageEditorial
                    src={sol.image}
                    alt={sol.title}
                    fill
                    grain
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                    containerClassName="absolute inset-0"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/60" />

                  {/* Green accent line on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />

                  {/* Badge */}
                  {sol.badge && (
                    <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-body text-xs font-semibold text-white">
                      {sol.badge}
                    </div>
                  )}

                  {/* Text content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                      {sol.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm text-white/80">
                      {sol.subtitle}
                    </p>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
