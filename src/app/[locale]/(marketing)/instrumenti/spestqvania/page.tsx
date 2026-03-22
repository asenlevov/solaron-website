import { setRequestLocale, getTranslations } from "next-intl/server";

import { SpestqvaniaClient } from "@/components/instrumenti/spestqvania-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });
  return {
    title: t("spestqvania.title"),
    description: t("spestqvania.description"),
  };
}

export default async function SpestqvaniaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SpestqvaniaClient />;
}
