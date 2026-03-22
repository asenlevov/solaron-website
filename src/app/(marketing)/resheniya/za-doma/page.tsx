import type { Metadata } from "next";

import ZaDomaContent from "./content";

export const metadata: Metadata = {
  title: "Соларна Система за Дома — До 80% Спестявания | Solaron",
  description:
    "Проектиране и монтаж на фотоволтаични системи за дома. До 80% по-ниска сметка за ток, 0% ДДС, 25-годишна гаранция. Безплатна консултация от Solaron.",
  openGraph: {
    title: "Соларна Система за Дома — До 80% Спестявания | Solaron",
    description:
      "Проектиране и монтаж на фотоволтаични системи за дома. До 80% по-ниска сметка за ток, 0% ДДС, 25-годишна гаранция.",
  },
};

export default function ZaDomaPage() {
  return <ZaDomaContent />;
}
