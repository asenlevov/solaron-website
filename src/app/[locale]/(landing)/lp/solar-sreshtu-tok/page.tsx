import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowDownRight, ArrowUpRight, LineChart, Sparkles, Sun } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LandingPages.solarSreshtuTok" });
  return {
    title: t("title"),
    description: t("heroSubtitle"),
  };
}

export default async function SolarSreshtuTokPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(22,163,74,0.1),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:max-w-4xl lg:text-6xl">
            Цените на Тока Растат. Вашите Спестявания Също Могат.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Мрежовият ток се подчинява на пазарни и регулаторни промени. Соларна
            система с добро самопотребление прехвърля част от разхода в
            предвидимо производство на място — с дълъг хоризонт на ползване.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/konfigurator">Към конфигуратора</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/kontakti">Свържете се с нас</Link>
            </Button>
          </div>
        </div>
      </section>

      <SectionWrapper id="sravnenie" background="gray">
        <SectionHeader
          label="Сравнение"
          title="Тенденции: цена на тока срещу соларни спестявания"
          subtitle="Не става дума за „нула такса“ винаги — а за преразпределение на разхода: по-малко купувана енергия и повече произведена за собствени нужди."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-error/20">
            <div className="mb-4 flex items-center gap-2 text-error">
              <ArrowUpRight className="size-5" aria-hidden />
              <span className="font-body text-xs font-semibold uppercase tracking-wider">
                Мрежов ток
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Растяща цена на закупуваната енергия
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Сметката отразява ценови компоненти, които се променят — както от
              пазара, така и от регулаторни решения. Дългосрочно потреблението без
              локално производство остава изцяло изложено на тези промени.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-foreground-secondary">
              <li className="flex gap-2">
                <LineChart className="mt-0.5 size-4 shrink-0 text-foreground-tertiary" />
                Проследявате индекси и нови тарифи — по-малко контрол върху
                крайната сметка.
              </li>
              <li className="flex gap-2">
                <ArrowDownRight className="mt-0.5 size-4 shrink-0 text-foreground-tertiary" />
                При по-високо потребление ефектът в лева се усеща по-силно.
              </li>
            </ul>
          </Card>
          <Card className="border-success/25 bg-success-light/30">
            <div className="mb-4 flex items-center gap-2 text-success">
              <Sun className="size-5" aria-hidden />
              <span className="font-body text-xs font-semibold uppercase tracking-wider">
                Солар + самопотребление
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Спестявания, които следват цената на тока
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Всяка произведена и използвана на място киловатчас енергия „избягва“
              текущата цена на мрежата. Когато цените растат, стойността на тази
              икономия също се вдига — зависи от дела самопотребление и
              ефективността на системата.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-foreground-secondary">
              <li className="flex gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                Дълъг експлоатационен срок на модулите — икономията се натрупва с
                годините.
              </li>
              <li className="flex gap-2">
                <Sun className="mt-0.5 size-4 shrink-0 text-secondary" />
                Комбинация с мониторинг и оптимизация на консумацията повишава
                реалния ефект.
              </li>
            </ul>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper id="prognoza-25" background="white">
        <SectionHeader
          label="25 години"
          title="Ориентировъчна сума на разходите: без солар срещу със солар"
          subtitle="Индикативни стойности за илюстрация на реда на величините — не са индивидуална оферта. Реалният резултат зависи от мощността, цените, профила на потребление и поддръжката."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="font-body text-sm font-medium text-foreground-secondary">
              Без солар (купуван ток)
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">
              ~75 000 лв.
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Натрупан разход за закупена енергия за 25 години при примерни
              допускания за цена и годишно потребление. Не включва инфлацията извън
              енергийната компонента и не е персонализиран сценарий.
            </p>
          </Card>
          <Card className="border-success/30 bg-success-light/25">
            <p className="font-body text-sm font-medium text-success">
              Със солар (инвестиция + поддръжка)
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">
              ~25 000 лв.
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Ориентировъчна сума, обхващаща инвестиция в инсталация и
              експлоатационни разходи за същия 25-годишен период при илюстративни
              допускания. Реалната възвръщаемост се изчислява по вашите данни.
            </p>
          </Card>
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-border bg-background-secondary/80 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              Персонализирайте сценария си за 25 години
            </p>
            <p className="mt-1 max-w-xl font-body text-sm text-foreground-secondary">
              Конфигураторът дава първи ориентир по мощност и ориентировъчни
              икономии — за точна оферта следва оглед.
            </p>
          </div>
          <Button variant="primary" size="lg" asChild>
            <Link href="/konfigurator">Отвори конфигуратора</Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <div
          className={cn(
            "grid gap-8 rounded-2xl border border-border bg-background-card p-8 md:grid-cols-3 md:p-10",
          )}
        >
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
            <p className="mt-1 font-body text-sm text-foreground-secondary">
              Практически опит с проектиране и въвеждане в експлоатация.
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="font-body text-sm font-medium uppercase tracking-wider text-foreground-secondary">
              Клиенти
            </p>
            <p className="mt-2 font-display text-4xl font-semibold text-secondary">
              <AnimatedCounter value={384} suffix="+" duration={2000} />
            </p>
            <p className="mt-1 font-body text-sm text-foreground-secondary">
              Реализирани инсталации за домове и бизнеси.
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
