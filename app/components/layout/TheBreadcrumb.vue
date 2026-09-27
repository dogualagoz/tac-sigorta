<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

// URL segmenti → mevcut nav çevirisi. Eşleşme yoksa segment sermayelenerek
// gösterilir (bkz. CLAUDE.md "Sayfalar ve URL'ler").
const SEGMENT_LABELS: Record<string, string> = {
  'sicherungsschein': 'nav.sicherungsschein',
  'insolvenzabsicherung': 'nav.insolvenzabsicherung',
  'reiseversicherungen': 'nav.reiseversicherungen',
  'angebote': 'nav.angebote',
  'nachweis-pruefen': 'nav.nachweisPruefen',
  'service': 'nav.service',
  'ueber-uns': 'nav.ueberUns',
  'kontakt': 'nav.kontakt',
  'faq': 'nav.faq',
}

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean).filter(segment => segment !== 'tr')
  let path = ''
  return [
    { label: t('nav.startseite'), path: '/' },
    ...segments.map((segment) => {
      path += `/${segment}`
      const translationKey = SEGMENT_LABELS[segment]
      const label = translationKey ? t(translationKey) : segment.charAt(0).toUpperCase() + segment.slice(1)
      return { label, path }
    }),
  ]
})
</script>

<template>
  <nav
    v-if="crumbs.length > 1"
    aria-label="Breadcrumb"
    class="py-4 text-sm text-slate-500"
  >
    <ol class="flex flex-wrap items-center gap-2">
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.path"
        class="flex items-center gap-2"
      >
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="crumb.path"
          class="hover:text-blue-600"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span
          v-else
          aria-current="page"
          class="text-navy-800 font-semibold"
        >{{ crumb.label }}</span>
        <span
          v-if="index < crumbs.length - 1"
          aria-hidden="true"
        >/</span>
      </li>
    </ol>
  </nav>
</template>
