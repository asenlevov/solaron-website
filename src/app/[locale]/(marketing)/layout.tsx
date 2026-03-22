import { setRequestLocale } from "next-intl/server";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MarketingLayout>{children}</MarketingLayout>;
}
