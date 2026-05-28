'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'Preciso saber programar para usar o OpenTentacles?', a: 'Não. O OpenTentacles foi criado para funcionar sem nenhuma linha de código. Você responde 8 perguntas e seu agente esta pronto em 3 minutos.' },
  { q: 'Quais aplicativos são suportados?', a: 'WhatsApp, Telegram, Instagram, e-mail, navegador web e mais de 20 outros canais. Novos canais são adicionados regularmente.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim. Não existe fidelidade nem multa por cancelamento. Você pode cancelar a qualquer momento diretamente no painel, sem precisar entrar em contato.' },
  { q: 'Meus dados ficam seguros?', a: 'Sim. Usamos criptografia AES-256-GCM para proteger todas as credenciais. Somos conformes com a LGPD e seus dados nunca sao compartilhados com terceiros.' },
  { q: 'O custo da IA esta incluido no plano?', a: 'Sim. O acesso aos modelos de IA esta incluido em todos os planos. Você paga apenas o valor fixo do plano escolhido, sem surpresas na fatura.' },
  { q: 'Quantos agentes posso ter?', a: 'Os planos Start e Pro incluem 1 agente. O plano Scale inclui 3 agentes simultaneos.' },
  { q: 'O suporte é em português?', a: 'Sim, 100%. Nossa equipe de suporte detecta o idioma automaticamente e atende em português, inglês, espanhol e mais de 50 idiomas.' },
  { q: 'Quanto tempo leva para configurar?', a: 'Em média 3 minutos. Você responde 8 perguntas sobre seu negócio e o agente já está funcionando.' },
  { q: 'Posso testar antes de assinar?', a: 'Sim. Oferecemos crédito inicial gratuito para você testar sem cartão de crédito e sem compromisso.' },
  { q: 'O agente funciona com meu celular desligado?', a: 'Sim. Seu agente roda na nossa infraestrutura em nuvem, 24 horas por dia, 7 dias por semana, independente do seu dispositivo.' },
  { q: 'Qual a diferenca do OpenClaw puro?', a: 'O OpenClaw puro exige conhecimento técnico: terminal, SSH, Docker e configuração manual. O OpenTentacles gerencia tudo isso para você, sem necessidade de qualquer conhecimento técnico.' },
  { q: 'O agente detecta outros idiomas automaticamente?', a: 'Sim. Seu agente detecta o idioma do cliente automaticamente e responde na língua dele, sem nenhuma configuração adicional.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative py-24 overflow-hidden bg-muted/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Dúvidas frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Perguntas frequentes
          </h2>
          <p className="text-muted-foreground text-lg">Ainda tem dúvidas? Nossa equipe esta pronta para ajudar.</p>
        </motion.div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.035 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className="text-sm font-semibold text-white">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="border-t border-border/50 px-5 py-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}