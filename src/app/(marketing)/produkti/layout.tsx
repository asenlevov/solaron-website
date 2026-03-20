import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ProduktiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <nav
        aria-label="breadcrumb"
        className="border-b border-border bg-background px-6 py-4 md:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 font-body text-sm text-foreground-secondary">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
            )}
          >
            Начало
          </Link>
          <ChevronRight className="size-4 shrink-0 text-foreground-tertiary" aria-hidden />
          <Link
            href="/produkti"
            className={cn(
              "transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
            )}
          >
            Продукти
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
