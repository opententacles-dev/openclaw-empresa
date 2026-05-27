import Image from 'next/image'
import { Mail, MessageCircle } from 'lucide-react'

const LINKS = {
  produto: [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Preços', href: '#preços' },
    { label: 'Status do sistema', href: '/status' },
    { label: 'Changelog', href: '/changelog' },
  ],
  empresa: [
    { label: 'Blog', href: '/blog' },
    { label: 'Afiliados', href: '#afiliados' },
    { label: 'Plano Carreira', href: '#carreira' },
    { label: 'Ajuda', href: '/help' },
  ],
  legal: [
    { label: 'Termos de uso', href: '/terms' },
    { label: 'Privacidade', href: '/privacy' },
    { label: 'LGPD', href: '/lgpd' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="OpenTentacles" width={32} height={32} className="h-8 w-auto" />
              <span className="text-lg font-bold text-white">Open<span className="text-primary">Tentacles</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Agentes de IA para qualquer canal e qualquer tarefa. Sem código, em 3 minutos.
            </p>
            <div className="flex gap-3">
              <a href="mailto:ola@opententacles.com" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-white">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-white">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Produto</h3>
            <ul className="space-y-2.5">
              {LINKS.produto.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-2.5">
              {LINKS.empresa.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {LINKS.legal.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 OpenTentacles. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito no Brasil &mdash; Powered by OpenClaw
          </p>
        </div>
      </div>
    </footer>
  )
}