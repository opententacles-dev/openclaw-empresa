import { NextRequest, NextResponse } from 'next/server'

type RouteParams = { params: { slug: string } }

export async function GET(request: NextRequest, { params }: RouteParams) {
  const token = request.cookies.get('ot_jwt')?.value
  if (!token) return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  try {
    const res = await fetch((process.env.VPS_API_URL || '') + '/user/agents/' + params.slug + '/files', {
      headers: { Authorization: 'Bearer ' + token },
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Falha na comunicacao' }, { status: 500 })
  }
}