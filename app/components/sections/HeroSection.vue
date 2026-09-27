<script setup lang="ts">
import type { HomeHero } from '~/types/home'

defineProps<{
  hero: HomeHero
}>()
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <div class="py-14 lg:py-20">
        <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <BaseBadge tone="blue">
            {{ hero.badge }}
          </BaseBadge>
          <!-- El yazısı aksan — CLAUDE.md "Tipografi": tek script font yerine
               şimdilik heading fontunun italik hali kullanılıyor (yeni bağımlılık
               eklemeden önce sormak gerekiyor, bkz. plan). -->
          <p class="font-heading text-lg italic text-blue-600">
            {{ hero.tagline }}
          </p>
        </div>
        <h1
          lang="de"
          class="mt-6 max-w-[720px] font-heading text-3xl font-bold leading-tight tracking-tight text-navy-800 md:text-4xl"
        >
          {{ hero.title }}
        </h1>
        <p class="mt-5 max-w-[640px] text-lg leading-relaxed text-navy-500">
          {{ hero.subtitle }}
        </p>
        <p class="mt-3.5 max-w-[620px] text-base leading-relaxed text-slate-500">
          {{ hero.note }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton
            to="/sicherungsschein"
            variant="primary"
          >
            {{ hero.primaryCta }}
          </BaseButton>
          <BaseButton
            to="/insolvenzabsicherung"
            variant="secondary"
          >
            {{ hero.secondaryCta }}
          </BaseButton>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
