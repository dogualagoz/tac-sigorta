<script setup lang="ts">
import type { HomeWhyTsc } from '~/types/home'

defineProps<{
  whyTsc: HomeWhyTsc
}>()
</script>

<template>
  <section class="border-b border-border bg-sky">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <span class="font-heading text-sm font-semibold text-blue-600">{{ whyTsc.label }}</span>
        <h2 class="mt-3.5 font-heading text-2xl font-bold leading-tight text-navy-800">
          {{ whyTsc.title }}
        </h2>
        <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="(point, index) in whyTsc.points"
            :key="index"
            class="rounded-card border border-border bg-white p-6"
          >
            <BaseIcon
              name="check"
              :size="24"
              class="text-blue-600"
            />
            <h3 class="mt-3 font-heading text-md font-semibold text-navy-800">
              {{ point.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-500">
              {{ point.description }}
            </p>
          </div>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
