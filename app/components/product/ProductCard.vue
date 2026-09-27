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

const props = withDefaults(defineProps<{
  product: ProductCardItem
  size?: 'default' | 'large'
  ctaLabel?: string
}>(), {
  size: 'default',
  ctaLabel: undefined,
})

const { t } = useI18n()

const isLarge = computed(() => props.size === 'large')
const buttonLabel = computed(() => props.ctaLabel ?? (props.product.approved ? t('cta.mehrErfahren') : t('cta.individuellesAngebot')))
</script>

<template>
  <BaseCard
    class="flex flex-col"
    :padding="isLarge ? 'lg' : 'md'"
    :hoverable="isLarge"
  >
    <BaseBadge
      v-if="product.badge"
      tone="blue"
      class="mb-3 self-start"
    >
      {{ product.badge }}
    </BaseBadge>
    <BaseIcon
      :name="(product.icon as IconName)"
      :size="isLarge ? 36 : 28"
      class="text-blue-600"
    />
    <h3
      class="mt-3 font-heading font-semibold text-navy-800"
      :class="isLarge ? 'text-lg' : 'text-md'"
    >
      {{ product.name }}
    </h3>
    <!-- Angebote sayfasının kart düzeni (brief bölüm 05): isim / fiyat / kısa fayda / buton. -->
    <template v-if="isLarge">
      <div class="mt-2">
        <PriceDisplay
          :price="product.price"
          :period="product.period"
          :approved="product.approved"
        />
      </div>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {{ product.benefit }}
      </p>
    </template>
    <template v-else>
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
    </template>
    <BaseButton
      :to="product.approved ? '/reiseversicherungen' : '/kontakt'"
      variant="ghost"
      block
      class="mt-4"
    >
      {{ buttonLabel }}
    </BaseButton>
  </BaseCard>
</template>
