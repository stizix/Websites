import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} | {{NICHE_LABEL}} à {{CITY}}",
  description:
    "{{BUSINESS_NAME}} — Votre expert en {{NICHE_LABEL}} à {{CITY}}. Service professionnel, devis gratuit et rapide. Contactez-nous dès aujourd'hui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
