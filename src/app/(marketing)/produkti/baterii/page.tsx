import type { Metadata } from "next";

import { BateriiContent } from "./baterii-content";

export const metadata: Metadata = {
  title: "Батерии | Solaron",
  description:
    "Литиево-желязо-фосфатни батерии за съхранение на соларна енергия. Използвайте слънчевата енергия денонощно.",
};

export default function BateriiPage() {
  return <BateriiContent />;
}
