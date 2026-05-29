'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0F0F1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      }}
    >
      <Image
        src="/mascote-error.png"
        alt="Mascote OpenTentacles"
        width={200}
        height={200}
        style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 32px rgba(230,57,70,0.3))' }}
        priority
      />
      <div style={{ fontSize: '6rem', fontWeight: 900, color: '#E63946', lineHeight: 1, marginBottom: '1rem', letterSpacing: '-3px' }}>
        500
      </div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
        Algo deu errado
      </h1>
      <p style={{ color: '#9CA3AF', marginBottom: '2.5rem', maxWidth: '28rem', lineHeight: 1.6 }}>
        Ocorreu um erro inesperado. Nossa equipe j&aacute; foi notificada. Tente novamente ou volte para o in&iacute;cio.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{ background: '#E63946', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9375rem', padding: '12px 32px', borderRadius: '12px', cursor: 'pointer' }}
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          style={{ border: '1px solid #2A2A3E', color: '#9CA3AF', fontWeight: 600, fontSize: '0.9375rem', padding: '12px 32px', borderRadius: '12px', textDecoration: 'none', display: 'inline-block' }}
        >
          Voltar ao in&iacute;cio
        </Link>
      </div>
    </main>
  )
}