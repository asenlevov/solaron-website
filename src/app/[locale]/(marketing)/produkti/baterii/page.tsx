import { setRequestLocale, getTranslations } from "next-intl/server";

import { BateriiContent } from "./baterii-content";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("baterii.title"),
    description: t("baterii.description"),
    keywords: [
      "соларна батерия за дома",
      "батерия за фотоволтаична система",
      "съхранение на енергия",
      "LiFePO4 батерия",
      "Solaron",
    ],
    alternates: { canonical: "/produkti/baterii" },
    ...socialMetadata({
      title: t("baterii.title"),
      description: t("baterii.description"),
      locale,
    }),
  };
}

export default async function BateriiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BateriiContent />;
}
