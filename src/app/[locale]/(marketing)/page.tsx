import { setRequestLocale, getTranslations } from "next-intl/server";

import { AnimatedHero } from "@/components/marketing/animated-hero";
import { HeroMesh } from "@/components/effects/hero-mesh";
import { HeroEnergyOverlay } from "@/components/marketing/hero-energy-overlay";
import { TrustBadges } from "@/components/marketing/trust-badges";

import { ProductDemoTabs } from "@/components/marketing/product-demo-tabs";
import { BentoGrid } from "@/components/marketing/bento-grid";
import { QuickEstimator } from "@/components/marketing/quick-estimator";
import { BeforeAfterComparison } from "@/components/marketing/before-after-comparison";
import { HowItWorksSteps } from "@/components/marketing/how-it-works-steps";
import { FeaturedProjects } from "@/components/marketing/featured-projects";
import { TechPartners } from "@/components/marketing/tech-partners";
import { Testimonials } from "@/components/marketing/testimonials";
import { EnvironmentalImpact } from "@/components/marketing/environmental-impact";
import { CTASplit } from "@/components/marketing/cta-split";
import { FAQSection } from "@/components/marketing/faq-section";
import { REAL_IMAGES } from "@/data/images";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const heroStats = [
    { value: "20+", label: t("stats.yearsExperience") },
    { value: "400+", label: t("stats.happyClients") },
    { value: "4400+", label: t("stats.kWpInstalled") },
    { value: "2100+", label: t("stats.mWhProduced") },
  ];

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative">
        <HeroMesh />
        <AnimatedHero
          badge={t("hero.badge")}
          title={t("hero.title")}
          titleAccent={t("hero.titleAccent")}
          subtitle={t("hero.subtitle")}
          primaryCta={{ text: t("hero.primaryCta"), href: "/konfigurator" }}
          secondaryCta={{ text: t("hero.secondaryCta"), href: "/kontakti" }}
          backgroundImage={REAL_IMAGES.hero.solarHome}
          stats={heroStats}
          overlay={<HeroEnergyOverlay />}
        >
          <TrustBadges variant="hero" />
        </AnimatedHero>
      </section>

      {/* Partner Logos */}
      <TechPartners />

      {/* Product Demo Tabs */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="editorial-overline mb-4">{t("productDemoTabs.overline")}</p>
            <h2 className="editorial-heading">
              {t("productDemoTabs.title")}
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t("productDemoTabs.subtitle")}
            </p>
          </div>
          <ProductDemoTabs />
        </div>
      </section>

      {/* Capabilities Bento Grid */}
      <section className="py-20 md:py-28 bg-background-secondary/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="editorial-overline mb-4">{t("bentoGrid.overline")}</p>
            <h2 className="editorial-heading">
              {t("bentoGrid.title")}
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t("bentoGrid.subtitle")}
            </p>
          </div>
          <BentoGrid />
        </div>
      </section>

      {/* Quick Estimator */}
      <QuickEstimator />

      {/* Before/After Comparison */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="editorial-overline mb-4">{t("beforeAfter.overline")}</p>
            <h2 className="editorial-heading">{t("beforeAfter.title")}</h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t("beforeAfter.subtitle")}
            </p>
          </div>
          <BeforeAfterComparison />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-background-secondary/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="editorial-overline mb-4">{t("howItWorks.overline")}</p>
            <h2 className="editorial-heading">{t("howItWorks.title")}</h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t("howItWorks.subtitle")}
            </p>
          </div>
          <HowItWorksSteps />
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Testimonials */}
      <Testimonials />

      {/* Environmental Impact */}
      <EnvironmentalImpact />

      {/* CTA + FAQ */}
      <CTASplit />
      <FAQSection />
    </main>
  );
}
