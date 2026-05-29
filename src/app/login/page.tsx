'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Credenciais invalidas'); return }
      router.push('/dashboard/agents')
    } catch {
      setError('Falha na conexao. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Image src="/logo.png" alt="OpenTentacles" width={160} height={40} className="h-8 w-auto" />
      </div>
      <div className="w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-1 bg-[#E63946]" />
        <div className="p-8">
          <h1 className="text-xl font-bold text-white mb-1">Entrar no painel</h1>
          <p className="text-white/40 text-sm mb-6">Acesse seus agentes e configuracoes</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/35 uppercase tracking-wider font-medium mb-1.5 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/35 uppercase tracking-wider font-medium mb-1.5 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#E63946]/50 transition-colors"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#cc3040] disabled:opacity-50 transition-all"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Entrando...</> : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
      <a href="/" className="mt-6 text-white/25 hover:text-white/50 text-xs transition-colors">
        ← Voltar ao site
      </a>
    </div>
  )
}