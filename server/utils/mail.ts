import nodemailer from 'nodemailer'
import type { KontaktInput } from '#shared/utils/kontaktSchema'

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null

function getTransporter() {
  if (transporter) return transporter

  const config = useRuntimeConfig()
  transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    // 465 = implizites TLS, 587/25 = STARTTLS (nodemailer bunu port'tan otomatik seçer).
    secure: Number(config.smtpPort) === 465,
    auth: config.smtpUser
      ? { user: config.smtpUser, pass: config.smtpPass }
      : undefined,
  })
  return transporter
}

// DSGVO: form verisi sadece mail olarak gönderilir, veritabanında saklanmaz,
// loglarda form içeriği tutulmaz (bkz. CLAUDE.md "Gizlilik").
export async function sendKontaktMail(data: KontaktInput) {
  const config = useRuntimeConfig()

  if (!config.smtpHost || !config.kontaktToEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Mail-Versand ist nicht konfiguriert.',
    })
  }

  await getTransporter().sendMail({
    from: config.smtpFrom || config.smtpUser,
    to: config.kontaktToEmail,
    replyTo: data.email,
    subject: `Kontaktanfrage von ${data.name}${data.unternehmen ? ` (${data.unternehmen})` : ''}`,
    text: [
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
      `Unternehmen: ${data.unternehmen || '—'}`,
      `Anliegen: ${data.anliegen || '—'}`,
      '',
      'Nachricht:',
      data.nachricht,
    ].join('\n'),
  })
}
