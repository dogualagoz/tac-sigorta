<script setup lang="ts">
import type { ProductPageBenefits } from '~/types/productPage'

defineProps<{
  benefits: ProductPageBenefits
}>()
</script>

<template>
  <section class="border-b border-border bg-sky">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <span class="font-heading text-sm font-semibold text-blue-600">{{ benefits.label }}</span>
        <h2
          lang="de"
          class="mt-3.5 max-w-[620px] font-heading text-2xl font-bold leading-tight text-navy-800"
        >
          {{ benefits.title }}
        </h2>
        <ul class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li
            v-for="(item, index) in benefits.items"
            :key="index"
            class="flex items-start gap-3 rounded-card border border-border bg-white p-5"
          >
            <BaseIcon
              name="check"
              :size="22"
              class="mt-0.5 shrink-0 text-blue-600"
            />
            <span class="text-md leading-relaxed text-navy-800">{{ item }}</span>
          </li>
        </ul>
      </div>
    </TheContainer>
  </section>
</template>
