import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  type BlogPost,
} from "@/data/blog-posts";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\wа-яё]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text });
  }
  return headings;
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\wа-яё]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });
}

function getRelated(current: BlogPost): BlogPost[] {
  const same = getPostsByCategory(current.category).filter(
    (p) => p.slug !== current.slug
  );
  if (same.length >= 3) return same.slice(0, 3);
  const rest = getAllPosts().filter(
    (p) => p.slug !== current.slug && !same.some((s) => s.slug === p.slug)
  );
  return [...same, ...rest].slice(0, 3);
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Блог" };
  return {
    title: `${post.title} | Solaron`,
    description: post.excerpt.slice(0, 160),
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelated(post);
  const headings = extractHeadings(post.content);
  const contentWithIds = addIdsToHeadings(post.content);
  const minutes = readingTime(post.content);
  const shareUrl = `https://solaron.pro/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pt-32 pb-20 md:pt-40 md:pb-28 grain">
        {post.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/60" />
          </div>
        )}
        <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="rounded-full bg-accent/20 px-3 py-1 font-body text-xs font-semibold text-accent">
              {post.category}
            </span>
            <span className="font-body text-xs text-white/50">
              {minutes} мин. четене
            </span>
          </div>
          <h1 className="text-editorial-hero max-w-4xl text-white">
            {post.title}
          </h1>
          <p className="mt-6 font-body text-base text-white/60">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {" "}&middot;{" "}{post.author}
          </p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Article */}
            <article>
              <div
                className={cn(
                  "blog-article space-y-6 font-body text-base leading-relaxed text-foreground-secondary",
                  "[&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-editorial-heading [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:first:mt-0",
                  "[&_p]:mb-4 [&_p]:last:mb-0",
                  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6",
                  "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6",
                  "[&_strong]:font-semibold [&_strong]:text-foreground",
                  "[&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline"
                )}
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* Share */}
              <div className="mt-16 border-t border-border pt-8">
                <p className="text-editorial-overline text-accent mb-4">
                  Сподели
                </p>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
                    aria-label="Сподели в Twitter"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
                    aria-label="Сподели във Facebook"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
                    aria-label="Сподели в LinkedIn"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 rounded-2xl border border-border bg-[#f7f7f5] p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <span className="font-display text-lg font-bold text-accent">
                      S
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      {post.author}
                    </p>
                    <p className="font-body text-sm text-foreground-secondary">
                      Материали за фотоволтаици, инвертори и устойчива енергия от екипа на Solaron.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {headings.length > 0 && (
                  <nav aria-label="Съдържание">
                    <p className="text-editorial-overline text-accent mb-4">
                      Съдържание
                    </p>
                    <ul className="space-y-2 border-l border-border pl-4">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="font-body text-sm text-foreground-secondary transition-colors hover:text-accent"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <p className="font-display text-sm font-semibold text-foreground mb-2">
                    Нужна е консултация?
                  </p>
                  <p className="font-body text-xs text-foreground-secondary mb-4">
                    Свържете се за безплатна оценка на вашия обект.
                  </p>
                  <MagneticButton
                    href="/kontakti"
                    variant="primary"
                    size="md"
                  >
                    Контакти
                  </MagneticButton>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f7f5] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="rounded-2xl border border-border bg-white px-8 py-12 text-center md:px-12">
            <h2 className="text-editorial-heading text-foreground text-2xl md:text-3xl">
              Готови за оферта за вашия покрив?
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-foreground-secondary">
              Опишете обекта си — ще върнем инженерна оценка без ангажимент.
            </p>
            <div className="mt-8">
              <MagneticButton href="/kontakti" variant="primary" size="lg">
                Свържете се с нас
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-editorial-overline text-accent mb-4">
              Още от блога
            </p>
            <h2 className="text-editorial-heading text-foreground mb-14">
              Свързани публикации
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
                >
                  {p.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-2 w-fit rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-semibold text-accent">
                      {p.category}
                    </span>
                    <h3 className="text-editorial-heading text-foreground text-lg group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-foreground-secondary line-clamp-2">
                      {p.excerpt}
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
