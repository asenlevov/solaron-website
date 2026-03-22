import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Building2,
  Home,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
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
  const t = await getTranslations({ locale, namespace: "LandingPages.solarZaNovDom" });
  return {
    title: t("title"),
    description: t("heroSubtitle"),
  };
}

const PACKAGES = [
  {
    name: "Стартер",
    kWp: "3 kWp",
    panels: "~8 панела",
    savings: "~180 лв./мес.",
    price: "~8 500 лв.",
  },
  {
    name: "Стандарт",
    kWp: "5 kWp",
    panels: "~12 панела",
    savings: "~300 лв./мес.",
    price: "~12 000 лв.",
  },
  {
    name: "Премиум",
    kWp: "10 kWp",
    panels: "~24 панела",
    savings: "~550 лв./мес.",
    price: "~20 000 лв.",
  },
] as const;

async function submitSolarNewHomeForm(formData: FormData) {
  "use server";
  void formData;
}

export default async function SolarZaNovDomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(217,119,6,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
          <Badge variant="accent" className="mb-4">
            Нови сгради
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:max-w-4xl lg:text-6xl">
            Планирате Нов Дом? Включете Соларна Система от Самото Начало
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Соларът при ново строителство се проектира заедно с покрива и ел.
            инсталацията — по-малко компромиси, по-добър монтаж и по-висока
            дългосрочна възвръщаемост.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href={"#kontakt" as never}>Заявка за оферта</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/konfigurator">Конфигуратор</Link>
            </Button>
          </div>
        </div>
      </section>

      <SectionWrapper id="predimstva" background="gray">
        <SectionHeader
          label="Защо още при строеж"
          title="По-добър старт за вашата енергийна система"
          subtitle="Когато соларът е част от първоначалния проект, избягвате скъпи преработки и постигате по-чист, по-ефективен резултат."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: "По-ниска цена при нова сграда",
              body: "Кабелни трасета, защита и разпределение се планират още в етап „груб строеж“ — намаляват се допълнителни разходи и срокове.",
            },
            {
              icon: Layers,
              title: "Интегриран дизайн",
              body: "Панели, конструкция и инвертор се съгласуват с архитектурата и натоварването на покрива — без компромиси „след това“.",
            },
            {
              icon: Sun,
              title: "Максимална ефективност",
              body: "Оптимално ориентиране, по-малко сенки и правилно оразмеряване спрямо бъдещата консумация на дома.",
            },
          ].map((item) => (
            <Card key={item.title} className="h-full">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-accent-light text-accent">
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

      <SectionWrapper id="paketi" background="white">
        <SectionHeader
          label="Ориентировъчни пакети"
          title="Подходящи конфигурации за дом"
          subtitle="Точният размер и цена се определят след оглед и енергиен анализ. Ориентировъчни стойности за типични резиденции."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Card
              key={pkg.name}
              className={cn(
                "flex h-full flex-col",
                i === 1 && "border-secondary/40 ring-1 ring-secondary/20",
              )}
            >
              {i === 1 ? (
                <Badge variant="blue" className="mb-3 w-fit">
                  Най-популярен
                </Badge>
              ) : null}
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {pkg.name}
              </h3>
              <p className="mt-1 font-body text-sm text-foreground-secondary">
                {pkg.kWp} · {pkg.panels}
              </p>
              <p className="mt-4 font-body text-sm text-foreground-secondary">
                Ориентировъчни спестявания
              </p>
              <p className="font-display text-2xl font-semibold text-success">
                {pkg.savings}
              </p>
              <p className="mt-4 font-body text-sm text-foreground-secondary">
                Индикативна инвестиция
              </p>
              <p className="font-display text-xl font-semibold text-foreground">
                {pkg.price}
              </p>
              <div className="mt-6 flex flex-1 flex-col justify-end">
                <Button variant="primary" className="w-full" asChild>
                  <Link href={"#kontakt" as never}>Искам оферта</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="kontakt" background="gray">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader
              align="left"
              label="Контакт"
              title="Разкажете ни за проекта си"
              subtitle="Ще се свържем с вас с уточняващи въпроси и следващи стъпки за оглед или оферта."
            />
            <ul className="mt-6 space-y-3 font-body text-sm text-foreground-secondary">
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                Без ангажимент при първия разговор — ясни следващи стъпки.
              </li>
              <li className="flex gap-2">
                <Home className="mt-0.5 size-4 shrink-0 text-secondary" />
                Подходящо за еднофамилни къщи и нови кооперации с ТЕЦ/паркоместа.
              </li>
            </ul>
          </div>
          <Card>
            <form action={submitSolarNewHomeForm} className="space-y-4">
              <div>
                <label
                  htmlFor="snh-name"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Име и фамилия
                </label>
                <input
                  id="snh-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="snh-phone"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Телефон
                </label>
                <input
                  id="snh-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="snh-email"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Имейл
                </label>
                <input
                  id="snh-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="snh-message"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Съобщение
                </label>
                <textarea
                  id="snh-message"
                  name="message"
                  rows={4}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Етап на строежа, локация, очаквана консумация…"
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
            <p className="mt-1 font-body text-sm text-foreground-secondary">
              Реализирани проекти и поддръжка във времето.
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
              Доверени домакинства и бизнеси.
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
