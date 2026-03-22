import type { Metadata } from "next";
import dynamic from "next/dynamic";
const AvtonomniSistemiContent = dynamic(() => import("./content").then((m) => m.AvtonomniSistemiContent), { ssr: true });
export const metadata: Metadata = {
  title: "Автономни Соларни Системи | Solaron",
  description: "Off-grid соларни системи за 100% енергийна независимост. 3-7 дни автономия, 48V-400V системи, 99.9% uptime.",
};
export default function AvtonomniSistemiPage() { return <AvtonomniSistemiContent />; }
