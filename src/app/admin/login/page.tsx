'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function LoginPage() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })
    if (res.ok) { router.push('/admin/waitlist') } else { setError('Senha incorreta'); setLoading(false) }
  }
  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ background: '#16162A', border: '1px solid #2A2A3E', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>&#x1F419;</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>Admin <span style={{ color: '#E63946' }}>OpenTentacles</span></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="Senha" value={pw} onChange={e => setPw(e.target.value)} required
            style={{ width: '100%', boxSizing: 'border-box', background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none', marginBottom: error ? 8 : 16 }} />
          {error && <p style={{ margin: '0 0 12px', color: '#E63946', fontSize: 13 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#E63946', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 0', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}