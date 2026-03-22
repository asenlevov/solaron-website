import type { Metadata } from "next";

import ZaBiznesaContent from "./content";

export const metadata: Metadata = {
  title: "Соларна Система за Бизнес | Solaron",
  description:
    "Соларна система за бизнес и фотоволтаична система за фирма — енергиен одит, проект и монтаж. Индустриална соларна система за по-ниски разходи. Solaron.",
  keywords: [
    "соларна система за бизнес",
    "фотоволтаична система за фирма",
    "индустриална соларна система",
    "комерсиален фотоволтаик",
    "Solaron",
  ],
  openGraph: {
    title: "Соларна Система за Бизнес | Solaron",
    description:
      "Соларна система за бизнес и фотоволтаична система за фирма — енергиен одит, проект и монтаж. Индустриална соларна система за по-ниски разходи.",
  },
  alternates: { canonical: "/resheniya/za-biznesa" },
};

export default function ZaBiznesaPage() {
  return <ZaBiznesaContent />;
}
