<script setup lang="ts">
import type { HomeTrustBadge } from '~/types/home'

defineProps<{
  badges: HomeTrustBadge[]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="border-b border-border bg-sky">
    <TheContainer>
      <div class="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
        <span class="text-sm font-semibold text-slate-500">{{ t('trust.certifiedLabel') }}</span>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="badge in badges"
            :key="badge.label"
            class="flex h-11 items-center rounded-input border border-border bg-white px-4 font-heading text-sm font-semibold text-navy-800"
          >
            {{ badge.label }}
          </span>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
