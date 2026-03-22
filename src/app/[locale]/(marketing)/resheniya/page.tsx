import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Home, Building2, Factory, Tractor, Car, BatteryCharging, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Решения | Solaron",
  description: "Соларни решения за дома, бизнеса, индустрията, земеделието, карпорт и автономни системи. Намерете перфектното решение за вашите нужди.",
};

const solutions = [
  {
    href: "/resheniya/za-doma",
    icon: Home,
    title: "За Дома",
    subtitle: "До 80% спестявания",
    description: "Домашни фотоволтаични системи от 3 до 15 kWp с пълна интеграция — панели, инвертор, батерия и мониторинг.",
    stats: ["80% спестявания", "5-7 г. възвръщаемост", "30 г. гаранция"],
    accent: "from-green-500/20 to-emerald-500/10",
  },
  {
    href: "/resheniya/za-biznesa",
    icon: Building2,
    title: "За Бизнеса",
    subtitle: "Намалете оперативните разходи",
    description: "Търговски соларни системи от 15 до 100 kWp. Данъчни облекчения, бърза възвръщаемост и зелен имидж за вашия бранд.",
    stats: ["40-60% спестявания", "3-5 г. ROI", "25% данъчно облекчение"],
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    href: "/resheniya/za-industriyata",
    icon: Factory,
    title: "За Индустрията",
    subtitle: "Мащабни системи за максимална ефективност",
    description: "Индустриални соларни системи от 100 kWp до MW мащаб. Пикова оптимизация, grid independence и пълен енергиен одит.",
    stats: ["MW капацитет", "50% пиково намаление", "2-4 г. ROI"],
    accent: "from-orange-500/20 to-amber-500/10",
  },
  {
    href: "/resheniya/za-zemedelieto",
    icon: Tractor,
    title: "За Земеделието",
    subtitle: "Агриволтаици и системи за стопанства",
    description: "Двойно използване на земята — соларни панели над култури. Помпени системи, субсидии и устойчиво земеделие.",
    stats: ["30% двойно ползване", "100% помпена енергия", "40% субсидии"],
    accent: "from-yellow-500/20 to-lime-500/10",
  },
  {
    href: "/resheniya/solaren-karport",
    icon: Car,
    title: "Соларен Карпорт",
    subtitle: "Паркинг + чиста енергия",
    description: "Соларни навеси за паркинги с интегрирано EV зареждане. Двоен приход — от паркиране и от енергия.",
    stats: ["270 kWp референция", "EV интеграция", "IP65 защита"],
    accent: "from-purple-500/20 to-violet-500/10",
  },
  {
    href: "/resheniya/avtonomni-sistemi",
    icon: BatteryCharging,
    title: "Автономни Системи",
    subtitle: "Независимост от електрическата мрежа",
    description: "Off-grid системи за отдалечени локации, планински къщи и резервно захранване. 100% енергийна независимост.",
    stats: ["100% независимост", "3-7 дни автономия", "99.9% uptime"],
    accent: "from-teal-500/20 to-emerald-500/10",
  },
];

export default function ResheniyaPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[60vh] flex items-end bg-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28 pt-32">
          <p className="editorial-overline mb-4">Решения</p>
          <h1 className="editorial-hero-sm text-white">
            Соларно решение за всяка нужда
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/70 font-body">
            От домашни системи до индустриални централи — намерете перфектното решение за вашите енергийни нужди.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <Link key={sol.href} href={sol.href as never} className="group">
                  <div className="relative h-full rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${sol.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
                    <div className="relative">
                      <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3.5">
                        <Icon className="size-7 text-accent" />
                      </div>
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-1">{sol.title}</h2>
                      <p className="text-sm text-accent font-medium mb-3">{sol.subtitle}</p>
                      <p className="text-foreground-secondary leading-relaxed mb-6">{sol.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {sol.stats.map((stat) => (
                          <span key={stat} className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-foreground-secondary">
                            {stat}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                        Научете повече <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
