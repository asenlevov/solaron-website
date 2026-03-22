import { setRequestLocale, getTranslations } from "next-intl/server";

import { EvZaryadniContent } from "./ev-zaryadni-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("evZaryadni.title"),
    description: t("evZaryadni.description"),
    keywords: [
      "зарядна станция електрически автомобил",
      "EV зарядна станция",
      "домашна зарядна станция",
      "соларно зареждане електромобил",
      "Solaron",
    ],
    openGraph: {
      title: t("evZaryadni.title"),
      description: t("evZaryadni.description"),
    },
    alternates: { canonical: "/produkti/ev-zaryadni-stantsii" },
  };
}

export default async function EvZaryadniPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EvZaryadniContent />;
}
