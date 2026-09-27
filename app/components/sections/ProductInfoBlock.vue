<script setup lang="ts">
import type { ProductPageIntro } from '~/types/productPage'

defineProps<{
  intro: ProductPageIntro
}>()
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <h2
          lang="de"
          class="max-w-[620px] font-heading text-2xl font-bold leading-tight text-navy-800"
        >
          {{ intro.title }}
        </h2>
        <div class="mt-5 flex max-w-[720px] flex-col gap-4">
          <p
            v-for="(paragraph, index) in intro.paragraphs"
            :key="index"
            class="text-base leading-relaxed text-navy-500"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
