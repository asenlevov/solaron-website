import type { Metadata } from "next";

import { KonstrukciiContent } from "./konstrukcii-content";

export const metadata: Metadata = {
  title: "Конструкции | Solaron",
  description:
    "Холандски инженерни решения за монтаж на соларни панели. 15-годишна гаранция за всички типове покриви и терени.",
};

export default function KonstrukciiPage() {
  return <KonstrukciiContent />;
}
