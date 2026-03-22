import type { Metadata } from "next";

import { KonstrukciiContent } from "./konstrukcii-content";

export const metadata: Metadata = {
  title: "Монтажни Конструкции за Соларни Панели | Solaron",
  description:
    "Монтажна конструкция за соларни панели и Van der Valk конструкция — покрив, земя, карпорт. Инженеринг от Solaron.",
  keywords: [
    "монтажна конструкция за соларни панели",
    "Van der Valk конструкция",
    "покривен монтаж солар",
    "наземна конструкция фотоволтаик",
    "Solaron",
  ],
  openGraph: {
    title: "Монтажни Конструкции за Соларни Панели | Solaron",
    description:
      "Монтажна конструкция за соларни панели и Van der Valk конструкция — покрив, земя, карпорт.",
  },
  alternates: { canonical: "/produkti/konstrukcii" },
};

export default function KonstrukciiPage() {
  return <KonstrukciiContent />;
}
