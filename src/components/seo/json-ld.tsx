const SITE = "https://solaron.pro";

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Solaron",
  url: SITE,
  description:
    "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. Спестете до 80% от сметката за ток.",
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/favicon.ico`,
  },
  sameAs: [] as string[],
};

const websiteJson = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Solaron",
  url: SITE,
};

export function JsonLd() {
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
    </>
  );
}
