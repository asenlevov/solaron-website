import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/data/blog-posts";

const BASE = "https://solaron.io";
const locales = ["bg", "en", "nl"] as const;
type Locale = (typeof locales)[number];
type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

function localizedUrl(locale: Locale, path: string): string {
  return path === "/" ? `${BASE}/${locale}` : `${BASE}/${locale}${path}`;
}

function buildAlternates(paths: Record<Locale, string>) {
  return Object.fromEntries(
    locales.map((l) => [l, localizedUrl(l, paths[l])]),
  ) as Record<string, string>;
}

function makeEntries(
  paths: Record<Locale, string>,
  changeFrequency: ChangeFreq,
  priority: number,
  lastModified: Date,
): MetadataRoute.Sitemap {
  const languages = buildAlternates(paths);
  return locales.map((locale) => ({
    url: localizedUrl(locale, paths[locale]),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

const staticRoutes: Array<{
  paths: Record<Locale, string>;
  changeFrequency: ChangeFreq;
  priority: number;
}> = [
  // Homepage
  { paths: { bg: "/", en: "/", nl: "/" }, changeFrequency: "weekly", priority: 1 },

  // Solutions
  { paths: { bg: "/resheniya/za-doma", en: "/solutions/for-home", nl: "/oplossingen/voor-thuis" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/resheniya/za-biznesa", en: "/solutions/for-business", nl: "/oplossingen/voor-bedrijven" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/resheniya/za-industriyata", en: "/solutions/for-industry", nl: "/oplossingen/voor-industrie" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/resheniya/za-zemedelieto", en: "/solutions/for-agriculture", nl: "/oplossingen/voor-landbouw" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/resheniya/avtonomni-sistemi", en: "/solutions/off-grid", nl: "/oplossingen/autonome-systemen" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/resheniya/solaren-karport", en: "/solutions/solar-carport", nl: "/oplossingen/solar-carport" }, changeFrequency: "monthly", priority: 0.9 },

  // Products
  { paths: { bg: "/produkti/solarni-paneli", en: "/products/solar-panels", nl: "/producten/zonnepanelen" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/produkti/invertori", en: "/products/inverters", nl: "/producten/omvormers" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/produkti/baterii", en: "/products/batteries", nl: "/producten/batterijen" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/produkti/konstrukcii", en: "/products/mounting", nl: "/producten/constructies" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/produkti/monitoring", en: "/products/monitoring", nl: "/producten/monitoring" }, changeFrequency: "monthly", priority: 0.9 },
  { paths: { bg: "/produkti/ev-zaryadni-stantsii", en: "/products/ev-chargers", nl: "/producten/ev-laadstations" }, changeFrequency: "monthly", priority: 0.9 },

  // How it works
  { paths: { bg: "/kak-raboti", en: "/how-it-works", nl: "/hoe-het-werkt" }, changeFrequency: "monthly", priority: 0.8 },
  { paths: { bg: "/kak-raboti/slancheva-energiya", en: "/how-it-works/solar-energy", nl: "/hoe-het-werkt/zonne-energie" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kak-raboti/protsesa-na-montazh", en: "/how-it-works/installation-process", nl: "/hoe-het-werkt/installatieproces" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kak-raboti/svurzvane-kum-mrezhata", en: "/how-it-works/grid-connection", nl: "/hoe-het-werkt/netaansluiting" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kak-raboti/netno-metering", en: "/how-it-works/net-metering", nl: "/hoe-het-werkt/salderen" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kak-raboti/finansirane", en: "/how-it-works/financing", nl: "/hoe-het-werkt/financiering" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kak-raboti/vuzvrashchaemost", en: "/how-it-works/roi", nl: "/hoe-het-werkt/rendement" }, changeFrequency: "monthly", priority: 0.75 },

  // Company
  { paths: { bg: "/kompaniya/za-nas", en: "/company/about-us", nl: "/bedrijf/over-ons" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kompaniya/nasledstvo", en: "/company/heritage", nl: "/bedrijf/erfgoed" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kompaniya/ekip", en: "/company/team", nl: "/bedrijf/team" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kompaniya/sertifikati", en: "/company/certifications", nl: "/bedrijf/certificeringen" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kompaniya/partnori", en: "/company/partners", nl: "/bedrijf/partners" }, changeFrequency: "monthly", priority: 0.75 },
  { paths: { bg: "/kompaniya/karieri", en: "/company/careers", nl: "/bedrijf/vacatures" }, changeFrequency: "monthly", priority: 0.75 },

  // Projects index
  { paths: { bg: "/proekti", en: "/projects", nl: "/projecten" }, changeFrequency: "weekly", priority: 0.85 },

  // Blog
  { paths: { bg: "/blog", en: "/blog", nl: "/blog" }, changeFrequency: "weekly", priority: 0.8 },

  // Contact
  { paths: { bg: "/kontakti", en: "/contact", nl: "/contact" }, changeFrequency: "monthly", priority: 0.85 },

  // Configurator
  { paths: { bg: "/konfigurator", en: "/configurator", nl: "/configurator" }, changeFrequency: "monthly", priority: 0.85 },

  // FAQ
  { paths: { bg: "/chesti-vuprosi", en: "/faq", nl: "/veelgestelde-vragen" }, changeFrequency: "monthly", priority: 0.65 },

  // Tools
  { paths: { bg: "/instrumenti/rechnik", en: "/tools/glossary", nl: "/gereedschappen/woordenlijst" }, changeFrequency: "monthly", priority: 0.7 },
  { paths: { bg: "/instrumenti/sravnenie", en: "/tools/comparison", nl: "/gereedschappen/vergelijking" }, changeFrequency: "monthly", priority: 0.7 },
  { paths: { bg: "/instrumenti/spestqvania", en: "/tools/savings", nl: "/gereedschappen/besparingen" }, changeFrequency: "monthly", priority: 0.7 },
  { paths: { bg: "/instrumenti/roi-kalkulator", en: "/tools/roi-calculator", nl: "/gereedschappen/roi-calculator" }, changeFrequency: "monthly", priority: 0.7 },

  // Legal
  { paths: { bg: "/pravna-informatsiya/poveritelnost", en: "/legal/privacy", nl: "/juridisch/privacy" }, changeFrequency: "yearly", priority: 0.3 },
  { paths: { bg: "/pravna-informatsiya/usloviya", en: "/legal/terms", nl: "/juridisch/voorwaarden" }, changeFrequency: "yearly", priority: 0.3 },
  { paths: { bg: "/pravna-informatsiya/biskvitki", en: "/legal/cookies", nl: "/juridisch/cookies" }, changeFrequency: "yearly", priority: 0.3 },
  { paths: { bg: "/pravna-informatsiya/garantsiya", en: "/legal/warranty", nl: "/juridisch/garantie" }, changeFrequency: "yearly", priority: 0.3 },

  // Landing pages
  { paths: { bg: "/lp/finansirane-solar", en: "/lp/solar-financing", nl: "/lp/zonne-financiering" }, changeFrequency: "monthly", priority: 0.7 },
  { paths: { bg: "/lp/bezplatna-konsultatsiya", en: "/lp/free-consultation", nl: "/lp/gratis-advies" }, changeFrequency: "monthly", priority: 0.7 },
  { paths: { bg: "/lp/solar-sreshtu-tok", en: "/lp/solar-vs-electricity", nl: "/lp/zonne-vs-stroom" }, changeFrequency: "monthly", priority: 0.7 },
  { paths: { bg: "/lp/solar-za-nov-dom", en: "/lp/solar-new-home", nl: "/lp/zonne-nieuwbouw" }, changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    entries.push(...makeEntries(route.paths, route.changeFrequency, route.priority, now));
  }

  for (const p of projects) {
    entries.push(
      ...makeEntries(
        { bg: `/proekti/${p.slug}`, en: `/projects/${p.slug}`, nl: `/projecten/${p.slug}` },
        "monthly",
        0.8,
        now,
      ),
    );
  }

  for (const post of getAllPosts()) {
    entries.push(
      ...makeEntries(
        { bg: `/blog/${post.slug}`, en: `/blog/${post.slug}`, nl: `/blog/${post.slug}` },
        "monthly",
        0.7,
        new Date(post.date),
      ),
    );
  }

  return entries;
}
