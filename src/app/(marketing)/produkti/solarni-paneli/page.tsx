import type { Metadata } from "next";

import { SolarniPaneliContent } from "./solarni-paneli-content";

export const metadata: Metadata = {
  title: "Соларни Панели | Solaron",
  description:
    "MWT технология от Sunport Power с 30-годишна гаранция за производителност. Максимална ефективност дори при разсеяна светлина.",
};

export default function SolarniPaneliPage() {
  return <SolarniPaneliContent />;
}
