import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  categoryLabels,
  getProjectBySlug,
  projects,
  type Project,
} from "@/data/projects";
import { REAL_IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";

/* ── Gallery images per project slug ── */
const projectGallery: Record<string, string[]> = {
  "651-kwp-saedinenie": [
    REAL_IMAGES.projects.saedinenie651_1,
    REAL_IMAGES.projects.saedinenie651_2,
    REAL_IMAGES.projects.saedinenie651_3,
    REAL_IMAGES.projects.saedinenie651_4,
  ],
  "270-kwp-carport-kazanlak": [
    REAL_IMAGES.projects.carport270_1,
    REAL_IMAGES.projects.carport270_2,
    REAL_IMAGES.projects.carport270_3,
    REAL_IMAGES.projects.carport270_4,
  ],
  "108-kwp-sedem-bg": [
    REAL_IMAGES.projects.sedemBg108_1,
    REAL_IMAGES.projects.sedemBg108_2,
  ],
  "63-kwp-venelin-draganov": [
    REAL_IMAGES.projects.venelin63_1,
    REAL_IMAGES.projects.venelin63_2,
    REAL_IMAGES.projects.venelin63_3,
  ],
  "39-kwp-varna": [
    REAL_IMAGES.projects.varna39_1,
    REAL_IMAGES.projects.varna39_2,
    REAL_IMAGES.projects.varna39_3,
    REAL_IMAGES.projects.varna39_4,
  ],
  "30-kwp-kazanlak": [
    REAL_IMAGES.projects.kazanlak30_1,
    REAL_IMAGES.projects.kazanlak30_2,
    REAL_IMAGES.projects.kazanlak30_3,
  ],
  "15-kw-vratsa": [
    REAL_IMAGES.projects.vratsa15_1,
    REAL_IMAGES.projects.vratsa15_2,
    REAL_IMAGES.projects.vratsa15_3,
    REAL_IMAGES.projects.vratsa15_4,
  ],
  "5-kw-kran": [
    REAL_IMAGES.projects.kran5_1,
    REAL_IMAGES.projects.kran5_2,
    REAL_IMAGES.projects.kran5_3,
    REAL_IMAGES.projects.kran5_4,
  ],
  "golqmo-dryanovo": [
    REAL_IMAGES.projects.dryanovo_1,
    REAL_IMAGES.projects.dryanovo_2,
  ],
  "ahoy-rotterdam": [
    REAL_IMAGES.installations.nlAhoySolar1,
    REAL_IMAGES.installations.nlAhoySolar2,
    REAL_IMAGES.installations.nlAhoyInstall3,
  ],
  "postnl-nieuwegein": [
    REAL_IMAGES.installations.nlPostNL,
    REAL_IMAGES.installations.nlProjectOverview1,
    REAL_IMAGES.installations.nlProjectOverview2,
  ],
  "hoppenbrouwers": [
    REAL_IMAGES.installations.nlRefRooftop2,
    REAL_IMAGES.installations.nlRefRooftop3,
    REAL_IMAGES.installations.nlRefRooftop4,
  ],
};

const techLabels: Record<keyof Project["technologies"], string> = {
  panels: "Панели",
  inverters: "Инвертори",
  optimizers: "Оптимизатори",
  batteries: "Акумулатори",
  mounting: "Конструкция",
};

const techIcons: Record<keyof Project["technologies"], string> = {
  panels: "◫",
  inverters: "⚡",
  optimizers: "◎",
  batteries: "▮",
  mounting: "△",
};

function getRelated(current: Project): Project[] {
  const sameCategory = projects
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .sort((a, b) => b.kWp - a.kWp);

  if (sameCategory.length >= 3) return sameCategory.slice(0, 3);

  const others = projects
    .filter(
      (p) =>
        p.slug !== current.slug &&
        !sameCategory.some((s) => s.slug === p.slug),
    )
    .sort((a, b) => b.kWp - a.kWp);

  return [...sameCategory, ...others].slice(0, 3);
}

function getGalleryImages(project: Project): string[] {
  const extra = projectGallery[project.slug] ?? [];
  const unique = extra.filter((img) => img !== project.image);
  return unique.slice(0, 4);
}

/* ── Static params & metadata ── */

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Проект — Solaron" };
  return {
    title: `${project.title} — Solaron`,
    description: project.description.slice(0, 160),
  };
}

