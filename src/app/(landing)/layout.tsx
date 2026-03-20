import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo-solaron.png"
              alt="Solaron"
              width={140}
              height={24}
              className="h-6 w-auto sm:h-7"
              priority
            />
          </Link>
          <Button variant="primary" size="md" asChild>
            <a href="tel:+359888000000">Обади се</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-background py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center sm:flex-row sm:text-left md:px-6 lg:px-8">
          <p className="font-body text-sm text-foreground-secondary">
            © 2026 Solaron. Всички права запазени.
          </p>
          <Link
            href="/pravna-informatsiya/poveritelnost"
            className="font-body text-sm text-foreground-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Поверителност
          </Link>
        </div>
      </footer>
    </div>
  );
}
