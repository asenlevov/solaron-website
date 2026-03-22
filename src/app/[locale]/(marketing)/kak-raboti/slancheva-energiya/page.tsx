import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";

const SlanchevaEnergiyaContent = dynamic(
  () => import("./content").then((m) => m.SlanchevaEnergiyaContent),
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
    title: t("slanchevaEnergiya.title"),
    description: t("slanchevaEnergiya.description"),
  };
}

export default async function SlanchevaEnergiyaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SlanchevaEnergiyaContent />;
}
