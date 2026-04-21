import { defineRouting } from "next-intl/routing";

export const locales = ["bg", "en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,

  pathnames: {
    "/": "/",

    // ── Solutions ──
    "/resheniya": {
      bg: "/resheniya",
      en: "/solutions",
      nl: "/oplossingen",
    },
    "/resheniya/za-doma": {
      bg: "/resheniya/za-doma",
      en: "/solutions/for-home",
      nl: "/oplossingen/voor-thuis",
    },
    "/resheniya/za-biznesa": {
      bg: "/resheniya/za-biznesa",
      en: "/solutions/for-business",
      nl: "/oplossingen/voor-bedrijven",
    },
    "/resheniya/za-industriyata": {
      bg: "/resheniya/za-industriyata",
      en: "/solutions/for-industry",
      nl: "/oplossingen/voor-industrie",
    },
    "/resheniya/za-zemedelieto": {
      bg: "/resheniya/za-zemedelieto",
      en: "/solutions/for-agriculture",
      nl: "/oplossingen/voor-landbouw",
    },
    "/resheniya/avtonomni-sistemi": {
      bg: "/resheniya/avtonomni-sistemi",
      en: "/solutions/off-grid",
      nl: "/oplossingen/autonome-systemen",
    },
    "/resheniya/solaren-karport": {
      bg: "/resheniya/solaren-karport",
      en: "/solutions/solar-carport",
      nl: "/oplossingen/solar-carport",
    },

    // ── Products ──
    "/produkti/solarni-paneli": {
      bg: "/produkti/solarni-paneli",
      en: "/products/solar-panels",
      nl: "/producten/zonnepanelen",
    },
    "/produkti/invertori": {
      bg: "/produkti/invertori",
      en: "/products/inverters",
      nl: "/producten/omvormers",
    },
    "/produkti/baterii": {
      bg: "/produkti/baterii",
      en: "/products/batteries",
      nl: "/producten/batterijen",
    },
    "/produkti/konstrukcii": {
      bg: "/produkti/konstrukcii",
      en: "/products/mounting",
      nl: "/producten/constructies",
    },
    "/produkti/monitoring": {
      bg: "/produkti/monitoring",
      en: "/products/monitoring",
      nl: "/producten/monitoring",
    },
    "/produkti/ev-zaryadni-stantsii": {
      bg: "/produkti/ev-zaryadni-stantsii",
      en: "/products/ev-chargers",
      nl: "/producten/ev-laadstations",
    },

    // ── How it works ──
    "/kak-raboti": {
      bg: "/kak-raboti",
      en: "/how-it-works",
      nl: "/hoe-het-werkt",
    },
    "/kak-raboti/slancheva-energiya": {
      bg: "/kak-raboti/slancheva-energiya",
      en: "/how-it-works/solar-energy",
      nl: "/hoe-het-werkt/zonne-energie",
    },
    "/kak-raboti/protsesa-na-montazh": {
      bg: "/kak-raboti/protsesa-na-montazh",
      en: "/how-it-works/installation-process",
      nl: "/hoe-het-werkt/installatieproces",
    },
    "/kak-raboti/svurzvane-kum-mrezhata": {
      bg: "/kak-raboti/svurzvane-kum-mrezhata",
      en: "/how-it-works/grid-connection",
      nl: "/hoe-het-werkt/netaansluiting",
    },
    "/kak-raboti/netno-metering": {
      bg: "/kak-raboti/netno-metering",
      en: "/how-it-works/net-metering",
      nl: "/hoe-het-werkt/salderen",
    },
    "/kak-raboti/finansirane": {
      bg: "/kak-raboti/finansirane",
      en: "/how-it-works/financing",
      nl: "/hoe-het-werkt/financiering",
    },
    "/kak-raboti/vuzvrashchaemost": {
      bg: "/kak-raboti/vuzvrashchaemost",
      en: "/how-it-works/roi",
      nl: "/hoe-het-werkt/rendement",
    },

    // ── Company ──
    "/kompaniya/za-nas": {
      bg: "/kompaniya/za-nas",
      en: "/company/about-us",
      nl: "/bedrijf/over-ons",
    },
    "/kompaniya/nasledstvo": {
      bg: "/kompaniya/nasledstvo",
      en: "/company/heritage",
      nl: "/bedrijf/erfgoed",
    },
    "/kompaniya/ekip": {
      bg: "/kompaniya/ekip",
      en: "/company/team",
      nl: "/bedrijf/team",
    },
    "/kompaniya/sertifikati": {
      bg: "/kompaniya/sertifikati",
      en: "/company/certifications",
      nl: "/bedrijf/certificeringen",
    },
    "/kompaniya/partnori": {
      bg: "/kompaniya/partnori",
      en: "/company/partners",
      nl: "/bedrijf/partners",
    },
    "/kompaniya/karieri": {
      bg: "/kompaniya/karieri",
      en: "/company/careers",
      nl: "/bedrijf/vacatures",
    },

    // ── Projects ──
    "/proekti": {
      bg: "/proekti",
      en: "/projects",
      nl: "/projecten",
    },
    "/proekti/[slug]": {
      bg: "/proekti/[slug]",
      en: "/projects/[slug]",
      nl: "/projecten/[slug]",
    },

    // ── Blog ──
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",

    // ── Contact ──
    "/kontakti": {
      bg: "/kontakti",
      en: "/contact",
      nl: "/contact",
    },

    // ── Configurator ──
    "/konfigurator": {
      bg: "/konfigurator",
      en: "/configurator",
      nl: "/configurator",
    },

    // ── FAQ ──
    "/chesti-vuprosi": {
      bg: "/chesti-vuprosi",
      en: "/faq",
      nl: "/veelgestelde-vragen",
    },

    // ── Tools ──
    "/instrumenti/rechnik": {
      bg: "/instrumenti/rechnik",
      en: "/tools/glossary",
      nl: "/gereedschappen/woordenlijst",
    },
    "/instrumenti/sravnenie": {
      bg: "/instrumenti/sravnenie",
      en: "/tools/comparison",
      nl: "/gereedschappen/vergelijking",
    },
    "/instrumenti/spestqvania": {
      bg: "/instrumenti/spestqvania",
      en: "/tools/savings",
      nl: "/gereedschappen/besparingen",
    },
    "/instrumenti/roi-kalkulator": {
      bg: "/instrumenti/roi-kalkulator",
      en: "/tools/roi-calculator",
      nl: "/gereedschappen/roi-calculator",
    },

    // ── Legal ──
    "/pravna-informatsiya/poveritelnost": {
      bg: "/pravna-informatsiya/poveritelnost",
      en: "/legal/privacy",
      nl: "/juridisch/privacy",
    },
    "/pravna-informatsiya/usloviya": {
      bg: "/pravna-informatsiya/usloviya",
      en: "/legal/terms",
      nl: "/juridisch/voorwaarden",
    },
    "/pravna-informatsiya/biskvitki": {
      bg: "/pravna-informatsiya/biskvitki",
      en: "/legal/cookies",
      nl: "/juridisch/cookies",
    },
    "/pravna-informatsiya/garantsiya": {
      bg: "/pravna-informatsiya/garantsiya",
      en: "/legal/warranty",
      nl: "/juridisch/garantie",
    },

    // ── Landing pages ──
    "/lp/finansirane-solar": {
      bg: "/lp/finansirane-solar",
      en: "/lp/solar-financing",
      nl: "/lp/zonne-financiering",
    },
    "/lp/bezplatna-konsultatsiya": {
      bg: "/lp/bezplatna-konsultatsiya",
      en: "/lp/free-consultation",
      nl: "/lp/gratis-advies",
    },
    "/lp/solar-sreshtu-tok": {
      bg: "/lp/solar-sreshtu-tok",
      en: "/lp/solar-vs-electricity",
      nl: "/lp/zonne-vs-stroom",
    },
    "/lp/solar-za-nov-dom": {
      bg: "/lp/solar-za-nov-dom",
      en: "/lp/solar-new-home",
      nl: "/lp/zonne-nieuwbouw",
    },

    // ── Internal ──
    "/offer-maker": "/offer-maker",
  },
});
