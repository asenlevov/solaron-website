const SITE = "https://solaron.io";

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#organization`,
  name: "Solaron",
  alternateName: "Solaron Energy",
  url: SITE,
  description:
    "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. SolarEdge, Kstar, Deye инвертори и AIKO, DMEGC, Sunport Power панели.",
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
    name: "Соларни решения",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Фотоволтаична система за дома",
          description:
            "Проектиране и монтаж на домашни фотоволтаични системи от 3 до 30 kWp с инвертори SolarEdge, Kstar и Deye.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Соларна система за бизнеса",
          description:
            "Индустриални и комерсиални фотоволтаични инсталации до 1 MWp с мониторинг и поддръжка.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Съхранение на енергия",
          description:
            "Батерийни системи за съхранение на енергия от Kstar, CNTE и Pylontech за енергийна независимост.",
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
};

const serviceJson = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE}/#service`,
  name: "Монтаж на фотоволтаични системи",
  provider: {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#organization`,
  },
  serviceType: "Solar Panel Installation",
  areaServed: {
    "@type": "Country",
    name: "Bulgaria",
  },
  description:
    "Пълен инженеринг — от проектиране и доставка до монтаж и въвеждане в експлоатация на фотоволтаични системи за дома, бизнеса и индустрията.",
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
    {
      "@type": "Question",
      name: "Какви марки инвертори предлагате?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Работим с три водещи марки: SolarEdge (премиум), Kstar (хибридни all-in-one решения) и Deye (хибридни инвертори с отлично съотношение цена/качество). За комерсиални проекти предлагаме и Huawei.",
      },
    },
    {
      "@type": "Question",
      name: "Какво е нетно отчитане (net metering)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Нетното отчитане позволява да продавате излишната произведена енергия обратно в електрическата мрежа. Електромерът отчита разликата между консумирана и произведена енергия, което значително намалява сметките ви за ток.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </>
  );
}
