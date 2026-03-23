import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Les milles et une fuites plomberie | Plombier à Tours",
  description:
    "Les milles et une fuites plomberie — Votre expert en Plombier à Tours. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au 06 12 21 06 57.",
  openGraph: {
    title: "Les milles et une fuites plomberie | Plombier à Tours",
    description:
      "Professionnel de confiance pour vos projets de Plombier à Tours. Devis gratuit au 06 12 21 06 57.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
