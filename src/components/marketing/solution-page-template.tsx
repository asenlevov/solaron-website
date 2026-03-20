import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { ArrowRight, ChevronDown, MapPin, Zap } from "lucide-react";
import Link from "next/link";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export interface SolutionBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface SolutionPackage {
  name: string;
  kWp: string;
  panels: string;
  savings: string;
  price: string;
}

export interface SolutionCaseStudy {
  title: string;
  kWp: string;
  location: string;
  description: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionPageTemplateProps {
  title: string;
  subtitle: string;
  heroDescription: string;
  benefits: SolutionBenefit[];
  packages?: SolutionPackage[];
  caseStudy?: SolutionCaseStudy;
  faqs?: SolutionFaq[];
  ctaText?: string;
  ctaLink?: string;
}

function iconFromName(name: string): LucideIcon {
  const pascal = name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
  const map = LucideIcons as unknown as Record<string, LucideIcon | undefined>;
  return map[pascal] ?? LucideIcons.Circle;
}

function parseKwpNumber(kWp: string): number | null {
  const n = parseFloat(String(kWp).replace(",", ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

const DEFAULT_CTA_TEXT = "Безплатна консултация";
const DEFAULT_CTA_LINK = "/kontakti";

export function SolutionPageTemplate({
  title,
  subtitle,
  heroDescription,
  benefits,
  packages,
  caseStudy,
  faqs,
  ctaText = DEFAULT_CTA_TEXT,
  ctaLink = DEFAULT_CTA_LINK,
}: SolutionPageTemplateProps) {
  const caseStudyKwp = caseStudy ? parseKwpNumber(caseStudy.kWp) : null;

  return (
    <main>
      <SectionWrapper background="white" className="pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent md:text-sm">
            {subtitle}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            {heroDescription}
          </p>
          <div className="mt-10">
            <Button asChild size="xl" variant="primary">
              <Link href="/konfigurator" className="gap-2">
                Конфигурирай Система
                <ArrowRight className="size-5 shrink-0" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray" id="predimstva">
        <SectionHeader
          align="left"
          label="Предимства"
          title="Защо да изберете Solaron"
          subtitle="Професионално проектиране, качествени компоненти и прозрачен процес от офертата до пуска в експлоатация."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = iconFromName(b.icon);
            return (
              <Card key={`${b.title}-${i}`} className="flex flex-col border-border/80">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-accent-light text-accent">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {b.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-foreground-secondary md:text-base">
                  {b.description}
                </p>
              </Card>
            );
          })}
        </div>
      </SectionWrapper>

      {packages && packages.length > 0 ? (
        <SectionWrapper background="white" id="paketi">
          <SectionHeader
            align="left"
            label="Ориентировъчни пакети"
            title="Примерни конфигурации"
            subtitle="Цените са ориентировъчни; точната оферта зависи от покрива, кабелните трасета и избраните компоненти."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className="flex flex-col border-border/80 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5"
              >
                <div className="mb-6 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {pkg.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-light px-2.5 py-1 font-body text-xs font-semibold text-accent">
                    <Zap className="size-3.5" aria-hidden />
                    {pkg.kWp}
                  </span>
                </div>
                <ul className="space-y-3 font-body text-sm text-foreground-secondary md:text-base">
                  <li className="flex justify-between gap-4 border-b border-border/80 pb-3">
                    <span>Панели</span>
                    <span className="font-medium text-foreground">{pkg.panels}</span>
                  </li>
                  <li className="flex justify-between gap-4 border-b border-border/80 pb-3">
                    <span>Месечни спестявания (ориентир.)</span>
                    <span className="font-medium text-foreground">{pkg.savings}</span>
                  </li>
                  <li className="flex justify-between gap-4 pt-1">
                    <span>Ориентировъчна цена</span>
                    <span className="font-display text-lg font-semibold text-foreground">
                      {pkg.price}
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button asChild className="w-full" variant="primary">
                    <Link href="/konfigurator">Започни конфигурация</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {caseStudy ? (
        <SectionWrapper background="gray" id="proekt">
          <SectionHeader
            align="left"
            label="Реализиран проект"
            title="Пример от нашата практика"
          />
          <Card className="max-w-4xl border-border/80">
            <div className="flex flex-wrap items-start gap-4">
              <div className="inline-flex items-center gap-2 rounded-xl bg-accent-light px-4 py-3 font-display text-2xl font-semibold tabular-nums text-accent md:text-3xl">
                {caseStudyKwp != null ? (
                  <>
                    <AnimatedCounter value={caseStudyKwp} decimals={caseStudyKwp % 1 !== 0 ? 1 : 0} />{" "}
                    <span className="text-lg font-semibold md:text-xl">kWp</span>
                  </>
                ) : (
                  <span>{caseStudy.kWp}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {caseStudy.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 font-body text-sm text-foreground-secondary md:text-base">
                  <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
                  {caseStudy.location}
                </p>
                <p className="mt-4 font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
                  {caseStudy.description}
                </p>
              </div>
            </div>
          </Card>
        </SectionWrapper>
      ) : null}

      {faqs && faqs.length > 0 ? (
        <SectionWrapper background="white" id="faq">
          <SectionHeader label="Въпроси" title="Често задавани въпроси" />
          <div className="mx-auto max-w-3xl">
            {faqs.map((item, i) => (
              <details
                key={`${item.question}-${i}`}
                className="group border-b border-border"
              >
                <summary
                  className={cn(
                    "flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-body text-base font-semibold text-foreground outline-none transition-colors hover:text-accent md:text-lg",
                    "[&::-webkit-details-marker]:hidden",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown
                    className="size-5 shrink-0 text-foreground-tertiary transition-transform duration-200 ease-out group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="pb-5 pr-8 font-body text-base leading-relaxed text-foreground-secondary md:pr-10">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      <section className="bg-accent px-6 py-20 text-white md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Готови за следващата стъпка?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-white/90 md:text-lg">
            Конфигурирайте системата си онлайн или се свържете с нас за персонална оферта.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="min-w-[14rem] shadow-elevated"
            >
              <Link href={ctaLink} className="gap-2">
                {ctaText}
                <ArrowRight className="size-5 shrink-0" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
