import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { projects, categoryLabels, type Project } from "@/data/projects";
import { REAL_IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Проекти — Solaron",
  description:
    "Портфолио от изпълнени соларни проекти в България и Европа. Жилищни, комерсиални, индустриални и карпорт инсталации.",
};

type FilterKey = "all" | Project["category"];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Всички" },
  { key: "residential", label: "Жилищни" },
  { key: "commercial", label: "Комерсиални" },
  { key: "industrial", label: "Индустриални" },
  { key: "carport", label: "Карпорт" },
];

const totalKWp = projects.reduce((sum, p) => sum + p.kWp, 0);
const countries = new Set(projects.map((p) => p.country)).size;

export default async function ProektiPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string | string[] }>;
}) {
  const sp = await searchParams;
  const raw =
    typeof sp.c === "string"
      ? sp.c
      : Array.isArray(sp.c)
        ? sp.c[0]
        : undefined;
  const active: FilterKey = filters.some((f) => f.key === raw)
    ? (raw as FilterKey)
    : "all";
  const list =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);
  const featured = projects[0];

  return (
    <main className="pt-16">
      {/* ── Editorial hero ── */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <ImageEditorial
          src={REAL_IMAGES.projects.saedinenie651_hero}
          alt="Соларен парк Съединение — 651 kWp"
          fill
          priority
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-12 md:pb-20">
          <p className="editorial-overline text-white/60 mb-6">ПОРТФОЛИО</p>
          <h1 className="editorial-hero max-w-4xl text-white">
            Нашите
            <br />
            Проекти
          </h1>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            <span>
              {projects.length} проекта
            </span>
            <span className="text-accent">·</span>
            <span>
              {totalKWp.toLocaleString("bg-BG")}+ kWp
            </span>
            <span className="text-accent">·</span>
            <span>{countries} държави</span>
          </div>
        </div>
      </section>

      {/* ── Featured project ── */}
      <section className="relative bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="editorial-overline mb-10">
            ВОДЕЩ ПРОЕКТ
          </p>
          <div className="relative grid gap-8 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-2xl lg:col-span-8">
              <div className="relative aspect-[16/9]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 66vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {categoryLabels[featured.category]}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-4 lg:-ml-16 lg:relative lg:z-10">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-elevated lg:p-10">
                <p className="editorial-overline mb-2">
                  {featured.location}
                </p>
                {featured.kWp > 0 && (
                  <p className="editorial-stat text-accent">
                    {featured.kWp}
                    <span className="ml-1 text-[0.35em] font-semibold text-foreground-tertiary">
                      kWp
                    </span>
                  </p>
                )}
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {featured.location}, {featured.country}
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
                  {featured.description}
                </p>
                <Link
                  href={`/proekti/${featured.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Разгледай проекта
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="bg-[#f7f7f5] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div
            className="mb-12 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Филтър по категория"
          >
            {filters.map(({ key, label }) => (
              <Link
                key={key}
                href={key === "all" ? "/proekti" : `/proekti?c=${key}`}
                scroll={false}
                role="tab"
                aria-selected={active === key}
                className={cn(
                  "rounded-full border px-5 py-2.5 font-display text-sm font-semibold transition-all duration-200",
                  active === key
                    ? "border-accent bg-accent text-white shadow-soft"
                    : "border-border bg-white text-foreground-secondary hover:border-accent/40 hover:text-accent",
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((project) => (
              <Link
                key={project.slug}
                href={`/proekti/${project.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-300 hover:shadow-elevated"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {project.kWp > 0 && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 font-display text-sm font-bold text-white">
                      {project.kWp} kWp
                    </div>
                  )}
                  <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {categoryLabels[project.category]}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    {project.location}, {project.country}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="grain bg-foreground px-6 py-20 text-center md:px-12 md:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="editorial-display text-white">
            Готови За
            <br />
            Подобен Проект?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Разкажете ни за обекта си и ще предложим оптимално решение
            за вашите нужди.
          </p>
          <div className="mt-10">
            <MagneticButton href="/kontakti" variant="primary" size="xl">
              Безплатна Консултация
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
