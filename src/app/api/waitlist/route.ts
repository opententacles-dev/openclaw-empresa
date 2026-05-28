import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const NOTIFY_EMAIL = 'openclawproject07@gmail.com'
const FROM = 'OpenTentacles <onboarding@resend.dev>'

function welcomeHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Você está na lista!</title>
</head>
<body style="margin:0;padding:0;background:#0F0F1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0F1A;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo / Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                Open<span style="color:#E63946;">Tentacles</span>
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#16162A;border:1px solid #2A2A3E;border-radius:16px;padding:40px 36px;">

              <!-- Icon -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="display:inline-block;background:#E63946;border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:28px;">
                      🐙
                    </div>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;text-align:center;">
                Você está na lista!
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#8B8BA7;text-align:center;line-height:1.6;">
                Obrigado por se inscrever na lista de espera do OpenTentacles.<br />
                Você será um dos primeiros a ter acesso quando abrirmos o beta.
              </p>

              <!-- Benefits -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#1A1A2E;border:1px solid #2A2A3E;border-radius:12px;padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#8B8BA7;text-transform:uppercase;letter-spacing:1px;">
                      O que você garante ao entrar agora
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#C4C4D4;">
                          <span style="color:#E63946;margin-right:8px;">✦</span>
                          Crédito inicial gratuito para testar
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#C4C4D4;">
                          <span style="color:#E63946;margin-right:8px;">✦</span>
                          Acesso beta exclusivo antes do público
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#C4C4D4;">
                          <span style="color:#E63946;margin-right:8px;">✦</span>
                          Preço fundador permanente
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#C4C4D4;">
                          <span style="color:#E63946;margin-right:8px;">✦</span>
                          Suporte VIP no lançamento
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#8B8BA7;text-align:center;line-height:1.6;">
                Fique de olho no seu e-mail —<br />
                <strong style="color:#ffffff;">você vai receber o convite antes de todo mundo.</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:#4A4A6A;">
                Este e-mail foi enviado para <strong style="color:#6B6B8A;">${email}</strong> porque você se inscreveu em
                <a href="https://opententacles.com/waitlist" style="color:#E63946;text-decoration:none;">opententacles.com/waitlist</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function notifyHtml(email: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;background:#f4f4f4;padding:32px 16px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e0e0e0;">
    <h2 style="margin:0 0 16px;font-size:20px;color:#111;">
      🐙 Novo inscrito na waitlist
    </h2>
    <p style="margin:0 0 8px;font-size:15px;color:#444;">
      <strong>E-mail:</strong> ${email}
    </p>
    <p style="margin:0;font-size:13px;color:#888;">
      ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })} (BRT)
    </p>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 })
    }

    const [welcome, notify] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: email,
        subject: '🐙 Você está na lista do OpenTentacles!',
        html: welcomeHtml(email),
      }),
      resend.emails.send({
        from: FROM,
        to: NOTIFY_EMAIL,
        subject: `[Waitlist] Novo inscrito: ${email}`,
        html: notifyHtml(email),
      }),
    ])

    if (welcome.error) {
      console.error('[waitlist] erro ao enviar boas-vindas:', welcome.error)
    }
    if (notify.error) {
      console.error('[waitlist] erro ao enviar notificação:', notify.error)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] erro:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
