<script setup lang="ts">
import type { HomeNachweisTeaser } from '~/types/home'

// `idPrefix` aynı sayfada birden fazla instance çakışmasın diye (bkz. NachweisForm).
// `sectionId` Sicherungsschein/Insolvenzabsicherung hero'sundaki "#nachweis"
// çapa linki için.
withDefaults(defineProps<{
  nachweisTeaser: HomeNachweisTeaser
  idPrefix?: string
  sectionId?: string
}>(), {
  idPrefix: 'nachweis',
  sectionId: undefined,
})
</script>

<template>
  <section
    :id="sectionId"
    class="border-b border-border bg-sky"
  >
    <TheContainer>
      <div class="py-14 lg:py-16">
        <div class="max-w-[640px]">
          <h2 class="font-heading text-xl font-bold leading-tight text-navy-800">
            {{ nachweisTeaser.title }}
          </h2>
          <p class="mt-2.5 text-base leading-relaxed text-navy-500">
            {{ nachweisTeaser.description }}
          </p>
        </div>
        <div class="mt-6 rounded-card border border-border bg-white p-6">
          <NachweisForm :id-prefix="idPrefix" />
        </div>
      </div>
    </TheContainer>
  </section>
</template>
