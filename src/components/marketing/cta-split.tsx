"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Phone, ArrowRight, Shield, Clock, BadgeCheck } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { BadgeChip } from "@/components/ui/badge-chip";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function CTASplit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const t = useTranslations("Home");
  const tc = useTranslations("Common");
  const waUrl = `https://wa.me/359899639726?text=${encodeURIComponent(tc("waMessage"))}`;

  const guarantees = [
    { icon: Shield, text: "30 год. гаранция панели" },
    { icon: Clock, text: "Безплатен оглед" },
    { icon: BadgeCheck, text: "Без скрити такси" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-accent via-accent to-emerald-700 px-6 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNjBMNjAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-50" />

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <BadgeChip className="mb-6 border-white/20 bg-white/10 text-white">
          Готови ли сте?
        </BadgeChip>

        <h2 className="editorial-display text-white">
          {t("ctaSplit.title")}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          {t("ctaSplit.subtitle")}
        </p>

        <a
          href="tel:+359884321560"
          className="mt-8 inline-flex items-center gap-3 text-2xl font-light text-white/90 transition-colors hover:text-white md:text-3xl"
        >
          <Phone className="size-6" strokeWidth={1.5} />
          +359 88 432 1560
        </a>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
          <Link
            href={"/kontakti" as never}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-accent shadow-lg transition-all duration-200 hover:bg-white/90 hover:shadow-xl"
          >
            {t("ctaSplit.primaryCta")}
            <ArrowRight className="size-5" />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.text} className="flex items-center gap-2 text-sm text-white/70">
                <Icon className="size-4 text-white/50" />
                {g.text}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
