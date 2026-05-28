import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const NOTIFY_EMAIL = 'openclawproject07@gmail.com'
const FROM = 'OpenTentacles <noreply@opententacles.com>'

function welcomeHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Voce esta na lista -- OpenTentacles</title>
</head>
<body style="margin:0;padding:0;background:#0F0F1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0F1A;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- LOGO TOPO -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#16162A;border:1px solid #2A2A3E;border-radius:16px;padding:16px 28px;">
                    <span style="font-size:30px;vertical-align:middle;margin-right:10px;">&#x1F419;</span>
                    <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;vertical-align:middle;">Open<span style="color:#E63946;">Tentacles</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CARD PRINCIPAL -->
          <tr>
            <td style="background:#16162A;border:1px solid #2A2A3E;border-radius:20px;padding:44px 40px;">

              <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;color:#ffffff;text-align:center;line-height:1.35;">
                Bem-vindo &agrave; revolu&ccedil;&atilde;o<br />
                <span style="color:#E63946;">dos agentes de IA</span> &#x1F680;
              </h1>

              <p style="margin:0 0 32px;font-size:16px;color:#A0A0C0;text-align:center;line-height:1.75;">
                Voc&ecirc; entrou para o grupo seleto que vai transformar a forma como o mundo trabalha com intelig&ecirc;ncia artificial. Sua vaga est&aacute; garantida &mdash; e o futuro come&ccedil;a aqui.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #2A2A3E;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#E63946;text-transform:uppercase;letter-spacing:2px;text-align:center;">
                O que voc&ecirc; garante ao entrar agora
              </p>

              <!-- BENEFICIO 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                <tr>
                  <td style="background:#1A1A2E;border:1px solid #2A2A3E;border-radius:12px;padding:14px 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" style="font-size:22px;vertical-align:middle;">&#x1F381;</td>
                        <td style="vertical-align:middle;padding-left:8px;">
                          <strong style="font-size:14px;color:#ffffff;display:block;margin-bottom:2px;">Cr&eacute;dito inicial gratuito</strong>
                          <span style="font-size:13px;color:#8B8BA7;">Teste tudo sem pagar nada no in&iacute;cio</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- BENEFICIO 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                <tr>
                  <td style="background:#1A1A2E;border:1px solid #2A2A3E;border-radius:12px;padding:14px 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" style="font-size:22px;vertical-align:middle;">&#x26A1;</td>
                        <td style="vertical-align:middle;padding-left:8px;">
                          <strong style="font-size:14px;color:#ffffff;display:block;margin-bottom:2px;">Acesso beta exclusivo</strong>
                          <span style="font-size:13px;color:#8B8BA7;">Entre antes do grande p&uacute;blico</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- BENEFICIO 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                <tr>
                  <td style="background:#1A1A2E;border:1px solid #2A2A3E;border-radius:12px;padding:14px 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" style="font-size:22px;vertical-align:middle;">&#x1F48E;</td>
                        <td style="vertical-align:middle;padding-left:8px;">
                          <strong style="font-size:14px;color:#ffffff;display:block;margin-bottom:2px;">Pre&ccedil;o fundador permanente</strong>
                          <span style="font-size:13px;color:#8B8BA7;">Trava o menor pre&ccedil;o para sempre</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- BENEFICIO 4 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#1A1A2E;border:1px solid #2A2A3E;border-radius:12px;padding:14px 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" style="font-size:22px;vertical-align:middle;">&#x1F6E1;</td>
                        <td style="vertical-align:middle;padding-left:8px;">
                          <strong style="font-size:14px;color:#ffffff;display:block;margin-bottom:2px;">Suporte VIP no lan&ccedil;amento</strong>
                          <span style="font-size:13px;color:#8B8BA7;">Nossa equipe ao seu lado desde o dia 1</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr><td style="border-top:1px solid #2A2A3E;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- BOTAO CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td align="center">
                    <a href="https://opententacles.com/waitlist"
                       style="display:inline-block;background:#E63946;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:16px 44px;border-radius:12px;letter-spacing:0.3px;">
                      Acompanhar novidades &#8594;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- ASSINATURA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 4px;font-size:14px;color:#C4C4D4;font-weight:600;">Equipe OpenTentacles</p>
                    <p style="margin:0;font-size:13px;color:#8B8BA7;">
                      <a href="https://opententacles.com" style="color:#E63946;text-decoration:none;">opententacles.com</a>
                      &nbsp;&middot;&nbsp;
                      <a href="mailto:contato@opententacles.com" style="color:#8B8BA7;text-decoration:none;">contato@opententacles.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- RODAPE -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#4A4A6A;line-height:1.6;">
                Este e-mail foi enviado para <span style="color:#6B6B8A;">${email}</span> porque voc&ecirc; se inscreveu em
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
      &#x1F419; Novo inscrito na waitlist
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
      return NextResponse.json({ error: 'E-mail invalido' }, { status: 400 })
    }

    resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `[Waitlist] Novo inscrito: ${email}`,
      html: notifyHtml(email),
    }).then(r => {
      if (r.error) console.error('[waitlist] notificacao:', r.error)
    }).catch(e => console.error('[waitlist] notificacao catch:', e))

    resend.emails.send({
      from: FROM,
      to: email,
      subject: '&#x1F419; Voce esta na lista do OpenTentacles!',
      html: welcomeHtml(email),
    }).then(r => {
      if (r.error) console.error('[waitlist] boas-vindas:', r.error)
    }).catch(e => console.error('[waitlist] boas-vindas catch:', e))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] erro:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}