import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return {
    title: t("terms.title"),
    description:
      "Общи условия за ползване на уебсайта и възлагане на услуги към Solaron: обхват, ценообразуване, гаранции, отговорност и приложимо право.",
  };
}

export default async function UsloviyaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="font-body text-foreground">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Общи условия
      </h1>
      <p className="mt-4 text-sm text-foreground-secondary">
        Последна актуализация: 20 март 2026 г.
      </p>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          1. Общи положения
        </h2>
        <p>
          Настоящите Общи условия уреждат ползването на уебсайта на Solaron и
          възлагането на услуги, свързани с консултации, проектиране, доставка,
          монтаж и поддръжка на фотоволтаични системи и съпътстващо оборудване,
          освен ако страните не са сключили писмен договор с по-специални клаузи,
          който има предимство за уредените в него въпроси.
        </p>
        <p>
          С достъп до сайта и изпращане на запитване потвърждавате, че сте се
          запознали с настоящите условия и с{" "}
          <Link
            href="/pravna-informatsiya/poveritelnost"
            className="text-secondary underline-offset-4 hover:underline"
          >
            Политиката за поверителност
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          2. Услуги
        </h2>
        <p>
          Solaron предоставя услуги в областта на фотоволтаичните инсталации,
          включително оглед и енергиен анализ, техническо предложение, доставка на
          оборудване, монтаж, пуск и инструктаж, както и гаранционно и извънгаранционно
          обслужване при договаряне. Обхватът, сроковете и резултатите се конкретизират
          в индивидуална оферта/договор според обекта.
        </p>
        <p>
          Информацията на уебсайта има информативен и маркетингов характер и не
          представлява задължаваща оферта по смисъла на Закона за задълженията и
          договорите, освен ако изрично не е посочено друго.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          3. Ценообразуване
        </h2>
        <p>
          Цените в офертите са валидни в посочения срок и при посочените
          технически допускания. Промени в обема, изискванията на мрежовия оператор
          или форсмажорни обстоятелства могат да наложат актуализация на офертата
          след уведомяване.
        </p>
        <p>
          Условията за авансови плащания, вноски и приемане на обекта се уреждат в
          договор. Законната лихва при забава се дължи в съответствие с българското
          право.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          4. Гаранции
        </h2>
        <p>
          Гаранционните срокове и условия за отделните компоненти и монтажните
          работи се определят според производителските гаранции и сключения договор.
          Обобщена информация е публикувана на страницата{" "}
          <Link
            href="/pravna-informatsiya/garantsiya"
            className="text-secondary underline-offset-4 hover:underline"
          >
            Гаранция
          </Link>
          . Гаранцията не покрива повреди от неправилна експлоатация, неоторизирани
          намеси или форсмажорни събития извън контрола на Solaron.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          5. Отговорност
        </h2>
        <p>
          Solaron полага грижа за точността на публикуваната информация, но не носи
          отговорност за преки или косвени щети, произтичащи от използване на сайта
          при липса на сключен договор за конкретна услуга, освен при доказана вина в
          границите, предвидени в закона.
        </p>
        <p>
          За изпълнение на договор отговорността се определя съгласно уговореното и
          императивните разпоредби на българското право. Външни връзки към сайтове
          на трети лица се предоставят за удобство; Solaron не контролира съдържанието
          им.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          6. Интелектуална собственост
        </h2>
        <p>
          Текстовете, визуалните материали, логата и оформлението на уебсайта са
          обект на закрила, освен ако изрично не е указано друго. Без предварително
          писмено съгласие не се разрешава копиране, разпространение или търговско
          използване извън законовите изключения.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          7. Изменения
        </h2>
        <p>
          Solaron може да актуализира настоящите Общи условия. Промените влизат в
          сила от публикуването им на тази страница, освен ако по-законно е
          предвиден друг ред за уведомяване.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          8. Приложимо право
        </h2>
        <p>
          Настоящите условия се тълкуват и прилагат според законите на Република
          България. Компетентни са българските съдилища, освен ако императивни норми
          на ЕС не предвиждат друго за потребители.
        </p>
        <p>
          За контакти: страница{" "}
          <Link
            href="/kontakti"
            className="text-secondary underline-offset-4 hover:underline"
          >
            Контакти
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
