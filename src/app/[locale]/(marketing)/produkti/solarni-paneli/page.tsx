import { setRequestLocale, getTranslations } from "next-intl/server";

import { SolarniPaneliContent } from "./solarni-paneli-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("solarniPaneli.title"),
    description: t("solarniPaneli.description"),
    keywords: [
      "соларни панели AIKO",
      "фотоволтаични панели DMEGC",
      "MWT соларни модули",
      "Tier-1 панели",
      "Solaron",
    ],
    openGraph: {
      title: t("solarniPaneli.title"),
      description: t("solarniPaneli.description"),
    },
    alternates: { canonical: "/produkti/solarni-paneli" },
  };
}

export default async function SolarniPaneliPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolarniPaneliContent />;
}
