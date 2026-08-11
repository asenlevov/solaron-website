import type { Metadata } from "next";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

const SITE_NAME = "Solaron";

const OG_LOCALES: Record<string, string> = {
  bg: "bg_BG",
  en: "en_US",
  nl: "nl_NL",
};

type OgCardInput = {
  title: string;
  description?: string;
  /** Small uppercase label rendered above the title on the generated card. */
  eyebrow?: string;
};

/** URL of the dynamically generated Solaron OG card for a given title. */
export function ogCardUrl({ title, description, eyebrow }: OgCardInput): string {
  const params = new URLSearchParams({ title });
  if (description) params.set("description", description);
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/og?${params.toString()}`;
}

type SocialMetadataInput = OgCardInput & {
  description: string;
  locale?: string;
  /**
   * Site-relative path to a real photo (blog cover, project shot). When set it
   * is used instead of the generated card — a real image beats a text card.
   */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Builds the `openGraph` + `twitter` blocks for a page.
 *
 * Next.js replaces — rather than merges — the parent `openGraph` object when a
 * page declares its own, so every field the root layout provides has to be
 * repeated here. Spread the result into the object returned by
 * `generateMetadata`.
 */
export function socialMetadata({
  title,
  description,
  eyebrow,
  locale,
  image,
  imageAlt,
  type = "website",
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const url = image ?? ogCardUrl({ title, description, eyebrow });
  const alt = imageAlt ?? title;

  return {
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: locale ? (OG_LOCALES[locale] ?? OG_LOCALES.bg) : undefined,
      title,
      description,
      images: [image ? { url, alt } : { url, ...OG_IMAGE_SIZE, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [url],
    },
  };
}
