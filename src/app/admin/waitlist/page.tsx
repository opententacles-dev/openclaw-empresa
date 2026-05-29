'use client'
import { useEffect, useRef, useState } from 'react'

type Sub = { id: number; email: string; created_at: string; ip: string | null }
type BlastResult = { sent: number; errors: number; total: number }

export default function WaitlistAdmin() {
  const [subs, setSubs] = useState<Sub[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [subject, setSubject] = useState('')
  const [html, setHtml] = useState('')
  const [preview, setPreview] = useState(false)
  const [blasting, setBlasting] = useState(false)
  const [result, setResult] = useState<BlastResult | null>(null)
  const allRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/subscribers').then(r => r.json()).then(d => { setSubs(Array.isArray(d) ? d : []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = selected.size > 0 && selected.size < subs.length
  }, [selected.size, subs.length])

  function toggleAll() { setSelected(selected.size === subs.length ? new Set() : new Set(subs.map(s => s.id))) }
  function toggleOne(id: number) { const n = new Set(selected); if (n.has(id)) { n.delete(id) } else { n.add(id) } setSelected(n) }

  async function handleBlast(e: React.FormEvent) {
    e.preventDefault()
    if (selected.size === 0) { alert('Selecione ao menos um inscrito.'); return }
    const emails = subs.filter(s => selected.has(s.id)).map(s => s.email)
    if (!confirm(`Enviar para ${emails.length} inscrito${emails.length !== 1 ? 's' : ''}?`)) return
    setBlasting(true); setResult(null)
    const res = await fetch('/api/admin/blast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, html, emails }) })
    setResult(await res.json()); setBlasting(false)
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/admin/login' }

  const last7 = subs.filter(s => (Date.now() - new Date(s.created_at).getTime()) < 604800000).length
  const card: React.CSSProperties = { background: '#16162A', border: '1px solid #2A2A3E', borderRadius: 16, padding: '24px 28px' }
  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 12, display: 'block' }
  const thS: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', fontSize: 12, fontWeight: 600, color: '#8B8BA7', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid #2A2A3E' }
  const tdS: React.CSSProperties = { padding: '12px 14px', fontSize: 14, color: '#C4C4D4', borderBottom: '1px solid #1A1A2E' }

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', color: '#fff', paddingBottom: 60 }}>
      <nav style={{ background: '#16162A', borderBottom: '1px solid #2A2A3E', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>&#x1F419; Admin <span style={{ color: '#E63946' }}>OpenTentacles</span></span>
        <button onClick={logout} style={{ background: 'transparent', color: '#8B8BA7', border: '1px solid #2A2A3E', borderRadius: 10, padding: '8px 18px', fontSize: 14, cursor: 'pointer' }}>Sair</button>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ ...card, flex: 1 }}>
            <div style={{ fontSize: 12, color: '#8B8BA7', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total inscritos</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: '#E63946' }}>{loading ? '...' : subs.length}</div>
          </div>
          <div style={{ ...card, flex: 1 }}>
            <div style={{ fontSize: 12, color: '#8B8BA7', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>&#218;ltimos 7 dias</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: '#E63946' }}>{loading ? '...' : last7}</div>
          </div>
          <div style={{ ...card, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/api/admin/export-csv" download="waitlist.csv" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#E63946', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>&#8595; Exportar CSV</button>
            </a>
          </div>
        </div>

        <div style={{ ...card, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Inscritos na Waitlist</h2>
            {selected.size > 0 && (
              <span style={{ fontSize: 13, color: '#E63946', fontWeight: 600, background: '#2a0d0d', border: '1px solid #5c1a1a', borderRadius: 8, padding: '4px 12px' }}>
                {selected.size} de {subs.length} selecionado{selected.size !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {loading ? <p style={{ color: '#8B8BA7' }}>Carregando...</p> : subs.length === 0 ? <p style={{ color: '#8B8BA7' }}>Nenhum inscrito ainda.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '10px 14px', borderBottom: '1px solid #2A2A3E', width: 44 }}>
                      <input type="checkbox" ref={allRef} checked={subs.length > 0 && selected.size === subs.length} onChange={toggleAll} style={{ cursor: 'pointer', accentColor: '#E63946', width: 16, height: 16 }} />
                    </th>
                    {['#', 'Email', 'Data de cadastro', 'IP'].map(h => <th key={h} style={thS}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {subs.map(s => (
                    <tr key={s.id} onClick={() => toggleOne(s.id)} style={{ cursor: 'pointer', background: selected.has(s.id) ? '#1a1a3e' : 'transparent', transition: 'background 0.1s' }}>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #1A1A2E' }}>
                        <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleOne(s.id)} onClick={e => e.stopPropagation()} style={{ cursor: 'pointer', accentColor: '#E63946', width: 16, height: 16 }} />
                      </td>
                      <td style={{ ...tdS, color: '#4A4A6A' }}>{s.id}</td>
                      <td style={tdS}>{s.email}</td>
                      <td style={{ ...tdS, color: '#8B8BA7' }}>{new Date(s.created_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
                      <td style={{ ...tdS, color: '#4A4A6A', fontSize: 12, fontFamily: 'monospace' }}>{s.ip || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={card}>
          <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>&#128227; Disparar Email Marketing</h2>
          <form onSubmit={handleBlast}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#8B8BA7' }}>Assunto</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Grande novidade do OpenTentacles!" required style={inp} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 13, color: '#8B8BA7' }}>HTML do email</label>
              <button type="button" onClick={() => setPreview(p => !p)}
                style={{ background: preview ? '#E63946' : 'transparent', color: preview ? '#fff' : '#8B8BA7', border: `1px solid ${preview ? '#E63946' : '#2A2A3E'}`, borderRadius: 8, padding: '5px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {preview ? '&#9998; Editar HTML' : '&#128065; Visualizar preview'}
              </button>
            </div>

            {!preview ? (
              <textarea value={html} onChange={e => setHtml(e.target.value)} placeholder="<p>Conte&#250;do em HTML...</p>" required rows={10}
                style={{ ...inp, fontFamily: 'monospace', fontSize: 13, resize: 'vertical', minHeight: 200 } as React.CSSProperties} />
            ) : (
              <div style={{ marginBottom: 12, borderRadius: 10, overflow: 'hidden', border: '1px solid #2A2A3E' }}>
                <div style={{ background: '#1A1A2E', padding: '8px 16px', fontSize: 12, color: '#8B8BA7', borderBottom: '1px solid #2A2A3E', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>De: <strong style={{ color: '#C4C4D4' }}>noreply@opententacles.com</strong></span>
                  <span style={{ color: '#4A4A6A' }}>|</span>
                  <span>Assunto: <strong style={{ color: '#fff' }}>{subject || '(sem assunto)'}</strong></span>
                </div>
                <iframe
                  srcDoc={html || '<div style="font-family:sans-serif;color:#888;padding:40px;text-align:center">Nenhum HTML inserido ainda.</div>'}
                  style={{ width: '100%', height: 540, border: 'none', display: 'block' }}
                  title="Preview do email"
                  sandbox="allow-same-origin"
                />
              </div>
            )}

            {result && (
              <div style={{ background: result.errors === 0 ? '#0d2a1a' : '#2a0d0d', border: `1px solid ${result.errors === 0 ? '#1a5c2e' : '#5c1a1a'}`, borderRadius: 10, padding: '12px 16px', marginBottom: 12, fontSize: 14, color: result.errors === 0 ? '#4ade80' : '#f87171' }}>
                {result.errors === 0 ? '&#10003;' : '&#9888;'} Enviado: {result.sent} | Erros: {result.errors} | Total: {result.total}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button type="submit" disabled={blasting || selected.size === 0}
                style={{ background: selected.size > 0 ? '#E63946' : '#2A2A3E', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: (blasting || selected.size === 0) ? 'not-allowed' : 'pointer', opacity: blasting ? 0.7 : 1 }}>
                {blasting ? 'Enviando...' : selected.size === 0 ? 'Selecione destinat&#225;rios acima' : `Disparar para ${selected.size} inscrito${selected.size !== 1 ? 's' : ''}`}
              </button>
              {selected.size > 0 && !blasting && (
                <button type="button" onClick={() => setSelected(new Set())} style={{ background: 'transparent', color: '#8B8BA7', border: '1px solid #2A2A3E', borderRadius: 10, padding: '12px 16px', fontSize: 13, cursor: 'pointer' }}>
                  Limpar sele&#231;&#227;o
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}