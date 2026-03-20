import Link from "next/link";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <MarketingLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <p className="font-display text-8xl font-bold tracking-tight text-accent md:text-9xl">
          404
        </p>
        <h1 className="mt-6 font-display text-2xl font-semibold text-foreground md:text-3xl">
          Страницата не е намерена
        </h1>
        <p className="mt-3 max-w-md text-pretty font-body text-foreground-secondary">
          Търсената страница не съществува или е преместена.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/">Начало</Link>
        </Button>
      </div>
    </MarketingLayout>
  );
}
