<script setup lang="ts">
// Startseite'de kategori filtresiz (tüm sorular); Sicherungsschein/
// Insolvenzabsicherung'da `category` ile faq.json'daki ilgili sorulara daraltılır.
const props = defineProps<{
  faq: { label: string, title: string, category?: string }
}>()

const { locale, t } = useI18n()

const { data: faqEntries } = await useAsyncData(
  () => `faq-preview-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trFaq' : 'deFaq').all(),
  { watch: [locale] },
)

const filteredEntries = computed(() =>
  (faqEntries.value ?? []).filter(entry => !props.faq.category || entry.category === props.faq.category),
)

const accordionItems = computed(() =>
  filteredEntries.value.map((entry, index) => ({ id: `faq-${index}`, title: entry.question })),
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
        v-if="accordionItems.length"
        :items="accordionItems"
        :default-open-id="accordionItems[0]?.id"
      >
        <template #default="{ item }">
          <p class="max-w-[660px] text-md leading-relaxed text-navy-500">
            {{ filteredEntries[Number(item.id.split('-')[1])]?.answer }}
          </p>
        </template>
      </BaseAccordion>
      <p
        v-else
        class="text-md text-slate-500"
      >
        {{ t('common.faqNotAvailableYet') }}
      </p>
    </div>
  </div>
</template>
