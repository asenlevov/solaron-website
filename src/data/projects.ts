export interface Project {
  slug: string;
  title: string;
  kWp: number;
  location: string;
  country: string;
  date?: string;
  category: "residential" | "commercial" | "industrial" | "carport";
  description: string;
  image: string;
  technologies: {
    panels?: string;
    inverters?: string;
    optimizers?: string;
    batteries?: string;
    mounting?: string;
  };
  benefits: string;
  client?: string;
}

export const projects: Project[] = [
  {
    slug: "651-kwp-saedinenie",
    title: "651 kWp Град Съединение",
    kWp: 651,
    location: "Град Съединение",
    country: "България",
    date: "2024-06",
    category: "industrial",
    image: "/real/projects/651kwp-saedinenie-hero.jpg",
    description:
      "Голямо индустриално покритие с високоефективни модули и централизирано управление чрез SolarEdge за максимален добив и мониторинг на ниво модул.",
    technologies: {
      panels: "Sunport Power MWT 450W",
      inverters: "SolarEdge",
      optimizers: "SolarEdge P950",
      mounting: "Van Der Valk",
    },
    benefits: "Производство на енергия за собствени нужди",
  },
  {
    slug: "270-kwp-carport-kazanlak",
    title: "270 kWp Карпорт Казанлък",
    kWp: 270,
    location: "Казанлък",
    country: "България",
    date: "2023-11",
    category: "carport",
    image: "/real/projects/270kwp-carport-kazanlak-hero.jpg",
    description:
      "Карпорт инсталация, съчетаваща защита на паркинга с производство на слънчева енергия — оптимално използване на градското пространство.",
    technologies: {
      panels: "Sunport Power MWT 450W",
      inverters: "SolarEdge",
      optimizers: "SolarEdge P950",
      mounting: "Van Der Valk",
    },
    benefits: "Производство на енергия за собствени нужди",
  },
  {
    slug: "119-kwp-hotel-erma",
    title: "119 kWp Хотел Ерма",
    kWp: 119,
    location: "Златни Пясъци",
    country: "България",
    category: "commercial",
    image: "/real/projects/119kwp-hotel-erma-1.jpg",
    description:
      "Фотоволтаична система върху покрива на хотелски обект край морето — намаляване на оперативните разходи за ток и по-устойчив туристически бизнес.",
    technologies: {},
    benefits:
      "Стабилно покритие на дневното потребление и по-добра предвидимост на енергийните разходи за сезонен хотелски обект.",
  },
  {
    slug: "108-kwp-sedem-bg",
    title: "108 kWp Седем БГ",
    kWp: 108,
    location: "София",
    country: "България",
    category: "commercial",
    image: "/real/projects/108kwp-sedem-bg-hero.jpg",
    description:
      "Комерсиална покривна инсталация в столицата за покриване на част от консумацията на офис и складови площи.",
    technologies: {},
    benefits:
      "По-ниски разходи за електроенергия в работни часове и по-малък въглероден отпечатък на сградата.",
  },
  {
    slug: "63-kwp-venelin-draganov",
    title: "63 kWp Венелин Драганов",
    kWp: 63,
    location: "България",
    country: "България",
    category: "commercial",
    image: "/real/projects/63kwp-venelin-draganov-hero.jpg",
    description:
      "Средномащабна търговска инсталация, проектирана за стабилно производство през целия ден и съвместимост с бъдещо разширение.",
    technologies: {},
    benefits:
      "Оптимизиран добив спрямо наличния покрив и натоварването на обекта, с фокус върху икономическата възвръщаемост.",
  },
  {
    slug: "60-kw-bp-bul-petroleum",
    title: "60 kW BP Bul Petroleum",
    kWp: 60,
    location: "с. Окоп, Ямбол",
    country: "България",
    date: "2025-10",
    category: "commercial",
    image: "/real/projects/solaron-51.jpg",
    description:
      "Хибридно решение с акумулаторно съхранение за търговски обект с променлив профил на натоварване — по-добро използване на произведената енергия.",
    technologies: {
      inverters: "Deye",
      batteries: "184.32 kWh",
    },
    benefits:
      "По-голяма самостоятелност при пикове и възможност за резерв при прекъсвания в мрежата.",
  },
  {
    slug: "39-kwp-varna",
    title: "39 kWp Варна",
    kWp: 39,
    location: "Варна",
    country: "България",
    category: "commercial",
    image: "/real/projects/39kwp-varna-hero.jpg",
    description:
      "Компактна комерсиална инсталация за малък до среден бизнес — бърз монтаж и ясна възвръщаемост.",
    technologies: {},
    benefits:
      "Намаляване на сметката за ток и по-добра енергийна независимост за работещо предприятие.",
  },
  {
    slug: "30-kwp-kazanlak",
    title: "30 kWp Казанлък",
    kWp: 30,
    location: "Казанлък",
    country: "България",
    category: "residential",
    image: "/real/projects/30kwp-kazanlak-1.jpg",
    description:
      "Жилищна покривна система за семейна къща — баланс между мощност, естетика и дневно самопотребление.",
    technologies: {},
    benefits:
      "По-ниски месечни разходи и по-чиста енергия за домакинството без компромис с комфорта.",
  },
  {
    slug: "15-kw-vratsa",
    title: "15 kW Враца",
    kWp: 15,
    location: "Враца",
    country: "България",
    category: "residential",
    image: "/real/projects/15kw-vratsa-1.jpg",
    description:
      "Домашна система с акумулатор за вечерно и нощно потребление — идеална за потребители с висок дял собствено производство.",
    technologies: {
      panels: "38 панела x 410W",
      inverters: "Chisage 14kW",
      batteries: "16 kWh",
    },
    benefits:
      "По-висока степен на автономност и защита от поскъпване на тока чрез съхранение на излишъка.",
  },
  {
    slug: "5-kw-kran",
    title: "5.04 kW Кръна",
    kWp: 5,
    location: "Кръна",
    country: "България",
    category: "residential",
    image: "/real/projects/5kw-kran-1.jpg",
    description:
      "Малка покривна инсталация за еднофамилна къща — достъпен вход в соларната енергия с бърз монтаж.",
    technologies: {},
    benefits:
      "Веднага намалена сметка за ток и стъпка към по-устойчив начин на живот.",
  },
  {
    slug: "golqmo-dryanovo",
    title: "Проект Голямо Дряново",
    kWp: 0,
    location: "Голямо Дряново",
    country: "България",
    category: "residential",
    image: "/real/projects/dryanovo-1.jpg",
    description:
      "Проектна фаза за жилищна фотоволтаична инсталация — анализ на покрива, натоварването и икономическата целесъобразност преди изпълнение.",
    technologies: {},
    benefits:
      "Ясна техническа и финансова рамка преди инвестицията и съобразяване с местните изисквания.",
  },
  {
    slug: "postnl-nieuwegein",
    title: "PostNL Нидерландия",
    kWp: 400,
    location: "Nieuwegein",
    country: "Нидерландия",
    category: "industrial",
    image: "/real/installations/nl-postNL-solar-1.jpg",
    description:
      "1,850 m², 1,160 панела, 7 дни монтаж. 21 сортировъчни и дистрибуторски центъра на PostNL.",
    technologies: {},
    benefits:
      "Мащабно покритие на логистичната мрежа с възобновяема енергия и по-малък оперативен отпечатък.",
    client: "PostNL / Elkor Group / Eneco",
  },
  {
    slug: "ahoy-rotterdam",
    title: "Ahoy Ротердам",
    kWp: 1000,
    location: "Ротердам",
    country: "Нидерландия",
    date: "2021",
    category: "industrial",
    image: "/real/installations/nl-ahoy-solar-2.jpg",
    description: "2,450 панела на покрива на Ahoy Rotterdam.",
    technologies: {},
    benefits:
      "Емблематичен обект с голям визуален и екологичен ефект — демонстрация на възможностите на покривния солар в градска среда.",
    client: "SolarPartners",
  },
  {
    slug: "hoppenbrouwers",
    title: "Hoppenbrouwers",
    kWp: 120,
    location: "Нидерландия",
    country: "Нидерландия",
    date: "2021",
    category: "commercial",
    image: "/real/installations/nl-ref-rooftop-2.jpg",
    description: "280 JA Solar панела.",
    technologies: {
      panels: "JA Solar (280 бр.)",
    },
    benefits:
      "Надеждна комерсиална инсталация с доказани модули и предвидим добив за техническата компания.",
    client: "Hoppenbrouwers Techniek B.V.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<Project["category"], string> = {
  residential: "Жилищен",
  commercial: "Комерсиален",
  industrial: "Индустриален",
  carport: "Карпорт",
};
