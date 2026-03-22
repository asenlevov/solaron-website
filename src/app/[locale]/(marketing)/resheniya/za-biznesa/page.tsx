import { setRequestLocale, getTranslations } from "next-intl/server";

import ZaBiznesaContent from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.zaBiznesa" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/za-biznesa" },
  };
}

export default async function ZaBiznesaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ZaBiznesaContent />;
}
