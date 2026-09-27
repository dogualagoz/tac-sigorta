<script setup lang="ts">
const { t, locale } = useI18n()

const { data: home } = await useAsyncData(
  () => `home-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trHome' : 'deHome').first(),
  { watch: [locale] },
)

useSeoMeta({
  title: () => home.value?.title,
  description: () => home.value?.description,
})
</script>

<template>
  <div
    v-if="home"
    class="pb-24 lg:pb-0"
  >
    <HeroSection :hero="home.hero" />
    <TrustIcons :badges="home.trustBadges" />
    <NachweisPruefenSection :nachweis-teaser="home.nachweisTeaser" />
    <ProductsTeaser :products-teaser="home.productsTeaser" />
    <LegalSection :legal="home.legal" />
    <ProcessSteps :process="home.process" />
    <WhyTsc :why-tsc="home.whyTsc" />
    <CtaSection :cta="home.cta" />

    <!-- Mobil sabit aksiyon çubuğu — bkz. frame-mobil-start.html -->
    <div class="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-border bg-white p-3 xl:hidden">
      <BaseButton
        to="/kontakt"
        variant="primary"
        block
      >
        {{ t('cta.angebotAnfordern') }}
      </BaseButton>
      <BaseButton
        to="/kontakt"
        variant="secondary"
        class="px-4"
      >
        <BaseIcon
          name="phone"
          :size="18"
        />
        <span class="sr-only">{{ t('cta.anrufen') }}</span>
      </BaseButton>
    </div>
  </div>
</template>
