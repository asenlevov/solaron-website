import { setRequestLocale, getTranslations } from "next-intl/server";

import { MonitoringContent } from "./monitoring-content";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("monitoring.title"),
    description: t("monitoring.description"),
    keywords: [
      "мониторинг соларна система",
      "SolarEdge мониторинг",
      "Kstar мониторинг",
      "Deye мониторинг",
      "фотоволтаична система наблюдение",
      "Solaron",
    ],
    alternates: { canonical: "/produkti/monitoring" },
    ...socialMetadata({
      title: t("monitoring.title"),
      description: t("monitoring.description"),
      locale,
    }),
  };
}

export default async function MonitoringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MonitoringContent />;
}
