'use client'
import { motion } from 'framer-motion'
import { UserPlus, Settings, Rocket } from 'lucide-react'

const STEPS = [
  {
    time: '30 segundos',
    icon: UserPlus,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    title: 'Crie sua conta',
    description: 'Informe nome, e-mail e senha. Sem cartão de crédito, sem compromisso. Em 30 segundos você já está dentro.',
  },
  {
    time: '2 minutos',
    icon: Settings,
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
    title: 'Configure seu agente',
    description: 'Responda 8 perguntas sobre seu negócio — o que vende, como atende e qual tom de voz. O sistema monta tudo automaticamente.',
  },
  {
    time: '30 segundos',
    icon: Rocket,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Publique em qualquer canal',
    description: 'WhatsApp, Telegram, Instagram, e-mail ou todos ao mesmo tempo. Um clique e seu agente ja esta atendendo 24h.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-24 overflow-hidden bg-muted/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Como funciona
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Simples como usar o WhatsApp
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Do zero ao agente funcionando em 3 minutos. Sem instalar nada, sem saber programar.
          </p>
        </motion.div>

        <div className="relative grid gap-10 md:grid-cols-3">
          <div className="absolute hidden md:block top-10 left-[calc(16.66%+2.5rem)] right-[calc(16.66%+2.5rem)] h-px bg-gradient-to-r from-blue-500/30 via-primary/30 to-emerald-500/30" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className={`relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border ${step.bg}`}>
                <step.icon className={`h-8 w-8 ${step.color}`} />
                <span className={`absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border text-xs font-bold ${step.color}`}>
                  {i + 1}
                </span>
              </div>
              <span className="mb-3 rounded-full bg-muted border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                {step.time}
              </span>
              <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="mt-16 text-center"
        >
          <a href="#criar" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors">
            Quero meu agente em 3 minutos
          </a>
          <p className="mt-3 text-sm text-muted-foreground">Sem cartão de crédito &middot; Cancele quando quiser</p>
        </motion.div>
      </div>
    </section>
  )
}