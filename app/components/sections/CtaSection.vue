<script setup lang="ts">
import type { HomeCta } from '~/types/home'

defineProps<{
  cta: HomeCta
}>()

const { data: site } = await useAsyncData('site-config', () => queryCollection('site').first())
</script>

<template>
  <section class="bg-navy-800 text-white">
    <TheContainer>
      <div class="flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div>
          <h2 class="max-w-[620px] font-heading text-xl font-bold leading-snug text-white">
            {{ cta.title }}
          </h2>
          <p class="mt-2.5 max-w-[560px] text-base leading-relaxed text-border-strong">
            {{ cta.description }}
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <BaseButton
            to="/angebote"
            variant="secondary"
          >
            {{ cta.primaryCta }}
          </BaseButton>
          <BaseButton
            :href="site?.phone ? `tel:${site.phone}` : undefined"
            variant="outline-light"
          >
            {{ site?.phone ?? cta.secondaryCta }}
          </BaseButton>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
