import { setRequestLocale, getTranslations } from "next-intl/server";

import { KonstrukciiContent } from "./konstrukcii-content";
import { socialMetadata } from "@/lib/og";

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
    alternates: { canonical: "/produkti/konstrukcii" },
    ...socialMetadata({
      title: t("konstrukcii.title"),
      description: t("konstrukcii.description"),
      locale,
    }),
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
