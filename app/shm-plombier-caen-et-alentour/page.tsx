import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SHM PLOMBIER CAEN ET ALENTOUR | Plombier à Falaise",
  description:
    "SHM PLOMBIER CAEN ET ALENTOUR — Votre expert en Plombier à Falaise. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 07 58 39 58 84.",
  openGraph: {
    title: "SHM PLOMBIER CAEN ET ALENTOUR | Plombier à Falaise",
    description:
      "Professionnel de confiance pour vos projets de Plombier à Falaise. Devis gratuit au 07 58 39 58 84.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
