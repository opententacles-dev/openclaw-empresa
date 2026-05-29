'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bot, LayoutDashboard, Settings, LogOut, Menu, X, ChevronRight, Shield } from 'lucide-react'

type User = { id: string; name: string; email: string; plan: string }
const AuthContext = createContext<{ user: User | null }>({ user: null })
export const useAuth = () => useContext(AuthContext)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.id) setUser(d)
      else router.push('/login')
    }).catch(() => router.push('/login')).finally(() => setLoading(false))
  }, [router])

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const navItems = [
    { href: '/dashboard/agents', icon: Bot, label: 'Meus Agentes' },
    { href: '/dashboard/settings', icon: Settings, label: 'Configuracoes' },
  ]
  if (user?.plan === 'enterprise') {
    navItems.push({ href: '/dashboard/admin', icon: Shield, label: 'Admin' })
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/8">
        <Image src="/logo.png" alt="OpenTentacles" width={140} height={36} className="h-7 w-auto" />
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[#E63946]/15 text-white border border-[#E63946]/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-[#E63946]" />}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-white/8">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#E63946]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#E63946] text-xs font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name}</p>
            <p className="text-white/35 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all">
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  )

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="min-h-screen bg-[#0F0F1A] flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-56 bg-white/[0.02] border-r border-white/8 flex-col fixed h-full z-10">
          <Sidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-56 h-full bg-[#0F0F1A] border-r border-white/10 flex flex-col z-50">
              <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <Sidebar />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 md:ml-56 min-h-screen flex flex-col">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
            <button onClick={() => setSidebarOpen(true)} className="text-white/50 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <Image src="/logo.png" alt="OpenTentacles" width={120} height={30} className="h-6 w-auto" />
          </div>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </AuthContext.Provider>
  )
}