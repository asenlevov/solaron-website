"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Sun, Cpu, Battery, Monitor, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/ui/glow-card";
import Link from "next/link";
import { PRODUCT_IMAGES } from "@/data/images";
import {
  PanelAnimation,
  InverterAnimation,
  BatteryAnimation,
  MonitoringAnimation,
} from "@/components/marketing/product-animations";

interface ProductTab {
  id: string;
  label: string;
  icon: typeof Sun;
  animation: React.ComponentType;
  specs: { label: string; value: string; accent?: boolean }[];
  highlight: string;
  description: string;
  badge: string;
  productImage: string;
  productHref: string;
  productCta: string;
}

const TABS: ProductTab[] = [
  {
    id: "panels",
    label: "Соларни Панели",
    icon: Sun,
    animation: PanelAnimation,
    badge: "Tier-1",
    description: "Монокристални MWT панели от водещи световни производители с доказана дългосрочна надеждност.",
    specs: [
      { label: "Мощност", value: "450W", accent: true },
      { label: "Ефективност", value: "21.5%" },
      { label: "Гаранция", value: "30 години" },
      { label: "Технология", value: "MWT" },
      { label: "Деградация", value: "<0.4%/год" },
      { label: "Сертификат", value: "IEC 61215" },
    ],
    highlight: "Максимална производителност дори в облачно време — до 15% повече спрямо стандартни панели",
    productImage: PRODUCT_IMAGES.solarPanel,
    productHref: "/produkti/solarni-paneli",
    productCta: "Разгледай панелите",
  },
  {
    id: "inverters",
    label: "Инвертори",
    icon: Cpu,
    animation: InverterAnimation,
    badge: "HD-Wave",
    description: "SolarEdge инвертори с революционна HD-Wave технология за рекордна конверсионна ефективност.",
    specs: [
      { label: "Ефективност", value: "99.5%", accent: true },
      { label: "Марка", value: "SolarEdge" },
      { label: "Мониторинг", value: "Панел по панел" },
      { label: "Гаранция", value: "12 години" },
      { label: "MPPT", value: "3 тракера" },
      { label: "Защита", value: "IP65" },
    ],
    highlight: "HD-Wave технология — 16x по-лек от конвенционалните инвертори при по-висока ефективност",
    productImage: PRODUCT_IMAGES.inverter,
    productHref: "/produkti/invertori",
    productCta: "Виж инверторите",
  },
  {
    id: "batteries",
    label: "Батерии",
    icon: Battery,
    animation: BatteryAnimation,
    badge: "LFP",
    description: "Литиево-железо-фосфатни батерии за пълна енергийна независимост — ден и нощ.",
    specs: [
      { label: "Капацитет", value: "5-20 kWh", accent: true },
      { label: "Технология", value: "LFP" },
      { label: "Цикли", value: "6 000+" },
      { label: "Гаранция", value: "10 години" },
      { label: "Кръгова еф.", value: "97.5%" },
      { label: "Скалируемост", value: "До 60 kWh" },
    ],
    highlight: "Енергийна независимост ден и нощ — автоматично превключване при спиране на тока",
    productImage: PRODUCT_IMAGES.battery,
    productHref: "/produkti/baterii",
    productCta: "Виж батериите",
  },
  {
    id: "monitoring",
    label: "Мониторинг",
    icon: Monitor,
    animation: MonitoringAnimation,
    badge: "24/7",
    description: "Професионална мониторинг платформа с достъп от всяко устройство — панел по панел.",
    specs: [
      { label: "Достъп", value: "24/7", accent: true },
      { label: "Ниво", value: "Панел по панел" },
      { label: "Известия", value: "Автоматични" },
      { label: "Платформа", value: "Web & Mobile" },
      { label: "Отчети", value: "Месечни PDF" },
      { label: "Поддръжка", value: "Отдалечена" },
    ],
    highlight: "Пълен контрол над вашата система от телефона — реално време, алерти, ROI проследяване",
    productImage: PRODUCT_IMAGES.monitoring,
    productHref: "/produkti/monitoring",
    productCta: "Виж мониторинга",
  },
];

export function ProductDemoTabs({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const tab = TABS[activeTab];
  const Animation = tab.animation;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Tab pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {TABS.map((t, i) => {
          const Icon = t.icon;
          const isActive = activeTab === i;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={cn(
                "relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "text-white shadow-lg shadow-accent/20"
                  : "border border-border bg-background text-foreground-secondary hover:bg-background-secondary hover:text-foreground hover:border-accent/30",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="product-tab-bg"
                  className="absolute inset-0 rounded-full bg-accent shadow-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2.5">
                <Icon className="size-4" />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(" ").pop()}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start"
        >
          {/* Left: Animated visualization */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-lg">
              <div className="aspect-[4/3]">
                <Animation />
              </div>
            </div>
          </div>

          {/* Right: Info + specs */}
          <div className="flex flex-col gap-5">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {tab.description}
              </p>
            </motion.div>

            {/* Specs grid — 3x2 */}
            <div className="grid grid-cols-3 gap-2.5">
              {tab.specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <GlowCard>
                    <div className="p-3">
                      <div className="text-[10px] uppercase tracking-wider text-foreground-tertiary mb-1">
                        {spec.label}
                      </div>
                      <div className={cn(
                        "text-base font-bold font-display",
                        spec.accent ? "text-accent" : "text-foreground"
                      )}>
                        {spec.value}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* Key advantage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex items-start gap-2.5 text-sm text-foreground-secondary"
            >
              <Zap className="size-4 shrink-0 text-accent mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold text-foreground">Ключово предимство: </span>
                {tab.highlight}
              </p>
            </motion.div>

            {/* Product CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                href={tab.productHref}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:gap-3"
              >
                {tab.productCta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
