import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика за Поверителност | Solaron",
  description:
    "Политика за поверителност на Solaron: какви лични данни обработваме, на какво основание, за колко време и какви са вашите права по GDPR.",
};

export default function PoveritelnostPage() {
  return (
    <article className="font-body text-foreground">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Политика за поверителност
      </h1>
      <p className="mt-4 text-sm text-foreground-secondary">
        Последна актуализация: 20 март 2026 г.
      </p>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          1. Въведение
        </h2>
        <p>
          „Соларон“ ЕООД (наричано по-долу „Solaron“, „ние“) уважава поверителността
          на посетителите на уебсайта и на клиентите си. Настоящата политика описва
          как събираме и обработваме лични данни във връзка с нашите услуги и
          комуникация, в съответствие с Регламент (ЕС) 2016/679 („GDPR“) и
          приложимото българско законодателство.
        </p>
        <p>
          Администратор на личните данни е „Соларон“ ЕООД, със седалище и адрес на
          управление в Република България. За контакти във връзка с обработката на
          данни вижте раздел „Контакт“ по-долу.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          2. Какви данни събираме
        </h2>
        <p>В зависимост от взаимодействието ви с нас може да обработваме:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-foreground">Идентификационни данни:</span> име,
            фамилия, фирма (ако е приложимо).
          </li>
          <li>
            <span className="text-foreground">Контактни данни:</span> телефонен
            номер, имейл адрес, пощенски адрес.
          </li>
          <li>
            <span className="text-foreground">Данни за запитване/проект:</span>
            описание на обект, местоположение, очаквана консумация, технически
            параметри, предоставени от вас доброволно.
          </li>
          <li>
            <span className="text-foreground">Данни от комуникация:</span> съдържание
            на съобщения, запитвания и кореспонденция.
          </li>
          <li>
            <span className="text-foreground">Технически данни:</span> IP адрес,
            тип устройство, браузър, дата/час на посещение, препращащ адрес, записи
            в сървърни логове, когато това е технически необходимо за сигурност и
            работоспособност на сайта.
          </li>
          <li>
            <span className="text-foreground">Бисквитки и подобни технологии:</span>
            при наличие на съгласие/настройки — вижте раздел „Бисквитки“.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          3. Как използваме данните
        </h2>
        <p>Личните данни се обработват за следните цели:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>отговор на запитвания и изпращане на оферти;</li>
          <li>
            изпълнение на договор за доставка, проектиране, монтаж и поддръжка;
          </li>
          <li>
            администриране на клиентски профил/комуникация и организация на огледи;
          </li>
          <li>
            счетоводни, данъчни и правни задължения (когато законът го изисква);
          </li>
          <li>
            подобряване на уебсайта, сигурност, предотвратяване на злоупотреби;
          </li>
          <li>
            директен маркетинг — само при наличие на законово основание (напр.
            съгласие) и в съответствие с предпочитанията ви.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          4. Основания за обработка
        </h2>
        <p>Обработваме данни на основание:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-foreground">Съгласие</span> — когато е необходимо
            за конкретна цел (напр. бюлетин или определени бисквитки).
          </li>
          <li>
            <span className="text-foreground">Сключване/изпълнение на договор</span>{" "}
            — за оферти, поръчки, монтаж, гаранционно обслужване.
          </li>
          <li>
            <span className="text-foreground">Законови задължения</span> — счетоводни
            и данъчни изисквания, отговори на компетентни органи при законово
            основание.
          </li>
          <li>
            <span className="text-foreground">Легитимен интерес</span> — сигурност на
            ИТ системи, подобряване на услугите, защита срещу измами, анализ на
            трафик в обобщен вид, когато не засяга несъразмерно правата ви.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          5. Споделяне с трети лица
        </h2>
        <p>
          Не продаваме лични данни. Данни могат да бъдат предоставени на обработващи
          лични данни по наш поръчка (напр. хостинг доставчик, ИТ поддръжка,
          счетоводство, куриерски услуги, доставчици на оборудване при логистика),
          само в обем, необходим за съответната цел, и при договор за
          конфиденциалност/обработка.
        </p>
        <p>
          При международен трансфер (ако е приложимо) прилагаме подходящи гаранции
          по GDPR. Данни могат да бъдат предоставени на държавни органи, когато
          законът го изисква.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          6. Съхранение
        </h2>
        <p>
          Съхраняваме данните толкова дълго, колкото е необходимо за целите, за които
          са събрани, включително за изпълнение на договорни и законови срокове
          (напр. счетоводни записи). След изтичане на срока данните се изтриват или
          анонимизират, освен ако законът изисква по-дълго съхранение.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          7. Вашите права
        </h2>
        <p>Имате право на:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>достъп до данните ви и информация за обработката;</li>
          <li>коригиране на неточни данни;</li>
          <li>изтриване („право да бъдете забравени“), когато са налице условията;</li>
          <li>ограничаване на обработката в определени случаи;</li>
          <li>преносимост на данните (когато е приложимо);</li>
          <li>възражение срещу обработка, основана на легитимен интерес;</li>
          <li>оттегляне на съгласие, когато обработката се основава на съгласие;</li>
          <li>
            подаване на жалба до Комисия за защита на личните данни (
            <a
              href="https://www.cpdp.bg/"
              className="text-secondary underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cpdp.bg
            </a>
            ).
          </li>
        </ul>
        <p>
          За упражняване на права можете да се свържете с нас на посочените
          координати. Може да поискаме удостоверяване на самоличност при съмнение за
          злоупотреба.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          8. Бисквитки
        </h2>
        <p>
          Уебсайтът може да използва бисквитки и подобни технологии за основни
          функции, сигурност, анализ или маркетинг — в съответствие с настройките
          на банера за съгласие (ако е наличен) и вашите предпочитания. Можете да
          контролирате бисквитките от настройките на браузъра си.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          9. Промени в политиката
        </h2>
        <p>
          Можем да актуализираме настоящата политика при промени в услугите или
          законодателството. Актуалната версия се публикува на тази страница с
          указване на дата на актуализация.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-foreground-secondary">
        <h2 className="font-display text-xl font-semibold text-foreground">
          10. Контакт
        </h2>
        <p>
          Въпроси относно обработката на лични данни:{" "}
          <a
            href="mailto:privacy@solaron.bg"
            className="text-secondary underline-offset-4 hover:underline"
          >
            privacy@solaron.bg
          </a>
          . Общи запитвания: вижте страницата{" "}
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
