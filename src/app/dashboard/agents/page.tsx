'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bot, Plus, MessageSquare, Clock, ChevronRight } from 'lucide-react'

type Agent = {
  id: string
  name: string
  container_id: string
  status: string
  telegram_token: string | null
  created_at: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/agents').then(r => r.json()).then(d => {
      setAgents(Array.isArray(d) ? d : [])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Meus Agentes</h1>
          <p className="text-white/40 text-sm mt-0.5">{agents.length} agente{agents.length !== 1 ? 's' : ''} configurado{agents.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/register" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#cc3040] transition-all">
          <Plus className="w-4 h-4" />
          Novo agente
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-white/20" />
          </div>
          <h2 className="text-white/60 font-medium mb-2">Nenhum agente ainda</h2>
          <p className="text-white/30 text-sm mb-6">Crie seu primeiro agente de IA em 3 minutos.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#cc3040] transition-all">
            <Plus className="w-4 h-4" />
            Criar primeiro agente
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={'/dashboard/agents/' + agent.container_id} className="block bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-white/[0.05] transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#E63946]/15 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#E63946]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-400' : 'bg-white/20'}`} />
                    <span className="text-xs text-white/40">{agent.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-[#E63946] transition-colors">{agent.name}</h3>
                <p className="text-white/35 text-xs font-mono mb-3">{agent.container_id}</p>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {agent.telegram_token ? 'Telegram ativo' : 'Sem canal'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(agent.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-xs text-white/30">Ver painel completo</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#E63946] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}