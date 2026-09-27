<script setup lang="ts">
import type { HomeNews } from '~/types/home'

defineProps<{
  news: HomeNews
}>()
</script>

<template>
  <section class="border-b border-border bg-sky">
    <TheContainer>
      <div class="grid grid-cols-1 gap-8 py-14 lg:grid-cols-[260px_1fr] lg:gap-14 lg:py-16">
        <div>
          <h2 class="text-xl font-semibold leading-snug text-navy-800">
            {{ news.title }}
          </h2>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-500">
            {{ news.intro }}
          </p>
          <NuxtLink
            to="/faq"
            class="mt-3.5 inline-block font-heading text-sm font-semibold text-blue-600 hover:text-navy-800"
          >
            {{ news.linkLabel }}
          </NuxtLink>
        </div>
        <div class="flex flex-col">
          <article
            v-for="(item, index) in news.items"
            :key="index"
            class="grid grid-cols-1 gap-2 border-t border-border py-5 last:border-b sm:grid-cols-[130px_1fr] sm:gap-6"
          >
            <span class="font-mono text-sm text-slate-500">{{ item.date }}</span>
            <div>
              <h3 class="font-heading text-md font-semibold text-navy-800">
                {{ item.title }}
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-navy-500">
                {{ item.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
