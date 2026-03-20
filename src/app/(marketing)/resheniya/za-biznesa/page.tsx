import type { Metadata } from "next";

import ZaBiznesaContent from "./content";

export const metadata: Metadata = {
  title: "Соларни Решения за Бизнеса | Solaron",
  description:
    "Фотоволтаика за бизнес: намалени оперативни разходи, по-бърза възвръщаемост и устойчив корпоративен имидж с Solaron.",
};

export default function ZaBiznesaPage() {
  return <ZaBiznesaContent />;
}
