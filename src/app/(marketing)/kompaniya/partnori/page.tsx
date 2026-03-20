import type { Metadata } from "next";
import Image from "next/image";
import { REAL_IMAGES } from "@/data/images";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Партньори | Solaron",
  description:
    "Технологичните партньори на Solaron — SolarEdge, Van Der Valk, Sunport Power и Pylontech.",
};

const PARTNERS = [
  {
    name: "SolarEdge",
    category: "Инвертори и оптимизатори",
    experience: "25+ години",
    description:
      "Глобален лидер в интелигентните енергийни решения. Инверторите на SolarEdge с вграден мониторинг на ниво модул осигуряват максимален добив и пълна видимост на системата.",
    highlight:
      "Използваме SolarEdge в 90% от нашите проекти за домове и бизнеси.",
    logo: REAL_IMAGES.partners.solaredge,
  },
  {
    name: "Van Der Valk Solar Systems",
    category: "Монтажни конструкции",
    experience: "15 години гаранция",
    description:
      "Холандски производител на алуминиеви монтажни системи за всякакъв тип покриви — скатни, плоски и фасадни. Конструкциите издържат на натоварвания от вятър и сняг по европейските норми.",
    highlight:
      "15-годишна гаранция за конструкцията — повече от повечето конкуренти.",
    logo: null,
  },
  {
    name: "Sunport Power",
    category: "Соларни панели (MWT)",
    experience: "30 години гаранция на продукта",
    description:
      "Производител на иновативни MWT (Metal Wrap Through) панели с по-висока ефективност и по-добра устойчивост на горещи точки. Безрамкова технология намалява натрупването на мръсотия.",
    highlight:
      "30-годишна линейна гаранция на мощността — доверие в дългосрочното представяне.",
    logo: null,
  },
  {
    name: "Pylontech",
    category: "Батерии (LFP)",
    experience: "10+ години на пазара",
    description:
      "Водещ производител на литиево-железо-фосфатни (LFP) акумулаторни системи за съхранение на енергия. LFP технологията е по-безопасна и с по-дълъг живот от конвенционалните литиево-йонни решения.",
    highlight:
      "Над 6000 цикъла при 95% дълбочина на разряд — надеждност за десетилетия.",
    logo: null,
  },
];

export default function PartnoriPage() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-6">
            Партньори
          </p>
          <TextReveal
            as="h1"
            className="text-editorial-hero max-w-4xl text-foreground"
          >
            Технологии, на които разчитаме
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Работим с водещи производители, които споделят нашия ангажимент към
            качество и дълготрайност.
          </p>
        </div>
      </section>

      {/* Partner sections */}
      {PARTNERS.map((partner, i) => (
        <section
          key={partner.name}
          className={i % 2 === 0 ? "bg-[#f7f7f5] py-20 md:py-24" : "bg-white py-20 md:py-24"}
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
              <div>
                <p className="text-editorial-overline text-accent mb-3">
                  {partner.category}
                </p>
                <h2 className="text-editorial-display text-foreground mb-2">
                  {partner.name}
                </h2>
                <p className="font-body text-sm uppercase tracking-widest text-foreground-secondary mb-6">
                  {partner.experience}
                </p>
                <p className="font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
                  {partner.description}
                </p>
              </div>
              <div className="flex flex-col gap-6">
                {partner.logo && (
                  <div className="relative h-16 w-48">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} лого`}
                      fill
                      className="object-contain object-left"
                      sizes="192px"
                    />
                  </div>
                )}
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <p className="text-editorial-overline text-accent mb-2">
                    Акцент
                  </p>
                  <p className="font-body text-base leading-relaxed text-foreground">
                    {partner.highlight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Dark joint projects section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-4">
            Съвместни проекти
          </p>
          <h2 className="text-editorial-heading text-white mb-10 max-w-2xl">
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
          <h2 className="text-editorial-display text-foreground mx-auto max-w-2xl">
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
