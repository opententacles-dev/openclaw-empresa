'use client'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const ROWS = [
  { feature: 'Configuração',           openclaw: 'x:3+ dias',    hermes: 'w:1 dia',       ot: '3 minutos' },
  { feature: 'Custo mensal',           openclaw: 'x:R$200-700',  hermes: 'w:R$150-400',   ot: 'R$49 fixo' },
  { feature: 'Precisa programar?',     openclaw: 'x:Sim',        hermes: 'w:Parcial',     ot: 'Zero código' },
  { feature: 'Suporte multilíngue (PT, EN, ES e mais)',   openclaw: 'x:Não',        hermes: 'w:Parcial',     ot: 'PT, EN, ES e +' },
  { feature: 'Canais disponíveis',     openclaw: 'x:3-5',        hermes: 'w:5-10',        ot: '20+' },
  { feature: 'Segurança',             openclaw: 'x:Básica',     hermes: 'w:Básica',      ot: 'OctoVault' },
  { feature: 'Conformidade LGPD',     openclaw: 'x:Manual',     hermes: 'w:Parcial',     ot: 'Automático' },
  { feature: 'Atualizações',          openclaw: 'x:Manual',     hermes: 'v:Automática',  ot: 'Automática' },
  { feature: 'Controle dos dados',    openclaw: 'v:Sim',        hermes: 'x:Não',         ot: 'Total' },
  { feature: 'Painel mobile',         openclaw: 'x:Não',        hermes: 'w:Parcial',     ot: 'Completo' },
]

function Cell({ val, highlight }: { val: string; highlight?: boolean }) {
  if (highlight) {
    return (
      <span className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white">
        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
        {val}
      </span>
    )
  }
  const prefix = val.slice(0, 2)
  const text = val.slice(2)
  if (prefix === 'x:') return (
    <span className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/70">
      <X className="h-4 w-4 text-red-500/60 flex-shrink-0" />
      {text}
    </span>
  )
  if (prefix === 'w:') return <span className="text-sm text-yellow-500/70">{text}</span>
  return (
    <span className="flex items-center justify-center gap-1.5 text-sm text-emerald-400/80">
      <Check className="h-4 w-4 flex-shrink-0" />
      {text}
    </span>
  )
}

export function ComparisonSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Comparativo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Por que escolher OpenTentacles?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compare e veja por que somos a escolha mais inteligente para o seu negócio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-border"
        >
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left text-sm font-medium text-muted-foreground w-[32%]">Recurso</th>
                <th className="p-4 text-center text-sm font-medium text-muted-foreground w-[20%]">OpenClaw puro</th>
                <th className="p-4 text-center text-sm font-medium text-muted-foreground w-[20%]">Hermes</th>
                <th className="p-4 text-center w-[28%] bg-primary/10">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Recomendado</span>
                    <span className="text-sm font-bold text-white">OpenTentacles</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} className={`border-b border-border/40 last:border-0 ${i % 2 !== 0 ? 'bg-muted/[0.05]' : ''}`}>
                  <td className="p-4 text-sm font-medium text-white">{row.feature}</td>
                  <td className="p-4 text-center"><Cell val={row.openclaw} /></td>
                  <td className="p-4 text-center"><Cell val={row.hermes} /></td>
                  <td className="p-4 text-center bg-primary/[0.04]"><Cell val={row.ot} highlight /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a href="/waitlist" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors">
            Escolher OpenTentacles agora
          </a>
        </motion.div>
      </div>
    </section>
  )
}