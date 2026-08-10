import { setRequestLocale, getTranslations } from "next-intl/server";

import { RoiKalkulatorClient } from "@/components/instrumenti/roi-kalkulator-client";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });
  return {
    title: t("roiKalkulator.title"),
    description: t("roiKalkulator.description"),
    ...socialMetadata({
      title: t("roiKalkulator.title"),
      description: t("roiKalkulator.description"),
      locale,
    }),
  };
}

export default async function RoiKalkulatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoiKalkulatorClient />;
}
