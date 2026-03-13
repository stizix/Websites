import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Fit multiservices | Architecte D'intérieur à Brest",
  description:
    "Fit multiservices — Votre expert en Architecte D'intérieur à Brest. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 06 17 28 83 01.",
  openGraph: {
    title: "Fit multiservices | Architecte D'intérieur à Brest",
    description:
      "Professionnel de confiance pour vos projets de Architecte D'intérieur à Brest. Devis gratuit au 06 17 28 83 01.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
