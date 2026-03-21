const SITE = "https://solaron.pro";

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#organization`,
  name: "Solaron",
  url: SITE,
  description:
    "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. Спестете до 80% от сметката за ток.",
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo-solaron.png`,
  },
  image: `${SITE}/logo-solaron.png`,
  telephone: "+359884321560",
  email: "info@solaron.pro",
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
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
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
};

const websiteJson = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Solaron",
  url: SITE,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Колко струва инсталацията на соларна система?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Цената зависи от размера на системата и компонентите. Средна домашна система от 5-10 kWp струва между 8,000 и 18,000 лв. Предлагаме безплатна консултация с персонализирана оферта.",
      },
    },
    {
      "@type": "Question",
      name: "За колко време се изплаща инвестицията?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "При типична домашна система срокът на възвръщаемост е 4-6 години, в зависимост от консумацията, ориентацията на покрива и тарифния план.",
      },
    },
    {
      "@type": "Question",
      name: "Какви гаранции предлагате?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Предлагаме 30-годишна гаранция на панелите, 12-годишна на инверторите и 10-годишна на батериите. Монтажът е с 5-годишна гаранция.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </>
  );
}
