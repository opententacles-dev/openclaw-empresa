'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, MessageSquare, Plug, Zap, FolderOpen, Brain, Settings,
  ArrowLeft, Loader2, Save, Trash2, CheckCircle, Upload, FileText,
  Calendar, Eye, Edit3, AlertTriangle
} from 'lucide-react'

type Agent = {
  id: string; name: string; container_id: string; status: string
  telegram_token: string | null; soul_md: string; created_at: string
}
type FileInfo = { name: string; size: number; modified: string }
type FilesData = { agent_files: FileInfo[]; memory_files: FileInfo[]; data_files: FileInfo[] }

const TABS = [
  { id: 'chat', label: 'Chat', icon: MessageSquare, desc: 'Testar o agente' },
  { id: 'channels', label: 'Canais', icon: Plug, desc: 'Telegram e outros' },
  { id: 'connectors', label: 'Conectores', icon: Zap, desc: 'Apps externos' },
  { id: 'files', label: 'Arquivos', icon: FolderOpen, desc: 'Base de conhecimento' },
  { id: 'memory', label: 'Memoria', icon: Brain, desc: 'O que o agente sabe' },
  { id: 'settings', label: 'Config', icon: Settings, desc: 'Personalidade e ajustes' },
]

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 mb-5">
      <p className="text-white/45 text-xs leading-relaxed">{children}</p>
    </div>
  )
}

function SaveBar({ saving, saved, onSave, onCancel }: { saving: boolean; saved: boolean; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="flex gap-2 mt-3">
      <button onClick={onCancel} className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white transition-all">
        Cancelar
      </button>
      <button onClick={onSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E63946] text-white text-xs font-medium hover:bg-[#cc3040] disabled:opacity-50 transition-all">
        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
        {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
      </button>
    </div>
  )
}

function useFileSave(slug: string) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const save = async (name: string, content: string) => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/agents/' + slug + '/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      })
      const data = await res.json()
      if (data.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); return true }
    } finally { setSaving(false) }
    return false
  }
  return { saving, saved, save }
}

function FileEditor({ slug, name, label, description }: { slug: string; name: string; label: string; description: string }) {
  const [content, setContent] = useState('')
  const [original, setOriginal] = useState('')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const { saving, saved, save } = useFileSave(slug)

  useEffect(() => {
    fetch('/api/dashboard/agents/' + slug + '/file?name=' + encodeURIComponent(name))
      .then(r => r.json()).then(d => { if (d.content) { setContent(d.content); setOriginal(d.content) } })
      .finally(() => setLoading(false))
  }, [slug, name])

  const handleSave = async () => {
    const ok = await save(name, content)
    if (ok) { setOriginal(content); setEditing(false) }
  }

  if (loading) return <div className="h-24 flex items-center justify-center"><Loader2 className="w-4 h-4 text-white/30 animate-spin" /></div>

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-white font-semibold text-sm">{label}</p>
          <p className="text-white/35 text-xs mt-0.5">{description}</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs hover:text-white hover:border-white/20 transition-all">
            <Edit3 className="w-3 h-3" />
            Editar
          </button>
        )}
      </div>
      {editing ? (
        <>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={14}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#E63946]/50 transition-colors resize-y leading-relaxed" />
          <SaveBar saving={saving} saved={saved} onSave={handleSave} onCancel={() => { setContent(original); setEditing(false) }} />
        </>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 max-h-64 overflow-y-auto">
          <pre className="text-white/50 text-xs font-mono whitespace-pre-wrap leading-relaxed">{content || '(arquivo vazio)'}</pre>
        </div>
      )}
    </div>
  )
}

function TabChat({ agent }: { agent: Agent }) {
  return (
    <div>
      <InfoBox>
        O Chat permite testar como seu agente responde antes de ativar com clientes reais. Configure um canal na aba Canais para comecar.
      </InfoBox>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E63946]/15 rounded-xl flex items-center justify-center"><Bot className="w-5 h-5 text-[#E63946]" /></div>
          <div className="flex-1">
            <p className="text-white font-semibold">{agent.name}</p>
            <p className="text-white/40 text-xs font-mono">{agent.container_id}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-green-400">Ativo</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/8">
          {agent.telegram_token ? (
            <div className="bg-[#229ED9]/10 border border-[#229ED9]/20 rounded-xl p-3">
              <p className="text-[#229ED9] text-sm font-medium">Telegram conectado</p>
              <p className="text-white/40 text-xs mt-0.5">Clientes ja podem falar com {agent.name} pelo Telegram.</p>
            </div>
          ) : (
            <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-3">
              <p className="text-amber-400 text-sm font-medium">Canal nao configurado</p>
              <p className="text-white/35 text-xs mt-0.5">Va para a aba Canais e adicione o token do Telegram para ativar o atendimento.</p>
            </div>
          )}
        </div>
      </div>
      <div className="text-center py-12 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
        <MessageSquare className="w-8 h-8 text-white/15 mx-auto mb-3" />
        <p className="text-white/40 text-sm font-medium">Interface de chat em desenvolvimento</p>
        <p className="text-white/25 text-xs mt-1">Disponivel em breve — testes de conversa com o agente diretamente no painel</p>
      </div>
    </div>
  )
}

