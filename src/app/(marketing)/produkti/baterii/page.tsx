import type { Metadata } from "next";

import { BateriiContent } from "./baterii-content";

export const metadata: Metadata = {
  title: "Батерии за Соларна Система | Solaron",
  description:
    "Соларна батерия за дома, батерия за фотоволтаична система и съхранение на енергия — LiFePO₄, модулни решения. Консултация Solaron.",
  keywords: [
    "соларна батерия за дома",
    "батерия за фотоволтаична система",
    "съхранение на енергия",
    "LiFePO4 батерия",
    "Solaron",
  ],
  openGraph: {
    title: "Батерии за Соларна Система | Solaron",
    description:
      "Соларна батерия за дома, батерия за фотоволтаична система и съхранение на енергия — LiFePO₄, модулни решения.",
  },
  alternates: { canonical: "/produkti/baterii" },
};

export default function BateriiPage() {
  return <BateriiContent />;
}
