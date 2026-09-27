import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import type { LocaleObject } from '@nuxtjs/i18n'

// TR yalnızca geliştirici görünümü — bkz. CLAUDE.md "Dil: DE / TR".
// Flag kapalıyken tr locale hiç register edilmez, /tr route'ları üretilmez.
const devLocaleTr = process.env.NUXT_PUBLIC_DEV_LOCALE_TR === 'true'

// CLAUDE.md: "de.json ve tr.json aynı anahtar setine sahip olmalı. Eksik anahtar build'de uyarı versin."
function flattenKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix]
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    flattenKeys(value, prefix ? `${prefix}.${key}` : key),
  )
}

function checkI18nKeyParity() {
  const localesDir = fileURLToPath(new URL('./i18n/locales/', import.meta.url))
  const de = JSON.parse(readFileSync(`${localesDir}de.json`, 'utf-8'))
  const tr = JSON.parse(readFileSync(`${localesDir}tr.json`, 'utf-8'))
  const deKeys = new Set(flattenKeys(de))
  const trKeys = new Set(flattenKeys(tr))
  const missingInTr = [...deKeys].filter(k => !trKeys.has(k))
  const missingInDe = [...trKeys].filter(k => !deKeys.has(k))
  if (missingInTr.length) console.warn('[i18n] tr.json eksik anahtarlar:', missingInTr.join(', '))
  if (missingInDe.length) console.warn('[i18n] de.json eksik anahtarlar:', missingInDe.join(', '))
}

checkI18nKeyParity()

// `LocaleObject`'in generic'i defaultLocale'e ("de") bağlanıyor, bu yüzden
// koşullu olarak eklenen "tr" satırı için tip daraltması gerekiyor.
const i18nLocales = [
  { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch' },
  ...(devLocaleTr ? [{ code: 'tr', iso: 'tr-TR', file: 'tr.json', name: 'Türkçe' }] : []),
] as LocaleObject[]

export default defineNuxtConfig({

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
  ],

  // Alt klasör adı component tag'ine önek olarak eklenmesin — CLAUDE.md'nin
  // component listesi (base/BaseButton, layout/TheHeader, sections/HeroSection …)
  // klasör önekiyle değil, dosya adıyla kullanılıyor.
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPass: '',
    smtpFrom: '',
    angebotToEmail: '',
    public: {
      devLocaleTr,
    },
  },
  compatibilityDate: '2025-09-01',

  vite: {
    plugins: [tailwindcss()],
    // Docker Desktop (macOS) bind mount'ta dosya sistemi olayları bazen Vite'a
    // ulaşmıyor — CHOKIDAR_USEPOLLING=true iken (bkz. docker-compose.dev.yml)
    // polling'e geçilir, host'ta normal (event-based) izleme korunur.
    server: {
      watch: process.env.CHOKIDAR_USEPOLLING === 'true' ? { usePolling: true } : undefined,
    },
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    locales: i18nLocales,
  },
})