/* ── Page ── */

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelated(project);
  const gallery = getGalleryImages(project);
  const techEntries = (
    Object.entries(project.technologies) as [
      keyof Project["technologies"],
      string | undefined,
    ][]
  ).filter(([, v]) => Boolean(v?.trim()));

  const specRows: { label: string; value: string }[] = [
    {
      label: "Мощност",
      value: project.kWp > 0 ? `${project.kWp} kWp` : "По проект",
    },
    { label: "Локация", value: project.location },
    { label: "Държава", value: project.country },
    ...(project.date ? [{ label: "Период", value: project.date }] : []),
    { label: "Категория", value: categoryLabels[project.category] },
    ...(project.client ? [{ label: "Клиент", value: project.client }] : []),
  ];

  return (
    <main className="pt-16">
      {/* ── Full-bleed hero ── */}
      <section className="grain relative overflow-hidden">
        <div className="relative aspect-[21/9] min-h-[420px] w-full overflow-hidden bg-background-secondary">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-10 md:px-12 md:pb-16">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                  <MapPin className="size-3.5" aria-hidden />
                  {project.location}, {project.country}
                </span>
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                  {categoryLabels[project.category]}
                </span>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="editorial-display text-white md:editorial-hero">
                    {project.title}
                  </h1>
                </div>
                {project.kWp > 0 && (
                  <p
                    className="editorial-stat text-accent md:text-right"
                    aria-label={`${project.kWp} киловата пикова мощност`}
                  >
                    {project.kWp}
                    <span className="ml-1 text-[0.3em] font-semibold text-white/50">
                      kWp
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="border-b border-border bg-white px-6 py-3 md:px-12">
        <nav
          className="mx-auto max-w-7xl text-sm text-foreground-tertiary"
          aria-label="Навигация"
        >
          <Link href="/proekti" className="transition-colors hover:text-accent">
            Проекти
          </Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{project.title}</span>
        </nav>
      </div>

      {/* ── Stats bar (if kWp > 0) ── */}
      {project.kWp > 0 && (
        <section className="border-b border-border bg-white px-6 py-8 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <p className="font-display text-3xl font-bold tabular-nums text-accent md:text-4xl">
                {project.kWp}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                kWp мощност
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-foreground md:text-xl">
                {project.location}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                Локация
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-foreground md:text-xl">
                {project.country}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                Държава
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-foreground md:text-xl">
                {categoryLabels[project.category]}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                Категория
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Description + Benefits (two-column editorial) ── */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="editorial-overline mb-4">Описание</p>
              <p className="text-xl leading-relaxed text-foreground-secondary md:text-2xl md:leading-relaxed">
                {project.description}
              </p>
            </div>
            <div>
              <p className="editorial-overline mb-4">Ползи</p>
              <p className="text-xl leading-relaxed text-foreground-secondary md:text-2xl md:leading-relaxed">
                {project.benefits}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image gallery ── */}
      {gallery.length > 0 && (
        <section className="bg-[#f7f7f5] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="editorial-overline mb-8">Галерия</p>
            <div
              className={cn(
                "grid gap-4",
                gallery.length === 1 && "grid-cols-1",
                gallery.length === 2 && "grid-cols-1 md:grid-cols-2",
                gallery.length === 3 &&
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                gallery.length >= 4 && "grid-cols-2 lg:grid-cols-4",
              )}
            >
              {gallery.map((img, i) => (
                <div
                  key={img}
                  className={cn(
                    "group relative overflow-hidden rounded-xl",
                    gallery.length === 3 && i === 0 && "md:col-span-2 lg:col-span-1",
                  )}
                >
                  <div
                    className={cn(
                      "relative",
                      gallery.length <= 2 ? "aspect-[16/10]" : "aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} — снимка ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes={
                        gallery.length <= 2
                          ? "(max-width:768px) 100vw, 50vw"
                          : "(max-width:768px) 50vw, 25vw"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Specs table + Technology stack ── */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Specs table */}
            <div className="lg:col-span-5">
              <p className="editorial-overline mb-6">
                Технически данни
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {specRows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-border last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="w-[40%] bg-[#f7f7f5] px-5 py-4 text-left font-display text-sm font-semibold text-foreground-secondary"
                        >
                          {row.label}
                        </th>
                        <td className="px-5 py-4 text-foreground">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technology badges */}
            <div className="lg:col-span-7">
              {techEntries.length > 0 && (
                <div>
                  <p className="editorial-overline mb-6">
                    Технологии и оборудване
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {techEntries.map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-start gap-4 rounded-xl border border-border bg-[#fafafa] p-5 transition-shadow duration-200 hover:shadow-card"
                      >
                        <span
                          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-lg text-accent"
                          aria-hidden
                        >
                          {techIcons[key]}
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">
                            {techLabels[key]}
                          </p>
                          <p className="mt-1 font-display text-sm font-semibold text-foreground">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {techEntries.length === 0 && (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border-medium p-12 text-center">
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground-tertiary">
                      Детайли по запитване
                    </p>
                    <p className="mt-2 text-sm text-foreground-tertiary">
                      Свържете се с нас за пълна техническа спецификация.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Client quote (if present) ── */}
      {project.client && (
        <section className="grain bg-[#0a0f0a] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="editorial-overline mb-6 !text-accent">
              Партньор
            </p>
            <blockquote className="editorial-pull-quote text-white/80">
              &ldquo;Проектът беше реализиран в партньорство с{" "}
              <strong className="font-semibold not-italic text-white">
                {project.client}
              </strong>
              , осигурявайки висок стандарт на изпълнение и дългосрочна
              надеждност на системата.&rdquo;
            </blockquote>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#f7f7f5] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-border bg-white px-8 py-12 text-center shadow-card md:px-16 md:py-16">
            <h2 className="editorial-heading">
              Свържете се за подобен проект
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-secondary">
              Разкажете ни за обекта си — ще предложим решение според
              покрива, натоварването и бюджета.
            </p>
            <div className="mt-8">
              <Link
                href="/kontakti"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 font-display text-base font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,122,42,0.35)]"
              >
                Безплатна Консултация
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related projects ── */}
      {related.length > 0 && (
        <section className="bg-white px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="editorial-overline mb-3">
              Още от портфолиото
            </p>
            <h2 className="editorial-heading mb-12">
              Подобни проекти
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/proekti/${p.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-300 hover:shadow-elevated"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {p.kWp > 0 && (
                      <div className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 font-display text-sm font-bold text-white">
                        {p.kWp} kWp
                      </div>
                    )}
                    <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {categoryLabels[p.category]}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {p.location}, {p.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
