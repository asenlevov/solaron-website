import { setRequestLocale, getTranslations } from "next-intl/server";

import ZaDomaContent from "./content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.zaDoma" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/za-doma" },
  };
}

export default async function ZaDomaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ZaDomaContent />;
}
