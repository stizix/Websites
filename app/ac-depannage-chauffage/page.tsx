import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Ac dépannage chauffage | Plombier à Reims",
  description:
    "Ac dépannage chauffage — Votre expert en Plombier à Reims. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 06 32 90 13 70.",
  openGraph: {
    title: "Ac dépannage chauffage | Plombier à Reims",
    description:
      "Professionnel de confiance pour vos projets de Plombier à Reims. Devis gratuit au 06 32 90 13 70.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
