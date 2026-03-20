import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Гаранция | Solaron",
  description:
    "Гаранционни условия за соларни панели, инвертори, конструкции, батерии и монтаж при инсталации от Solaron.",
};

export default function GarantsiyaPage() {
  return (
    <article className="font-body text-foreground">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Гаранция
      </h1>
      <p className="mt-4 text-sm text-foreground-secondary">
        Последна актуализация: 20 март 2026 г. Конкретните срокове и изключения за
        вашата инсталация са посочени в договора и гаранционните документи на
        производителя.
      </p>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          1. Соларни панели
        </h2>
        <p>
          <span className="text-foreground">Sunport Power MWT:</span> до{" "}
          <span className="text-foreground">30 години гаранция за производителност</span>{" "}
          при спазване на условията на производителя (линейна деградация и прагове по
          продуктов лист). Освен това важат производствени гаранции за материали и
          workmanship според серийната документация, съпътстваща доставката.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          2. Инвертори
        </h2>
        <p>
          <span className="text-foreground">SolarEdge:</span>{" "}
          <span className="text-foreground">12 години стандартна гаранция</span>,
          с възможност за{" "}
          <span className="text-foreground">разширение до 25 години</span> при
          закупуване и регистрация според правилата на производителя. Гаранцията
          обхваща дефекти при нормална експлоатация и регламентирана инсталация.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          3. Конструкции
        </h2>
        <p>
          <span className="text-foreground">Van Der Valk:</span>{" "}
          <span className="text-foreground">15 години гаранция</span> за
          конструктивната система при монтаж съгласно инструкциите на производителя и
          одобрения проект за натоварване на покрива.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          4. Батерии
        </h2>
        <p>
          Акумулаторни системи: до{" "}
          <span className="text-foreground">10 години гаранция</span> според
          модела и производителя, при спазване на условията за цикли, температура и
          инсталация. Капацитетната гаранция се определя по спецификацията на
          съответния продукт.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          5. Монтажни работи
        </h2>
        <p>
          Изпълнението на монтажа от страна на Solaron се покрива с{" "}
          <span className="text-foreground">5 години гаранция за качество на работата</span>{" "}
          — за дефекти, произтичащи от монтажни операции, извършени съгласно
          добрите практики и одобрения проект. Тази гаранция не замества
          производствените гаранции на компонентите.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          6. Какво покрива гаранцията
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            дефекти в материали и изработка при нормална експлоатация съгласно
            инструкциите на производителя;
          </li>
          <li>
            монтажни нередности, за които е установена отговорност на изпълнителя в
            гаранционния срок;
          </li>
          <li>
            производителски дефекти, удостоверени по процедура на съответния бранд.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          7. Какво не покрива гаранцията
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            повреди от природни бедствия, пожар, наводнение, мълния извън
            предвидената защита, война, вандализъм;
          </li>
          <li>
            неоторизирани ремонти, модификации или намеса от трети лица без писмено
            съгласие;
          </li>
          <li>
            неправилна експлоатация, липса на поддръжка, механични удари, корозия при
            неспазване на изискванията на средата;
          </li>
          <li>
            софтуерни настройки извън отговорността на Solaron, ако са извършени без
            съдействие или срещу препоръките;
          </li>
          <li>
            естествена деградация в рамките на декларираните от производителя
            параметри за панели и батерии.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          8. Рекламация и гаранционно обслужване
        </h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Подайте сигнал на{" "}
            <a
              href="mailto:serviz@solaron.bg"
              className="text-secondary underline-offset-4 hover:underline"
            >
              serviz@solaron.bg
            </a>{" "}
            или чрез{" "}
            <Link
              href="/kontakti"
              className="text-secondary underline-offset-4 hover:underline"
            >
              контактната форма
            </Link>{" "}
            с кратко описание, адрес на обекта и серийни номера (ако са налични).
          </li>
          <li>
            При необходимост изискваме снимки/дистанционна диагностика или оглед на
            място за категоризиране на случая.
          </li>
          <li>
            При основателна реклама координираме ремонт, замяна или логистика според
            политиката на производителя и договора с клиента.
          </li>
        </ol>
        <p className="mt-4">
          За правата по потребителското законодателство важат императивните норми,
          независимо от настоящото обобщение.
        </p>
      </section>
    </article>
  );
}
