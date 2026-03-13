import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Atelier Magenta Architecture | Architecte D'intérieur à Le Havre",
  description:
    "Atelier Magenta Architecture — Votre expert en Architecte D'intérieur à Le Havre. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 06 73 07 67 13.",
  openGraph: {
    title: "Atelier Magenta Architecture | Architecte D'intérieur à Le Havre",
    description:
      "Professionnel de confiance pour vos projets de Architecte D'intérieur à Le Havre. Devis gratuit au 06 73 07 67 13.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
