"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Sun, Cpu, Battery, Wrench, Monitor, Zap,
  Home, Building2, Factory, Tractor, Car, Wifi,
  BookOpen, Settings, Network, Calculator, CreditCard, TrendingUp,
  ChevronDown, Menu, X, ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { SolaronLogo } from "@/components/ui/solaron-logo";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const PRODUKTY = [
  { label: "Соларни Панели", href: "/produkti/solarni-paneli", icon: Sun, desc: "MWT модули, 21.5% ефективност" },
  { label: "Инвертори", href: "/produkti/invertori", icon: Cpu, desc: "SolarEdge HD-Wave, 99.5% ефективност" },
  { label: "Батерии", href: "/produkti/baterii", icon: Battery, desc: "LFP съхранение, 6000+ цикъла" },
  { label: "Конструкции", href: "/produkti/konstrukcii", icon: Wrench, desc: "Van der Valk, 15 год. гаранция" },
  { label: "Мониторинг", href: "/produkti/monitoring", icon: Monitor, desc: "Реално време, панел по панел", isNew: true },
  { label: "EV Зарядни", href: "/produkti/ev-zaryadni-stantsii", icon: Zap, desc: "Интелигентно зареждане за дома", isNew: true },
];

const RESHENIYA = [
  { label: "За Дома", href: "/resheniya/za-doma", icon: Home, desc: "До 80% спестявания от ток" },
  { label: "За Бизнеса", href: "/resheniya/za-biznesa", icon: Building2, desc: "Намалете оперативните разходи" },
  { label: "За Индустрията", href: "/resheniya/za-industriyata", icon: Factory, desc: "Мащабни системи за максимална ефективност" },
  { label: "За Земеделието", href: "/resheniya/za-zemedelieto", icon: Tractor, desc: "Агриволтаици и системи за стопанства" },
  { label: "Соларен Карпорт", href: "/resheniya/solaren-karport", icon: Car, desc: "Паркинг + чиста енергия" },
  { label: "Автономни Системи", href: "/resheniya/avtonomni-sistemi", icon: Wifi, desc: "Независимост от електрическата мрежа" },
];

const KAK_RABOTI = [
  { label: "Слънчева Енергия", href: "/kak-raboti/slancheva-energiya", icon: BookOpen, desc: "Как работят соларните панели" },
  { label: "Процес на Монтаж", href: "/kak-raboti/protsesa-na-montazh", icon: Settings, desc: "От оглед до активиране" },
  { label: "Свързване към Мрежата", href: "/kak-raboti/svurzvane-kum-mrezhata", icon: Network, desc: "Нетно отчитане и мрежова връзка" },
  { label: "Нетно Отчитане", href: "/kak-raboti/netno-metering", icon: Calculator, desc: "Продавайте излишната енергия" },
  { label: "Финансиране", href: "/kak-raboti/finansirane", icon: CreditCard, desc: "Кредит, лизинг, субсидии" },
  { label: "Възвръщаемост", href: "/kak-raboti/vuzvrashchaemost", icon: TrendingUp, desc: "ROI калкулатор и прогнози" },
];

const DIRECT_LINKS = [
  { label: "Конфигуратор", href: "/konfigurator" },
  { label: "Проекти", href: "/proekti" },
  { label: "Блог", href: "/blog" },
] as const;

