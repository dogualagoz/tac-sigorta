<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
  () => `sicherungsschein-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trProductPages' : 'deProductPages')
    .where('path', '=', '/sicherungsschein')
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
    <ProductInfoBlock :intro="page.intro" />
    <ProductBenefits :benefits="page.benefits" />
    <ProcessSteps
      v-if="page.process"
      :process="page.process"
    />
    <NachweisPruefenSection
      section-id="nachweis"
      id-prefix="sicherungsschein-nachweis"
      :nachweis-teaser="page.nachweisSection"
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
