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

import { cn } from "@/lib/utils";
import { SolaronLogo } from "@/components/ui/solaron-logo";

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
                  href="/kontakti"
                  className={cn(
                    "flex h-12 w-full items-center justify-center rounded-full bg-accent text-base font-semibold text-white",
                    "shadow-soft transition-colors hover:bg-accent-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  Безплатна Консултация
                </Link>
              </Dialog.Close>

              <div
                className="flex items-center justify-center gap-1 rounded-lg border border-border bg-background-secondary/80 p-1"
                role="group"
                aria-label="Език"
              >
                <Link
                  href={bgHref}
                  className={cn(
                    "min-h-10 flex-1 rounded-md px-3 py-2 text-center text-sm font-semibold transition-colors",
                    !isEn
                      ? "bg-background text-foreground shadow-soft"
                      : "text-foreground-secondary hover:text-foreground",
                  )}
                  aria-current={!isEn ? "true" : undefined}
                >
                  BG
                </Link>
                <Link
                  href={enHref}
                  className={cn(
                    "min-h-10 flex-1 rounded-md px-3 py-2 text-center text-sm font-semibold transition-colors",
                    isEn
                      ? "bg-background text-foreground shadow-soft"
                      : "text-foreground-secondary hover:text-foreground",
                  )}
                  aria-current={isEn ? "true" : undefined}
                >
                  EN
                </Link>
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
          <SolaronLogo variant={isTransparent ? "white" : "dark"} />
        </Link>

        <DesktopNav isTransparent={isTransparent} />

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link
            href="/kontakti"
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all duration-300",
              isTransparent
                ? "border border-white/30 text-white hover:bg-white/15 hover:border-white/50"
                : "bg-accent text-white shadow-soft hover:bg-accent-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            )}
          >
            Безплатна Консултация
          </Link>

          <div
            className={cn(
              "flex items-center rounded-lg p-0.5 transition-all duration-300",
              isTransparent
                ? "border border-white/20 bg-white/10 backdrop-blur-sm"
                : "border border-border bg-background-secondary/60",
            )}
            role="group"
            aria-label="Език"
          >
            <Link
              href={bgHref}
              className={cn(
                "min-h-9 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                isTransparent
                  ? (!isEn ? "bg-white/20 text-white" : "text-white/60 hover:text-white")
                  : (!isEn ? "bg-background text-foreground shadow-soft" : "text-foreground-secondary hover:text-foreground"),
              )}
              aria-current={!isEn ? "true" : undefined}
            >
              BG
            </Link>
            <Link
              href={enHref}
              className={cn(
                "min-h-9 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                isTransparent
                  ? (isEn ? "bg-white/20 text-white" : "text-white/60 hover:text-white")
                  : (isEn ? "bg-background text-foreground shadow-soft" : "text-foreground-secondary hover:text-foreground"),
              )}
              aria-current={isEn ? "true" : undefined}
            >
              EN
            </Link>
          </div>
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
  );
}
