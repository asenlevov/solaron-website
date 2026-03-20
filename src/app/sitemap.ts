import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/data/blog-posts";

const BASE = "https://solaron.pro";

function url(path: string): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const productSlugs = [
    "solarni-paneli",
    "invertori",
    "baterii",
    "konstrukcii",
    "monitoring",
    "ev-zaryadni-stantsii",
  ] as const;

  const solutionSlugs = [
    "za-doma",
    "za-biznesa",
    "za-industriyata",
    "za-zemedelieto",
    "avtonomni-sistemi",
    "solaren-karport",
  ] as const;

  const kakRabotiSlugs = [
    "slancheva-energiya",
    "netno-metering",
    "finansirane",
    "vuzvrashchaemost",
    "protsesa-na-montazh",
  ] as const;

  const instrumentiSlugs = ["rechnik", "sravnenie", "spestqvania", "roi-kalkulator"] as const;

  const kompaniyaSlugs = ["za-nas", "nasledstvo", "ekip", "sertifikati", "partnori", "karieri"] as const;

  const legalSlugs = ["poveritelnost", "usloviya", "biskvitki", "garantsiya"] as const;

  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: url("/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  });

  for (const slug of productSlugs) {
    entries.push({
      url: url(`/produkti/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const slug of solutionSlugs) {
    entries.push({
      url: url(`/resheniya/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  entries.push({
    url: url("/konfigurator"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  });

  entries.push({
    url: url("/proekti"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  });

  for (const p of projects) {
    entries.push({
      url: url(`/proekti/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of kakRabotiSlugs) {
    entries.push({
      url: url(`/kak-raboti/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const slug of instrumentiSlugs) {
    entries.push({
      url: url(`/instrumenti/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const slug of kompaniyaSlugs) {
    entries.push({
      url: url(`/kompaniya/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  entries.push({
    url: url("/kontakti"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  });

  entries.push({
    url: url("/blog"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  for (const post of getAllPosts()) {
    entries.push({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  entries.push({
    url: url("/chesti-vuprosi"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  });

  for (const slug of legalSlugs) {
    entries.push({
      url: url(`/pravna-informatsiya/${slug}`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
