import { z } from 'zod'

// Client (KontaktForm.vue) ve server (server/api/kontakt.post.ts) aynı şemayı
// kullanır — CLAUDE.md "Formlar": "Zod şeması client ve server'da ortak".
export const kontaktSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().min(1).max(200).email(),
  unternehmen: z.string().trim().max(200).optional().default(''),
  anliegen: z.string().trim().max(200).optional().default(''),
  nachricht: z.string().trim().min(1).max(5000),
  dsgvoConsent: z.literal(true),
  // Honeypot: bot'lar için görünmez alan, insan kullanıcı hiç dokunmaz.
  // Bilinçli olarak kısıtlamasız — doluysa şema hatası vermeden server tarafında
  // sessizce (sahte başarı ile) elenir, bkz. server/api/kontakt.post.ts.
  website: z.string().optional().default(''),
})

export type KontaktInput = z.infer<typeof kontaktSchema>
