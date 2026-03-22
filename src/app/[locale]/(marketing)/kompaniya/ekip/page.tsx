import { setRequestLocale, getTranslations } from "next-intl/server";
import { StatNumber } from "@/components/ui/stat-number";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { REAL_IMAGES } from "@/data/images";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Company.ekip" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const TEAM = [
  {
    name: "Емил Солаков",
    role: "Съосновател, Инженеринг",
    bio: "Основател на Adore Montage — един от най-големите соларни монтажни оператори в Нидерландия с капацитет от 15 000 панела месечно. 18+ години опит в проектиране и изграждане на фотоволтаични системи в Нидерландия, Белгия и Германия.",
    gradient: "from-accent/60 to-accent/20",
    initials: "ЕС",
  },
  {
    name: "Ерай Солаков",
    role: "Съосновател, Операции",
    bio: "Отговаря за оперативното управление и развитието на Solaron на българския пазар. Осигурява безпроблемна координация между европейската експертиза на Adore Energy Systems и локалните проекти.",
    gradient: "from-secondary/60 to-secondary/20",
    initials: "ЕС",
  },
];

const CULTURE_QUOTES = [
  "Безопасността на обекта не е опция — тя е стандарт.",
  "Всеки кабел, всяка връзка има значение за крайния резултат.",
  "Учим се от всеки проект, за да бъдем по-добри в следващия.",
];

export default async function EkipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <ImageEditorial
          src={REAL_IMAGES.team.teamFounders}
          alt="Екипът на Solaron"
          fill
          priority
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-10 md:pb-20">
          <p className="editorial-overline text-white/60 mb-6">Хора</p>
          <TextReveal
            as="h1"
            className="editorial-hero max-w-3xl text-white"
          >
            Нашият Екип
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/80 md:text-xl">
            Експерти по проектиране, доставка и монтаж — подкрепени от
            европейската експертиза на Adore Energy Systems.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">Лидерство</p>
          <h2 className="editorial-heading text-foreground mb-14 max-w-xl">
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
                  <p className="editorial-overline text-accent mb-2">
                    {member.role}
                  </p>
                  <h3 className="editorial-heading text-foreground text-2xl">
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
              <h2 className="editorial-heading text-white text-3xl md:text-4xl">
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
          <p className="editorial-overline text-accent mb-4">Култура</p>
          <h2 className="editorial-heading text-foreground mb-14 max-w-xl">
            Нашите принципи
          </h2>
          <div className="space-y-10">
            {CULTURE_QUOTES.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-4 border-accent/30 pl-8"
              >
                <p className="editorial-pull-quote text-foreground text-xl md:text-2xl">
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
          <h2 className="editorial-display text-foreground mx-auto max-w-2xl">
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
