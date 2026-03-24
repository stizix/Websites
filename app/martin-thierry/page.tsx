import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Martin Thierry | Architecte D'intérieur à Le Havre",
  description:
    "Martin Thierry — Votre expert en Architecte D'intérieur à Le Havre. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 06 13 50 34 17.",
  openGraph: {
    title: "Martin Thierry | Architecte D'intérieur à Le Havre",
    description:
      "Professionnel de confiance pour vos projets de Architecte D'intérieur à Le Havre. Devis gratuit au 06 13 50 34 17.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
