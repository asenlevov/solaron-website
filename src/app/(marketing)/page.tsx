import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Solaron — Соларни Решения за Дома и Бизнеса",
  description:
    "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. Спестете до 80% от сметката за ток. Безплатна консултация.",
};

const HERO_STATS = [
  { value: "20+", label: "Години опит" },
  { value: "384+", label: "Доволни клиенти" },
  { value: "1500+", label: "kWp инсталирани" },
  { value: "2100+", label: "MWh произведени" },
];



export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative">
        <HeroMesh />
        <AnimatedHero
          badge="Соларни Решения от Ново Поколение"
          title="Спестете до 80% от Сметката за Ток"
          titleAccent="80%"
          subtitle="Проектираме и монтираме фотоволтаични системи с 20+ години европейски опит. Премиум компоненти, професионален монтаж и пълна поддръжка — от консултацията до последния ват."
          primaryCta={{ text: "Конфигурирай Система", href: "/konfigurator" }}
          secondaryCta={{ text: "Безплатна Консултация", href: "/kontakti" }}
          backgroundImage={REAL_IMAGES.hero.solarHome}
          stats={HERO_STATS}
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
            <p className="editorial-overline mb-4">Продукти</p>
            <h2 className="editorial-heading">
              Премиум Компоненти за Максимална Ефективност
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Работим само с водещи световни производители. Всеки компонент е
              подбран за надеждност и дълголетие.
            </p>
          </div>
          <ProductDemoTabs />
        </div>
      </section>

      {/* Capabilities Bento Grid */}
      <section className="py-20 md:py-28 bg-background-secondary/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="editorial-overline mb-4">Възможности</p>
            <h2 className="editorial-heading">
              Всичко, от което се нуждаете
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Пълна екосистема от продукти и услуги за вашата енергийна
              независимост.
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
            <p className="editorial-overline mb-4">Сравнение</p>
            <h2 className="editorial-heading">Преди и След Solaron</h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              Вижте реалната разлика между конвенционалната енергия и
              соларното решение.
            </p>
          </div>
          <BeforeAfterComparison />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-background-secondary/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="editorial-overline mb-4">Процес</p>
            <h2 className="editorial-heading">Как Работим</h2>
            <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
              От безплатната консултация до активиране на системата — прозрачен
              и ефективен процес.
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
