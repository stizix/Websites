import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} | {{NICHE_LABEL}} à {{CITY}}",
  description:
    "{{BUSINESS_NAME}} — Votre expert en {{NICHE_LABEL}} à {{CITY}}. Service professionnel, devis gratuit et intervention rapide. Contactez-nous au {{PHONE_NUMBER}}.",
  openGraph: {
    title: "{{BUSINESS_NAME}} | {{NICHE_LABEL}} à {{CITY}}",
    description:
      "Professionnel de confiance pour vos projets de {{NICHE_LABEL}} à {{CITY}}. Devis gratuit au {{PHONE_NUMBER}}.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <ClientPage />;
}
