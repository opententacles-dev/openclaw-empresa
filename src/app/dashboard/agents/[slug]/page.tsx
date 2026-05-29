'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageSquare, Plug, Zap, FolderOpen, Brain, Settings, ArrowLeft, Loader2, Save, Trash2, CheckCircle, ExternalLink } from 'lucide-react'

type Agent = {
  id: string; name: string; container_id: string; status: string
  telegram_token: string | null; soul_md: string; created_at: string
}

const TABS = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'channels', label: 'Canais', icon: Plug },
  { id: 'connectors', label: 'Conectores', icon: Zap },
  { id: 'skills', label: 'Habilidades', icon: Zap },
  { id: 'files', label: 'Arquivos', icon: FolderOpen },
  { id: 'memory', label: 'Memoria', icon: Brain },
  { id: 'settings', label: 'Config', icon: Settings },
]

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
        <Zap className="w-7 h-7 text-white/20" />
      </div>
      <h3 className="text-white/60 font-medium mb-2">{label}</h3>
      <p className="text-white/25 text-sm">Em desenvolvimento — disponivel em breve</p>
      <span className="mt-3 px-3 py-1 text-xs text-[#E63946] border border-[#E63946]/30 rounded-full">Em breve</span>
    </div>
  )
}

function TabChat({ agent }: { agent: Agent }) {
  return (
    <div>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#E63946]/15 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#E63946]" />
          </div>
          <div>
            <p className="text-white font-semibold">{agent.name}</p>
            <p className="text-white/40 text-xs">{agent.container_id}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-white/40">Ativo</span>
          </div>
        </div>
        {agent.telegram_token ? (
          <div className="bg-[#229ED9]/10 border border-[#229ED9]/20 rounded-xl p-4">
            <p className="text-[#229ED9] text-sm font-medium mb-1">Telegram conectado</p>
            <p className="text-white/50 text-xs">Seus clientes ja podem falar com {agent.name} pelo Telegram.</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/60 text-sm font-medium mb-1">Configure o canal primeiro</p>
            <p className="text-white/35 text-xs">Va para a aba "Canais" e adicione o token do Telegram para ativar o chat.</p>
          </div>
        )}
      </div>
      <ComingSoon label="Interface de chat em desenvolvimento" />
    </div>
  )
}

function TabChannels({ agent, onUpdate }: { agent: Agent; onUpdate: (data: Partial<Agent>) => void }) {
  const [token, setToken] = useState(agent.telegram_token || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/agents/' + agent.container_id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_token: token }),
      })
      const data = await res.json()
      if (data.ok) { onUpdate({ telegram_token: token }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#229ED9]/15 flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.478c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.602l-2.95-.924c-.642-.2-.655-.643.136-.953l11.52-4.443c.535-.194 1.003.131.596.966z"/></svg>
          </div>
          <div>
            <p className="text-white font-semibold">Telegram</p>
            <p className="text-white/40 text-xs">{agent.telegram_token ? 'Conectado' : 'Nao configurado'}</p>
          </div>
          {agent.telegram_token && <div className="ml-auto flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /><span className="text-xs text-green-400">Ativo</span></div>}
        </div>
        <p className="text-white/50 text-sm mb-4">Cole o token do bot do Telegram abaixo. Para criar um bot, fale com o <a href="https://t.me/BotFather" target="_blank" className="text-[#229ED9] hover:underline">@BotFather</a>.</p>
        <div className="space-y-3">
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="1234567890:AAFxxx..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm font-mono focus:outline-none focus:border-[#229ED9]/50 transition-colors"
          />
          <button onClick={save} disabled={saving || !token.trim()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ED9] text-white text-sm font-semibold hover:bg-[#1a8fbd] disabled:opacity-40 transition-all">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar token'}
          </button>
        </div>
      </div>
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 opacity-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          </div>
          <div>
            <p className="text-white font-medium text-sm">WhatsApp</p>
            <span className="text-[10px] text-[#E63946] border border-[#E63946]/30 rounded px-1.5 py-0.5">Fase 2</span>
          </div>
        </div>
        <p className="text-white/30 text-xs">Integracao com WhatsApp Business API disponivel em breve.</p>
      </div>
    </div>
  )
}

function TabConnectors() {
  const connectors = [
    { name: 'Gmail', color: '#EA4335', desc: 'Leitura e envio de emails', available: false },
    { name: 'Google Drive', color: '#4285F4', desc: 'Acesso a arquivos e docs', available: false },
    { name: 'Notion', color: '#FFFFFF', desc: 'Leitura de bases de dados', available: false },
    { name: 'Slack', color: '#4A154B', desc: 'Mensagens e canais', available: false },
    { name: 'LinkedIn', color: '#0A66C2', desc: 'Perfil e conexoes', available: false },
    { name: 'Trello', color: '#0079BF', desc: 'Boards e tarefas', available: false },
  ]
  return (
    <div>
      <p className="text-white/40 text-sm mb-5">Conecte ferramentas externas para expandir as capacidades do seu agente.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {connectors.map(c => (
          <div key={c.name} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{c.name[0]}</span>
              </div>
              <span className="text-[10px] text-[#E63946] border border-[#E63946]/30 rounded px-1.5 py-0.5">Em breve</span>
            </div>
            <p className="text-white text-sm font-medium">{c.name}</p>
            <p className="text-white/35 text-xs mt-0.5">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabMemory({ agent, onUpdate }: { agent: Agent; onUpdate: (data: Partial<Agent>) => void }) {
  const [soul, setSoul] = useState(agent.soul_md || '')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/agents/' + agent.container_id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soul_md: soul }),
      })
      const data = await res.json()
      if (data.ok) { onUpdate({ soul_md: soul }); setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2000) }
    } finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">SOUL.md</h3>
          <p className="text-white/40 text-xs mt-0.5">Identidade, missao e regras do agente</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs hover:text-white hover:border-white/20 transition-all">
            Editar
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setEditing(false); setSoul(agent.soul_md || '') }} className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white transition-all">
              Cancelar
            </button>
            <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E63946] text-white text-xs font-medium hover:bg-[#cc3040] transition-all">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
              {saved ? 'Salvo!' : 'Salvar'}
            </button>
          </div>
        )}
      </div>
      {editing ? (
        <textarea value={soul} onChange={e => setSoul(e.target.value)} rows={24}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#E63946]/50 transition-colors resize-none leading-relaxed" />
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-4 max-h-96 overflow-y-auto">
          <pre className="text-white/60 text-xs font-mono whitespace-pre-wrap leading-relaxed">{soul || 'Nenhum SOUL.md configurado.'}</pre>
        </div>
      )}
    </div>
  )
}

