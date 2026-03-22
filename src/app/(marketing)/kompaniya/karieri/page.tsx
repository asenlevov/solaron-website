import type { Metadata } from "next";
import { Suspense } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { CareersApplicationForm } from "@/components/marketing/company-page-forms";

export const metadata: Metadata = {
  title: "Кариери | Solaron",
  description:
    "Отворени позиции в Solaron — присъедини се към екипа за чиста енергия.",
};

const POSITIONS = [
  {
    title: "Соларен Монтажник",
    type: "Пълен работен ден",
    location: "България",
    description:
      "Монтаж на фотоволтаични системи на покриви и терен. Работа с алуминиеви конструкции, кабелни трасета, инвертори и защитна апаратура.",
  },
  {
    title: "Търговски Консултант",
    type: "Пълен работен ден",
    location: "София / Дистанционно",
    description:
      "Консултиране на клиенти, подготовка на оферти, участие в огледи и представяне на техническите решения на Solaron.",
  },
  {
    title: "Проектант Инженер",
    type: "Пълен работен ден",
    location: "София",
    description:
      "Проектиране на PV системи, взаимодействие с ЕРП, подготовка на технически документи и оптимизация на системния дизайн.",
  },
];

const BENEFITS = [
  {
    title: "Конкурентно заплащане",
    description: "Атрактивно възнаграждение, съобразено с опита и резултатите.",
  },
  {
    title: "Обучение и развитие",
    description:
      "Достъп до обучения от Adore Energy, SolarEdge Academy и специализирани курсове.",
  },
  {
    title: "Растеж с компанията",
    description:
      "Бързо растяща организация с възможности за кариерно израстване и нови отговорности.",
  },
];

function FormFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 rounded-lg bg-foreground/10" />
      <div className="h-10 rounded-lg bg-foreground/10" />
      <div className="h-24 rounded-lg bg-foreground/10" />
    </div>
  );
}

export default function KarieriPage() {
  return (
    <main>
      {/* Hero */}
      <section className="grain overflow-hidden bg-foreground pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-white/60 mb-6">Кариери</p>
          <TextReveal
            as="h1"
            className="editorial-hero max-w-4xl text-white"
          >
            Стани част от бъдещето
          </TextReveal>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl">
            Търсим хора с ентусиазъм към чистата енергия, прецизност в работата и
            желание за учене.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">
            Отворени позиции
          </p>
          <h2 className="editorial-heading text-foreground mb-14 max-w-xl">
            Присъедини се
          </h2>
          <div className="space-y-6">
            {POSITIONS.map((pos) => (
              <div
                key={pos.title}
                className="rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="editorial-heading text-foreground text-xl md:text-2xl">
                      {pos.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary md:text-base">
                      {pos.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1 text-right">
                    <span className="font-body text-xs uppercase tracking-widest text-accent">
                      {pos.type}
                    </span>
                    <span className="font-body text-xs text-foreground-secondary">
                      {pos.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits — dark section */}
      <section className="bg-foreground py-20 md:py-28 grain">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="editorial-overline text-accent mb-4">
            Защо Solaron
          </p>
          <h2 className="editorial-heading text-white mb-14 max-w-xl">
            Какво предлагаме
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title}>
                <div className="mb-4 h-1 w-10 rounded-full bg-accent" />
                <h3 className="editorial-heading text-white text-lg mb-2">
                  {b.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/60">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="editorial-overline text-accent mb-4">
              Кандидатствай
            </p>
            <h2 className="editorial-heading text-foreground mb-8">
              Изпрати своята кандидатура
            </h2>
            <Suspense fallback={<FormFallback />}>
              <CareersApplicationForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
