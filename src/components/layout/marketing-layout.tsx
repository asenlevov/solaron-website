"use client";

import type { ReactNode } from "react";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingCTA } from "@/components/ui/floating-cta";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingCTA />
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
