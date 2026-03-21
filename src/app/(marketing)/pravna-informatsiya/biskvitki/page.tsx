import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика за Бисквитки",
  description:
    "Информация за бисквитките, които solaron.pro използва, и как да управлявате предпочитанията си.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-display text-3xl font-semibold text-foreground">
        Политика за Бисквитки
      </h1>
      <p className="mt-4 font-body text-foreground-secondary">
        Последно обновяване: 1 март 2026 г.
      </p>

      <div className="mt-10 space-y-8 font-body text-foreground-secondary leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Какво са бисквитките?
          </h2>
          <p>
            Бисквитките (cookies) са малки текстови файлове, които се съхраняват
            на вашето устройство при посещение на уебсайт. Те позволяват на сайта
            да запомни вашите предпочитания и да подобри потребителското
            изживяване.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Какви бисквитки използваме?
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground mb-1">
                Необходими бисквитки
              </h3>
              <p className="text-sm">
                Тези бисквитки са от съществено значение за функционирането на
                сайта. Без тях не можем да осигурим основни функции като
                навигация и достъп до защитени страници. Не могат да бъдат
                деактивирани.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground mb-1">
                Аналитични бисквитки
              </h3>
              <p className="text-sm">
                Използваме аналитични бисквитки, за да разберем как
                посетителите взаимодействат със сайта. Информацията се събира
                анонимно и ни помага да подобрим съдържанието и
                функционалността.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground mb-1">
                Функционални бисквитки
              </h3>
              <p className="text-sm">
                Тези бисквитки запомнят вашите предпочитания (като език и
                регион) и осигуряват подобрено и персонализирано изживяване.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Как да управлявате бисквитките?
          </h2>
          <p>
            Можете да управлявате или изтриете бисквитките чрез настройките на
            вашия браузър. Повечето браузъри ви позволяват да блокирате или
            изтриете бисквитки. Имайте предвид, че ако деактивирате бисквитки,
            някои функции на сайта може да не работят правилно.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm">
            <li>
              <strong>Chrome:</strong> Настройки → Поверителност и сигурност →
              Бисквитки
            </li>
            <li>
              <strong>Firefox:</strong> Настройки → Поверителност и сигурност →
              Бисквитки и данни за сайтове
            </li>
            <li>
              <strong>Safari:</strong> Предпочитания → Поверителност →
              Управление на данни за уебсайт
            </li>
            <li>
              <strong>Edge:</strong> Настройки → Поверителност → Бисквитки
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Бисквитки от трети страни
          </h2>
          <p>
            Някои услуги на трети страни, които използваме (например Google
            Analytics, Google Maps), могат да поставят свои собствени бисквитки.
            Нямаме контрол над тези бисквитки. За повече информация, моля,
            посетете съответните политики за поверителност на тези услуги.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Промени в политиката
          </h2>
          <p>
            Запазваме правото да актуализираме тази политика при необходимост.
            Препоръчваме ви периодично да преглеждате тази страница за промени.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Контакт
          </h2>
          <p>
            Ако имате въпроси относно нашата политика за бисквитки, моля
            свържете се с нас на{" "}
            <a
              href="mailto:info@solaron.pro"
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              info@solaron.pro
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
