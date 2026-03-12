import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "A.GUERIN Architecte d'interieur aménagement de surfaces commerciales | Architecte D'intérieur à Caen",
  description:
    "A.GUERIN Architecte d'interieur aménagement de surfaces commerciales — Votre expert en Architecte D'intérieur à Caen. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 06 64 99 84 19.",
  openGraph: {
    title: "A.GUERIN Architecte d'interieur aménagement de surfaces commerciales | Architecte D'intérieur à Caen",
    description:
      "Professionnel de confiance pour vos projets de Architecte D'intérieur à Caen. Devis gratuit au 06 64 99 84 19.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
