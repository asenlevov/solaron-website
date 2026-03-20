"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  { href: "/produkti/solarni-paneli", label: "Соларни Панели" },
  { href: "/produkti/invertori", label: "Инвертори" },
  { href: "/produkti/baterii", label: "Батерии" },
  { href: "/produkti/konstrukcii", label: "Конструкции" },
  { href: "/produkti/monitoring", label: "Мониторинг" },
  { href: "/produkti/ev-zaryadni-stantsii", label: "EV Зарядни" },
] as const;

const solutions = [
  { href: "/resheniya/za-doma", label: "За Дома" },
  { href: "/resheniya/za-biznesa", label: "За Бизнеса" },
  { href: "/resheniya/za-industriyata", label: "За Индустрията" },
] as const;

const resources = [
  { href: "/kak-raboti/slancheva-energiya", label: "Как Работи" },
  { href: "/kak-raboti/protsesa-na-montazh", label: "Процес на Монтаж" },
  { href: "/kak-raboti/finansirane", label: "Финансиране" },
  { href: "/instrumenti/roi-kalkulator", label: "ROI Калкулатор" },
  { href: "/instrumenti/spestqvania", label: "Спестявания" },
  { href: "/instrumenti/sravnenie", label: "Сравнение" },
  { href: "/instrumenti/rechnik", label: "Речник" },
  { href: "/blog", label: "Блог" },
] as const;

const companyPrimary = [
  { href: "/kompaniya/za-nas", label: "За Нас" },
  { href: "/kompaniya/nasledstvo", label: "Наследство" },
  { href: "/kompaniya/ekip", label: "Екип" },
  { href: "/kompaniya/sertifikati", label: "Сертификати" },
  { href: "/kompaniya/partnori", label: "Партньори" },
  { href: "/kompaniya/karieri", label: "Кариери" },
  { href: "/kontakti", label: "Контакти" },
] as const;

const companyLegal = [
  { href: "/pravna-informatsiya/poveritelnost", label: "Поверителност" },
  { href: "/pravna-informatsiya/usloviya", label: "Условия" },
  { href: "/pravna-informatsiya/garantsiya", label: "Гаранция" },
] as const;

const social = [
  { href: "https://www.linkedin.com/company/solaron-energy", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com/solaron.energy", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/solaron.energy", label: "Instagram", Icon: Instagram },
] as const;

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-sm text-foreground-secondary transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">{children}</h3>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-[#F5F5F5] text-foreground", className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-solaron.png"
                alt="Solaron"
                width={160}
                height={27}
                className="h-7 w-auto"
              />
            </Link>
            <p className="max-w-xs font-body text-sm leading-relaxed text-foreground-secondary">
              Европейско качество. Българска надеждност.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {social.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border border-border-medium bg-background",
                    "text-foreground-secondary transition-colors hover:border-accent hover:text-accent",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <ColumnTitle>Продукти & Решения</ColumnTitle>
            <ul className="flex flex-col gap-2.5">
              {products.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
            <div className="my-1 h-px bg-border" role="separator" />
            <ul className="flex flex-col gap-2.5">
              {solutions.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <ColumnTitle>Ресурси</ColumnTitle>
            <ul className="flex flex-col gap-2.5">
              {resources.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <ColumnTitle>Компания</ColumnTitle>
            <ul className="flex flex-col gap-2.5">
              {companyPrimary.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
            <div className="my-1 h-px bg-border" role="separator" />
            <ul className="flex flex-col gap-2.5">
              {companyLegal.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-sm text-foreground-secondary">
              © 2026 Solaron. Всички права запазени.
            </p>
            <p className="font-body text-xs text-foreground-secondary sm:text-right">
              EUPD Research Award 2024 | SolarEdge Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
