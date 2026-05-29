import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin routes (password-based)
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login') || pathname.startsWith('/api/admin/logout')) {
    return NextResponse.next()
  }
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = req.cookies.get('admin_token')?.value
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
      }
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // Dashboard routes (JWT-based)
  if (pathname === '/login' || pathname === '/api/auth/login' || pathname === '/api/auth/logout') return NextResponse.next()
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/dashboard') || pathname.startsWith('/api/auth')) {
    const jwt = req.cookies.get('ot_jwt')?.value
    if (!jwt) {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(JSON.stringify({ error: 'Nao autenticado' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
      }
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/dashboard/:path*', '/api/dashboard/:path*', '/api/auth/:path*', '/login'],
}