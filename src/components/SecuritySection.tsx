'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Eye, FileCheck, Server, Key } from 'lucide-react'

const ITEMS = [
  { icon: Lock, title: 'Criptografia AES-256-GCM', description: 'Padrão militar para proteger cada credencial armazenada no sistema.' },
  { icon: Eye, title: 'Zero senhas no código', description: 'Nenhuma chave de API fica exposta no código-fonte ou nos logs.' },
  { icon: FileCheck, title: 'Conformidade LGPD', description: 'Dados dos seus usuários tratados conforme a legislação de protecao de dados.' },
  { icon: Key, title: '2FA obrigatório', description: 'Autenticacao em dois fatores em todos os acessos ao sistema.' },
  { icon: Server, title: 'Infraestrutura isolada', description: 'Cada agente roda em ambiente separado, sem compartilhamento de recursos.' },
  { icon: ShieldCheck, title: 'Auditoria completa', description: 'Log de cada acao realizada disponível para revisao a qualquer momento.' },
]

export function SecuritySection() {
  return (
    <section className="relative py-24 overflow-hidden bg-muted/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              OctoVault
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Suas credenciais nunca ficam expostas
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              O OctoVault e nosso sistema exclusivo de proteção de credenciais. Desenvolvido para garantir que nenhuma chave de API, senha ou token fique exposto — nem no código, nem nos logs.
            </p>
            <div className="flex flex-wrap gap-3">
              {['AES-256-GCM', 'LGPD', '2FA', 'Zero-Knowledge', 'Audit Log'].map(badge => (
                <span key={badge} className="rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <item.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-1 text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}