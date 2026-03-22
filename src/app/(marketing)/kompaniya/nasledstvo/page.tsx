import type { Metadata } from "next";
import Image from "next/image";
import { REAL_IMAGES } from "@/data/images";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Наследство | Solaron",
  description:
    "20 години история на Adore Energy Systems — от Нидерландия до България, и раждането на Solaron.",
};

const MILESTONES = [
  {
    year: "2004",
    title: "Основаване на Adore Energy Systems",
    description:
      "Adore стартира като инсталационна компания за фотоволтаични системи в Нидерландия с фокус върху качество и безопасност.",
  },
  {
    year: "2010",
    title: "Партньорство с PostNL",
    description:
      "Adore получава мащабен договор за инсталация на соларни панели върху разпределителните центрове на PostNL — един от най-големите проекти в страната.",
  },
  {
    year: "2015",
    title: "1000-ият проект",
    description:
      "Преминаваме границата от 1000 завършени проекта в Нидерландия, Белгия и Германия с нулев инцидент на обект.",
  },
  {
    year: "2021",
    title: "Ahoy Rotterdam",
    description:
      "Инсталация на една от най-големите покривни PV системи в Ротердам — залата Ahoy, символ на мащабните ни възможности.",
  },
  {
    year: "2022",
    title: "Разширяване в България",
    description:
      "Adore навлиза на българския пазар, като пренася европейските стандарти за проектиране, монтаж и следпродажбено обслужване.",
  },
  {
    year: "2023",
    title: "Стартиране на Solaron",
    description:
      "Бранд Solaron се ражда с мисия да направи слънчевата енергия достъпна и надеждна за всеки дом и бизнес в България.",
  },
];

export default function NasledstvoPage() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-6">
            Наследство
          </p>
          <TextReveal
            as="h1"
            className="editorial-hero max-w-4xl text-foreground"
          >
            20 години опит. Един стандарт.
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Историята на Solaron започва преди две десетилетия в Нидерландия.
            Днес пренасяме този опит в България — със същия ангажимент към
            качеството.
          </p>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bg-[#f7f7f5] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="editorial-pull-quote text-foreground">
              &ldquo;Качеството не е случайност — то е резултат от хиляди правилно
              взети решения на обекта.&rdquo;
            </p>
            <footer className="mt-6 font-body text-sm uppercase tracking-widest text-foreground-secondary">
              Adore Energy Systems
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">
            Хронология
          </p>
          <h2 className="editorial-heading text-foreground mb-16 max-w-xl">
            Ключови моменти
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/20 md:left-1/2" />
            <div className="space-y-16">
              {MILESTONES.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={m.year}
                    className="relative grid grid-cols-1 gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0"
                  >
                    <div className="absolute left-2.5 top-2 h-3 w-3 rounded-full bg-accent md:left-1/2 md:-translate-x-1/2" />
                    <div
                      className={
                        isLeft
                          ? "md:text-right md:pr-12"
                          : "md:col-start-2 md:pl-12"
                      }
                    >
                      <p className="editorial-stat text-accent text-3xl md:text-4xl">
                        {m.year}
                      </p>
                      <h3 className="editorial-heading text-foreground text-xl mt-2">
                        {m.title}
                      </h3>
                      <p className="mt-2 font-body text-base leading-relaxed text-foreground-secondary">
                        {m.description}
                      </p>
                    </div>
                    {isLeft && <div className="hidden md:block" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats — dark section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-10">
            В числа
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatNumber
              value={20}
              suffix="+"
              context="години опит"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={384}
              suffix="+"
              context="завършени проекта"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={4}
              context="държави"
              className="text-white"
              contextClassName="text-white/60"
            />
            <StatNumber
              value={100}
              suffix="+"
              context="монтажници"
              className="text-white"
              contextClassName="text-white/60"
            />
          </div>
        </div>
      </section>

      {/* Heritage Images */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              REAL_IMAGES.installations.nlAhoySolar1,
              REAL_IMAGES.installations.nlPostNL,
              REAL_IMAGES.installations.nlProjectOverview1,
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img}
                  alt={`Исторически проект ${i + 1}`}
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

      {/* Pull Quote 2 */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="editorial-pull-quote text-foreground">
              &ldquo;Опитът от хиляди покриви в Европа ни дава увереността да
              предложим същото качество и в България.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <h2 className="editorial-display text-foreground mx-auto max-w-2xl">
            Бъдете част от следващата глава
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg text-foreground-secondary">
            Нашата история продължава с всеки нов проект. Нека вашият бъде
            следващият.
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
