import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  try {
    const res = await fetch((process.env.VPS_API_URL || '') + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json(data, { status: res.status })
    const response = NextResponse.json({ ok: true, user: data.user })
    response.cookies.set('ot_jwt', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Falha na comunicacao com o servidor' }, { status: 500 })
  }
}