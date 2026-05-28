'use client'
import { motion } from 'framer-motion'
import { Zap, Brain, Globe, UserCheck, BarChart2, ShieldCheck, Smartphone } from 'lucide-react'

const FEATURES = [
  { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', title: 'Fica mais inteligente com o tempo', description: 'Cada conversa treina seu agente. Ele se adapta ao seu negócio automaticamente, sem você fazer nada.' },
  { icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', title: 'Atende em qualquer idioma', description: 'Detecta automaticamente o idioma do cliente — português, inglês, espanhol e mais de 50 línguas. Responde sempre no idioma dele, sem configurar nada.' },
  { icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Handoff inteligente para humano', description: 'Quando precisar de atenção especial, o agente transfere para você com todo o histórico da conversa.' },
  { icon: BarChart2, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', title: 'Analytics em tempo real', description: 'Taxa de resolução, horarios de pico, tópicos frequentes. Tudo visível no painel, em tempo real.' },
  { icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10 border-primary/20', title: 'Segurança OctoVault automática', description: 'Credenciais com AES-256-GCM. Conformidade LGPD. Auditoria completa. Zero senhas expostas.' },
  { icon: Smartphone, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', title: 'Controle total pelo celular', description: 'Painel 100% mobile. Ajuste o comportamento do agente e gerencie tudo de qualquer lugar.' },
]

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="relative py-24 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Nossos diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Tudo que você precisa.<br className="hidden sm:block" /> Nada que você não precisa.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            7 recursos exclusivos que fazem o OpenTentacles ser diferente de qualquer outra solução.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-5 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent p-7 md:p-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <span className="mb-2 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-0.5 text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                Destaque #1
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Pronto em 3 minutos</h3>
              <p className="mt-1 text-muted-foreground text-base max-w-2xl">
                Do zero ao agente online em menos tempo do que um café. Sem terminal, sem código, sem dor de cabeça. A solução mais rápida do mercado global de IA.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/30"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${f.bg}`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="mb-2 text-base font-bold text-white leading-snug">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}