import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/json-ld";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const ogLocale =
    locale === "bg" ? "bg_BG" : locale === "nl" ? "nl_NL" : "en_US";

  return {
    title: {
      default: t("title"),
      template: "%s | Solaron",
    },
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "Solaron" }],
    creator: "Solaron",
    metadataBase: new URL("https://solaron.io"),
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: "https://solaron.io",
      siteName: "Solaron",
      title: t("title"),
      description: t("ogDescription"),
      images: [
        {
          url: "/og-image.png",
          width: 2684,
          height: 1548,
          alt: "Solaron",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: "https://solaron.io",
      languages: {
        bg: "https://solaron.io/bg",
        en: "https://solaron.io/en",
        nl: "https://solaron.io/nl",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <NextIntlClientProvider>
          <JsonLd />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
