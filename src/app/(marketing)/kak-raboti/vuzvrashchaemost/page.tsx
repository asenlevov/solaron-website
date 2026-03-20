import type { Metadata } from "next";
import Link from "next/link";
import { Compass, ExternalLink, LineChart, SunDim, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Възвръщаемост на Инвестицията | Solaron",
  description:
    "Фактори за ROI на соларна инсталация: ориентация, сенки, профил на консумация и цени на тока. PVGIS на JRC, примери от портфолиото и връзка към калкулаторите на Solaron.",
};

export default function VuzvrashchaemostPage() {
  return (
    <>
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6">
            ROI
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Възвръщаемост на Инвестицията в Соларни Панели
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Възвръщаемостта (ROI) на фотоволтаична система е съотношението между спестените разходи
            за електроенергия (и евентуални приходи от продажба на излишък) и първоначалната
            инвестиция. Тя не е едно число „за всички“ — зависи от геометрията на покрива, климата
            на локацията, вашия профил на консумация и бъдещите цени на тока.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="ФАКТОРИ"
          title="Какво оформя реалното изплащане"
          subtitle="Ориентацията на панелите определя колко часове в деня модулите работят близо до оптималната си мощност. В Северна България същото kWp, монтирано на север без корекция, произвежда значително по-малко годишно kWh от южно изложение. Сенките от комини, съседни сгради и дървета намаляват ефективната мощност на низовете и могат да променят динамиката на инвертора — дори малко засенчване не е „пропорционално намаление“, а често създава неравномерни токове по стринговете."
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Compass className="size-8 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Ориентация и наклон
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
              Южните покриви с умерен наклон обикновено дават максимален годишен добив в България.
              Източни и западни конфигурации разпределят производството по часове — понякога по-добре
              съвпадат с консумация сутрин/вечер, но намаляват общия годишен обем. Това е компромис,
              който инженерите оценяват със софтуер за сенки и симулации.
            </p>
          </Card>
          <Card>
            <SunDim className="size-8 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Сенки и замърсяване
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
              Дифузната светлина все още носи енергия, но директните сенки върху част от панелите
              влошават MPPT баланса. Прашните панели губят няколко процента — сезонното почистване
              възстановява загубите. Тези ефекти не са отделни от икономиката: те влизат във
              финалния kWh/година и директно местят срока на изплащане.
            </p>
          </Card>
          <Card>
            <Zap className="size-8 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Профил на консумация
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
              Дом с постоянна дневна консумация (офис у дома, отопление с термопомпа, охлаждане)
              използва по-голяма част от произведената енергия на място. Ако домът е празен денем,
              по-голям дял отива към мрежата и се оценява по пазарни правила — това променя
              ефективния „лев на kWh“ спрямо чистото самопотребление.
            </p>
          </Card>
          <Card>
            <LineChart className="size-8 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Цени на електроенергията
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
              Спестяването е продукт от годишно производство × цена на покупка от мрежата (плюс
              такси). Тъй като тарифите се променят, в прогнозите често се добавя умерен годишен
              растеж — нашите калкулатори използват консервативни параметри, за да не надценяваме
              бъдещите ползи.
            </p>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          align="left"
          label="ИНСТРУМЕНТИ"
          title="PVGIS на JRC за прогноза на производство"
          subtitle="Европейската комисия поддържа безплатния инструмент PVGIS (Photovoltaic Geographical Information System) в рамките на Обсерваторията на Joint Research Centre (JRC). Той комбинира сателитни данни за слънчев ресурс с типови параметри на инсталацията и дава оценка за годишно производство по kWh/kWp за избрана точка на картата."
          className="mb-10"
        />
        <div className="space-y-5 font-body text-base leading-relaxed text-foreground-secondary">
          <p>
            При използване на PVGIS важно е да въведете реалистични загуби (инвертор, окабеляване,
            замърсяване) и съотношение между монтирана и номинална мощност. Резултатът е ориентир
            за проектиране, а не гаранция — микроклиматът на покрива, сенките и качеството на
            монтажа винаги внасят отклонение. Solaron прилага същите принципи при оглед на място и
            при съвместяване с нашите вътрешни калкулации за клиента.
          </p>
          <p>
            <a
              href="https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline"
            >
              PVGIS — JRC
              <ExternalLink className="size-4" aria-hidden />
            </a>
            &nbsp;е полезен за сравнение между различни наклони и азимути, преди да фиксирате
            финалния layout на модулите.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="ПРИМЕР"
          title="Реалистичен пример от портфолиото"
          subtitle="Ориентировъчни числа за типична резиденциална инсталация 5 kWp, добре ориентирана, без съществени сенки — в България често се получава около 6 500 kWh годишно производство, при типична цена на покупка от мрежата около 0,25 лв./kWh това прави порядък 1 625 лв. годишни спестявания преди инфлация на тарифите."
          className="mb-10"
        />
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-left font-body text-sm">
            <thead>
              <tr className="border-b border-border bg-background-secondary">
                <th className="px-4 py-3 font-semibold text-foreground">Показател</th>
                <th className="px-4 py-3 font-semibold text-foreground">Стойност</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-foreground-secondary">Инсталирана мощност</td>
                <td className="px-4 py-3 font-medium text-foreground">~5 kWp</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-foreground-secondary">Годишно производство (ориентир)</td>
                <td className="px-4 py-3 font-medium text-foreground">~6 500 kWh</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-foreground-secondary">Годишни спестявания при 0,25 лв./kWh</td>
                <td className="px-4 py-3 font-medium text-foreground">~1 625 лв.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-foreground-secondary">Индикативна цена на системата</td>
                <td className="px-4 py-3 font-medium text-foreground">~8 500 лв.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground-secondary">Индикативен срок на изплащане</td>
                <td className="px-4 py-3 font-medium text-accent">~5,2 години</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-6 font-body text-sm leading-relaxed text-foreground-secondary">
          Тези са обобщени и закръглени стойности за илюстрация — реалната оферта зависи от
          избраните модули, инвертор, конструкция, доставка и монтаж. Добавянето на батерия увеличава
          капиталовите разходи, но може да подобри самопотреблението, ако профилът на натоварване
          съвпада с нощна консумация.
        </p>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <div className="space-y-5 font-body text-base leading-relaxed text-foreground-secondary">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Защо ROI не е „етикет“, а процес
          </h2>
          <p>
            Добрата инсталация започва с точно измерване на консумацията, преглед на таблото и
            кабелните пътеки и оценка на бъдещи товари — например електромобил или подобна
            климатична инсталация. След монтажа реалните данни от мониторинга позволяват да
            коригирате поведението на товара (напр. бойлер, климатик) и да се приближите към
            прогнозите от PVGIS и нашите калкулатори.
          </p>
          <p>
            Ако сравнявате оферти, не гледайте само лв./Wp — гледайте гарантиите, качеството на
            монтажа и спецификацията на инвертора. Евтиният модул с лошо сенчест поле или
            подразмерен инвертор може да държи номинална мощност висока, но реалният kWh/година
            пада и ROI се разтяга.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-8 rounded-2xl border border-border bg-background-secondary/80 p-8 md:flex-row md:p-12",
          )}
        >
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Пресметнете с вашите параметри
            </h2>
            <p className="mt-3 font-body text-base text-foreground-secondary">
              ROI калкулаторът съчетава град, ориентация, сенки и консумация за 25-годишна прогноза.
            </p>
          </div>
          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link href="/instrumenti/roi-kalkulator">ROI калкулатор</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
