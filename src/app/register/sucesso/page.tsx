'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Bot, Zap, Mail } from 'lucide-react'

function SuccessContent() {
  const params = useSearchParams()
  const agent = params.get('agent') || 'Seu agente'
  const company = params.get('company') || 'sua empresa'
  const slug = params.get('slug') || ''

  return (
    <div className="min-h-screen bg-[#0F0F1A] flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <Image src="/logo.png" alt="OpenTentacles" width={160} height={40} className="h-8 w-auto" />
      </div>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-[#E63946]/15 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-[#E63946]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h1 className="text-2xl font-bold text-white mb-2">Agente criado!</h1>
            <p className="text-white/50 text-sm mb-6">
              <span className="text-white font-semibold">{agent}</span> da{' '}
              <span className="text-white font-semibold">{company}</span> foi configurado com sucesso.
            </p>
            {slug && (
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 mb-6 inline-block">
                <p className="text-xs text-white/30 mb-0.5">ID do agente</p>
                <code className="text-[#E63946] text-sm font-mono">{slug}</code>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="space-y-3 text-left mb-8">
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-medium">Proximos passos</p>
            {[
              { icon: Bot, text: 'O SOUL.md do ' + agent + ' foi gerado com toda a configuracao de personalidade, memoria e seguranca.' },
              { icon: Zap, text: 'Nossa equipe vai ativar o bot no Telegram e configurar o canal de atendimento para voce.' },
              { icon: Mail, text: 'Em ate 24h voce recebe por e-mail as instrucoes de acesso ao seu painel.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-3.5 h-3.5 text-white/40" />
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href="/" className="block w-full py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-medium hover:bg-white/[0.07] hover:text-white transition-all text-center">
              Voltar ao inicio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}