<script setup lang="ts">
import type { ProductPageHero } from '~/types/productPage'

defineProps<{
  hero: ProductPageHero
}>()
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <TheBreadcrumb />
      <div class="pb-14 pt-2 lg:pb-20">
        <BaseBadge tone="blue">
          {{ hero.eyebrow }}
        </BaseBadge>
        <h1
          lang="de"
          class="mt-6 max-w-[720px] font-heading text-3xl font-bold leading-tight tracking-tight text-navy-800 md:text-4xl"
        >
          {{ hero.title }}
        </h1>
        <p class="mt-5 max-w-[640px] text-lg leading-relaxed text-navy-500">
          {{ hero.subtitle }}
        </p>
        <p
          v-if="hero.note"
          class="mt-3.5 max-w-[620px] text-base leading-relaxed text-slate-500"
        >
          {{ hero.note }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton
            to="/kontakt"
            variant="primary"
          >
            {{ hero.primaryCta }}
          </BaseButton>
          <BaseButton
            v-if="hero.secondaryCta"
            href="#nachweis"
            variant="secondary"
          >
            {{ hero.secondaryCta }}
          </BaseButton>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
