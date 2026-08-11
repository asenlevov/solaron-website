import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { socialMetadata } from "@/lib/og";

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
    ...socialMetadata({
      title: t("svurzvaneMrezhata.title"),
      description: t("svurzvaneMrezhata.description"),
      locale,
    }),
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
