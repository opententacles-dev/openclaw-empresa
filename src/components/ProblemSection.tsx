'use client'
import { motion } from 'framer-motion'
import { XCircle, CheckCircle2 } from 'lucide-react'

const PAINS = [
  'Terminal, SSH, VPS e Docker - dias ate funcionar',
  'R$200-700/mês variavel - conta muda todo mês',
  'Servidor cai? Você resolve - mesmo as 3h da manha',
  'Suporte so em inglês - Google Tradutor sempre aberto',
  'Credenciais expostas no código - risco de segurança real',
  'Cada atualização = mais horas de terminal',
]

const GAINS = [
  '8 perguntas, 3 minutos - agente no ar sem ver código',
  'R$49/mês fixo - mesmo valor, todo mês, sem surpresas',
  'Monitoramento 24h - nossa equipe cuida enquanto você dorme',
  'Suporte multilíngue (PT, EN, ES e mais), humano de verdade, resposta rápida',
  'OctoVault: AES-256 + LGPD - credenciais nunca expostas',
  'Atualizações automáticas - sempre na versao mais recente',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay },
})

export function ProblemSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            O problema real
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Você ja tentou configurar<br className="hidden sm:block" /> um agente de IA sozinho?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A maioria das pessoas desiste antes de ver o agente funcionar. Veja a diferenca que o OpenTentacles faz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-7 md:p-8"
          >
            <div className="mb-6">
              <span className="inline-block mb-3 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 uppercase tracking-wider">
                A forma difícil
              </span>
              <h3 className="text-2xl font-bold text-white">Sem OpenTentacles</h3>
            </div>
            <ul className="space-y-4">
              {PAINS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="text-muted-foreground leading-snug">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-7 md:p-8"
          >
            <div className="mb-6">
              <span className="inline-block mb-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                A forma inteligente
              </span>
              <h3 className="text-2xl font-bold text-white">Com OpenTentacles</h3>
            </div>
            <ul className="space-y-4">
              {GAINS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span className="text-white leading-snug">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}