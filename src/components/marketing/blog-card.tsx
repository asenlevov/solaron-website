import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("bg-BG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background-card shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover",
        className,
      )}
    >
      {post.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden bg-background-secondary">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-accent/80 to-accent/60" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="accent" className="mb-3 w-fit">
          {post.category}
        </Badge>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent md:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-foreground-secondary">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 font-body text-xs text-foreground-tertiary">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5" aria-hidden />
            {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}
