'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User, Building2, Target, MessageSquare, Volume2, Smile, Globe, Clock, ArrowLeft, Check, Loader2 } from 'lucide-react'

type WizardData = {
  agentName: string
  email: string
  company: string
  mission: string
  channel: string
  tone: string
  personality: string
  language: string
  schedule: string
  scheduleCustom: string
}

const STEP_ICONS = [User, Building2, Target, MessageSquare, Volume2, Smile, Globe, Clock]
const STEP_LABELS = ['Identidade do Agente', 'Sua Empresa', 'Missao do Agente', 'Canal de Atendimento', 'Tom de Voz', 'Personalidade', 'Idioma', 'Horario']

const TONE_OPTIONS = [
  { value: 'formal', label: 'Formal', desc: 'Linguagem profissional e respeitosa' },
  { value: 'friendly', label: 'Amigavel', desc: 'Simpatico e proximo do cliente' },
  { value: 'casual', label: 'Descontraido', desc: 'Leve, informal e descolado' },
  { value: 'professional', label: 'Profissional', desc: 'Objetivo, direto e confiavel' },
]
const PERSONALITY_OPTIONS = [
  { value: 'helpful', label: 'Prestativo', desc: 'Vai alem para resolver o problema' },
  { value: 'objective', label: 'Objetivo', desc: 'Respostas curtas e eficientes' },
  { value: 'empathetic', label: 'Empatico', desc: 'Entende e valida o cliente' },
  { value: 'enthusiastic', label: 'Animado', desc: 'Energetico e motivador' },
]
const LANGUAGE_OPTIONS = [
  { value: 'pt', label: 'Portugues', desc: 'Sempre responde em portugues' },
  { value: 'en', label: 'Ingles', desc: 'Always responds in English' },
  { value: 'es', label: 'Espanhol', desc: 'Siempre responde en espanol' },
  { value: 'auto', label: 'Automatico', desc: 'Detecta o idioma do cliente' },
]
const SCHEDULE_OPTIONS = [
  { value: '24h', label: '24h / 7 dias', desc: 'Disponivel a qualquer momento' },
  { value: 'business', label: 'Horario Comercial', desc: 'Seg-Sex, 8h as 18h' },
  { value: 'custom', label: 'Personalizado', desc: 'Defina seu proprio horario' },
]

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
}

