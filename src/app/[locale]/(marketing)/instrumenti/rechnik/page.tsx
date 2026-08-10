import { setRequestLocale, getTranslations } from "next-intl/server";

import { RechnikContent } from "./rechnik-content";
import { socialMetadata } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });
  return {
    title: t("rechnik.title"),
    description: t("rechnik.description"),
    ...socialMetadata({
      title: t("rechnik.title"),
      description: t("rechnik.description"),
      locale,
    }),
  };
}

export default async function RechnikPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RechnikContent />;
}
