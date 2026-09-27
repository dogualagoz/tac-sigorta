// content.config.ts "productPageSchema" ile birebir eşleşir.
// Sicherungsschein + Insolvenzabsicherung aynı şemayı, sayfaya özgü nullable
// bloklarla paylaşır — bkz. CLAUDE.md "Sicherungsschein ve Insolvenzabsicherung
// aynı sayfa template'ini kullanır".

export interface ProductPageHero {
  eyebrow: string
  title: string
  subtitle: string
  note: string | null
  primaryCta: string
  secondaryCta: string | null
}

export interface ProductPageIntro {
  title: string
  paragraphs: string[]
}

export interface ProductPageBenefits {
  label: string
  title: string
  items: string[]
}

export interface ProductPageProcessStep {
  day: string
  title: string
  description: string
}

export interface ProductPageProcess {
  label: string
  title: string
  intro: string
  steps: ProductPageProcessStep[]
}

export interface ProductPageNachweisSection {
  title: string
  description: string
}

export interface ProductPageCta {
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface ProductPageFaq {
  label: string
  title: string
  category: string
}

export interface ProductPageContent {
  title: string
  description: string
  approved: boolean
  hero: ProductPageHero
  intro: ProductPageIntro
  benefits: ProductPageBenefits
  additionalBenefits: ProductPageBenefits | null
  process: ProductPageProcess | null
  nachweisSection: ProductPageNachweisSection
  cta: ProductPageCta | null
  faq: ProductPageFaq
}
