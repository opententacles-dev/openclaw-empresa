'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Star, Shield, Gift, ChevronLeft, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const COUNTER_TARGET = 1_247

const BENEFITS = [
  {
    icon: Gift,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    title: 'R$5 de crédito grátis',
    desc: 'Teste o agente no lançamento sem gastar nada. Nenhum cartão necessário.',
  },
  {
    icon: Zap,
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
    title: 'Acesso beta exclusivo',
    desc: 'Entre antes de todo mundo e explore todas as funcionalidades antes do lançamento público.',
  },
  {
    icon: Star,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Preço fundador',
    desc: 'Desconto especial e permanente para os primeiros inscritos. Nunca paga preço cheio.',
  },
  {
    icon: Shield,
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    title: 'Suporte VIP',
    desc: 'Acesso direto à equipe no lançamento — sua dúvida respondida em minutos.',
  },
]

const AVATAR_COLORS = ['#E63946', '#8B5CF6', '#25D366', '#F59E0B', '#2AABEE']

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1800
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * COUNTER_TARGET))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setError('Digite um e-mail válido.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Algo deu errado. Tente novamente.')
      }
    } catch {
      setError('Algo deu errado. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.07] blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      {/* Minimal header */}
      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="OpenTentacles" width={34} height={34} className="h-8 w-auto" />
          <span className="text-base font-bold text-white">
            Open<span className="text-primary">Tentacles</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border/80 hover:text-white"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Voltar
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 md:px-10">
        <div className="mx-auto w-full max-w-2xl text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Lista de espera aberta — vagas limitadas
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            A revolução dos<br />
            agentes de IA<br />
            <span className="text-primary">chegou ao Brasil.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Enquanto plataformas como{' '}
            <span className="font-medium text-white">OpenClaw</span> e{' '}
            <span className="font-medium text-white">Hermes</span> exigem horas de
            configuração técnica, o{' '}
            <span className="font-semibold text-primary">OpenTentacles</span> é a primeira
            plataforma brasileira que hospeda agentes de IA com{' '}
            <span className="font-semibold text-white">1 clique</span>.
          </motion.p>

          {/* Social counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mb-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2.5">
              {AVATAR_COLORS.map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className="h-8 w-8 rounded-full border-2 border-background shadow-sm"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-xl font-bold tabular-nums text-white">
                {count.toLocaleString('pt-BR')}
              </span>{' '}
              pessoas já na lista
            </p>
          </motion.div>

          {/* Form / Success */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  <form
                    onSubmit={handleSubmit}
                    className="mx-auto mb-3 flex max-w-md flex-col gap-2.5 sm:flex-row sm:gap-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      className="flex-1 rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-white placeholder:text-muted-foreground outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Entrando...
                        </span>
                      ) : (
                        <>
                          Garantir minha vaga
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-3 flex items-center justify-center gap-1.5 text-sm text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                      {error}
                    </motion.p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Sem spam. Sem compromisso. Cancele quando quiser.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mx-auto max-w-sm rounded-2xl border border-green-500/25 bg-green-500/5 p-6"
                >
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                    <CheckCircle2 className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="text-lg font-semibold text-white">Você está na lista!</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Você será um dos primeiros a saber quando o acesso beta abrir.
                    Verifique seu e-mail.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Divider */}
          <div className="my-12 border-t border-border/40" />

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Vantagens de entrar agora
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left ${b.bg}`}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background/60">
                    <b.icon className={`h-4 w-4 ${b.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comparison card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl border border-border bg-card p-6"
          >
            <p className="mb-5 text-sm font-semibold text-white">
              Por que OpenTentacles é diferente?
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4 text-center">
                <p className="mb-2 font-semibold text-red-400">OpenClaw</p>
                <ul className="space-y-1 text-left">
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
                    Instalação manual em VPS própria
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
                    Horas de configuração técnica
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
                    Sem suporte em português
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-orange-500/15 bg-orange-500/5 p-4 text-center">
                <p className="mb-2 font-semibold text-orange-400">Hermes</p>
                <ul className="space-y-1 text-left">
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
                    Curva técnica elevada
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
                    Integrações complexas
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
                    Sem hospedagem gerenciada
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center ring-1 ring-primary/20">
                <p className="mb-2 font-semibold text-primary">OpenTentacles ✓</p>
                <ul className="space-y-1 text-left">
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-green-400" />
                    1 clique, pronto em 3 minutos
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-green-400" />
                    Sem código, sem servidor
                  </li>
                  <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-green-400" />
                    Suporte multilíngue nativo
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <footer className="relative z-10 border-t border-border/40 py-7 text-center text-xs text-muted-foreground">
        © 2026 OpenTentacles &nbsp;·&nbsp;
        <Link href="/" className="transition-colors hover:text-white">
          Voltar para a home
        </Link>
      </footer>
    </div>
  )
}
