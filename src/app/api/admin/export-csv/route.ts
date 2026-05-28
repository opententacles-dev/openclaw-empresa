import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET() {
  const res = await fetch(`${process.env.VPS_API_URL}/admin/export-csv`, { headers: { 'x-api-key': process.env.VPS_ADMIN_KEY! }, cache: 'no-store' })
  return new NextResponse(await res.text(), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="waitlist.csv"' } })
}