import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { REAL_IMAGES } from "@/data/images";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Company.partnori" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const PARTNER_CATEGORIES = [
  {
    title: "Инвертори",
    partners: [
      {
        name: "SolarEdge",
        badge: "Най-високо качество",
        description: "Глобален лидер в интелигентните енергийни решения. HD-Wave инвертори с 99.2% ефективност, SafeDC™ безопасност и панелно ниво мониторинг чрез оптимизатори P950.",
        highlight: "99.2% ефективност. 25+ години на пазара.",
        logo: REAL_IMAGES.partners.solaredge,
      },
      {
        name: "Kstar",
        badge: "All-in-one системи",
        description: "All-in-one хибридни системи с CATL LFP клетки и елегантен дизайн. Над средното ниво качество с модулен дизайн, IP65 защита и монтаж за 30 минути.",
        highlight: "CATL клетки. 10 000+ цикъла. 32 години история.",
        logo: REAL_IMAGES.partners.kstar,
      },
      {
        name: "Deye",
        badge: "Най-добро съотношение цена/качество",
        description: "Бюджетен бранд с множество решения — може би най-доброто решение за източноевропейския пазар. До 16 паралелни инвертора за мащабируемост до 800 kW.",
        highlight: "Гъвкавост и достъпност за всеки бюджет.",
        logo: REAL_IMAGES.partners.deye,
      },
      {
        name: "Huawei",
        badge: "Комерсиални системи",
        description: "Стрингови и централни инвертори за средни и големи комерсиални проекти. FusionSolar платформа за интелигентно управление на енергията.",
        highlight: "Водещ в комерсиални on-grid и хибридни системи.",
        logo: REAL_IMAGES.partners.huawei,
      },
    ],
  },
  {
    title: "Соларни панели",
    partners: [
      {
        name: "Sunport Power",
        badge: "MWT технология",
        description: "Производител на иновативни MWT (Metal Wrap Through) панели с по-висока ефективност и по-добра устойчивост на горещи точки. Безрамкова технология.",
        highlight: "30-годишна гаранция. Без микропукнатини.",
        logo: null,
      },
      {
        name: "DMEGC",
        badge: "Tier-1 бранд",
        description: "Tier-1 производител по BNEF — среден клас панел с много добри резултати и доказана надеждност на глобалния пазар. Отлично съотношение цена/качество.",
        highlight: "Tier-1 по Bloomberg NEF. Глобална гаранция.",
        logo: REAL_IMAGES.partners.dmegc,
      },
      {
        name: "AIKO",
        badge: "ABC технология",
        description: "ABC (All Back Contact) технология — всички метални контакти на гърба на клетката. Без метализация на лицето, рекордна ефективност от 23.6%.",
        highlight: "Много високо качество. 170 GW+ доставени.",
        logo: REAL_IMAGES.partners.aiko,
      },
      {
        name: "TENKA SOLAR",
        badge: "24% КПД — рекорд",
        description: "Също ABC технология, стъкло-стъкло конструкция. Първият панел, достигнал 24% КПД — максимална ефективност и дълготрайност.",
        highlight: "Първият панел с 24% ефективност.",
        logo: REAL_IMAGES.partners.tenkaSolar,
      },
    ],
  },
  {
    title: "Батерии и съхранение",
    partners: [
      {
        name: "Pylontech",
        badge: "Доказано качество",
        description: "Водещ производител на LFP акумулаторни системи. 6 000+ цикъла при 95% дълбочина на разряд — надеждност за десетилетия. Модулно мащабиране.",
        highlight: "10+ години на пазара. Широка съвместимост.",
        logo: null,
      },
      {
        name: "Kstar (ESS)",
        badge: "All-in-one съхранение",
        description: "BluE-S серия — all-in-one кабинети с интегрирани CATL LFP батерии. До 20.4 kWh капацитет с тройна защита на модулно, пакетно и системно ниво.",
        highlight: "CATL LFP клетки. IP65 защита.",
        logo: REAL_IMAGES.partners.kstar,
      },
      {
        name: "CNTE",
        badge: "Комерсиално съхранение",
        description: "STAR-H серия all-in-one ESS кабинети с течно охлаждане за комерсиални и индустриални приложения. 100–372 kWh капацитет.",
        highlight: "Течно охлаждане. 8 000+ цикъла.",
        logo: REAL_IMAGES.partners.cnte,
      },
    ],
  },
  {
    title: "Конструкции",
    partners: [
      {
        name: "Van Der Valk Solar Systems",
        badge: "Европейско качество",
        description: "Холандски производител с пълна европейска сертификация. Покрива всички изисквания на европейския пазар с реални гаранции, подкрепени от тестове за издръжливост във вятърен тунел.",
        highlight: "15-годишна гаранция. Вятърен тунел тестове.",
        logo: null,
      },
      {
        name: "Sunbeam",
        badge: "Европейска марка",
        description: "Също европейска марка конструкция с гаранции и качество като при Van der Valk. Системи Supra (плоски покриви), Nova и Luna (скатни покриви). Климатично неутрален сертификат.",
        highlight: "CO₂ неутрален. Инсталации из цяла Европа.",
        logo: REAL_IMAGES.partners.sunbeam,
      },
    ],
  },
  {
    title: "Кабели и конектори",
    partners: [
      {
        name: "Athilex",
        badge: "DC кабели",
        description: "Специализиран производител на високо качествени соларни кабели от 2010 г. H1Z2Z2-K кабели с DCA сертификация за максимална безопасност.",
        highlight: "Много високо качество DC кабели.",
        logo: REAL_IMAGES.partners.athilex,
      },
      {
        name: "KBE Elektrotechnik",
        badge: "DC кабели",
        description: "Берлински производител с тройна сертификация (EN 50618, IEC 62930, TÜV). 25+ години гарантиран живот, 2 млн. км продукция годишно.",
        highlight: "Тройна сертификация. 350+ служители.",
        logo: REAL_IMAGES.partners.kbe,
      },
      {
        name: "Stäubli",
        badge: "DC конектори",
        description: "Използваме само и единствено Stäubli MC4 конектори — най-високото качество. Постоянни изследвания и подобрения, осигуряват правилните инструменти за кримпване и затягане.",
        highlight: "Единствените конектори, които използваме.",
        logo: REAL_IMAGES.partners.staubli,
      },
    ],
  },
];

