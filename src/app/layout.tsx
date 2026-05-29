import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://opententacles.com"),
  title: {
    default: "Agente de IA Pronto em 3 Minutos | OpenTentacles",
    template: "%s | OpenTentacles",
  },
  description: "Crie seu agente de IA para WhatsApp, Telegram e Instagram sem código. Hospedagem OpenClaw com 1 clique. Sem programação, sem terminal. A partir de R$49/mês.",
  keywords: [
    "agente de IA",
    "agente de inteligência artificial",
    "automação WhatsApp sem código",
    "chatbot inteligente",
    "IA para atendimento automático",
    "IA para pequenas empresas",
    "agente de IA sem programação",
    "criar agente de IA",
    "alternativa Botmaker",
    "alternativa Take Blip",
    "OpenClaw hospedagem gerenciada",
    "automação de vendas WhatsApp",
    "atendimento automático IA",
    "chatbot IA gratuito",
    "agente virtual inteligente",
  ],
  authors: [{ name: "OpenTentacles", url: "https://opententacles.com" }],
  creator: "OpenTentacles",
  openGraph: {
    title: "Agente de IA Pronto em 3 Minutos | OpenTentacles",
    description: "Crie seu agente de IA para WhatsApp, Telegram e Instagram sem código. Sem programação, sem terminal. A partir de R$49/mês.",
    url: "https://opententacles.com",
    siteName: "OpenTentacles",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/mascote.png",
        width: 1200,
        height: 630,
        alt: "OpenTentacles — Agente de IA pronto em 3 minutos, sem código",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agente de IA Pronto em 3 Minutos | OpenTentacles",
    description: "Crie seu agente de IA para WhatsApp sem código. A partir de R$49/mês.",
    images: ["/mascote.png"],
  },
  icons: {
    icon: "/mascote.png",
    shortcut: "/mascote.png",
    apple: "/mascote.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://opententacles.com",
  },
}

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OpenTentacles",
  url: "https://opententacles.com",
  logo: "https://opententacles.com/logo.png",
  sameAs: ["https://opententacles.com"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contato@opententacles.com",
    contactType: "customer support",
    availableLanguage: ["Portuguese", "English", "Spanish"],
  },
}

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OpenTentacles",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma SaaS para criação e hospedagem de agentes de inteligência artificial para WhatsApp, Telegram e Instagram. Sem código, sem programação.",
  url: "https://opententacles.com",
  offers: [
    {
      "@type": "Offer",
      name: "Plano Starter",
      price: "49.00",
      priceCurrency: "BRL",
    },
    {
      "@type": "Offer",
      name: "Plano Pro",
      price: "99.00",
      priceCurrency: "BRL",
    },
    {
      "@type": "Offer",
      name: "Plano Enterprise",
      price: "199.00",
      priceCurrency: "BRL",
    },
  ],
  featureList: [
    "Agente de IA para WhatsApp sem código",
    "Hospedagem gerenciada OpenClaw",
    "Integração com Telegram e Instagram",
    "Painel de controle intuitivo",
    "Suporte em português",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}