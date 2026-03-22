import type { Metadata } from "next";

import { AvtonomniSistemiContent } from "./content";

export const metadata: Metadata = {
  title: "Автономни Соларни Системи — Off-Grid | Solaron",
  description:
    "Автономни фотоволтаични системи за обекти без достъп до мрежата. Off-grid решения с батерии за пълна енергийна независимост. Проектиране и монтаж.",
  keywords: [
    "автономна соларна система",
    "off-grid фотоволтаична система",
    "соларна система без мрежа",
    "батерийна система off-grid",
    "Solaron",
  ],
  openGraph: {
    title: "Автономни Соларни Системи — Off-Grid | Solaron",
    description:
      "Автономни фотоволтаични системи за обекти без достъп до мрежата. Off-grid решения с батерии за пълна енергийна независимост.",
  },
  alternates: { canonical: "/resheniya/avtonomni-sistemi" },
};

export default function AvtonomniSistemiPage() {
  return <AvtonomniSistemiContent />;
}
