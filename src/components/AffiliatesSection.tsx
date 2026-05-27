'use client'
import { motion } from 'framer-motion'
import { Users, DollarSign, Share2, Gift } from 'lucide-react'

const STATS = [
  { icon: DollarSign, value: '10%', label: 'de comissao por 6 meses' },
  { icon: Users, value: '5 indicados', label: 'Pro = R$247,50/mês extra' },
  { icon: Share2, value: 'Link único', label: 'para rastreamento automático' },
  { icon: Gift, value: 'Pagamento', label: 'automático todo mês' },
]

export function AffiliatesSection() {
  return (
    <section id="afiliados" className="relative py-24 overflow-hidden bg-muted/20">
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
            Programa de Afiliados
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Indique e ganhe automaticamente
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compartilhe seu link, receba 10% de tudo que seu indicado pagar pelos próximos 6 meses. Sem burocracia, sem formulario.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
        >
          <p className="text-white text-lg font-medium mb-1">
            5 indicados no plano Pro = <span className="text-primary font-bold">R$247,50 por mês</span> automático
          </p>
          <p className="text-muted-foreground text-sm mb-6">Sem teto. Quanto mais você indica, mais você ganha.</p>
          <a href="#criar" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors">
            Quero ser afiliado
          </a>
        </motion.div>
      </div>
    </section>
  )
}