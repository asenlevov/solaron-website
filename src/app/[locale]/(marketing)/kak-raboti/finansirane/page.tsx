import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { socialMetadata } from "@/lib/og";

const FinansiraneContent = dynamic(
  () => import("./content").then((m) => m.FinansiraneContent),
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
    title: t("finansirane.title"),
    description: t("finansirane.description"),
    ...socialMetadata({
      title: t("finansirane.title"),
      description: t("finansirane.description"),
      locale,
    }),
  };
}

export default async function FinansiranePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FinansiraneContent />;
}
