import { setRequestLocale, getTranslations } from "next-intl/server";

import { KonstrukciiContent } from "./konstrukcii-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("konstrukcii.title"),
    description: t("konstrukcii.description"),
    keywords: [
      "монтажна конструкция за соларни панели",
      "Van der Valk конструкция",
      "покривен монтаж солар",
      "наземна конструкция фотоволтаик",
      "Solaron",
    ],
    openGraph: {
      title: t("konstrukcii.title"),
      description: t("konstrukcii.description"),
    },
    alternates: { canonical: "/produkti/konstrukcii" },
  };
}

export default async function KonstrukciiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <KonstrukciiContent />;
}
