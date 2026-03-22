import { setRequestLocale, getTranslations } from "next-intl/server";

import { SravnenieClient } from "@/components/instrumenti/sravnenie-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });
  return {
    title: t("sravnenie.title"),
    description: t("sravnenie.description"),
  };
}

export default async function SravneniePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SravnenieClient />;
}
