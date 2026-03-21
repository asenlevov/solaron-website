"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ImageEditorial } from "@/components/ui/image-editorial";
import { StatNumber } from "@/components/ui/stat-number";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { PRODUCT_IMAGES } from "@/data/images";
import {
  revealFromBottom,
  blurIn,
  slideUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  createStagger,
  scaleSpring,
} from "@/lib/animations";
import {
  ArrowRight,
  Activity,
  LayoutGrid,
  Bell,
  Smartphone,
  BarChart3,
  Download,
  AlertTriangle,
  AlertCircle,
  Info,
  Wifi,
  Zap,
  TrendingUp,
  Sun,
  ChevronDown,
  Leaf,
  Clock,
  Eye,
} from "lucide-react";

const features = [
  { icon: Activity, title: "Данни в реално време", desc: "Моментна мощност, напрежение и ток от всеки панел и инвертор — обновяване на всеки 15 секунди." },
  { icon: LayoutGrid, title: "Панелен мониторинг", desc: "Визуална карта на покрива с цветово кодиране по производителност на всеки индивидуален модул." },
  { icon: Bell, title: "Система за известия", desc: "Автоматични нотификации по имейл и push при спад в производство, грешки или аномалии." },
  { icon: Smartphone, title: "Мобилно приложение", desc: "Пълен контрол от телефона — мониторинг, статистики и известия навсякъде по света." },
  { icon: BarChart3, title: "Исторически данни", desc: "25 години архив с дневни, месечни и годишни графики за производство и потребление." },
  { icon: Download, title: "Експорт и API", desc: "Изтегляне на данни в CSV/Excel формат и REST API за интеграция с външни системи." },
];

