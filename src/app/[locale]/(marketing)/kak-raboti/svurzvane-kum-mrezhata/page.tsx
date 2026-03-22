import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";

const SvurzvaneMrezhataContent = dynamic(
  () => import("./content").then((m) => m.SvurzvaneMrezhataContent),
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
    title: t("svurzvaneMrezhata.title"),
    description: t("svurzvaneMrezhata.description"),
  };
}

export default async function SvurzvaneMrezhataPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SvurzvaneMrezhataContent />;
}
