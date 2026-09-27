<script setup lang="ts">
import type { HomeDownloads } from '~/types/home'

defineProps<{
  downloads: HomeDownloads
}>()
</script>

<template>
  <div class="rounded-card border border-border bg-sky p-6">
    <h3 class="font-heading text-lg font-semibold text-navy-800">
      {{ downloads.title }}
    </h3>
    <p class="mt-2 text-sm leading-relaxed text-slate-500">
      {{ downloads.description }}
    </p>
    <div class="mt-5 flex flex-col divide-y divide-border overflow-hidden rounded-input border border-border">
      <a
        v-for="(item, index) in downloads.items"
        :key="index"
        href="#"
        class="flex items-baseline justify-between gap-4 bg-white px-4 py-3.5 hover:bg-surface"
      >
        <span class="font-heading text-sm font-semibold text-navy-800">{{ item.label }}</span>
        <span class="font-mono text-xs text-slate-500">{{ item.meta }}</span>
      </a>
    </div>
    <BaseButton
      href="#"
      variant="secondary"
      block
      class="mt-4"
    >
      {{ downloads.ctaLabel }}
    </BaseButton>
  </div>
</template>
