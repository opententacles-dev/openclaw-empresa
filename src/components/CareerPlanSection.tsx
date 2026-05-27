'use client'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Wallet, Target } from 'lucide-react'

const LEVELS = [
  { label: 'Iniciante', range: 'ate R$15/mês', color: 'text-muted-foreground', dot: 'bg-muted-foreground' },
  { label: 'Crescimento', range: 'ate R$150/mês', color: 'text-blue-400', dot: 'bg-blue-400' },
  { label: 'Avancado', range: 'ate R$1.500/mês', color: 'text-primary', dot: 'bg-primary' },
  { label: 'Elite', range: 'ate R$15.000/mês', color: 'text-yellow-400', dot: 'bg-yellow-400' },
]

export function CareerPlanSection() {
  return (
    <section id="carreira" className="relative py-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Plano Carreira
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Seu negócio cresce.<br />Sua renda também.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              O Plano Carreira acumula automaticamente 2% da sua assinatura e 8% das suas comissoes em um fundo individual. Quanto mais você usa e indica, mais acumula — sem limite.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: '2%', desc: 'da assinatura mensal' },
                { icon: Award, label: '8%', desc: 'sobre comissoes geradas' },
                { icon: Wallet, label: '3 formas', desc: 'de resgate disponível' },
                { icon: Target, label: 'Sem limite', desc: 'de acúmulo maximo' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <item.icon className="mb-2 h-5 w-5 text-primary" />
                  <div className="text-xl font-bold text-white">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-7"
          >
            <h3 className="mb-6 text-lg font-bold text-white">Níveis de acúmulo</h3>
            <div className="space-y-3">
              {LEVELS.map((level, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-background p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${level.dot}`} />
                    <span className="font-medium text-white text-sm">{level.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${level.color}`}>{level.range}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-white">Formas de resgate: </span>
                crédito de IA, PIX direto na sua conta ou meses grátis de plano.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}