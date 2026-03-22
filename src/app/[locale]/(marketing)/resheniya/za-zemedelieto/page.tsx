import { setRequestLocale, getTranslations } from "next-intl/server";

import ZaZemedelietoContent from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.zaZemedelieto" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/za-zemedelieto" },
  };
}

export default async function ZaZemedelietoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ZaZemedelietoContent />;
}
