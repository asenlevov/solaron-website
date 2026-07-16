import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroStat {
  value: string;
  label: string;
}

interface AnimatedHeroProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  backgroundImage: string;
  stats?: HeroStat[];
  children?: React.ReactNode;
  overlay?: React.ReactNode;
}

/*
 * Entrance animations are pure CSS (see .hero-fade-up in globals.css) instead
 * of motion/react so the hero text paints server-side without waiting for JS
 * hydration — it is the LCP element on mobile.
 */
export function AnimatedHero({
  badge,
  title,
  titleAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
  stats,
  children,
  overlay,
}: AnimatedHeroProps) {
  const renderTitle = () => {
    if (!titleAccent) return title;
    const idx = title.indexOf(titleAccent);
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + titleAccent.length);
    return (
      <>
        {before}
        <span className="text-emerald-400">{titleAccent}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Background image — Ken Burns only on md+ to keep mobile GPUs idle */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Solaron соларна инсталация"
          fill
          priority
          quality={90}
          className="object-cover scale-105 md:animate-[ken-burns_25s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Energy overlay (renders above image, below text content) */}
      {overlay}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center md:pt-40 md:pb-32">
        {badge && (
          <div className="hero-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Headline and subtitle stay fully visible from the first paint:
            they are the LCP element, and fading them in from opacity 0 makes
            Chrome unable to register the paint (slide-up only, no fade). */}
        <h1
          className="hero-rise mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1]"
          style={{ animationDelay: "0.1s" }}
        >
          {renderTitle()}
        </h1>

        <p
          className="hero-rise mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {subtitle}
        </p>

        <div
          className="hero-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.56s" }}
        >
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#1a1a1a] shadow-xl transition-all duration-200 hover:bg-white/90 hover:shadow-2xl"
          >
            {primaryCta.text}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10"
          >
            {secondaryCta.text}
          </Link>
        </div>

        {children && (
          <div className="hero-fade-up mt-10" style={{ animationDelay: "0.68s" }}>
            {children}
          </div>
        )}
      </div>

      {/* Stats strip at the bottom */}
      {stats && stats.length > 0 && (
        <div
          className="hero-fade-up relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-5 md:justify-between">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="hero-fade-up flex items-baseline gap-2 text-center"
                style={{ animationDelay: `${1.0 + i * 0.1}s` }}
              >
                <span className="text-2xl font-black tabular-nums text-white md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-sm text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
