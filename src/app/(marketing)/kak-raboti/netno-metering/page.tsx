import type { Metadata } from "next";
import dynamic from "next/dynamic";

const NetnoMeteringContent = dynamic(
  () => import("./content").then((m) => m.NetnoMeteringContent),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Нетно Отчитане | Solaron",
  description:
    "Как работи нетното отчитане за фотоволтаични системи в България. Двупосочен електромер, пазарни цени, ФСЕС такса и оптимизация.",
};

export default function NetnoMeteringPage() {
  return <NetnoMeteringContent />;
}
