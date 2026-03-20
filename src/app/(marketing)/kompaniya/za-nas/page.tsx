import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { REAL_IMAGES } from "@/data/images";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "За Нас | Solaron",
  description:
    "Solaron — българска компания за фотоволтаични системи с европейско качество и партньорство с Adore Energy Systems.",
};

const VALUES = [
  {
    title: "Качество",
    description:
      "Доказани компоненти, строг контрол на всеки етап — от проектиране до пускане в експлоатация.",
    accent: "bg-accent",
  },
  {
    title: "Иновации",
    description:
      "Следваме най-добрите практики от Европа и внедряваме съвременни решения за максимална ефективност.",
    accent: "bg-secondary",
  },
  {
    title: "Доверие",
    description:
      "Дългосрочни гаранции, прозрачни процеси и екип, на когото клиентите разчитат години наред.",
    accent: "bg-foreground",
  },
  {
    title: "Устойчивост",
    description:
      "Реален принос към по-чиста енергия и по-малък въглероден отпечатък с всеки изграден проект.",
    accent: "bg-success",
  },
];

const TIMELINE = [
  { year: "2004", label: "Основаване на Adore Energy Systems в Нидерландия" },
  { year: "2022", label: "Разширяване на дейността в България" },
  { year: "2023", label: "Стартиране на бранда Solaron" },
];

export default function ZaNasPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-6">Компания</p>
          <TextReveal
            as="h1"
            className="text-editorial-hero max-w-4xl text-foreground"
          >
            Европейско качество. Българска надеждност.
          </TextReveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <p className="font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
              Solaron е българска компания, специализирана в проектиране и монтаж
              на фотоволтаични системи. Основана с партньорството на{" "}
              <strong className="text-foreground">Adore Energy Systems</strong> —
              водеща холандска компания с над 20 години опит и стотици успешни
              проекта в Нидерландия, Белгия, Германия и България.
            </p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={REAL_IMAGES.installations.nlProjectOverview1}
                alt="Adore Energy — професионален проект"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="grain absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="text-editorial-pull-quote text-foreground">
              &ldquo;Мисията ни е да направим слънчевата енергия достъпна и
              надеждна за всеки дом и бизнес в България.&rdquo;
            </blockquote>
            <p className="mt-6 font-body text-sm uppercase tracking-widest text-foreground-secondary">
              Екип Solaron
            </p>
          </div>
        </div>
      </section>

      {/* Stats — dark section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-10">
            В числа
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatNumber
              value={20}
              suffix="+"
              context="години европейски опит"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={384}
              suffix="+"
              context="доволни клиенти"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={1500}
              suffix="+ kWp"
              context="инсталирана мощност"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={4}
              context="държави с проекти"
              className="text-white"
              contextClassName="text-white/60"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-4">Ценности</p>
          <h2 className="text-editorial-heading text-foreground mb-14 max-w-xl">
            Принципите, които ръководят екипа ни
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <TiltCard key={v.title}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-lg">
                  <div
                    className={`mb-6 h-1 w-12 rounded-full ${v.accent}`}
                  />
                  <h3 className="text-editorial-heading text-foreground mb-3 text-xl">
                    {v.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-foreground-secondary">
                    {v.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-4">
            Хронология
          </p>
          <h2 className="text-editorial-heading text-foreground mb-14 max-w-xl">
            Ключови моменти
          </h2>
          <div className="relative border-l-2 border-accent/20 pl-8 md:pl-12">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative mb-12 last:mb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full bg-accent md:-left-[calc(3rem+5px)]" />
                <p className="text-editorial-stat text-accent text-3xl">
                  {t.year}
                </p>
                <p className="mt-2 font-body text-base text-foreground-secondary md:text-lg">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <h2 className="text-editorial-display text-foreground mx-auto max-w-2xl">
            Готови да стартирате вашия соларен проект?
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg text-foreground-secondary">
            Свържете се с нас за безплатна консултация и индивидуална оферта.
          </p>
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