function CSSFlag({ stripes, vertical = false, size = "w-8 h-5.5" }: { stripes: string[]; vertical?: boolean; size?: string }) {
  return (
    <div className={cn(size, "flex", vertical ? "flex-row" : "flex-col")}>
      {stripes.map((color, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

function UKFlag({ size = "w-8 h-5.5" }: { size?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={size}>
      <rect width="60" height="40" fill="#012169" />
      <polygon points="0,0 24,13.3 24,0" fill="#fff" />
      <polygon points="36,0 60,0 60,13.3 36,0" fill="#fff" />
      <polygon points="0,40 24,26.7 24,40" fill="#fff" />
      <polygon points="36,40 60,40 60,26.7" fill="#fff" />
      <polygon points="0,0 20,13.3" fill="#C8102E" />
      <polygon points="60,0 40,13.3" fill="#C8102E" />
      <polygon points="0,40 20,26.7" fill="#C8102E" />
      <polygon points="60,40 40,26.7" fill="#C8102E" />
      <rect x="25" width="10" height="40" fill="#fff" />
      <rect y="15" width="60" height="10" fill="#fff" />
      <rect x="27" width="6" height="40" fill="#C8102E" />
      <rect y="17" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}

function GreeceFlag({ size = "w-8 h-5.5" }: { size?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={size}>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} y={i * (40/9)} width="60" height={40/9} fill={i % 2 === 0 ? "#0D5EAF" : "#fff"} />
      ))}
      <rect width="22" height="20" fill="#0D5EAF" />
      <rect x="8.5" width="5" height="20" fill="#fff" />
      <rect y="7.5" width="22" height="5" fill="#fff" />
    </svg>
  );
}

const COUNTRY_OPTIONS: {
  code: string;
  native: string;
  english: string;
  flag: React.ReactNode;
  comingSoon: boolean;
}[] = [
  { code: "bg", native: "Български", english: "Bulgaria", flag: <CSSFlag stripes={["#fff", "#00966E", "#D62612"]} />, comingSoon: false },
  { code: "en", native: "English", english: "International", flag: <UKFlag />, comingSoon: false },
  { code: "ro", native: "Romana", english: "Romania", flag: <CSSFlag stripes={["#002B7F", "#FCD116", "#CE1126"]} vertical />, comingSoon: true },
  { code: "rs", native: "Srpski", english: "Serbia", flag: <CSSFlag stripes={["#C6363C", "#0C4076", "#fff"]} />, comingSoon: true },
  { code: "gr", native: "Ellinika", english: "Greece", flag: <GreeceFlag />, comingSoon: true },
  { code: "hr", native: "Hrvatski", english: "Croatia", flag: <CSSFlag stripes={["#FF0000", "#fff", "#171796"]} />, comingSoon: true },
  { code: "mk", native: "Makedonski", english: "North Macedonia", flag: <CSSFlag stripes={["#CE2028", "#F9D616", "#CE2028"]} />, comingSoon: true },
  { code: "al", native: "Shqip", english: "Albania", flag: <CSSFlag stripes={["#E41E20", "#E41E20"]} />, comingSoon: true },
  { code: "me", native: "Crnogorski", english: "Montenegro", flag: <CSSFlag stripes={["#C8102E", "#D4AF37", "#C8102E"]} />, comingSoon: true },
  { code: "ba", native: "Bosanski", english: "Bosnia & Herz.", flag: <CSSFlag stripes={["#002395", "#002395"]} />, comingSoon: true },
  { code: "si", native: "Slovenscina", english: "Slovenia", flag: <CSSFlag stripes={["#fff", "#003DA5", "#ED1C24"]} />, comingSoon: true },
  { code: "tr", native: "Turkce", english: "Turkey", flag: <CSSFlag stripes={["#E30A17", "#E30A17"]} />, comingSoon: true },
];

function useLocaleHref() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const bgHref = pathname.startsWith("/en")
    ? pathname === "/en"
      ? "/"
      : pathname.replace(/^\/en/, "") || "/"
    : pathname;
  const enHref = pathname.startsWith("/en")
    ? pathname
    : `/en${pathname === "/" ? "" : pathname}`;
  return { isEn, bgHref, enHref };
}

function RichMegaMenu({
  items,
  featuredTitle,
  featuredDesc,
  featuredHref,
  featuredImage,
}: {
  items: { label: string; href: string; icon: LucideIcon; desc: string; isNew?: boolean }[];
  featuredTitle: string;
  featuredDesc: string;
  featuredHref: string;
  featuredImage?: string;
}) {
  const half = Math.ceil(items.length / 2);
  const col1 = items.slice(0, half);
  const col2 = items.slice(half);

  const renderItem = (item: (typeof items)[number]) => (
    <NavigationMenu.Link asChild key={item.href}>
      <Link
        href={item.href}
        className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-background-secondary"
      >
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary/50 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
          <item.icon className="size-4" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            {item.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Ново
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-foreground-tertiary line-clamp-1">{item.desc}</p>
        </div>
      </Link>
    </NavigationMenu.Link>
  );

  return (
    <div className="grid grid-cols-[1fr_1fr_180px] gap-0">
      <div className="p-3">
        <div className="grid gap-0.5">
          {col1.map(renderItem)}
        </div>
      </div>
      <div className="p-3 border-l border-border/50">
        <div className="grid gap-0.5">
          {col2.map(renderItem)}
        </div>
      </div>

      <div className="border-l border-border bg-background-secondary/30 p-3">
        <Link href={featuredHref} className="group block h-full">
          {featuredImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
              <Image
                src={featuredImage}
                alt={featuredTitle}
                fill
                sizes="180px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <p className="text-sm font-bold text-foreground">{featuredTitle}</p>
          <p className="mt-1 text-xs text-foreground-tertiary">{featuredDesc}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent">
            Научи повече
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function DesktopNav({ isTransparent = false }: { isTransparent?: boolean }) {
  const triggerClass = cn(
    "group inline-flex h-10 items-center gap-1 rounded-lg px-2.5 text-sm font-medium",
    "outline-none transition-colors duration-200",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    isTransparent
      ? "text-white/90 hover:bg-white/10 data-[state=open]:bg-white/10"
      : "text-foreground hover:bg-foreground/[0.06] data-[state=open]:bg-foreground/[0.06]",
  );

  const directLinkClass = cn(
    "inline-flex h-10 items-center rounded-lg px-2.5 text-sm font-medium",
    "outline-none transition-colors duration-200",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    isTransparent
      ? "text-white/90 hover:bg-white/10"
      : "text-foreground hover:bg-foreground/[0.06]",
  );

  const contentClass = cn(
    "left-0 top-0 w-[min(calc(100vw-2rem),44rem)] rounded-xl border border-border bg-background shadow-elevated",
    "data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out",
    "data-[motion=from-start]:fade-in data-[motion=from-end]:fade-in data-[motion=to-start]:fade-out data-[motion=to-end]:fade-out",
    "data-[motion=from-end]:slide-in-from-right-3 data-[motion=from-start]:slide-in-from-left-3",
    "data-[motion=to-end]:slide-out-to-right-3 data-[motion=to-start]:slide-out-to-left-3",
    "duration-200",
  );

  return (
    <NavigationMenu.Root
      className="relative z-10 hidden lg:flex lg:flex-1 lg:justify-center"
      delayDuration={80}
      skipDelayDuration={200}
    >
      <NavigationMenu.List
        className="flex list-none items-center gap-0.5 p-0"
        aria-label="Основна навигация"
      >
        <NavigationMenu.Item value="produkti">
          <NavigationMenu.Trigger className={triggerClass}>
            Продукти
            <ChevronDown
              className="size-4 shrink-0 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentClass}>
            <RichMegaMenu
              items={PRODUKTY}
              featuredTitle="Соларни Панели MWT"
              featuredDesc="Ново поколение модули с 30 год. гаранция"
              featuredHref="/produkti/solarni-paneli"
              featuredImage="/real/installations/adoreenergy-c1.jpg"
            />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="resheniya">
          <NavigationMenu.Trigger className={triggerClass}>
            Решения
            <ChevronDown
              className="size-4 shrink-0 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentClass}>
            <RichMegaMenu
              items={RESHENIYA}
              featuredTitle="За Дома"
              featuredDesc="Спестете до 80% от сметката за ток"
              featuredHref="/resheniya/za-doma"
              featuredImage="/real/projects/5kw-kran-1.jpg"
            />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="kak-raboti">
          <NavigationMenu.Trigger className={triggerClass}>
            Как Работи
            <ChevronDown
              className="size-4 shrink-0 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentClass}>
            <RichMegaMenu
              items={KAK_RABOTI}
              featuredTitle="Конфигуратор"
              featuredDesc="Визуализирайте и изчислете вашата система"
              featuredHref="/konfigurator"
              featuredImage="/real/installations/step-02-design.jpg"
            />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {DIRECT_LINKS.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <Link href={link.href} className={directLinkClass}>
                {link.label}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <div className="absolute left-1/2 top-full -translate-x-1/2 flex justify-center [perspective:2000px]" style={{ width: "min(calc(100vw - 2rem), 44rem)" }}>
        <NavigationMenu.Viewport
          className={cn(
            "origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border border-transparent bg-transparent shadow-none",
            "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in",
            "md:w-[var(--radix-navigation-menu-viewport-width)]",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

function MobileNavSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { isEn, bgHref, enHref } = useLocaleHref();
  const prevPathRef = React.useRef(pathname);

  React.useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      onOpenChange(false);
    }
  }, [pathname, onOpenChange]);

  const linkRow = cn(
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground",
    "transition-colors hover:bg-background-secondary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  const accordionTrigger = cn(
    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-left text-base font-semibold text-foreground",
    "outline-none transition-colors hover:bg-background-secondary",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&[data-state=open]>svg]:rotate-180",
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-[100] bg-foreground/35 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "duration-300",
          )}
        />
        <Dialog.Content
          id="mobile-navigation"
          className={cn(
            "fixed inset-y-0 right-0 z-[101] flex h-full w-full max-w-[min(100vw,22rem)] flex-col border-l border-border bg-background shadow-elevated",
            "outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300",
            "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
          )}
        >
          <Dialog.Description className="sr-only">
            Навигация по сайта на Solaron — продукти, решения и контакти.
          </Dialog.Description>
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4">
            <Dialog.Title className="font-display text-lg font-bold tracking-wide text-foreground">
              Меню
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-lg text-foreground",
                  "transition-colors hover:bg-background-secondary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label="Затвори меню"
              >
                <X className="size-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-8 pt-2">
            <Accordion.Root type="single" collapsible className="space-y-1">
              <Accordion.Item value="produkti" className="border-b border-border/80">
                <Accordion.Header>
                  <Accordion.Trigger className={accordionTrigger}>
                    Продукти
                    <ChevronDown
                      className="size-4 shrink-0 opacity-70 transition-transform duration-200"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <ul className="space-y-0.5 pb-3 pl-1" role="list">
                    {PRODUKTY.map((item) => (
                      <li key={item.href}>
                        <Dialog.Close asChild>
                          <Link href={item.href} className={linkRow}>
                            <item.icon className="size-4 shrink-0 text-accent" aria-hidden />
                            {item.label}
                          </Link>
                        </Dialog.Close>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="resheniya" className="border-b border-border/80">
                <Accordion.Header>
                  <Accordion.Trigger className={accordionTrigger}>
                    Решения
                    <ChevronDown
                      className="size-4 shrink-0 opacity-70 transition-transform duration-200"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <ul className="space-y-0.5 pb-3 pl-1" role="list">
                    {RESHENIYA.map((item) => (
                      <li key={item.href}>
                        <Dialog.Close asChild>
                          <Link href={item.href} className={linkRow}>
                            <item.icon className="size-4 shrink-0 text-accent" aria-hidden />
                            {item.label}
                          </Link>
                        </Dialog.Close>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="kak-raboti" className="border-b border-border/80">
                <Accordion.Header>
                  <Accordion.Trigger className={accordionTrigger}>
                    Как Работи
                    <ChevronDown
                      className="size-4 shrink-0 opacity-70 transition-transform duration-200"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <ul className="space-y-0.5 pb-3 pl-1" role="list">
                    {KAK_RABOTI.map((item) => (
                      <li key={item.href}>
                        <Dialog.Close asChild>
                          <Link href={item.href} className={linkRow}>
                            <item.icon className="size-4 shrink-0 text-accent" aria-hidden />
                            {item.label}
                          </Link>
                        </Dialog.Close>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            <nav className="mt-2 space-y-1 border-b border-border/80 pb-4" aria-label="Директни връзки">
              {DIRECT_LINKS.map((link) => (
                <Dialog.Close asChild key={link.href}>
                  <Link href={link.href} className={cn(linkRow, "py-3 font-semibold")}>
                    {link.label}
                  </Link>
                </Dialog.Close>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <Dialog.Close asChild>
                <Link
                  href="https://wa.me/359896699009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-base font-semibold text-white",
                    "shadow-soft transition-colors hover:bg-accent-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <WhatsAppIcon className="size-5" />
                  Безплатна Консултация
                </Link>
              </Dialog.Close>

              <div className="space-y-2" role="group" aria-label="Език">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground-tertiary px-1">Държава</p>
                <Dialog.Close asChild>
                  <Link
                    href={bgHref}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                      !isEn ? "border-accent/30 bg-accent/5" : "border-border hover:bg-background-secondary",
                    )}
                  >
                    <CSSFlag stripes={["#fff", "#00966E", "#D62612"]} size="w-7 h-5" />
                    <span className="text-sm font-semibold text-foreground">Български</span>
                    {!isEn && <div className="ml-auto size-2 rounded-full bg-accent" />}
                  </Link>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link
                    href={enHref}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                      isEn ? "border-accent/30 bg-accent/5" : "border-border hover:bg-background-secondary",
                    )}
                  >
                    <UKFlag size="w-7 h-5" />
                    <span className="text-sm font-semibold text-foreground">English</span>
                    {isEn && <div className="ml-auto size-2 rounded-full bg-accent" />}
                  </Link>
                </Dialog.Close>
                <p className="text-[11px] text-foreground-tertiary px-1">
                  + 10 държави от Балканите — скоро
                </p>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [langOverlayOpen, setLangOverlayOpen] = React.useState(false);
  const { isEn, bgHref, enHref } = useLocaleHref();
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/en";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHomepage && !scrolled;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        isTransparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border/80 bg-background/95 backdrop-blur-md shadow-soft",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            "shrink-0",
            "outline-none transition-opacity hover:opacity-80",
            "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <Image
            src="/logo-solaron.png"
            alt="Solaron"
            width={160}
            height={27}
            className={cn("h-7 w-auto sm:h-8 transition-all duration-300", isTransparent && "brightness-0 invert")}
            priority
          />
        </Link>

        <DesktopNav isTransparent={isTransparent} />

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link
            href="https://wa.me/359896699009"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300",
              isTransparent
                ? "border border-white/30 text-white hover:bg-white/15 hover:border-white/50"
                : "bg-accent text-white shadow-soft hover:bg-accent-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            )}
          >
            <WhatsAppIcon className="size-4" />
            Безплатна Консултация
          </Link>

          <button
            type="button"
            onClick={() => setLangOverlayOpen(true)}
            className="relative flex items-center justify-center size-8 rounded-full overflow-hidden border-2 border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            aria-label="Change language"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none z-10 rounded-full" />
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-[#00966E]" />
              <div className="flex-1 bg-[#D62612]" />
            </div>
          </button>
        </div>

        <div className="ml-auto flex items-center lg:ml-0 lg:hidden">
          <MobileNavSheet open={mobileOpen} onOpenChange={setMobileOpen} />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-lg transition-colors",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-foreground/[0.06]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label="Отвори меню"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {langOverlayOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-xl overflow-y-auto py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setLangOverlayOpen(false)}
            className="absolute top-6 right-6 z-10 flex size-10 items-center justify-center rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          <motion.div
            className="w-full max-w-3xl px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Изберете държава
              </h2>
              <p className="text-foreground-secondary">Choose your country and language</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {COUNTRY_OPTIONS.map((country) => {
                const isActive = country.code === "bg" ? !isEn : country.code === "en" ? isEn : false;
                const href = country.code === "bg" ? bgHref : country.code === "en" ? enHref : undefined;

                if (country.comingSoon) {
                  return (
                    <div
                      key={country.code}
                      className="relative flex items-center gap-3 rounded-xl border border-border/60 bg-stone-50/50 p-3 opacity-60"
                    >
                      <div className="shrink-0 overflow-hidden rounded shadow-sm">
                        {country.flag}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">{country.native}</p>
                        <p className="text-[11px] text-foreground-tertiary truncate">{country.english}</p>
                      </div>
                      <span className="absolute top-1.5 right-1.5 rounded-full bg-foreground/8 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground-tertiary">
                        скоро
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={country.code}
                    href={href!}
                    onClick={() => setLangOverlayOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border-2 p-3 transition-all duration-200 hover:shadow-md",
                      isActive
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-border hover:border-accent/40",
                    )}
                  >
                    <div className="shrink-0 overflow-hidden rounded shadow-sm group-hover:shadow-md transition-shadow">
                      {country.flag}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">{country.native}</p>
                      <p className="text-[11px] text-foreground-tertiary truncate">{country.english}</p>
                    </div>
                    {isActive && (
                      <div className="size-2 shrink-0 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-foreground-tertiary">
              Solaron разширява присъствието си в региона. Следете за нови държави.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
