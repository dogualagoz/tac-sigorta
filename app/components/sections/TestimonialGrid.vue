<script setup lang="ts">
import type { HomeTestimonials } from '~/types/home'

defineProps<{
  testimonials: HomeTestimonials
}>()
</script>

<template>
  <section class="border-b border-border bg-sky">
    <TheContainer>
      <div class="py-14 lg:py-16">
        <h2 class="font-heading text-xl font-semibold text-navy-800">
          {{ testimonials.title }}
        </h2>
        <div class="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
          <BaseCard
            v-for="(item, index) in testimonials.items"
            :key="index"
            padding="lg"
          >
            <p
              lang="de"
              class="font-heading text-lg leading-relaxed text-navy-800"
            >
              „{{ item.quote }}“
            </p>
            <div class="mt-4 flex flex-col text-sm text-slate-500">
              <span>{{ item.author }}</span>
              <span>{{ item.role }}, {{ item.company }}</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
