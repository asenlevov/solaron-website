import type { Metadata } from "next";

import { CTASplit } from "@/components/marketing/cta-split";
import { EnvironmentalImpact } from "@/components/marketing/environmental-impact";
import { FAQSection } from "@/components/marketing/faq-section";
import { FeaturedProjects } from "@/components/marketing/featured-projects";
import { FinancingPreview } from "@/components/marketing/financing-preview";
import { BlogPreview } from "@/components/marketing/blog-preview";
import { Hero3D } from "@/components/marketing/hero-3d";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { QuickEstimator } from "@/components/marketing/quick-estimator";
import { SolutionFinder } from "@/components/marketing/solution-finder";
import { StatsSection } from "@/components/marketing/stats-section";
import { TechPartners } from "@/components/marketing/tech-partners";
import { Testimonials } from "@/components/marketing/testimonials";

export const metadata: Metadata = {
  title: "Solaron — Соларни Решения за Дома и Бизнеса",
  description:
    "Проектиране и монтаж на фотоволтаични системи с 20+ години европейски опит. Спестете до 80% от сметката за ток. Безплатна консултация.",
};

export default function HomePage() {
  return (
    <main className="pt-16 overflow-x-hidden">
      <Hero3D />
      <QuickEstimator />
      <ProductShowcase />
      <StatsSection />
      <ProcessTimeline />
      <SolutionFinder />
      <FeaturedProjects />
      <TechPartners />
      <Testimonials />
      <EnvironmentalImpact />
      <FinancingPreview />
      <BlogPreview />
      <CTASplit />
      <FAQSection />
    </main>
  );
}
