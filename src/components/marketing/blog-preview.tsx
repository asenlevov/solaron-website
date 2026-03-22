"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock } from "lucide-react";

import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import { REAL_IMAGES } from "@/data/images";
import { createStagger, staggerItem } from "@/lib/animations";

const containerVariants = createStagger(0.15, 0.1);

export function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const t = useTranslations("Home");

  const BLOG_POSTS = [
    {
      title: t("blogPreview.post1Title"),
      category: t("blogPreview.post1Category"),
      reading: t("blogPreview.post1Reading"),
      image: REAL_IMAGES.projects.kran5_1,
      slug: "/blog/kak-da-izberete-solarna-sistema",
      featured: true,
    },
    {
      title: t("blogPreview.post2Title"),
      category: t("blogPreview.post2Category"),
      reading: t("blogPreview.post2Reading"),
      image: REAL_IMAGES.projects.vratsa15_1,
      slug: "/blog/netno-otchitane-bulgaria",
      featured: false,
    },
    {
      title: t("blogPreview.post3Title"),
      category: t("blogPreview.post3Category"),
      reading: t("blogPreview.post3Reading"),
      image: REAL_IMAGES.projects.kazanlak30_1,
      slug: "/blog/solarni-paneli-stoynost-imot",
      featured: false,
    },
  ];

  const featured = BLOG_POSTS[0]!;
  const secondary = BLOG_POSTS.slice(1);

  return (
    <section className="px-6 py-24 md:px-8 md:py-32 lg:py-40" style={{ backgroundColor: "#f7f7f5" }}>
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-20">
          <p className="editorial-overline mb-4">{t("blogPreview.overline")}</p>
          <TextReveal as="h2" className="editorial-heading">
            {t("blogPreview.title")}
          </TextReveal>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Featured large card */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <Link href={featured.slug as never} className="group block">
              <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    {featured.category}
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
                    {featured.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-foreground-secondary">
                    <Clock className="size-3.5" aria-hidden />
                    <span className="font-body">{featured.reading}</span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Two stacked small cards */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {secondary.map((post) => (
              <motion.div key={post.slug} variants={staggerItem} className="flex-1">
                <Link href={post.slug as never} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                      <h3 className="font-display text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-lg">
                        {post.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 text-sm text-foreground-secondary">
                        <Clock className="size-3.5" aria-hidden />
                        <span className="font-body">{post.reading}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={"/blog" as never}
            className={cn(
              "group inline-flex items-center gap-2 font-display text-base font-semibold text-accent",
              "transition-colors hover:text-accent/80",
            )}
          >
            {t("blogPreview.allArticles")}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
