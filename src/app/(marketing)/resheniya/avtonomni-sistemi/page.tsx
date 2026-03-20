import type { Metadata } from "next";

import AvtonomniSistemiContent from "./content";

export const metadata: Metadata = {
  title: "Автономни Соларни Системи | Solaron",
  description:
    "Оф-грид и хибридни системи с батерии за пълна енергийна автономност — отдалечени имоти и места без мрежа.",
};

export default function AvtonomniSistemiPage() {
  return <AvtonomniSistemiContent />;
}
