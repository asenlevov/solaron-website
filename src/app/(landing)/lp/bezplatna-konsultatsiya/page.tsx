import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  ClipboardList,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export const metadata: Metadata = {
  title: "Безплатна Консултация | Solaron",
  description:
    "Безплатна консултация за соларна система: оглед на обекта, индивидуален проект, оферта и ROI изчисление. Без ангажимент.",
};

async function submitConsultationForm(formData: FormData) {
  "use server";
  void formData;
}

export default function BezplatnaKonsultatsiyaPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(217,119,6,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success">Без ангажимент</Badge>
            <Badge variant="accent">Оглед и оферта</Badge>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:max-w-4xl lg:text-6xl">
            Получете Безплатна Консултация за Соларна Система
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Започнете с ясна картина: какво е реалистично за вашия покрив, какви
            са опциите по мощност и как изглежда икономическият резултат, преди
            да вземете решение.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="#kontakt">Заяви час за разговор</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/konfigurator">Първи ориентир в конфигуратора</Link>
            </Button>
          </div>
        </div>
      </section>

      <SectionWrapper id="kakvo-poluchavate" background="gray">
        <SectionHeader
          label="Какво включваме"
          title="Какво получавате при безплатната консултация"
          subtitle="Стъпките може да варират според обекта и дистанцията, но целта винаги е една: коректна информация и предвидим следващ етап."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: MapPin,
              title: "Оглед на обекта",
              body: "Оценка на покрива, конструкцията, сенките, достъпа и вариантите за маршрут на кабели и инвертор.",
            },
            {
              icon: ClipboardList,
              title: "Индивидуален проект",
              body: "Предложение за мощност, типове компоненти и схема на свързване, съобразени с вашите потребности и бюджет.",
            },
            {
              icon: Wallet,
              title: "Точна оферта",
              body: "Разбивка на позициите и условията за изпълнение — без скрити редове и с ясни допускания.",
            },
            {
              icon: Calculator,
              title: "ROI изчисление",
              body: "Ориентировъчна възвръщаемост при консервативни и реалистични допускания за цена на ток и самопотребление.",
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

      <SectionWrapper id="kontakt" background="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader
              align="left"
              label="Форма"
              title="Оставете координати и удобно време"
              subtitle="Ще потвърдим час по телефон или имейл. Ако обектът е извън зона за оглед на място, ще предложим алтернатива с дистанционен анализ."
            />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-light px-4 py-2 text-sm font-medium text-success">
              Без ангажимент — не се търси предплащане за първия разговор.
            </div>
          </div>
          <Card>
            <form action={submitConsultationForm} className="space-y-4">
              <div>
                <label
                  htmlFor="bc-name"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Име и фамилия
                </label>
                <input
                  id="bc-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="bc-phone"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Телефон
                </label>
                <input
                  id="bc-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="bc-email"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Имейл
                </label>
                <input
                  id="bc-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="bc-time"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Предпочитан час за контакт
                </label>
                <input
                  id="bc-time"
                  name="preferred_time"
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Напр. будни дни 10:00–12:00"
                />
              </div>
              <div>
                <label
                  htmlFor="bc-message"
                  className="mb-1 block font-body text-sm font-medium text-foreground"
                >
                  Съобщение
                </label>
                <textarea
                  id="bc-message"
                  name="message"
                  rows={4}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Населено място, тип покрив, средна сметка за ток…"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full" size="lg">
                Изпрати заявка
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

      <SectionWrapper background="gray">
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
              Екип с опит в проектиране и въвеждане в експлоатация.
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
              Реализирани инсталации в различни региони.
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
