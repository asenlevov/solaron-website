import type { Metadata } from "next";
import Link from "next/link";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Екип | Solaron",
  description:
    "Запознайте се с екипа на Solaron — лидерство, квалифицирани монтажници и култура на качеството.",
};

const TEAM = [
  {
    name: "Петър Делев",
    role: "Съосновател, Операции",
    bio: "Визията за Solaron е изградена върху дългогодишен опит в енергийния сектор и ангажимент към клиентите в България — прозрачност, качество и устойчиви решения.",
    gradient: "from-accent/60 to-accent/20",
    initials: "ПД",
  },
  {
    name: "Adore Energy Partner",
    role: "Съосновател, Инженеринг",
    bio: "20+ години в проектиране и изграждане на фотоволтаични системи. Стотици обекти в Нидерландия, Белгия и Германия — от жилищни покриви до мащабни индустриални инсталации.",
    gradient: "from-secondary/60 to-secondary/20",
    initials: "AE",
  },
];

const CULTURE_QUOTES = [
  "Безопасността на обекта не е опция — тя е стандарт.",
  "Всеки кабел, всяка връзка има значение за крайния резултат.",
  "Учим се от всеки проект, за да бъдем по-добри в следващия.",
];

export default function EkipPage() {
  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-6">Хора</p>
          <TextReveal
            as="h1"
            className="text-editorial-hero max-w-3xl text-foreground"
          >
            Нашият Екип
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Експерти по проектиране, доставка и монтаж — подкрепени от
            европейската експертиза на Adore Energy Systems.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-4">Лидерство</p>
          <h2 className="text-editorial-heading text-foreground mb-14 max-w-xl">
            Основатели
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-6 rounded-2xl border border-border bg-white p-8 md:flex-row md:items-start"
              >
                <div
                  className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient}`}
                  aria-hidden
                >
                  <span className="text-2xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-editorial-overline text-accent mb-2">
                    {member.role}
                  </p>
                  <h3 className="text-editorial-heading text-foreground text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary md:text-base">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Montazhnici — dark section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
            <div className="shrink-0">
              <StatNumber
                value={100}
                suffix="+"
                className="text-white"
              />
            </div>
            <div>
              <h2 className="text-editorial-heading text-white text-3xl md:text-4xl">
                Квалифицирани монтажници
              </h2>
              <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-white/60 md:text-lg">
                Чрез партньорската мрежа на Adore Energy работим с екипи,
                преминали обучение и сертификация по VCA — международно признат
                стандарт за безопасност на обект.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-editorial-overline text-accent mb-4">Култура</p>
          <h2 className="text-editorial-heading text-foreground mb-14 max-w-xl">
            Нашите принципи
          </h2>
          <div className="space-y-10">
            {CULTURE_QUOTES.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-4 border-accent/30 pl-8"
              >
                <p className="text-editorial-pull-quote text-foreground text-xl md:text-2xl">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <h2 className="text-editorial-display text-foreground mx-auto max-w-2xl">
            Искаш да се присъединиш?
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg text-foreground-secondary">
            Разгледай отворените позиции и стани част от екипа на Solaron.
          </p>
          <div className="mt-10">
            <MagneticButton
              href="/kompaniya/karieri"
              variant="primary"
              size="xl"
            >
              Виж позиции
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
