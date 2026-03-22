import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Configurator" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/konfigurator" },
  };
}

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
