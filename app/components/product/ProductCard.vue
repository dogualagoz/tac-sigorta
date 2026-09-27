<script setup lang="ts">
import type { IconName } from '~/types/icon'

export interface ProductCardItem {
  slug: string
  name: string
  icon: string
  benefit: string
  price: number | null
  period: string | null
  badge: string | null
  approved: boolean
}

defineProps<{
  product: ProductCardItem
}>()

const { t } = useI18n()
</script>

<template>
  <BaseCard class="flex flex-col">
    <BaseBadge
      v-if="product.badge"
      tone="blue"
      class="mb-3 self-start"
    >
      {{ product.badge }}
    </BaseBadge>
    <BaseIcon
      :name="(product.icon as IconName)"
      :size="28"
      class="text-blue-600"
    />
    <h3 class="mt-3 font-heading text-md font-semibold text-navy-800">
      {{ product.name }}
    </h3>
    <p class="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">
      {{ product.benefit }}
    </p>
    <div class="mt-4">
      <PriceDisplay
        :price="product.price"
        :period="product.period"
        :approved="product.approved"
      />
    </div>
    <BaseButton
      :to="product.approved ? '/reiseversicherungen' : '/kontakt'"
      variant="ghost"
      block
      class="mt-4"
    >
      {{ product.approved ? t('cta.mehrErfahren') : t('cta.individuellesAngebot') }}
    </BaseButton>
  </BaseCard>
</template>
