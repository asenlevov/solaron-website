import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Leaf, Scale, Sun } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Нетно Отчитане | Solaron",
  description:
    "Как работи нетното отчитане в България, свободният пазар на електроенергия, такса към ФСЕС и кога е изгодно да продавате или самопотребявате енергия.",
};

export default function NetnoMeteringPage() {
  return (
    <>
      <SectionWrapper background="gray" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6">
            Нетно отчитане
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Нетно Отчитане и Продажба на Енергия
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Разберете как мрежата „записва“ вашето излишно производство, как се определят цените при
            продажба на свободния пазар и как да оптимизирате самопотреблението, за да максимизирате
            икономическия ефект от фотоволтаичната система.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="ОСНОВИ"
          title="Как работи нетното отчитане в България"
          subtitle="При нетно отчитане електромерът отчита разликата между произведената и потребената енергия за даден период. В месеци с по-силно слънце често произвеждате повече за деня, отколкото консумирате в същия момент — излишъкът се влива в мрежата; вечер и през зимата консумацията надхвърля производството и ползвате мрежата като „банка“."
          className="mb-10"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                <Sun className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Двупосочно отчитане
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
                  Практически това означава, че не плащате „два пъти“ за енергията, която сте
                  върнали в мрежата в рамките на нетния режим — важно е обаче да следите договора си
                  с доставчика и условията за изкупуване или продажба на излишъка, защото те се
                  развиват заедно с пазарните правила.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                <Gauge className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Двойна роля на инсталацията
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
                  Фотоволтаиците на покрива намаляват покупката от мрежата и едновременно с това
                  могат да генерират излишък, който се оценява по пазарни цени или по схема за
                  изкупуване — в зависимост от типа договор и категорията потребител. Това прави
                  планирането на консумация и съхранение (батерия) ключово за реалния доход.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-10 space-y-4 font-body text-base leading-relaxed text-foreground-secondary">
          <p>
            За домакинства и малки бизнеси съществен е и административният процес: проектиране,
            присъединяване към мрежата и съответствие с изискванията на ЕРП-тата. Solaron поддържа
            цялостен подход — от оглед и техническа спецификация до предаване на обекта в
            експлоатация, за да няма несъответствия между реалното производство и договорените
            лимити.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          align="left"
          label="ПАЗАР"
          title="Свободен пазар и летни цени"
          subtitle="На свободния пазар цените на електроенергията се формират от търсене и предлагане. През летните месеци, когато в много часове на деня (често между 12 и 17 ч.) соларното производство е масово, предлагането нараства — това може да води до много ниски цени в дневните пикове на производство, понякога близки до нулата, както е наблюдавано в анализи от бранша (в т.ч. в материали на Adore, посветени на динамиката на пазара)."
          className="mb-10"
        />
        <div className="space-y-5 font-body text-base leading-relaxed text-foreground-secondary">
          <p>
            За притежателите на малки фотоволтаични инсталации това е важен сигнал: „часът на
            продажба“ материално влияе върху прихода. Когато едновременно много производители
            внасят енергия в мрежата, пазарната цена може да се срине — дори ако вашата инсталация
            работи технически безупречно. Напротив, при по-високо търсене и по-малко предлагане
            (напр. вечерни часове без съответно съхранение) цените са по-високи, но тогава
            собствениците на чисто покривни PV без батерия обикновено не продават, а купуват.
          </p>
          <p>
            Затова икономическата логика често не е „максимална продажба“, а баланс: увеличаване на
            самопотреблението в часови с висока цена на покупка и ориентиране на гъвкави товари
            (помпи, климатизация, електрически бойлер) към слънчеви часове. Това намалява
            експозицията към ниски пазарни цени при продажба на излишъка и същевременно намалява
            сметката за закупена енергия.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <SectionHeader
          align="left"
          label="ФСЕС"
          title="Такса 5% от продадената електроенергия"
          subtitle="При продажба на електроенергия от частни фотоволтаични инсталации към мрежата се отчита и фондова тежест: в размер от 5% месечно към фонда „Сигурност на електроенергийната система“ (ФСЕС) върху стойността на продадената електроенергия, съгласно действащата нормативна уредба."
          className="mb-10"
        />
        <Card className="border-accent/20 bg-accent-light/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <p className="font-body text-sm leading-relaxed text-foreground">
                Тази тежест не е „скрита такса за слънцето“, а част от общия модел на финансиране на
                системните услуги и мрежовата сигурност, но трябва да бъде въведена във вашите
                прогнози за приход от продажба. Нетният ефект от PV остава силен при добро
                самопотребление и разумен размер на системата, но при прогнозиране само на „груди
                продажби“ без тези 5% числата изглеждат по-розови от реалността.
              </p>
            </div>
          </div>
        </Card>
      </SectionWrapper>

      <SectionWrapper background="gray">
        <SectionHeader
          align="left"
          label="ОПТИМИЗАЦИЯ"
          title="Самопотребление и кога да продавате"
          subtitle="Самопотреблението е енергията, която директно захранвате в дома или бизнеса без да излиза към мрежата. То „избягва“ такъв купуващ тариф и намалява зависимостта от пазарни цени при продажба на излишъка."
          className="mb-10"
        />
        <ul className="space-y-4 font-body text-base leading-relaxed text-foreground-secondary">
          <li className="flex gap-3">
            <Leaf className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
            <span>
              <strong className="text-foreground">Управление на товара.</strong> Програмирайте
              бойлери, зареждане на електромобил и интензивно охлаждане/отопление в интервали с
              високо производство. Това повишава делът самопотребление без да увеличавате мощността
              на модулите.
            </span>
          </li>
          <li className="flex gap-3">
            <Leaf className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
            <span>
              <strong className="text-foreground">Батерия.</strong> Акумулаторът премества енергия
              от обедните пикове към вечерта и намалява покупката при скъпи часове, но добавя
              инвестиция и загуби при зареждане — изгоден е при ясни нощни профили и високи
              диференциали в тарифите.
            </span>
          </li>
          <li className="flex gap-3">
            <Leaf className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
            <span>
              <strong className="text-foreground">Размер на системата.</strong> Преоразмеряването
              над реалния годишен профил увеличава излишъка, който е подложен на пазарни цени и
              фондови вноски. Подходящо е да изравните инсталацията с консумацията и с бъдещи планове
              (затопляне на басейн, нови климатични устройства).
            </span>
          </li>
        </ul>
        <div className="mt-10 rounded-xl border border-border bg-background p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Кога е по-изгодно да продавате, а не да самопотребявате?
          </h3>
          <p className="mt-4 font-body text-base leading-relaxed text-foreground-secondary">
            Ако външната цена на продажба е стабилно висока спрямо вашата цена на покупка и имате
            малко възможности за сместване на товара, излишъкът може да носи смислен приход. Ако
            пазарни цени в същия час са ниски и вашата тарифа за покупка е висока, по-изгодно е да
            прехвърлите консумацията към слънчеви часове. В реалия български контекст с
            сезонните колебания на пазара и силното летно слънце често печели комбинацията
            умерен излишък + максимизирано самопотребление и разумен размер на системата, вместо
            агресивно оверсайзване без батерия.
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
              Оразмерете системата с конфигуратора
            </h2>
            <p className="mt-3 font-body text-base text-foreground-secondary">
              Въведете град, консумация и предпочитания — получите ориентировъчно производство,
              спестявания и срок на изплащане преди да сте на място.
            </p>
          </div>
          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link href="/konfigurator">Към конфигуратора</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
