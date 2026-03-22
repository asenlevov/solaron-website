import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";

const VuzvrashchaemostContent = dynamic(
  () => import("./content").then((m) => m.VuzvrashchaemostContent),
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
    title: t("vuzvrashchaemost.title"),
    description: t("vuzvrashchaemost.description"),
  };
}

export default async function VuzvrashchaemostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VuzvrashchaemostContent />;
}
