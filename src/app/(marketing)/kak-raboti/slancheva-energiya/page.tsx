import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SlanchevaEnergiyaContent = dynamic(
  () => import("./content").then((m) => m.SlanchevaEnergiyaContent),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Как Работи Слънчевата Енергия | Solaron",
  description:
    "Научете как фотоволтаиците превръщат слънчевата светлина в електричество. Фотоволтаичен ефект, компоненти на системата, соларна карта на България.",
};

export default function SlanchevaEnergiyaPage() {
  return <SlanchevaEnergiyaContent />;
}
