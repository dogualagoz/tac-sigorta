<script setup lang="ts">
import type { HomeTariffs } from '~/types/home'

const props = defineProps<{
  tariffs: HomeTariffs
}>()

const { t } = useI18n()

const highlightIndex = computed(() => props.tariffs.columns.findIndex(column => column.badge))

const accordionItems = computed(() =>
  props.tariffs.rows.map((row, index) => ({ id: `tariff-row-${index}`, title: row.label })),
)
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <div class="max-w-[660px]">
          <span class="font-heading text-sm font-semibold text-blue-600">{{ tariffs.label }}</span>
          <h2
            lang="de"
            class="mt-3.5 font-heading text-2xl font-bold leading-tight text-navy-800"
          >
            {{ tariffs.title }}
          </h2>
          <p class="mt-4 text-md leading-relaxed text-navy-500">
            {{ tariffs.intro }}
          </p>
        </div>

        <!-- Masaüstü: tablo -->
        <div class="mt-9 hidden overflow-hidden rounded-card border border-border md:block">
          <div class="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-border bg-sky font-heading text-sm font-semibold text-navy-800">
            <div class="p-4">
              {{ t('home.tariffFeatureLabel') }}
            </div>
            <div
              v-for="(column, index) in tariffs.columns"
              :key="column.name"
              class="border-l border-border p-4"
              :class="index === highlightIndex ? 'border-t-2 border-t-blue-600 bg-white' : ''"
            >
              {{ column.name }}
              <span
                v-if="column.badge"
                class="ml-1 text-sm font-normal text-blue-600"
              >{{ column.badge }}</span>
            </div>
          </div>
          <div
            v-for="(row, rowIndex) in tariffs.rows"
            :key="rowIndex"
            class="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-border text-base last:border-b-0"
          >
            <div class="p-4 text-navy-500">
              {{ row.label }}
            </div>
            <div
              v-for="(value, colIndex) in row.values"
              :key="colIndex"
              class="border-l border-border p-4"
              :class="colIndex === highlightIndex ? 'bg-surface font-semibold' : ''"
            >
              {{ value }}
            </div>
          </div>
        </div>

        <!-- Mobil: akordeon (CLAUDE.md "tarife akordeona döner") -->
        <div class="mt-9 md:hidden">
          <BaseAccordion :items="accordionItems">
            <template #default="{ item }">
              <dl class="flex flex-col gap-2 text-sm">
                <div
                  v-for="(column, index) in tariffs.columns"
                  :key="column.name"
                  class="flex items-baseline justify-between gap-4"
                >
                  <dt class="text-slate-500">
                    {{ column.name }}
                  </dt>
                  <dd class="font-semibold text-navy-800">
                    {{ tariffs.rows[Number(item.id.split('-')[2])]?.values[index] }}
                  </dd>
                </div>
              </dl>
            </template>
          </BaseAccordion>
        </div>

        <p class="mt-4 text-sm leading-relaxed text-slate-500">
          {{ tariffs.footnote }}
        </p>
      </div>
    </TheContainer>
  </section>
</template>
