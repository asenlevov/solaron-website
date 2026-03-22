"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const social = [
  { href: "https://wa.me/359896699009", label: "WhatsApp", Icon: WhatsAppIcon },
  { href: "https://www.linkedin.com/company/solaron-energy", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com/solaron.energy", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/solaron.energy", label: "Instagram", Icon: Instagram },
] as const;

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href as never}
      className="font-body text-sm text-foreground-secondary transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
      {children}
    </h3>
  );
}

function NewsletterForm({ t }: { t: ReturnType<typeof useTranslations<"Footer">> }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
      }}
      className="mt-4"
    >
      {submitted ? (
        <p className="text-sm text-accent font-medium">
          {t("thankYou")}
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="h-10 flex-1 rounded-lg border border-border-medium bg-background px-3 text-sm text-foreground placeholder:text-foreground-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-3 text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </form>
  );
}

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("Footer");

  const products = [
    { href: "/produkti/solarni-paneli", label: t("solarPanels") },
    { href: "/produkti/invertori", label: t("inverters") },
    { href: "/produkti/baterii", label: t("batteries") },
    { href: "/produkti/konstrukcii", label: t("mounting") },
    { href: "/produkti/monitoring", label: t("monitoring") },
    { href: "/produkti/ev-zaryadni-stantsii", label: t("evChargers") },
  ];

  const solutions = [
    { href: "/resheniya/za-doma", label: t("forHome") },
    { href: "/resheniya/za-biznesa", label: t("forBusiness") },
    { href: "/resheniya/za-industriyata", label: t("forIndustry") },
    { href: "/resheniya/za-zemedelieto", label: t("forAgriculture") },
    { href: "/resheniya/solaren-karport", label: t("solarCarport") },
    { href: "/resheniya/avtonomni-sistemi", label: t("offGridSystems") },
  ];

  const resources = [
    { href: "/kak-raboti/slancheva-energiya", label: t("howItWorks") },
    { href: "/kak-raboti/protsesa-na-montazh", label: t("installationProcess") },
    { href: "/kak-raboti/finansirane", label: t("financing") },
    { href: "/konfigurator", label: t("configurator") },
    { href: "/proekti", label: t("projects") },
    { href: "/instrumenti/roi-kalkulator", label: t("roiCalculator") },
    { href: "/blog", label: t("blog") },
  ];

  const companyPrimary = [
    { href: "/kompaniya/za-nas", label: t("aboutUs") },
    { href: "/kompaniya/nasledstvo", label: t("heritage") },
    { href: "/kompaniya/ekip", label: t("team") },
    { href: "/kompaniya/sertifikati", label: t("certifications") },
    { href: "/kompaniya/partnori", label: t("partners") },
    { href: "/kompaniya/karieri", label: t("careers") },
    { href: "/kontakti", label: t("contacts") },
  ];

  const companyLegal = [
    { href: "/pravna-informatsiya/poveritelnost", label: t("privacy") },
    { href: "/pravna-informatsiya/usloviya", label: t("terms") },
    { href: "/pravna-informatsiya/garantsiya", label: t("warranty") },
    { href: "/pravna-informatsiya/biskvitki", label: t("cookies") },
  ];

  return (
    <footer className={cn("bg-[#F5F5F5] text-foreground", className)}>
      {/* Social proof bar */}
      <div className="border-b border-border bg-background-secondary/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-foreground-secondary">
            <span className="font-semibold text-foreground">{t("experience")}</span>
            <span className="hidden sm:inline text-border-medium">|</span>
            <span>{t("happyClients")}</span>
            <span className="hidden sm:inline text-border-medium">|</span>
            <span>EUPD Research Award 2024</span>
            <span className="hidden sm:inline text-border-medium">|</span>
            <span>SolarEdge Certified Partner</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Brand + Contact */}
          <div className="flex flex-col gap-4 lg:col-span-2">
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
              {t("tagline")}
            </p>

            <div className="space-y-2 mt-2">
              <a
                href="https://maps.google.com/?q=бул.+Черни+Връх+59Б,+ет.+3,+1407+София"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                <MapPin className="size-4 shrink-0 mt-0.5 text-accent" />
                {t("address")}
              </a>
              <a
                href="tel:+35988432156"
                className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                <Phone className="size-4 shrink-0 text-accent" />
                +359 88 432 1560
              </a>
              <a
                href="mailto:hello@solaron.io"
                className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                <Mail className="size-4 shrink-0 text-accent" />
                hello@solaron.io
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2">
              {social.map(({ href, label, Icon }) => (
                <NextLink
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
                </NextLink>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                {t("newsletter")}
              </p>
              <p className="text-xs text-foreground-secondary">
                {t("newsletterDesc")}
              </p>
              <NewsletterForm t={t} />
            </div>
          </div>

          {/* Column 2: Products & Solutions */}
          <div className="flex flex-col gap-4">
            <ColumnTitle>{t("productsTitle")}</ColumnTitle>
            <ul className="flex flex-col gap-2.5">
              {products.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
            <div className="my-1 h-px bg-border" role="separator" />
            <ColumnTitle>{t("solutionsTitle")}</ColumnTitle>
            <ul className="flex flex-col gap-2.5">
              {solutions.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-4">
            <ColumnTitle>{t("resourcesTitle")}</ColumnTitle>
            <ul className="flex flex-col gap-2.5">
              {resources.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="flex flex-col gap-4">
            <ColumnTitle>{t("companyTitle")}</ColumnTitle>
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
              &copy; 2026 Solaron. {t("allRightsReserved")}
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