const alerts = [
  { type: "info", icon: Info, title: "Информация", desc: "Планирана поддръжка утре 10:00–12:00", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { type: "warning", icon: AlertTriangle, title: "Предупреждение", desc: "Панел A7 — 15% спад в производството", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { type: "critical", icon: AlertCircle, title: "Критично", desc: "Инвертор офлайн — необходима проверка", color: "bg-red-50 border-red-200 text-red-700" },
];

const mobileFeatures = [
  "Преглед на производство в реално време",
  "Push известия за аномалии",
  "Дневен и месечен отчет",
  "Споделяне на достъп с инсталатор",
  "Сравнение по периоди",
  "Тъмен режим",
];

const monitoringFaqs = [
  { q: "На кои устройства работи приложението?", a: "MySolarEdge приложението е достъпно за iOS (iPhone, iPad) и Android. Уеб платформата работи във всеки модерен браузър — Chrome, Safari, Firefox, Edge." },
  { q: "Колко дълго се съхраняват данните?", a: "SolarEdge съхранява пълна историческа информация за 25 години — дневни, месечни и годишни данни. Можете да експортирате в CSV/Excel по всяко време." },
  { q: "Мога ли да наблюдавам няколко системи?", a: "Да. Една акаунт може да управлява неограничен брой инсталации. Идеално за бизнеси с множество обекти или за инсталатори, управляващи портфолио от клиенти." },
  { q: "Има ли API за интеграция?", a: "Да. SolarEdge предлага REST API за интеграция с ERP, BMS и други системи. Данните за производство, потребление и статус са достъпни в реално време." },
];

export function MonitoringContent() {
  const featRef = useRef<HTMLDivElement>(null);
  const featInView = useInView(featRef, { once: true, margin: "0px 0px -10% 0px" });
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileInView = useInView(mobileRef, { once: true, margin: "0px 0px -10% 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* 1 — Hero: Full-bleed image with dashboard overlay */}
      <section className="relative min-h-[100vh] flex items-end">
        <ImageEditorial
          src={PRODUCT_IMAGES.monitoring}
          alt="Модерен дом със соларна система"
          fill
          reveal
          grain
          parallax
          containerClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <motion.div variants={blurIn} initial="hidden" animate="visible">
                <BadgeChip variant="accent">SolarEdge</BadgeChip>
              </motion.div>
              <TextReveal as="h1" className="text-editorial-hero text-white mt-2 max-w-4xl">
                Мониторинг
              </TextReveal>
              <motion.p variants={blurIn} initial="hidden" animate="visible" className="mt-6 max-w-xl text-lg text-white/70 font-body">
                Пълен контрол над вашата соларна система — от телефона, таблета или компютъра. 24/7 данни в реално време.
              </motion.p>
              <div className="mt-10 flex flex-wrap gap-12">
                <StatNumber value={15} suffix=" сек." context="Обновяване" className="text-white" contextClassName="text-white/50" />
                <StatNumber value={25} suffix=" г." context="Данни" className="text-white" contextClassName="text-white/50" />
                <StatNumber value={99.9} suffix="%" context="Uptime" className="text-white" contextClassName="text-white/50" duration={1500} />
              </div>
              <motion.div variants={blurIn} initial="hidden" animate="visible" className="mt-10">
                <MagneticButton href="/konfigurator" variant="primary">
                  Конфигурирай система <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
              </motion.div>
            </div>
            <motion.div
              variants={scaleSpring}
              initial="hidden"
              animate="visible"
              className="hidden md:block bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-5"
            >
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: Zap, label: "Текуща мощност", val: "6.2 kW", accent: true },
                  { icon: Sun, label: "Днес", val: "32.5 kWh", accent: false },
                  { icon: TrendingUp, label: "Този месец", val: "847 kWh", accent: false },
                  { icon: Wifi, label: "Статус", val: "Онлайн", accent: true },
                ].map((card) => (
                  <div key={card.label} className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <card.icon className={cn("h-4 w-4 mb-1", card.accent ? "text-accent" : "text-white/40")} />
                    <p className="text-[10px] text-white/40 font-body">{card.label}</p>
                    <p className={cn("text-base font-display font-bold mt-0.5", card.accent ? "text-accent" : "text-white")}>{card.val}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1 h-16">
                {[35, 48, 65, 72, 80, 88, 92, 85, 78, 62, 45, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originY: 1, height: `${h}%` }}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/40 to-accent"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1.5 text-[9px] text-white/40 font-body">
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/40" />
        </motion.div>
      </section>

      {/* 2 — Features Grid */}
      <section ref={featRef} className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-16">
            Функционалности
          </TextReveal>
          <motion.div
            variants={createStagger(0.08, 0.15)}
            initial="hidden"
            animate={featInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={staggerItem}>
                <TiltCard className="h-full">
                  <div className="rounded-2xl border border-border bg-[#f8faf6] p-7 h-full">
                    <f.icon className="h-7 w-7 text-accent mb-4" strokeWidth={1.5} />
                    <h3 className="font-display font-bold text-lg">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3 — Mobile App */}
      <section ref={mobileRef} className="py-24 md:py-32 bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={mobileInView ? "visible" : "hidden"}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[260px]">
              <div className="bg-[#1a1f2e] rounded-[2.5rem] p-3 border-2 border-white/10 shadow-2xl">
                <div className="bg-[#0f1520] rounded-[2rem] overflow-hidden">
                  <div className="pt-8 pb-4 px-5">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-[10px] text-white/40 font-body">Добро утро</p>
                        <p className="text-sm font-display font-bold text-white">Моята система</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Sun className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <p className="text-[10px] text-white/40 font-body">Текущо производство</p>
                      <p className="text-2xl font-display font-black text-accent mt-1">6.2 kW</p>
                      <div className="flex items-end gap-0.5 h-10 mt-3">
                        {[20, 35, 55, 70, 85, 90, 82, 65, 45, 25].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t-sm bg-accent/50" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-[9px] text-white/40 font-body">Днес</p>
                        <p className="text-sm font-display font-bold text-white">32.5 kWh</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-[9px] text-white/40 font-body">Спестено</p>
                        <p className="text-sm font-display font-bold text-accent">12.40 лв</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full" />
            </div>
          </motion.div>
          <motion.div variants={slideFromRight} initial="hidden" animate={mobileInView ? "visible" : "hidden"}>
            <p className="text-editorial-overline text-accent">Мобилно приложение</p>
            <h2 className="text-editorial-heading text-white mt-2">Системата в джоба ви</h2>
            <p className="mt-6 text-lg text-white/50 font-body leading-relaxed">
              MySolarEdge приложението ви дава пълен контрол навсякъде. Следете производството, получавайте известия и анализирайте данните — от телефона си.
            </p>
            <ul className="mt-8 space-y-3">
              {mobileFeatures.map((feat) => (
                <li key={feat} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-white/70 font-body">{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 4 — Alert Types */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal as="h2" className="text-editorial-display mb-4">
            Система за известия
          </TextReveal>
          <p className="text-lg text-muted-foreground font-body mb-12 max-w-2xl">
            Три нива на известия гарантират, че ще бъдете информирани за всичко важно без излишен шум.
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {alerts.map((a) => (
              <motion.div key={a.type} variants={staggerItem}>
                <div className={cn("rounded-2xl border-2 p-7 h-full", a.color)}>
                  <a.icon className="h-8 w-8 mb-4" strokeWidth={1.5} />
                  <h3 className="font-display font-bold text-lg">{a.title}</h3>
                  <p className="mt-3 text-sm opacity-70 font-body">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5 — Dashboard Stats (Dark) */}
      <section className="py-24 md:py-32 bg-[#0a0f1a]">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-white mb-16 text-center">
            Вашите данни, визуализирани
          </TextReveal>
          <motion.div
            variants={createStagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { val: 10500, sfx: " kWh", ctx: "Годишно производство" },
              { val: 4200, sfx: " лв", ctx: "Годишни спестявания" },
              { val: 7, sfx: " т", ctx: "Спестен CO₂" },
              { val: 99, sfx: "%", ctx: "Системен uptime" },
            ].map((s) => (
              <motion.div key={s.ctx} variants={staggerItem} className="bg-white/5 rounded-2xl p-6 border border-white/5 text-center">
                <StatNumber value={s.val} suffix={s.sfx} context={s.ctx} className="text-accent text-3xl md:text-4xl" contextClassName="text-white/40" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6 — ROI of Monitoring */}
      <section className="py-24 md:py-32 bg-[#f7f9f4]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-editorial-overline text-accent">Възвращаемост</p>
          <TextReveal as="h2" className="text-editorial-display mt-2 mb-16">
            Мониторингът спестява пари
          </TextReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Ранно откриване", desc: "Идентифицирайте проблеми в рамките на минути, преди да загубите седмици производство. Средно 15% по-малко загуби спрямо системи без мониторинг.", stat: "15%", statCtx: "По-малко загуби" },
              { title: "Оптимизация", desc: "Данните за отделни панели показват кои се нуждаят от почистване или са засенчени — насочвайте усилията точно.", stat: "8%", statCtx: "Повече производство" },
              { title: "Гаранционни казуси", desc: "Детайлните логове доказват проблеми пред производители и дистрибутори — ускорявайки гаранционни замени.", stat: "3×", statCtx: "По-бърза реакция" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl border border-border/50 p-8"
              >
                <p className="text-4xl font-display font-black text-accent mb-2">{item.stat}</p>
                <p className="text-xs text-muted-foreground font-body mb-4">{item.statCtx}</p>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <TextReveal as="h2" className="text-editorial-display text-center mb-16">
            Често задавани въпроси
          </TextReveal>
          <div className="space-y-3">
            {monitoringFaqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-display font-semibold">{f.q}</span>
                  <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4", openFaq === i && "rotate-180")} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted-foreground font-body leading-relaxed">{f.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 md:py-32 bg-background-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-editorial-display mb-12">Свързани продукти</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Инвертори SolarEdge", desc: "HD-Wave технология с 99.5% ефективност за интелигентно преобразуване на енергията.", href: "/produkti/invertori" },
              { title: "Батерии", desc: "LFP съхранение с 6000+ цикъла за енергийна независимост денонощно.", href: "/produkti/baterii" },
            ].map((p) => (
              <GlowCard key={p.href}>
                <Link href={p.href} className="group block p-8">
                  <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Научи повече <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TextReveal as="h2" className="text-editorial-display mb-6">
            Поемете контрола
          </TextReveal>
          <motion.p variants={blurIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            Всяка наша инсталация включва безплатен достъп до SolarEdge мониторинг платформата — за целия живот на системата.
          </motion.p>
          <MagneticButton href="/konfigurator" variant="dark" size="xl">
            Конфигурирайте система <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
