import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";

const ProtsesNaMontazhContent = dynamic(
  () => import("./content").then((m) => m.ProtsesNaMontazhContent),
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
    title: t("protsesNaMontazh.title"),
    description: t("protsesNaMontazh.description"),
  };
}

export default async function ProtsesNaMontazhPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProtsesNaMontazhContent />;
}
