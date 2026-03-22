import type { Metadata } from "next";
import dynamic from "next/dynamic";
const SolarenKarportContent = dynamic(() => import("./content").then((m) => m.SolarenKarportContent), { ssr: true });
export const metadata: Metadata = {
  title: "Соларен Карпорт | Solaron",
  description: "Соларни навеси за паркинги с интегрирано EV зареждане. 270 kWp референтен проект. Двоен приход от паркиране и енергия.",
};
export default function SolarenKarportPage() { return <SolarenKarportContent />; }
