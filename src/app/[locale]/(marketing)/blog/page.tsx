import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/data/blog-posts";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

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

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main>
      {/* Newsletter Hero */}
      <section className="overflow-hidden bg-foreground pt-32 pb-20 md:pt-40 md:pb-24 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="editorial-overline text-accent mb-6">Блог</p>
              <TextReveal
                as="h1"
                className="editorial-hero max-w-4xl text-white"
              >
                Новини и Ръководства
              </TextReveal>
              <p className="mt-6 font-body text-lg text-white/60">
                Актуални теми за фотоволтаици, инвертори и пазара на чиста
                енергия в България.
              </p>
            </div>
            <div className="w-full max-w-md">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-white/40">
                Бюлетин
              </p>
              <form
                className="flex gap-2"
                action="#"
              >
                <input
                  type="email"
                  placeholder="вашият имейл"
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-accent"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-accent px-5 py-3 font-display text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_20px_rgba(59,122,42,0.3)]"
                >
                  Абонирай се
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="editorial-overline text-accent mb-8">
              Актуално
            </p>
            <Link
              href={`/blog/${featured.slug}` as never}
              className="group grid gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                {featured.coverImage && (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
                <div className="grain absolute inset-0" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-semibold text-accent">
                    {featured.category}
                  </span>
                  <span className="font-body text-xs text-foreground-secondary">
                    {readingTime(featured.content)} мин. четене
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
                  {featured.excerpt}
                </p>
                <p className="mt-6 font-body text-sm text-foreground-secondary">
                  <time dateTime={featured.date}>
                    {formatDate(featured.date)}
                  </time>{" "}
                  &middot; {featured.author}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section className="bg-[#f7f7f5] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="editorial-overline text-accent mb-4">
              Всички статии
            </p>
            <h2 className="editorial-heading text-foreground mb-14">
              Последни публикации
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}` as never}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-semibold text-accent">
                        {post.category}
                      </span>
                      <span className="font-body text-xs text-foreground-secondary">
                        {readingTime(post.content)} мин.
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-lg">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-foreground-secondary line-clamp-3">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 font-body text-xs text-foreground-secondary">
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="grain bg-foreground py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <h2 className="editorial-display mx-auto max-w-2xl text-white">
            Готови за вашия соларен проект?
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg text-white/70">
            Свържете се с нас за безплатна консултация и оферта.
          </p>
          <div className="mt-10">
            <MagneticButton href="/kontakti" variant="primary" size="xl">
              Свържете се с нас
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
