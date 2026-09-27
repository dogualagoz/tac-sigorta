<script setup lang="ts">
import type { HomeFaqSection } from '~/types/home'

defineProps<{
  faq: HomeFaqSection
}>()

const { locale } = useI18n()

const { data: faqEntries } = await useAsyncData(
  () => `faq-preview-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trFaq' : 'deFaq').all(),
  { watch: [locale] },
)

const accordionItems = computed(() =>
  (faqEntries.value ?? []).map((entry, index) => ({ id: `faq-${index}`, title: entry.question })),
)
</script>

<template>
  <div>
    <span class="font-heading text-sm font-semibold text-blue-600">{{ faq.label }}</span>
    <h2
      lang="de"
      class="mt-3.5 max-w-[520px] font-heading text-2xl font-bold leading-tight text-navy-800"
    >
      {{ faq.title }}
    </h2>
    <div class="mt-7">
      <BaseAccordion
        :items="accordionItems"
        :default-open-id="accordionItems[0]?.id"
      >
        <template #default="{ item }">
          <p class="max-w-[660px] text-md leading-relaxed text-navy-500">
            {{ faqEntries?.[Number(item.id.split('-')[1])]?.answer }}
          </p>
        </template>
      </BaseAccordion>
    </div>
  </div>
</template>