function TabChannels({ agent, onUpdate }: { agent: Agent; onUpdate: (d: Partial<Agent>) => void }) {
  const [token, setToken] = useState(agent.telegram_token || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/agents/' + agent.container_id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_token: token }),
      })
      const d = await res.json()
      if (d.ok) { onUpdate({ telegram_token: token }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    } finally { setSaving(false) }
  }

  return (
    <div>
      <InfoBox>
        Os canais sao os lugares onde seus clientes vao conversar com {agent.name}. Configure o token do Telegram para comecar a receber mensagens. WhatsApp e Instagram chegam em breve.
      </InfoBox>
      <div className="space-y-3">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#229ED9]/15 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.478c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.602l-2.95-.924c-.642-.2-.655-.643.136-.953l11.52-4.443c.535-.194 1.003.131.596.966z"/></svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">Telegram</p>
              <p className={`text-xs mt-0.5 ${agent.telegram_token ? 'text-green-400' : 'text-white/35'}`}>{agent.telegram_token ? 'Conectado e ativo' : 'Aguardando configuracao'}</p>
            </div>
            {agent.telegram_token && <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400" /></div>}
          </div>
          <p className="text-white/45 text-xs mb-3">Cole o token do bot. Para criar um bot, fale com o @BotFather no Telegram e use o comando /newbot.</p>
          <input type="text" value={token} onChange={e => setToken(e.target.value)}
            placeholder="1234567890:AAFxxxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-mono focus:outline-none focus:border-[#229ED9]/50 transition-colors mb-3" />
          <button onClick={save} disabled={saving || !token.trim()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ED9] text-white text-sm font-semibold hover:bg-[#1a8fbd] disabled:opacity-40 transition-all">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar token'}
          </button>
        </div>
        {[{label: 'WhatsApp', color: '#25D366', phase: 'Fase 2'}, {label: 'Instagram', color: '#E1306C', phase: 'Fase 3'}].map(c => (
          <div key={c.label} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><span className="text-xs font-bold text-white/50">{c.label[0]}</span></div>
            <div className="flex-1"><p className="text-white/60 text-sm font-medium">{c.label}</p><p className="text-white/30 text-xs">Disponivel na {c.phase}</p></div>
            <span className="text-[10px] text-[#E63946] border border-[#E63946]/30 rounded px-2 py-0.5">{c.phase}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabFiles({ agent }: { agent: Agent }) {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadFiles = () => {
    fetch('/api/dashboard/agents/' + agent.container_id + '/files')
      .then(r => r.json()).then(d => setFiles(d.data_files || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadFiles() }, [agent.container_id])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const content = await file.text()
      const res = await fetch('/api/dashboard/agents/' + agent.container_id + '/file', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'data/' + file.name, content }),
      })
      const d = await res.json()
      if (d.ok) loadFiles()
    } finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = '' }
  }

  const deleteFile = async (name: string) => {
    if (!confirm('Deletar ' + name.replace('data/', '') + '?')) return
    await fetch('/api/dashboard/agents/' + agent.container_id + '/file?name=' + encodeURIComponent(name), { method: 'DELETE' })
    setFiles(prev => prev.filter(f => f.name !== name))
  }

  const formatSize = (bytes: number) => bytes < 1024 ? bytes + 'B' : (bytes / 1024).toFixed(1) + 'KB'

  return (
    <div>
      <InfoBox>
        Os arquivos em data/ sao a base de conhecimento do {agent.name}. Suba PDFs, TXTs ou documentos com informacoes sobre seus produtos, servicos, FAQs e politicas. O agente usa esses arquivos para responder com precisao.
      </InfoBox>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white font-semibold">data/</p>
          <p className="text-white/35 text-xs mt-0.5">{files.length} arquivo{files.length !== 1 ? 's' : ''} de referencia</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-white/70 text-sm hover:text-white hover:bg-white/12 disabled:opacity-40 transition-all">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Enviando...' : 'Enviar arquivo'}
        </button>
        <input ref={fileInputRef} type="file" accept=".txt,.md,.pdf,.docx,.xlsx,.csv" onChange={handleUpload} className="hidden" />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-24"><Loader2 className="w-5 h-5 text-white/30 animate-spin" /></div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
          <FolderOpen className="w-8 h-8 text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">Nenhum arquivo ainda</p>
          <p className="text-white/25 text-xs mt-1">Envie documentos com informacoes sobre seu negocio</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map(f => (
            <div key={f.name} className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3">
              <FileText className="w-4 h-4 text-white/30 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{f.name.replace('data/', '')}</p>
                <p className="text-white/30 text-xs">{formatSize(f.size)}</p>
              </div>
              <button onClick={() => deleteFile(f.name)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TabMemory({ agent }: { agent: Agent }) {
  const [filesData, setFilesData] = useState<FilesData | null>(null)
  const [activeLog, setActiveLog] = useState<string | null>(null)
  const [logContent, setLogContent] = useState('')
  const [loadingLog, setLoadingLog] = useState(false)
  const [view, setView] = useState<'main' | 'log'>('main')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch('/api/dashboard/agents/' + agent.container_id + '/files')
      .then(r => r.json()).then(setFilesData)
  }, [agent.container_id])

  const openLog = async (name: string) => {
    setLoadingLog(true)
    setView('log')
    setActiveLog(name)
    try {
      const r = await fetch('/api/dashboard/agents/' + agent.container_id + '/file?name=' + encodeURIComponent(name))
      const d = await r.json()
      setLogContent(d.content || '')
    } finally { setLoadingLog(false) }
  }

  const formatDate = (name: string) => {
    const m = name.match(/(\d{4}-\d{2}-\d{2})/)
    if (!m) return name
    return new Date(m[1] + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div>
      {view === 'log' ? (
        <div>
          <button onClick={() => setView('main')} className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <p className="text-white font-semibold mb-1">{activeLog && formatDate(activeLog)}</p>
          <p className="text-white/35 text-xs mb-3">Log do dia — {activeLog}</p>
          {loadingLog ? (
            <div className="flex items-center justify-center h-24"><Loader2 className="w-5 h-5 text-white/30 animate-spin" /></div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 max-h-96 overflow-y-auto">
              <pre className="text-white/55 text-xs font-mono whitespace-pre-wrap leading-relaxed">{logContent || '(vazio)'}</pre>
            </div>
          )}
        </div>
      ) : (
        <div>
          <InfoBox>
            A memoria do agente tem duas camadas: MEMORY.md guarda fatos importantes de longo prazo (carregado apenas em sessoes privadas), e os logs diarios em memory/ registram o que aconteceu cada dia.
          </InfoBox>
          <FileEditor slug={agent.container_id} name="MEMORY.md" label="MEMORY.md — Memoria de longo prazo" description="Fatos sobre a empresa, clientes importantes, decisoes tomadas. Carregado apenas em sessoes privadas." />
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-semibold text-sm">Logs diarios — memory/</p>
                <p className="text-white/35 text-xs mt-0.5">O agente escreve um resumo do dia a cada noite</p>
              </div>
              <span className="text-xs text-white/30">{filesData?.memory_files?.length || 0} arquivos</span>
            </div>
            {!filesData ? (
              <div className="flex items-center justify-center h-16"><Loader2 className="w-4 h-4 text-white/30 animate-spin" /></div>
            ) : filesData.memory_files.length === 0 ? (
              <div className="text-center py-8 bg-white/[0.02] border border-dashed border-white/8 rounded-xl">
                <Calendar className="w-6 h-6 text-white/15 mx-auto mb-2" />
                <p className="text-white/35 text-xs">Nenhum log ainda</p>
                <p className="text-white/20 text-xs mt-0.5">Os logs aparecem apos o agente comecar a trabalhar</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filesData.memory_files.map(f => (
                  <button key={f.name} onClick={() => openLog(f.name)}
                    className="w-full flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 hover:border-white/15 hover:bg-white/[0.05] transition-all text-left group">
                    <Calendar className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{formatDate(f.name)}</p>
                      <p className="text-white/30 text-xs">{(f.size / 1024).toFixed(1)}KB</p>
                    </div>
                    <Eye className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TabSettings({ agent, onUpdate }: { agent: Agent; onUpdate: (d: Partial<Agent>) => void }) {
  const router = useRouter()
  const [name, setName] = useState(agent.name)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [subTab, setSubTab] = useState<'general' | 'soul' | 'identity' | 'rules'>('general')

  const saveGeneral = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/agents/' + agent.container_id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }),
      })
      const d = await res.json()
      if (d.ok) { onUpdate({ name }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    } finally { setSaving(false) }
  }

  const deleteAgent = async () => {
    if (!confirm('Deletar ' + agent.name + ' permanentemente? Isso nao pode ser desfeito.')) return
    setDeleting(true)
    try {
      await fetch('/api/dashboard/agents/' + agent.container_id, { method: 'DELETE' })
      router.push('/dashboard/agents')
    } finally { setDeleting(false) }
  }

  const subTabs = [
    { id: 'general', label: 'Geral' },
    { id: 'soul', label: 'Personalidade' },
    { id: 'identity', label: 'Identidade' },
    { id: 'rules', label: 'Regras' },
  ] as const

  return (
    <div>
      <div className="flex gap-1 bg-white/[0.03] border border-white/8 rounded-xl p-1 mb-5 overflow-x-auto">
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setSubTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${subTab === t.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'general' && (
        <div className="space-y-5 max-w-lg">
          <InfoBox>Configure o nome de exibicao do agente e veja seu identificador unico (slug). O slug e gerado automaticamente e nao pode ser alterado.</InfoBox>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <p className="text-white font-semibold mb-4">Informacoes basicas</p>
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
              <button onClick={saveGeneral} disabled={saving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#cc3040] disabled:opacity-40 transition-all">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Salvo!' : 'Salvar alteracoes'}
              </button>
            </div>
          </div>
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-red-400" /><p className="text-red-400 font-semibold">Zona de perigo</p></div>
            <p className="text-white/35 text-xs mb-4">Deletar o agente remove permanentemente todos os dados, arquivos e historico. Esta acao nao pode ser desfeita.</p>
            <button onClick={deleteAgent} disabled={deleting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 disabled:opacity-40 transition-all">
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Deletar agente
            </button>
          </div>
        </div>
      )}

      {subTab === 'soul' && (
        <div>
          <InfoBox>O SOUL.md define a personalidade completa do agente: quem ele e, seu tom de voz, seus valores e o que ele nunca deve fazer. E o arquivo mais importante — mude com cuidado.</InfoBox>
          <FileEditor slug={agent.container_id} name="SOUL.md" label="SOUL.md — Personalidade e valores" description="Who You Are, Tone, Values, Hard Limits. Max ~2000 palavras." />
        </div>
      )}

      {subTab === 'identity' && (
        <div>
          <InfoBox>O IDENTITY.md define a apresentacao do agente: nome, emoji, vibe e como ele se apresenta na primeira mensagem.</InfoBox>
          <FileEditor slug={agent.container_id} name="IDENTITY.md" label="IDENTITY.md — Quem sou eu" description="Nome, emoji, creature, vibe, auto-apresentacao." />
        </div>
      )}

      {subTab === 'rules' && (
        <div>
          <InfoBox>O AGENTS.md define as regras operacionais: quando escalar para humano, protocolo de seguranca, como usar memoria e o que fazer fora do escopo.</InfoBox>
          <FileEditor slug={agent.container_id} name="AGENTS.md" label="AGENTS.md — Regras operacionais" description="Escalacao, seguranca, memoria, protocolo de sessao." />
        </div>
      )}
    </div>
  )
}

function TabConnectors() {
  const connectors = [
    { name: 'Gmail', desc: 'Leitura e envio de emails' },
    { name: 'Google Drive', desc: 'Acesso a documentos e planilhas' },
    { name: 'Notion', desc: 'Leitura de bases de dados' },
    { name: 'Slack', desc: 'Mensagens e canais' },
    { name: 'LinkedIn', desc: 'Perfil e conexoes' },
    { name: 'Trello', desc: 'Boards e tarefas' },
  ]
  return (
    <div>
      <InfoBox>Os conectores permitem que seu agente acesse ferramentas externas — como ler emails, consultar planilhas ou criar tarefas. Cada conector amplia o que o agente pode fazer autonomamente.</InfoBox>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {connectors.map(c => (
          <div key={c.name} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 opacity-55 cursor-not-allowed">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><span className="text-xs font-bold text-white/60">{c.name[0]}</span></div>
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

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin" /></div>
  if (!agent) return null

  const tabContent: Record<string, React.ReactNode> = {
    chat: <TabChat agent={agent} />,
    channels: <TabChannels agent={agent} onUpdate={updateAgent} />,
    connectors: <TabConnectors />,
    files: <TabFiles agent={agent} />,
    memory: <TabMemory agent={agent} />,
    settings: <TabSettings agent={agent} onUpdate={updateAgent} />,
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.push('/dashboard/agents')} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-10 h-10 bg-[#E63946]/15 rounded-xl flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-[#E63946]" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-white truncate">{agent.name}</h1>
          <p className="text-white/30 text-xs font-mono truncate">{agent.container_id}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-white/40 hidden sm:inline">Ativo</span>
        </div>
      </div>

      <div className="flex gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg min-w-[60px] transition-all flex-shrink-0 ${active ? 'bg-[#E63946] text-white' : 'text-white/35 hover:text-white hover:bg-white/5'}`}>
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}