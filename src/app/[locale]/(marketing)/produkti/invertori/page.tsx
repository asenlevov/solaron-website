import { setRequestLocale, getTranslations } from "next-intl/server";

import { InvertoriContent } from "./invertori-content";

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
    openGraph: {
      title: t("invertori.title"),
      description: t("invertori.description"),
    },
    alternates: { canonical: "/produkti/invertori" },
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
