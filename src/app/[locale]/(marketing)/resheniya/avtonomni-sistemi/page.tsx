import { setRequestLocale, getTranslations } from "next-intl/server";

import { AvtonomniSistemiContent } from "./content";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Solutions.avtonomniSistemi" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/resheniya/avtonomni-sistemi" },
    ...socialMetadata({
      title: t("title"),
      description: t("description"),
      locale,
    }),
  };
}

export default async function AvtonomniSistemiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AvtonomniSistemiContent />;
}
