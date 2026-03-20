import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Share2,
  Building2,
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Свързване към Мрежата | Solaron",
  description:
    "Научете как да свържете фотоволтаичната си система към електрическата мрежа в България. Три типа присъединяване, ЗЕВИ, гаранции и процедури.",
};

const connectionTypes = [
  {
    icon: Zap,
    title: "За Собствени Нужди",
    description:
      "Произведената електрическа енергия се използва изцяло за захранване на обекта. Излишъкът не се подава към мрежата. Подходящо за домакинства с висока дневна консумация, които могат да оползотворят по-голямата част от производството.",
    pros: [
      "Без нужда от договор за изкупуване",
      "По-опростена процедура",
      "Без 5% такса към ФСЕС",
    ],
  },
  {
    icon: Share2,
    title: "Изцяло за Продажба",
    description:
      "Цялата произведена електроенергия се изкупува от мрежовия оператор на преференциални цени (за системи до 30 kW) или по свободен пазар. Подходящо за инвеститори и обекти с ниска собствена консумация.",
    pros: [
      "Преференциални цени за до 30 kW",
      "Стабилен приходен поток",
      "Подходящо за инвестиция",
    ],
  },
  {
    icon: Building2,
    title: "Комбиниран Вариант",
    description:
      "Най-популярният модел. Произведената енергия се използва за собствени нужди, а излишъкът се продава на свободния пазар или по договор с търговец. Осигурява максимална гъвкавост и оптимална възвръщаемост.",
    pros: [
      "Максимална гъвкавост",
      "Спестявания + приходи от излишък",
      "Оптимална възвръщаемост",
    ],
  },
];

const processSteps = [
  "Подаване на искане за проучване към ЕРП",
  "Получаване на становище за присъединяване (валидно 6 месеца)",
  "Сключване на договор за присъединяване",
  "Проектиране и изграждане на съоръженията",
  "Договор за изкупуване на произведената енергия",
  "Фактическо присъединяване и пускане под напрежение",
];

const operators = [
  {
    name: "Електроразпределение Юг (EVN)",
    region: "Южна България",
    url: "https://www.evn.bg/",
  },
  {
    name: "Електроразпределителни Мрежи Запад (ЧЕЗ)",
    region: "Западна България",
    url: "https://www.cez.bg/",
  },
  {
    name: "Електроразпределение Север (Енерго-Про)",
    region: "Северна България",
    url: "https://www.energo-pro.bg/",
  },
];

export default function GridConnectionPage() {
  return (
    <main>
      <SectionWrapper background="white">
        <div className="pt-24 md:pt-28 pb-16 md:pb-24">
          <Badge variant="accent">КАК РАБОТИ</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Свързване към Електрическата Мрежа
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground-secondary">
            Разберете как да свържете вашата фотоволтаична система към
            електрическата мрежа в България. Три типа присъединяване, актуални
            изисквания по ЗЕВИ и стъпки за одобрение.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          label="ТИПОВЕ ПРИСЪЕДИНЯВАНЕ"
          title="Три Начина за Свързване"
          subtitle="Изберете модела, който най-добре отговаря на вашите нужди"
          align="center"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {connectionTypes.map((type) => (
            <Card key={type.title} className="p-6">
              <type.icon className="h-10 w-10 text-accent" />
              <h3 className="mt-4 font-display text-xl font-bold">
                {type.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                {type.description}
              </p>
              <ul className="mt-4 space-y-2">
                {type.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-2 text-sm text-foreground-secondary"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {pro}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          label="ЗЕВИ"
          title="Промени в Закона от Октомври 2023"
          align="left"
        />
        <div className="mt-8 rounded-xl border border-border bg-background-card p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-warning" />
            <div>
              <h3 className="font-display text-lg font-bold">
                Закон за Енергията от Възобновяеми Източници (ЗЕВИ)
              </h3>
              <p className="mt-2 text-foreground-secondary">
                Съгласно ЗИД на ЗЕВИ, в сила от 13.10.2023 г., лицата, които са
                заявили присъединяване на обекти за производство на електрическа
                енергия от ВИ, трябва да предоставят гаранция в полза на
                оператора на електрическата мрежа.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          label="ГАРАНЦИИ"
          title="Изисквания за Гаранция"
          align="left"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-success" />
              <div>
                <h3 className="font-display text-lg font-bold">
                  До 10.8 kW
                </h3>
                <p className="text-foreground-secondary">
                  Не се изисква гаранция
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground-secondary">
              За инсталации до 10.8 kW инсталирана мощност не се предоставя
              гаранция към мрежовия оператор. Това улеснява значително процеса за
              домашни системи.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div>
                <h3 className="font-display text-lg font-bold">
                  Над 10.8 kW
                </h3>
                <p className="text-foreground-secondary">
                  ~50 лв. на kW (~50 000 лв./MW)
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground-secondary">
              За по-големи системи се изисква банкова гаранция или депозит в
              размер на 50 000 лв. за всеки мегават присъединена мощност.
              Гаранцията може да бъде банкова или под формата на депозит.
            </p>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          label="ПРОЦЕДУРА"
          title="Стъпки за Присъединяване"
          align="left"
        />
        <div className="mt-8 space-y-4">
          {processSteps.map((step, i) => (
            <div key={i}>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-background-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-foreground-secondary">{step}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="flex justify-start pl-7">
                  <ArrowDown className="h-5 w-5 text-foreground-tertiary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          label="ОПЕРАТОРИ"
          title="Електроразпределителни Дружества"
          subtitle="Подайте заявление за проучване към оператора на вашия регион"
          align="left"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {operators.map((op) => (
            <Card key={op.name} className="p-6">
              <h3 className="font-display text-lg font-bold">{op.name}</h3>
              <p className="mt-1 text-sm text-foreground-secondary">
                {op.region}
              </p>
              <a
                href={op.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
              >
                Посетете сайта <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            Нуждаете се от Помощ със Свързването?
          </h2>
          <p className="max-w-xl text-foreground-secondary">
            Нашият екип ще ви съдейства през целия процес на присъединяване към
            мрежата – от заявлението до пускането под напрежение.
          </p>
          <div className="flex gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/konfigurator">Конфигурирай Система</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/kontakti">Свържете се с Нас</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
