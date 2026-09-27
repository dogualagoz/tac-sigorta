// content.config.ts "homeSchema" ile birebir eşleşir — bkz. plan "elegant-sparking-piglet.md".

export interface HomeHero {
  badge: string
  title: string
  subtitle: string
  note: string
  primaryCta: string
  secondaryCta: string
  trustLine: string[]
}

export interface HomeQualifier {
  title: string
  description: string
  revenueLabel: string
  revenueOptions: string[]
  locationLabel: string
  locationOptions: string[]
  ctaLabel: string
  disclaimer: string
}

export interface HomeTrustBadge {
  label: string
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

export interface HomeTariffColumn {
  name: string
  badge: string | null
}

export interface HomeTariffRow {
  label: string
  values: string[]
}

export interface HomeTariffs {
  label: string
  title: string
  intro: string
  columns: HomeTariffColumn[]
  rows: HomeTariffRow[]
  footnote: string
}

export interface HomeFaqSection {
  label: string
  title: string
}

export interface HomeTestimonial {
  quote: string
  author: string
  role: string
  company: string
}

export interface HomeTestimonials {
  title: string
  items: HomeTestimonial[]
}

export interface HomeDownloadItem {
  label: string
  meta: string
}

export interface HomeDownloads {
  title: string
  description: string
  items: HomeDownloadItem[]
  ctaLabel: string
}

export interface HomeTeamMember {
  name: string
  role: string
  phone: string
  email: string
  languages: string[]
}

export interface HomeTeam {
  label: string
  title: string
  linkLabel: string
  members: HomeTeamMember[]
}

export interface HomeNewsItem {
  date: string
  title: string
  description: string
}

export interface HomeNews {
  title: string
  intro: string
  linkLabel: string
  items: HomeNewsItem[]
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
  qualifier: HomeQualifier
  trustBadges: HomeTrustBadge[]
  legal: HomeLegal
  process: HomeProcess
  tariffs: HomeTariffs
  faq: HomeFaqSection
  testimonials: HomeTestimonials
  downloads: HomeDownloads
  team: HomeTeam
  news: HomeNews
  cta: HomeCta
}
