import { NextRequest, NextResponse } from 'next/server'

type RouteParams = { params: { slug: string } }

export async function GET(request: NextRequest, { params }: RouteParams) {
  const token = request.cookies.get('ot_jwt')?.value
  if (!token) return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  const name = request.nextUrl.searchParams.get('name')
  if (!name) return NextResponse.json({ error: 'name obrigatorio' }, { status: 400 })
  try {
    const url = (process.env.VPS_API_URL || '') + '/user/agents/' + params.slug + '/file?name=' + encodeURIComponent(name)
    const res = await fetch(url, { headers: { Authorization: 'Bearer ' + token } })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Falha na comunicacao' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const token = request.cookies.get('ot_jwt')?.value
  if (!token) return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  const body = await request.json()
  try {
    const res = await fetch((process.env.VPS_API_URL || '') + '/user/agents/' + params.slug + '/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Falha na comunicacao' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const token = request.cookies.get('ot_jwt')?.value
  if (!token) return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  const name = request.nextUrl.searchParams.get('name')
  if (!name) return NextResponse.json({ error: 'name obrigatorio' }, { status: 400 })
  try {
    const url = (process.env.VPS_API_URL || '') + '/user/agents/' + params.slug + '/file?name=' + encodeURIComponent(name)
    const res = await fetch(url, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Falha na comunicacao' }, { status: 500 })
  }
}