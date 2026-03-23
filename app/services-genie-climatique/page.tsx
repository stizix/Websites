import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Services génie climatique | Plombier à Caen",
  description:
    "Services génie climatique — Votre expert en Plombier à Caen. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 07 83 02 21 92.",
  openGraph: {
    title: "Services génie climatique | Plombier à Caen",
    description:
      "Professionnel de confiance pour vos projets de Plombier à Caen. Devis gratuit au 07 83 02 21 92.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
