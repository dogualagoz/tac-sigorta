import { kontaktSchema } from '#shared/utils/kontaktSchema'

export default defineEventHandler(async (event) => {
  checkRateLimit(event, 'kontakt', 5, 15 * 60 * 1000)

  const body = await readBody(event)
  const result = kontaktSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ungültige Eingabe. Bitte überprüfen Sie Ihre Angaben.',
    })
  }

  // Bot honeypot: alan doluysa isteği sessizce yut, mail gönderme — bot'a
  // reddedildiğini belli etme (CLAUDE.md "Formlar": "Honeypot alanı").
  if (result.data.website) {
    return { success: true }
  }

  await sendKontaktMail(result.data)

  return { success: true }
})
