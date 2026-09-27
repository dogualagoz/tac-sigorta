import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// CLAUDE.md "Ürün ve fiyat kuralı" — bu şema birebir korunur.
const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  icon: z.string(),
  benefit: z.string(),
  price: z.number().nullable(),
  period: z.enum(['pro Jahr', 'pro Reise', 'je nach Tarif']).nullable(),
  badge: z.enum(['Top Preis', 'Beliebt', 'Neu', 'Bestseller']).nullable(),
  approved: z.boolean().default(false),
  featured: z.boolean().default(false),
})

const faqEntrySchema = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.string().optional(),
  approved: z.boolean().default(false),
})

// Tek kaynak, dile bağlı değil — CLAUDE.md "Klasör yapısı".
const siteSchema = z.object({
  companyName: z.string().nullable(),
  legalForm: z.string().nullable(),
  tagline: z.string().nullable(),
  street: z.string().nullable(),
  postalCode: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  openingHours: z.string().nullable(),
  hrb: z.string().nullable(),
  bafinRegister: z.string().nullable(),
  ustIdNr: z.string().nullable(),
  geschaeftsfuehrer: z.string().nullable(),
})

// Tanıtım düzyazısı için ortak alan: brief gelene kadar approved: false.
const pageSchema = z.object({
  approved: z.boolean().default(false),
})

// Startseite — tekrarlı bloklar düz markdown gövdesine sığmadığı için ayrı,
// yapılandırılmış bir şema kullanılır. Blok listesi brief'in kendi site
// haritasına (bölüm 16) birebir uyar — bkz. onaylı plan "elegant-sparking-piglet.md".
const homeSchema = z.object({
  approved: z.boolean().default(false),
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    note: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
    // El yazısı aksan — brief'te "Gemeinsam mehr möglich." (CLAUDE.md "Tipografi":
    // tek script font, seyrek kullan).
    tagline: z.string(),
  }),
  trustBadges: z.array(z.object({ label: z.string() })),
  nachweisTeaser: z.object({
    title: z.string(),
    description: z.string(),
  }),
  productsTeaser: z.object({
    title: z.string(),
    description: z.string(),
    linkLabel: z.string(),
  }),
  legal: z.object({
    label: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    summary: z.string(),
    quoteRef: z.string(),
    quoteText: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    links: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
  process: z.object({
    label: z.string(),
    title: z.string(),
    intro: z.string(),
    steps: z.array(z.object({
      day: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }),
  whyTsc: z.object({
    label: z.string(),
    title: z.string(),
    points: z.array(z.object({ title: z.string(), description: z.string() })),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
})

// Sicherungsschein + Insolvenzabsicherung — "aynı sayfa template'ini kullanır,
// sadece içerik değişir" (CLAUDE.md). Sayfaya özgü bloklar nullable: her iki
// sayfa aynı bileşen setini kullanır, brief'in blok sırası sayfa şablonunda
// (app/pages/sicherungsschein.vue, insolvenzabsicherung.vue) uygulanır.
const productPageSchema = z.object({
  approved: z.boolean().default(false),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    note: z.string().nullable(),
    primaryCta: z.string(),
    secondaryCta: z.string().nullable(),
  }),
  intro: z.object({
    title: z.string(),
    paragraphs: z.array(z.string()),
  }),
  benefits: z.object({
    label: z.string(),
    title: z.string(),
    items: z.array(z.string()),
  }),
  additionalBenefits: z.object({
    label: z.string(),
    title: z.string(),
    items: z.array(z.string()),
  }).nullable(),
  process: z.object({
    label: z.string(),
    title: z.string(),
    intro: z.string(),
    steps: z.array(z.object({
      day: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }).nullable(),
  nachweisSection: z.object({
    title: z.string(),
    description: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }).nullable(),
  faq: z.object({
    label: z.string(),
    title: z.string(),
    category: z.string(),
  }),
})

export default defineContentConfig({
  collections: {
    dePages: defineCollection({
      type: 'page',
      source: {
        include: 'de/pages/**/*.md',
        exclude: ['de/pages/index.md', 'de/pages/sicherungsschein.md', 'de/pages/insolvenzabsicherung.md'],
        prefix: '',
      },
      schema: pageSchema,
    }),
    deHome: defineCollection({
      type: 'page',
      // @nuxt/content sadece include glob'unda "*" varsa dizin önekini path'ten
      // kırpıyor (bkz. module.mjs parseSourceBase) — bu yüzden brace/tam dosya adı
      // yerine "*.md" + exclude kullanılıyor.
      source: {
        include: 'de/pages/*.md',
        exclude: ['de/pages/sicherungsschein.md', 'de/pages/insolvenzabsicherung.md', 'de/pages/service.md', 'de/pages/ueber-uns.md'],
        prefix: '',
      },
      schema: homeSchema,
    }),
    deProductPages: defineCollection({
      type: 'page',
      source: {
        include: 'de/pages/*.md',
        exclude: ['de/pages/index.md', 'de/pages/service.md', 'de/pages/ueber-uns.md'],
        prefix: '',
      },
      schema: productPageSchema,
    }),
    deLegal: defineCollection({
      type: 'page',
      source: { include: 'de/legal/**/*.md', prefix: '' },
    }),
    deProducts: defineCollection({
      type: 'data',
      source: 'de/products.json',
      schema: productSchema,
    }),
    deFaq: defineCollection({
      type: 'data',
      source: 'de/faq.json',
      schema: faqEntrySchema,
    }),
    trPages: defineCollection({
      type: 'page',
      source: {
        include: 'tr/pages/**/*.md',
        exclude: ['tr/pages/index.md', 'tr/pages/sicherungsschein.md', 'tr/pages/insolvenzabsicherung.md'],
        prefix: '',
      },
      schema: pageSchema,
    }),
    trHome: defineCollection({
      type: 'page',
      source: {
        include: 'tr/pages/*.md',
        exclude: ['tr/pages/sicherungsschein.md', 'tr/pages/insolvenzabsicherung.md', 'tr/pages/service.md', 'tr/pages/ueber-uns.md'],
        prefix: '',
      },
      schema: homeSchema,
    }),
    trProductPages: defineCollection({
      type: 'page',
      source: {
        include: 'tr/pages/*.md',
        exclude: ['tr/pages/index.md', 'tr/pages/service.md', 'tr/pages/ueber-uns.md'],
        prefix: '',
      },
      schema: productPageSchema,
    }),
    trLegal: defineCollection({
      type: 'page',
      source: { include: 'tr/legal/**/*.md', prefix: '' },
    }),
    trProducts: defineCollection({
      type: 'data',
      source: 'tr/products.json',
      schema: productSchema,
    }),
    trFaq: defineCollection({
      type: 'data',
      source: 'tr/faq.json',
      schema: faqEntrySchema,
    }),
    site: defineCollection({
      type: 'data',
      source: 'site.json',
      schema: siteSchema,
    }),
  },
})
