import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
        <Image
          src="/mascote-error.png"
          alt="Mascote OpenTentacles"
          width={220}
          height={220}
          className="mb-8 drop-shadow-2xl"
          priority
        />
        <div style={{ fontSize: '6rem', fontWeight: 900, color: '#E63946', lineHeight: 1, marginBottom: '1rem', letterSpacing: '-3px' }}>
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          P&aacute;gina n&atilde;o encontrada
        </h1>
        <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
          A p&aacute;gina que voc&ecirc; procura n&atilde;o existe ou foi movida. Verifique o endere&ccedil;o ou volte para o in&iacute;cio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/"
            className="bg-[#E63946] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#c62d39] transition-colors"
          >
            Voltar ao in&iacute;cio
          </Link>
          <Link
            href="/waitlist"
            className="border border-[#2A2A3E] text-gray-400 font-semibold px-8 py-3 rounded-xl hover:text-white hover:border-[#E63946] transition-colors"
          >
            Entrar na lista de espera
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}