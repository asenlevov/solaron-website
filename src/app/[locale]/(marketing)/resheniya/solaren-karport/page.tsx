import { setRequestLocale, getTranslations } from "next-intl/server";

import { SolarenKarportContent } from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.solarenKarport" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/solaren-karport" },
  };
}

export default async function SolarenKarportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolarenKarportContent />;
}
