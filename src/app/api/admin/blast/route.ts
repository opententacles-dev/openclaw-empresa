import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(`${process.env.VPS_API_URL}/admin/blast`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.VPS_ADMIN_KEY! }, body: JSON.stringify(body) })
  return NextResponse.json(await res.json())
}