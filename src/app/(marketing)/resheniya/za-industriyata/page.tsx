import type { Metadata } from "next";

import { ZaIndustriyataContent } from "./content";

export const metadata: Metadata = {
  title: "Соларна Система за Индустрията | Solaron",
  description:
    "Индустриални фотоволтаични системи до 1 MWp — проектиране, монтаж и поддръжка. SolarEdge, Kstar, Huawei инвертори. Намалете енергийните разходи на производството.",
  keywords: [
    "индустриална соларна система",
    "фотоволтаична система за завод",
    "соларни панели за индустрия",
    "голяма фотоволтаична инсталация",
    "Solaron",
  ],
  openGraph: {
    title: "Соларна Система за Индустрията | Solaron",
    description:
      "Индустриални фотоволтаични системи до 1 MWp — проектиране, монтаж и поддръжка. Намалете енергийните разходи.",
  },
  alternates: { canonical: "/resheniya/za-industriyata" },
};

export default function ZaIndustriyataPage() {
  return <ZaIndustriyataContent />;
}
