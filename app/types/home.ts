// content.config.ts "homeSchema" ile birebir eşleşir — bkz. plan "elegant-sparking-piglet.md".

export interface HomeHero {
  badge: string
  title: string
  subtitle: string
  note: string
  primaryCta: string
  secondaryCta: string
  tagline: string
}

export interface HomeTrustBadge {
  label: string
}

export interface HomeNachweisTeaser {
  title: string
  description: string
}

export interface HomeProductsTeaser {
  title: string
  description: string
  linkLabel: string
}

export interface HomeLegal {
  label: string
  title: string
  paragraphs: string[]
  summary: string
  quoteRef: string
  quoteText: string
  stats: { value: string, label: string }[]
  links: { label: string, href: string }[]
}

export interface HomeProcessStep {
  day: string
  title: string
  description: string
}

export interface HomeProcess {
  label: string
  title: string
  intro: string
  steps: HomeProcessStep[]
}

export interface HomeWhyTscPoint {
  title: string
  description: string
}

export interface HomeWhyTsc {
  label: string
  title: string
  points: HomeWhyTscPoint[]
}

export interface HomeCta {
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface HomeContent {
  title: string
  description: string
  approved: boolean
  hero: HomeHero
  trustBadges: HomeTrustBadge[]
  nachweisTeaser: HomeNachweisTeaser
  productsTeaser: HomeProductsTeaser
  legal: HomeLegal
  process: HomeProcess
  whyTsc: HomeWhyTsc
  cta: HomeCta
}
