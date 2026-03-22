import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <MarketingLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <p className="font-display text-8xl font-bold tracking-tight text-accent md:text-9xl">
          {t("errorCode")}
        </p>
        <h1 className="mt-6 font-display text-2xl font-semibold text-foreground md:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-md text-pretty font-body text-foreground-secondary">
          {t("description")}
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/">{t("goHome")}</Link>
        </Button>
      </div>
    </MarketingLayout>
  );
}
