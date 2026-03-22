import { setRequestLocale, getTranslations } from "next-intl/server";

import { MonitoringContent } from "./monitoring-content";

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
    openGraph: {
      title: t("monitoring.title"),
      description: t("monitoring.description"),
    },
    alternates: { canonical: "/produkti/monitoring" },
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
