import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";

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
