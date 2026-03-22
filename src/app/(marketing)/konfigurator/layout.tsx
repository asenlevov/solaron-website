import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Соларен Конфигуратор — Проектирайте Вашата Система | Solaron",
  description:
    "Конфигурирайте фотоволтаична система за вашия дом или бизнес онлайн. Изберете мощност, инвертор и батерия — получете персонализирана оферта за минути. Безплатен калкулатор за соларни панели.",
  keywords: [
    "конфигуратор соларна система",
    "калкулатор соларни панели",
    "фотоволтаична система конфигуратор",
    "соларна система за дома цена",
    "онлайн конфигуратор фотоволтаици",
  ],
  alternates: { canonical: "/konfigurator" },
};

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