export default async function PartnoriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      {/* Hero */}
      <section className="grain overflow-hidden bg-foreground pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-white/60 mb-6">
            Партньори
          </p>
          <TextReveal
            as="h1"
            className="editorial-hero max-w-4xl text-white"
          >
            Технологии, на които разчитаме
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl">
            Работим с водещи производители, които споделят нашия ангажимент към
            качество и дълготрайност.
          </p>
        </div>
      </section>

      {/* Partner categories */}
      {PARTNER_CATEGORIES.map((category, catIdx) => (
        <section
          key={category.title}
          className={catIdx % 2 === 0 ? "bg-[#f7f7f5] py-20 md:py-24" : "bg-white py-20 md:py-24"}
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="editorial-overline text-accent mb-3">
              {category.title}
            </p>
            <h2 className="editorial-heading text-foreground mb-12">
              {category.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.partners.map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-2xl border border-border bg-white p-8 flex flex-col"
                >
                  <span className="inline-block self-start text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-accent/10 text-accent mb-4">
                    {partner.badge}
                  </span>
                  {partner.logo && (
                    <div className="relative h-10 w-36 mb-4">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} лого`}
                        fill
                        className="object-contain object-left"
                        sizes="144px"
                      />
                    </div>
                  )}
                  <h3 className="font-display font-bold text-xl mb-3">
                    {partner.name}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground-secondary mb-6 flex-1">
                    {partner.description}
                  </p>
                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                    <p className="font-body text-xs leading-relaxed text-foreground">
                      {partner.highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Dark joint projects section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">
            Съвместни проекти
          </p>
          <h2 className="editorial-heading text-white mb-10 max-w-2xl">
            Партньорства, доказани на терен
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: REAL_IMAGES.projects.carport270_hero, alt: "Соларен карпорт 270 kWp — индустриален проект" },
              { src: REAL_IMAGES.projects.saedinenie651_hero, alt: "Фотоволтаична централа 651 kWp — Съединение" },
              { src: REAL_IMAGES.projects.varna39_hero, alt: "Покривна соларна инсталация 39 kWp — Варна" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="grain absolute inset-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <h2 className="editorial-display text-foreground mx-auto max-w-2xl">
            Заедно изграждаме по-чисто бъдеще
          </h2>
          <div className="mt-10">
            <MagneticButton href="/kontakti" variant="primary" size="xl">
              Свържете се с нас
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
