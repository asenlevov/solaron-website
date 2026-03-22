import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ProtsesNaMontazhContent = dynamic(
  () => import("./content").then((m) => m.ProtsesNaMontazhContent),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Процес на Монтаж | Solaron",
  description:
    "6 стъпки от заявлението до пускане в експлоатация. Документи, ЗЕВИ гаранции, мрежови оператори и срокове за фотоволтаична инсталация в България.",
};

export default function ProtsesNaMontazhPage() {
  return <ProtsesNaMontazhContent />;
}
