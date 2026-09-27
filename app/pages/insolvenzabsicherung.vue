<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
  () => `insolvenzabsicherung-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trProductPages' : 'deProductPages')
    .where('path', '=', '/insolvenzabsicherung')
    .first(),
  { watch: [locale] },
)

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <ProductHero :hero="page.hero" />
    <ProductBenefits :benefits="page.benefits" />
    <ProductInfoBlock :intro="page.intro" />
    <NachweisPruefenSection
      section-id="nachweis"
      id-prefix="insolvenzabsicherung-nachweis"
      :nachweis-teaser="page.nachweisSection"
    />
    <ProductBenefits
      v-if="page.additionalBenefits"
      :benefits="page.additionalBenefits"
    />
    <CtaSection
      v-if="page.cta"
      :cta="page.cta"
      to="/kontakt"
    />
    <div class="bg-white">
      <TheContainer>
        <div class="py-16 lg:py-20">
          <FaqPreview :faq="page.faq" />
        </div>
      </TheContainer>
    </div>
  </div>
</template>
