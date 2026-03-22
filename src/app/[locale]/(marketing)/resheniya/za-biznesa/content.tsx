"use client";

import Image from "next/image";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { REAL_IMAGES, LIFESTYLE_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  revealFromLeft,
  blurIn,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  scaleSpring,
  createStagger,
} from "@/lib/animations";
import {
  ClipboardCheck,
  Ruler,
  Hammer,
  Settings,
  TrendingDown,
  Receipt,
  Building2,
  ShieldCheck,
} from "lucide-react";

const caseStudies = [
  {
    image: REAL_IMAGES.projects.sedemBg108_hero,
    title: "Седем БГ — София",
    kWp: 108,
    type: "Търговски обект",
    savings: "~48 000 лв./год.",
    description: "Покривна инсталация на търговска сграда в София. Системата покрива над 65% от дневното потребление.",
  },
  {
    image: REAL_IMAGES.projects.kazanlak30_1,
    title: "Среден бизнес — Казанлък",
    kWp: 30,
    type: "Производствен цех",
    savings: "~14 000 лв./год.",
    description: "Оптимизирана система за производствено предприятие с висок дневен консумация.",
  },
  {
    image: REAL_IMAGES.projects.varna39_hero,
    title: "Търговски обект — Варна",
    kWp: 39,
    type: "Офис сграда",
    savings: "~18 000 лв./год.",
    description: "Покривна система на офис сграда с интелигентно управление на енергията.",
  },
];

const processSteps = [
  { icon: ClipboardCheck, title: "Енергиен одит", desc: "Анализираме консумацията, тарифите и покривната площ" },
  { icon: Ruler, title: "Проектиране", desc: "Оптимална система за максимална възвръщаемост" },
  { icon: Hammer, title: "Монтаж", desc: "Професионален монтаж без прекъсване на работата" },
  { icon: Settings, title: "Оптимизация", desc: "Мониторинг и поддръжка за пикова производителност" },
];

const commercialEquipment = [
  {
    category: "On-Grid Системи",
    description: "За бизнеси с висока дневна консумация, on-grid системите осигуряват директно намаляване на сметките за електричество без батерии.",
    brands: [
      { name: "SolarEdge", role: "Панелно ниво оптимизация, 99.2% ефективност" },
      { name: "Kstar", role: "Стрингови инвертори с висока надеждност" },
      { name: "Huawei", role: "Стрингови и централни инвертори за средни и големи системи" },
    ],
  },
  {
    category: "Хибридни Системи",
    description: "Хибридните системи комбинират соларна генерация с батерийно съхранение за peak shaving и резервно захранване.",
    brands: [
      { name: "Deye", role: "До 16 паралелни инвертора, мащабируемост до 800 kW" },
      { name: "Huawei", role: "Интелигентно управление на енергията с FusionSolar" },
    ],
  },
  {
    category: "Съхранение (ESS Кабинети)",
    description: "Кабинетни системи за съхранение на електроенергия за големи комерсиални и индустриални обекти.",
    brands: [
      { name: "Kstar", role: "Модулни кабинети с CATL LFP клетки" },
      { name: "CNTE", role: "STAR-H all-in-one кабинети с течно охлаждане" },
    ],
  },
];

