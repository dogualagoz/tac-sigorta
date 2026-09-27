import type { H3Event } from 'h3'

// Basit bellek-içi IP rate limit — CLAUDE.md "Formlar": "Honeypot alanı + IP
// rate limit (captcha yok)". Tek Nitro process/container varsayımıyla yeterli
// (bkz. CLAUDE.md "Deploy": tek app container); çoklu instance'a geçilirse
// paylaşımlı bir store gerekir.
const hits = new Map<string, number[]>()

export function checkRateLimit(event: H3Event, scope: string, max: number, windowMs: number) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const key = `${scope}:${ip}`
  const now = Date.now()

  const timestamps = (hits.get(key) ?? []).filter(t => now - t < windowMs)
  if (timestamps.length >= max) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
    })
  }

  timestamps.push(now)
  hits.set(key, timestamps)
}
