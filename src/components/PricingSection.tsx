'use client'
import { motion } from 'framer-motion'
import { Check, Zap, Crown, Building2 } from 'lucide-react'

const PLANS = [
  {
    name: 'Start',
    price: '49',
    icon: Zap,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    description: 'Para comecar a automatizar agora',
    features: ['1 agente de IA', '2 GB RAM dedicado', 'WhatsApp + Telegram', 'Skills essenciais', 'Suporte por e-mail', 'OctoVault incluido', 'Atualizações automáticas'],
    cta: 'Comecar com Start',
    popular: false,
  },
  {
    name: 'Pro',
    price: '99',
    icon: Crown,
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
    description: 'Para quem quer automatizar de verdade',
    features: ['1 agente de IA', '4 GB RAM dedicado', '20+ canais disponíveis', 'Todas as skills', 'Browser automation', 'Suporte multilíngue prioritário', 'Analytics avancado', 'OctoVault incluido'],
    cta: 'Comecar com Pro',
    popular: true,
  },
  {
    name: 'Scale',
    price: '199',
    icon: Building2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Para empresas e revendedores',
    features: ['3 agentes de IA', '8 GB RAM dedicado', '20+ canais disponíveis', 'API própria', 'Browser automation', 'Suporte VIP multilíngue', 'OctoVault avancado', 'White-label disponível'],
    cta: 'Comecar com Scale',
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="preços" className="relative py-24 overflow-hidden bg-muted/20">
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
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Planos simples. Preço fixo.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sem surpresas na fatura. Escolha o plano ideal e comece em minutos.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-2xl border p-7 ${plan.popular ? 'border-primary bg-card shadow-xl shadow-primary/10' : 'border-border bg-card'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                    Mais popular
                  </span>
                </div>
              )}
              <div className="mb-5">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${plan.bg}`}>
                  <plan.icon className={`h-6 w-6 ${plan.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-muted-foreground mb-1">/mês</span>
              </div>
              <ul className="mb-7 flex-1 space-y-3">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-emerald-500'}`} />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#criar" className={`flex items-center justify-center rounded-xl py-3.5 text-sm font-semibold transition-colors ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25' : 'border border-border text-white hover:bg-muted'}`}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Todos os planos incluem 7 dias grátis &middot; Cancele quando quiser &middot; Sem multa
        </motion.p>
      </div>
    </section>
  )
}