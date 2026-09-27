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
    <HeroSection
      :hero="home.hero"
      :qualifier="home.qualifier"
    />
    <TrustIcons :badges="home.trustBadges" />
    <LegalSection :legal="home.legal" />
    <ProcessSteps :process="home.process" />
    <TariffTable :tariffs="home.tariffs" />
    <TestimonialGrid :testimonials="home.testimonials" />

    <section class="border-b border-border bg-white">
      <TheContainer>
        <div class="grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1fr_380px] lg:gap-16 lg:py-20">
          <FaqPreview :faq="home.faq" />
          <DownloadsCard :downloads="home.downloads" />
        </div>
      </TheContainer>
    </section>

    <TeamGrid :team="home.team" />
    <NewsList :news="home.news" />
    <CtaSection :cta="home.cta" />

    <!-- Mobil sabit aksiyon çubuğu — bkz. frame-mobil-start.html -->
    <div class="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-border bg-white p-3 lg:hidden">
      <BaseButton
        to="/angebote"
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
