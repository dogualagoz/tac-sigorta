<script setup lang="ts">
import type { HomeProcess } from '~/types/home'

defineProps<{
  process: HomeProcess
}>()
</script>

<template>
  <section class="bg-navy-800 text-white">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span class="font-heading text-sm font-semibold text-blue-300">{{ process.label }}</span>
            <h2
              lang="de"
              class="mt-3.5 max-w-[620px] font-heading text-2xl font-bold leading-tight text-white"
            >
              {{ process.title }}
            </h2>
          </div>
          <p class="max-w-[340px] text-base leading-relaxed text-border-strong">
            {{ process.intro }}
          </p>
        </div>

        <ol class="mt-11 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-navy-600 bg-navy-600 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(step, index) in process.steps"
            :key="index"
            class="bg-navy-800 p-7"
          >
            <div class="font-mono text-sm font-bold text-blue-300">
              {{ String(index + 1).padStart(2, '0') }}
            </div>
            <h3
              lang="de"
              class="mt-4 text-lg font-semibold leading-snug text-white"
            >
              {{ step.title }}
            </h3>
            <p class="mt-2.5 text-sm leading-relaxed text-border-strong">
              {{ step.description }}
            </p>
            <div class="mt-4 text-sm text-blue-300">
              {{ step.day }}
            </div>
          </li>
        </ol>
      </div>
    </TheContainer>
  </section>
</template>
