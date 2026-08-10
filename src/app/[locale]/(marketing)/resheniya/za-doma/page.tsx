import { setRequestLocale, getTranslations } from "next-intl/server";

import ZaDomaContent from "./content";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.zaDoma" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/za-doma" },
    ...socialMetadata({
      title: t("title"),
      description: t("description"),
      locale,
    }),
  };
}

export default async function ZaDomaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ZaDomaContent />;
}
