import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Sun, Wrench, PlugZap, Gauge, Landmark, LineChart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Как Работи | Solaron",
  description: "Научете как работи соларната енергия, процеса на монтаж, свързването към мрежата, нетното отчитане, финансирането и възвръщаемостта на инвестицията.",
};

const topics = [
  {
    href: "/kak-raboti/slancheva-energiya",
    icon: Sun,
    title: "Слънчева Енергия",
    description: "Фотоволтаичен ефект, компоненти на системата, соларна карта на България и сезонно производство.",
    tag: "Основи",
  },
  {
    href: "/kak-raboti/protsesa-na-montazh",
    icon: Wrench,
    title: "Процес на Монтаж",
    description: "6 стъпки от заявлението до пускане в експлоатация. Чеклист с документи, ЗЕВИ гаранции и мрежови оператори.",
    tag: "Процедура",
  },
  {
    href: "/kak-raboti/svurzvane-kum-mrezhata",
    icon: PlugZap,
    title: "Свързване към Мрежата",
    description: "Три начина за свързване — собствено потребление, продажба и комбинирано. ЗЕВИ регулации и процедура.",
    tag: "Технически",
  },
  {
    href: "/kak-raboti/netno-metering",
    icon: Gauge,
    title: "Нетно Отчитане",
    description: "Двупосочен електромер, пазарни цени, ФСЕС такса и оптимизация на самопотреблението.",
    tag: "Финансови",
  },
  {
    href: "/kak-raboti/finansirane",
    icon: Landmark,
    title: "Финансиране",
    description: "Субсидии, банкови кредити, лизингови модели и данъчни облекчения за соларни системи.",
    tag: "Финансови",
  },
  {
    href: "/kak-raboti/vuzvrashchaemost",
    icon: LineChart,
    title: "Възвръщаемост (ROI)",
    description: "Фактори за ROI, PVGIS прогнози, реален пример от портфолиото и изчисление на payback.",
    tag: "Финансови",
  },
];

export default function KakRabotiPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[60vh] flex items-end bg-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28 pt-32">
          <p className="editorial-overline mb-4">Ресурси</p>
          <h1 className="editorial-hero-sm text-white">
            Как работи соларната енергия
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/70 font-body">
            Всичко, което трябва да знаете — от физиката на фотоволтаиците до финансовата възвръщаемост.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <Link key={topic.href} href={topic.href as never} className="group">
                  <div className="relative h-full rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className="flex items-start justify-between mb-5">
                      <div className="inline-flex items-center justify-center rounded-xl bg-accent/10 p-3">
                        <Icon className="size-6 text-accent" />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-foreground-secondary">
                        {topic.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-accent/50">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="font-display text-xl font-bold tracking-tight">{topic.title}</h2>
                    </div>
                    <p className="text-foreground-secondary leading-relaxed mb-6">{topic.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
                      Прочетете <ArrowRight className="size-4" />
                    </span>
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
