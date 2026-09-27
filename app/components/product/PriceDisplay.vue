<script setup lang="ts">
// CLAUDE.md "Ürün ve fiyat kuralı": approved && price !== null olmadan hiçbir
// koşulda fiyat basılmaz. Sayı formatı her zaman Intl.NumberFormat('de-DE', …).
const props = defineProps<{
  price: number | null
  period: string | null
  approved: boolean
}>()

const { t } = useI18n()

const formattedPrice = computed(() => {
  if (props.price === null) return null
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(props.price)
})

const showPrice = computed(() => props.approved && props.price !== null)
</script>

<template>
  <div>
    <p
      v-if="showPrice"
      class="font-heading text-lg font-bold text-navy-800"
    >
      ab {{ formattedPrice }}<span
        v-if="period"
        class="ml-1 text-sm font-normal text-slate-500"
      >{{ period }}</span>
    </p>
    <p
      v-else
      class="font-heading text-md font-semibold text-navy-800"
    >
      {{ t('price.aufAnfrage') }}
    </p>
  </div>
</template>