function TabSettings({ agent, onUpdate }: { agent: Agent; onUpdate: (data: Partial<Agent>) => void }) {
  const router = useRouter()
  const [name, setName] = useState(agent.name)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const saveConfig = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/agents/' + agent.container_id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (data.ok) { onUpdate({ name }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    } finally { setSaving(false) }
  }

  const deleteAgent = async () => {
    if (!confirm('Tem certeza que deseja deletar o agente ' + agent.name + '? Esta acao nao pode ser desfeita.')) return
    setDeleting(true)
    try {
      await fetch('/api/dashboard/agents/' + agent.container_id, { method: 'DELETE' })
      router.push('/dashboard/agents')
    } finally { setDeleting(false) }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Geral</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/35 uppercase tracking-wider font-medium mb-1.5 block">Nome do agente</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-white/35 uppercase tracking-wider font-medium mb-1.5 block">Identificador (slug)</label>
            <input type="text" value={agent.container_id} disabled
              className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-white/30 text-sm font-mono cursor-not-allowed" />
          </div>
          <button onClick={saveConfig} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#cc3040] disabled:opacity-40 transition-all">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Salvo!' : 'Salvar alteracoes'}
          </button>
        </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
        <h3 className="text-red-400 font-semibold mb-2">Zona de perigo</h3>
        <p className="text-white/40 text-sm mb-4">Deletar o agente remove permanentemente todos os dados, configuracoes e historico.</p>
        <button onClick={deleteAgent} disabled={deleting} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 text-red-400 text-sm font-medium hover:bg-red-500/10 disabled:opacity-40 transition-all">
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Deletar agente
        </button>
      </div>
    </div>
  )
}

export default function AgentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('chat')

  useEffect(() => {
    fetch('/api/dashboard/agents/' + slug).then(r => r.json()).then(d => {
      if (d.id) setAgent(d)
      else router.push('/dashboard/agents')
    }).finally(() => setLoading(false))
  }, [slug, router])

  const updateAgent = (data: Partial<Agent>) => setAgent(prev => prev ? { ...prev, ...data } : prev)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!agent) return null

  const tabComponents: Record<string, React.ReactNode> = {
    chat: <TabChat agent={agent} />,
    channels: <TabChannels agent={agent} onUpdate={updateAgent} />,
    connectors: <TabConnectors />,
    skills: <ComingSoon label="Marketplace de habilidades" />,
    files: <ComingSoon label="Upload de arquivos e documentos" />,
    memory: <TabMemory agent={agent} onUpdate={updateAgent} />,
    settings: <TabSettings agent={agent} onUpdate={updateAgent} />,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.push('/dashboard/agents')} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-10 h-10 bg-[#E63946]/15 rounded-xl flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-[#E63946]" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">{agent.name}</h1>
          <p className="text-white/35 text-xs font-mono">{agent.container_id}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-white/40">Ativo</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeTab === tab.id ? 'bg-[#E63946] text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
          {tabComponents[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}