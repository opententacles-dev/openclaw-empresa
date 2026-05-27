import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agente de IA Pronto em 3 Minutos | OpenTentacles",
  description: "Crie seu agente de IA para WhatsApp, Telegram e Instagram sem codigo. OpenTentacles hospeda OpenClaw com 1 clique. A partir de R$49/mes. Comece gratis.",
  openGraph: {
    title: "Agente de IA Pronto em 3 Minutos | OpenTentacles",
    description: "Crie seu agente de IA para WhatsApp sem codigo. A partir de R$49/mes.",
    url: "https://opententacles.com",
    siteName: "OpenTentacles",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
