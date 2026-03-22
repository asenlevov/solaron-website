import type { Metadata } from "next";
import dynamic from "next/dynamic";

const FinansiraneContent = dynamic(
  () => import("./content").then((m) => m.FinansiraneContent),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Финансиране на Соларни Системи | Solaron",
  description:
    "Субсидии, банкови кредити, лизинг и данъчни облекчения за фотоволтаични системи в България. Пълно ръководство за финансиране.",
};

export default function FinansiranePage() {
  return <FinansiraneContent />;
}
