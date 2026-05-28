import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', process.env.ADMIN_PASSWORD, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 604800, path: '/' })
  return res
}