import type { Metadata } from "next";

import ZaDomaContent from "./content";

export const metadata: Metadata = {
  title: "Соларна Система за Дома — До 80% Спестявания | Solaron",
  description:
    "Домашна соларна система и фотоволтаична система за къща — проект, монтаж и ориентир за соларна система за дома цена. До 80% спестявания, 0% ДДС. Solaron.",
  keywords: [
    "соларна система за дома цена",
    "фотоволтаична система за къща",
    "домашна соларна система",
    "фотоволтаик дом",
    "Solaron",
  ],
  openGraph: {
    title: "Соларна Система за Дома — До 80% Спестявания | Solaron",
    description:
      "Домашна соларна система и фотоволтаична система за къща — проект, монтаж и ориентир за соларна система за дома цена. До 80% спестявания, 0% ДДС.",
  },
  alternates: { canonical: "/resheniya/za-doma" },
};

export default function ZaDomaPage() {
  return <ZaDomaContent />;
}
