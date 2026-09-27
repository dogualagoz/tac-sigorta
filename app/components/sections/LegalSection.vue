<script setup lang="ts">
import type { HomeLegal } from '~/types/home'

defineProps<{
  legal: HomeLegal
}>()
</script>

<template>
  <section
    id="rechtsgrundlage"
    class="border-b border-border bg-white"
  >
    <TheContainer>
      <div class="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_420px] lg:gap-16 lg:py-20">
        <div>
          <span class="font-heading text-sm font-semibold text-blue-600">{{ legal.label }}</span>
          <h2
            lang="de"
            class="mt-3.5 max-w-[620px] font-heading text-2xl font-bold leading-tight text-navy-800"
          >
            {{ legal.title }}
          </h2>
          <p
            v-for="(paragraph, index) in legal.paragraphs"
            :key="index"
            class="mt-5 max-w-[640px] text-md leading-relaxed text-navy-500"
          >
            {{ paragraph }}
          </p>
          <p class="mt-4 max-w-[600px] text-base leading-relaxed text-slate-500">
            {{ legal.summary }}
          </p>
          <div class="mt-7 flex flex-wrap gap-2.5">
            <BaseButton
              v-for="link in legal.links"
              :key="link.label"
              :href="link.href"
              variant="ghost"
            >
              {{ link.label }}
            </BaseButton>
          </div>
        </div>

        <div class="border-l-2 border-blue-600 py-1 pl-6">
          <div class="font-mono text-sm text-slate-500">
            {{ legal.quoteRef }}
          </div>
          <p
            lang="de"
            class="mt-3 font-heading text-lg leading-relaxed text-navy-800"
          >
            „{{ legal.quoteText }}“
          </p>
          <div class="mt-6 grid grid-cols-2 gap-5 border-t border-border pt-5">
            <div
              v-for="stat in legal.stats"
              :key="stat.label"
            >
              <div class="font-heading text-2xl font-bold text-navy-800">
                {{ stat.value }}
              </div>
              <div class="mt-1 text-sm leading-snug text-slate-500">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
