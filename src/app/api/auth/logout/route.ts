import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set('ot_jwt', '', { maxAge: 0, path: '/' })
  return response
}