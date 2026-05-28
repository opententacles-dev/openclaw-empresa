'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Clock, Headphones } from 'lucide-react'

export function CTAFinalSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.05] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-6 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Comece agora
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.08]">
            Seu agente de IA<br />esta esperando por você
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Mais de 2.000 empreendedores já automatizaram seus negócios com o OpenTentacles. Agora é a sua vez.
          </p>

          <motion.a
            href="/waitlist"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-colors"
          >
            Criar meu agente agora - grátis
            <ArrowRight className="h-6 w-6" />
          </motion.a>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Pronto em 3 minutos
            </span>
            <span className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" />
              Suporte multilíngue (PT, EN, ES e mais)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}