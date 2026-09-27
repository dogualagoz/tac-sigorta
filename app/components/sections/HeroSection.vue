<script setup lang="ts">
import type { HomeHero, HomeQualifier } from '~/types/home'

const props = defineProps<{
  hero: HomeHero
  qualifier: HomeQualifier
}>()

const selectedRevenue = ref(props.qualifier.revenueOptions[0] ?? '')
const selectedLocation = ref(props.qualifier.locationOptions[0] ?? '')

const revenueOptions = computed(() =>
  props.qualifier.revenueOptions.map(label => ({ label, value: label })),
)
const locationOptions = computed(() =>
  props.qualifier.locationOptions.map(label => ({ label, value: label })),
)

// Onaylı plan madde 6: bu kart hesaplama yapmaz, seçimler /angebote'ye prefill olarak taşınır.
const qualifierTarget = computed(() => ({
  path: '/angebote',
  query: { umsatz: selectedRevenue.value, sitz: selectedLocation.value },
}))
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <div class="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[660px_1fr] lg:gap-14 lg:py-20">
        <div>
          <BaseBadge tone="blue">
            {{ hero.badge }}
          </BaseBadge>
          <h1
            lang="de"
            class="mt-6 max-w-[640px] font-heading text-3xl font-bold leading-tight tracking-tight text-navy-800 md:text-4xl"
          >
            {{ hero.title }}
          </h1>
          <p class="mt-5 max-w-[580px] text-lg leading-relaxed text-navy-500">
            {{ hero.subtitle }}
          </p>
          <p class="mt-3.5 max-w-[560px] text-base leading-relaxed text-slate-500">
            {{ hero.note }}
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton
              to="/angebote"
              variant="primary"
            >
              {{ hero.primaryCta }}
            </BaseButton>
            <BaseButton
              to="/kontakt"
              variant="secondary"
            >
              {{ hero.secondaryCta }}
            </BaseButton>
          </div>
          <div class="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <template
              v-for="(point, index) in hero.trustLine"
              :key="point"
            >
              <span
                v-if="index > 0"
                aria-hidden="true"
                class="h-3 border-l border-border"
              />
              <span>{{ point }}</span>
            </template>
          </div>
        </div>

        <BaseCard padding="lg">
          <h3 class="font-heading text-md font-semibold text-navy-800">
            {{ qualifier.title }}
          </h3>
          <p class="mt-1.5 text-sm leading-relaxed text-slate-500">
            {{ qualifier.description }}
          </p>
          <div class="mt-5 flex flex-col gap-4">
            <BaseSelect
              id="hero-qualifier-revenue"
              v-model="selectedRevenue"
              :label="qualifier.revenueLabel"
              :options="revenueOptions"
            />
            <BaseSelect
              id="hero-qualifier-location"
              v-model="selectedLocation"
              :label="qualifier.locationLabel"
              :options="locationOptions"
            />
          </div>
          <BaseButton
            :to="qualifierTarget"
            variant="primary"
            block
            class="mt-5"
          >
            {{ qualifier.ctaLabel }}
          </BaseButton>
          <p class="mt-3.5 text-sm leading-relaxed text-slate-500">
            {{ qualifier.disclaimer }}
          </p>
        </BaseCard>
      </div>
    </TheContainer>
  </section>
</template>
