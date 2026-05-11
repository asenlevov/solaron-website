"use client";

import type { ReactNode } from "react";
import Script from "next/script";
import { BackToTop } from "@/components/ui/back-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SocialProofToast } from "@/components/marketing/social-proof-toast";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <BackToTop />
      <SocialProofToast />
      <CookieConsent />
      <Script
        src="https://app.sellinger.ai/api/live-chat/widget/8ad59adc-ffe5-44a1-bdc2-ab8f1621deff.js"
        strategy="lazyOnload"
      />
    </>
  );
}
