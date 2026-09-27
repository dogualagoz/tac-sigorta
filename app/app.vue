<script setup lang="ts">
const { locale } = useI18n()
const i18nHead = useLocaleHead()

// NUXT_PUBLIC_DEV_LOCALE_TR kapalıyken "tr" locale union'ında yer almaz,
// bu yüzden karşılaştırma string'e daraltılarak yapılıyor. Bkz. TheHeader.vue.
const isTrLocale = computed(() => (locale.value as string) === 'tr')

// CLAUDE.md "Dil: DE / TR": tr sayfalarına noindex — flag yanlışlıkla açık kalırsa diye.
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: [
    ...(i18nHead.value.meta ?? []),
    ...(isTrLocale.value ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
