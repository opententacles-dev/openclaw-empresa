'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Play, Star, MessageCircle, Send, Mail, Globe, Code2, Camera } from 'lucide-react'
import Image from 'next/image'

const CHANNELS = [
  { text: 'no WhatsApp',  color: '#25D366' },
  { text: 'no Telegram',  color: '#2AABEE' },
  { text: 'no Instagram', color: '#E1306C' },
  { text: 'por E-mail',   color: '#F59E0B' },
  { text: 'no Navegador', color: '#8B5CF6' },
  { text: 'via API',      color: '#60A5FA' },
]

const INTEGRATIONS = [
  { label: 'WhatsApp',  icon: MessageCircle, bg: 'bg-green-500/15',  fg: 'text-green-400'  },
  { label: 'Telegram',  icon: Send,          bg: 'bg-sky-500/15',    fg: 'text-sky-400'    },
  { label: 'Instagram', icon: Camera,        bg: 'bg-pink-500/15',   fg: 'text-pink-400'   },
  { label: 'E-mail',    icon: Mail,          bg: 'bg-amber-500/15',  fg: 'text-amber-400'  },
  { label: 'Navegador', icon: Globe,         bg: 'bg-violet-500/15', fg: 'text-violet-400' },
  { label: 'API',       icon: Code2,         bg: 'bg-blue-500/15',   fg: 'text-blue-400'   },
]

export function HeroSection() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % CHANNELS.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[700px] w-[700px] translate-x-1/3 -translate-y-1/4 rounded-full bg-primary/[0.08] blur-[130px]" />
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-12 md:py-0">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">

            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 flex justify-center md:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/mascote.png"
                    alt="Mascote OpenTentacles"
                    width={400}
                    height={427}
                    priority
                    className="relative w-64 sm:w-80 md:w-96 h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                20+ canais integrados
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Um agente de IA que<br />
                atende, vende<br />
                e automatiza{' '}
                <span className="inline-flex">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: CHANNELS[idx].color }}
                    >
                      {CHANNELS[idx].text}
                    </motion.span>
                  </AnimatePresence>
                </span>
                .
              </h1>

              <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Configure em{' '}
                <span className="font-semibold text-white">3 minutos, sem linha de código</span>.
                {' '}Seu negócio atendendo 24h em qualquer canal —
                OpenTentacles gerencia tudo por você.
              </p>

              <div className="mb-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <motion.a
                  href="#criar"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
                >
                  Criar meu agente grátis
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#demo"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-muted"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Ver como funciona
                </motion.a>
              </div>

              <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-white">5.0</span>
                </div>
                <div className="hidden h-4 w-px bg-border sm:block" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-white">+2.340</span> agentes criados
                </p>
                <div className="hidden h-4 w-px bg-border sm:block" />
                <p className="text-sm text-muted-foreground">Sem cartão de crédito</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {INTEGRATIONS.map((ch) => (
                  <span
                    key={ch.label}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${ch.bg} ${ch.fg}`}
                  >
                    <ch.icon className="h-3.5 w-3.5" />
                    {ch.label}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}