export default function ZaBiznesaContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const taxRef = useRef<HTMLElement>(null);
  const taxInView = useInView(taxRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-hidden">
      {/* 1. HERO */}
      <section ref={heroRef} className="relative flex min-h-screen items-center">
        <ImageEditorial
          src={LIFESTYLE_IMAGES.business}
          alt="Бизнес сграда със соларни панели"
          fill
          priority
          parallax
          grain
          containerClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/60 to-stone-950/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-8">
          <motion.p
            variants={slideUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="editorial-overline text-accent mb-6"
          >
            Решения за бизнеса
          </motion.p>
          <TextReveal as="h1" className="editorial-hero max-w-3xl text-white">
            Инвестиция с Гарантирана Възвръщаемост
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed"
          >
            Намалете оперативните разходи и увеличете конкурентоспособността
            на бизнеса си с професионална соларна система.
          </motion.p>
          <motion.div
            variants={scaleSpring}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-10 inline-flex items-center gap-8 rounded-2xl border border-white/15 bg-white/5 px-8 py-6 backdrop-blur-md"
          >
            <div>
              <p className="editorial-stat text-5xl text-accent md:text-6xl">ROI</p>
            </div>
            <div className="border-l border-white/20 pl-8">
              <p className="editorial-stat text-5xl text-white md:text-6xl">&lt; 4</p>
              <p className="text-white/50 text-sm mt-1">години изплащане</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CASE STUDIES */}
      <section className="bg-background-warm px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.p
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="editorial-overline text-accent mb-4"
          >
            Реализирани проекти
          </motion.p>
          <TextReveal as="h2" className="editorial-display mb-16">
            Бизнеси, които вече спестяват
          </TextReveal>
          <motion.div
            variants={createStagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12"
          >
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.title}
                variants={staggerItem}
                className={cn(
                  "group grid items-center gap-8 overflow-hidden rounded-3xl border border-stone-200 bg-white md:grid-cols-2",
                  i % 2 === 1 && "md:direction-rtl"
                )}
              >
                <div className={cn("relative h-72 md:h-full min-h-[320px]", i % 2 === 1 && "md:order-2")}>
                  <ImageEditorial
                    src={cs.image}
                    alt={cs.title}
                    fill
                    parallax
                    reveal
                    containerClassName="h-full"
                  />
                </div>
                <div className={cn("p-8 md:p-12", i % 2 === 1 && "md:order-1")}>
                  <p className="editorial-overline text-stone-400 mb-1">{cs.type}</p>
                  <h3 className="editorial-heading">{cs.title}</h3>
                  <StatNumber
                    value={cs.kWp}
                    suffix=" kWp"
                    context="инсталирана мощност"
                    className="text-4xl mt-4"
                  />
                  <p className="mt-4 text-stone-600 leading-relaxed">{cs.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-accent font-semibold">
                    <TrendingDown className="size-4" />
                    {cs.savings}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. TAX BENEFITS — dark */}
      <section ref={taxRef} className="relative bg-stone-950 px-6 py-24 text-white md:px-8 md:py-32 overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              animate={taxInView ? "visible" : "hidden"}
            >
              <Receipt className="size-12 text-accent mb-4" strokeWidth={1.5} />
              <TextReveal as="h2" className="editorial-display text-white">
                Данъчни Предимства
              </TextReveal>
              <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-lg">
                Ускорена амортизация позволява пълно данъчно приспадане на
                инвестицията за 3 години. Соларната система е призната за
                данъчен актив от НАП.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-accent mt-0.5 shrink-0" />
                  <p className="text-white/70">3-годишна ускорена амортизация вместо стандартните 6.67%</p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-accent mt-0.5 shrink-0" />
                  <p className="text-white/70">Нулева ставка ДДС за фотоволтаични системи до 2026 г.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-accent mt-0.5 shrink-0" />
                  <p className="text-white/70">Намалена данъчна основа с размера на инвестицията</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={scaleSpring}
              initial="hidden"
              animate={taxInView ? "visible" : "hidden"}
              className="flex flex-col items-center"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
                <p className="text-sm uppercase tracking-widest text-accent mb-4">Типични данъчни спестявания</p>
                <StatNumber
                  value={33}
                  suffix="%"
                  context="от инвестицията за 3 години"
                  className="text-6xl md:text-7xl text-white"
                  contextClassName="text-white/50"
                />
                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-white/40 text-sm">
                    При система 100 kWp на стойност ~120 000 лв. → ~40 000 лв. данъчно облекчение
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. LEASE VS BUY */}
      <section className="bg-white px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <TextReveal as="h2" className="editorial-display text-center mb-4">
            Лизинг или Покупка?
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-lg text-stone-500 mb-16 max-w-2xl mx-auto"
          >
            Сравнете двата модела за система от 50 kWp
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 md:grid-cols-2"
          >
            {[
              {
                title: "Покупка",
                monthCost: "Еднократно: ~60 000 лв.",
                totalCost: "~60 000 лв.",
                taxBenefit: "Пълна ускорена амортизация",
                ownership: "Собственост от ден 1",
                highlight: true,
              },
              {
                title: "Оперативен лизинг",
                monthCost: "~1 200 лв./мес.",
                totalCost: "~144 000 лв. за 10 г.",
                taxBenefit: "Лизинговите вноски са разход",
                ownership: "Собственост след изплащане",
                highlight: false,
              },
            ].map((option) => (
              <motion.div key={option.title} variants={staggerItem}>
                <TiltCard
                  className={cn(
                    "rounded-3xl border p-8 md:p-10 h-full",
                    option.highlight
                      ? "border-accent bg-accent/5"
                      : "border-stone-200 bg-stone-50"
                  )}
                >
                  <h3 className="editorial-heading mb-6">{option.title}</h3>
                  <div className="space-y-5">
                    {[
                      ["Цена", option.monthCost],
                      ["Обща цена (10 г.)", option.totalCost],
                      ["Данъчна полза", option.taxBenefit],
                      ["Собственост", option.ownership],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between items-start gap-4 border-b border-stone-200/60 pb-3">
                        <span className="text-sm text-stone-500">{label}</span>
                        <span className="text-sm font-semibold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. ENERGY AUDIT PROCESS — dark */}
      <section className="relative bg-stone-900 px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal as="h2" className="editorial-display text-white text-center mb-16">
            Нашият процес
          </TextReveal>
          <motion.div
            variants={createStagger(0.15, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 md:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={staggerItem}
                className="relative text-center"
              >
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                  <step.icon className="size-8" strokeWidth={1.5} />
                </div>
                <p className="editorial-overline text-accent mb-2">0{i + 1}</p>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. EQUIPMENT */}
      <section className="py-24 md:py-32 bg-[#f8faf6]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="editorial-overline text-accent">Оборудване</p>
          <TextReveal as="h2" className="editorial-heading mt-2 mb-4">
            Технологии за всяка бизнес нужда
          </TextReveal>
          <p className="text-lg text-muted-foreground font-body mb-16 max-w-2xl">
            Подбираме оборудването спрямо конкретните нужди на всеки бизнес — от мощност и бюджет до специфични изисквания.
          </p>
          <div className="space-y-8">
            {commercialEquipment.map((eq) => (
              <motion.div
                key={eq.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-white p-8"
              >
                <h3 className="font-display font-bold text-xl mb-2">{eq.category}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{eq.description}</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {eq.brands.map((brand) => (
                    <div key={brand.name} className="flex items-start gap-3 rounded-xl bg-muted/30 p-4">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <span className="text-xs font-display font-bold">{brand.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-display font-semibold text-sm">{brand.name}</p>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">{brand.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="overflow-hidden bg-accent px-6 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal as="h2" className="editorial-hero text-white mb-6">
            Намалете разходите сега
          </TextReveal>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/80 text-xl mb-10 max-w-xl mx-auto"
          >
            Заявете безплатен енергиен одит и разберете колко може
            да спести вашият бизнес.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Заявете Енергиен Одит
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
