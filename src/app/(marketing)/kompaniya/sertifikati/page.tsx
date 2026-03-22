import type { Metadata } from "next";
import Image from "next/image";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "Сертификати | Solaron",
  description:
    "Сертификати и награди на Solaron и Adore Energy — EUPD, VCA*, ISO 9001 и Scope 12.",
};

const CERTIFICATES = [
  {
    name: "VCA*",
    issuer: "VCA Infra",
    description:
      "Международен стандарт за безопасност, здраве и околна среда на строителни обекти. Гарантира организирани площадки и отговорност към екипа.",
    year: "2018",
    accent: "border-secondary",
  },
  {
    name: "ISO 9001",
    issuer: "Bureau Veritas",
    description:
      "Система за управление на качеството, осигуряваща последователен и контролиран процес от проектиране до пускане в експлоатация.",
    year: "2019",
    accent: "border-foreground",
  },
  {
    name: "Scope 12 — Соларни системи",
    issuer: "InstallQ",
    description:
      "Специализирана акредитация за проектиране и монтаж на фотоволтаични инсталации по холандските стандарти за качество.",
    year: "2017",
    accent: "border-accent",
  },
];

const TIMELINE_ITEMS = [
  { year: "2017", label: "Получаване на Scope 12 акредитация" },
  { year: "2018", label: "VCA* сертификация за безопасност" },
  { year: "2019", label: "ISO 9001 за управление на качеството" },
  { year: "2024", label: "EUPD Research Top Brand PV Installer" },
];

export default function SertifikatiPage() {
  return (
    <main>
      {/* Hero */}
      <section className="grain overflow-hidden bg-foreground pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-white/60 mb-6">
            Стандарти
          </p>
          <TextReveal
            as="h1"
            className="editorial-hero max-w-4xl text-white"
          >
            Сертификати и Награди
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl">
            Независими отличия, които потвърждават качеството на изпълнение и
            ангажимента ни към клиентите.
          </p>
        </div>
      </section>

      {/* EUPD Hero Feature — dark section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
            <div className="shrink-0">
              <div className="flex h-40 w-40 items-center justify-center rounded-3xl border-4 border-accent bg-accent/10">
                <div className="text-center">
                  <p className="editorial-stat text-accent text-5xl">
                    2024
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-accent">
                    Award
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-2xl">
              <p className="editorial-overline text-accent mb-3">
                Отличие
              </p>
              <h2 className="editorial-display text-white">
                EUPD Research — Top Brand PV Installer
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-white/60 md:text-lg">
                EUPD Research е независима аналитична институция с фокус върху
                пазарите на устойчива енергетика. Наградата подчертава
                организации, които съчетават техническа компетентност, прозрачна
                комуникация и стабилно следпродажбено обслужване.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Cards */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">
            Сертификати
          </p>
          <h2 className="editorial-heading text-foreground mb-14 max-w-xl">
            Гаранция за качество
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {CERTIFICATES.map((cert) => (
              <TiltCard key={cert.name}>
                <div
                  className={`rounded-2xl border border-border border-t-4 ${cert.accent} bg-white p-8 h-full`}
                >
                  <p className="editorial-stat text-foreground/40 text-3xl mb-4">
                    {cert.year}
                  </p>
                  <h3 className="editorial-heading text-foreground text-xl mb-2">
                    {cert.name}
                  </h3>
                  <p className="font-body text-xs uppercase tracking-widest text-foreground-secondary mb-4">
                    {cert.issuer}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-foreground-secondary">
                    {cert.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* VCA Certificate Visual */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="editorial-overline text-accent mb-3">
                VCA* Сертификат
              </p>
              <h2 className="editorial-heading text-foreground mb-6">
                Безопасност на всеки обект
              </h2>
              <p className="font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
                VCA* (Veiligheid, Gezondheid en Milieu Checklist Aannemers) е
                международен стандарт за безопасност на строителни обекти,
                широко признат в Нидерландия и Белгия. Сертификатът гарантира,
                че всеки монтаж се изпълнява с организирана площадка, обучен
                персонал и стриктни мерки за здраве и околна среда.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-56 md:w-80 md:h-72">
                <Image
                  src="/real/certifications/vca-certificate.png"
                  alt="VCA* Сертификат"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">
            Хронология
          </p>
          <h2 className="editorial-heading text-foreground mb-14 max-w-xl">
            Път към стандарти
          </h2>
          <div className="relative border-l-2 border-accent/20 pl-8 md:pl-12">
            {TIMELINE_ITEMS.map((t) => (
              <div key={t.year} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full bg-accent md:-left-[calc(3rem+5px)]" />
                <p className="editorial-stat text-accent text-2xl">
                  {t.year}
                </p>
                <p className="mt-1 font-body text-base text-foreground-secondary">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="editorial-pull-quote text-foreground">
              &ldquo;Сертификатите не са цел — те са следствие от последователен
              ангажимент към качеството.&rdquo;
            </blockquote>
            <div className="mt-10">
              <MagneticButton href="/kontakti" variant="primary" size="lg">
                Поискайте оферта
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
