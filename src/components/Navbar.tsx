'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'

const LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Preços', href: '#preços' },
  { label: 'Afiliados', href: '#afiliados' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/60 shadow-sm' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="OpenTentacles" width={36} height={36} className="h-9 w-auto" />
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            Open<span className="text-primary">Tentacles</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(link => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#entrar" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white px-3 py-2">
            Entrar
          </a>
          <a href="#criar" className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary/90">
            Criar conta grátis
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button onClick={() => setOpen(o => !o)} className="flex md:hidden items-center justify-center rounded-lg border border-border p-2 text-white">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-b border-border bg-background/96 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-5 pt-2">
              {LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-white">
                  {link.label}
                </a>
              ))}
              <a href="#entrar" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-white">
                Entrar
              </a>
              <a href="#criar" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-white">
                Criar conta grátis <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}