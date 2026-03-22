import { getLocale, getTranslations } from "next-intl/server";

const SITE = "https://solaron.io";

const LOCALE_TO_LANGUAGE: Record<string, string> = {
  bg: "bg-BG",
  en: "en-US",
  nl: "nl-NL",
};

export async function JsonLd() {
  const locale = await getLocale();
  const t = await getTranslations("JsonLd");
  const inLanguage = LOCALE_TO_LANGUAGE[locale] ?? "bg-BG";

  const organizationJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#organization`,
    name: "Solaron",
    alternateName: "Solaron Energy",
    url: SITE,
    description: t("orgDescription"),
    inLanguage,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/logo-solaron.png`,
    },
    image: `${SITE}/og-image.png`,
    telephone: "+359884321560",
    email: "hello@solaron.io",
    address: {
      "@type": "PostalAddress",
      streetAddress: "бул. Черни Връх 59Б, ет. 3",
      addressLocality: "София",
      postalCode: "1407",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.6699,
      longitude: 23.3067,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.linkedin.com/company/solaron-energy",
      "https://www.facebook.com/solaron.energy",
      "https://www.instagram.com/solaron.energy",
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("catalogName"),
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t("homeSystemName"),
            description: t("homeSystemDesc"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t("businessSystemName"),
            description: t("businessSystemDesc"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t("storageSystemName"),
            description: t("storageSystemDesc"),
          },
        },
      ],
    },
  };

  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Solaron",
    url: SITE,
    inLanguage,
  };

  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/#service`,
    name: t("serviceName"),
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE}/#organization`,
    },
    serviceType: "Solar Panel Installation",
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    description: t("serviceDesc"),
    inLanguage,
    brand: [
      { "@type": "Brand", name: "SolarEdge" },
      { "@type": "Brand", name: "Kstar" },
      { "@type": "Brand", name: "Deye" },
      { "@type": "Brand", name: "Huawei" },
      { "@type": "Brand", name: "AIKO" },
      { "@type": "Brand", name: "DMEGC" },
      { "@type": "Brand", name: "Sunport Power" },
    ],
  };

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: [
      {
        "@type": "Question",
        name: t("faq1Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq1A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq2Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq2A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq3Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq3A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq4Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq4A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq5Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq5A"),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </>
  );
}
