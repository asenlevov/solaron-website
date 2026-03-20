import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, Building2, Landmark, PiggyBank } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Финансиране и Субсидии | Solaron",
  description:
    "Програми за подкрепа на фотоволтаици, банкови кредити, лизинг и данъчни облекчения — плюс сравнителна таблица за възвръщаемост на различните схеми.",
};

const roiRows = [
  {
    method: "Собствено финансиране",
    upfront: "100%",
    rate: "—",
    payback: "Най-кратък",
    notes: "Пълна спестявания от ден 1, без лихва.",
  },
  {
    method: "Банков кредит",
    upfront: "0–20%",
    rate: "Пазарна",
    payback: "Среден",
    notes: "Лихвата удължава периода спрямо чиста инвестиция.",
  },
  {
    method: "Лизинг",
    upfront: "1–3 вноски",
    rate: "Фиксирана в договора",
    payback: "Среден до дълъг",
    notes: "ОФД разходи за фирми; удобство за управление на паричния поток.",
  },
  {
    method: "Субсидирана програма (ако е приложима)",
    upfront: "Зависи от мярката",
    rate: "Намалена или нулева",
    payback: "Най-кратък (нетно)",
    notes: "Изисква административна допустимост и спазване на срокове за подаване.",
  },
] as const;

export default function FinansiranePage() {
  return (
    <>
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6">
            Финансиране
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Финансиране на Соларна Система
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Разходът за фотоволтаична инсталация е инвестиция с предвидим хоризонт на възвръщаемост.
            По-долу обобщаваме основните публични механизми, банкови продукти и лизингови модели,
            които клиентите на Solaron най-често комбинират със собствено участие.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="ДЪРЖАВА"
          title="Програми за подкрепа и субсидии"
          subtitle="България периодично отваря мерки за енергийна ефективност и възобновяеми източници — чрез оперативни програми, национални схеми или финансови инструменти с гаранции. Наличността и условията се променят по поколения програми; затова винаги проверяваме актуалните указания на управляващия орган и съвместимостта на проекта с технически минимуми (клас на ефективност, мощност, вид потребител)."
          className="mb-10"
        />
        <div className="space-y-5 font-body text-base leading-relaxed text-foreground-secondary">
          <p>
            Типични критерии включват енергийна оценка на сградата, одобрен проект и изпълнение от
            лицензирани изпълнители. Субсидите намаляват непосредствено необходимия собствен ресурс
            или подобряват лихвения профил чрез гаранционни схеми. Важно е да планирате подаване
            навреме — прозорците за кандидатстване се затварят при изчерпване на бюджета.
          </p>
          <p>
            Solaron подпомага подготовката на техническата документация и съответствие с изискванията
            на програмата, за да няма откази от формални грешки. Това не замества юридически съвет
            относно конкретната мярка, но инженерният ни екип е в тон с типовите изисквания за PV
            инсталации.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          align="left"
          label="БАНКИ"
          title="Банкови кредити за фотоволтаици"
          subtitle="Много търговски банки предлагат потребителски или бизнес кредити за енергийни подобрения, включително соларни инсталации. Лихвеният процент е плаващ или фиксиран спрямо пазарните индекси; амортизационният план се подравнява с очакваните спестявания от сметката за ток."
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Landmark className="size-8 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Какво търсят банките
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
              Доказателство за доход, добра кредитна история и при бизнеси — стабилни отчети
              и обект с ясна собственост. Кредитът разсрочва първоначалната инвестиция, но
              лихвата е част от общия разход — тя трябва да влезе в сравнение със спестяванията от
              производство на енергия.
            </p>
          </Card>
          <Card>
            <Banknote className="size-8 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Съпоставка със спестяванията
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
              Добра практика е месечната вноска да не надхвърля значително средните месечни
              спестявания от сметката за ток след пускане на системата — така паричният поток остава
              нейтрален или положителен. Точните числа зависят от размера на инсталацията и тарифата.
            </p>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="ЛИЗИНГ"
          title="Лизингови модели"
          subtitle="Операционен и финансов лизинг са разпространени при фирмени инсталации. Лизингът прехвърля част от административната тежест към лизингодателя и позволява фиксирани месечни плащания с прозрачен краен срок."
          className="mb-10"
        />
        <div className="space-y-5 font-body text-base leading-relaxed text-foreground-secondary">
          <p>
            При операционен лизинг активът може да остане извън баланса на ползвателя до изкупуване или
            подновяване договора — счетоводното третиране зависи от стандарта и договорените клаузи.
            При финансов лизинг често се планира придобиване на края на периода. И двата варианта
            са подходящи за бизнеси със стабилен паричен поток и нужда от предвидими разходи.
          </p>
          <p>
            За домакинства лизингът е по-рядък, но някои доставчици предлагат „наем на система“,
            където плащате месечен абонамент, а оборудването се обслужва от доставчика — това
            променя собствеността и дългосрочните задължения спрямо класическата покупка.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          align="left"
          label="ДАНЪЦИ"
          title="Данъчни облекчения — ориентири"
          subtitle="За фирми фотоволтаичната инсталация обикновено се третира като дълготраен актив с амортизация и влияние върху данъчната печалба. Домакинствата в България рядко ползват отделни данъчни кредити за битов PV, но енергийните подобрения на сгради могат да участват в различни схеми със специфични условия."
          className="mb-10"
        />
        <Card>
          <div className="flex items-start gap-4">
            <Building2 className="size-5 shrink-0 text-accent" aria-hidden />
            <p className="font-body text-sm leading-relaxed text-foreground-secondary">
              Препоръчваме консултация с одитор или счетоводител за конкретния случай — данъчният
              ефект зависи от правната форма, размера на инвестицията и дали инсталацията е за
              стопанска дейност или лични нужди. Solaron предоставя фактури и техническа
              описателна, за да улесни отчетността.
            </p>
          </div>
        </Card>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="СРАВНЕНИЕ"
          title="ROI в зависимост от начина на финансиране"
          subtitle="Опростената таблица по-долу сравнява типичните профили — не е индивидуална оферта, а рамка за разговор с инженер и финансов съветник."
          className="mb-10"
        />
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left font-body text-sm">
            <thead>
              <tr className="border-b border-border bg-background-secondary">
                <th className="px-4 py-3 font-semibold text-foreground">Метод</th>
                <th className="px-4 py-3 font-semibold text-foreground">Аванс</th>
                <th className="px-4 py-3 font-semibold text-foreground">Лихва / цена на парите</th>
                <th className="px-4 py-3 font-semibold text-foreground">Срок на изплащане (спрямо спестявания)</th>
                <th className="px-4 py-3 font-semibold text-foreground">Бележки</th>
              </tr>
            </thead>
            <tbody>
              {roiRows.map((row) => (
                <tr key={row.method} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.method}</td>
                  <td className="px-4 py-3 text-foreground-secondary">{row.upfront}</td>
                  <td className="px-4 py-3 text-foreground-secondary">{row.rate}</td>
                  <td className="px-4 py-3 text-foreground-secondary">{row.payback}</td>
                  <td className="px-4 py-3 text-foreground-secondary">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 font-body text-sm text-foreground-tertiary">
          Реалният ROI зависи от размера на системата, ориентацията, тарифата и дали използвате
          батерия. Използвайте нашия конфигуратор и ROI калкулатор за числа по вашия случай.
        </p>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-8 rounded-2xl border border-border bg-background p-8 md:flex-row md:p-12",
          )}
        >
          <div className="max-w-xl text-center md:text-left">
            <PiggyBank className="mx-auto size-10 text-accent md:mx-0" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Нека пресметнем вашия сценарий
            </h2>
            <p className="mt-3 font-body text-base text-foreground-secondary">
              Въведете град и консумация — получите ориентировъчно изплащане и 25-годишна прогноза.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/konfigurator">
                Конфигуратор
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/instrumenti/roi-kalkulator">ROI калкулатор</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
