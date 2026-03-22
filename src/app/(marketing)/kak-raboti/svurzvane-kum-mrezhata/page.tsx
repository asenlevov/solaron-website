import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SvurzvaneMrezhataContent = dynamic(
  () => import("./content").then((m) => m.SvurzvaneMrezhataContent),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "Свързване към Мрежата | Solaron",
  description:
    "Три начина за свързване на фотоволтаична система — собствено потребление, продажба на ток и комбинирано. ЗЕВИ регулации и процедура.",
};

export default function SvurzvaneMrezhataPage() {
  return <SvurzvaneMrezhataContent />;
}
