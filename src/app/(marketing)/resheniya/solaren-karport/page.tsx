import type { Metadata } from "next";

import SolarenKarportContent from "./content";

export const metadata: Metadata = {
  title: "Соларен Карпорт | Solaron",
  description:
    "Соларен карпорт за търговски паркинги, хотели и бизнес паркове — енергия от покрива и опция за EV зареждане.",
};

export default function SolarenKarportPage() {
  return <SolarenKarportContent />;
}
