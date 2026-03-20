import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import type { Project } from "@/data/projects";
import { categoryLabels } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const accentBarByCategory: Record<Project["category"], string> = {
  industrial: "bg-secondary",
  carport: "bg-accent",
  commercial: "bg-success",
  residential: "bg-violet-600",
};

const badgeClassByCategory: Record<Project["category"], string> = {
  industrial: "border-secondary/25 bg-secondary/10 text-secondary",
  carport: "border-accent/30 bg-accent-light text-accent",
  commercial: "border-success/25 bg-success-light text-success",
  residential: "border-violet-300 bg-violet-50 text-violet-800",
};

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { slug, title, kWp, location, category, image } = project;

  return (
    <Link
      href={`/proekti/${slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background-card shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:scale-[1.02] hover:shadow-card-hover",
        className,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background-secondary">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {kWp > 0 ? (
          <span className="absolute bottom-3 right-3 rounded-lg bg-[#3B7A2A]/90 px-3 py-1.5 font-display text-lg font-bold tabular-nums text-white shadow-lg backdrop-blur-sm">
            {kWp} <span className="text-xs font-semibold opacity-80">kWp</span>
          </span>
        ) : null}
      </div>

      <div className={cn("h-1 w-full shrink-0", accentBarByCategory[category])} />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="mb-2 font-display text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
          {title}
        </h3>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-body text-sm text-foreground-secondary">
            <MapPin className="size-4 shrink-0 text-foreground-tertiary" aria-hidden />
            {location}, {project.country}
          </span>
        </div>
        <Badge
          variant="default"
          className={cn("mb-4 w-fit", badgeClassByCategory[category])}
        >
          {categoryLabels[category]}
        </Badge>
        <span className="mt-auto inline-flex items-center gap-1 font-body text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
          Виж Проекта
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
