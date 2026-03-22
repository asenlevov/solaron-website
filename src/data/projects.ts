export interface ProjectMetrics {
  annualKwh?: number;
  co2SavedTons?: number;
  treesEquivalent?: number;
  savingsPerYear?: number;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role?: string;
}

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
  gallery?: string[];
  technologies: {
    panels?: string;
    inverters?: string;
    optimizers?: string;
    batteries?: string;
    mounting?: string;
  };
  benefits: string;
  client?: string;
  metrics?: ProjectMetrics;
  testimonial?: ProjectTestimonial;
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
    gallery: [
      "/real/projects/651kwp-saedinenie-1.jpg",
      "/real/projects/651kwp-saedinenie-2.jpg",
      "/real/projects/651kwp-saedinenie-3.jpg",
      "/real/projects/651kwp-saedinenie-4.jpg",
    ],
    description:
      "Голямо индустриално покритие с високоефективни модули и централизирано управление чрез SolarEdge за максимален добив и мониторинг на ниво модул.",
    technologies: {
      panels: "Sunport Power MWT 450W",
      inverters: "SolarEdge",
      optimizers: "SolarEdge P950",
      mounting: "Van Der Valk",
    },
    benefits: "Производство на енергия за собствени нужди",
    metrics: {
      annualKwh: 780000,
      co2SavedTons: 312,
      treesEquivalent: 15600,
      savingsPerYear: 195000,
    },
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
    gallery: [
      "/real/projects/270kwp-carport-kazanlak-1.jpg",
      "/real/projects/270kwp-carport-kazanlak-2.jpg",
      "/real/projects/270kwp-carport-kazanlak-3.jpg",
      "/real/projects/270kwp-carport-kazanlak-4.jpg",
    ],
    description:
      "Карпорт инсталация, съчетаваща защита на паркинга с производство на слънчева енергия — оптимално използване на градското пространство.",
    technologies: {
      panels: "Sunport Power MWT 450W",
      inverters: "SolarEdge",
      optimizers: "SolarEdge P950",
      mounting: "Van Der Valk",
    },
    benefits: "Производство на енергия за собствени нужди",
    metrics: {
      annualKwh: 324000,
      co2SavedTons: 129,
      treesEquivalent: 6480,
      savingsPerYear: 81000,
    },
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
    gallery: [
      "/real/projects/15kw-vratsa-2.jpg",
      "/real/projects/15kw-vratsa-3.jpg",
      "/real/projects/15kw-vratsa-4.jpg",
    ],
    description:
      "Домашна система с акумулатор за вечерно и нощно потребление — идеална за потребители с висок дял собствено производство.",
    technologies: {
      panels: "38 панела x 410W",
      inverters: "Chisage 14kW",
      batteries: "16 kWh",
    },
    benefits:
      "По-висока степен на автономност и защита от поскъпване на тока чрез съхранение на излишъка.",
    metrics: {
      annualKwh: 19500,
      co2SavedTons: 7.8,
      treesEquivalent: 390,
      savingsPerYear: 8400,
    },
    testimonial: {
      quote: "Професионален подход от начало до край. Монтажът приключи за 2 дни.",
      name: "Мария Георгиева",
      role: "Домакинство",
    },
  },
  {
    slug: "5-kw-kran",
    title: "5.04 kW Кръна",
    kWp: 5,
    location: "Кръна",
    country: "България",
    category: "residential",
    image: "/real/projects/5kw-kran-1.jpg",
    gallery: [
      "/real/projects/5kw-kran-2.jpg",
      "/real/projects/5kw-kran-3.jpg",
      "/real/projects/5kw-kran-4.jpg",
    ],
    description:
      "Малка покривна инсталация за еднофамилна къща — достъпен вход в соларната енергия с бърз монтаж.",
    technologies: {},
    benefits:
      "Веднага намалена сметка за ток и стъпка към по-устойчив начин на живот.",
    metrics: {
      annualKwh: 6800,
      co2SavedTons: 2.7,
      treesEquivalent: 135,
      savingsPerYear: 4200,
    },
    testimonial: {
      quote: "Системата работи безупречно от първия ден. За 8 месеца вече сме спестили над 4000 лв.",
      name: "Иван Петров",
      role: "Домакинство",
    },
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
  {
    slug: "albert-heijn-xl",
    title: "Albert Heijn XL",
    kWp: 330,
    location: "Нидерландия",
    country: "Нидерландия",
    date: "2020-09",
    category: "commercial",
    image: "/real/installations/nl-ah-xl-ecorus.jpg",
    description:
      "825 соларни панела JA Solar 400Wp на покрива на Albert Heijn XL — голям търговски обект с висока дневна консумация.",
    technologies: {
      panels: "JA Solar 400Wp (825 бр.)",
    },
    benefits:
      "Значително покриване на дневната консумация на супермаркета с чиста енергия и намаляване на оперативните разходи.",
    client: "Ecorus",
  },
  {
    slug: "hardeman-pijnacker",
    title: "Hardeman Pijnacker",
    kWp: 770,
    location: "Pijnacker",
    country: "Нидерландия",
    date: "2020-08",
    category: "industrial",
    image: "/real/installations/nl-hardeman-pijnacker-1.jpg",
    gallery: [
      "/real/installations/nl-hardeman-pijnacker-2.jpg",
      "/real/installations/nl-hardeman-pijnacker-3.jpg",
    ],
    description:
      "2 332 панела JA Solar на индустриален обект в Pijnacker — един от най-мащабните проекти на екипа в Нидерландия.",
    technologies: {
      panels: "JA Solar (2 332 бр.)",
    },
    benefits:
      "Мащабно покритие на енергийните нужди на индустриална сграда с бърза възвръщаемост.",
    client: "Ecorus",
  },
  {
    slug: "volta-solar-voorhout",
    title: "Mare Group Voorhout",
    kWp: 381,
    location: "Voorhout",
    country: "Нидерландия",
    date: "2020-08",
    category: "industrial",
    image: "/real/installations/nl-volta-solar-voorhout.jpg",
    description:
      "965 панела в Изток-Запад ориентация с монтажна система Van der Valk на покрива на Mare Group.",
    technologies: {
      panels: "965 панела",
      mounting: "Van Der Valk",
    },
    benefits:
      "Оптимална Изток-Запад ориентация за равномерно производство през целия ден.",
    client: "Volta Solar",
  },
  {
    slug: "nen-delft",
    title: "NEN Делфт",
    kWp: 80,
    location: "Делфт",
    country: "Нидерландия",
    date: "2018-12",
    category: "commercial",
    image: "/real/installations/nl-nen-delft.jpg",
    description:
      "226 соларни панела на централата на NEN в Делфт — офис сграда с фокус върху устойчивост.",
    technologies: {
      panels: "226 панела",
    },
    benefits:
      "По-нисък въглероден отпечатък на централата и демонстрация на ангажимент към стандартите за устойчивост.",
    client: "Mijn Onderneming Duurzaam",
  },
  {
    slug: "hanover-solar-panningen",
    title: "Hanover Solar Panningen",
    kWp: 63,
    location: "Panningen",
    country: "Нидерландия",
    date: "2020-07",
    category: "commercial",
    image: "/real/installations/nl-hanover-panningen.jpg",
    description:
      "196 панела Hanover Solar 320Wp с два SolarEdge SE25k инвертора. Включва два соларни навеса за инверторите с конструкция Van der Valk.",
    technologies: {
      panels: "Hanover Solar 320Wp (196 бр.)",
      inverters: "SolarEdge SE25k (x2)",
      mounting: "Van Der Valk",
    },
    benefits:
      "Компактна търговска инсталация с оптимизатори за максимален добив и двоен навес от панели.",
  },
  {
    slug: "fantastico-elin-pelin",
    title: "Фантастико Елин Пелин",
    kWp: 0,
    location: "Елин Пелин",
    country: "България",
    category: "commercial",
    image: "/real/projects/msp-fantastico.png",
    description:
      "Покривна фотоволтаична инсталация на хипермаркет Фантастико в Елин Пелин — намаляване на енергийните разходи на голям търговски обект.",
    technologies: {},
    benefits:
      "По-ниски оперативни разходи за ток и устойчив търговски обект с чиста енергия.",
  },
  {
    slug: "grand-hotel-therme",
    title: "Grand Hotel Therme",
    kWp: 0,
    location: "България",
    country: "България",
    category: "commercial",
    image: "/real/projects/msp-grand-hotel-therme.jpg",
    description:
      "Покривна соларна система на хотелски обект Grand Hotel Therme — покриване на базовата консумация за СПА, осветление и климатизация.",
    technologies: {},
    benefits:
      "Намалени оперативни разходи за хотела и по-устойчив туристически бизнес.",
  },
  {
    slug: "metalsnab-ilienci",
    title: "Металснаб Илиенци",
    kWp: 0,
    location: "Илиенци",
    country: "България",
    category: "industrial",
    image: "/real/projects/msp-metalsnab.jpg",
    description:
      "Индустриална покривна инсталация на складово-производствен обект Металснаб в района на Илиенци.",
    technologies: {},
    benefits:
      "Значително намаляване на енергийните разходи за производство и складова дейност.",
  },
  {
    slug: "hus",
    title: "HUS",
    kWp: 0,
    location: "България",
    country: "България",
    category: "commercial",
    image: "/real/projects/msp-hus.png",
    description:
      "Покривна фотоволтаична система на комерсиален обект HUS — оптимизиране на енергийния профил на сградата.",
    technologies: {},
    benefits:
      "По-ниски месечни разходи за електроенергия и по-малък въглероден отпечатък.",
  },
  {
    slug: "lenox-stryama",
    title: "Lenox Стряма",
    kWp: 0,
    location: "Стряма",
    country: "България",
    category: "commercial",
    image: "/real/projects/msp-lenox.jpg",
    description:
      "Покривна соларна инсталация на обект Lenox в Стряма — покриване на консумацията на търговски обект.",
    technologies: {},
    benefits:
      "Стабилно производство на чиста енергия за собствени нужди на бизнеса.",
  },
  {
    slug: "flair-haskovo",
    title: "Flair Хасково",
    kWp: 0,
    location: "Хасково",
    country: "България",
    category: "commercial",
    image: "/real/projects/msp-flair.png",
    description:
      "Покривна фотоволтаична система на обект Flair в Хасково — намаляване на оперативните енергийни разходи.",
    technologies: {},
    benefits:
      "По-ниски сметки за ток и по-устойчив бизнес модел с чиста енергия.",
  },
  {
    slug: "citrus-building",
    title: "Citrus Building",
    kWp: 0,
    location: "Царево",
    country: "България",
    category: "commercial",
    image: "/real/projects/msp-citrus-building.jpg",
    description:
      "Покривна соларна система на жилищна сграда Citrus Building в Царево — споделено производство за общите части и апартаментите.",
    technologies: {},
    benefits:
      "По-ниски такси за общите части и достъп до чиста енергия за собствениците.",
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