function OptionCard({ selected, onClick, label, desc }: { selected: boolean; onClick: () => void; label: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border text-left transition-all ${selected ? 'border-[#E63946] bg-[#E63946]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
    >
      <p className="text-white font-medium text-sm">{label}</p>
      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{desc}</p>
      {selected && <div className="w-1.5 h-1.5 rounded-full bg-[#E63946] mt-2" />}
    </button>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WizardData>({
    agentName: '', email: '', company: '', mission: '',
    channel: 'telegram', tone: '', personality: '',
    language: '', schedule: '', scheduleCustom: '',
  })

  const update = useCallback((key: keyof WizardData, value: string) => {
    setData(d => ({ ...d, [key]: value }))
  }, [])

  const canContinue = () => {
    switch (step) {
      case 1: return data.agentName.trim().length > 0 && data.email.includes('@') && data.email.includes('.')
      case 2: return data.company.trim().length > 0
      case 3: return data.mission.trim().length >= 10
      case 4: return !!data.channel
      case 5: return !!data.tone
      case 6: return !!data.personality
      case 7: return !!data.language
      case 8: return !!data.schedule && (data.schedule !== 'custom' || data.scheduleCustom.trim().length > 0)
      default: return false
    }
  }

  const goNext = () => {
    if (!canContinue() || loading) return
    if (step === 8) { handleSubmit(); return }
    setDirection(1); setStep(s => s + 1)
  }

  const goBack = () => {
    if (step === 1 || loading) return
    setDirection(-1); setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao criar agente')
      router.push(`/register/sucesso?slug=${encodeURIComponent(json.slug)}&agent=${encodeURIComponent(json.agentName)}&company=${encodeURIComponent(json.company)}`)
    } catch (err) {
      alert((err as Error).message)
      setLoading(false)
    }
  }

  const StepIcon = STEP_ICONS[step - 1]

  return (
    <div className="min-h-screen bg-[#0F0F1A] flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <Image src="/logo.png" alt="OpenTentacles" width={160} height={40} className="h-8 w-auto" />
      </div>

      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-1 bg-white/5">
          <motion.div
            className="h-full bg-[#E63946]"
            initial={false}
            animate={{ width: `${(step / 8) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E63946]/20 flex items-center justify-center">
              <StepIcon className="w-4 h-4 text-[#E63946]" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">ETAPA {step} DE 8</p>
              <p className="text-sm text-white font-semibold">{STEP_LABELS[step - 1]}</p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${i + 1 === step ? 'w-4 h-1.5 bg-[#E63946]' : i + 1 < step ? 'w-1.5 h-1.5 bg-[#E63946]/50' : 'w-1.5 h-1.5 bg-white/15'}`} />
            ))}
          </div>
        </div>

        <div className="px-6 min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {step === 1 && (
                <div className="space-y-3 pb-2">
                  <p className="text-white/50 text-sm mb-4">Vamos comecar! Qual sera o nome do seu agente e o seu e-mail?</p>
                  <div>
                    <label className="text-xs text-white/35 uppercase tracking-wider font-medium mb-1.5 block">Nome do agente</label>
                    <input type="text" placeholder="Ex: Sofia, Max, Assistente Padaria..." value={data.agentName} onChange={e => update('agentName', e.target.value)} onKeyDown={e => e.key === 'Enter' && goNext()} autoFocus className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-white/35 uppercase tracking-wider font-medium mb-1.5 block">Seu e-mail</label>
                    <input type="email" placeholder="voce@empresa.com" value={data.email} onChange={e => update('email', e.target.value)} onKeyDown={e => e.key === 'Enter' && goNext()} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors" />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="pb-2">
                  <p className="text-white/50 text-sm mb-4">Qual e o nome da sua empresa ou negocio?</p>
                  <input type="text" placeholder="Ex: Padaria do Ze, Clinica Vida, Studio Nova..." value={data.company} onChange={e => update('company', e.target.value)} onKeyDown={e => e.key === 'Enter' && goNext()} autoFocus className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors" />
                </div>
              )}
              {step === 3 && (
                <div className="pb-2">
                  <p className="text-white/50 text-sm mb-4">O que o <span className="text-white">{data.agentName || 'agente'}</span> deve fazer? Descreva sua missao.</p>
                  <textarea placeholder={`Ex: Atender clientes da ${data.company || 'empresa'}, responder duvidas sobre produtos, fazer agendamentos...`} value={data.mission} onChange={e => update('mission', e.target.value)} rows={5} autoFocus className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors resize-none" />
                  <p className="text-xs text-white/25 mt-2">Quanto mais detalhes, mais preciso sera o agente.</p>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-3 pb-2">
                  <p className="text-white/50 text-sm mb-4">Por qual canal o agente vai atender seus clientes?</p>
                  <button onClick={() => update('channel', 'telegram')} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${data.channel === 'telegram' ? 'border-[#E63946] bg-[#E63946]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#229ED9]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.478c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.602l-2.95-.924c-.642-.2-.655-.643.136-.953l11.52-4.443c.535-.194 1.003.131.596.966z"/></svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white font-semibold text-sm">Telegram</p>
                      <p className="text-white/40 text-xs">Disponivel agora — facil de configurar</p>
                    </div>
                    {data.channel === 'telegram' && <Check className="w-4 h-4 text-[#E63946] flex-shrink-0" />}
                  </button>
                  <button disabled className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-sm">WhatsApp</p>
                        <span className="text-[10px] text-[#E63946] border border-[#E63946]/30 rounded px-1.5 py-0.5">Em breve</span>
                      </div>
                      <p className="text-white/40 text-xs">Disponivel na Fase 2</p>
                    </div>
                  </button>
                </div>
              )}
              {step === 5 && (
                <div className="pb-2">
                  <p className="text-white/50 text-sm mb-4">Qual tom de voz o <span className="text-white">{data.agentName}</span> deve usar?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TONE_OPTIONS.map(opt => <OptionCard key={opt.value} selected={data.tone === opt.value} onClick={() => update('tone', opt.value)} label={opt.label} desc={opt.desc} />)}
                  </div>
                </div>
              )}
              {step === 6 && (
                <div className="pb-2">
                  <p className="text-white/50 text-sm mb-4">Qual e a personalidade principal do <span className="text-white">{data.agentName}</span>?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PERSONALITY_OPTIONS.map(opt => <OptionCard key={opt.value} selected={data.personality === opt.value} onClick={() => update('personality', opt.value)} label={opt.label} desc={opt.desc} />)}
                  </div>
                </div>
              )}
              {step === 7 && (
                <div className="pb-2">
                  <p className="text-white/50 text-sm mb-4">Em qual idioma o <span className="text-white">{data.agentName}</span> vai se comunicar?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGE_OPTIONS.map(opt => <OptionCard key={opt.value} selected={data.language === opt.value} onClick={() => update('language', opt.value)} label={opt.label} desc={opt.desc} />)}
                  </div>
                </div>
              )}
              {step === 8 && (
                <div className="pb-2">
                  <p className="text-white/50 text-sm mb-4">Qual e o horario de funcionamento do <span className="text-white">{data.agentName}</span>?</p>
                  <div className="space-y-2">
                    {SCHEDULE_OPTIONS.map(opt => (
                      <button key={opt.value} onClick={() => update('schedule', opt.value)} className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${data.schedule === opt.value ? 'border-[#E63946] bg-[#E63946]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">{opt.label}</p>
                          <p className="text-white/40 text-xs">{opt.desc}</p>
                        </div>
                        {data.schedule === opt.value && <Check className="w-4 h-4 text-[#E63946] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                  {data.schedule === 'custom' && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mt-3">
                      <input type="text" placeholder="Ex: Seg-Sex 9h-18h, Sab 9h-13h" value={data.scheduleCustom} onChange={e => update('scheduleCustom', e.target.value)} autoFocus className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors" />
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-6 pb-6 pt-4 flex gap-3">
          {step > 1 && (
            <button onClick={goBack} disabled={loading} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/50 text-sm hover:text-white hover:border-white/20 transition-all disabled:opacity-40">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}
          <button onClick={goNext} disabled={!canContinue() || loading} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#cc3040] disabled:opacity-35 disabled:cursor-not-allowed transition-all">
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" />Criando agente...</>
              : step === 8 ? <><Check className="w-4 h-4" />Criar Agente</>
              : 'Continuar'}
          </button>
        </div>
      </div>

      <p className="mt-6 text-white/20 text-xs text-center">
        {'Ja tem uma conta? '}
        <a href="/" className="text-white/35 hover:text-white transition-colors underline underline-offset-2">Voltar ao inicio</a>
      </p>
    </div>
  )
}