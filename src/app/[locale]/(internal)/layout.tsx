import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { PinGate } from "@/components/offer-maker/pin-gate";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function InternalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6 lg:px-8">
          <Image
            src="/logo-solaron.png"
            alt="Solaron"
            width={140}
            height={24}
            className="h-6 w-auto"
            priority
          />
          <span className="rounded-md bg-accent/10 px-2 py-0.5 font-display text-xs font-semibold text-accent">
            Offer Maker
          </span>
        </div>
      </header>
      <main className="flex-1">
        <PinGate>{children}</PinGate>
      </main>
    </div>
  );
}
