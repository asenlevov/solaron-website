import { setRequestLocale, getTranslations } from "next-intl/server";

import { ZaIndustriyataContent } from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.zaIndustriyata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/za-industriyata" },
  };
}

export default async function ZaIndustriyataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ZaIndustriyataContent />;
}
