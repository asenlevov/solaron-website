import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  ArrowRightLeft,
  Banknote,
  CalendarClock,
  HandCoins,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LandingPages.finansiraneSolar" });
  return {
    title: t("title"),
    description: t("heroSubtitle"),
  };
}

async function submitFinancingForm(formData: FormData) {
  "use server";
  void formData;
}

export default async function FinansiraneSolarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(37,99,235,0.1),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:max-w-4xl lg:text-6xl">
            Соларна Система без Голяма Начална Инвестиция
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Комбинирайте гъвкаво финансиране с предвидими месечни спестявания от
            сметката за ток. Целта е ясен паричен поток: част от икономиите да
            покриват вноската, докато системата работи десетилетия.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href={"#kontakt" as never}>Говорете с експерт</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/kak-raboti/finansirane">Как работи финансирането</Link>
            </Button>
          </div>
        </div>
      </section>

      <SectionWrapper id="opcii" background="gray">
        <SectionHeader
          label="Възможности"
          title="Най-често използвани модели за финансиране"
          subtitle="Изборът зависи от вашия профил, срока и предпочитанието за собственост върху оборудването. Помагаме с ориентировъчни параметри и насочване към партньори."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Banknote,
              title: "Банков кредит",
              body: "Класически потребителски или ипотечен продукт (когато е приложимо) за закупуване на инсталацията. Подходящо при желание за директна собственост и дълъг хоризонт.",
            },
            {
              icon: ArrowRightLeft,
              title: "Лизинг",
              body: "Фиксирани вноски и ясни условия. Често се използва от фирми и при нужда от предвидим месечен разход без еднократно изваждане на голям капитал.",
            },
            {
              icon: CalendarClock,
              title: "Разсрочено плащане",
              body: "По договаряне с етапи според монтажа и приемане на обекта. Удобно при строителни проекти, където плащанията следват графика на СМР.",
            },
          ].map((item) => (
            <Card key={item.title} className="h-full">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <item.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="roi" background="white">
        <SectionHeader
          label="Сравнение"
          title="Колко бързо спестяванията покриват финансирането"
          subtitle="Илюстративен пример за ориентация — реалните стойности зависят от мощността, цената на тока, самопотреблението и условията по продукта."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-secondary/25">
            <div className="mb-4 inline-flex items-center gap-2 text-secondary">
              <Scale className="size-5" aria-hidden />
              <span className="font-body text-xs font-semibold uppercase tracking-wider">
                Примерни допускания
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Месечна вноска срещу месечна икономия
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Ако месечната икономия от солара е по-голяма или близка до вноската
              по финансирането, ефективният нетен разход за домакинството остава
              нисък още от първите месеци. При по-консервативен сценарий
              изплащането се разпределя във времето, докато производството нараства
              заедно с потреблението.
            </p>
            <ul className="mt-6 space-y-2 font-body text-sm text-foreground-secondary">
              <li className="flex gap-2">
                <HandCoins className="mt-0.5 size-4 shrink-0 text-accent" />
                По-високо самопотребление → по-бърз „изкупен“ период на инвестицията.
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                Стабилна система и мониторинг → по-предвидими реални спестявания.
              </li>
            </ul>
          </Card>
          <Card className="bg-background-secondary/60">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Ориентировъчна логика на изплащане
            </h3>
            <div className="mt-6 space-y-4 font-body text-sm text-foreground-secondary">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="font-medium text-foreground">Стъпка 1</p>
                <p className="mt-1">
                  Оразмеряваме системата спрямо покрива и консумацията, за да
                  доближим месечната икономия до реалните ви сметки.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="font-medium text-foreground">Стъпка 2</p>
                <p className="mt-1">
                  Сравняваме вноската по избрания финансов продукт с прогнозната
                  икономия (консервативно и оптимистично).
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="font-medium text-foreground">Стъпка 3</p>
                <p className="mt-1">
                  Оценяваме „срок на възвръщаемост“ на самата инвестиция — отделно
                  от кредита, за да вземете информирано решение.
                </p>
              </div>
            </div>
            <Button variant="secondary" className="mt-6 w-full" asChild>
              <Link href="/konfigurator">Към конфигуратора</Link>
            </Button>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper id="kontakt" background="gray">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            align="left"
            label="Запитване"
            title="Искате сценарий с числа за вашия случай?"
            subtitle="Опишете имота и очаквания бюджет — ще върнем обратно с варианти и следващи стъпки."
          />
          <Card>
            <form action={submitFinancingForm} className="space-y-4">
              <div>
                <label
                  htmlFor="fin-name"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Име и фамилия
                </label>
                <input
                  id="fin-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="fin-phone"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Телефон
                </label>
                <input
                  id="fin-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="fin-email"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Имейл
                </label>
                <input
                  id="fin-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="fin-message"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Съобщение
                </label>
                <textarea
                  id="fin-message"
                  name="message"
                  rows={4}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Желан срок, тип финансиране, приблизителен бюджет…"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full" size="lg">
                Изпрати запитване
              </Button>
              <p className="font-body text-xs text-foreground-secondary">
                Изпращайки формата, приемате обработката на лични данни съгласно{" "}
                <Link
                  href="/pravna-informatsiya/poveritelnost"
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  Политиката за поверителност
                </Link>
                .
              </p>
            </form>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <div className="grid gap-8 rounded-2xl border border-border bg-background-card p-8 md:grid-cols-3 md:p-10">
          <div className="text-center md:text-left">
            <p className="font-body text-sm font-medium uppercase tracking-wider text-foreground-secondary">
              Опит
            </p>
            <p className="mt-2 font-display text-4xl font-semibold text-accent">
              <AnimatedCounter value={20} suffix="+" duration={1600} />{" "}
              <span className="font-body text-lg font-normal text-foreground-secondary">
                години
              </span>
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="font-body text-sm font-medium uppercase tracking-wider text-foreground-secondary">
              Клиенти
            </p>
            <p className="mt-2 font-display text-4xl font-semibold text-secondary">
              <AnimatedCounter value={384} suffix="+" duration={2000} />
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="font-body text-sm font-medium uppercase tracking-wider text-foreground-secondary">
              Гаранция
            </p>
            <p className="mt-2 flex items-baseline justify-center gap-2 font-display text-4xl font-semibold text-success md:justify-start">
              <Sparkles className="size-8 shrink-0" aria-hidden />
              30 г.
            </p>
            <p className="mt-1 font-body text-sm text-foreground-secondary">
              Гаранция за производителност на панелите (по продуктова спецификация).
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
