import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Battery,
  Grid3x3,
  Home,
  Layers,
  Sun,
  SunMedium,
  Waves,
  Zap,
} from "lucide-react";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Как Работи Слънчевата Енергия | Solaron",
  description:
    "Научете как фотоволтаиците превръщат слънчевата светлина в електричество: фотоволтаичен ефект, DC/AC, компоненти на системата, ресурс в България и сезонност на производството.",
  keywords: [
    "слънчева енергия",
    "фотоволтаици",
    "как работи солар",
    "PV България",
    "инвертор",
    "соларна система",
  ],
};

const PHOTOVOLTAIC_STEPS = [
  {
    step: 1,
    icon: Sun,
    title: "Слънчеви фотони достигат клетката",
    text: "Слънчевата радиация се състои от частици светлина — фотони. Когато те ударят полупроводников материал (обикновено силиций), част от тяхната енергия се предава на електроните в кристалната решетка.",
  },
  {
    step: 2,
    icon: Layers,
    title: "Силициевият PN преход създава поле",
    text: "Соларният модул е изграден от клетки с PN преход. Вътрешното електрическо поле разделя носителите на заряд: електроните и дупките се движат в противоположни посоки, което създава потенциална разлика — напрежение между контактите на клетката.",
  },
  {
    step: 3,
    icon: Zap,
    title: "Генерира се постоянен ток (DC)",
    text: "При затворена верига потокът от електрони образува постоянен ток. Модулите се свързват серийно и паралелно, за да се получи желаното напрежение и мощност на стринга (string). Това е „суровата“ соларна енергия преди обработка.",
  },
  {
    step: 4,
    icon: Battery,
    title: "Инверторът преобразува DC в променлив ток (AC)",
    text: "Домакинствата и мрежата работят на променлив ток. Инверторът синхронизира фазата и честотата с мрежата, осигурява MPPT проследяване на максимална мощност и защити при пренапрежение или авария.",
  },
] as const;

const SYSTEM_CHAIN = [
  {
    icon: SunMedium,
    title: "Соларни панели",
    body: "PV модулите улавят слънчевата светлина и произвеждат DC ток. Броят и мощността на модулите определят номиналната мощност на системата (kWp).",
  },
  {
    icon: Waves,
    title: "Инвертор",
    body: "Преобразува постоянен в променлив ток и управлява връзката с мрежата. Може да е стрингов (централен) или с микроинвертори за всеки панел — изборът зависи от сенки, покрив и бюджет.",
  },
  {
    icon: Home,
    title: "Обект / дом",
    body: "Произведената енергия захранва осветление, климатици, уреди и производство. При нетно отчитане приоритетът е самопотребление; излишъкът се подава към мрежата според договора.",
  },
  {
    icon: Grid3x3,
    title: "Електропреносна / разпределителна мрежа",
    body: "Мрежата действа като „банка“: при недостиг на слънце взимате ток; при излишък — връщате или продавате според режима на присъединяване и действащите тарифи.",
  },
] as const;

