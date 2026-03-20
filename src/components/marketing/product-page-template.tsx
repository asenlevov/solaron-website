import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductPageTemplateProps {
  title: string;
  description: string;
  specs: ProductSpec[];
  benefits: ProductBenefit[];
  features: ProductFeature[];
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

const DEFAULT_CTA_TEXT = "Безплатна консултация";
const DEFAULT_CTA_LINK = "/kontakti";

export function ProductPageTemplate({
  title,
  description,
  specs,
  benefits,
  features,
  ctaText = DEFAULT_CTA_TEXT,
  ctaLink = DEFAULT_CTA_LINK,
}: ProductPageTemplateProps) {
  const keySpecs = specs.slice(0, 4);

  return (
    <div>
      <SectionWrapper background="white" className="pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            {description}
          </p>
          {keySpecs.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2">
              {keySpecs.map((s) => (
                <Badge key={s.label} variant="accent" className="px-3 py-1 text-xs md:text-sm">
                  <span className="font-semibold text-accent">{s.label}:</span>{" "}
                  <span className="text-foreground">{s.value}</span>
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray" id="features">
        <SectionHeader
          align="left"
          label="Функции"
          title="Какво прави продукта специален"
          subtitle="Технически предимства и практическа стойност за вашата инсталация."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary md:text-base">
                {f.description}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" id="benefits">
        <SectionHeader
          align="left"
          label="Предимства"
          title="Защо да изберете този продукт"
        />
        <div
          className={cn(
            "grid gap-4 md:gap-5",
            benefits.length === 5
              ? "grid-cols-1 md:grid-cols-6 md:grid-rows-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {benefits.map((b, i) => {
            const Icon = iconFromName(b.icon);
            const spanClass =
              benefits.length === 5
                ? i < 3
                  ? "md:col-span-2"
                  : "md:col-span-3"
                : undefined;

            return (
              <Card
                key={`${b.title}-${i}`}
                className={cn("flex flex-col border-border/80", spanClass)}
              >
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

      <SectionWrapper background="gray" id="specs">
        <SectionHeader
          align="left"
          label="Спецификации"
          title="Пълни технически данни"
        />
        <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-card">
          <table className="w-full border-collapse text-left">
            <tbody>
              {specs.map((row, idx) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-border last:border-b-0",
                    idx % 2 === 0 ? "bg-background" : "bg-background-card",
                  )}
                >
                  <th
                    scope="row"
                    className="w-[40%] px-5 py-4 font-body text-sm font-semibold text-foreground md:px-8 md:text-base"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-4 font-body text-sm text-foreground-secondary md:px-8 md:text-base">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      <section className="bg-accent px-6 py-20 text-white md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Готови за следващата стъпка?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-white/90 md:text-lg">
            Свържете се с екипа на Solaron за оферта и безплатна консултация.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="min-w-[14rem] shadow-elevated"
            >
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
