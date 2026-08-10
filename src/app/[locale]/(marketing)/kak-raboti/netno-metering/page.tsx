import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { socialMetadata } from "@/lib/og";

const NetnoMeteringContent = dynamic(
  () => import("./content").then((m) => m.NetnoMeteringContent),
  { ssr: true },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HowItWorks" });
  return {
    title: t("netnoMetering.title"),
    description: t("netnoMetering.description"),
    ...socialMetadata({
      title: t("netnoMetering.title"),
      description: t("netnoMetering.description"),
      locale,
    }),
  };
}

export default async function NetnoMeteringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NetnoMeteringContent />;
}