export default function SlanchevaEnergiyaPage() {
  return (
    <main>
      <SectionWrapper background="white" className="pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-4xl">
          <Badge variant="accent" className="mb-4">
            Образование
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
            Как Работи Слънчевата Енергия
          </h1>
          <p className="mt-5 font-body text-lg leading-relaxed text-foreground-secondary md:text-xl">
            Слънчевата електроенергия е най-бързо растящият източник на ново
            електричество в Европа — разбираемо е защо: технологията е зряла,
            поддръжката е минимална, а разходите за производство на киловатчас
            продължават да падат. На тази страница обясняваме на достъпен език
            физиката зад фотоволтаика, веригата от панел до мрежата и какво да
            очаквате като сезонност в България.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-foreground-secondary">
            Независимо дали планирате резиденция, бизнес или земеделски обект,
            разбирането на основите ви помага да задавате правилни въпроси към
            интегратора: какъв тип модул и инвертор, как се оптимизира
            ориентацията, какви са загубите от сенки и как се отчита енергията
            спрямо мрежовия оператор. Solaron проектира системи с прозрачни
            параметри и реалистични прогнози за производство — ето какво стои
            зад цифрите.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray" id="fotovoltachen-efekt">
        <SectionHeader
          align="left"
          label="Физика"
          title="Фотоволтаичен Ефект"
          subtitle="От фотон до ток: четири стъпки, които описват работата на всяка соларна клетка."
        />
        <div className="space-y-6">
          <p className="max-w-3xl font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
            Фотоволтаичният ефект е открит още през XIX век, но масовото му
            приложение идва с развитието на полупроводниците. Днес повечето
            модули на пазара използват кристален силиций — монокристален или
            поликристален — с различна ефективност и цена. Тънки слоеве и
            антирефлексни покрития увеличават количеството светлина, което
            достига активната зона на клетката. Разбирането на тези стъпки е
            ключово, за да оцените защо качеството на монтажа, чистотата на
            модулите и правилното оразмеряване на инвертора влияят директно върху
            добива от вашата инвестиция.
          </p>
          <ol className="grid gap-6 md:grid-cols-2">
            {PHOTOVOLTAIC_STEPS.map(({ step, icon: Icon, title, text }) => (
              <li key={step}>
                <Card className="h-full border-border bg-background-card">
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-xl",
                        "bg-accent-light text-accent",
                      )}
                      aria-hidden
                    >
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
                        Стъпка {step}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
                        {text}
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
          <p className="max-w-3xl font-body text-base leading-relaxed text-foreground-secondary">
            В индустриални и търговски обекти често се добавят системи за
            мониторинг на стрингово ниво: така се откриват микротрещини, замърсяване
            или неравномерно натоварване още преди да са нанесли големи загуби.
            За дома достатъчно е облачен портал или приложение към инвертора, но
            принципът е същият — наблюдение на реалното производство спрямо
            очакваното за дадената глобална слънчева инсолация.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" id="komponenti">
        <SectionHeader
          align="left"
          label="Система"
          title="Компоненти на Системата"
          subtitle="Енергията тече от панелите през инвертора към потреблението и мрежата."
        />
        <p className="mb-10 max-w-3xl font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
          Пълната соларна инсталация включва още конструкции за покрив или наземен
          монтаж, DC и AC кабелизация, защитни и комутационни табла, заземяване и
          при нужда — акумулатори и станции за зареждане на електромобил. На схемата
          по-долу са показани четирите основни „възела“, между които се движи
          енергията в типична мрежова инсталация. Това опростява комуникацията с
          електроразпределителното дружество (ЕРП/ЕРМ/ЕРС) при заявка за
          присъединяване и при избор на режим: самопотребление, изкупуване или
          комбинация.
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
          {SYSTEM_CHAIN.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="flex flex-1 flex-col items-center lg:flex-row">
              <Card className="w-full flex-1 border-border">
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
                  <span className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-accent-light text-accent md:mb-0 md:mr-5">
                    <Icon className="size-7" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-foreground-secondary">
                      {body}
                    </p>
                  </div>
                </div>
              </Card>
              {i < SYSTEM_CHAIN.length - 1 ? (
                <div
                  className="flex shrink-0 items-center justify-center py-2 lg:px-3 lg:py-0"
                  aria-hidden
                >
                  <ArrowRight className="hidden size-6 text-foreground-tertiary lg:block" />
                  <ArrowRight className="size-6 rotate-90 text-foreground-tertiary lg:hidden" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl font-body text-base leading-relaxed text-foreground-secondary">
          При проектиране инженерите съпоставят номиналната мощност на полето (kWp)
          с инверторната мощност (kW) — съотношението „DC/AC“ обикновено е между
          1,05 и 1,25 в зависимост от климата и ориентацията. Твърде голям инвертор
          оскъпява системата без реална полза; твърде малък „изрязва“ пиковете в
          студено време, когато панелите са по-ефективни. Затова индивидуалният
          оглед и моделиране са по-надеждни от универсални таблици.
        </p>
      </SectionWrapper>

      <SectionWrapper background="dark" id="solarna-karta">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 md:text-sm">
            Ресурс
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl lg:text-5xl">
            Соларна Карта на България
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-neutral-300 md:text-lg">
            Страната ни разполага с отлични стойности на годишна слънчева инсолация
            спрямо средното за Европа.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 font-body text-base leading-relaxed text-neutral-300">
            <p>
              България се намира в умерен климатичен пояс с висок дял ясни дни
              през пролетта и лятото. Според атласи и измервания на глобалната
              хоризонтална инсолация, типичният диапазон за голяма част от територията
              е от порядъка{" "}
              <span className="font-semibold text-amber-200">
                1 300–1 500 kWh/m²/година
              </span>
              — стойности, които нареждат страната сред най-благоприятните в ЕС за
              фотоволтаици. Южните и западните райони често са малко над средното;
              планинските участъци и мъгливите котловини изискват по-внимателен
              дизайн на стринговете и по-консервативни прогнози.
            </p>
            <p>
              За инвеститор това означава конкурентен възврат спрямо Централна и
              Северна Европа при сходна цена на инсталацията. Разбира се, макроресурсът
              е само отправна точка: ориентацията на покрива, ъгълът на монтажа,
              сенките от комини и съседни сгради, както и загубите в кабелите и
              инвертора, определят реалния добив. Solaron използва сателитни данни и
              теренни заснемания, за да приближи прогнозата до реалното производство
              по месеци.
            </p>
            <p>
              При планиране на бизнес кейс е полезно да сравните три сценария:
              консервативен (по-ниска инсолация), базов (средни стойности) и
              оптимистичен (по-добро време и поддръжка). Така оценката на
              изплащането не зависи от една „идеална“ година, а от устойчив диапазон,
              който отразява и колебанията в цените на електроенергията.
            </p>
          </div>
          <Card className="border-amber-900/40 bg-neutral-900/80">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-amber-400">
              Ориентир
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-neutral-50">
              Годишен ресурс (индикативно)
            </p>
            <div className="mt-8 flex flex-wrap items-end gap-6">
              <div>
                <p className="font-body text-sm text-neutral-400">От (kWh/m²)</p>
                <p className="font-display text-5xl font-semibold tabular-nums text-amber-400">
                  <AnimatedCounter value={1300} duration={2000} />
                </p>
              </div>
              <div>
                <p className="font-body text-sm text-neutral-400">До (kWh/m²)</p>
                <p className="font-display text-5xl font-semibold tabular-nums text-amber-400">
                  <AnimatedCounter value={1500} duration={2200} />
                </p>
              </div>
            </div>
            <p className="mt-6 font-body text-sm leading-relaxed text-neutral-400">
              Цифрите са обобщение за планиране; точният добив за вашия адрес се
              изчислява след оглед и модел на сенките.
            </p>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gray" id="sezonnost">
        <SectionHeader
          align="left"
          label="Прогноза"
          title="Сезонно Производство"
          subtitle="Лятото носи пикове, зимата — по-къси дни и по-ниски ъгли на слънцето."
        />
        <div className="max-w-3xl space-y-4 font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
          <p>
            Соларната система не произвежда равномерно през годината. През юни и
            юли слънцето е високо, денят е дълъг и производството достига месечни
            максимуми. През декември и януари дневната енергия е многократно
            по-ниска поради по-късия ден, по-честата облачност и снега върху
            модулите (ако не се отстрани). Това не е „проблем“ на технологията, а
            очаквана физическа реалност — важно е да я заложите във финансовия модел
            и при избор на размер на системата спрямо годишното потребление.
          </p>
          <p>
            За собственици на бизнес с лятен пик на консумация (хотели, логистика с
            охлаждане) соларът съвпада естествено с натоварването. За отопление на
            ток през зимата обаче ще разчитате повече на мрежата или на комбинация с
            батерия и/или топлинна помпа с добър коефициент на ефективност. Нашият
            екип подготвя месечни графики на очакваното производство спрямо вашия
            профил на товар, за да избегнете излишък от неизползвана енергия или
            недостиг спрямо целите за спестяване.
          </p>
          <p>
            Поддръжката също е сезонна: пролетното почистване на прах и поленца,
            проверка на кабелите след зимни бури и мониторинг на аларми в инвертора
            поддържат добива близо до проектния. Ако искате да видите как различни
            мощности се отразяват на сметката ви при местните тарифи, използвайте
            конфигуратора — той дава ориентировъчен поглед върху инвестицията и
            възвръщаемостта с прости допускания.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" id="faq">
        <SectionHeader
          align="left"
          label="Още за слънцето"
          title="Какво да помните при планиране"
          subtitle="Кратки отговори на въпроси, които често възникват след първия оглед."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Колко години работи една инсталация?
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Качествените модули имат гаранция за линейна мощност 25–30 години, а
              инверторите обикновено 10–15 години с възможност за подмяна на
              вентилатори и кондензатори. Реалният живот надхвърля гаранцията при
              добър монтаж и почистване — много системи от ранните години на пазара
              все още произвеждат приемлив добив след две десетилетия.
            </p>
          </Card>
          <Card className="border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Засенчването колко намалява добива?
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Дори малко засенчване от комин или антена променя работата на целия
              стринг при класическа връзка. Оптимизационни системи (оптимайзери) или
              микроинвертори локализират загубите. При проектиране използваме
              сенчести карти и 3D модели, за да поставим модулите далеч от
              източници на сянка или да разделим на няколко независими стринга.
            </p>
          </Card>
          <Card className="border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Нужна ли е батерия задължително?
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Не — мрежовата система без акумулатор е по-евтина и по-проста за
              поддръжка. Батерията има смисъл при скъпи тарифи в пикови часове,
              чести прекъсвания на мрежата или когато целите максимално
              самопотребление. Икономиката се смята индивидуално спрямо цикъла на
              зареждане и дълбочината на разреждане.
            </p>
          </Card>
          <Card className="border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Как се сравнява слънчевият ток с мрежовия по качество?
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground-secondary">
              Инверторът осигурява синусоидално напрежение с параметри, съвместими с
              домашните уреди. Защитите в таблото предотвратяват обратно захранване
              при авария на мрежата — стандартът е „антиостров“ за безопасност на
              монтьорите. Това е същата логика, която използват и другите ВЕИ
              източници, присъединени към ниското напрежение.
            </p>
          </Card>
        </div>
        <p className="mt-12 max-w-3xl font-body text-base leading-relaxed text-foreground-secondary">
          Ако искате да задълбочите темата за мрежовите режими, гаранциите и
          документите към оператора, разгледайте{" "}
          <Link
            href="/kak-raboti/protsesa-na-montazh"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            процеса на монтаж
          </Link>{" "}
          и{" "}
          <Link
            href="/kak-raboti/svurzvane-kum-mrezhata"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            свързването към мрежата
          </Link>{" "}
          в същия раздел „Как работи“. Там ще намерите стъпките от заявление до пуск
          и обобщение на трите основни начина да ползвате произведената енергия.
          Комбинирането на технически знания с ясна административна карта е
          най-сигурният път към спокойна инвестиция без неприятни изненади след
          подписване на договорите.
        </p>
      </SectionWrapper>

      <SectionWrapper background="white" className="pb-24 md:pb-32">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-border bg-accent-light/40 p-8 md:flex-row md:items-center md:p-10 lg:p-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              Готови за следващата стъпка?
            </h2>
            <p className="mt-3 font-body text-base leading-relaxed text-foreground-secondary md:text-lg">
              Симулирайте мощност, разход и ориентировъчен срок на изплащане с
              онлайн конфигуратора на Solaron — после ще прегледаме резултата с вас
              и ще го съобразим с оглед на място.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/konfigurator">Отвори конфигуратора</Link>
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
