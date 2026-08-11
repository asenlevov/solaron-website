import { setRequestLocale, getTranslations } from "next-intl/server";

import { InvertoriContent } from "./invertori-content";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("invertori.title"),
    description: t("invertori.description"),
    keywords: [
      "соларен инвертор SolarEdge",
      "хибриден инвертор Deye",
      "инвертор за соларни панели цена",
      "Kstar инвертор",
      "Solaron",
    ],
    alternates: { canonical: "/produkti/invertori" },
    ...socialMetadata({
      title: t("invertori.title"),
      description: t("invertori.description"),
      locale,
    }),
  };
}

export default async function InvertoriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InvertoriContent />;
}
